function isString(subject) {
    if (typeof subject == 'string') {
        return {result: true, status: 'Success', message: 'Success.. this is a string'};
    } else {
        return {result: false, status: 'Error', message: 'Error.. this is not a string'};
    }
};

function isNumber(subject) {
    if (typeof subject == 'number') {
        return {result: true, status: 'Success', message: 'Success.. this is a number'};
    } else {
        return {result: false, status: 'Error', message: 'Error.. this is not a number'};
    }
};

function isBoolean(subject) {
    if (typeof subject == 'boolean') {
        return {result: true, status: 'Success', message: 'Success.. this is a boolean'};
    } else {
        return {result: false, status: 'Error', message: 'Error.. this is not a boolean'};
    }
};

function isFunction(subject) {
    if (typeof subject == 'function') {
        return {result: true, status: 'Success', message: 'Success.. this is a function'};
    } else {
        return {result: false, status: 'Error', message: 'Error.. this is not a function'};
    }
};

function isUndefined(subject) {
    if (typeof subject == 'undefined') {
        return {result: true, status: 'Success', message: 'Success.. this is undefined'};
    } else {
        return {result: false, status: 'Error', message: 'Error.. this is not undefined'};
    }
};

function isBigint(subject) {
    if (typeof subject == 'bigint') {
        return {result: true, status: 'Success', message: 'Success.. this is a bigint'};
    } else {
        return {result: false, status: 'Error', message: 'Error.. this is not a bigint'};
    }
};

function isSymbol(subject) {
    if (typeof subject == 'symbol') {
        return {result: true, status: 'Success', message: 'Success.. this is a symbol'};
    } else {
        return {result: false, status: 'Error', message: 'Error.. this is not a symbol'};
    }
};

function isObject(subject) {
    if (typeof subject == 'object') {
        return {result: true, status: 'Success', message: 'Success.. this is an object'};
    } else {
        return {result: false, status: 'Error', message: 'Error.. this is not an object'};
    }
};

function isArray(subject) {
    if (!Array.isArray(subject)) {
        return {result: false, status: 'Error', message: 'Error.. this is not an array'};
    } else {
        return {result: true, status: 'Success', message: 'Success.. this is an array'};
    }
};

function containsHttp(subject) {
    //her laver jeg et regular expression (hvilket er det samme som et pattern).
    //det siger at mit subject skal starte med http eller https
    //her kigger den ikke på om den har et .com eller lign.
    let regularExpression = new RegExp (/^https?:/);

        //hvis subjectet ikke starter med http eller https, så retunerer den et objekt som siger error.
        //hvis subjectet starter med http eller https, så retunerer den et objekt som siger success
        if (regularExpression.test(subject)) {
            return {result: true, status: 'success', message: `${subject} does contain http or https`};
        } else {
            return {result: false, status: 'error', message: `${subject} does not contain http or https`};
        }
}






//funktion som kan kigge på en url afgangen
function isUrl_forOneObject(subject) {
    //hvis subjekt ikke er en string så retunerer den med fejlen fra isString funktionen
    //ellers kører den containsHttp funktionen
    if(!isString(subject).result) {
        console.log(isArray(subject).message);
    } else {
        if (!containsHttp(subject).result) {
            console.log(containsHttp(subject).message);
        } else {
            console.log(containsHttp(subject).message);
        }
    }
};

//funktion som kan kigge på flere url'er afgangen (i et array)
function isUrl_forMoreObject(subject) {
    //hvis subjekt ikke er en string så retunerer den med fejlen fra isString funktionen
    //ellers kører den containsHttp funktionen for hvert enkelt element i arrayet
    if (!isArray(subject).result) {
        console.log(isArray(subject).message);
    } else {
        for (let element of subject) {
            if (!containsHttp(element).result) {
                console.log(containsHttp(element).message);
            } else {
                console.log(containsHttp(element).message);
            }
        }
    }
};
