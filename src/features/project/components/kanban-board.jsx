import { Button } from '@/components/ui/button';
// Drag n drop
import {
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { PlusCircle } from 'lucide-react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useState } from 'react';
import { useMemo } from 'react';
import { createPortal } from 'react-dom';

import { Column, Task } from '../utils/class';
import { ColumnContainer } from './column/column-container';
import { TaskContainer } from './task/task-container';

export const KanbanBoard = () => {
    const [columns, setColumn] = useState([]);
    const [activeColumn, setActiveColumn] = useState(null);
    const [activeTask, setActiveTask] = useState(null);
    const [tasks, setTaskList] = useState([]);

    const columnId = useMemo(() => columns.map(col => col.id), [columns]);

    // Only trigger drag event on desired distance
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3,
            },
        })
    );

    // Columns
    const createColumn = () => {
        const newColumn = new Column('TODO');
        setColumn([...columns, newColumn]);
    };

    const deleteColumn = id => {
        const filteredColumn = columns.filter(col => col.id !== id);
        setColumn(filteredColumn);
    };

    const updateColumnTitle = (id, title) => {
        const updatedColumn = columns.map(col => {
            if (col.id !== id) {
                return col;
            }
            col.title = title;
            return col;
        });

        setColumn(updatedColumn);
    };

    // Event Handlers
    const handleDragStart = event => {
        // On move column
        if (event.active.data.current.type === 'Column') {
            setActiveColumn(event.active.data.current.col);
        }

        // On move task
        if (event.active.data.current.type === 'Task') {
            setActiveTask(event.active.data.current.task);
        }
    };

    const handleDragEnd = event => {
        // Reset states
        setActiveColumn(null);
        setActiveTask(null);

        const { active, over } = event;

        if (!over) return;

        const { id: activeColumnId } = active;
        const { id: overColumnId } = over;

        if (activeColumnId === overColumnId) return;

        setColumn(column => {
            const activeIndex = column.findIndex(
                col => col.id === activeColumnId
            );
            const overIndex = column.findIndex(col => col.id === overColumnId);

            return arrayMove(column, activeIndex, overIndex);
        });
    };

    const handleDragOver = event => {
        const { active, over } = event;

        if (!over || !active || active.id === over.id) return;

        const { id: activeTaskId } = active;
        const { id: overTaskId } = over;

        const isTaskActive = active.data.current.type === 'Task';
        const isOverTask = over.data.current.type === 'Task';

        if (!isTaskActive) return;

        setTaskList(tasks => {
            const activeIndex = tasks.findIndex(t => t.id === activeTaskId);

            if (isOverTask) {
                const overIndex = tasks.findIndex(t => t.id === overTaskId);
                const activeTask = tasks[activeIndex];
                const overTask = tasks[overIndex];

                if (activeTask.columnId !== overTask.columnId) {
                    activeTask.columnId = overTask.columnId;
                    const newOverIndex = Math.max(overIndex - 1, 0);
                    return arrayMove(tasks, activeIndex, newOverIndex);
                } else {
                    return arrayMove(tasks, activeIndex, overIndex);
                }
            }

            const isOverColumn = over.data.current.type === 'Column';

            if (isOverColumn) {
                tasks[activeIndex].columnId = overTaskId;
            }

            return arrayMove(tasks, activeIndex, activeIndex);
        });
    };

    // Tasks
    const createTask = (
        colId,
        title = '',
        des = '',
        startDate,
        endDate,
        tags
    ) => {
        const newTask = new Task(colId, title, des, startDate, endDate, tags);
        setTaskList([...tasks, newTask]);
    };

    return (
        <OverlayScrollbarsComponent
            element="div"
            options={{ scrollbars: { autoHide: 'never' } }}
            defer
            style={{ width: '97.5%', margin: 'auto' }}
        >
            <div className="mt-4">
                <DndContext
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    sensors={sensors}
                >
                    <div
                        className={`flex ${columns.length === 0 ? 'gap-0' : 'gap-2'}`}
                    >
                        <div className="flex gap-2">
                            <SortableContext items={columnId}>
                                {columns.map((col, index) => (
                                    <div key={index}>
                                        <ColumnContainer
                                            key={col.id}
                                            col={col}
                                            deleteColumn={deleteColumn}
                                            updateColumnTitle={
                                                updateColumnTitle
                                            }
                                            createTask={createTask}
                                            taskList={tasks.filter(
                                                task => task.columnId === col.id
                                            )}
                                        />
                                    </div>
                                ))}
                            </SortableContext>
                        </div>

                        <Button
                            className="right-2 flex h-12 flex-row items-center p-4"
                            onClick={createColumn}
                            variant="outline"
                        >
                            <PlusCircle width={16} height={16} />
                        </Button>
                    </div>

                    {createPortal(
                        <DragOverlay>
                            {activeColumn && (
                                <ColumnContainer
                                    col={activeColumn}
                                    deleteColumn={deleteColumn}
                                    taskList={tasks.filter(
                                        task =>
                                            task.columnId === activeColumn.id
                                    )}
                                />
                            )}

                            {activeTask && <TaskContainer task={activeTask} />}
                        </DragOverlay>,
                        document.body
                    )}
                </DndContext>
            </div>
        </OverlayScrollbarsComponent>
    );
};
