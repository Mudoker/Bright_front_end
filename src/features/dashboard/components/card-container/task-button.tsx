import { Button } from "@components/ui/button"
import React from "react"
export const TaskButton = ({ taskID, title, time }: { taskID: string, title: string, time: string }) => {
    title = title.trim()
    if (title.length > 25) {
        title = title.slice(0, 25) + '...'
    }

    return (
        <Button variant="outline" className="justify-start h-14 text-neutral-500 text-xs text-left w-[350px]">
            {taskID}
            <div className="ml-3 text-ellipsis truncate dark:text-white font-semibold text-sm mr-4">
                {title}
            </div>
            <div className="ml-auto text-sm">
                {time}
            </div>
        </Button>
    )
}
