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

export const generateRandomUpcomingTasks = (length: number): { taskID: string, title: string, time: string }[] => {
    const tasks: { taskID: string, title: string, time: string }[] = []; // Explicitly type the array

    for (let i = 0; i < length; i++) {
        const taskID = faker.person.firstName().slice(0, 3).toUpperCase() + "-" + faker.number.int({ min: 1000, max: 9999 });
        const title = faker.lorem.sentence();

        // Generate time in 12-hour format
        const hours = faker.number.int({ min: 0, max: 23 }).toString().padStart(2, '0');
        const minutes = faker.number.int({ min: 0, max: 59 }).toString().padStart(2, '0');
        const period = parseInt(hours) >= 12 ? 'PM' : 'AM'; // Use parseInt to compare
        const adjustedHours = (parseInt(hours) % 12) || 12; // Convert 0 and 12 to 12
        const time12hr = `${adjustedHours.toString().padStart(2, '0')}:${minutes} ${period}`;

        // Assign the constructed time to the task object
        tasks.push({ taskID, title, time: time12hr }); // Fixed here
    }

    return tasks;
}
