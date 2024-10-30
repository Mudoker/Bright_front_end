import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import tasks from '@features/dashboard/components/task-list/data/tasks.json' // Import the JSON file directly

export default function TaskPage() {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Task List</CardTitle>
                <CardDescription>
                    Here&apos;s a list of your tasks for this month!
                </CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable data={tasks} columns={columns} />
            </CardContent>
        </Card>
    )
}
