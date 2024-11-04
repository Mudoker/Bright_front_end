import React, { useEffect } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { DataFactory } from '../../utils/data-factory'
import { useSelector } from 'react-redux'

export default function TaskPage() {
    const currentDataViewMode = useSelector((state: any) => state.dataViewMode.current);
    const [tasks, setTasks] = React.useState(DataFactory.getAllTasks(currentDataViewMode));

    useEffect(() => {
        setTasks(DataFactory.getAllTasks(currentDataViewMode));
    }, [currentDataViewMode]);

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
