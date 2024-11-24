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
    return (
        <Button
            variant="outline"
            className="h-14 w-[350px] text-xs text-neutral-500"
        >
            <div className="text-xs w-12 mr-4">{taskID}</div>
            <span className="text-sm font-semibold dark:text-white mx-2 truncate">{title}</span>
            <span className="text-xs ml-auto">{time}</span>
        </Button >
    );
};
