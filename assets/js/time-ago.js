function timeSince(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    const intervals = [
        { label: 'ano', seconds: 31536000 },
        { label: 'mês', seconds: 2592000 },
        { label: 'dia', seconds: 86400 },
        { label: 'hora', seconds: 3600 },
        { label: 'minuto', seconds: 60 }
    ];
    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            return `há ${count} ${interval.label}${count > 1 ? 's' : ''}`;
        }
    }
    return 'agora mesmo';
}

function updateTimes() {
    const timeElement = document.getElementById('timeAgo');
    const originalTime = new Date(Date.now() - (45 * 60 * 1000)); // 45 minutes ago
    timeElement.textContent = timeSince(originalTime);
}

document.addEventListener("DOMContentLoaded", function() {
    updateTimes();
    setInterval(updateTimes, 60000); // Atualiza a cada 1 minuto (60.000 ms)
});
