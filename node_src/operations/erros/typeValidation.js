function isValidInteger(value) {
    const parsedIndex = parseInt(value, 10);
    return !isNaN(parsedIndex) && Number.isInteger(parsedIndex);
}

function isValidBoolean(value) {
    return typeof value === 'boolean';
}

module.exports = {
    isValidInteger,
    isValidBoolean
};
