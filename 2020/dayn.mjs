#!/usr/bin/env node

import { loadDayLines } from './lib.mjs';

async function dayN() {
    const inputLines = await loadDayLines(N);
    console.log(inputLines);
}

dayN().then(() => {});
