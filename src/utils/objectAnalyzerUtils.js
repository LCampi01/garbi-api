/* eslint-disable no-prototype-builtins */
function compareJSON(obj1, obj2) {
    const diff = {};

    function compareObjects(obj1, obj2, path) {
        for (const key in obj1) {
            if (obj1.hasOwnProperty(key)) {
                if (!obj2.hasOwnProperty(key)) {
                    diff[path + '.' + key] = [obj1[key], undefined];
                } else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
                    compareObjects(obj1[key], obj2[key], path + '.' + key);
                } else if (obj1[key] !== obj2[key]) {
                    diff[path + '.' + key] = [obj1[key], obj2[key]];
                }
            }
        }

        for (const key in obj2) {
            if (obj2.hasOwnProperty(key) && !obj1.hasOwnProperty(key)) {
                diff[path + '.' + key] = [undefined, obj2[key]];
            }
        }
    }

    compareObjects(obj1, obj2, '');

    return diff;
}

function analyzeObject(obj) {
    let differentContentCount = 0;
    const keysWithDifferentContent = [];
    let undefinedValueCount = 0;
    const keysWithUndefinedValue = [];

    Object.keys(obj).forEach(key => {
        const values = obj[key];
        if (values.some(value => value !== values[0])) {
            differentContentCount++;
            keysWithDifferentContent.push(key);
        }
        if (values.some(value => value === undefined)) {
            undefinedValueCount++;
            keysWithUndefinedValue.push(key);
        }
    });

    return {
        differentContentCount,
        keysWithDifferentContent,
        undefinedValueCount,
        keysWithUndefinedValue
    };
}

module.exports = {compareJSON, analyzeObject};
