import * as fs from 'fs/promises';

export function loadDay(num) {
    return fs.readFile(`./input/day${num}.txt`, 'utf8');
}

export function loadDayLines(num) {
    return loadDay(num).then(fileString => 
        fileString.split('\n')
        .map(line => line.trim())
        .filter(line => line !== '')
    );
}

export function twoSum(nums, target) {
    const seenNums = [];
    for (let num of nums) {
        const complement = target - num;
        if (seenNums[complement]) return [num, complement];
        seenNums[num] = true;
    }
    return [];
}
