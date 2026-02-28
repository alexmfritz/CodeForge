// Positive reinforcement pool — shown in the toast when all tests pass
const MESSAGES = [
  'Nailed it! All tests passing!',
  'You got it! Great problem solving!',
  'All tests green — nice work!',
  'Crushed it! Moving right along!',
  'Excellent! That was solid coding!',
  'Boom! Another one in the books!',
  'Well done! Keep up the momentum!',
  'Perfect score! You should be proud!',
];

// Track last pick to avoid showing the same message back-to-back
let lastIndex = -1;

export function getRandomCelebration(): string {
  let idx: number;
  // Re-roll until we get a different message than last time
  do {
    idx = Math.floor(Math.random() * MESSAGES.length);
  } while (idx === lastIndex && MESSAGES.length > 1);
  lastIndex = idx;
  return MESSAGES[idx];
}
