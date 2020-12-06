#!/usr/bin/env node

import { loadDay } from './lib.mjs';

async function day6() {
    const input = await loadDay(6);
    const groups = input.split('\n\n').map(group => group.split('\n')
        .map(line => line.trim())
        .filter(line => line !== '')
        .map(line => line.split('')));
    const sumUnionYes = groups.reduce((sumYes, group) => sumYes + getAnswerUnion(group).size, 0);
    console.log(`Sum of yes answers across union groups = ${sumUnionYes}`);
    const sumIntersectionYes = groups.reduce((sumYes, group) => sumYes + getAnswerIntersection(group).size, 0);
    console.log(`Sum of yes answers across intersection groups = ${sumIntersectionYes}`);
}

function getAnswerUnion(groupAnswers) {
    return new Set(groupAnswers.flat());
}

function getAnswerIntersection(answerLines) {
    const intersection = new Set(answerLines[0]);
    for (let line of answerLines.slice(1)) {
        for (let char of intersection) {
            if (!line.includes(char)) intersection.delete(char);
        }
    }
    return intersection;
}

function formatAnswerSet(set) {
    return [...set].sort((a, b) => a.localeCompare(b)).join('');
}

day6().then(() => {});
// 