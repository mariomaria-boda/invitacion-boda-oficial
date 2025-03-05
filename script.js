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
            const location = "Salón de Eventos 'El Paraíso'";
            const details = "¡Acompáñanos en nuestra boda! Será un día especial lleno de amor y felicidad.";

            // Fecha y hora en la zona horaria local
            const startDate = "20250920T123000"; // 20 de septiembre 2025, 12:30 PM
            const endDate = "20250921T050000";   // 21 de septiembre 2025, 5:00 AM

            // Crear la URL de Google Calendar SIN el sufijo "Z" (para respetar zona horaria local)
            const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&sf=true&output=xml`;

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

    setInterval(() => moveSlide(1), 5000);

    showSlide(slideIndex);

    // === ANIMACIÓN DE LA CÁMARA ===
    const cameraIcon = document.querySelector(".album-image");
    setInterval(() => {
        cameraIcon.classList.toggle("camera-blink");
    }, 800);

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

    // Intentar iniciar la música automáticamente
    function autoPlayMusic() {
        audio.volume = 0.5; // Asegurar volumen medio
        audio.play().then(() => {
            musicIcon.src = "media/stop.png"; // Cambiar icono a stop
            isPlaying = true;
        }).catch(error => {
            console.log("Reproducción automática bloqueada. Esperando interacción del usuario.");
        });
    }

    // Llamar a la función para intentar reproducir
    autoPlayMusic();

    // Si la reproducción automática fue bloqueada, iniciar con la primera interacción
    function enableAutoPlay() {
        if (!isPlaying) {
            autoPlayMusic();
        }
        document.removeEventListener("click", enableAutoPlay);
        document.removeEventListener("scroll", enableAutoPlay);
    }

    document.addEventListener("click", enableAutoPlay, { once: true });
    document.addEventListener("scroll", enableAutoPlay, { once: true });

    // Botón para controlar la música
    musicButton.addEventListener("click", () => {
        if (isPlaying) {
            audio.pause();
            musicIcon.src = "media/play.png"; // Cambiar icono a play
        } else {
            audio.play();
            musicIcon.src = "media/stop.png"; // Cambiar icono a stop
        }
        isPlaying = !isPlaying;
    });
});
