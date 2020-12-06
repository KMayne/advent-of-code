#!/usr/bin/env node

import { loadDayLines } from './lib.mjs';

async function day2() {
    const inputLines = await loadDayLines(2);
    console.log(inputLines);
}

day2().then(() => {});
