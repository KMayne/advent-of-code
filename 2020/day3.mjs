#!/usr/bin/env node

import { loadDayLines } from './lib.mjs';

async function day3() {
    const inputLines = await loadDayLines(3);
    const anglesToCheck = [
        { x: 1, y: 1 },
        { x: 3, y: 1 },
        { x: 5, y: 1 },
        { x: 7, y: 1 },
        { x: 1, y: 2 }
    ];
    let product = 1;
    for (let { x, y } of anglesToCheck) {
        const treesAlongVec = countTreesAlongVec(inputLines, x, y);
        product *= treesAlongVec;
        console.log(`Using the ${x}, ${y} path, there were ${treesAlongVec} trees`);
    }
    console.log(`The product of these trees counts is ${product}`);
}

function countTreesAlongVec(treeField, vx, vy) {
    // Assuming starting from 0, 0
    function countTreesAlongPath(x, y, treeCount) {
        if (y >= treeField.length) return treeCount;
        const treePresent = treeField[y].charAt(x % treeField[y].length) === '#';
        return countTreesAlongPath(x + vx, y + vy, treePresent ? treeCount + 1 : treeCount);
    }
    return countTreesAlongPath(0, 0, 0);
}

day3().then(() => {});
