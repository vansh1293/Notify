
if (typeof window === 'undefined') {
    // Server-side (Node.js / Bun)
    if (typeof global.localStorage === 'undefined' || typeof global.localStorage.getItem !== 'function') {
        (global as any).localStorage = {
            getItem: () => null,
            setItem: () => { },
            removeItem: () => { },
            clear: () => { },
            length: 0,
            key: () => null,
        };
    }
}
