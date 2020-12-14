#!/usr/bin/env node

import { loadDayLines } from './lib.mjs';

async function day14() {
    const inputLines = await loadDayLines(14);
    simulateProgram(inputLines);
    console.log(inputLines);
}

function simulateProgram(progLines) {
  let andMask = 1;
  let orMask = 0;
  const 
  for (let line of progLines) {
  }
}

day14().then(() => {});
