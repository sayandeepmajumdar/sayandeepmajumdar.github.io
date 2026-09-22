import { AlgorithmStep, createStep } from '../../../engine/Step';

export function generateInsertionSortSteps(initialArray: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const currentArray = [...initialArray];
  let stepCount = 0;
  let comparisons = 0;
  let swaps = 0;
  let reads = 0;
  let writes = 0;
  const n = currentArray.length;

  const sortedIndices: number[] = [0]; // First element is trivially sorted

  // Initial step
  steps.push(
    createStep({
      stepIndex: stepCount++,
      type: 'idle',
      arrayState: [...currentArray],
      secondaryIndices: [0],
      variables: { n, i: 1 },
      codeLine: 1,
      explanation: `Starting Insertion Sort on array of ${n} elements. Index 0 is trivially sorted.`,
      detailedWhy: `Insertion Sort mimics sorting a hand of playing cards. It considers elements one by one, shifting larger sorted elements rightward to insert the current card into its proper place.`,
      stats: { comparisons, swaps, reads, writes },
    })
  );

  for (let i = 1; i < n; i++) {
    reads++;
    const key = currentArray[i];
    let j = i - 1;

    steps.push(
      createStep({
        stepIndex: stepCount++,
        type: 'access',
        arrayState: [...currentArray],
        indices: [i],
        secondaryIndices: [...sortedIndices],
        values: [key],
        variables: {
          i,
          key,
          sortedSubarrayLength: i,
        },
        pointers: [{ name: 'key', index: i, color: '#ec4899' }],
        codeLine: 4,
        explanation: `Picked key = array[${i}] (${key}) to insert into sorted left portion [0..${i - 1}].`,
        detailedWhy: `The key element will now be compared backwards against elements in the sorted partition.`,
        stats: { comparisons, swaps, reads, writes },
      })
    );

    while (j >= 0) {
      reads++;
      comparisons++;
      const valJ = currentArray[j];
      const needsShift = valJ > key;

      steps.push(
        createStep({
          stepIndex: stepCount++,
          type: 'compare',
          arrayState: [...currentArray],
          indices: [j, j + 1],
          secondaryIndices: [...sortedIndices],
          values: [valJ, key],
          variables: {
            j,
            'array[j]': valJ,
            key,
            needsShift,
          },
          pointers: [
            { name: 'j', index: j, color: '#3b82f6' },
            { name: 'insert slot', index: j + 1, color: '#ec4899' },
          ],
          codeLine: 6,
          explanation: `Comparing array[${j}] (${valJ}) with key (${key}). ${needsShift ? `${valJ} > ${key} → Shift ${valJ} rightward!` : `${valJ} ≤ ${key} → Insertion spot found!`}`,
          detailedWhy: needsShift
            ? `Because ${valJ} is larger than the key, it must shift one position to the right to make room.`
            : `Because ${valJ} is less than or equal to key, all elements prior are also smaller. Key belongs at index ${j + 1}.`,
          stats: { comparisons, swaps, reads, writes },
        })
      );

      if (needsShift) {
        reads++;
        writes++;
        swaps++;
        currentArray[j + 1] = currentArray[j];

        steps.push(
          createStep({
            stepIndex: stepCount++,
            type: 'shift',
            arrayState: [...currentArray],
            indices: [j, j + 1],
            secondaryIndices: [...sortedIndices],
            values: [currentArray[j]],
            variables: {
              shiftedValue: currentArray[j],
              vacatedIndex: j,
              newKeySlot: j,
            },
            pointers: [{ name: 'shifted', index: j + 1, color: '#f59e0b' }],
            codeLine: 7,
            explanation: `Shifted value ${valJ} right from index ${j} to index ${j + 1}.`,
            detailedWhy: `Shifting right preserves the sorted ordering of larger elements.`,
            stats: { comparisons, swaps, reads, writes },
          })
        );
        j--;
      } else {
        break;
      }
    }

    writes++;
    currentArray[j + 1] = key;
    sortedIndices.push(i);

    steps.push(
      createStep({
        stepIndex: stepCount++,
        type: 'insert',
        arrayState: [...currentArray],
        indices: [j + 1],
        secondaryIndices: [...sortedIndices],
        values: [key],
        variables: {
          insertedIndex: j + 1,
          key,
          sortedCount: sortedIndices.length,
        },
        pointers: [{ name: 'inserted', index: j + 1, color: '#10b981' }],
        codeLine: 9,
        explanation: `Placed key (${key}) into array[${j + 1}]. Sorted portion is now [0..${i}].`,
        detailedWhy: `The key is now in its proper relative position within the prefix.`,
        stats: { comparisons, swaps, reads, writes },
      })
    );
  }

  const allIndices = Array.from({ length: n }, (_, idx) => idx);

  steps.push(
    createStep({
      stepIndex: stepCount++,
      type: 'complete',
      arrayState: [...currentArray],
      secondaryIndices: allIndices,
      variables: {
        totalComparisons: comparisons,
        totalShifts: swaps,
        timeComplexity: 'Best: O(n) | Avg: O(n²) | Worst: O(n²)',
        spaceComplexity: 'O(1) auxiliary',
      },
      codeLine: 10,
      explanation: `Insertion Sort complete! Entire array is sorted.`,
      detailedWhy: `Insertion Sort is adaptive: if the input is already sorted, it runs in linear O(n) time with only n-1 comparisons.`,
      stats: { comparisons, swaps, reads, writes },
    })
  );

  return steps;
}
