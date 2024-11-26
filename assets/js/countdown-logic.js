document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch the user's IP address
    function fetchUserIP(callback) {
        $.getJSON('https://api.ipify.org?format=json', function(data) {
            callback(data.ip);
        });
    }

    // Function to start the countdown
    function startCountdown(duration, element) {
        const endTime = new Date(Date.now() + duration).getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = endTime - now;

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const hoursElement = document.getElementById("hours");
            const minutesElement = document.getElementById("minutes");
            const secondsElement = document.getElementById("seconds");

            // Prepare new values
            const newHours = hours < 10 ? "0" + hours : hours;
            const newMinutes = minutes < 10 ? "0" + minutes : minutes;
            const newSeconds = seconds < 10 ? "0" + seconds : seconds;

            // Update only the elements that change
            if (hoursElement.innerText !== newHours) {
                hoursElement.innerText = newHours;
            }
            if (minutesElement.innerText !== newMinutes) {
                minutesElement.innerText = newMinutes;
            }
            if (secondsElement.innerText !== newSeconds) {
                secondsElement.innerText = newSeconds;
            }

            if (distance < 0) {
                clearInterval(countdownInterval);
                element.innerHTML = "OFERTA EXPIRADA!";
            }
        }

        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 1000);
    }

    // Main function
    fetchUserIP(function(ip) {
        const duration = 48 * 60 * 60 * 1000; // 48 hours
        const countdownElement = document.getElementById("countdown");

        // Check if a previous visit is stored in localStorage
        const storedVisitData = localStorage.getItem('userVisitData-' + ip);
        if (storedVisitData) {
            const { firstVisitTime } = JSON.parse(storedVisitData);
            const remainingTime = firstVisitTime + duration - new Date().getTime();
            startCountdown(remainingTime, countdownElement);
        } else {
            const firstVisitTime = new Date().getTime();
            localStorage.setItem('userVisitData-' + ip, JSON.stringify({ firstVisitTime }));
            startCountdown(duration, countdownElement);
        }
    });
});
