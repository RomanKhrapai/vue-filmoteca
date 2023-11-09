let timeout;
export function debounce(fnc, delayMs) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        fnc();
    }, delayMs || 1000);
}
