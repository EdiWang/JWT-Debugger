export function encodeBase64(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

export function decodeBase64(str) {
    return decodeURIComponent(escape(atob(str)));
}