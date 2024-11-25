document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOM fully loaded and parsed');
    
    async function getUserIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            console.log('User IP:', data.ip);
            return data.ip;
        } catch (error) {
            console.error('Error fetching IP address:', error);
            return null;
        }
    }

    async function startCountdownWithIP(duration) {
        const userIP = await getUserIP();
        if (!userIP) {
            console.error('Could not get user IP address.');
            return;
        }

        const countdownKey = `countdown_${userIP}`;
        const firstVisitTime = localStorage.getItem(countdownKey);
        const countdownDate = new Date().getTime() + duration;

        if (firstVisitTime) {
            const elapsedTime = new Date().getTime() - parseInt(firstVisitTime);
            console.log('Elapsed Time:', elapsedTime);
            if (elapsedTime < duration) {
                startCountdown(duration - elapsedTime);
            } else {
                document.querySelector('.countdown-timer').innerHTML = "OFFER EXPIRED";
            }
        } else {
            localStorage.setItem(countdownKey, new Date().getTime());
            startCountdown(duration);
        }
    }

    function startCountdown(duration) {
        const countdownDate = new Date().getTime() + duration;
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            if (distance < 0) {
                clearInterval(interval);
                document.querySelector('.countdown-timer').innerHTML = "OFFER EXPIRED";
                return;
            }

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            hoursElement.innerHTML = hours < 10 ? '0' + hours : hours;
            minutesElement.innerHTML = minutes < 10 ? '0' + minutes : minutes;
            secondsElement.innerHTML = seconds < 10 ? '0' + seconds : seconds;

            console.log(`Countdown: ${hours}h ${minutes}m ${seconds}s`);
        }

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
    }

    // Set the target duration for the countdown (18 hours in milliseconds)
    const offerDuration = 18 * 60 * 60 * 1000;
    startCountdownWithIP(offerDuration);
});
