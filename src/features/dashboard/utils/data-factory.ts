import { ViewMode } from "@/features/dev-dock/data/type";
import { generateRandomRecentActivity } from "./calculator";
import { faker } from "@faker-js/faker";

export type UsageDataType = {
    projects: number;
    issues: number;
    storage: number;
    fileUpload: number;
    tokensUsed: number;
}

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

    public static getUsageData(dataViewMode: ViewMode): any {
        if (dataViewMode === ViewMode.NO_DATA) {
            return {
                projects: 0,
                issues: 0,
                storage: 0,
                fileUpload: 0,
                tokensUsed: 0,
            };
        }
        if (dataViewMode === ViewMode.FAKE_DATA) {
            return {
                projects: faker.number.int({ min: 0, max: 10 }),
                issues: faker.number.int({ min: 0, max: 100 }),
                storage: faker.number.int({ min: 0, max: 5 }),
                fileUpload: faker.number.int({ min: 0, max: 1 }),
                tokensUsed: faker.number.int({ min: 0, max: 1 }),
            };
        }

        // Should be replaced with real data
        return {
            projects: faker.number.int({ min: 0, max: 10 }),
            issues: faker.number.int({ min: 0, max: 100 }),
            storage: faker.number.int({ min: 0, max: 5 }),
            fileUpload: faker.number.int({ min: 0, max: 1 }),
            tokensUsed: faker.number.int({ min: 0, max: 1 }),
        };
    }
}
