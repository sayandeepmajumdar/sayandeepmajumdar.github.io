import { AlgorithmStep, createStep } from '../../../engine/Step';

export function generateBubbleSortSteps(initialArray: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const currentArray = [...initialArray];
  let stepCount = 0;
  let comparisons = 0;
  let swaps = 0;
  let reads = 0;
  let writes = 0;
  const n = currentArray.length;

  const sortedIndices: number[] = [];

  // Initial step
  steps.push(
    createStep({
      stepIndex: stepCount++,
      type: 'idle',
      arrayState: [...currentArray],
      variables: { n, i: 0, j: 0 },
      codeLine: 1,
      explanation: `Starting Bubble Sort on array of ${n} elements.`,
      detailedWhy: `Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Larger values bubble up to the right.`,
      stats: { comparisons, swaps, reads, writes },
    })
  );

  let hasPredictionOccurred = false;

  for (let i = 0; i < n - 1; i++) {
    let swappedInPass = false;

    for (let j = 0; j < n - i - 1; j++) {
      reads += 2;
      comparisons++;
      const valA = currentArray[j];
      const valB = currentArray[j + 1];
      const needsSwap = valA > valB;

      // Ask prediction on the first viable comparison
      const showPrediction = !hasPredictionOccurred && n > 2;
      if (showPrediction) hasPredictionOccurred = true;

      // Comparison step
      steps.push(
        createStep({
          stepIndex: stepCount++,
          type: 'compare',
          arrayState: [...currentArray],
          indices: [j, j + 1],
          secondaryIndices: [...sortedIndices],
          values: [valA, valB],
          variables: {
            pass: i + 1,
            j,
            'array[j]': valA,
            'array[j + 1]': valB,
            needsSwap,
            totalComparisons: comparisons,
          },
          pointers: [
            { name: 'j', index: j, color: '#3b82f6' },
            { name: 'j + 1', index: j + 1, color: '#6366f1' },
          ],
          codeLine: 5,
          explanation: `Comparing array[${j}] (${valA}) and array[${j + 1}] (${valB}). ${needsSwap ? `${valA} > ${valB} → Out of order, swap needed!` : `${valA} ≤ ${valB} → In order, keep as is.`}`,
          detailedWhy: `If the left element is strictly greater than the right element, it violates ascending order and must be swapped.`,
          stats: { comparisons, swaps, reads, writes },
          predictionQuestion: showPrediction
            ? {
                id: `bubble-pred-${i}-${j}`,
                prompt: `Comparing ${valA} vs ${valB}. What happens next?`,
                options: [
                  {
                    id: needsSwap ? 'opt-swap' : 'opt-keep',
                    label: needsSwap ? `Swap ${valA} and ${valB}` : `Keep current order (no swap)`,
                    isCorrect: true,
                    explanation: needsSwap
                      ? `Correct! Because ${valA} > ${valB}, they are out of order and must be swapped.`
                      : `Correct! Because ${valA} ≤ ${valB}, they are already in ascending order.`,
                  },
                  {
                    id: needsSwap ? 'opt-keep' : 'opt-swap',
                    label: needsSwap ? `Keep current order (no swap)` : `Swap ${valA} and ${valB}`,
                    isCorrect: false,
                    explanation: needsSwap
                      ? `Incorrect. ${valA} is larger than ${valB}, so keeping them violates sorted order.`
                      : `Incorrect. ${valA} is not greater than ${valB}, so no swap is needed.`,
                  },
                ],
              }
            : undefined,
        })
      );

      if (needsSwap) {
        swappedInPass = true;
        swaps++;
        writes += 2;
        currentArray[j] = valB;
        currentArray[j + 1] = valA;

        steps.push(
          createStep({
            stepIndex: stepCount++,
            type: 'swap',
            arrayState: [...currentArray],
            indices: [j, j + 1],
            secondaryIndices: [...sortedIndices],
            values: [currentArray[j], currentArray[j + 1]],
            variables: {
              pass: i + 1,
              j,
              swapped: true,
              totalSwaps: swaps,
            },
            pointers: [
              { name: 'j', index: j, color: '#ec4899' },
              { name: 'j + 1', index: j + 1, color: '#8b5cf6' },
            ],
            codeLine: 6,
            explanation: `Swapped: ${valA} moved right to index ${j + 1}, and ${valB} moved left to index ${j}.`,
            detailedWhy: `Swapping moves the larger element one step closer to its final position at the end of the array.`,
            stats: { comparisons, swaps, reads, writes },
          })
        );
      }
    }

    // Element at n - i - 1 is now locked in sorted position
    sortedIndices.push(n - i - 1);

    steps.push(
      createStep({
        stepIndex: stepCount++,
        type: 'sorted',
        arrayState: [...currentArray],
        indices: [n - i - 1],
        secondaryIndices: [...sortedIndices],
        values: [currentArray[n - i - 1]],
        variables: {
          pass: i + 1,
          lockedIndex: n - i - 1,
          sortedElement: currentArray[n - i - 1],
          remainingUnsorted: n - sortedIndices.length,
        },
        pointers: [{ name: 'sorted', index: n - i - 1, color: '#10b981' }],
        codeLine: 4,
        explanation: `Pass ${i + 1} complete. Value ${currentArray[n - i - 1]} is in its permanent sorted location.`,
        detailedWhy: `After each pass i, the i-th largest element is guaranteed to bubble to its correct final index at the end of the array.`,
        stats: { comparisons, swaps, reads, writes },
      })
    );

    if (!swappedInPass) {
      // Early exit optimization
      break;
    }
  }

  // Mark all as sorted
  const allIndices = Array.from({ length: n }, (_, idx) => idx);

  steps.push(
    createStep({
      stepIndex: stepCount++,
      type: 'complete',
      arrayState: [...currentArray],
      secondaryIndices: allIndices,
      variables: {
        totalComparisons: comparisons,
        totalSwaps: swaps,
        timeComplexity: 'Best: O(n) | Avg: O(n²) | Worst: O(n²)',
        spaceComplexity: 'O(1) auxiliary',
      },
      codeLine: 7,
      explanation: `Bubble Sort finished! Array is fully sorted in ascending order.`,
      detailedWhy: `All adjacent pairs are ordered. Total operations: ${comparisons} comparisons and ${swaps} swaps.`,
      stats: { comparisons, swaps, reads, writes },
    })
  );

  return steps;
}
