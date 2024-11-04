import { faker } from "@faker-js/faker";

export const getValueDisparityBetweenTwoTimestamps = (firstValue: number, secondValue: number): string => {
    return `${(((secondValue - firstValue) / (firstValue + secondValue)) * 100).toFixed(0)}%`
};

export const generateRandomChartData = (length: number): { timestamp: string, data: number }[] => {
    const chartData = [];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    for (let i = 0; i < length; i++) {
        const timestamp = `${months[i % 12]} ${i + 1}`;
        const data = faker.number.int({ min: 100, max: 500 });
        chartData.push({ timestamp, data });
    }
    return chartData;
}

export const generateRandomRecentActivity = (length: number): Object[] => {
    const chartData = [];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const projects = ['bright', faker.animal.type(), faker.animal.type()];

    for (let i = 0; i < length; i++) {
        const month = `${months[i % 12]}`;
        const projectOneMetrics = faker.number.int({ min: 1000, max: 5000 });
        const projectTwoMetrics = faker.number.int({ min: 1000, max: 5000 });
        const projectThreeMetrics = faker.number.int({ min: 1000, max: 5000 });

        chartData.push({
            month,
            [projects[0]]: projectOneMetrics,
            [projects[1]]: projectTwoMetrics,
            [projects[2]]: projectThreeMetrics
        });
    }

    return chartData;
}
