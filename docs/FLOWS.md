# Interaction Flows & Sequence Diagrams

## Overview

This document illustrates how different components of the Matchmaker system interact during common operations.

## Authentication Flows

### User Sign Up & First Login

```mermaid
sequenceDiagram
    participant User
    participant Client
    participant Supabase Auth
    participant Database
    participant API

    User->>Client: Enter email & password
    Client->>Supabase Auth: signUp(email, password)
    Supabase Auth->>Database: INSERT INTO auth.users
    Database-->>Supabase Auth: User created
    Supabase Auth-->>Client: { user, session, access_token }

    Note over Client,Supabase Auth: User may need to verify email

    Client->>API: POST /api/people (with JWT)
    API->>API: Validate JWT via middleware
    Note over API: First API call may fail if<br/>matchmaker record doesn't exist

    User->>Client: Enter matchmaker name
    Client->>Database: INSERT INTO matchmakers
    Database-->>Client: Matchmaker created
    Client->>API: POST /api/people (with JWT)
    API->>Database: INSERT INTO people
    Database-->>API: Person created
    API-->>Client: Success
```

### Subsequent Login

```mermaid
sequenceDiagram
    participant User
    participant Client
    participant Supabase Auth
    participant API

    User->>Client: Enter email & password
    Client->>Supabase Auth: signInWithPassword(email, password)
    Supabase Auth->>Supabase Auth: Verify credentials
    Supabase Auth-->>Client: { user, session, access_token }

    Client->>Client: Store access_token
    Client->>API: GET /api/people (with JWT)
    API->>API: Auth middleware validates token
    API->>Supabase Auth: getUser(token)
    Supabase Auth-->>API: User data with userId
    API->>API: Set userId in context
    API->>Database: SELECT people WHERE matchmaker_id = userId
    Database-->>API: People list
    API-->>Client: Success response
```

### Token Refresh

```mermaid
sequenceDiagram
    participant Client
    participant Supabase Auth
    participant API

    Note over Client: Access token expires after 1 hour

    Client->>Supabase Auth: refreshSession(refresh_token)
    Supabase Auth->>Supabase Auth: Validate refresh token
    Supabase Auth-->>Client: New { access_token, refresh_token }

    Client->>Client: Update stored tokens
    Client->>API: API call with new JWT
    API-->>Client: Success
```

## People Management Flows

### Creating a Person

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant Auth Middleware
    participant Zod Validator
    participant Database

    Client->>API: POST /api/people<br/>{name, age, location...}
    API->>Auth Middleware: Validate JWT
    Auth Middleware->>Supabase: getUser(token)
    Supabase-->>Auth Middleware: userId
    Auth Middleware->>Zod Validator: Validate request body

    alt Validation Passes
        Zod Validator->>Database: INSERT INTO people<br/>(matchmaker_id = userId)
        Database->>Database: Check RLS policy
        alt RLS Check Passes
            Database-->>API: Created person
            API-->>Client: 201 Created + person data
        else RLS Fails
            Database-->>API: Permission error
            API-->>Client: 500 Error
        end
    else Validation Fails
        Zod Validator-->>Client: 400 Bad Request + errors
    end
```

### Listing People

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant Auth Middleware
    participant Database

    Client->>API: GET /api/people
    API->>Auth Middleware: Validate JWT
    Auth Middleware->>Supabase: getUser(token)
    Supabase-->>Auth Middleware: userId
    Auth Middleware->>Database: SELECT * FROM people

    Note over Database: RLS automatically filters:<br/>WHERE matchmaker_id = userId

    Database-->>API: Filtered results
    API-->>Client: 200 OK + people array
```

### Updating a Person

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant Auth Middleware
    participant Zod Validator
    participant Database
    participant Trigger

    Client->>API: PUT /api/people/:id<br/>{age: 29}
    API->>Auth Middleware: Validate JWT
    Auth Middleware->>Supabase: getUser(token)
    Supabase-->>Auth Middleware: userId
    Auth Middleware->>Zod Validator: Validate request body

    Zod Validator->>Database: UPDATE people SET age = 29<br/>WHERE id = :id<br/>AND matchmaker_id = userId

    Database->>Database: Check RLS policy (USING)
    Database->>Database: Check RLS policy (WITH CHECK)

    alt Both RLS checks pass
        Database->>Trigger: BEFORE UPDATE trigger
        Trigger->>Trigger: Set updated_at = NOW()
        Trigger-->>Database: Modified row
        Database->>Database: Apply update
        Database-->>API: Updated person
        API-->>Client: 200 OK + person data
    else Person not found or not owned
        Database-->>API: No rows updated
        API-->>Client: 404 Not Found
    end
