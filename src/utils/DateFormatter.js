import { format } from 'date-fns'

export const formatingDate = (d) => {
    // Konversi string ke objek Date
    const convertDate = new Date(d);

    // Format tanggal menggunakan date-fns
    const formattedDate = format(convertDate, 'dd MMMM yyyy HH:mm');

    return formattedDate
}