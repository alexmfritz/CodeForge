export const CHAT_NORMS = [
  'Be respectful and supportive of your peers.',
  'Ask specific questions — include what you tried and what happened.',
  'Share code snippets to help others understand your question.',
  'Celebrate others\' progress and achievements.',
  'Stay on topic — focus on coding exercises and learning.',
  'No sharing of answers — help others learn, don\'t do it for them.',
  'Use @mentions to get someone\'s attention.',
  'If you\'re stuck, describe what you expect vs. what you see.',
  'Help when you can — teaching others strengthens your understanding.',
  'Keep messages constructive and professional.',
];

export const HELP_EXAMPLES = [
  {
    displayName: 'Student',
    text: 'Hey, I\'m stuck on the forEach exercise. I keep getting "undefined" when I try to push to my results array. Here\'s my code:',
    type: 'text' as const,
  },
  {
    displayName: 'Peer',
    text: 'Check if you\'re returning the array at the end of your function — forEach doesn\'t return anything, so you need to return results separately.',
    type: 'text' as const,
  },
];
