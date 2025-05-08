const pw = document.getElementById('pw');
const copy = document.getElementById('copy');
const symbol = document.getElementById('symbol');
const generate = document.getElementById('generate');
const keyword = document.getElementById('Keyword');
const lenEl = document.getElementById('length');
const upper = document.getElementById('upper');
const lower = document.getElementById('lower');
const number = document.getElementById('number');
const strengthText = document.getElementById('strength');

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=/><;";

function getLower() {
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getUpper() {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function getNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}

const array_of_functions = [getUpper, getLower, getSymbol, getNumber];

function shuffleString(str) {
    return str.split('').sort(() => Math.random() - 0.5).join('');
}

function calculateStrength(password) {
    let score = 0;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const levels = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"];
    return levels[Math.min(score, levels.length - 1)];
}

function generatePassword() {
    const LENGTH = parseInt(lenEl.value);
    let password = "";

    let availableFunctions = [];

    if (upper.checked) availableFunctions.push(getUpper);
    if (lower.checked) availableFunctions.push(getLower);
    if (number.checked) availableFunctions.push(getNumber);
    if (symbol.checked) availableFunctions.push(getSymbol);

    if (availableFunctions.length === 0) {
        alert("Please select at least one character type.");
        return;
    }

    let keywordStr = keyword.value.trim();
    if (keywordStr.length > LENGTH) {
        alert("Keyword is longer than password length!");
        return;
    }

    // Add random characters
    for (let i = 0; i < LENGTH - keywordStr.length; i++) {
        const randomFunc = availableFunctions[Math.floor(Math.random() * availableFunctions.length)];
        password += randomFunc();
    }

    // Insert keyword at random position
    const insertAt = Math.floor(Math.random() * (password.length + 1));
    password = password.slice(0, insertAt) + keywordStr + password.slice(insertAt);

    // Shuffle the result
    password = shuffleString(password);

    pw.innerText = password;
    strengthText.innerText = "Strength: " + calculateStrength(password);
}

generate.addEventListener("click", generatePassword);

copy.addEventListener("click", () => {
    const password = pw.innerText;
    if (!password) return alert("Generate a password first!");

    navigator.clipboard.writeText(password).then(() => {
        alert("Password copied to clipboard!");
    }).catch(() => {
        alert("Copy failed. Try again.");
    });
});