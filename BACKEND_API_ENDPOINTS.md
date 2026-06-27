# Complete Backend API Endpoint Requirements

This document lists all API endpoints your backend must implement for full integration.

## Base URL
```
http://localhost:3001/api  (development)
https://api.yourdomain.com/api  (production)
```

## Authentication Endpoints

### Login
```
POST /auth/login
Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "user-123",
      "email": "user@example.com",
      "fullName": "John Doe"
    }
  }
}
```

### Register
```
POST /auth/register
Request:
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe"
}

Response:
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "user-123",
      "email": "user@example.com",
      "fullName": "John Doe"
    }
  }
}
```

### Refresh Token
```
POST /auth/refresh
Request: (no body, uses Authorization header)
Response:
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Logout
```
POST /auth/logout
Request: (no body, uses Authorization header)
Response:
{
  "success": true,
  "data": {
    "success": true
  }
}
```

## Matches & Odds Endpoints

### Get All Matches
```
GET /matches?sport=football&league=epl&status=live

Query Parameters (all optional):
- sport: "football", "basketball", "tennis", etc.
- league: "epl", "laliga", "nba", etc.
- status: "live", "upcoming", "finished"

Response:
{
  "success": true,
  "data": [
    {
      "id": "match-1",
      "sport": "football",
      "league": "epl",
      "leagueName": "English Premier League",
      "homeTeam": "Manchester United",
      "awayTeam": "Liverpool",
      "homeScore": 1,
      "awayScore": 2,
      "startTime": "2025-01-04T15:00:00Z",
      "status": "live",
      "minute": 67,
      "odds": {
        "home": 3.5,
        "draw": 3.8,
        "away": 1.95
      },
      "markets": []
    }
  ]
}
```

### Get Match Details
```
GET /matches/:matchId

Response:
{
  "success": true,
  "data": {
    "id": "match-1",
    "sport": "football",
    "league": "epl",
    "leagueName": "English Premier League",
    "homeTeam": "Manchester United",
    "awayTeam": "Liverpool",
    "homeScore": 1,
    "awayScore": 2,
    "startTime": "2025-01-04T15:00:00Z",
    "status": "live",
    "minute": 67,
    "odds": {
      "home": 3.5,
      "draw": 3.8,
      "away": 1.95
    },
    "markets": [
      {
        "id": "market-1",
        "name": "Match Result",
        "selections": [
          {
            "id": "sel-1",
            "name": "Manchester United",
            "odds": 3.5
          }
        ]
      }
    ]
  }
}
```

### Get Match Odds
```
GET /matches/:matchId/odds

Response:
{
  "success": true,
  "data": {
    "matchId": "match-1",
    "home": 3.5,
    "draw": 3.8,
    "away": 1.95,
    "lastUpdated": "2025-01-04T15:30:00Z"
  }
}
```

### Get Match Markets
```
GET /matches/:matchId/markets

Response:
{
  "success": true,
  "data": [
    {
      "id": "market-1",
      "name": "Match Result",
      "selections": [
        {
          "id": "sel-1",
          "name": "Home Win",
          "odds": 3.5
        },
        {
          "id": "sel-2",
          "name": "Draw",
          "odds": 3.8
        },
        {
          "id": "sel-3",
          "name": "Away Win",
          "odds": 1.95
        }
      ]
    },
    {
      "id": "market-2",
      "name": "Over/Under 2.5 Goals",
      "selections": [
        {
          "id": "sel-4",
          "name": "Over 2.5",
          "odds": 1.85
        },
        {
          "id": "sel-5",
          "name": "Under 2.5",
          "odds": 1.95
        }
      ]
    }
  ]
}
```

## Betting Endpoints

### Place Bet
```
POST /bets/place
Authorization: Bearer {token}

Request:
{
  "selections": [
    {
      "matchId": "match-1",
      "marketId": "market-1",
      "selectionId": "sel-1",
      "odds": 3.5
    }
  ],
  "stake": 100,
  "betType": "single"
}

Response:
{
  "success": true,
  "data": {
    "betId": "bet-123",
    "betSlip": {
      "id": "bet-123",
      "userId": "user-1",
      "selections": [...],
      "stake": 100,
      "totalOdds": 3.5,
      "potentialWin": 350,
      "status": "pending",
      "betType": "single",
      "createdAt": "2025-01-04T15:30:00Z"
    }
  }
}
```

### Get Bet History
```
GET /bets/history?status=pending&limit=10&offset=0
Authorization: Bearer {token}

Query Parameters (all optional):
- status: "pending", "won", "lost", "cancelled"
- limit: number (default: 20)
- offset: number (default: 0)

