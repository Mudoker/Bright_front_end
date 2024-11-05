import { differenceInDays } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

export class Column {
    constructor(title) {
        this.id = uuidv4();
        this.title = title;
    }
}

export class Task {
    constructor(columnId, title, des, startDate, endDate, tags = []) {
        this.id = uuidv4();
        this.columnId = columnId;
        this.title = title;
        this.des = des;
        this.tags = this.createTags(tags);
        this.memList = [];
        this.todos = [];
        this.attachments = [];
        this.startDate = startDate;
        this.endDate = endDate;

        const today = new Date();
        if (differenceInDays(today, endDate) > 0) {
            this.addTags(['Late']);
        }
    }

    createTagfromString(tagString) {
        // Split by both '?' delimiters
        const tagParts = tagString.split('?');

        // Extract relevant parts using array destructuring
        const [_, colorPart, titlePart] = tagParts;

        const tagColor = colorPart.split('=')[1];
        const tagTitle = titlePart.split('=')[1];

        return new TaskTag(tagTitle, tagColor);
    }

    createTags(tags) {
        return tags.map(tag => this.createTagfromString(tag));
    }

    addTags(newTags) {
        if (!Array.isArray(newTags)) {
            newTags = [newTags];
        }
        this.tags = [...this.tags, ...this.createTags(newTags)];
    }

    addTag(tag) {
        this.tags = [...this.tags, tag];
    }

    removeTag(tagId) {
        this.tags = this.tags.filter(tag => tag.id !== tagId);
    }
}

export class TaskTag {
    constructor(title, color) {
        this.id = uuidv4();
        this.title = title;
        this.color = color ? color : 'bg-gray-500';
    }

    toString = () => {
        return `${this.id}?color=${this.color}?title=${this.title}`;
    };
}

const ActivitySubtitles = {
    create: 'created a new task',
    update: 'updated the status to',
    assign: 'assigned to',
    comment: 'left a comment',
};

export class TaskActivity {
    constructor(
        id,
        author,
        activityType,
        updatedAt = null,
        comment = null,
        target = null
    ) {
        this.id = id;
        this.subtitle = ActivitySubtitles[activityType] || '';
        this.createdAt = new Date();
        this.updatedAt = updatedAt ? new Date(updatedAt) : this.createdAt;
        this.author = author;
        this.activityType = activityType.toLowerCase();

        switch (this.activityType) {
            case 'comment':
                this.comment = comment;
                break;
            case 'assign':
            case 'update':
                this.target = target;
                break;
            default:
                this.comment = null;
                this.target = null;
                break;
        }
    }
}
