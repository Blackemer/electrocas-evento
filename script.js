document.addEventListener('DOMContentLoaded', () => {

    // ======================================================
    // SISTEMA DE PARTÍCULAS OPTIMIZADO
    // ======================================================
    const hero = document.getElementById('hero');
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    let particlesArray;
    let mouse = { x: null, y: null, radius: 100 };
    let animationFrameId; // Para controlar la animación

    function setupCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setupCanvas();

    window.addEventListener('mousemove', (event) => { mouse.x = event.x; mouse.y = event.y; });
    window.addEventListener('resize', () => { setupCanvas(); initParticles(); });

    class Particle {
        constructor(x, y, dX, dY, size, color) { this.x = x; this.y = y; this.directionX = dX; this.directionY = dY; this.size = size; this.color = color; }
        draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); ctx.fillStyle = this.color; ctx.fill(); }
        update() {
            if (this.x > canvas.width || this.x < 0) { this.directionX = -this.directionX; }
            if (this.y > canvas.height || this.y < 0) { this.directionY = -this.directionY; }
            let dx = mouse.x - this.x; let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) { this.x += 5; }
                if (mouse.x > this.x && this.x > this.size * 10) { this.x -= 5; }
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) { this.y += 5; }
                if (mouse.y > this.y && this.y > this.size * 10) { this.y -= 5; }
            }
            this.x += this.directionX; this.y += this.directionY; this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        let numberOfParticles;
        if (canvas.width < 768) {
            numberOfParticles = (canvas.height * canvas.width) / 25000;
        } else {
            numberOfParticles = (canvas.height * canvas.width) / 9000;
        }
        
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let dX = (Math.random() * 0.4) - 0.2;
            let dY = (Math.random() * 0.4) - 0.2;
            let color = Math.random() > 0.5 ? '#FF00FF' : '#00FFFF';
            particlesArray.push(new Particle(x, y, dX, dY, size, color));
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); }
        animationFrameId = requestAnimationFrame(animateParticles);
    }
    
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!animationFrameId) {
                    animateParticles();
                }
            } else {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        });
    }, { threshold: 0 });

    heroObserver.observe(hero);
    initParticles();

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
    // LÓGICA DEL COUNTDOWN (ACTUALIZADO)
    // ===============================================
    // CAMBIO: Fecha del evento actualizada al 14 de Agosto.
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
