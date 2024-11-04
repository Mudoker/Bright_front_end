// Type definition for the SystemPerformance component
export type SystemPerformance = {
    cpuUsage: string;
    ramUsage: string;
    networkUsage: number;
} | null;

// Type definition for the DeveloperDock component
export type DevModeConfig = {
    theme: string;
    isSelectionMode: boolean;
    selectedLanguage: string;
    currentZoomLevel: number;
    currentScreenDimension: string;
    systemPerformance: SystemPerformance;
};
