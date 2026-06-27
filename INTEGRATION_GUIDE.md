# Backend Integration Guide

This document outlines how the frontend is integrated with your backend API and what endpoints you need to implement.

## Environment Setup

Add this to your `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Update `NEXT_PUBLIC_API_URL` to your backend's base API URL in production.

## Architecture Overview

### API Flow Diagram

```
User Action (Click odds, place bet, etc.)
    ↓
React Component (page.tsx, bet-slip.tsx, etc.)
    ↓
React Hook (useMatches, useAccount, useBets)
    ↓
Service Layer (BetService, AccountService)
    ↓
API Client (apiClient with auth & error handling)
    ↓
Backend API Endpoint
    ↓
Database
```

## Key Integration Files

### 1. **lib/api-client.ts** - Central API Client
- All HTTP requests go through this class
- Automatically adds JWT token from localStorage as Bearer token
- Handles request/response formatting
- Centralized error handling
- WebSocket support for real-time odds and match updates

### 2. **Service Layer**
- **lib/services/bet-service.ts** - Betting operations (place, history, details, cancel)
- **lib/services/account-service.ts** - Account operations (balance, deposit, withdraw, transactions)
- Both provide error handling and response validation

### 3. **React Hooks**
- **hooks/use-matches.ts** - Fetches matches with optional filters (sport, league, status)
- **hooks/use-account.ts** - Fetches user account info (balance, bet stats)
- **hooks/use-bets.ts** - Fetches bet history with filters
- All hooks have loading and error states

### 4. **Components Using Integration**
- **app/page.tsx** - Main page uses `useMatches` hook to fetch live/upcoming matches
- **components/betting/bet-slip.tsx** - Uses `BetService.placeBet()` to submit bets

## Required Backend Endpoints

Your backend must implement these endpoints for the integration to work fully:

### Authentication
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
POST /api/auth/refresh
```

### Matches & Odds
```
GET /api/matches - Fetch all matches (with optional filters)
GET /api/matches/:matchId - Get match details
GET /api/matches/:matchId/odds - Get current odds
GET /api/matches/:matchId/markets - Get available markets
```

### Betting
```
POST /api/bets/place - Place a new bet
GET /api/bets/history - Get user's bet history
GET /api/bets/:betId - Get bet details
POST /api/bets/:betId/cancel - Cancel a pending bet
```

### Account
```
GET /api/account - Get user account info
GET /api/account/balance - Get current balance
POST /api/account/deposit - Process deposit
POST /api/account/withdraw - Process withdrawal
GET /api/account/transactions - Get transaction history
```

### Live Data (WebSocket)
```
WS /api/live/odds/:matchId - Real-time odds updates
WS /api/live/matches/:matchId - Real-time match updates (score, status, minute)
```

## Response Format Requirements

All API endpoints should return responses in this format:

### Success Response
```json
{
  "success": true,
  "data": {
    // Your data here
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message here",
  "code": "ERROR_CODE"
}
```

### Authentication Header
```
Authorization: Bearer <JWT_TOKEN>
```

## Data Models

### Match
```typescript
{
  id: string
  sport: string
  league: string
  leagueName: string
  homeTeam: string
  awayTeam: string
  homeScore?: number
  awayScore?: number
  startTime: string (ISO 8601)
  status: "upcoming" | "live" | "finished"
  minute?: number
  odds: {
    home: number
    draw: number
    away: number
  }
  markets: Market[]
}
```

### Bet
```typescript
{
  id: string
  userId: string
  selections: {
    matchId: string
    marketId: string
    selectionId: string
    odds: number
    selection: string
  }[]
  stake: number
  totalOdds: number
  potentialWin: number
  status: "pending" | "won" | "lost" | "cancelled"
  betType: "single" | "accumulator"
  createdAt: string
  settledAt?: string
}
```

### Account
```typescript
{
  userId: string
  email: string
  balance: number
  totalBets: number
  wonBets: number
  pendingBets: number
  totalWinnings: number
}
```

## Testing Without Backend

The app automatically falls back to mock data if API calls fail. To test the UI:

1. The `NEXT_PUBLIC_API_URL` can be set to any value
2. If the API is unavailable, the app uses mock data from `lib/mock-data.ts`
3. Check browser console for API errors
4. Bet placement will show errors but won't crash the app

## Common Integration Checklist

- [ ] Backend API is running on the correct URL
- [ ] `NEXT_PUBLIC_API_URL` environment variable is set
- [ ] All endpoints are implemented with correct request/response formats
- [ ] JWT tokens are issued and validated correctly
- [ ] CORS is configured to allow frontend requests
- [ ] Database tables are created for users, matches, bets, transactions
- [ ] Error responses follow the expected format
- [ ] Authentication token is included in Authorization header for protected endpoints

## Debugging Tips

### Check API Calls
1. Open browser DevTools → Network tab
2. Check requests to `NEXT_PUBLIC_API_URL`
3. Verify response format matches expected structure

### Enable Debug Logs
The API client logs errors to console with `[v0]` prefix:
```
[v0] API Error: Failed to fetch matches
```

### Verify Token
In browser console:
```javascript
localStorage.getItem('auth_token')
```

## Environment Variables

### Development
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Production
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
```

## Next Steps

1. Implement all required API endpoints on your backend
2. Set `NEXT_PUBLIC_API_URL` in environment variables (use the Vars section in v0 sidebar)
3. Test endpoints individually using Postman or curl
4. Verify response formats match the requirements above
5. Test the full flow: select bet → place bet → confirm
6. Monitor console for any API errors

## Support

For issues with the integration:
- Check console logs for API errors
- Verify backend is running and accessible
- Ensure all environment variables are set correctly
- Verify response format matches the expected structure above
