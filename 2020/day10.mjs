#!/usr/bin/env node

import { loadDayLines } from './lib.mjs';

async function day10() {
    const inputLines = await loadDayLines(10);
    const chain = findChain(inputLines);
    chain.reduce((acc, num, i) 
}

function findChain(adapterJolts) {
    adapterJolts.sort((a, b) => a - b);
    const canUseAll = adapterJolts.every((num, i) => {
      const diff = adapterJolts[i + 1] - num);
      return 1<= diff && diff <= 3;
    });
    return canUseAll ? adapterJolts : [];
}

day10().then(() => {});
