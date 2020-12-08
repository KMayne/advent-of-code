#!/usr/bin/env node

import { loadDayLines } from './lib.mjs';

async function day7() {
    const inputLines = await loadDayLines(7);
    const bagContents = {};
    for (let line of inputLines) {
        const [_, containerColour, innerBags] = line.match(/([a-z ]+) bags contain ((?:\d+ [a-z ]+ bags?(, )?)+|no other bags)./);
        bagContents[containerColour] = 
            innerBags === 'no other bags' ? [] : innerBags.split(', ').map(innerBag => {
                const [__, count, colour] = innerBag.match(/^(\d+) ([a-z ]+) bag/);
                return { count, colour };
            });
    }
    console.log('Number of bags containing shiny gold:', findBagsEventuallyContaining(bagContents, 'shiny gold').size);
    console.log('Number of bags contained in shiny gold:', findBagsWithin(bagContents, 'shiny gold'));
}

function findBagsEventuallyContaining(bags, targetBag) {
    const parentLookup = {};
    for (let [parentBag, childBags] of Object.entries(bags)) {
        childBags.forEach(({ colour: childColour }) => {
            if (!parentLookup[childColour]) parentLookup[childColour] = [];
            parentLookup[childColour].push(parentBag);
        });
    }
    return getAllParents(parentLookup, targetBag, new Set());
}

function getAllParents(parentLookup, targetBag, seenParents) {
    for (let parent of (parentLookup[targetBag] || [])) {
        if (!seenParents.has(parent)) {
            getAllParents(parentLookup, parent, seenParents.add(parent));
        }
    }
    return seenParents;
}

function findBagsWithin(bags, targetBag) {
    function findBagsWithinRec(bags, targetBag, bagCounts) {
        if (bagCounts[targetBag] === undefined) {
            const innerBags = bags[targetBag];
            if (innerBags.length === 0) {
                bagCounts[targetBag] = 0;
            } else {
                bagCounts[targetBag] = innerBags.reduce((acc, innerBag) => 
                    acc + innerBag.count * (1 + findBagsWithinRec(bags, innerBag.colour, bagCounts)), 0);
            }
        }
        return bagCounts[targetBag];
    }
    return findBagsWithinRec(bags, targetBag, {});
}

day7().then(() => {});