```

### Soft Delete Person

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant Database

    Client->>API: DELETE /api/people/:id
    API->>Database: UPDATE people<br/>SET active = false<br/>WHERE id = :id

    Note over Database: Soft delete preserves data<br/>and referential integrity

    Database-->>API: Updated person
    API-->>Client: 200 OK + person data<br/>(active = false)

    Note over Client,Database: Person still exists but<br/>won't appear in active queries
```

## Introduction Flows

### Creating an Introduction

```mermaid
sequenceDiagram
    participant Matchmaker
    participant API
    participant Database
    participant Check Constraint

    Matchmaker->>API: POST /api/introductions<br/>{person_a_id, person_b_id}
    API->>Database: Verify person_a exists<br/>and belongs to matchmaker
    Database-->>API: Person A confirmed

    API->>Database: Verify person_b exists<br/>and belongs to matchmaker
    Database-->>API: Person B confirmed

    API->>Database: INSERT INTO introductions
    Database->>Check Constraint: Validate person_a_id ≠ person_b_id

    alt Constraint passes
        Database->>Database: Check RLS (matchmaker_id = userId)
        Database-->>API: Introduction created
        API-->>Matchmaker: 201 Created
    else Same person
        Check Constraint-->>API: Constraint violation
        API-->>Matchmaker: 500 Error
    end
```

### Introduction Lifecycle

```mermaid
sequenceDiagram
    participant Matchmaker
    participant API
    participant Database
    participant Person A
    participant Person B

    Note over Matchmaker,Database: 1. Create Introduction
    Matchmaker->>API: POST /api/introductions
    API->>Database: INSERT (status = 'pending')
    Database-->>Matchmaker: Introduction created

    Note over Matchmaker,Person B: 2. People are introduced
    Matchmaker->>Person A: Contact person A
    Matchmaker->>Person B: Contact person B

    Note over Person A,Person B: 3. Both accept
    Matchmaker->>API: PUT /api/introductions/:id<br/>{status: 'accepted'}
    API->>Database: UPDATE status
    Database-->>Matchmaker: Updated

    Note over Person A,Person B: 4. First date
    Person A->>Person B: Go on date

    Note over Person A,Person B: 5. Provide feedback
    Matchmaker->>API: POST /api/feedback<br/>(from person A)
    API->>Database: INSERT feedback
    Database-->>Matchmaker: Feedback saved

    Matchmaker->>API: POST /api/feedback<br/>(from person B)
    API->>Database: INSERT feedback
    Database-->>Matchmaker: Feedback saved

    Note over Person A,Person B: 6. Update status
    Matchmaker->>API: PUT /api/introductions/:id<br/>{status: 'dating'}
    API->>Database: UPDATE status
    Database-->>Matchmaker: Now dating!
```

### Alternative: Introduction Declined

```mermaid
sequenceDiagram
    participant Matchmaker
    participant API
    participant Database
    participant Person A
    participant Person B

    Matchmaker->>API: POST /api/introductions
    API->>Database: INSERT (status = 'pending')
    Database-->>Matchmaker: Introduction created

    Matchmaker->>Person A: Contact person A
    Matchmaker->>Person B: Contact person B

    Person A->>Matchmaker: "Not interested"

    Matchmaker->>API: PUT /api/introductions/:id<br/>{status: 'declined'}
    API->>Database: UPDATE status
    Database-->>Matchmaker: Status updated

    Note over Matchmaker,Person B: Introduction closed,<br/>no further action
```

## Feedback Flows

### Adding Feedback After a Date

```mermaid
sequenceDiagram
    participant Person
    participant Matchmaker
    participant API
    participant Database

    Person->>Matchmaker: "Great date! We clicked!"

    Matchmaker->>API: POST /api/feedback<br/>{<br/>  introduction_id,<br/>  from_person_id,<br/>  content: "Great date!",<br/>  sentiment: "positive"<br/>}

    API->>Database: Verify introduction exists<br/>and belongs to matchmaker
    Database-->>API: Introduction confirmed

    API->>Database: Verify person exists<br/>and belongs to matchmaker
    Database-->>API: Person confirmed

    API->>Database: INSERT INTO feedback
    Database->>Database: Check RLS policy

    alt RLS passes
        Database-->>API: Feedback created
        API-->>Matchmaker: 201 Created
    else RLS fails
        Database-->>API: Permission denied
        API-->>Matchmaker: 500 Error
    end

    Note over Matchmaker,Database: Feedback is immutable<br/>(no UPDATE or DELETE)
```

