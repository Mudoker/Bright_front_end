import { faker } from "@faker-js/faker";

export const getValueDisparityBetweenTwoTimestamps = (firstValue: number, secondValue: number): string =>
    `${(((secondValue - firstValue) / (firstValue + secondValue)) * 100).toFixed(0)}%`;

export const generateRandomChartData = (length: number): { timestamp: string, data: number }[] => {
    const chartData = [];
    for (let i = 0; i <= length; i++) {
        const timestamp = faker.date.future().toISOString().slice(0, 10).replace(/-/g, '/').split('/').reverse().join('/');
        const data = faker.number.int({ min: 100, max: 500 });
        chartData.push({ timestamp, data });
    }
    return chartData;
}
