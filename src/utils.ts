export function isValueType(value: any) {
    return value === null || value === undefined || typeof value !== 'object';
}

export function formatValue(value: any) {
    return value === null ? 'null' :
        value === undefined ? 'undefined' :
            value.toString();
}