### Viewing Feedback for Introduction

```mermaid
sequenceDiagram
    participant Matchmaker
    participant API
    participant Database

    Matchmaker->>API: GET /api/feedback?introductionId=xxx

    API->>Database: SELECT * FROM feedback<br/>WHERE introduction_id = xxx

    Note over Database: RLS checks if matchmaker<br/>owns the introduction

    Database->>Database: JOIN introductions<br/>to verify ownership
    Database-->>API: Feedback list (if owned)

    API-->>Matchmaker: 200 OK + feedback array

    Note over Matchmaker: Can see feedback from<br/>both people in introduction
```

## Matching Algorithm Flow

```mermaid
sequenceDiagram
    participant Matchmaker
    participant API
    participant Match Service
    participant Database

    Matchmaker->>API: GET /api/matches/:personId

    API->>Database: Verify person exists<br/>and belongs to matchmaker
    Database-->>API: Person confirmed

    API->>Database: Get all active people<br/>for this matchmaker
    Database-->>API: People list

    API->>Match Service: findMatches(personId, allPeople)

    Note over Match Service: Current: Returns []<br/>Future: Calculate compatibility

    alt Future implementation
        Match Service->>Match Service: Filter by preferences
        Match Service->>Match Service: Calculate age compatibility
        Match Service->>Match Service: Check location proximity
        Match Service->>Match Service: Analyze personality match
        Match Service->>Database: Get historical feedback
        Database-->>Match Service: Feedback data
        Match Service->>Match Service: Score based on feedback
    end

    Match Service-->>API: Sorted match list

    API-->>Matchmaker: 200 OK + matches
```

### Future Matching Algorithm Detail

```mermaid
flowchart TD
    START[Start: Get Person & Candidates] --> FILTER[Filter Candidates]

    FILTER --> AGE{Age in<br/>preference range?}
    AGE -->|No| REJECT1[Reject]
    AGE -->|Yes| LOCATION{Location<br/>compatible?}

    LOCATION -->|No| REJECT2[Reject]
    LOCATION -->|Yes| GENDER{Gender<br/>preference match?}

    GENDER -->|No| REJECT3[Reject]
    GENDER -->|Yes| SCORE[Calculate Scores]

    SCORE --> AGE_SCORE[Age Compatibility: 0-1]
    SCORE --> LOC_SCORE[Location Score: 0-1]
    SCORE --> PERS_SCORE[Personality Match: 0-1]
    SCORE --> INT_SCORE[Shared Interests: 0-1]
    SCORE --> FEED_SCORE[Historical Feedback: 0-1]

    AGE_SCORE --> WEIGHTED[Weighted Average]
    LOC_SCORE --> WEIGHTED
    PERS_SCORE --> WEIGHTED
    INT_SCORE --> WEIGHTED
    FEED_SCORE --> WEIGHTED

    WEIGHTED --> FINAL{Score ><br/>threshold?}
    FINAL -->|No| REJECT4[Reject]
    FINAL -->|Yes| MATCH[Add to Matches]

    MATCH --> SORT[Sort by Score DESC]
    SORT --> RETURN[Return Top N Matches]

    style START fill:#e1f5ff
    style MATCH fill:#c8e6c9
    style REJECT1 fill:#ffcdd2
    style REJECT2 fill:#ffcdd2
    style REJECT3 fill:#ffcdd2
    style REJECT4 fill:#ffcdd2
```

## MCP Server Flows

### AI Assistant Creating a Person via MCP

```mermaid
sequenceDiagram
    participant User
    participant AI Assistant
    participant MCP Server
    participant API
    participant Database

    User->>AI Assistant: "Add John Doe, 28, lives in SF"
    AI Assistant->>AI Assistant: Parse intent & parameters

    AI Assistant->>MCP Server: Call tool: add_person<br/>{name: "John Doe"}

    Note over MCP Server: Simplified MCP tool<br/>only accepts name

    MCP Server->>MCP Server: Load config (API URL, token)
    MCP Server->>MCP Server: Validate input with Zod

    MCP Server->>API: POST /api/people<br/>Authorization: Bearer {token}<br/>{name: "John Doe"}

    API->>API: Validate JWT
    API->>Database: INSERT INTO people
    Database-->>API: Person created
    API-->>MCP Server: 201 Created + person data

    MCP Server->>MCP Server: Validate response with Zod
    MCP Server-->>AI Assistant: Success + person data

    AI Assistant-->>User: "I've added John Doe to your matchmaking network!"

    Note over User,Database: Age and location were in<br/>user's message but not<br/>captured by MCP tool
```

