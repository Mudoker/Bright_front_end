import { v4 as uuidv4 } from 'uuid';

export class Column {
    constructor(title) {
        this.id = uuidv4();
        this.title = title;
    }
}
