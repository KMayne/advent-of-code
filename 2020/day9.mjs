#!/usr/bin/env node

import { loadDayLines, twoSum } from './lib.mjs';
import assert from 'assert/strict';

async function day9() {
    const inputLines = (await loadDayLines(9)).map(Number);
    const firstViolation = findFirstViolation(inputLines);
    console.log(firstViolation !== undefined ? `Found num violating rule: ${firstViolation}` : 'No violation found');
    const contiguousSum = findContiguousSum(inputLines, firstViolation);
    const min = Math.min(...contiguousSum);
    const max = Math.max(...contiguousSum);
    console.log(`Encryption weakness is ${min} + ${max} = ${min + max}`);
}

function findFirstViolation(nums) {
    const workingSet = nums.slice(0, 25);
    for (let i = 25; i < nums.length; i++) {
        const num = nums[i];
        // This isn't strictly to spec as twoSum doesn't have the constraint
        // that the elems in the pair must be different
        const sumPair = twoSum(workingSet, num);
        if (sumPair.length !== 2) {
            return num;
        }
        workingSet[i % 25] = num;
    }
}

function findContiguousSum(nums, target) {
    let startIdx = 0;
    let endIdx = 1;
    let sum = nums[startIdx] + nums[endIdx];
    // Algorithm assumes only positive nums - if negative nums allowed then we
    // must consider all array slices as we can't assume that subtracting start or
    // adding next num will get us closer to target
    assert(nums.every(num => num >= 0) && target >= 0, 'nums must all be positive');
    while (startIdx < nums.length && endIdx < nums.length) {
        if (sum === target) {
            return nums.slice(startIdx, endIdx + 1);
        }

        if (sum < target) {
            endIdx++;
            sum += nums[endIdx];
        } else  {
            sum -= nums[startIdx];
            startIdx++;
        }
    }
    return [];
}


console.log(findContiguousSum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -2, 1], -1));
// day9().then(() => {});
