import { TrendingUp, TrendingDown, ArrowRight, ArrowLeft, CircleOff } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import React, { Dispatch, SetStateAction, useMemo, useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@components/ui/chart";
import { getValueDisparityBetweenTwoTimestamps, generateRandomChartData } from "../../utils/calculator";
import { Button } from "@components/ui/button";
import { TaskButton } from "./task-button";
import { useSelector } from "react-redux";
import { DataFactory } from "../../utils/data-factory";

// Define colors as constants
const COLORS = {
  positive: "#80ed99",
  negative: "#ff6b6b",
};

interface ChartData {
  timestamp: string;
  data: number;
}

interface MemoizedChartProps {
  title: string;
  data: ChartData[];
  startInterval: string;
  endInterval: string;
}

const MemoizedChart: React.FC<MemoizedChartProps> = React.memo(({ title, data, startInterval, endInterval }) => {
  const disparity = useMemo(() => {
    return data.length > 0 ? getValueDisparityBetweenTwoTimestamps(data[0].data, data[data.length - 1].data) : "0"; // Default to "0" if no data
  }, [data]);

  // Determine the trend direction and corresponding color/icon
  const isPositive = parseFloat(disparity) > 0;
  const trendColor = isPositive ? COLORS.positive : COLORS.negative;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  // Create chart configuration
  const chartConfig = useMemo(() => ({
    data: {
      label: title.split(" ")[1],
      color: "hsl(var(--chart-1))",
    },
  }), [title]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>

        <ChartContainer config={chartConfig}>
          {data == null || data.length === 0 ? ( // Check for null, undefined, or empty array
            <div className="flex h-full items-center justify-center text-muted-foreground text-base">
              {"No data available"}
            </div>
          ) : (
            <AreaChart
              accessibilityLayer
              data={data}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <CartesianGrid vertical={false} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                dataKey="data"
                type="natural"
                fill={trendColor}
                fillOpacity={0.1}
                stroke={trendColor}
              />
            </AreaChart>
          )}
        </ChartContainer>
      </CardContent>
      <CardFooter>

        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className={`flex items-center gap-2 font-medium leading-none ${trendColor}`}>
              {isPositive ? "Going up by" : "Going down by"} {disparity} this year
              <TrendIcon className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {startInterval} - {endInterval} 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
});

type UpcommingTaskProps = {
  paging: number;
  setPaging: Dispatch<SetStateAction<number>>;
  dataViewMode?: any;
};

interface Task {
  taskId: string;
  title: string;
  time: string;
}

const UpcomingTask: React.FC<UpcommingTaskProps> = ({ paging, setPaging, dataViewMode }) => {
  const [taskData, setTaskData] = useState<{ taskID: string; title: string; time: string }[]>([]); // Adjust type based on DataFactory output

  useEffect(() => {
    const fetchTaskData = () => {
      const data = DataFactory.getUpcomingTaskData(dataViewMode);
      setTaskData(data);
    };
    fetchTaskData();
  }, [dataViewMode]);

  const handlePaging = useCallback((direction: 'prev' | 'next') => {
    setPaging(prev => {
      if (direction === 'prev' && prev > 0) return prev - 1;
      if (direction === 'next' && prev < 2) return prev + 1;
      return prev; // Return current paging if no changes are made
    });
  }, [setPaging]);

  return (
    <Card className="flex flex-1 flex-col">
      <CardHeader className="py-4">
        <CardTitle className="flex items-center text-lg">
          <span>{"Today's Task"}</span>
          <div className="flex flex-col ml-auto gap-2">
            <div className="flex gap-1">
              <Button
                variant="outline"
                className="ml-auto px-3 border-0 h-fit"
                disabled={paging === 0}
                onClick={() => handlePaging('prev')}
              >
                <ArrowLeft width={10} height={10} />
              </Button>
              <Button
                variant="outline"
                className="ml-auto px-3 h-fit"
                onClick={() => handlePaging('next')}
                disabled={paging === 2}
              >
                <ArrowRight width={10} height={10} />
              </Button>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 px-4 h-full w-full">
        <div className="grid items-center gap-4 h-full w-full">
          <div className="flex flex-col gap-2 justify-between h-full w-full items-center">
            {taskData.length > 0 ? (
              <>
                {taskData.map(task => (
                  <TaskButton key={task.taskID} taskID={task.taskID} title={task.title} time={task.time} />
                ))}
                <span className="flex justify-between text-xs mt-2 pb-2 dark:text-neutral-400 w-full">
                  <span>{"Auto-refresh in 5 minutes"}</span>
                  Page {paging + 1} of 3
                </span>
              </>
            ) : (
              <div className="text-center text-muted-foreground w-full flex flex-col items-center py-4 gap-4 h-full justify-center">
                <CircleOff className="h-12 w-12" />

                <Button className="flex flex-col w-[350px] text-base font-thin hover:bg-transparent hover:text-neutral-300 hover:cursor-default" variant="ghost">
                  No upcoming tasks available.
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CardContainer = () => {
  const [paging, setPaging] = React.useState<number>(0);
  const currentDataViewMode = useSelector((state: any) => state.dataViewMode.current);
  const [taskCompletedData, setTaskCompletedData] = React.useState(DataFactory.getTaskCompletedData(currentDataViewMode));
  const [taskAssignedData, setTaskAssignedData] = React.useState(DataFactory.getTaskAssignedData(currentDataViewMode));
  const [joinedProjectData, setJoinedProjectData] = React.useState(DataFactory.getJoinedProjectData(currentDataViewMode));

  useEffect(() => {
    setTaskCompletedData(DataFactory.getTaskCompletedData(currentDataViewMode));
    setTaskAssignedData(DataFactory.getTaskAssignedData(currentDataViewMode));
    setJoinedProjectData(DataFactory.getJoinedProjectData(currentDataViewMode));
  }, [currentDataViewMode]);

  return (
    <div className="flex cursor-default gap-2 w-full">
      <MemoizedChart title="Tasks Completed" data={taskCompletedData} startInterval="January" endInterval="December" />
      <MemoizedChart title="Tasks Assigned" data={taskAssignedData} startInterval="January" endInterval="December" />
      <MemoizedChart title="Projects Joined" data={joinedProjectData} startInterval="January" endInterval="December" />
      <UpcomingTask paging={paging} setPaging={setPaging} dataViewMode={currentDataViewMode} />
    </div>
  );
};

export default CardContainer;
