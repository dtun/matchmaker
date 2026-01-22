# PRD: OAuth 2.0 Authentication for MCP Server

## Overview

Enable the Claude Mac App to connect to the deployed MCP server by implementing OAuth 2.0 authentication endpoints using Supabase Auth.

## Problem Statement

The MCP server currently uses static bearer tokens for authentication. When users attempt to connect via the Claude Mac App's "Connect" button, the connection fails because Claude expects OAuth 2.0 authentication endpoints that don't exist.

## Goals

- Allow Claude Mac App users to connect to the MCP server via OAuth 2.0
- Enable self-registration for new users during the OAuth flow
- Provide a minimal, functional login experience
- Issue long-lived tokens (1 year) for user convenience

## Non-Goals

- Admin panel or user management features
- Migration of existing static token authentication
- Social login providers (Google, GitHub)
- Custom branded authentication UI

## User Stories

### US-1: New User Connects via Claude Mac App

As a new user, I want to connect my Claude Mac App to the MCP server so that I can use the matchmaker tools.

**Acceptance Criteria:**
- I click "Connect" in Claude Mac App and enter the server URL
- A browser opens with a simple login page
- I can create an account with email and password
- After account creation, I'm redirected back to Claude
- Claude shows the connection as successful
- I can immediately use MCP tools

### US-2: Existing User Reconnects

As an existing user, I want to reconnect my Claude Mac App after signing out or switching devices so that I can continue using the MCP tools.

**Acceptance Criteria:**
- I click "Connect" in Claude Mac App
- A browser opens with the login page
- I sign in with my existing email and password
- I'm redirected back to Claude with a successful connection
- My previous session/data is accessible

### US-3: User Session Persistence

As a user, I want my connection to remain active for a long time so that I don't have to re-authenticate frequently.

**Acceptance Criteria:**
- After authenticating, my token remains valid for 1 year
- I don't need to re-authenticate during normal usage
- Claude Mac App maintains the connection across app restarts

### US-4: Authentication Error Handling

As a user, I want clear feedback when authentication fails so that I can correct issues and connect successfully.

**Acceptance Criteria:**
- If I enter wrong credentials, I see a clear error message
- If I try to create an account with an existing email, I'm told to sign in instead
- If the OAuth flow fails, I can retry without confusion

## Technical Approach

### OAuth 2.0 Endpoints Required

Per the MCP Connector documentation, implement these endpoints:

1. **Authorization Endpoint** (`GET /oauth/authorize`)
   - Accept `client_id`, `redirect_uri`, `response_type`, `state`, `code_challenge`, `code_challenge_method`
   - Display minimal login/signup form
   - On success, redirect with authorization code

2. **Token Endpoint** (`POST /oauth/token`)
   - Exchange authorization code for access token
   - Support `grant_type=authorization_code`
   - Return access token with 1-year expiry
   - Support refresh token flow

3. **Token Revocation Endpoint** (`POST /oauth/revoke`) - Optional but recommended
   - Allow users to revoke tokens

### Authentication Flow

1. User clicks "Connect" in Claude Mac App
2. Claude opens browser to `/oauth/authorize` with OAuth parameters
3. User sees minimal login page (email/password)
4. New users can create account, existing users can sign in
5. On successful auth, redirect back to Claude with authorization code
6. Claude exchanges code for access token via `/oauth/token`
7. Claude stores token and uses it for subsequent MCP requests

### Minimal Login Page

- Single page with email/password fields
- Toggle between "Sign In" and "Create Account" modes
- Basic error handling (invalid credentials, email already exists)
- No styling beyond functional defaults
- Hosted at `/oauth/login` or similar

### Token Configuration

- Access token lifetime: 1 year (31536000 seconds)
- Refresh token: Optional, can match access token lifetime
- Token type: Bearer

### Integration with Existing Auth

- OAuth endpoints run alongside existing static token auth
- No changes to current MCP tools or middleware
- OAuth tokens validated the same way as existing Supabase tokens

## Implementation Tasks

1. **feat(auth): add OAuth authorization endpoint**
   - Create `/oauth/authorize` route
   - Validate OAuth parameters
   - Redirect to login page with state preserved

2. **feat(auth): add minimal login page**
   - Create simple HTML form for email/password
   - Handle sign-in and sign-up flows via Supabase Auth
   - Redirect with authorization code on success

3. **feat(auth): add OAuth token endpoint**
   - Create `/oauth/token` route
   - Exchange authorization code for Supabase session
   - Return OAuth-compliant token response with 1-year expiry

4. **feat(auth): add PKCE support**
   - Implement code challenge verification
   - Store and validate code verifier

5. **test(auth): verify Claude Mac App connection**
   - End-to-end test of OAuth flow
   - Confirm MCP tools work with OAuth token

## Success Criteria

- User can click "Connect" in Claude Mac App and successfully authenticate
- New users can create accounts during the OAuth flow
- Tokens remain valid for 1 year
- Existing static token authentication continues to work unchanged

## Open Questions

1. Should we add rate limiting to prevent abuse of the registration endpoint?
2. Do we need email verification for new accounts, or allow immediate access?