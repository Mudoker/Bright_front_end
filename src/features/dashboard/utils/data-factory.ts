import { ViewMode } from "@/features/dev-dock/data/type";
import { generateRandomRecentActivity } from "./calculator";

export class DataFactory {
    public static getRecentActivityData(dataViewMode: ViewMode): any {
        if (dataViewMode === ViewMode.NO_DATA) {
            return [{}];
        }
        if (dataViewMode === ViewMode.FAKE_DATA) {
            return generateRandomRecentActivity(12);
        }

        // Should be replaced with real data
        return generateRandomRecentActivity(12);
    }
}
