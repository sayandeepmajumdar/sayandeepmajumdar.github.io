import { AlgorithmStep, createStep } from '../../../engine/Step';

export function isArraySorted(array: number[]): boolean {
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) return false;
  }
  return true;
}

export function generateBinarySearchSteps(array: number[], target: number): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const n = array.length;
  let stepCount = 0;
  let comparisons = 0;
  let reads = 0;

  // Validation step if array is not sorted
  if (!isArraySorted(array)) {
    steps.push(
      createStep({
        stepIndex: stepCount++,
        type: 'not-found',
        arrayState: array,
        variables: { error: 'UnsortedArray', target },
        codeLine: 1,
        explanation: `Binary Search requires a sorted array! Elements are not in non-decreasing order.`,
        detailedWhy: `Binary search relies on the invariant that elements to the left of any index are smaller, and elements to the right are larger. If the array is unsorted, this invariant is violated.`,
        stats: { comparisons: 0, swaps: 0, reads: 0, writes: 0 },
      })
    );
    return steps;
  }

  let low = 0;
  let high = n - 1;
  const eliminatedIndices: number[] = [];

  // Initial step
  steps.push(
    createStep({
      stepIndex: stepCount++,
      type: 'idle',
      arrayState: array,
      variables: { low, high, target, totalLength: n },
      pointers: [
        { name: 'low', index: low, color: '#06b6d4' },
        { name: 'high', index: high, color: '#f59e0b' },
      ],
      codeLine: 2,
      explanation: `Initialized search boundary: low = 0, high = ${high} for target ${target}.`,
      detailedWhy: `The search space initially encompasses the entire sorted array. With each comparison, Binary Search cuts the candidate range in half: O(log n).`,
      stats: { comparisons, swaps: 0, reads, writes: 0 },
    })
  );

  let foundIndex = -1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    reads++;
    const midVal = array[mid];

    // Compute eliminated indices outside [low, high]
    const currentEliminated: number[] = [];
    for (let idx = 0; idx < n; idx++) {
      if (idx < low || idx > high) {
        currentEliminated.push(idx);
      }
    }

    // Determine correct decision for prediction
    let nextAction = '';
    if (midVal === target) {
      nextAction = 'Found';
    } else if (target < midVal) {
      nextAction = 'Search left (high = mid - 1)';
    } else {
      nextAction = 'Search right (low = mid + 1)';
    }

    // Step 1: Calculate mid & Inspect
    comparisons++;
    steps.push(
      createStep({
        stepIndex: stepCount++,
        type: 'compare',
        arrayState: array,
        indices: [mid],
        secondaryIndices: currentEliminated,
        values: [midVal],
        variables: {
          low,
          mid,
          high,
          'array[mid]': midVal,
          target,
          windowSize: high - low + 1,
        },
        pointers: [
          { name: 'low', index: low, color: '#06b6d4' },
          { name: 'mid', index: mid, color: '#8b5cf6' },
          { name: 'high', index: high, color: '#f59e0b' },
        ],
        codeLine: 4,
        explanation: `Calculated mid = ⌊(${low} + ${high}) / 2⌋ = ${mid}. Inspecting array[${mid}] = ${midVal}.`,
        detailedWhy: `By probing the exact midpoint, we can determine whether the target lies in the left partition, right partition, or at mid itself.`,
        stats: { comparisons, swaps: 0, reads, writes: 0 },
        predictionQuestion: {
          id: `binary-step-${stepCount}`,
          prompt: `Target is ${target}. Midpoint array[${mid}] is ${midVal}. What should Binary Search do next?`,
          options: [
            {
              id: 'opt-left',
              label: 'Search left (high = mid - 1)',
              isCorrect: target < midVal,
              explanation:
                target < midVal
                  ? `Correct! Because target (${target}) < midVal (${midVal}), the target can only exist in the left half.`
                  : `Incorrect. Target (${target}) is ${target > midVal ? 'greater' : 'equal'} to ${midVal}.`,
            },
            {
              id: 'opt-right',
              label: 'Search right (low = mid + 1)',
              isCorrect: target > midVal,
              explanation:
                target > midVal
                  ? `Correct! Because target (${target}) > midVal (${midVal}), the target can only exist in the right half.`
                  : `Incorrect. Target (${target}) is ${target < midVal ? 'less' : 'equal'} to ${midVal}.`,
            },
            {
              id: 'opt-found',
              label: 'Target found at mid',
              isCorrect: target === midVal,
              explanation:
                target === midVal
                  ? `Correct! array[${mid}] (${midVal}) matches target (${target}) exactly!`
                  : `Incorrect. array[${mid}] is ${midVal}, not ${target}.`,
            },
            {
              id: 'opt-stop',
              label: 'Stop, element not found',
              isCorrect: false,
              explanation: `Incorrect. The search window [${low}..${high}] still contains candidate elements.`,
            },
          ],
        },
      })
    );

    if (midVal === target) {
      foundIndex = mid;
      steps.push(
        createStep({
          stepIndex: stepCount++,
          type: 'found',
          arrayState: array,
          indices: [mid],
          secondaryIndices: currentEliminated,
          values: [midVal],
          variables: {
            foundIndex: mid,
            target,
            totalComparisons: comparisons,
            timeComplexity: 'O(log n)',
          },
          pointers: [{ name: 'FOUND', index: mid, color: '#10b981' }],
          codeLine: 6,
          explanation: `Match found! array[${mid}] == ${target} after ${comparisons} step(s).`,
          detailedWhy: `Binary search located the element in logarithmic O(log n) time, drastically outperforming linear search on large arrays.`,
          stats: { comparisons, swaps: 0, reads, writes: 0 },
        })
      );
      break;
    } else if (target < midVal) {
      // Discard right half
      for (let k = mid; k <= high; k++) {
        if (!eliminatedIndices.includes(k)) eliminatedIndices.push(k);
      }
      high = mid - 1;

      steps.push(
        createStep({
          stepIndex: stepCount++,
          type: 'eliminate',
          arrayState: array,
          indices: [mid],
          secondaryIndices: [...eliminatedIndices],
          variables: {
            target,
            midVal,
            comparison: `${target} < ${midVal}`,
            action: 'Discard right half (indices ≥ mid)',
            newHigh: high,
            low,
          },
          pointers: [
            ...(low <= high ? [{ name: 'low', index: low, color: '#06b6d4' }] : []),
            ...(high >= 0 && low <= high ? [{ name: 'high', index: high, color: '#f59e0b' }] : []),
          ],
          codeLine: 10,
          explanation: `${target} < ${midVal}: Target must be left of mid. Set high = ${mid} - 1 = ${high}.`,
          detailedWhy: `All elements at index ≥ ${mid} are guaranteed to be greater than or equal to ${midVal}, so none can equal ${target}. We safely discard them.`,
          stats: { comparisons, swaps: 0, reads, writes: 0 },
        })
      );
    } else {
      // Discard left half
      for (let k = low; k <= mid; k++) {
        if (!eliminatedIndices.includes(k)) eliminatedIndices.push(k);
      }
      low = mid + 1;

      steps.push(
        createStep({
          stepIndex: stepCount++,
          type: 'eliminate',
          arrayState: array,
          indices: [mid],
          secondaryIndices: [...eliminatedIndices],
          variables: {
            target,
            midVal,
            comparison: `${target} > ${midVal}`,
            action: 'Discard left half (indices ≤ mid)',
            newLow: low,
            high,
          },
          pointers: [
            ...(low <= high && low < n ? [{ name: 'low', index: low, color: '#06b6d4' }] : []),
            ...(high >= 0 && low <= high ? [{ name: 'high', index: high, color: '#f59e0b' }] : []),
          ],
          codeLine: 8,
          explanation: `${target} > ${midVal}: Target must be right of mid. Set low = ${mid} + 1 = ${low}.`,
          detailedWhy: `All elements at index ≤ ${mid} are guaranteed to be smaller than or equal to ${midVal}, so none can equal ${target}. We safely discard them.`,
          stats: { comparisons, swaps: 0, reads, writes: 0 },
        })
      );
    }
  }

  if (foundIndex === -1) {
    steps.push(
      createStep({
        stepIndex: stepCount++,
        type: 'not-found',
        arrayState: array,
        secondaryIndices: Array.from({ length: n }, (_, i) => i),
        variables: {
          low,
          high,
          target,
          totalComparisons: comparisons,
          result: -1,
          timeComplexity: 'O(log n)',
        },
        codeLine: 11,
        explanation: `Search window closed (low ${low} > high ${high}). Target ${target} does not exist in array.`,
        detailedWhy: `When low crosses high, the remaining search window is empty. We conclude the target is absent in at most ⌈log₂(n)⌉ comparisons.`,
        stats: { comparisons, swaps: 0, reads, writes: 0 },
      })
    );
  }

  return steps;
}
