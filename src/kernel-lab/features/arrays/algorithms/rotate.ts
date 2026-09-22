import { AlgorithmStep, createStep } from '../../../engine/Step';

export function generateRotateSteps(initialArray: number[], kPositions: number, direction: 'right' | 'left' = 'right'): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const currentArray = [...initialArray];
  let stepCount = 0;
  const n = initialArray.length;

  if (n <= 1) {
    return [
      createStep({
        stepIndex: 0,
        type: 'complete',
        arrayState: currentArray,
        explanation: `Array has ${n} elements; rotation has no effect.`,
        stats: { comparisons: 0, swaps: 0, reads: 0, writes: 0 },
      }),
    ];
  }

  const effectiveK = ((direction === 'right' ? kPositions : n - (kPositions % n)) % n + n) % n;

  steps.push(
    createStep({
      stepIndex: stepCount++,
      type: 'idle',
      arrayState: [...currentArray],
      variables: {
        rawK: kPositions,
        direction,
        effectiveK,
        arrayLength: n,
      },
      codeLine: 2,
      explanation: `Rotating array ${direction} by ${kPositions} (effective k = ${effectiveK} after modulo ${n}).`,
      detailedWhy: `Because rotating by array length n results in the exact same array, k % n gives the minimal required rotation.`,
      stats: { comparisons: 0, swaps: 0, reads: 0, writes: 0 },
    })
  );

  if (effectiveK === 0) {
    steps.push(
      createStep({
        stepIndex: stepCount++,
        type: 'complete',
        arrayState: [...currentArray],
        explanation: `Effective rotation is 0; array remains unchanged.`,
        stats: { comparisons: 0, swaps: 0, reads: 0, writes: 0 },
      })
    );
    return steps;
  }

  // We demonstrate cyclic 1-step shifts for effectiveK to make it visually crystal clear
  let reads = 0;
  let writes = 0;
  let swaps = 0;

  for (let shift = 1; shift <= effectiveK; shift++) {
    // Pick the last element
    reads++;
    const lastVal = currentArray[n - 1];

    steps.push(
      createStep({
        stepIndex: stepCount++,
        type: 'access',
        arrayState: [...currentArray],
        indices: [n - 1],
        values: [lastVal],
        variables: {
          currentShiftPass: shift,
          totalShifts: effectiveK,
          wrappedValue: lastVal,
        },
        pointers: [{ name: 'wrap', index: n - 1, color: '#f59e0b' }],
        codeLine: 3,
        explanation: `Pass ${shift}/${effectiveK}: Preserving end element array[${n - 1}] (${lastVal}) to wrap around to index 0.`,
        detailedWhy: `To rotate right, the rightmost element must wrap around to become the new first element.`,
        stats: { comparisons: 0, swaps, reads, writes },
      })
    );

    // Shift all elements rightward by 1
    for (let i = n - 1; i > 0; i--) {
      reads++;
      writes++;
      currentArray[i] = currentArray[i - 1];
    }

    // Place lastVal at index 0
    writes++;
    currentArray[0] = lastVal;
    swaps++;

    steps.push(
      createStep({
        stepIndex: stepCount++,
        type: 'shift',
        arrayState: [...currentArray],
        indices: [0, 1],
        values: [currentArray[0]],
        variables: {
          currentShiftPass: shift,
          totalShifts: effectiveK,
          wrappedToFront: lastVal,
        },
        pointers: [{ name: 'front', index: 0, color: '#10b981' }],
        codeLine: 4,
        explanation: `Completed shift pass ${shift}/${effectiveK}: Elements shifted right, ${lastVal} moved to front.`,
        detailedWhy: `Each pass rotates the sequence by 1 position.`,
        stats: { comparisons: 0, swaps, reads, writes },
      })
    );
  }

  steps.push(
    createStep({
      stepIndex: stepCount++,
      type: 'complete',
      arrayState: [...currentArray],
      variables: {
        effectiveK,
        timeComplexity: 'O(n × k)',
        spaceComplexity: 'O(1)',
      },
      codeLine: 6,
      explanation: `Rotation complete! Array rotated ${direction} by ${kPositions} positions.`,
      detailedWhy: `Rotations are commonly used in buffer cycling, sliding window problems, and circular queues.`,
      stats: { comparisons: 0, swaps, reads, writes },
    })
  );

  return steps;
}
