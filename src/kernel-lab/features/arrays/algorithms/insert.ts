import { AlgorithmStep, createStep } from '../../../engine/Step';

export function generateInsertSteps(
  initialArray: number[],
  insertIndex: number,
  value: number
): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const currentArray = [...initialArray];
  let stepCount = 0;
  let reads = 0;
  let writes = 0;

  const n = initialArray.length;
  const elementsToShift = n - insertIndex;

  // Initial step with Prediction option
  steps.push(
    createStep({
      stepIndex: stepCount++,
      type: 'idle',
      arrayState: currentArray,
      variables: {
        index: insertIndex,
        value,
        originalLength: n,
        elementsToShift,
      },
      pointers: insertIndex < n ? [{ name: 'target', index: insertIndex }] : undefined,
      codeLine: 1,
      explanation: `Preparing to insert value ${value} at index ${insertIndex}.`,
      detailedWhy: `To insert an element at index ${insertIndex}, all elements from index ${insertIndex} to ${n - 1} must shift right by 1 cell to prevent overwriting.`,
      stats: { comparisons: 0, swaps: 0, reads, writes },
      predictionQuestion: {
        id: `insert-shift-${insertIndex}`,
        prompt: `How many elements must shift right to make room at index ${insertIndex}?`,
        options: [
          {
            id: 'opt-exact',
            label: `${elementsToShift} elements`,
            isCorrect: true,
            explanation: `Correct! All ${elementsToShift} elements from index ${insertIndex} to ${n - 1} must shift right one position.`,
          },
          {
            id: 'opt-none',
            label: `0 elements (overwrite in place)`,
            isCorrect: false,
            explanation: `Incorrect. Overwriting in place would destroy the existing element at index ${insertIndex} instead of inserting.`,
          },
          {
            id: 'opt-all',
            label: `${n} elements (entire array)`,
            isCorrect: false,
            explanation: `Incorrect. Elements before index ${insertIndex} remain untouched.`,
          },
        ],
      },
    })
  );

  // Extend array with a placeholder for the rightward shift
  currentArray.push(currentArray[n - 1] ?? 0);

  // Shifting loop from n down to insertIndex + 1
  for (let i = n; i > insertIndex; i--) {
    reads++;
    writes++;
    currentArray[i] = currentArray[i - 1];

    steps.push(
      createStep({
        stepIndex: stepCount++,
        type: 'shift',
        arrayState: [...currentArray],
        indices: [i - 1, i],
        values: [currentArray[i]],
        variables: {
          i,
          sourceIndex: i - 1,
          destinationIndex: i,
          shiftedValue: currentArray[i],
          remainingShifts: i - insertIndex - 1,
        },
        pointers: [
          { name: 'from', index: i - 1 },
          { name: 'to', index: i },
        ],
        codeLine: 3,
        explanation: `Shifted array[${i - 1}] (${currentArray[i]}) rightward into array[${i}].`,
        detailedWhy: `Working backwards from the end ensures elements do not overwrite each other during the shift.`,
        stats: { comparisons: 0, swaps: 0, reads, writes },
      })
    );
  }

  // Insert the target value at insertIndex
  writes++;
  currentArray[insertIndex] = value;

  steps.push(
    createStep({
      stepIndex: stepCount++,
      type: 'insert',
      arrayState: [...currentArray],
      indices: [insertIndex],
      values: [value],
      variables: {
        index: insertIndex,
        value,
        newLength: currentArray.length,
      },
      pointers: [{ name: 'inserted', index: insertIndex, color: '#10b981' }],
      codeLine: 4,
      explanation: `Placed new value ${value} into cleared slot array[${insertIndex}].`,
      detailedWhy: `With the space opened up by the shifts, the new element is written in O(1) time. Total insertion time is O(n).`,
      stats: { comparisons: 0, swaps: 0, reads, writes },
    })
  );

  // Completion
  steps.push(
    createStep({
      stepIndex: stepCount++,
      type: 'complete',
      arrayState: [...currentArray],
      indices: [insertIndex],
      values: [value],
      variables: {
        totalShifts: elementsToShift,
        finalSize: currentArray.length,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1) auxiliary',
      },
      codeLine: 5,
      explanation: `Insertion complete! Array size expanded from ${n} to ${currentArray.length}.`,
      detailedWhy: `Because shifting requires touching up to n elements, array insertion at an arbitrary position runs in worst-case O(n) time.`,
      stats: { comparisons: 0, swaps: 0, reads, writes },
    })
  );

  return steps;
}
