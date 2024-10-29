import { Button } from "@components/ui/button"
import React from "react"
export const TaskButton = ({ taskId, title, time }: { taskId: string, title: string, time: string }) => {
    title = title.trim()
    if (title.length > 25) {
        title = title.slice(0, 25) + '...'
    }

    return (
        <Button variant="outline" className="justify-start h-14 text-neutral-500 text-xs text-left">
            {taskId}
            <div className="ml-3 text-ellipsis truncate dark:text-white font-semibold text-sm">
                {title}
            </div>
            <div className="ml-auto text-sm">
                {time}
            </div>
        </Button>
    )
}
