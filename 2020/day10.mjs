#!/usr/bin/env node

import { loadDayLines } from './lib.mjs';

async function day10() {
    const inputLines = (await loadDayLines(10)).map(Number);
    const sortedAdapterJolts = inputLines.sort((a, b) => a - b);

    const deviceJoltage = sortedAdapterJolts[sortedAdapterJolts.length - 1] + 3;
    if (!canChainToTarget(sortedAdapterJolts, deviceJoltage)) {
      console.log('Can\'t use all adapters :(');
      return;
    }
    const diffs = findDiffCountsBetweenElems([...sortedAdapterJolts, deviceJoltage]);
    console.log(`Diffs of 1 = ${diffs[1]}, diffs of 3 = ${diffs[3]}, 1-diffs * 3-diffs = ${diffs[1] * diffs[3]}`);
    const arrangements = countAdapterArrangements(sortedAdapterJolts, deviceJoltage);
    console.log(`Number of distinct arrangements = ${arrangements}`)
}

function canChainToTarget(sortedAdapterJolts, target) {
  return sortedAdapterJolts.every((num, i) => {
    const diff = (sortedAdapterJolts[i + 1] || target) - num;
    return 1<= diff && diff <= 3;
  });
}

function findDiffCountsBetweenElems(arr) {
  return arr.reduce((diffs, num, i) => {
    const diff = num - (arr[i - 1] || 0);
    if (!diffs[diff]) diffs[diff] = 0;
    diffs[diff]++;
    return diffs;
  }, []);
}

function countAdapterArrangements(sortedAdapterJolts, target) {
  const countRoutesToTarget = [];
  const adapters = [0, ...sortedAdapterJolts];
  for (let i = adapters.length - 1; i >= 0; i--) {
    const currentAdapter = adapters[i];
    countRoutesToTarget[currentAdapter] = 0;
    if (currentAdapter + 3 >= target) {
      countRoutesToTarget[currentAdapter]++;
    }
    for (let next = i + 1; next <= i + 3; next++) {
      const nextAdapter = adapters[next];
      if (currentAdapter + 3 >= nextAdapter) {
        countRoutesToTarget[currentAdapter] += countRoutesToTarget[nextAdapter];
      }
    }
  }
  return countRoutesToTarget[0];
}

day10().then(() => {});
