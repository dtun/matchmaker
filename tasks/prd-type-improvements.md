# PRD: Type Safety Improvements

## Overview

Eliminate unsafe type patterns (`any`, non-null assertions, untyped contexts) from the matchmaker backend codebase to improve type safety, maintainability, and developer experience.

## Problem Statement

The codebase contains several type safety issues that undermine TypeScript's benefits:

- Hono route handlers using `c: any` instead of proper `Context` types
- `Record<string, any>` patterns that bypass type checking
- Non-null assertions (`!`) that could mask runtime errors
- Test files with untyped response data and mock implementations

While strict mode is enabled and Zod schemas are used in key areas, these gaps create risk for runtime errors and make refactoring more difficult.

## Goals

- Replace all `any` types in production code with proper type annotations
- Remove non-null assertions in favor of proper null checks
- Type mock implementations correctly for better test reliability
- Maintain zero breaking changes to public APIs

## Non-Goals

- Adding types to code that doesn't currently have type issues
- Creating new abstraction layers or shared type libraries
- Refactoring beyond what's needed for type safety
- Achieving 100% type coverage in test files (only fixing problematic patterns)

## User Stories

### US-TI-001: Phase 1 - Critical Type Safety Issues

As a developer, I want Hono route handlers and core business logic to have proper type annotations so that TypeScript can catch errors at compile time rather than runtime.

**Acceptance Criteria:**
- All `c: any` parameters in route handlers replaced with proper Hono `Context` type
- `Record<string, any>` replaced with `Record<string, unknown>` in oauth.ts
- Non-null assertion on `authResult.data.user!.id` in login.ts replaced with proper null check
- TypeScript compiles with no errors (`tsc --noEmit` passes)
- All existing tests pass
- No breaking changes to API contracts

**Files in Scope:**
- `backend/src/routes/oauth.ts` (lines 8, 63, 115, 116)
- `backend/src/routes/register.ts` (line 5)
- `backend/src/routes/login.ts` (line 309)

### US-TI-002: Phase 2 - Moderate Type Safety Issues

As a developer, I want test mocks and type assertions to be properly typed so that tests accurately reflect production behavior and catch type-related regressions.

**Acceptance Criteria:**
- Supabase mock client properly typed (session, query builder returns)
- `as` assertions in oauth.ts replaced with runtime type guards or Zod validation
- Non-null assertions in oauth-e2e.test.ts replaced with proper null checks
- Test response data in matches.test.ts properly typed (no `as any` casts)
- TypeScript compiles with no errors
- All existing tests pass

**Files in Scope:**
- `backend/tests/mocks/supabase.ts` (lines 11, 15, 19, 23, 57, 68, 80-81, 89)
- `backend/src/routes/oauth.ts` (lines 44, 64-67, 119)
- `backend/tests/routes/oauth-e2e.test.ts` (lines 185, 288, 295, 346, 413)
- `backend/tests/routes/matches.test.ts` (lines 50, 53, 64, 89)

### US-TI-003: Phase 3 - Structural Type Improvements

As a developer, I want consistent type patterns across the codebase so that new code follows established conventions and the codebase remains maintainable.

**Acceptance Criteria:**
- `object` type in mcp-server/src/api.ts replaced with specific `PersonPreferences` interface
- Shared OAuth types extracted to `backend/src/schemas/oauth.ts`
- MCP tool handling uses discriminated unions instead of string comparisons
- Standardized test response type patterns documented and applied
- TypeScript compiles with no errors
- All existing tests pass

**Files in Scope:**
- `mcp-server/src/api.ts` (lines 78-79)
- New file: `backend/src/schemas/oauth.ts`
- `backend/src/routes/mcp.ts`
- All test files (pattern standardization)

## Technical Approach

### Phase 1: Critical Issues

1. **Hono Context Typing**
   - Import `Context` from 'hono' or use route-specific context types
   - Apply to all route handlers in oauth.ts and register.ts

2. **Record Type Safety**
   - Replace `Record<string, any>` with `Record<string, unknown>`
   - Add type narrowing where the values are accessed

3. **Null Safety**
   - Replace `authResult.data.user!.id` with:
     ```typescript
     if (!authResult.data.user) {
       return c.json({ error: 'User not found' }, 401);
     }
     const userId = authResult.data.user.id;
     ```

### Phase 2: Moderate Issues

1. **Mock Typing**
   - Create proper mock types that match Supabase client interface
   - Use `Partial<>` or `jest.Mocked<>` patterns as appropriate

2. **Type Guards**
   - Replace `as TokenResponse` assertions with Zod schemas or type guard functions
   - Example:
     ```typescript
     const tokenResponseSchema = z.object({
       access_token: z.string(),
       token_type: z.string(),
       // ...
     });
     const parsed = tokenResponseSchema.parse(response);
     ```

3. **Test Null Checks**
   - Replace `value!` with explicit checks or test assertions
   - Use `expect(value).toBeDefined()` before accessing properties

### Phase 3: Structural Improvements

1. **Preference Types**
   - Define `PersonPreferences` interface based on actual usage
   - Apply to api.ts and related files

2. **OAuth Type Extraction**
   - Move OAuth-related types from inline definitions to shared schema file
   - Export for use in both production and test code

3. **Discriminated Unions for MCP**
   - Create union type for MCP tool names
   - Use exhaustive switch statements for type-safe handling

## Implementation Tasks

### Phase 1 (Critical)
- `fix(types): replace any with Context type in oauth routes`
- `fix(types): replace any with Context type in register route`
- `fix(types): use Record<string, unknown> in oauth.ts`
- `fix(types): add null check for user in login.ts`

### Phase 2 (Moderate)
- `fix(types): properly type Supabase mock client`
- `fix(types): replace as assertions with type guards in oauth.ts`
- `fix(types): remove non-null assertions in oauth-e2e tests`
- `fix(types): type response data in matches tests`

### Phase 3 (Structural)
- `refactor(types): define PersonPreferences interface`
- `refactor(types): extract shared OAuth types to schema file`
- `refactor(types): add discriminated union for MCP tools`
- `docs(types): standardize test response type patterns`

## Success Criteria

- `tsc --noEmit` passes with no errors across all packages
- All existing tests pass without modification to test logic
- No breaking changes to public API contracts
- Zero `any` types in production code (backend/src/**)
- No non-null assertions (`!`) in production code

## Rollback Strategy

- Each task implemented as atomic conventional commit
- Each phase can be reverted independently if issues arise
- Feature branch with clean commit history for easy bisection

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Type changes reveal hidden bugs | Run full test suite after each change; fix actual bugs discovered |
| Mock typing breaks test behavior | Carefully match mock types to actual Supabase client interface |
| Type guards add runtime overhead | Use compile-time checks where possible; type guards only for external data |

## Dependencies

- None external
- Phase 2 can start after Phase 1 complete
- Phase 3 can start after Phase 2 complete

## Open Questions

1. Should we add ESLint rules to prevent `any` from being reintroduced?
2. Are there additional files with type issues not captured in the initial audit?
