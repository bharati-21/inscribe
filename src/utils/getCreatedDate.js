const getCreatedDate = () => {
    const today = new Date();
    const date = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const month = today.getMonth() < 9 ? `0${today.getMonth() + 1}` : today.getMonth()+1;
    const hours = today.getHours() < 10 ? `0${today.getHours()}` : today.getHours();
    const mins = today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
    const secs = today.getSeconds() < 10 ? `0${today.getSeconds()}` : today.getSeconds();
    // const millis = today.getMilliseconds() < 10 ? `0${today.getMilliseconds()}` : today.getMilliseconds();
    return `${date}/${month}/${today.getFullYear()}, ${hours}:${mins}:${secs}`;
}

export { getCreatedDate };