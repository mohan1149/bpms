export const getTimeStamp = (date) => {
    const formattedDate = date.getFullYear() + "-" +
        String(date.getMonth() + 1).padStart(2, '0') + "-" +
        String(date.getDate()).padStart(2, '0') + " " +
        String(date.getHours()).padStart(2, '0') + ":" +
        String(date.getMinutes()).padStart(2, '0') + ":" +
        String(date.getSeconds()).padStart(2, '0');
    return formattedDate;
}
export const getTimeFromString = (string) =>{
    return new Date(string).toLocaleTimeString();
}