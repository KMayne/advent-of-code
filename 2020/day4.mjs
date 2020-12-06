#!/usr/bin/env node

import { loadDay } from './lib.mjs';

const requiredFields = new Set([
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid'
]);

async function day4() {
    const input = await loadDay(4);
    const passports = input.split('\n\n').map(parsePassport);
    const validFieldPassports = passports.filter(validatePpFieldsPresent);
    console.log(`There are ${validFieldPassports.length} passports with required fields present`);
    console.log(`There are ${validFieldPassports.filter(fullyValidatePp).length} valid passports`);
}

function parsePassport(rawPassport) {
    return [...rawPassport.matchAll(/([a-z]{3}):([a-z0-9#]+)/g)]
        .reduce((pp, match) => (pp[match[1]] = match[2], pp), {});
}

function validatePpFieldsPresent(passport) {
    for (let field of requiredFields) {
        if (!(field in passport)) return false;
    }
    return true;
}

/* Rules:
    byr (Birth Year) - four digits; at least 1920 and at most 2002.
    iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    hgt (Height) - a number followed by either cm or in:
    If cm, the number must be at least 150 and at most 193.
    If in, the number must be at least 59 and at most 76.
    hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    pid (Passport ID) - a nine-digit number, including leading zeroes.
    cid (Country ID) - ignored, missing or not.
*/
function fullyValidatePp(passport) {
    const birthYear = Number(passport['byr']);
    if (!(1920 <= birthYear && birthYear <= 2002)) return false;
    const issueYear = Number(passport['iyr']);
    if (!(2010 <= issueYear && issueYear <= 2020)) return false;
    const expiryYear = Number(passport['eyr']);
    if (!(2020 <= expiryYear && expiryYear <= 2030)) return false;
    const heightVal = Number(passport['hgt'].slice(0, -2));
    const heightUnits = passport['hgt'].slice(-2);
    if (!(heightUnits === 'cm' && 150 <= heightVal && heightVal <= 193)
        && !(heightUnits === 'in' && 59 <= heightVal && heightVal <= 76)) return false;
    if (passport['hcl'].match(/^#[0-9a-f]{6}$/) === null) return false;
    if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(passport['ecl'])) return false;
    if (passport['pid'].match(/^[0-9]{9}$/) === null) return false;
    return true;
}

day4().then(() => {});
