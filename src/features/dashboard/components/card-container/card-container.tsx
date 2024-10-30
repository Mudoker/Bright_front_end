import { TrendingUp, TrendingDown, ArrowRight, ArrowLeft } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import React, { Dispatch, SetStateAction, useMemo, useCallback } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@components/ui/chart";
import { getValueDisparityBetweenTwoTimestamps, generateRandomChartData } from "../../util/calculator";
import { Button } from "@components/ui/button";
import { TaskButton } from "./task-button";

// Define colors as constants
const COLORS = {
  positive: "#80ed99",
  negative: "#ff6b6b",
};

const taskCompletedData = generateRandomChartData(12);
const taskAssignedData = generateRandomChartData(12);
const joinedProjectData = generateRandomChartData(12);

const MemoizedChart = React.memo(({ title, data, startInterval, endInterval }: { title: string, data: { timestamp: string, data: number }[], startInterval: string, endInterval: string }) => {
  const disparity = useMemo(() => getValueDisparityBetweenTwoTimestamps(data[0].data, data[data.length - 1].data), [data]);
  const isPositive = parseFloat(disparity) > 0;
  const trendColor = isPositive ? COLORS.positive : COLORS.negative;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
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
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Area
              dataKey="data"
              type="natural"
              fill={trendColor}
              fillOpacity={0.1}
              stroke={trendColor}
            />
          </AreaChart>
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
};

const UpcommingTask: React.FC<UpcommingTaskProps> = ({ paging, setPaging }) => {
  const handlePaging = useCallback((direction: 'prev' | 'next') => {
    if (direction === 'prev' && paging > 0) {
      setPaging(paging - 1);
    } else if (direction === 'next' && paging < 2) {
      setPaging(paging + 1);
    }
  }, [paging, setPaging]);

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
      <CardContent className="p-0 px-4">
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col gap-2">
            <TaskButton taskId="ZEN-123" title="Design New Landing Page" time="10:00 AM" />
            <TaskButton taskId="ZEN-124" title="Regular Team Meeting" time="12:00 AM" />
            <TaskButton taskId="ZEN-125" title="Fix Mobile Responsiveness" time="02:00 PM" />
            <span className="flex justify-between text-xs mt-2 dark:text-neutral-400">
              <span>
                {"Auto-refresh in 5 minutes"}
              </span>
              Page {paging + 1} of 3
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CardContainer = () => {
  const [paging, setPaging] = React.useState<number>(0);

  return (
    <div className="flex cursor-default gap-2 w-full">
      <MemoizedChart title="Tasks Completed" data={taskCompletedData} startInterval="January" endInterval="December" />
      <MemoizedChart title="Tasks Assigned" data={taskAssignedData} startInterval="January" endInterval="December" />
      <MemoizedChart title="Projects Joined" data={joinedProjectData} startInterval="January" endInterval="December" />
      <UpcommingTask paging={paging} setPaging={setPaging} />
    </div>
  );
};

export default CardContainer;
