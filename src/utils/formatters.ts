export const shortenText = (text: string, maxLength: number = 32): string => {
    if (!text || text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
};

export const formatTableValue = (value: string | number | boolean | null | undefined): string => {
    if (value === null || value === undefined) return '-';
    
    return String(value);
}; 