type DateStyle = 'full' | 'long' | 'medium' | 'short';

const getMonthInterval = (startDate: Date, endDate: Date): string => {
    if (!startDate || !endDate) {return '';}

    const startInterval =  styleDate(startDate, 'medium')
    ?.split(' ').slice(1,3).join(' ').replace('.', '');
    const endInterval =  styleDate(endDate, 'medium')
    ?.split(' ').slice(1,3).join(' ').replace('.', '');

    return `${startInterval} - ${endInterval}`;
}
const styleDate = (date: Date, style: DateStyle = 'long') => {
    if (!date) {return null;}

    return date.toLocaleDateString('fr', {dateStyle: style})
}

const getMonthList = (date: Date): String[] => {
    return Array(12).fill(0).map((_item, index) => {

        date.setMonth(index);

        const monthString =  date.toLocaleDateString(
            'fr', {dateStyle: 'long'}).split(' ')[1];

        return `${monthString[0].toUpperCase()}${monthString.substring(1,)}`
    })
}

const getYearList = (length = 50, date: Date, direction = -1): Number[] => {
    const startYear = date.getFullYear();
    let yearList = [];
    let currentYear = startYear;

    for (let i = 0; i < length; i++) {
        yearList.unshift(currentYear);
        currentYear = currentYear + direction
    }

    return yearList;
}

export const Date = {
    styleDate,
    getMonthInterval,
    getMonthList,
    getYearList,
}

