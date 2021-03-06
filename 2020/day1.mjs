#!/usr/bin/env node

import { loadDayLines, twoSum } from './lib.mjs';

async function day1() {
    const inputNums = (await loadDayLines(1)).map(Number);

    function threeSum(nums, target) {
        for (let a of nums) {
            for (let b of nums) {
                if (a + b > target) continue;
                for (let c of nums) {
                    if (a + b + c === target) return [a, b, c];
                }
            }
        }
        return [];
    }

    const [a, b] = twoSum(inputNums, 2020);
    console.log(`Found two-sum: ${a} + ${b} = ${a + b}, ${a} * ${b} = ${a * b}`);

    const [x, y, z] = threeSum(inputNums, 2020);
    console.log(`Found three-sum: ${x} + ${y} + ${z} = ${x + y + z}, ${x} * ${y} * ${z} = ${x * y * z}`);
}

day1().then(() => {});
