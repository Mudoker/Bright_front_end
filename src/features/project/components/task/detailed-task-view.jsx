import TabGroup from '@/components/general/tab-group';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useState } from 'react';
import tinycolor from 'tinycolor2';

import { TASK_DETAILED_TABS } from '../../assets/values';
import { Task } from '../../utils/class';
import { MemberList } from '../member-list';
import { AttachmentList } from './detailed-task-view/attachment-list';
import { TaskDiscussion } from './detailed-task-view/task-discussion';
import { TaskTodos } from './detailed-task-view/task-todos';

export const DetailedTaskView = ({
  isShowTaskDetailed,
  setIsShowTaskDetailed,
  task,
}) => {
  const [tabSelectedIndex, setTabSelectedIndex] = useState(0);
  const task_detail_views = [
    <TaskDiscussion />,
    <TaskTodos />,
    <AttachmentList />,
  ];

  return (
    <Sheet open={isShowTaskDetailed} onOpenChange={setIsShowTaskDetailed}>
      <SheetContent className="h-full flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">{task.title}</SheetTitle>
          <SheetDescription className="text-md">{task.des}</SheetDescription>
        </SheetHeader>

        {/* Headers */}
        <div className="text-sm mt-3 flex flex-col gap-4 flex-1">
          {/* Task brief */}
          <div className="flex items-center gap-11">
            Assignee
            <MemberList width={6} height={6} />
          </div>
          <div className="flex items-center gap-12">
            Timeline
            <div className="">
              {`${format(task.startDate, 'MM/dd/yyyy')}`}{' '}
              {task.endDate && `- ${format(task.endDate, 'MM/dd/yyyy')}`}
            </div>
          </div>
          <div className="flex gap-16">
            Tags
            <div className=" ml-2">
              {task.tags &&
                task.tags.map(tag => (
                  <Badge
                    key={tag.id}
                    style={{
                      backgroundColor: tinycolor(tag.color).lighten(50),
                      color: tinycolor(tag.color),
                    }}
                    className="h-6 mr-1 mb-1"
                  >
                    {tag.title}
                  </Badge>
                ))}
            </div>
          </div>
          {/* Inner tabs */}
          <TabGroup
            tableNames={TASK_DETAILED_TABS}
            selected={tabSelectedIndex}
            setSelected={setTabSelectedIndex}
          />

          <div className="flex-1">{task_detail_views[tabSelectedIndex]}</div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

DetailedTaskView.propTypes = {
  isShowTaskDetailed: PropTypes.bool,
  setIsShowTaskDetailed: PropTypes.func,
  task: PropTypes.instanceOf(Task),
};
