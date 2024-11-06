import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { differenceInDays } from 'date-fns';
import {
    Calendar,
    Flag,
    List,
    MoreHorizontal,
    Paperclip,
    UserRoundPlus,
} from 'lucide-react';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useLayoutEffect } from 'react';
import { useState } from 'react';
import tinycolor from 'tinycolor2';

import Divider from '../../../../components/general/divider';
import { Task } from '../../utils/class';
import { MemberList } from '../member-list';
import { DetailedTaskView } from './detailed-task-view';

export const TaskContainer = ({ task }) => {
    const ref = useRef();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isShowTaskDetailed, setIsShowTaskDetailed] = useState(false);
    const [remainingDateText, setRemainingDateText] = useState('');

    // Calculate current task size
    useLayoutEffect(() => {
        if (ref.current) {
            const newWidth = ref.current.offsetWidth;
            const newHeight = ref.current.offsetHeight;
            setDimensions({ width: newWidth, height: newHeight });

            // Prevent value reset
            sessionStorage.setItem(
                'taskDimensions',
                JSON.stringify({ width: newWidth, height: newHeight })
            );
        }
    }, [task]);

    // Fetch size on first load
    useLayoutEffect(() => {
        // Retrieve dimensions from local storage when the component mounts
        const storedDimensions = sessionStorage.getItem('taskDimensions');
        if (storedDimensions) {
            const { width, height } = JSON.parse(storedDimensions);
            setDimensions({ width, height });
        }
        // Calculate due date
        if (task.endDate) {
            const endDate = new Date(task.endDate);
            const today = new Date();

            const differenceDays = differenceInDays(endDate, today);

            const remainingDateText =
                differenceDays > 0
                    ? `${differenceDays} days left`
                    : differenceDays == 0
                      ? 'Today'
                      : `${Math.abs(differenceDays)} days ago`;

            setRemainingDateText(remainingDateText);
        }
    }, []);

    // Handle drag n drop
    const {
        setNodeRef,
        attributes,
        transform,
        transition,
        listeners,
        isDragging,
    } = useSortable({
        id: task.id,
        data: { type: 'Task', task },
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    // Drag item placeholder
    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={{
                    width: dimensions.width,
                    height: dimensions.height,
                    ...style,
                }}
                className="mb-1 rounded-md border-2 bg-gray-300/60"
            />
        );
    }

    return (
        <div ref={ref}>
            {/* Task detailed view */}
            {isShowTaskDetailed && (
                <DetailedTaskView
                    isShowTaskDetailed={isShowTaskDetailed}
                    setIsShowTaskDetailed={setIsShowTaskDetailed}
                    task={task}
                />
            )}

            {/* Task Container */}
            <div
                ref={setNodeRef}
                style={style}
                className="mb-1 rounded-md border-2 border-slate-200 bg-white"
                {...attributes}
                {...listeners}
            >
                <div
                    className="pl-3 pr-1"
                    onClick={() => setIsShowTaskDetailed(true)}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                            {task.tags &&
                                task.tags.slice(0, 2).map(tag => (
                                    <Badge
                                        key={tag.id}
                                        style={{
                                            backgroundColor: tinycolor(
                                                tag.color
                                            ).lighten(50),
                                            color: tinycolor(tag.color),
                                        }}
                                        className="h-6"
                                    >
                                        {tag.title}
                                    </Badge>
                                ))}

                            {task.tags.length > 2 && (
                                <Badge className="h-6 bg-slate-100 text-slate-500 hover:bg-slate-200/80">
                                    + {task.tags.length - 2}
                                </Badge>
                            )}
                        </div>

                        <Button
                            variant="ghost"
                            onClick={e => e.stopPropagation()}
                            className="text-gray-500/60 hover:cursor-default hover:bg-transparent hover:text-gray-500/60"
                        >
                            <MoreHorizontal />
                        </Button>
                    </div>

                    <div>
                        {/* Task Contents */}
                        <div className="max-w-52 truncate text-xl font-semibold">
                            {task.title}
                        </div>

                        <div className="max-w-60 truncate text-sm">
                            {task.des}
                        </div>

                        {/* Asignee List */}
                        <div className="flex items-center justify-between">
                            <MemberList
                                width={6}
                                height={6}
                                members={task.memList}
                            />

                            {/* prevent on trigger drag event */}
                            <Button
                                onClick={e => e.stopPropagation()}
                                variant="ghost"
                            >
                                <UserRoundPlus className="h-4 w-4" />
                            </Button>
                        </div>

                        <Divider
                            width="100%"
                            height="1px"
                            color="rgba(0,0,0,0.10)"
                        />

                        {/* Helper Buttons */}
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2 text-sm">
                                <div className="flex items-center gap-1 p-2 hover:rounded-md hover:bg-slate-300/20">
                                    <List className="h-5 w-4" />
                                    {task.todos.length}
                                </div>

                                <div className="flex items-center gap-1 p-2 hover:rounded-md hover:bg-slate-300/20">
                                    <Paperclip className="h-5 w-4" />
                                    {task.attachments.length}
                                </div>

                                {task.endDate && (
                                    <div className="flex items-center gap-1 p-2 hover:rounded-md hover:bg-slate-300/20">
                                        <Calendar className="h-5 w-4" />{' '}
                                        {task.endDate && (
                                            <div>{remainingDateText}</div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <Button
                                variant="ghost"
                                onClick={e => {
                                    e.stopPropagation();
                                }}
                                className="text-gray-500/60 hover:cursor-default hover:bg-transparent hover:text-gray-500/60"
                            >
                                <Flag className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

TaskContainer.propTypes = {
    task: PropTypes.instanceOf(Task),
};
