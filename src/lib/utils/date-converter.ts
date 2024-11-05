export function formatDate(date: Date): string {
    // Array of month names
    const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    // Get month, day, and year from the Date object
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    // Format the date string
    const formattedDate = `${month} ${day}, ${year}`;

    return formattedDate;
}

export function getCurrentTimeSession(): string {
    const date = new Date();
    const hours = date.getHours();

    // Define the time session based on the hour
    let timeSession = '';

    if (hours >= 0 && hours < 12) {
        timeSession = 'Morning';
    } else if (hours >= 12 && hours < 17) {
        timeSession = 'Afternoon';
    } else {
        timeSession = 'Evening';
    }

    return timeSession;
}
