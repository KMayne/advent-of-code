#!/usr/bin/env node

import { loadDayLines } from './lib.mjs';

async function day12() {
    const inputLines = await loadDayLines(12);
    const finalPositionA = simulateInstructionsPartA(inputLines);
    console.log(`Final position (part A calc) = (${finalPositionA}), manhattan distance = ${calculateManhattanDistance(...finalPositionA)}`);
    const finalPositionB = simulateInstructionsPartB(inputLines);
    console.log(`Final position (part B calc) = (${finalPositionB}), manhattan distance = ${calculateManhattanDistance(...finalPositionB)}`);
}

function calculateManhattanDistance(x, y) {
    return Math.abs(x) + Math.abs(y);
}

function simulateInstructionsPartA(instructions) {
    let x = 0;
    let y = 0;
    // 0 deg = east, 90 deg = north
    let dir = 0;
    for (let instruction of instructions) {
        const command = instruction[0];
        const arg = Number(instruction.slice(1));
        switch (command) {
            case 'N':
                y += arg;
                break;
            case 'E':
                x += arg;
                break;
            case 'S':
                y -= arg;
                break;
            case 'W':
                x -= arg;
                break;
            case 'L':
                dir = (dir + arg) % 360;
                break;
            case 'R':
                dir = (dir - arg + 360) % 360;
                break;
            case 'F':
                x += Math.round(arg * Math.cos(dir * (2 * Math.PI / 360)));
                y += Math.round(arg * Math.sin(dir * (2 * Math.PI / 360)));
                break;
        }
    }
    return [x, y];
}

function simulateInstructionsPartB(instructions) {
    let boatX = 0;
    let boatY = 0;
    let wpX = 10;
    let wpY = 1;
    for (let instruction of instructions) {
        const command = instruction[0];
        const arg = Number(instruction.slice(1));
        switch (command) {
            case 'N':
                wpY += arg;
                break;
            case 'E':
                wpX += arg;
                break;
            case 'S':
                wpY -= arg;
                break;
            case 'W':
                wpX -= arg;
                break;
            case 'L':
                const cosL = Math.cos(arg / 360 * 2 * Math.PI);
                const sinL = Math.sin(arg / 360 * 2 * Math.PI);
                [wpX, wpY] = [Math.round(wpX * cosL - wpY * sinL), Math.round(wpX * sinL + wpY * cosL)];
                break;
            case 'R':
                const cosR = Math.cos(-arg / 360 * 2 * Math.PI);
                const sinR = Math.sin(-arg / 360 * 2 * Math.PI);
                [wpX, wpY] = [Math.round(wpX * cosR - wpY * sinR), Math.round(wpX * sinR + wpY * cosR)];
                break;
            case 'F':
                boatX += arg * wpX;
                boatY += arg * wpY;
                break;
        }
    }
    return [boatX, boatY];
}

day12().then(() => {});
