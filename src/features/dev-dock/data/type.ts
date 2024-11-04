// Type definition for the SystemPerformance component
type SystemPerformance = {
    cpuUsage: string;
    ramUsage: string;
    networkUsage: number;
} | null;

export enum ViewMode {
    NO_DATA = 'No Data',
    FAKE_DATA = 'Fake Data',
    REAL_DATA = 'Actual Data',
}

// Type definition for the DeveloperDock component
export type DevModeConfig = {
    theme: string;
    isSelectionMode: boolean;
    selectedLanguage: string;
    currentZoomLevel: number;
    currentScreenDimension: string;
    systemPerformance: SystemPerformance;
    viewAs: ViewMode;
};
