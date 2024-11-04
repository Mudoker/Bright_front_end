import { ViewMode } from "@/features/dev-dock/data/type";
import { faker } from "@faker-js/faker/.";

export class User {
    public id: number;
    public name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public static getUser(dataViewMode: ViewMode): User {
       if (dataViewMode === ViewMode.NO_DATA) {
           return new User(-1, '' );
       }
       if (dataViewMode === ViewMode.FAKE_DATA) {
           return new User(-1, faker.person.firstName());
       }
       if (dataViewMode === ViewMode.REAL_DATA) {
           return new User(-1, 'Actual Data');
       }

       return new User(-1, ''); // Default return for non-exhaustive cases
    }
}
