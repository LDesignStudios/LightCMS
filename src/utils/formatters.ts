export const shortenText = (text: string, maxLength: number = 32): string => {
    if (!text || text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
};

export const formatTableValue = (value: any): string => {
    if (value === null || value === undefined) return '-';
    
    const stringValue = String(value);
    
    // Handle different types of content
    if (stringValue.length > 8) {
        return shortenText(stringValue);
    }
    
    return stringValue;
}; 