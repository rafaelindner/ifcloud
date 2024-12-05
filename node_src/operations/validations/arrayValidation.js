const { isValidInteger, isValidBoolean } = require("../erros/typeValidation");
const ValidationError = require("../erros/ValidationError");

module.exports.validateComponentDataIsEmpty = (components) => {
    if (!Array.isArray(components)) {
        throw new ValidationError("Invalid data: components should be an array");
    }

    components.forEach((component) => {
        if (
            !validateIndex(component.index) ||
            !validateChangeField(component.changeField)
        ) return false;
    });
};

function validateIndex(index) {
    if (index === undefined || index === null || index === '') {
        throw new ValidationError(`Empty "Index" field in component`);
    }

    if (!isValidInteger(index)) {
        throw new ValidationError(`"Index" field in component must be integer!`)
    }

    return true;
}

function validateChangeField(changeField) {
    if (changeField === undefined || changeField === null || changeField === '') {
        throw new ValidationError(`Empty "ChangeField" field in component`);
    }

    return true;
}

function validateReturnOnlyFields(option) {
    if (!isValidBoolean(option)) {
        throw new ValidationError(`"returnOnlyFieldsComponent" must be boolean!`);
    }

    return true;
}
