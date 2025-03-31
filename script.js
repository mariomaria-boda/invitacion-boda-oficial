document.addEventListener("DOMContentLoaded", function () {
    // === CONTADOR REGRESIVO ===
    setInterval(() => {
        const weddingDate = new Date("Sep 20, 2025 12:30:00").getTime();
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;

        if (timeLeft < 0) {
            document.querySelector(".countdown").innerHTML = "<p>¡Hoy es el gran día! 🎉</p>";
            return;
        }

        const formatTime = (value) => String(value).padStart(2, "0");
        document.getElementById("days").textContent = formatTime(Math.floor(timeLeft / (1000 * 60 * 60 * 24)));
        document.getElementById("hours").textContent = formatTime(Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        document.getElementById("minutes").textContent = formatTime(Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)));
        document.getElementById("seconds").textContent = formatTime(Math.floor((timeLeft % (1000 * 60)) / 1000));
    }, 1000);

    // === GUARDAR FECHA EN GOOGLE CALENDAR ===
    const saveDateButton = document.getElementById("save-date-button");
    if (saveDateButton) {
        saveDateButton.addEventListener("click", () => {
            const title = "Boda de María & Mario";
            const location = "Iglesia de Santa María Magdalena, Pl. Mayor, 3, 28180 Torrelaguna, Madrid, España";
            const details = "¡Acompáñanos en nuestra boda! Será un día especial lleno de amor y felicidad.";
    
            // Fecha y hora en la zona horaria local
            const startDate = "20250920T123000"; // 20 de septiembre 2025, 12:30 PM
            const endDate = "20250920T223000";   // 20 de septiembre 2025, 22:30 PM
    
            // Color lavanda (Google lo asocia con `colorId=4`)
            const colorId = 4;
    
            // Recordatorio de 30 minutos antes (popup)
            const reminders = encodeURIComponent('[{"method":"popup","minutes":30}]');
    
            // Construcción de la URL de Google Calendar
            const googleCalendarUrl = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&sf=true&output=xml&add=Reminder&reminders=${reminders}&colorId=${colorId}`;
    
            window.open(googleCalendarUrl, "_blank"); // Abre Google Calendar en una nueva pestaña
        });
    }
    

    
    // === GALERÍA AUTOMÁTICA CON FLECHAS ===
    let slideIndex = 0;
    const slides = document.querySelectorAll(".gallery img");
    const totalSlides = slides.length;

    function showSlide(index) {
        slideIndex = (index + totalSlides) % totalSlides;
        slides.forEach((slide, i) => {
            slide.style.display = i === slideIndex ? "block" : "none";
        });
    }

    function moveSlide(n) {
        showSlide(slideIndex + n);
    }

    document.querySelector(".prev").addEventListener("click", () => moveSlide(-1));
    document.querySelector(".next").addEventListener("click", () => moveSlide(1));

    //setInterval(() => moveSlide(1), 5000);

    showSlide(slideIndex);

    // ANIMACIÓN DEL ICONO DEL CALENDARIO
    const calendarIcon = document.querySelector(".calendar-icon");
    if (calendarIcon) {
        setInterval(() => {
            calendarIcon.classList.toggle("calendar-blink");
        }, 800);
    }


    // MUSICA
    const musicButton = document.getElementById("music-toggle");
    const musicIcon = document.getElementById("music-icon");
    const audio = document.getElementById("background-music");

    let isPlaying = false;
    let firstInteraction = false;

    // Función para iniciar la música
    function autoPlayMusic() {
        audio.play().then(() => {
            musicIcon.src = "media/stop.png"; // Cambiar icono a stop
            isPlaying = true;
        }).catch(error => {
            console.log("Reproducción automática bloqueada, esperando interacción del usuario.");
        });
    }

    // Función para activar la música con la primera interacción (clic, scroll o toque)
    function activateMusic() {
        if (!firstInteraction) {
            autoPlayMusic();
            firstInteraction = true;

            // Eliminamos los eventos después de la primera interacción
            document.removeEventListener("click", activateMusic);
            document.removeEventListener("scroll", activateMusic);
            document.removeEventListener("touchstart", activateMusic);
        }
    }

    // Eventos para detectar interacción en móviles y ordenadores
    document.addEventListener("click", activateMusic);     // Clic en cualquier parte
    document.addEventListener("scroll", activateMusic);    // Scroll en ordenador
    document.addEventListener("touchstart", activateMusic); // Primer toque en móvil

    // Botón manual para controlar la música
    musicButton.addEventListener("click", () => {
        if (isPlaying) {
            audio.pause();
            musicIcon.src = "media/play.png";
        } else {
            audio.play();
            musicIcon.src = "media/stop.png";
        }
        isPlaying = !isPlaying;
    });


});
