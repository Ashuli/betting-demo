# Backend API Requirements for Sports Betting Platform

## Overview
This document outlines all the API endpoints and data structures your backend needs to implement to support the AddisMark sports betting platform.

---

## 1. AUTHENTICATION ENDPOINTS

### POST /api/auth/register
Register a new user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "fullName": "John Doe"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user123",
      "email": "user@example.com",
      "fullName": "John Doe",
      "balance": 0,
      "createdAt": "2025-01-04T10:00:00Z"
    }
  }
}
```

---

### POST /api/auth/login
Login user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user123",
      "email": "user@example.com",
      "balance": 1250.50
    }
  }
}
```

---

### POST /api/auth/logout
Logout user (invalidate token on backend).

**Response (200):**
```json
{
  "success": true,
  "data": {
    "success": true
  }
}
```

---

### POST /api/auth/refresh
Refresh JWT token.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "new_jwt_token"
  }
}
```

---

## 2. MATCHES & ODDS ENDPOINTS

### GET /api/matches
Get all matches with optional filters.

**Query Parameters:**
- `sport` (optional): "football", "basketball", "tennis", "cricket", "mma", "hockey", "baseball", "esports"
- `league` (optional): League ID
- `status` (optional): "live", "upcoming", "finished"

**Response (200):**
```json
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
      }
    }
  ]
}
```

---

### GET /api/matches/:matchId
Get detailed match information.

**Response (200):**
```json
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
        "name": "Both Teams to Score",
        "selections": [
          {
            "id": "sel-1",
            "name": "Yes",
            "odds": 1.70
          },
          {
            "id": "sel-2",
            "name": "No",
            "odds": 2.10
          }
        ]
      }
    ]
  }
}
```

---

### GET /api/matches/:matchId/odds
Get live odds for a specific match.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "matchId": "match-1",
    "updatedAt": "2025-01-04T15:30:00Z",
    "odds": {
      "home": 3.5,
      "draw": 3.8,
      "away": 1.95
    }
  }
}
```

---

### GET /api/matches/:matchId/markets
Get all available markets for a match.

**Response (200):**
```json
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
      "name": "Both Teams to Score",
      "selections": [
        {
          "id": "sel-4",
          "name": "Yes",
          "odds": 1.70
        },
        {
          "id": "sel-5",
          "name": "No",
          "odds": 2.10
        }
      ]
    }
  ]
}
```

---

## 3. BETTING ENDPOINTS

### POST /api/bets/place
Place a new bet.

**Request:**
```json
{
  "selections": [
    {
      "matchId": "match-1",
      "marketId": "market-1",
      "selectionId": "sel-1",
      "odds": 3.5
    },
    {
      "matchId": "match-2",
      "marketId": "market-2",
      "selectionId": "sel-4",
      "odds": 1.95
    }
  ],
  "stake": 100,
  "betType": "accumulator"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "betId": "bet-123",
    "betSlip": {
      "id": "bet-123",
      "userId": "user123",
      "selections": [
        {
          "matchId": "match-1",
          "marketId": "market-1",
          "selectionId": "sel-1",
          "odds": 3.5,
          "matchName": "Man United vs Liverpool",
          "selectionName": "Home Win"
        },
        {
          "matchId": "match-2",
          "marketId": "market-2",
          "selectionId": "sel-4",
          "odds": 1.95,
          "matchName": "Arsenal vs Chelsea",
          "selectionName": "Both Teams to Score"
        }
      ],
      "stake": 100,
      "totalOdds": 6.825,
      "potentialWin": 682.50,
      "betType": "accumulator",
      "status": "pending",
      "createdAt": "2025-01-04T15:35:00Z"
    }
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Insufficient balance",
  "code": "INSUFFICIENT_BALANCE"
}
```

---

### GET /api/bets/history
Get user's bet history with pagination.

**Query Parameters:**
- `status` (optional): "pending", "won", "lost", "cancelled"
- `limit` (optional): Number of bets (default: 20)
- `offset` (optional): Pagination offset (default: 0)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "bet-123",
      "selections": [
        {
          "matchId": "match-1",
          "marketId": "market-1",
          "selectionName": "Home Win",
          "matchName": "Man United vs Liverpool",
          "odds": 3.5
        }
      ],
      "stake": 50,
      "totalOdds": 3.5,
      "potentialWin": 175,
      "status": "pending",
      "betType": "single",
      "createdAt": "2025-01-04T15:35:00Z"
    }
  ]
}
```

---

### GET /api/bets/:betId
Get specific bet details.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "bet-123",
    "userId": "user123",
    "selections": [
      {
        "matchId": "match-1",
        "marketId": "market-1",
        "selectionId": "sel-1",
        "matchName": "Man United vs Liverpool",
        "selectionName": "Home Win",
        "odds": 3.5
      }
    ],
    "stake": 50,
    "totalOdds": 3.5,
    "potentialWin": 175,
    "actualWin": 0,
    "betType": "single",
    "status": "pending",
    "createdAt": "2025-01-04T15:35:00Z",
    "settledAt": null
  }
}
```

---

