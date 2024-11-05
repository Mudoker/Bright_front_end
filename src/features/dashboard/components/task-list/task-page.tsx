import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { DataFactory } from '../../utils/data-factory';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';

export default function TaskPage() {
    const currentDataViewMode = useSelector(
        (state: any) => state.dataViewMode.current
    );
    const [tasks, setTasks] = React.useState(
        DataFactory.getAllTasks(currentDataViewMode)
    );

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
    );
}