### AI Assistant Listing People via MCP

```mermaid
sequenceDiagram
    participant User
    participant AI Assistant
    participant MCP Server
    participant API
    participant Database

    User->>AI Assistant: "Show me all my people"
    AI Assistant->>MCP Server: Call tool: list_people

    MCP Server->>MCP Server: Load config
    MCP Server->>API: GET /api/people<br/>Authorization: Bearer {token}

    API->>API: Validate JWT
    API->>Database: SELECT * FROM people<br/>(RLS filters by matchmaker)
    Database-->>API: People list
    API-->>MCP Server: 200 OK + people array

    MCP Server->>MCP Server: Validate response
    MCP Server-->>AI Assistant: People list

    AI Assistant->>AI Assistant: Format for display
    AI Assistant-->>User: "You have 5 people:<br/>1. John Doe, 28<br/>2. Jane Smith, 26<br/>..."
```

### MCP Configuration Flow

```mermaid
sequenceDiagram
    participant User
    participant AI Config
    participant MCP Server
    participant API
    participant Supabase

    Note over User,Supabase: 1. Setup

    User->>Supabase: Sign up / Sign in
    Supabase-->>User: Access token

    User->>AI Config: Edit config file
    Note over AI Config: Add MCP server config<br/>with API URL and token

    Note over User,Supabase: 2. First Use

    User->>AI Assistant: Ask something
    AI Assistant->>MCP Server: Start MCP server process
    MCP Server->>MCP Server: Load config from env
    MCP Server->>AI Assistant: Register tools:<br/>- add_person<br/>- list_people

    AI Assistant->>User: Ready to use tools

    Note over User,Supabase: 3. Tool Execution

    User->>AI Assistant: "Add a person"
    AI Assistant->>MCP Server: Call add_person tool
    MCP Server->>API: POST /api/people
    API-->>MCP Server: Success
    MCP Server-->>AI Assistant: Result
    AI Assistant-->>User: Confirmation
```

## Error Handling Flows

### Invalid JWT Token

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant Auth Middleware
    participant Supabase Auth

    Client->>API: GET /api/people<br/>Authorization: Bearer invalid_token
    API->>Auth Middleware: Process request
    Auth Middleware->>Auth Middleware: Extract token
    Auth Middleware->>Supabase Auth: getUser(token)

    Supabase Auth-->>Auth Middleware: Error: Invalid token
    Auth Middleware-->>Client: 401 Unauthorized<br/>{error: "Unauthorized"}

    Note over Client: Client should refresh token<br/>or re-authenticate
```

### Missing Authorization Header

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant Auth Middleware

    Client->>API: GET /api/people<br/>(no Authorization header)
    API->>Auth Middleware: Process request
    Auth Middleware->>Auth Middleware: Check for header

    alt No header
        Auth Middleware-->>Client: 401 Unauthorized
    else Header missing Bearer prefix
        Auth Middleware-->>Client: 401 Unauthorized
    end
```

### Validation Error

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant Zod Validator

    Client->>API: POST /api/people<br/>{name: ""}
    API->>Zod Validator: Validate body

    Zod Validator->>Zod Validator: Check name.min(1)
    Zod Validator-->>Client: 400 Bad Request<br/>{error: "Validation error"}

    Note over Client: Fix validation issues<br/>and retry
```

### Database Error

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant Database

    Client->>API: POST /api/people<br/>{valid data}
    API->>Database: INSERT INTO people

    Database->>Database: Connection lost / Error

    Database-->>API: Error
    API->>API: Catch error
    API-->>Client: 500 Internal Server Error<br/>{error: "Error message"}

    Note over API: Error logged for debugging
```

### RLS Policy Violation

```mermaid
sequenceDiagram
    participant Matchmaker A
    participant API
    participant Database

    Note over Matchmaker A: Trying to access<br/>Matchmaker B's data

    Matchmaker A->>API: GET /api/people/:id<br/>(person belongs to Matchmaker B)
    API->>Database: SELECT * FROM people<br/>WHERE id = :id<br/>AND matchmaker_id = userId

    Database->>Database: Apply RLS policy

    Note over Database: No rows match<br/>(wrong matchmaker)

    Database-->>API: Empty result
    API-->>Matchmaker A: 404 Not Found

    Note over Matchmaker A,Database: RLS prevents unauthorized access<br/>at database level
```

