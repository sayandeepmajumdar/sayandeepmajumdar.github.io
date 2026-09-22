import { AlgorithmStep, createStep } from '../../../engine/Step';

export function generateLinearSearchSteps(array: number[], target: number): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const n = array.length;
  let stepCount = 0;
  let comparisons = 0;
  let reads = 0;

  // Initial step
  steps.push(
    createStep({
      stepIndex: stepCount++,
      type: 'idle',
      arrayState: array,
      variables: { target, length: n },
      codeLine: 1,
      explanation: `Starting Linear Search for target value ${target} across ${n} elements.`,
      detailedWhy: `Linear Search checks each element one by one from left to right. It does not require the array to be sorted.`,
      stats: { comparisons, swaps: 0, reads, writes: 0 },
    })
  );

  let foundIndex = -1;

  for (let i = 0; i < n; i++) {
    reads++;
    comparisons++;
    const currentVal = array[i];
    const isMatch = currentVal === target;

    // Check step
    steps.push(
      createStep({
        stepIndex: stepCount++,
        type: 'compare',
        arrayState: array,
        indices: [i],
        values: [currentVal],
        variables: {
          i,
          target,
          'array[i]': currentVal,
          isMatch,
          comparisons,
        },
        pointers: [{ name: 'i', index: i, color: '#3b82f6' }],
        codeLine: 3,
        explanation: `Checking array[${i}] = ${currentVal}: Does ${currentVal} == ${target}? ${isMatch ? 'YES! Match found.' : 'NO, keep searching.'}`,
        detailedWhy: `Linear search must evaluate each cell sequentially until a match is found or the array is exhausted.`,
        stats: { comparisons, swaps: 0, reads, writes: 0 },
        predictionQuestion:
          i === 0 && n > 2
            ? {
                id: `linear-pred-${i}`,
                prompt: `array[${i}] is ${currentVal} and target is ${target}. What should the algorithm do next?`,
                options: [
                  {
                    id: isMatch ? 'opt-match' : 'opt-advance',
                    label: isMatch ? 'Report target found at index 0' : 'Advance to index 1',
                    isCorrect: true,
                    explanation: isMatch
                      ? 'Correct! The target matches the very first element (Best Case: O(1)).'
                      : 'Correct! Because 0 does not match, we move sequentially to the next element.',
                  },
                  {
                    id: isMatch ? 'opt-advance' : 'opt-match',
                    label: isMatch ? 'Check remaining elements anyway' : 'Stop and declare not found',
                    isCorrect: false,
                    explanation: isMatch
                      ? 'Incorrect. Once a match is found in standard search, we return immediately.'
                      : 'Incorrect. Unchecked elements remain ahead in the array.',
                  },
                ],
              }
            : undefined,
      })
    );

    if (isMatch) {
      foundIndex = i;
      steps.push(
        createStep({
          stepIndex: stepCount++,
          type: 'found',
          arrayState: array,
          indices: [i],
          values: [currentVal],
          variables: {
            foundIndex: i,
            target,
            totalComparisons: comparisons,
            timeComplexity: i === 0 ? 'O(1) [Best Case]' : 'O(n)',
          },
          pointers: [{ name: 'FOUND', index: i, color: '#10b981' }],
          codeLine: 4,
          explanation: `Found target ${target} at index ${i} after ${comparisons} comparison(s)!`,
          detailedWhy: `Linear search successfully located the value. In the best case, it finds it at index 0 (O(1)); on average it takes n/2 comparisons.`,
          stats: { comparisons, swaps: 0, reads, writes: 0 },
        })
      );
      break;
    }
  }

  if (foundIndex === -1) {
    steps.push(
      createStep({
        stepIndex: stepCount++,
        type: 'not-found',
        arrayState: array,
        variables: {
          target,
          totalComparisons: comparisons,
          result: -1,
          timeComplexity: 'O(n) [Worst Case]',
        },
        codeLine: 5,
        explanation: `Target ${target} was not found after inspecting all ${n} elements. Returned -1.`,
        detailedWhy: `When an element does not exist in an unsorted array, Linear Search must exhaustively inspect every single item (n comparisons, O(n) worst-case time).`,
        stats: { comparisons, swaps: 0, reads, writes: 0 },
      })
    );
  }

  return steps;
}
