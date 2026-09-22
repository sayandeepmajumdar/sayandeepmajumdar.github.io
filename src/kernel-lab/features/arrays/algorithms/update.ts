import { AlgorithmStep, createStep } from '../../../engine/Step';

export function generateUpdateSteps(
  initialArray: number[],
  updateIndex: number,
  newValue: number
): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const currentArray = [...initialArray];
  let stepCount = 0;
  const n = initialArray.length;

  if (updateIndex < 0 || updateIndex >= n) {
    return [
      createStep({
        stepIndex: 0,
        type: 'not-found',
        arrayState: currentArray,
        explanation: `Update index ${updateIndex} is out of bounds [0, ${n - 1}].`,
        stats: { comparisons: 1, swaps: 0, reads: 0, writes: 0 },
      }),
    ];
  }

  const oldValue = currentArray[updateIndex];

  // Step 1: Inspect existing value
  steps.push(
    createStep({
      stepIndex: stepCount++,
      type: 'access',
      arrayState: [...currentArray],
      indices: [updateIndex],
      values: [oldValue],
      variables: {
        index: updateIndex,
        currentValue: oldValue,
        targetNewValue: newValue,
      },
      pointers: [{ name: 'target', index: updateIndex }],
      codeLine: 2,
      explanation: `Inspecting slot array[${updateIndex}] currently holding ${oldValue}.`,
      detailedWhy: `Like access, updating an existing cell uses direct indexing in O(1) time without shifting any other cells.`,
      stats: { comparisons: 0, swaps: 0, reads: 1, writes: 0 },
    })
  );

  // Step 2: Overwrite
  currentArray[updateIndex] = newValue;
  steps.push(
    createStep({
      stepIndex: stepCount++,
      type: 'update',
      arrayState: [...currentArray],
      indices: [updateIndex],
      values: [newValue],
      variables: {
        index: updateIndex,
        oldValue,
        newValue,
      },
      pointers: [{ name: 'updated', index: updateIndex, color: '#3b82f6' }],
      codeLine: 3,
      explanation: `Overwrote array[${updateIndex}] = ${newValue} (was ${oldValue}).`,
      detailedWhy: `The CPU writes directly to the memory address computed as Base + (${updateIndex} × 4).`,
      stats: { comparisons: 0, swaps: 0, reads: 1, writes: 1 },
    })
  );

  // Step 3: Complete
  steps.push(
    createStep({
      stepIndex: stepCount++,
      type: 'complete',
      arrayState: [...currentArray],
      indices: [updateIndex],
      values: [newValue],
      variables: {
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
      },
      codeLine: 4,
      explanation: `Update operation completed in constant O(1) time.`,
      detailedWhy: `No shifts or re-allocations are required when updating in-place.`,
      stats: { comparisons: 0, swaps: 0, reads: 1, writes: 1 },
    })
  );

  return steps;
}
