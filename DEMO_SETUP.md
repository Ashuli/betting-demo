# Sports Betting Platform - Demo Setup Guide

## Overview
This demo is fully functional without needing a backend API. All data is provided through mock data that simulates real betting scenarios.

## Features Available in Demo

### ✅ What Works Out of the Box

1. **Live Matches** (4 active matches)
   - Manchester United vs Liverpool (Football) - EPL
   - Real Madrid vs Barcelona (Football) - La Liga
   - LA Lakers vs Golden State Warriors (Basketball) - NBA
   - Sinner J. vs Medvedev D. (Tennis) - ATP

2. **Upcoming Matches** (50+ matches)
   - 20+ Football matches across 5 major leagues
   - 7+ Basketball matches (NBA & EuroLeague)
   - 8+ Tennis matches (ATP & WTA)
   - 4+ Cricket matches
   - 4+ MMA/UFC matches
   - 4+ Hockey matches
   - 6+ E-Sports matches

3. **Betting Functionality**
   - Browse all matches and odds
   - Add selections to bet slip
   - Place bets with custom stake amounts
   - Automatic bet ID generation for demo
   - Success confirmation with bet details

4. **Account Dashboard**
   - Current balance: $5,250.75
   - Total bets placed: 156
   - Bets won: 89
   - Pending bets: 12
   - Total winnings: $8,420.50

5. **Bet History**
   - 5 sample bets showing different statuses
   - Won bets: 2
   - Lost bets: 1
   - Pending bets: 2

6. **Multi-Sport Coverage**
   - Football (EPL, La Liga, Bundesliga, Serie A, Ligue 1)
   - Basketball (NBA, EuroLeague)
   - Tennis (ATP, WTA)
   - Cricket (IPL, Test)
   - MMA/UFC
   - Ice Hockey (NHL)
   - E-Sports (LoL, CS2, Dota 2)

## How to Use the Demo

### Viewing Matches
1. Click on **Live** to see active matches with live scores
2. Click on **Upcoming** to browse future matches
3. Filter by sport in the sidebar
4. View detailed match information and odds

### Placing a Bet
1. Click on the odds for any selection (e.g., "Home Win", "Away Win", "Draw")
2. The selection appears in the **Bet Slip** (right side)
3. Enter your desired stake amount
4. Choose bet type: **Single** or **Accumulator**
5. Click **Place Bet**
6. Receive confirmation with unique bet ID

### Viewing Your Account
1. Click on **Dashboard** in the sidebar
2. View account statistics and balance
3. Check **Bet History** to see all your bets
4. Filter bets by status (Won, Lost, Pending)

### Viewing Wallet
1. Go to **Dashboard → Wallet**
2. See transaction history (deposit/withdrawal history)
3. View current balance breakdown

## Sample Data Breakdown

### Match Statistics
- **Total Matches**: 54+ unique matches
- **Live Matches**: 4
- **Upcoming Matches**: 50+
- **Sports Covered**: 8
- **Leagues**: 15+

### Account Stats
- **Email**: demo@sportsbetting.com
- **Balance**: $5,250.75
- **Total Bets Placed**: 156
- **Winning Rate**: 57% (89/156 won)
- **Pending Bets**: 12
- **Total Winnings**: $8,420.50

### Bet History Samples
1. **Won Bet** - Manchester United vs Liverpool (Win) - $100 stake → $195 won
2. **Pending Bet** - Arsenal vs Chelsea + Bayern Munich vs Dortmund (Parlay)
3. **Lost Bet** - Real Madrid vs Barcelona (Draw didn't happen)
4. **Won Bet** - Boston Celtics vs Miami Heat (Win) - $200 stake → $290 won
5. **Pending Bet** - Djokovic vs Alcaraz (Alcaraz Win)

## Demo-Specific Behavior

### Bet Placement
- When you place a bet, a unique **Bet ID** is generated automatically
- Status is set to "Pending" initially
- Confirmation shows potential winnings
- All bets are stored in browser context (not persisted)

### Odds & Markets
- Odds update based on match status
- Live matches show current score
- Upcoming matches show start time countdown
- All odds are realistic and varied

### User Account
- Pre-populated with realistic stats
- Balance updates conceptually (not for demo)
- Bet history shows mix of won/lost/pending bets

## Testing Scenarios

### Scenario 1: Single Bet
1. Find a live match (e.g., Manchester United vs Liverpool)
2. Click "Liverpool Win" (odds: 1.95)
3. Enter stake: $100
4. Click "Place Bet"
5. See confirmation: Potential win = $195

### Scenario 2: Accumulator Bet
1. Add 3-4 selections from different matches
2. Change bet type to "Accumulator"
3. Enter stake: $50
4. Click "Place Bet"
5. See combined odds calculated automatically

### Scenario 3: Browse Multiple Sports
1. Use sidebar to filter by sport
2. Switch between Football, Basketball, Tennis, etc.
3. View sport-specific leagues and matches
4. Place bets across different sports

## Demo Limitations

- ❌ No actual payment processing
- ❌ Bets not saved to database (cleared on refresh)
- ❌ No real-time odds updates (static odds)
- ❌ No authentication required
- ❌ No withdrawal/deposit functionality
- ❌ No live score updates (scores are static)

## Transitioning to Production

When ready to connect a real backend:

1. **Set Environment Variable**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
   ```

2. **Implement Backend APIs**
   - See `BACKEND_API_ENDPOINTS.md` for complete specification
   - See `INTEGRATION_GUIDE.md` for integration instructions

3. **Update Hooks** (if needed)
   - Remove mock data fallbacks from hooks
   - Add proper error handling

4. **Data Persistence**
   - Implement database storage for bets
   - Add user authentication
   - Add payment gateway integration

## API Integration Points

All demo data can be easily replaced with real backend calls:

- `useMatches()` → `GET /api/matches`
- `useAccount()` → `GET /api/account`
- `useBets()` → `GET /api/bets/history`
- `BetService.placeBet()` → `POST /api/bets/place`

See `BACKEND_API_ENDPOINTS.md` for detailed endpoint specifications.

## Support

For production deployment or API integration help, refer to:
- `INTEGRATION_GUIDE.md` - Complete integration documentation
- `BACKEND_API_ENDPOINTS.md` - API specifications
- `BACKEND_API_REQUIREMENTS.md` - Endpoint requirements

---

**Current Version**: Demo v1.0  
**Last Updated**: June 27, 2026  
**Backend Status**: Mock Data Only (No Backend Required)