### POST /api/bets/:betId/cancel
Cancel a pending bet.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "betId": "bet-123",
    "refundAmount": 50,
    "status": "cancelled"
  }
}
```

---

## 4. ACCOUNT ENDPOINTS

### GET /api/account
Get user account information.

**Headers Required:**
- `Authorization: Bearer {token}`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "userId": "user123",
    "email": "user@example.com",
    "fullName": "John Doe",
    "balance": 1250.50,
    "currency": "USD",
    "totalBets": 156,
    "wonBets": 89,
    "pendingBets": 12,
    "totalWinnings": 3420.75,
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

---

### GET /api/account/balance
Get current account balance.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "balance": 1250.50,
    "currency": "USD",
    "lastUpdated": "2025-01-04T15:40:00Z"
  }
}
```

---

### POST /api/account/deposit
Process a deposit.

**Request:**
```json
{
  "amount": 500,
  "method": "card"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "transactionId": "txn-123456",
    "amount": 500,
    "status": "pending",
    "method": "card",
    "createdAt": "2025-01-04T15:45:00Z",
    "newBalance": 1750.50
  }
}
```

---

### POST /api/account/withdraw
Process a withdrawal.

**Request:**
```json
{
  "amount": 200,
  "method": "bank"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "transactionId": "txn-654321",
    "amount": 200,
    "status": "processing",
    "method": "bank",
    "createdAt": "2025-01-04T15:50:00Z",
    "newBalance": 1050.50
  }
}
```

---

### GET /api/account/transactions
Get transaction history.

**Query Parameters:**
- `limit` (optional): Number of transactions (default: 50)
- `offset` (optional): Pagination offset (default: 0)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "txn-123456",
      "type": "deposit",
      "amount": 500,
      "method": "card",
      "status": "completed",
      "createdAt": "2025-01-04T15:45:00Z",
      "reference": "ref-123"
    },
    {
      "id": "txn-bet-789",
      "type": "bet",
      "amount": -50,
      "status": "completed",
      "betId": "bet-123",
      "createdAt": "2025-01-04T15:35:00Z"
    }
  ]
}
```

---

## 5. WEBSOCKET ENDPOINTS

### WS /api/live/odds/:matchId
Real-time odds updates for a specific match.

**Message Format (Server → Client):**
```json
{
  "type": "odds_update",
  "matchId": "match-1",
  "odds": {
    "home": 3.5,
    "draw": 3.8,
    "away": 1.95
  },
  "timestamp": "2025-01-04T15:40:00Z"
}
```

---

### WS /api/live/matches/:matchId
Real-time match updates.

**Message Format (Server → Client):**
```json
{
  "type": "match_update",
  "matchId": "match-1",
  "homeScore": 1,
  "awayScore": 2,
  "minute": 67,
  "status": "live",
  "timestamp": "2025-01-04T15:40:00Z"
}
```

---

## 6. ERROR RESPONSES

### Standard Error Format
All errors should follow this format:

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

### Common Error Codes
- `UNAUTHORIZED`: Missing or invalid authentication token
- `INSUFFICIENT_BALANCE`: User doesn't have enough balance to place bet
- `INVALID_ODDS`: Odds have changed since bet placement
- `MATCH_NOT_FOUND`: Match ID doesn't exist
- `BET_NOT_FOUND`: Bet ID doesn't exist
- `INVALID_BET_TYPE`: Invalid bet type provided
- `DUPLICATE_SELECTION`: Same match selected twice in single bet
- `MARKET_CLOSED`: Market is closed for betting
- `SERVER_ERROR`: Internal server error

---

## 7. AUTHENTICATION REQUIREMENTS

- Use JWT tokens for all authenticated requests
- Include token in `Authorization: Bearer {token}` header
- Tokens should expire after 24 hours
- Implement token refresh mechanism
- Validate token signature and expiry on every request

---

## 8. DATA VALIDATION

### Stake Validation
- Minimum stake: $1
- Maximum stake: $10,000
- Must not exceed user balance

### Odds Validation
- Store original odds when bet is placed
- Validate odds match at bet settlement
- If odds change >10%, reject bet with specific error

### Selection Validation
- No duplicate matches in single bet (accumulator can use same match for different markets)
- All selections must be for valid matches
- All markets must be open for betting

---

## 9. RESPONSE HEADERS

All API responses should include:
```
Content-Type: application/json
X-Request-ID: unique-request-id
Cache-Control: no-cache, no-store, must-revalidate
```

---

## 10. RATE LIMITING

- Implement rate limiting: 100 requests per minute per user
- Return `429 Too Many Requests` when limit exceeded
- Include `Retry-After` header in response

---

## 11. DATA PERSISTENCE

### User Table
- id (primary key)
- email (unique)
- password (hashed)
- fullName
- balance
- currency
- totalBets
- wonBets
- totalWinnings
- status (active, suspended, closed)
- createdAt
- updatedAt

### Bet Table
- id (primary key)
- userId (foreign key)
- selections (JSON)
- stake
- totalOdds
- potentialWin
- actualWin (null for pending)
- betType (single, accumulator)
- status (pending, won, lost, cancelled)
- createdAt
- settledAt (null for pending)

### Transaction Table
- id (primary key)
- userId (foreign key)
- type (deposit, withdraw, bet, win, refund)
- amount
- method (card, bank, wallet)
- status
- reference
- betId (nullable)
- createdAt

### Match Table
- id (primary key)
- sport
- league
- leagueName
- homeTeam
- awayTeam
- homeScore
- awayScore
- status (live, upcoming, finished)
- minute
- startTime
- createdAt
- updatedAt

### Odds Table
- id (primary key)
- matchId (foreign key)
- home
- draw
- away
- updatedAt

---

## Environment Variables Required

```
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=86400
NODE_ENV=production
LOG_LEVEL=info
```

---
