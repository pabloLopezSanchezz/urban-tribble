document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------
    // CONFIGURACIÓN DE TELEGRAM
    // Sustituye tu BOT TOKEN y chat_id
    // -------------------------------
    const TELEGRAM_BOT_TOKEN = "5979062101:AAG3ifapspWVoTkQ4T1o0EzkqWxyvVyqF4g";
    const TELEGRAM_CHAT_ID   = "72034934";
  
    function telegramSendMessage(text) {
      const baseUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const encodedText = encodeURIComponent(text);
      const finalUrl = `${baseUrl}?chat_id=${TELEGRAM_CHAT_ID}&text=${encodedText}`;
  
      fetch(finalUrl)
        .then(res => {
          if (!res.ok) {
            console.error("Error al enviar mensaje a Telegram:", res.statusText);
          } else {
            console.log("Mensaje enviado a Telegram:", text);
          }
        })
        .catch(err => console.error("Error en fetch Telegram:", err));
    }
  
    // -------------------------------
    // FUNCIÓN PARA ESTIMAR DISPOSITIVO
    // -------------------------------
    function guessDeviceDetails() {
      const ua = navigator.userAgent || "Unknown UA";
  
      // Ejemplo muy simplificado (no es 100% fiable)
      if (ua.includes("iPhone")) {
        // Buscar la versión de iOS
        const match = ua.match(/OS (\d+)_(\d+)_?(\d+)?/);
        if (match) {
          const major = match[1];
          // Podríamos decir "iPhone (iOS 16)" etc.
          return `iPhone (iOS ${major}) - *modelo aproximado*`;
        } else {
          return "iPhone (versión iOS desconocida)";
        }
      }
  
      if (ua.includes("iPad")) {
        return "iPad";
      }
      if (ua.includes("Android")) {
        return "Android device";
      }
      if (ua.includes("Mac OS")) {
        return "Mac OS device";
      }
      if (ua.includes("Windows")) {
        return "Windows PC";
      }
      return "Dispositivo desconocido";
    }
  
    // -------------------------------
    // FUNCIÓN PARA OBTENER LA IP Y GEOLocalIZACIÓN DEL USUARIO
    // -------------------------------
    async function getUserIPAndLocation() {
      try {
        // Obtener la IP
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const userIP = ipData.ip;
  
        // Verificar si la IP es la de pruebas
        if (userIP === '139.47.73.163') {
          console.log("IP de pruebas detectada. No se enviará el mensaje a Telegram.");
          return null; // No enviar mensaje
        }
  
        // Obtener la ubicación basada en la IP
        const geoResponse = await fetch(`https://ipapi.co/${userIP}/json/`);
        const geoData = await geoResponse.json();
  
        // Construir la dirección aproximada
        const direccion = geoData.city ? `${geoData.city}, ${geoData.region}, ${geoData.country_name}` : "Dirección desconocida";
        const codigoPostal = geoData.postal ? geoData.postal : "Código postal desconocido";
        const latitud = geoData.latitude ? geoData.latitude : "Latitud desconocida";
        const longitud = geoData.longitude ? geoData.longitude : "Longitud desconocida";
  
        return {
          ip: userIP,
          direccion: direccion,
          codigoPostal: codigoPostal,
          pais: geoData.country_name,
          region: geoData.region,
          ciudad: geoData.city,
          latitud: latitud,
          longitud: longitud
        };
      } catch (error) {
        console.error("Error al obtener la IP y geolocalización:", error);
        return {
          ip: 'IP desconocida',
          direccion: 'Dirección desconocida',
          latitud: 'Latitud desconocida',
          longitud: 'Longitud desconocida'
        };
      }
    }
  
    // ---------------------------------------
    // NOTIFICACIÓN AL ABRIR LA PÁGINA
    // ---------------------------------------
    // Info básica
    const plat = navigator.platform || "Unknown Platform";
    const lang = navigator.language || "Unknown Lang";
    const guessedDevice = guessDeviceDetails();
  
    // Obtener la IP y la ubicación, luego enviar el mensaje si no es la IP de pruebas
    getUserIPAndLocation().then(locationData => {
        if (locationData === null) return; // No enviar mensaje si es la IP de pruebas

        const { ip, direccion, codigoPostal, pais, region, ciudad, latitud, longitud } = locationData;
        const deviceInfo = `Platform: ${plat}\nIP: ${ip}\nDirección Aproximada: ${direccion}, ${codigoPostal}, ${pais}\nLatitud: ${latitud}\nLongitud: ${longitud}`;
        telegramSendMessage(deviceInfo);
    });

  
    // ----------------------------------------------
    // CARRUSEL PRINCIPAL (Dinámico)
    // ----------------------------------------------
    const carouselSlides = document.getElementById('carouselSlides');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
  
    const imageList = [
      'assets/images/slide1.jpeg',
      'assets/images/slide10.jpeg',
      'assets/images/slide11.jpeg',
      'assets/images/slide12.jpeg',
      'assets/images/slide13.jpeg',
      'assets/images/slide14.jpeg',
      'assets/images/slide15.jpeg',
      'assets/images/slide16.jpeg',
      'assets/images/slide17.jpeg',
      'assets/images/slide18.jpeg',
      'assets/images/slide19.jpeg',
      'assets/images/slide2.jpeg',
      'assets/images/slide20.jpeg',
      'assets/images/slide21.jpeg',
      'assets/images/slide22.jpeg',
      'assets/images/slide23.jpeg',
      'assets/images/slide24.jpeg',
      'assets/images/slide25.jpeg',
      'assets/images/slide26.jpeg',
      'assets/images/slide27.jpeg',
      'assets/images/slide28.jpeg',
      'assets/images/slide29.jpeg',
      'assets/images/slide3.jpeg',
      'assets/images/slide30.jpeg',
      'assets/images/slide31.jpeg',
      'assets/images/slide32.jpeg',
      'assets/images/slide33.jpeg',
      'assets/images/slide34.jpeg',
      'assets/images/slide35.jpeg',
      'assets/images/slide36.jpeg',
      'assets/images/slide37.jpeg',
      'assets/images/slide38.jpeg',
      'assets/images/slide39.jpeg',
      'assets/images/slide4.jpeg',
      'assets/images/slide40.jpeg',
      'assets/images/slide41.jpeg',
      'assets/images/slide42.jpeg',
      'assets/images/slide43.jpeg',
      'assets/images/slide44.jpeg',
      'assets/images/slide45.jpeg',
      'assets/images/slide46.jpeg',
      'assets/images/slide47.jpeg',
      'assets/images/slide5.jpeg',
      'assets/images/slide6.jpeg',
      'assets/images/slide7.jpeg',
      'assets/images/slide8.jpeg',
      'assets/images/slide9.jpeg',
    ];
  
    let slides = [];
    let currentIndex = 0;
  
    // Cargar imágenes en el carrusel principal
    imageList.forEach((imgUrl, idx) => {
      const img = document.createElement('img');
      img.src = imgUrl;
      img.alt = 'Slide ' + (idx + 1);
      img.classList.add('slide');
      if(idx === 0) {
        img.classList.add('active');
      }
      carouselSlides.appendChild(img);
    });
    slides = Array.from(document.querySelectorAll('.slide'));
  
    // Función para mostrar una diapositiva específica
    function showSlide(index) {
      slides.forEach((img, i) => {
        img.classList.remove('active');
        if(i === index) {
          img.classList.add('active');
        }
      });
    }
  
    // Función para avanzar a la siguiente diapositiva
    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }
  
    // Función para retroceder a la diapositiva anterior
    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    }
  
    // Event listeners para los botones de navegación del carrusel principal
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetCarouselInterval();
    });
  
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetCarouselInterval();
    });
  
    // Intervalo para el cambio automático cada 5 segundos en el carrusel principal
    let carouselInterval = setInterval(nextSlide, 5000);
  
    // Función para reiniciar el intervalo del carrusel principal (se usa al navegar manualmente)
    function resetCarouselInterval() {
      clearInterval(carouselInterval);
      carouselInterval = setInterval(nextSlide, 5000);
    }
  
    // ----------------------------------------------
    // TABS
    // ----------------------------------------------
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
  
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
  
        tab.classList.add('active');
        const targetId = tab.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
      });
    });
  
    // ----------------------------------------------
    // Notificar PELÍCULA elegida (Cita 1)
    // ----------------------------------------------
    const peliculas = document.querySelectorAll('.pelicula');
    peliculas.forEach(p => {
      p.addEventListener('click', () => {
        const movieTitle = p.dataset.movie || 'Película desconocida';
        const message = `He elegido la película: ${movieTitle}`;
        telegramSendMessage(message);
        alert(`Has elegido: ${movieTitle}, petición solicitada.`);
      });
    });
  
    // ----------------------------------------------
    // CARRUSEL PEQUEÑO (CITA 3) - SITIO SECRETO
    // ----------------------------------------------
    const secretSlides = Array.from(document.querySelectorAll('.sorpresa-slide'));
    let secretIndex = 0;
  
    const prevSecretBtn = document.getElementById('prevSecret');
    const nextSecretBtn = document.getElementById('nextSecret');
  
    function showSecretSlide(index) {
      secretSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
          slide.classList.add('active');
        }
      });
    }
  
    function nextSecretSlide() {
      secretIndex = (secretIndex + 1) % secretSlides.length;
      showSecretSlide(secretIndex);
    }
  
    function prevSecretSlide() {
      secretIndex = (secretIndex - 1 + secretSlides.length) % secretSlides.length;
      showSecretSlide(secretIndex);
    }
  
    // Event listeners para los botones de navegación del carrusel secreto
    if (prevSecretBtn && nextSecretBtn) {
      prevSecretBtn.addEventListener('click', () => {
        prevSecretSlide();
        resetSecretInterval();
      });
      nextSecretBtn.addEventListener('click', () => {
        nextSecretSlide();
        resetSecretInterval();
      });
    }
  
    // Intervalo para el cambio automático cada 3 segundos en el carrusel secreto
    let secretInterval = setInterval(nextSecretSlide, 3000);
  
    // Función para reiniciar el intervalo del carrusel secreto (se usa al navegar manualmente)
    function resetSecretInterval() {
      clearInterval(secretInterval);
      secretInterval = setInterval(nextSecretSlide, 3000);
    }
  
    // ----------------------------------------------
    // CARRUSEL DEL POEMA
    // ----------------------------------------------
    const poemSlides = Array.from(document.querySelectorAll('.poem-slide'));
    let poemCurrentIndex = 0;
    const prevPoemBtn = document.getElementById('prevPoem');
    const nextPoemBtn = document.getElementById('nextPoem');

    // Función para mostrar una diapositiva específica con transiciones suaves
    function showPoemSlide(newIndex) {
        const currentSlide = poemSlides[poemCurrentIndex];
        const nextSlide = poemSlides[newIndex];
        
        if (currentSlide === nextSlide) return; // Evita cambios si es la misma diapositiva

        // Añade la clase 'active' a la nueva diapositiva para que comience a desvanecerse
        nextSlide.classList.add('active');
        
        // Después de 0.5 segundos (duración de la transición), remueve 'active' de la diapositiva anterior
        setTimeout(() => {
            currentSlide.classList.remove('active');
            poemCurrentIndex = newIndex; // Actualiza el índice actual
        }, 500); // 500 ms = 0.5 segundos
    }

    // Función para avanzar a la siguiente diapositiva
    function nextPoemSlide() {
        const newIndex = (poemCurrentIndex + 1) % poemSlides.length;
        showPoemSlide(newIndex);
    }

    // Función para retroceder a la diapositiva anterior
    function prevPoemSlide() {
        const newIndex = (poemCurrentIndex - 1 + poemSlides.length) % poemSlides.length;
        showPoemSlide(newIndex);
    }

    // Event listeners para los botones de navegación
    prevPoemBtn.addEventListener('click', () => {
        prevPoemSlide();
        resetPoemInterval();
    });

    nextPoemBtn.addEventListener('click', () => {
        nextPoemSlide();
        resetPoemInterval();
    });

    // Intervalo para el cambio automático cada 5.5 segundos
    let poemInterval = setInterval(nextPoemSlide, 5500);

    // Función para reiniciar el intervalo (se usa al navegar manualmente)
    function resetPoemInterval() {
        clearInterval(poemInterval);
        poemInterval = setInterval(nextPoemSlide, 5500);
    }
  
    // ----------------------------------------
    // REPRODUCTOR DE MÚSICA SIN PERSISTENCIA
    // ----------------------------------------
  
    const musicContainer = document.querySelector(".music-container");
    const playBtn = document.querySelector("#play");
    const prevButton = document.querySelector("#prev");
    const nextButton = document.querySelector("#next");
    const audio = document.querySelector("#audio");
    const title = document.querySelector("#title");
    const cover = document.querySelector("#cover");
    const progress = document.querySelector(".progress");
    const progressContainer = document.querySelector(".progress-container");
  
    const songs_list = [
      { src: 'assets/music/promesa.mp3', cover: 'assets/music/promesa.png', title: 'La Promesa - Melendi' },
      { src: 'assets/music/halloffame.mp3', cover: 'assets/music/halloffame.png', title: 'Hall Of Fame - The Script' },
      { src: 'assets/music/memories.mp3', cover: 'assets/music/memories.png', title: 'Memories - Maroon 5' },
      { src: 'assets/music/principiodealgo.mp3', cover: 'assets/music/principiodealgo.png', title: 'El principio de Algo - La La Love You' },
      { src: 'assets/music/Dandelions.mp3', cover: 'assets/music/Dandelions.png', title: 'Dandelions - Ruth B' },
      { src: 'assets/music/unstoppable.mp3', cover: 'assets/music/unstoppable.png', title: 'Unstoppable - Sia' },
      { src: 'assets/music/tantolaqueria.mp3', cover: 'assets/music/tantolaqueria.png', title: 'Tanto la Queria - Andy y Lucas' },
      { src: 'assets/music/business.mp3', cover: 'assets/music/business.png', title: 'The Business - Tiësto' },
      { src: 'assets/music/millionReasons.mp3', cover: 'assets/music/millionReasons.png', title: 'Million Reasons - Lady Gaga' },
      { src: 'assets/music/hastamifinal.mp3', cover: 'assets/music/hastamifinal.png', title: 'Hasta mi Final - Il Divo' }
    ];
  
    let songIndex = 0;
  
    function loadSong(song) {
      title.innerText = song.title;
      audio.src = song.src;
      cover.src = song.cover;
    }
  
    function playSong() {
      musicContainer.classList.add('play');
      playBtn.querySelector('i.fas').classList.remove('fa-play');
      playBtn.querySelector('i.fas').classList.add('fa-pause');
      audio.play();
    }
  
    function pauseSong() {
      musicContainer.classList.remove('play');
      playBtn.querySelector('i.fas').classList.remove('fa-pause');
      playBtn.querySelector('i.fas').classList.add('fa-play');
      audio.pause();
    }
  
    function prevSong() {
      songIndex--;
      if (songIndex < 0) {
        songIndex = songs_list.length - 1;
      }
      loadSong(songs_list[songIndex]);
      playSong();
    }
  
    function nextSong() {
      songIndex++;
      if (songIndex > songs_list.length - 1) {
        songIndex = 0;
      }
      loadSong(songs_list[songIndex]);
      playSong();
    }
  
    playBtn.addEventListener('click', () => {
      const isPlaying = musicContainer.classList.contains('play');
      if (isPlaying) {
        pauseSong();
      } else {
        playSong();
      }
    });
  
    prevButton.addEventListener('click', prevSong);
    nextButton.addEventListener('click', nextSong);
  
    audio.addEventListener('timeupdate', updateProgress);
    progressContainer.addEventListener('click', setProgress);
    audio.addEventListener('ended', nextSong);
  
    function updateProgress(e) {
      const { duration, currentTime } = e.srcElement;
      const progressPercent = (currentTime / duration) * 100;
      progress.style.width = `${progressPercent}%`;
    }
  
    function setProgress(e) {
      const width = this.clientWidth;
      const clickX = e.offsetX;
      const duration = audio.duration;
      audio.currentTime = (clickX / width) * duration;
    }
  
    loadSong(songs_list[songIndex]);
  
});