## Data Flow Summary

### Complete CRUD Flow for People

```mermaid
graph TB
    START[Client Request] --> AUTH{Valid JWT?}
    AUTH -->|No| ERROR1[401 Unauthorized]
    AUTH -->|Yes| OPERATION{Operation}

    OPERATION -->|CREATE| VALIDATE_CREATE[Validate Input]
    OPERATION -->|READ| DB_READ[Query Database]
    OPERATION -->|UPDATE| VALIDATE_UPDATE[Validate Input]
    OPERATION -->|DELETE| DB_DELETE[Soft Delete]

    VALIDATE_CREATE -->|Invalid| ERROR2[400 Bad Request]
    VALIDATE_CREATE -->|Valid| DB_INSERT[Insert to DB]

    DB_INSERT --> RLS_INSERT{RLS Check}
    RLS_INSERT -->|Pass| SUCCESS1[201 Created]
    RLS_INSERT -->|Fail| ERROR3[500 Error]

    DB_READ --> RLS_READ{RLS Filter}
    RLS_READ --> SUCCESS2[200 OK]

    VALIDATE_UPDATE -->|Invalid| ERROR4[400 Bad Request]
    VALIDATE_UPDATE -->|Valid| DB_UPDATE[Update in DB]

    DB_UPDATE --> RLS_UPDATE{RLS Check}
    RLS_UPDATE -->|Pass & Found| TRIGGER[Update Trigger]
    RLS_UPDATE -->|Not Found| ERROR5[404 Not Found]

    TRIGGER --> SUCCESS3[200 OK]

    DB_DELETE --> RLS_DELETE{RLS Check}
    RLS_DELETE -->|Pass & Found| SUCCESS4[200 OK]
    RLS_DELETE -->|Not Found| ERROR6[404 Not Found]

    style START fill:#e1f5ff
    style SUCCESS1 fill:#c8e6c9
    style SUCCESS2 fill:#c8e6c9
    style SUCCESS3 fill:#c8e6c9
    style SUCCESS4 fill:#c8e6c9
    style ERROR1 fill:#ffcdd2
    style ERROR2 fill:#ffcdd2
    style ERROR3 fill:#ffcdd2
    style ERROR4 fill:#ffcdd2
    style ERROR5 fill:#ffcdd2
    style ERROR6 fill:#ffcdd2
```

## Performance Flow

### Request Lifecycle with Timing

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant Auth
    participant Validator
    participant Database

    Note over Client,Database: Typical request: 50-150ms

    Client->>API: Request (0ms)
    Note over API: Middleware: 1-5ms
    API->>Auth: Validate JWT (5ms)
    Auth->>Auth: Supabase Auth check (20-50ms)
    Auth-->>API: Valid (55ms)

    API->>Validator: Validate input (60ms)
    Note over Validator: Zod validation: 1-2ms
    Validator-->>API: Valid (62ms)

    API->>Database: Query (62ms)
    Note over Database: Query execution: 10-50ms<br/>Includes RLS evaluation
    Database-->>API: Results (112ms)

    API-->>Client: Response (115ms)

    Note over Client,Database: Total: ~115ms<br/>(Varies based on network,<br/>database load, query complexity)
```

## Concurrent Operations

### Multiple Clients Accessing Same Data

```mermaid
sequenceDiagram
    participant Client A
    participant Client B
    participant API
    participant Database

    Note over Client A,Database: Both clients updating<br/>same person

    Client A->>API: PUT /api/people/:id {age: 28}
    Client B->>API: PUT /api/people/:id {location: "NYC"}

    par Concurrent Updates
        API->>Database: UPDATE (age: 28)
        API->>Database: UPDATE (location: "NYC")
    end

    Note over Database: PostgreSQL handles<br/>concurrent updates with MVCC

    Database-->>API: Success (age: 28)
    Database-->>API: Success (location: "NYC")

    API-->>Client A: 200 OK
    API-->>Client B: 200 OK

    Note over Database: Final state:<br/>age: 28, location: "NYC"<br/>(Last write wins for each field)
```

This documentation provides a comprehensive view of how the Matchmaker system processes requests, handles data, and ensures security through its various layers.
