import { AlgorithmStep, createStep } from '../../../engine/Step';

export function generateSwapSteps(initialArray: number[], indexA: number, indexB: number): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const currentArray = [...initialArray];
  let stepCount = 0;
  let reads = 0;
  let writes = 0;
  const n = initialArray.length;

  if (indexA < 0 || indexA >= n || indexB < 0 || indexB >= n) {
    return [
      createStep({
        stepIndex: 0,
        type: 'not-found',
        arrayState: currentArray,
        explanation: `Indices (${indexA}, ${indexB}) are out of bounds for size ${n}.`,
        stats: { comparisons: 1, swaps: 0, reads: 0, writes: 0 },
      }),
    ];
  }

  const valA = currentArray[indexA];
  const valB = currentArray[indexB];

  // Step 1: Initial focus
  steps.push(
    createStep({
      stepIndex: stepCount++,
      type: 'idle',
      arrayState: [...currentArray],
      indices: [indexA, indexB],
      values: [valA, valB],
      variables: {
        indexA,
        indexB,
        valA,
        valB,
        temp: 'undefined',
      },
      pointers: [
        { name: 'i', index: indexA, color: '#8b5cf6' },
        { name: 'j', index: indexB, color: '#ec4899' },
      ],
      codeLine: 1,
      explanation: `Preparing to swap array[${indexA}] (${valA}) and array[${indexB}] (${valB}).`,
      detailedWhy: `Swapping two variables requires a temporary storage location (or bitwise XOR) to prevent destroying one value before copying it.`,
      stats: { comparisons: 0, swaps: 0, reads, writes },
    })
  );

  // Step 2: Store in temp
  reads++;
  const temp = valA;
  steps.push(
    createStep({
      stepIndex: stepCount++,
      type: 'access',
      arrayState: [...currentArray],
      indices: [indexA],
      values: [valA],
      variables: {
        indexA,
        indexB,
        temp,
      },
      pointers: [{ name: 'temp ← A[i]', index: indexA }],
      codeLine: 2,
      explanation: `Stored array[${indexA}] (${valA}) into temporary variable 'temp'.`,
      detailedWhy: `'temp' now safely preserves ${valA} in CPU register memory.`,
      stats: { comparisons: 0, swaps: 0, reads, writes },
    })
  );

  // Step 3: array[indexA] = array[indexB]
  reads++;
  writes++;
  currentArray[indexA] = valB;
  steps.push(
    createStep({
      stepIndex: stepCount++,
      type: 'swap',
      arrayState: [...currentArray],
      indices: [indexA, indexB],
      values: [currentArray[indexA], currentArray[indexB]],
      variables: {
        indexA,
        indexB,
        temp,
        'array[i]': valB,
      },
      pointers: [
        { name: 'A[i] ← A[j]', index: indexA },
        { name: 'j', index: indexB },
      ],
      codeLine: 3,
      explanation: `Copied array[${indexB}] (${valB}) into array[${indexA}].`,
      detailedWhy: `Notice that array[${indexA}] and array[${indexB}] now both temporarily hold ${valB}.`,
      stats: { comparisons: 0, swaps: 0, reads, writes },
    })
  );

  // Step 4: array[indexB] = temp
  writes++;
  currentArray[indexB] = temp;
  steps.push(
    createStep({
      stepIndex: stepCount++,
      type: 'swap',
      arrayState: [...currentArray],
      indices: [indexA, indexB],
      values: [currentArray[indexA], currentArray[indexB]],
      variables: {
        indexA,
        indexB,
        temp,
        'array[j]': temp,
      },
      pointers: [
        { name: 'i', index: indexA },
        { name: 'A[j] ← temp', index: indexB },
      ],
      codeLine: 4,
      explanation: `Assigned temp (${temp}) into array[${indexB}]. Exchange complete!`,
      detailedWhy: `Both positions are now successfully exchanged in 3 memory operations.`,
      stats: { comparisons: 0, swaps: 1, reads, writes },
    })
  );

  // Step 5: Complete
  steps.push(
    createStep({
      stepIndex: stepCount++,
      type: 'complete',
      arrayState: [...currentArray],
      indices: [indexA, indexB],
      values: [currentArray[indexA], currentArray[indexB]],
      variables: {
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
      },
      codeLine: 5,
      explanation: `Swap complete in O(1) time and O(1) auxiliary space.`,
      detailedWhy: `Swapping is the foundational atomic primitive for sorting algorithms like Bubble Sort, Selection Sort, and Quick Sort.`,
      stats: { comparisons: 0, swaps: 1, reads, writes },
    })
  );

  return steps;
}
