#!/usr/bin/env node

import { loadDayLines } from './lib.mjs';

async function day8() {
    const inputLines = await loadDayLines(8);
    console.log(`Acc val before loop: ${emulateInstructionsWithoutLoop(inputLines)}`);
    const mutations = generateMutations(inputLines);
    const correctCode = mutations.find(doesProgramHalt);
    console.log(`Acc val of correct code: ${emulateInstructionsWithoutLoop(correctCode)}`);
}

function emulateInstructionsWithoutLoop(instructionArr) {
    let state = { pc: 0, acc: 0 };
    let visited = [];
    while (!visited[state.pc] && state.pc < instructionArr.length) {
        visited[state.pc] = true;
        state = runInstruction(instructionArr[state.pc], state);
    }
    return state.acc;
}

function runInstruction(instruction, { pc, acc }) {
    const [instr, arg] = instruction.split(' ');
    switch (instr) {
        case 'nop':
            return { pc: pc + 1, acc };
        case 'acc':
            return { pc: pc + 1, acc: acc + Number(arg) };
        case 'jmp':
            return { pc: pc + Number(arg), acc };
        default:
            console.error('Unexpected instruction');
            process.exit(1);
    }
}

function generateMutations(instructionArr) {
    return instructionArr.map((instruction, idx) => {
        const [instr, arg] = instruction.split(' ');
        if (instr === 'acc') return null;
        const mutation = [...instructionArr];
        mutation[idx] = `${(instr === 'nop') ? 'jmp' : 'nop'} ${arg}`;
        return mutation;
    }).filter(i => i !== null);
}

function doesProgramHalt(instructionArr) {
    let state = { pc: 0, acc: 0 };
    let visited = [];
    while (!visited[state.pc] && state.pc < instructionArr.length) {
        visited[state.pc] = true;
        state = runInstruction(instructionArr[state.pc], state);
    }
    return state.pc >= instructionArr.length;
}

function test() {
    const instructions =
`nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`.split('\n');
    console.log(`Test evaluation = ${emulateInstructionsWithoutLoop(instructions)}, expected 5`);
}

day8().then(() => {});
