import { Button } from '@components/ui/button';
import React from 'react';

export const TaskButton = ({
    taskID,
    title,
    time,
}: {
    taskID: string;
    title: string;
    time: string;
}) => {
    title = title.trim();
    if (title.length > 25) {
        title = title.slice(0, 25) + '...';
    }

    return (
        <Button
            variant="outline"
            className="h-14 w-[350px] justify-start text-left text-xs text-neutral-500"
        >
            {taskID}
            <div className="ml-3 mr-4 truncate text-ellipsis text-sm font-semibold dark:text-white">
                {title}
            </div>
            <div className="ml-auto text-sm">{time}</div>
        </Button>
    );
};
