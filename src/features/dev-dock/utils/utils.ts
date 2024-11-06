export const getDimensionsInString = (window: Window) => {
    if (!window) return '';

    // Minimum width of the window
    const width = window.innerWidth;

    // Tailwind breakpoints: https://tailwindcss.com/docs/breakpoints
    if (width < 640) return 'xs'; // Extra Small (below 640px)
    if (width < 768) return 'sm'; // Small (640px and above)
    if (width < 1024) return 'md'; // Medium (768px and above)
    if (width < 1280) return 'lg'; // Large (1024px and above)
    if (width < 1536) return 'xl'; // Extra large (1280px and above)
    return '2xl'; // Extra extra large (1536px and above)
};

interface PerformanceWithMemory extends Performance {
    memory: {
        usedJSHeapSize: number;
        totalJSHeapSize: number;
        jsHeapSizeLimit: number;
    };
}

export const getCurrentSystemPerformance = (window: Window | null) => {
    if (!window) return null;

    const performance = window.performance as Performance & {
        memory?: { usedJSHeapSize: number; totalJSHeapSize: number };
    };

    // Use performance.now() to track elapsed time in milliseconds
    const cpuUsage = Number(performance.now().toFixed(0)).toLocaleString('en');

    // Number of network requests made
    const networkUsage = performance.getEntries().length;

    // Convert usedJSHeapSize from bytes to GB
    const ramUsage = performance.memory
        ? (performance.memory.usedJSHeapSize / 1024 ** 3).toFixed(2)
        : NaN;

    return {
        cpuUsage: `${cpuUsage} ms`,
        ramUsage: `${ramUsage} GB`,
        networkUsage,
    };
};

export const getZoomLevelInPercentage = (window: Window) => {
    if (!window) return 100;

    const zoomLevel = Math.round((window.outerWidth / window.innerWidth) * 100);
    return zoomLevel;
};
