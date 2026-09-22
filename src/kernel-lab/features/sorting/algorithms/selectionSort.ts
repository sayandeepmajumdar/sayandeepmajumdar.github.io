import { AlgorithmStep, createStep } from '../../../engine/Step';

export function generateSelectionSortSteps(initialArray: number[]): AlgorithmStep[] {
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
      variables: { n, i: 0 },
      codeLine: 1,
      explanation: `Starting Selection Sort on array of ${n} elements.`,
      detailedWhy: `Selection Sort divides the array into a sorted prefix (left) and unsorted suffix (right). In each pass, it finds the absolute minimum in the unsorted portion and swaps it to the front.`,
      stats: { comparisons, swaps, reads, writes },
    })
  );

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    reads++;

    steps.push(
      createStep({
        stepIndex: stepCount++,
        type: 'access',
        arrayState: [...currentArray],
        indices: [i],
        secondaryIndices: [...sortedIndices],
        values: [currentArray[i]],
        variables: {
          pass: i + 1,
          i,
          minIdx,
          currentMin: currentArray[minIdx],
        },
        pointers: [
          { name: 'i', index: i, color: '#06b6d4' },
          { name: 'min', index: minIdx, color: '#f59e0b' },
        ],
        codeLine: 4,
        explanation: `Pass ${i + 1}: Setting initial candidate minimum at index ${i} (value: ${currentArray[i]}).`,
        detailedWhy: `Before scanning the remainder of the array, we assume the first unsorted element is the minimum.`,
        stats: { comparisons, swaps, reads, writes },
      })
    );

    for (let j = i + 1; j < n; j++) {
      reads += 2;
      comparisons++;
      const valJ = currentArray[j];
      const currentMinVal = currentArray[minIdx];
      const isSmaller = valJ < currentMinVal;

      steps.push(
        createStep({
          stepIndex: stepCount++,
          type: 'compare',
          arrayState: [...currentArray],
          indices: [j, minIdx],
          secondaryIndices: [...sortedIndices],
          values: [valJ, currentMinVal],
          variables: {
            pass: i + 1,
            i,
            j,
            minIdx,
            'array[j]': valJ,
            'array[minIdx]': currentMinVal,
            isNewMin: isSmaller,
          },
          pointers: [
            { name: 'min', index: minIdx, color: '#f59e0b' },
            { name: 'j', index: j, color: '#3b82f6' },
          ],
          codeLine: 6,
          explanation: `Comparing array[${j}] (${valJ}) against current minimum array[${minIdx}] (${currentMinVal}).`,
          detailedWhy: isSmaller
            ? `Found a smaller value! ${valJ} < ${currentMinVal}. minIdx will update to ${j}.`
            : `${valJ} ≥ ${currentMinVal}. Candidate minimum remains unchanged.`,
          stats: { comparisons, swaps, reads, writes },
        })
      );

      if (isSmaller) {
        minIdx = j;
        steps.push(
          createStep({
            stepIndex: stepCount++,
            type: 'access',
            arrayState: [...currentArray],
            indices: [minIdx],
            secondaryIndices: [...sortedIndices],
            values: [currentArray[minIdx]],
            variables: {
              pass: i + 1,
              newMinIdx: minIdx,
              newMinValue: currentArray[minIdx],
            },
            pointers: [{ name: 'NEW MIN', index: minIdx, color: '#10b981' }],
            codeLine: 7,
            explanation: `Updated candidate minimum to index ${minIdx} (value: ${currentArray[minIdx]}).`,
            detailedWhy: `Selection sort keeps track of the smallest element seen so far during this pass.`,
            stats: { comparisons, swaps, reads, writes },
          })
        );
      }
    }

    // Swap if minIdx !== i
    if (minIdx !== i) {
      swaps++;
      writes += 2;
      const temp = currentArray[i];
      currentArray[i] = currentArray[minIdx];
      currentArray[minIdx] = temp;

      steps.push(
        createStep({
          stepIndex: stepCount++,
          type: 'swap',
          arrayState: [...currentArray],
          indices: [i, minIdx],
          secondaryIndices: [...sortedIndices],
          values: [currentArray[i], currentArray[minIdx]],
          variables: {
            pass: i + 1,
            swappedMinInto: i,
            fromIndex: minIdx,
            totalSwaps: swaps,
          },
          pointers: [
            { name: 'placed min', index: i, color: '#10b981' },
            { name: 'displaced', index: minIdx, color: '#ec4899' },
          ],
          codeLine: 9,
          explanation: `Swapped minimum (${currentArray[i]}) into target index ${i}.`,
          detailedWhy: `Selection sort performs at most 1 swap per pass (O(n) total swaps across the entire algorithm), which is beneficial when write operations are expensive.`,
          stats: { comparisons, swaps, reads, writes },
        })
      );
    }

    sortedIndices.push(i);
  }

  // Last remaining element is also naturally sorted
  sortedIndices.push(n - 1);
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
        timeComplexity: 'Best: O(n²) | Avg: O(n²) | Worst: O(n²)',
        spaceComplexity: 'O(1) auxiliary',
      },
      codeLine: 10,
      explanation: `Selection Sort complete! Array fully sorted with only ${swaps} swaps.`,
      detailedWhy: `Notice that Selection Sort always makes ~n²/2 comparisons regardless of whether the array was already sorted, but does very few swaps.`,
      stats: { comparisons, swaps, reads, writes },
    })
  );

  return steps;
}
