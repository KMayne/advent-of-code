#!/usr/bin/env node

import { loadDayLines } from './lib.mjs';

async function day5() {
    const inputLines = await loadDayLines(5);
    const presentSeatIds = inputLines.map(seatString => seatStringToId(seatString));
    const maxSeatId = presentSeatIds.reduce((maxSeatId, seatId) => Math.max(seatId, maxSeatId), 0);
    console.log(`Max seat ID = ${maxSeatId}`);
    const presentSeatSet = new Set(presentSeatIds);
    for (let i = 0; i <= maxSeatId; i++) {
        if (!presentSeatSet.has(i) && presentSeatSet.has(i - 1) && presentSeatSet.has(i + 1)) {
            console.log(`My seat ID = ${i}`);
        }
    }
}

function getSeat(seatString) {
    const rowNum = parseInt(seatString.slice(0, 7).replace(/F/g, '0').replace(/B/g, '1'), 2);
    const colNum = parseInt(seatString.slice(7, 10).replace(/L/g, '0').replace(/R/g, '1'), 2);
    return [rowNum, colNum];
}

function getSeatId(row, col) {
    return row * 8 + col;
}

function seatStringToId(seatString) {
    const [row, col] = getSeat(seatString);
    return getSeatId(row, col);
}


day5().then(() => {});
