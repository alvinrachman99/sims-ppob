export const formatNumber = (number) => {
    if (number === null || number === undefined) return '-';
    return new Intl.NumberFormat('en-US').format(number);
};

export const formatInputNumber = (number) => {
    if (!number) return '';

    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}