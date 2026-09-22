import { AlgorithmStep, createStep } from '../../../engine/Step';

export function generateReverseSteps(initialArray: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const currentArray = [...initialArray];
  let stepCount = 0;
  let reads = 0;
  let writes = 0;
  let swaps = 0;
  const n = currentArray.length;

  let left = 0;
  let right = n - 1;

  steps.push(
    createStep({
      stepIndex: stepCount++,
      type: 'idle',
      arrayState: [...currentArray],
      variables: { left, right, length: n },
      pointers: [
        { name: 'left', index: left, color: '#06b6d4' },
        { name: 'right', index: right, color: '#f59e0b' },
      ],
      codeLine: 2,
      explanation: `Initialized two pointers: left = 0 and right = ${right}.`,
      detailedWhy: `The two-pointer technique reverses an array in-place without needing extra memory allocation.`,
      stats: { comparisons: 0, swaps, reads, writes },
      predictionQuestion: {
        id: 'reverse-swap-count',
        prompt: `How many pairwise swaps are required to reverse an array of size ${n}?`,
        options: [
          {
            id: 'half-n',
            label: `${Math.floor(n / 2)} swaps (⌊n / 2⌋)`,
            isCorrect: true,
            explanation: `Correct! Each swap fixes two opposite elements, so ⌊n / 2⌋ swaps are needed.`,
          },
          {
            id: 'full-n',
            label: `${n} swaps (n)`,
            isCorrect: false,
            explanation: `Incorrect. If you swapped n times, you would end up reversing the array back to its original order!`,
          },
          {
            id: 'n-minus-one',
            label: `${n - 1} swaps (n - 1)`,
            isCorrect: false,
            explanation: `Incorrect. Pairwise reversal only requires swapping elements until the pointers cross.`,
          },
        ],
      },
    })
  );

  while (left < right) {
    // Step: Compare pointers
    steps.push(
      createStep({
        stepIndex: stepCount++,
        type: 'compare',
        arrayState: [...currentArray],
        indices: [left, right],
        values: [currentArray[left], currentArray[right]],
        variables: { left, right, 'left < right': true },
        pointers: [
          { name: 'left', index: left, color: '#06b6d4' },
          { name: 'right', index: right, color: '#f59e0b' },
        ],
        codeLine: 3,
        explanation: `Pointers check: left (${left}) < right (${right}). Preparing swap.`,
        detailedWhy: `As long as left is strictly less than right, the elements at opposite ends need to be exchanged.`,
        stats: { comparisons: 1, swaps, reads, writes },
      })
    );

    // Swap elements
    reads += 2;
    writes += 2;
    swaps++;
    const temp = currentArray[left];
    currentArray[left] = currentArray[right];
    currentArray[right] = temp;

    steps.push(
      createStep({
        stepIndex: stepCount++,
        type: 'swap',
        arrayState: [...currentArray],
        indices: [left, right],
        values: [currentArray[left], currentArray[right]],
        variables: { left, right, temp, totalSwaps: swaps },
        pointers: [
          { name: 'left', index: left, color: '#06b6d4' },
          { name: 'right', index: right, color: '#f59e0b' },
        ],
        codeLine: 4,
        explanation: `Swapped array[${left}] (${currentArray[left]}) and array[${right}] (${currentArray[right]}).`,
        detailedWhy: `Both symmetric endpoints are now positioned in their correct reversed locations.`,
        stats: { comparisons: 1, swaps, reads, writes },
      })
    );

    left++;
    right--;

    // Move pointers
    steps.push(
      createStep({
        stepIndex: stepCount++,
        type: 'access',
        arrayState: [...currentArray],
        variables: { left, right },
        pointers: [
          ...(left < n ? [{ name: 'left', index: left, color: '#06b6d4' }] : []),
          ...(right >= 0 ? [{ name: 'right', index: right, color: '#f59e0b' }] : []),
        ],
        codeLine: 5,
        explanation: `Moved pointers inward: left = ${left}, right = ${right}.`,
        detailedWhy: `Pointers step toward the center by 1 on each iteration until they meet or cross.`,
        stats: { comparisons: 1, swaps, reads, writes },
      })
    );
  }

  // Completion
  steps.push(
    createStep({
      stepIndex: stepCount++,
      type: 'complete',
      arrayState: [...currentArray],
      variables: {
        totalSwaps: swaps,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      codeLine: 7,
      explanation: `Reversal complete! Pointers met or crossed. Array is fully inverted.`,
      detailedWhy: `Every element was visited once in O(n) total time with zero additional array allocations.`,
      stats: { comparisons: 1, swaps, reads, writes },
    })
  );

  return steps;
}
