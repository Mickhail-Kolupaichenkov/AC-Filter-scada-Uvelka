function updateDateTime() {
    const dateBlock = document.querySelector('.dateBlock');
    if (dateBlock) {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const dateTimeString = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
        dateBlock.textContent = dateTimeString;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateDateTime();
    setInterval(updateDateTime, 1000);
});