import { AlgorithmStep, createStep } from '../../../engine/Step';

export function generateDeleteSteps(initialArray: number[], deleteIndex: number): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const currentArray = [...initialArray];
  let stepCount = 0;
  let reads = 0;
  let writes = 0;
  const n = initialArray.length;

  if (deleteIndex < 0 || deleteIndex >= n) {
    return [
      createStep({
        stepIndex: 0,
        type: 'not-found',
        arrayState: currentArray,
        explanation: `Delete index ${deleteIndex} is outside bounds [0, ${n - 1}].`,
        stats: { comparisons: 1, swaps: 0, reads: 0, writes: 0 },
      }),
    ];
  }

  const removedValue = currentArray[deleteIndex];
  reads++;

  // Initial step: Highlight element to be removed
  steps.push(
    createStep({
      stepIndex: stepCount++,
      type: 'idle',
      arrayState: [...currentArray],
      indices: [deleteIndex],
      values: [removedValue],
      variables: {
        targetIndex: deleteIndex,
        removedValue,
        elementsToShift: n - 1 - deleteIndex,
      },
      pointers: [{ name: 'delete', index: deleteIndex, color: '#ef4444' }],
      codeLine: 2,
      explanation: `Selected element array[${deleteIndex}] = ${removedValue} for deletion.`,
      detailedWhy: `Removing an element leaves a vacant slot in contiguous memory. Subsequent elements must shift left to close the gap.`,
      stats: { comparisons: 0, swaps: 0, reads, writes },
      predictionQuestion: {
        id: `delete-shift-${deleteIndex}`,
        prompt: `What must happen to elements to the right of index ${deleteIndex}?`,
        options: [
          {
            id: 'shift-left',
            label: 'Shift left by 1 position',
            isCorrect: true,
            explanation: `Correct! Elements after index ${deleteIndex} must shift left to maintain contiguous indexing.`,
          },
          {
            id: 'shift-right',
            label: 'Shift right by 1 position',
            isCorrect: false,
            explanation: `Incorrect. Shifting right would expand the array rather than filling the vacant slot.`,
          },
          {
            id: 'leave-empty',
            label: 'Leave a null gap in memory',
            isCorrect: false,
            explanation: `Incorrect. Standard arrays require contiguous memory slots without gaps.`,
          },
        ],
      },
    })
  );

  // Shift elements left from deleteIndex to n - 2
  for (let i = deleteIndex; i < n - 1; i++) {
    reads++;
    writes++;
    currentArray[i] = currentArray[i + 1];

    steps.push(
      createStep({
        stepIndex: stepCount++,
        type: 'shift',
        arrayState: [...currentArray],
        indices: [i, i + 1],
        values: [currentArray[i]],
        variables: {
          i,
          sourceIndex: i + 1,
          destinationIndex: i,
          shiftedValue: currentArray[i],
        },
        pointers: [
          { name: 'dest', index: i },
          { name: 'src', index: i + 1 },
        ],
        codeLine: 4,
        explanation: `Shifted array[${i + 1}] (${currentArray[i]}) leftward into array[${i}].`,
        detailedWhy: `Copying the adjacent right-hand element leftward fills the hole created by removing index ${deleteIndex}.`,
        stats: { comparisons: 0, swaps: 0, reads, writes },
      })
    );
  }

  // Pop the final redundant element
  currentArray.pop();

  steps.push(
    createStep({
      stepIndex: stepCount++,
      type: 'delete',
      arrayState: [...currentArray],
      variables: {
        removedValue,
        newLength: currentArray.length,
      },
      codeLine: 5,
      explanation: `Removed the duplicate tail element. Final array size reduced to ${currentArray.length}.`,
      detailedWhy: `The array length decreases by 1, reclaiming the vacant memory slot.`,
      stats: { comparisons: 0, swaps: 0, reads, writes },
    })
  );

  // Final Complete step
  steps.push(
    createStep({
      stepIndex: stepCount++,
      type: 'complete',
      arrayState: [...currentArray],
      variables: {
        removedValue,
        finalSize: currentArray.length,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      codeLine: 6,
      explanation: `Deletion finished. Removed value ${removedValue} in O(n) time.`,
      detailedWhy: `Because up to n-1 elements must shift left, array deletion at an arbitrary index is an O(n) operation.`,
      stats: { comparisons: 0, swaps: 0, reads, writes },
    })
  );

  return steps;
}
