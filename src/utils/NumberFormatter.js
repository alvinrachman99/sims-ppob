export const formatNumber = (number) => {
    if (number === null || number === undefined) return '-';
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(number);
};

export const formatInputNumber = (number) => {
    if (!number) return '';

    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}