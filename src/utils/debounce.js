export function debounce(fnc, delayMs) {
    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        fnc();
    }, delayMs || 500);
}
