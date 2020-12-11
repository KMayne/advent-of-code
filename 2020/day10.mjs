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

    const arrangements = findAllAdapterArrangements(sortedAdapterJolts, deviceJoltage);
    console.log(`Number of distinct arrangements = ${arrangements.length}`)
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

function findAllAdapterArrangements(sortedAdapterJolts, target) {
  const memory = {};
  function findAllArrangements(currentJoltage, remainingAdapters) {
    if (memory[currentJoltage] && memory[currentJoltage][remainingAdapters.length]) return memory[currentJoltage][remainingAdapters.length];
    if (remainingAdapters.length === 1) return [remainingAdapters];
    const arrangements = takeWhile(remainingAdapters, val => val - currentJoltage <= 3)
      .((nextAdapter, i) => findAllArrangements(nextAdapter, remainingAdapters.slice(i + 1))
        .map(arrangement => [nextAdapter, ...arrangement]));
    if (!memory[currentJoltage]) memory[currentJoltage] = [];
    memory[currentJoltage][remainingAdapters.length] = arrangements;
    return arrangements;
  }
  return findAllArrangements(0, [...sortedAdapterJolts, target].slice(0, 50));
}

function takeWhile(arr, predicate) {
  const firstFailIdx = arr.findIndex((v, i, a) => !predicate(v, i, a));
  return arr.slice(0, firstFailIdx !== -1 ? firstFailIdx : arr.length);
}

day10().then(() => {});
