export function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

// 将时间的毫秒数格式化为“yyyy-MM-dd”格式
export function formatDate(time) {
    let tmpDate = new Date(time);
    let year = tmpDate.getFullYear();
    let month = tmpDate.getMonth();
    let date = tmpDate.getDate();
    let formatDate = year + "-" + (month > 8 ? "" : "0") + (month + 1) + "-" + (date > 9 ? "" : "0") + date;
    return formatDate;
}
