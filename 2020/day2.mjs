#!/usr/bin/env node

import { loadDayLines } from './lib.mjs';

async function day2() {
    const inputLines = await loadDayLines(2);
    const validPasswordCountA = inputLines.filter(isPasswordLineValidA).length;
    console.log(`There are ${validPasswordCountA} valid passwords under part A rules`);
    const validPasswordCountB = inputLines.filter(isPasswordLineValidB).length;
    console.log(`There are ${validPasswordCountB} valid passwords under part B rules`);
}

function isPasswordLineValidA(line) {
    const [incMin, incMax, policyChar, password] = parseLine(line);
    const charOccurence = (password.match(new RegExp(`${policyChar}`, 'g')) || []).length;
    return incMin <= charOccurence && charOccurence <= incMax;
}

export function isPasswordLineValidB(line) {
    const [idx1, idx2, policyChar, password] = parseLine(line);
    return (password.charAt(idx1 - 1) === policyChar) !== (password.charAt(idx2 - 1) === policyChar);
}

function parseLine(line) {
    const [range, charColon, password]  = line.split(' ');
    const [num1, num2] = range.split('-');
    const policyChar = charColon[0];
    return [num1, num2, policyChar, password];
}

function testB() {
    const validTestCases = [
        '1-3 a: abcde'
    ];
    const invalidTestCases = [
        '1-3 b: cdefg',
        '2-9 c: ccccccccc'
    ];
    for (let line of validTestCases) {
        if (!isPasswordLineValidB(line)) {
            console.log(`Expected '${line}' to be valid`);
        }
    }
    for (let line of invalidTestCases) {
        if (isPasswordLineValidB(line)) {
            console.log(`Expected '${line}' to be invalid`);
        }
    }
}

day2().then(() => {});