Response:
{
  "success": true,
  "data": [
    {
      "id": "bet-123",
      "userId": "user-1",
      "selections": [...],
      "stake": 100,
      "totalOdds": 3.5,
      "potentialWin": 350,
      "status": "pending",
      "betType": "single",
      "createdAt": "2025-01-04T15:30:00Z"
    }
  ]
}
```

### Get Bet Details
```
GET /bets/:betId
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "id": "bet-123",
    "userId": "user-1",
    "selections": [
      {
        "matchId": "match-1",
        "marketId": "market-1",
        "selectionId": "sel-1",
        "odds": 3.5,
        "selection": "Home Win"
      }
    ],
    "stake": 100,
    "totalOdds": 3.5,
    "potentialWin": 350,
    "status": "pending",
    "betType": "single",
    "createdAt": "2025-01-04T15:30:00Z",
    "settledAt": null
  }
}
```

### Cancel Bet
```
POST /bets/:betId/cancel
Authorization: Bearer {token}
Request: (no body)

Response:
{
  "success": true,
  "data": {
    "betId": "bet-123",
    "refundAmount": 100,
    "status": "cancelled"
  }
}
```

## Account Endpoints

### Get Account Info
```
GET /account
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "userId": "user-1",
    "email": "user@example.com",
    "balance": 1250.50,
    "totalBets": 156,
    "wonBets": 89,
    "pendingBets": 12,
    "totalWinnings": 3420.75
  }
}
```

### Get Balance
```
GET /account/balance
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "balance": 1250.50,
    "currency": "ETB"
  }
}
```

### Deposit
```
POST /account/deposit
Authorization: Bearer {token}

Request:
{
  "amount": 500,
  "method": "card"  // "card", "bank", "wallet"
}

Response:
{
  "success": true,
  "data": {
    "transactionId": "txn-123",
    "status": "success",
    "amount": 500,
    "newBalance": 1750.50
  }
}
```

### Withdraw
```
POST /account/withdraw
Authorization: Bearer {token}

Request:
{
  "amount": 200,
  "method": "bank"  // "card", "bank", "wallet"
}

Response:
{
  "success": true,
  "data": {
    "transactionId": "txn-124",
    "status": "processing",
    "amount": 200,
    "newBalance": 1050.50
  }
}
```

### Get Transaction History
```
GET /account/transactions?limit=20
Authorization: Bearer {token}

Query Parameters (all optional):
- limit: number (default: 20)
- offset: number (default: 0)
- type: "deposit", "withdrawal", "bet", "win"

Response:
{
  "success": true,
  "data": [
    {
      "id": "txn-123",
      "type": "deposit",
      "amount": 500,
      "status": "success",
      "method": "card",
      "createdAt": "2025-01-04T14:00:00Z"
    },
    {
      "id": "bet-123",
      "type": "bet",
      "amount": -100,
      "status": "pending",
      "createdAt": "2025-01-04T15:30:00Z"
    }
  ]
}
```

## WebSocket Endpoints (Real-Time Updates)

### Live Odds Updates
```
WS /live/odds/:matchId

Connection Opens:
{
  "type": "connected",
  "matchId": "match-1"
}

Incoming Messages:
{
  "type": "odds_update",
  "matchId": "match-1",
  "odds": {
    "home": 3.4,
    "draw": 3.9,
    "away": 2.0
  },
  "timestamp": "2025-01-04T15:31:00Z"
}
```

### Live Match Updates
```
WS /live/matches/:matchId

Connection Opens:
{
  "type": "connected",
  "matchId": "match-1"
}

Incoming Messages:
{
  "type": "match_update",
  "matchId": "match-1",
  "homeScore": 1,
  "awayScore": 2,
  "minute": 68,
  "status": "live",
  "timestamp": "2025-01-04T15:31:00Z"
}
```

## Error Response Format

All errors should follow this format:

```json
{
  "success": false,
  "error": "Descriptive error message",
  "code": "ERROR_CODE"
}
```

Common Error Codes:
- `UNAUTHORIZED` - Invalid or missing token
- `FORBIDDEN` - User doesn't have permission
- `NOT_FOUND` - Resource not found
- `INVALID_REQUEST` - Invalid request format
- `INSUFFICIENT_BALANCE` - Not enough balance for operation
- `BET_CLOSED` - Match already started, can't place bet
- `SERVER_ERROR` - Internal server error

## Status Codes

- 200 - Success
- 201 - Created
- 400 - Bad Request
- 401 - Unauthorized
- 403 - Forbidden
- 404 - Not Found
- 500 - Server Error

## Rate Limiting (Recommended)

Consider implementing:
- 100 requests per minute per user for public endpoints
- 1000 requests per minute per user for authenticated endpoints

## Security Notes

1. Always validate JWT tokens on the backend
2. Use HTTPS in production
3. Hash passwords with bcrypt (minimum 10 rounds)
4. Validate all input on the backend
5. Implement CORS to allow requests from your frontend domain
6. Store sensitive data encrypted
7. Don't expose user IDs or sensitive data in error messages
