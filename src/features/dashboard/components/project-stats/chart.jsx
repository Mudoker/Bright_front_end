import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { RefreshCcw } from 'lucide-react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { generateRandomRecentActivity } from '../../util/calculator';

export const description = 'An area chart with gradient fill';

const chartData = generateRandomRecentActivity(12);
console.log(chartData);
const chartConfig = {
  desktop: {
    label: 'Desktop',
    color_light: '#FFB3BA', // Light theme color
    color_dark: '#FF6F61', // Dark theme color
  },
  mobile: {
    label: 'Mobile',
    color_light: '#BAE1FF', // Light theme color
    color_dark: '#007ACC', // Dark theme color
  },
  bright: {
    label: 'Bright',
    color_light: '#FFB3BA', // Pastel Red
    color_dark: '#FF6F61', // Slightly darker pastel red
  },
  tuturuuu: {
    label: 'Tuturuuu',
    color_light: '#BFFCC6', // Pastel Green
    color_dark: '#7BC47F', // Slightly darker pastel green
  },
  sasuke: {
    label: 'Sasuke',
    color_light: '#FFDFBA', // Pastel Orange
    color_dark: '#FFAA85', // Slightly darker pastel orange
  },
};

{
  chartData.map((dataPoint, index) => (
    <Area
      key={index}
      dataKey="bright"
      type="natural"
      fill="url(#fillMobile)"
      fillOpacity={0.4}
      stroke="var(--color-mobile)"
      stackId="a"
    />
  ));
}
const chartKeys = ['bright', 'tuturuuu', 'sasuke'];

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chart() {
  const currentTheme = useSelector(state => state.currentTheme.value);
  const [spinning, setSpinning] = useState(true);

  // This code simply used to simulate a loading spinner
  useEffect(() => {
    const timer = setTimeout(() => {
      setSpinning(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [spinning]);

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            Recent Activities
            <Button variant="ghost" className="ml-auto">
              <RefreshCcw className="ml-auto h-4 w-4" />
            </Button>
          </CardTitle>
          <CardDescription>
            Your top 3 projects that have the most activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-60 w-full" config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={value => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />

              {chartKeys.map((key, index) => (
                <Area
                  key={index}
                  dataKey={key}
                  type="natural"
                  fill={
                    currentTheme === 'light'
                      ? chartConfig[key].color_light
                      : chartConfig[key].color_dark
                  }
                  fillOpacity={0.1}
                  stroke={
                    currentTheme === 'light'
                      ? chartConfig[key].color_light
                      : chartConfig[key].color_dark
                  }
                  stackId="a"
                />
              ))}
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                January - Dec 2024
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Chart;
