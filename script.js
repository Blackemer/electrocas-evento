// El script ahora es mucho más simple, ya que no controla la animación principal.
// Esto reduce la carga en el CPU del móvil.

document.addEventListener('DOMContentLoaded', () => {

    // ======================================================
    // ANIMACIONES DE SCROLL RECURRENTES
    // ======================================================
    const sections = document.querySelectorAll('.section-container');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(section => { sectionObserver.observe(section); });

    // ===============================================
    // LÓGICA DEL COUNTDOWN
    // ===============================================
    const eventDate = new Date('2025-08-14T19:00:00');
    const daysEl = document.getElementById('days'), hoursEl = document.getElementById('hours'), minutesEl = document.getElementById('minutes'), secondsEl = document.getElementById('seconds');
    const countdownContainer = document.getElementById('countdown');

    const updateCountdown = () => {
        const timeRemaining = eventDate - new Date();
        if (timeRemaining < 0) {
            clearInterval(timer);
            countdownContainer.innerHTML = "<div class='event-live glow-effect'>¡LA FIESTA ES AHORA!</div>"; return;
        }
        daysEl.textContent = String(Math.floor(timeRemaining / 86400000)).padStart(2, '0');
        hoursEl.textContent = String(Math.floor((timeRemaining % 86400000) / 3600000)).padStart(2, '0');
        minutesEl.textContent = String(Math.floor((timeRemaining % 3600000) / 60000)).padStart(2, '0');
        secondsEl.textContent = String(Math.floor((timeRemaining % 60000) / 1000)).padStart(2, '0');
    };
    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();
});
