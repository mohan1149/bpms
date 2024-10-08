import store from "../redux/store";
export const getTimeStamp = (date) => {
    const formattedDate = date.getFullYear() + "-" +
        String(date.getMonth() + 1).padStart(2, '0') + "-" +
        String(date.getDate()).padStart(2, '0') + " " +
        String(date.getHours()).padStart(2, '0') + ":" +
        String(date.getMinutes()).padStart(2, '0') + ":" +
        String(date.getSeconds()).padStart(2, '0');
    return formattedDate;
}
export const getTimeFromString = (string) => {
    return new Date(string).toLocaleTimeString();
}

export const getFormattedCurrency = (currency, noCode = 0) => {
    if(currency===null){
        return 0;
    }
    let settings = store.getState().app.user.settings;
    if (noCode === 1) {
        return parseFloat(currency).toFixed(settings.decimal_points);
    } else {
        return settings.currency_code + ' ' + parseFloat(currency).toFixed(settings.decimal_points);
    }

}

export const can = (perm)=>{
    const user = store.getState().app.user;
    let role = user.user.role;
    if(role ==='admin'){
        return true;
    }else{
        const userPerms = JSON.parse(user.perms.role_perms);
        return userPerms.includes(perm);
    }
}