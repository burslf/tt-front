function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  
function formatDate(date: Date) {
return (
    [
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
    date.getFullYear(),
    ].join('/') +
    ' ' +
    [
    padTo2Digits(date.getHours()),
    padTo2Digits(date.getMinutes()),
    // Uncomment below if you want seconds
    // padTo2Digits(date.getSeconds()),
    ].join(':')
);
}

export {
    formatDate
}