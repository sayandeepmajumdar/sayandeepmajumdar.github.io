import { AlgorithmStep, createStep } from '../../../engine/Step';

export function generateAccessSteps(initialArray: number[], targetIndex: number): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const n = initialArray.length;
  let stepCount = 0;

  // Initial Check
  steps.push(
    createStep({
      stepIndex: stepCount++,
      type: 'idle',
      arrayState: initialArray,
      variables: { index: targetIndex, length: n },
      codeLine: 2,
      explanation: `Validating target index ${targetIndex} within bounds [0, ${n - 1}].`,
      detailedWhy: `Arrays offer instant access by computing memory offset from the base address in O(1) time.`,
      stats: { comparisons: 1, swaps: 0, reads: 0, writes: 0 },
    })
  );

  if (targetIndex < 0 || targetIndex >= n) {
    steps.push(
      createStep({
        stepIndex: stepCount++,
        type: 'not-found',
        arrayState: initialArray,
        variables: { index: targetIndex, error: 'OutOfBounds' },
        codeLine: 3,
        explanation: `Index ${targetIndex} is out of bounds for array of size ${n}.`,
        detailedWhy: `Accessing memory outside the allocated contiguous block triggers an array index out of bounds error.`,
        stats: { comparisons: 2, swaps: 0, reads: 0, writes: 0 },
      })
    );
    return steps;
  }

  // Memory calculation step
  const baseHex = 0x1000;
  const address = `0x${(baseHex + targetIndex * 4).toString(16).toUpperCase()}`;
  steps.push(
    createStep({
      stepIndex: stepCount++,
      type: 'access',
      arrayState: initialArray,
      indices: [targetIndex],
      values: [initialArray[targetIndex]],
      variables: {
        index: targetIndex,
        baseAddress: '0x1000',
        elementSize: '4 bytes',
        effectiveAddress: address,
      },
      pointers: [{ name: 'target', index: targetIndex, label: address }],
      codeLine: 4,
      explanation: `Computed memory address: Base (0x1000) + (${targetIndex} × 4) = ${address}.`,
      detailedWhy: `Because array elements are stored in contiguous memory cells, calculating the address requires only one multiplication and one addition: O(1).`,
      stats: { comparisons: 2, swaps: 0, reads: 1, writes: 0 },
    })
  );

  // Return value step
  steps.push(
    createStep({
      stepIndex: stepCount++,
      type: 'complete',
      arrayState: initialArray,
      indices: [targetIndex],
      values: [initialArray[targetIndex]],
      variables: {
        index: targetIndex,
        value: initialArray[targetIndex],
        address,
        timeComplexity: 'O(1)',
      },
      pointers: [{ name: 'result', index: targetIndex }],
      codeLine: 5,
      explanation: `Retrieved array[${targetIndex}] = ${initialArray[targetIndex]} in O(1) time.`,
      detailedWhy: `Direct indexing does not require inspecting any other elements. Constant time access is the primary advantage of arrays.`,
      stats: { comparisons: 2, swaps: 0, reads: 1, writes: 0 },
    })
  );

  return steps;
}
