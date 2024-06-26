export const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
    });
};

export const formatDateToLocal = (
    date: Date,
    locale: string = 'en-IN',
) => {
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
};

export const convertUTCtoUserTimezone = (utcTimestamp: Date, targetTimezone: string = 'Asia/Kolkata'): Date => {
    const utcDate = new Date(utcTimestamp);
    const options: Intl.DateTimeFormatOptions = { timeZone: targetTimezone };
    const dateString = utcDate.toLocaleString('en-US', options);
    return new Date(dateString);
}

export const generatePagination = (currentPage: number, totalPages: number) => {
    // If the total number of pages is 7 or less,
    // display all pages without any ellipsis.
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // If the current page is among the first 3 pages,
    // show the first 3, an ellipsis, and the last 2 pages.
    if (currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages];
    }

    // If the current page is among the last 3 pages,
    // show the first 2, an ellipsis, and the last 3 pages.
    if (currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    // If the current page is somewhere in the middle,
    // show the first page, an ellipsis, the current page and its neighbors,
    // another ellipsis, and the last page.
    return [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages,
    ];
};

export function defaultAvatarUrl(name: string) {
    return `https://ui-avatars.com/api/?background=fff&color=f9f9f9&bold=true&background=000000&name=${encodeURIComponent(
        name || ""
    )}`
}

export function capitalize(data: string) {
    if (typeof data !== "string" || data.length === 0) {
        return data;
    }
    return data.charAt(0).toUpperCase() + data.slice(1);
}
