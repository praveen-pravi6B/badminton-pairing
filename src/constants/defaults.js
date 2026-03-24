export const PLAYER_TYPES = {
  ADVANCED: 'advanced',
  INTERMEDIATE: 'intermediate',
}

export const LS_KEYS = {
  PLAYERS: 'badminton_players',
  LAST_PAIRS: 'badminton_last_pairs',
  ROUND_NUMBER: 'badminton_round_number',
}

const genId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

export const DEFAULT_PLAYERS = [
  // Advanced
  { id: genId(), name: 'Maan', type: PLAYER_TYPES.ADVANCED },
  { id: genId(), name: 'Sundar', type: PLAYER_TYPES.ADVANCED },
  { id: genId(), name: 'Vishnu', type: PLAYER_TYPES.ADVANCED },
  { id: genId(), name: 'Suresh', type: PLAYER_TYPES.ADVANCED },
  { id: genId(), name: 'SP', type: PLAYER_TYPES.ADVANCED },
  { id: genId(), name: 'Nandhakumar', type: PLAYER_TYPES.ADVANCED },
  { id: genId(), name: 'Arvind', type: PLAYER_TYPES.ADVANCED },
  { id: genId(), name: 'Francis', type: PLAYER_TYPES.ADVANCED },
  // Intermediate
  { id: genId(), name: 'Sowndariya', type: PLAYER_TYPES.INTERMEDIATE },
  { id: genId(), name: 'Vichu', type: PLAYER_TYPES.INTERMEDIATE },
  { id: genId(), name: 'Swetha', type: PLAYER_TYPES.INTERMEDIATE },
  { id: genId(), name: 'Praveena', type: PLAYER_TYPES.INTERMEDIATE },
  { id: genId(), name: 'Praveen', type: PLAYER_TYPES.INTERMEDIATE },
  { id: genId(), name: 'Kowsaliya', type: PLAYER_TYPES.INTERMEDIATE },
  { id: genId(), name: 'Abeeb', type: PLAYER_TYPES.INTERMEDIATE },
  { id: genId(), name: 'Pradeep', type: PLAYER_TYPES.INTERMEDIATE },
]
