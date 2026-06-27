// Team logo URL mapping
// Football: football-data.org (free, no auth required for images)
// Basketball/Hockey: ESPN public CDN
// Fallback: UI Avatars API (colored initials)

const FOOTBALL_DATA = (id: number) =>
  `https://crests.football-data.org/${id}.svg`

const ESPN_NBA = (abbr: string) =>
  `https://a.espncdn.com/i/teamlogos/nba/500/${abbr}.png`

const ESPN_NHL = (abbr: string) =>
  `https://a.espncdn.com/i/teamlogos/nhl/500/${abbr}.png`

const ESPN_MLB = (abbr: string) =>
  `https://a.espncdn.com/i/teamlogos/mlb/500/${abbr}.png`

// Colored initials fallback using ui-avatars
export function getInitialsLogo(name: string, bg = "4f46e5") {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${bg}&color=fff&size=64&bold=true&format=svg`
}

// Master mapping of team name → logo URL
export const teamLogos: Record<string, string> = {
  // ── Football / Soccer (football-data.org) ────────────────────────────────
  "Manchester United": FOOTBALL_DATA(66),
  "Liverpool": FOOTBALL_DATA(64),
  "Arsenal": FOOTBALL_DATA(57),
  "Chelsea": FOOTBALL_DATA(61),
  "Manchester City": FOOTBALL_DATA(65),
  "Tottenham": FOOTBALL_DATA(73),
  "Brighton and Hove Albion": FOOTBALL_DATA(397),
  "Brighton": FOOTBALL_DATA(397),
  "West Ham United": FOOTBALL_DATA(563),
  "Fulham": FOOTBALL_DATA(341),
  "Crystal Palace": FOOTBALL_DATA(354),
  "Everton": FOOTBALL_DATA(62),

  "Real Madrid": FOOTBALL_DATA(86),
  "Barcelona": FOOTBALL_DATA(81),
  "Atletico Madrid": FOOTBALL_DATA(78),
  "Valencia": FOOTBALL_DATA(95),
  "Villarreal": FOOTBALL_DATA(94),

  "Bayern Munich": FOOTBALL_DATA(5),
  "Borussia Dortmund": FOOTBALL_DATA(4),
  "Bayer Leverkusen": FOOTBALL_DATA(3),
  "RB Leipzig": FOOTBALL_DATA(721),
  "Stuttgart": FOOTBALL_DATA(8),
  "Wolfsburg": FOOTBALL_DATA(11),

  "AC Milan": FOOTBALL_DATA(98),
  "Inter Milan": FOOTBALL_DATA(108),
  "Juventus": FOOTBALL_DATA(109),
  "Napoli": FOOTBALL_DATA(113),

  "PSG": FOOTBALL_DATA(524),
  "Marseille": FOOTBALL_DATA(516),
  "Monaco": FOOTBALL_DATA(548),
  "Lyon": FOOTBALL_DATA(523),

  // ── NBA Basketball (ESPN CDN) ─────────────────────────────────────────────
  "LA Lakers": ESPN_NBA("lal"),
  "Golden State Warriors": ESPN_NBA("gs"),
  "Boston Celtics": ESPN_NBA("bos"),
  "Miami Heat": ESPN_NBA("mia"),
  "Denver Nuggets": ESPN_NBA("den"),
  "Phoenix Suns": ESPN_NBA("phx"),
  "Milwaukee Bucks": ESPN_NBA("mil"),
  "Philadelphia 76ers": ESPN_NBA("phi"),
  "Dallas Mavericks": ESPN_NBA("dal"),
  "Houston Rockets": ESPN_NBA("hou"),
  "Los Angeles Clippers": ESPN_NBA("lac"),
  "Sacramento Kings": ESPN_NBA("sac"),
  "Chicago Bulls": ESPN_NBA("chi"),
  "Brooklyn Nets": ESPN_NBA("bkn"),
  "Toronto Raptors": ESPN_NBA("tor"),
  "New York Knicks": ESPN_NBA("ny"),
  "Atlanta Hawks": ESPN_NBA("atl"),
  "Washington Wizards": ESPN_NBA("wsh"),
  "Indiana Pacers": ESPN_NBA("ind"),
  "Cleveland Cavaliers": ESPN_NBA("cle"),
  "Memphis Grizzlies": ESPN_NBA("mem"),
  "New Orleans Pelicans": ESPN_NBA("no"),
  "San Antonio Spurs": ESPN_NBA("sa"),
  "Oklahoma City Thunder": ESPN_NBA("okc"),
  "Minnesota Timberwolves": ESPN_NBA("min"),
  "Portland Trail Blazers": ESPN_NBA("por"),
  "Utah Jazz": ESPN_NBA("utah"),

  // ── NHL Hockey (ESPN CDN) ─────────────────────────────────────────────────
  "Toronto Maple Leafs": ESPN_NHL("tor"),
  "Montreal Canadiens": ESPN_NHL("mtl"),
  "New York Rangers": ESPN_NHL("nyr"),
  "Boston Bruins": ESPN_NHL("bos"),
  "Colorado Avalanche": ESPN_NHL("col"),
  "St. Louis Blues": ESPN_NHL("stl"),
  "Vegas Golden Knights": ESPN_NHL("vgk"),
  "Anaheim Ducks": ESPN_NHL("ana"),
  "Pittsburgh Penguins": ESPN_NHL("pit"),
  "Tampa Bay Lightning": ESPN_NHL("tb"),
  "Florida Panthers": ESPN_NHL("fla"),
  "Carolina Hurricanes": ESPN_NHL("car"),
  "Seattle Kraken": ESPN_NHL("sea"),
  "Vancouver Canucks": ESPN_NHL("van"),
  "Edmonton Oilers": ESPN_NHL("edm"),
  "Calgary Flames": ESPN_NHL("cgy"),

  // ── MLB Baseball (ESPN CDN) ───────────────────────────────────────────────
  "New York Yankees": ESPN_MLB("nyy"),
  "Los Angeles Dodgers": ESPN_MLB("lad"),
  "Boston Red Sox": ESPN_MLB("bos"),
  "Chicago Cubs": ESPN_MLB("chc"),
  "San Francisco Giants": ESPN_MLB("sf"),
  "Houston Astros": ESPN_MLB("hou"),
  "Atlanta Braves": ESPN_MLB("atl"),

  // ── Cricket (colored initials) ────────────────────────────────────────────
  "Mumbai Indians": getInitialsLogo("MI", "004ba0"),
  "Chennai Super Kings": getInitialsLogo("CSK", "f9cd0b"),
  "Royal Challengers": getInitialsLogo("RCB", "c8102e"),
  "Bangalore Royal Challengers": getInitialsLogo("RCB", "c8102e"),
  "Kolkata Knight Riders": getInitialsLogo("KKR", "3a225d"),
  "Delhi Capitals": getInitialsLogo("DC", "0078bc"),
  "India": getInitialsLogo("IND", "ff9933"),
  "Australia": getInitialsLogo("AUS", "00843d"),
  "England": getInitialsLogo("ENG", "012169"),

  // ── MMA / UFC (colored initials) ─────────────────────────────────────────
  "Islam Makhachev": getInitialsLogo("IM", "c8102e"),
  "Charles Oliveira": getInitialsLogo("CO", "009c3b"),
  "Jon Jones": getInitialsLogo("JJ", "0a3161"),
  "Stipe Miocic": getInitialsLogo("SM", "002395"),
  "Alexander Volkanovski": getInitialsLogo("AV", "00843d"),
  "Tom Aspinall": getInitialsLogo("TA", "c8102e"),
  "Colby Covington": getInitialsLogo("CC", "b22234"),
  "Leon Edwards": getInitialsLogo("LE", "c8102e"),

  // ── Tennis (colored initials) ─────────────────────────────────────────────
  "Djokovic N.": getInitialsLogo("DJ", "003da5"),
  "Alcaraz C.": getInitialsLogo("AC", "aa151b"),
  "Sinner J.": getInitialsLogo("JS", "009246"),
  "Rune H.": getInitialsLogo("HR", "c60c30"),
  "Medvedev D.": getInitialsLogo("DM", "003da5"),
  "Swiatek I.": getInitialsLogo("IS", "c8102e"),
  "Sabalenka A.": getInitialsLogo("AS", "007a33"),
  "Gauff C.": getInitialsLogo("CG", "002868"),
  "Rybakina E.": getInitialsLogo("ER", "00afca"),
  "Jannik Sinner": getInitialsLogo("JS", "009246"),
  "Daniil Medvedev": getInitialsLogo("DM", "003da5"),
  "Aryna Sabalenka": getInitialsLogo("AS", "007a33"),
  "Ons Jabeur": getInitialsLogo("OJ", "e70013"),

  // ── Esports (colored initials) ────────────────────────────────────────────
  "T1": getInitialsLogo("T1", "c8102e"),
  "Gen.G": getInitialsLogo("GG", "ffc72c"),
  "Damwon Gaming": getInitialsLogo("DK", "006cae"),
  "FaZe Clan": getInitialsLogo("FZ", "c8102e"),
  "Natus Vincere": getInitialsLogo("NV", "f7c400"),
  "Heroic": getInitialsLogo("HC", "e4002b"),
  "Cloud9": getInitialsLogo("C9", "75b2dd"),
  "Team Spirit": getInitialsLogo("TS", "0033a0"),
  "Team Liquid": getInitialsLogo("TL", "1b90c4"),
  "Evil Geniuses": getInitialsLogo("EG", "0033a0"),
  "Virtus.pro": getInitialsLogo("VP", "e4002b"),

  // ── EuroLeague Basketball ─────────────────────────────────────────────────
  "Olympiacos": getInitialsLogo("OLY", "c8102e"),
  "CSKA Moscow": getInitialsLogo("CSK", "003da5"),
}

/**
 * Returns the logo URL for a team, or a fallback initials avatar.
 */
export function getTeamLogo(teamName: string): string {
  return teamLogos[teamName] ?? getInitialsLogo(teamName, "6366f1")
}
