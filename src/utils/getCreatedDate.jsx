const getCreatedDate = () => {
    const today = new Date();
    const date = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const month = today.getMonth() < 9 ? `0${today.getMonth() + 1}` : today.getMonth()+1;
    return `${date}/${month}/${today.getFullYear()}`;
}

export { getCreatedDate };