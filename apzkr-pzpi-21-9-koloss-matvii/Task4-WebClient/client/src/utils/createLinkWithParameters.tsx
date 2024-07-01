export const createLinkWithParameters = <T extends Record<string, any>>(url: string, queries: T): string => {
    const queryString = Object.entries(queries)
        .map(([key, value]) => {
            if (Array.isArray(value)) {
                return value.map(item => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`).join('&');
            } else {
                return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
            }
        })
        .join('&');

    const separator = url.includes('?') ? '&' : '?';
    const linkWithParameters = `${url}${separator}${queryString}`;
    return linkWithParameters;
};