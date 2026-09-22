export interface Challenge {
  id: string;
  title: string;
  category: 'Arrays' | 'Searching' | 'Sorting';
  prompt: string;
  array: number[];
  type: 'select-elements' | 'multiple-choice';
  targetIndices?: number[]; // For select-elements: correct indices
  options?: Array<{ id: string; label: string; isCorrect: boolean }>;
  explanation: string;
}

export const CHALLENGES: Challenge[] = [
  {
    id: 'ch-01',
    title: 'Challenge #01: Insert Shift Logic',
    category: 'Arrays',
    prompt:
      'You need to insert value 42 at index 2 in array [10, 20, 30, 40, 50]. Click on all elements that must shift right to make room.',
    array: [10, 20, 30, 40, 50],
    type: 'select-elements',
    targetIndices: [2, 3, 4], // 30, 40, 50
    explanation:
      'Elements 30, 40, and 50 (indices 2, 3, and 4) must shift right by one position. Why? Because inserting at index 2 requires vacating that slot while preserving all subsequent elements in contiguous order.',
  },
  {
    id: 'ch-02',
    title: 'Challenge #02: Binary Search Midpoint',
    category: 'Searching',
    prompt:
      'Given the sorted array [4, 9, 15, 23, 38, 42, 67, 88] (length 8) and target 42. What is the initial midpoint index calculated as ⌊(low + high) / 2⌋ where low = 0 and high = 7?',
    array: [4, 9, 15, 23, 38, 42, 67, 88],
    type: 'multiple-choice',
    options: [
      { id: 'opt-3', label: 'Index 3 (value 23)', isCorrect: true },
      { id: 'opt-4', label: 'Index 4 (value 38)', isCorrect: false },
      { id: 'opt-2', label: 'Index 2 (value 15)', isCorrect: false },
      { id: 'opt-5', label: 'Index 5 (value 42)', isCorrect: false },
    ],
    explanation:
      'low = 0, high = 7. Midpoint = ⌊(0 + 7) / 2⌋ = ⌊3.5⌋ = 3. The value at array[3] is 23. Because 42 > 23, the algorithm then narrows search to the right half (low = 4).',
  },
  {
    id: 'ch-03',
    title: 'Challenge #03: Selection Sort Minimum Target',
    category: 'Sorting',
    prompt:
      'In the first pass (i = 0) of Selection Sort on [64, 25, 12, 22, 11], which element is identified as the absolute minimum to swap with index 0?',
    array: [64, 25, 12, 22, 11],
    type: 'select-elements',
    targetIndices: [4], // 11
    explanation:
      'Value 11 at index 4 is the smallest element in the entire array. Selection Sort swaps array[0] (64) with array[4] (11), locking 11 into its permanent sorted position.',
  },
  {
    id: 'ch-04',
    title: 'Challenge #04: Array Deletion Left-Shift',
    category: 'Arrays',
    prompt:
      'You are deleting the element at index 1 (value 20) in array [10, 20, 30, 40, 50]. Select all elements that must shift left to close the gap.',
    array: [10, 20, 30, 40, 50],
    type: 'select-elements',
    targetIndices: [2, 3, 4], // 30, 40, 50
    explanation:
      'Elements at indices 2, 3, and 4 (values 30, 40, 50) must each shift left by one position to fill the vacant slot left by deleting index 1.',
  },
  {
    id: 'ch-05',
    title: 'Challenge #05: Two-Pointer Reversal Swaps',
    category: 'Arrays',
    prompt:
      'To completely reverse an array of size 6 ([1, 2, 3, 4, 5, 6]) in place using two pointers, exactly how many pairwise swaps are performed?',
    array: [1, 2, 3, 4, 5, 6],
    type: 'multiple-choice',
    options: [
      { id: 'opt-3', label: '3 swaps (⌊6 / 2⌋)', isCorrect: true },
      { id: 'opt-6', label: '6 swaps (n)', isCorrect: false },
      { id: 'opt-5', label: '5 swaps (n - 1)', isCorrect: false },
      { id: 'opt-2', label: '2 swaps', isCorrect: false },
    ],
    explanation:
      'Each swap fixes two symmetric elements simultaneously: (0,5), (1,4), (2,3). When left reaches 3 and right reaches 2, left > right and the loop terminates with exactly 3 swaps.',
  },
];
