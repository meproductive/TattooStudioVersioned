document.addEventListener('DOMContentLoaded', () => {
  /* Animation */
  const obs = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target
      .dataset
      .animate
      .split(' ')
      .forEach(cls => entry.target.classList.add(cls));
    observer.unobserve(entry.target);
  });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
  });

  document.querySelectorAll('[data-animate]').forEach(el => obs.observe(el));

  /* Responsive hamburger menu button */ 
  const navigation = document.getElementById('navigation');
  const menuButton = document.getElementById('hamburger-btn');
  const links = document.querySelectorAll('a[href^="#"]');

  const toggleNavigation = () => {
    navigation.classList.toggle('active');
    menuButton.classList.toggle('active');
    document.body.style.overflow = navigation.classList.contains('active') ? 'hidden' : '';
  }

  menuButton.addEventListener('click', toggleNavigation);

  document.addEventListener('click', e => {
    if (navigation.classList.contains('active') && !navigation.contains(e.target) && !menuButton.contains(e.target))
      toggleNavigation();
  });
  
  /* Smooth click scroll animation */
  const smoothScroll = (targetSelector, duration) => {
    const targetEl = document.querySelector(targetSelector);
    const startY = window.pageYOffset;
    const targetRect = targetEl.getBoundingClientRect();

    const offset = (window.innerHeight - targetRect.height) / 2;
    const targetY = targetRect.top + startY - offset;
    const distance = targetY - startY;
    let startTime = null;

    const ease = (t, b, c, d) =>{
      t /= d/2;
      if (t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) -1) + b;
    }

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const runY = ease(timeElapsed, startY, distance, duration);
      window.scrollTo(0, runY);
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }

  links.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href.startsWith('#')) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const wasOpen = navigation.classList.contains('active');
      if (wasOpen) toggleNavigation();

      const delay = wasOpen ? 300 : 0;
      setTimeout(() => smoothScroll(href, 800), delay);
    });
  });

    const video = document.getElementById('intro-video');

    const src = window.innerWidth < 768 ? 'resources/media/Introwithsound-mobile.mp4' : 'resources/media/Introwithsound-desktop.mp4';

    video.innerHTML = `<source src="${src}" type="video/mp4">`;

    video.load();
    video.play().catch(err => console.warn('Autoplay probably blocked, but video is loaded.', err));

    video.addEventListener('play', () => {
      video.classList.add('played'); // add class for positioning video object with media queries
    });

    /* Carousel */ 
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.getElementById('left');
    const nextButton = document.getElementById('right');

    let currentIndex = 0;

    const updateCarousel = () => {
        const itemWidth = items[0].offsetWidth;
        const containerWidth = carousel.offsetWidth;

        // Center the current item by offsetting it
        const offset = Math.round(-((itemWidth * currentIndex) - (containerWidth / 2) + (itemWidth / 2)));
        carousel.style.transform = `translateX(${offset}px)`;

        items.forEach(item => item.classList.remove('active'));

        if (items[currentIndex]) {
            items[currentIndex].classList.add('active');
        }
    }

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Recalculate on resize
    window.addEventListener('resize', updateCarousel);

    // Initialize
    updateCarousel();

    /* Booking modal */
    const appointment =  document.getElementById("glassy-button").addEventListener('click', () => {
        const book = document.getElementById("booking-appointment");
        book.classList.toggle('active');
            if (book.classList.contains('active')) {
            document.body.style.overflow = "hidden"; // Disable scrolling
            } else {
                document.body.style.overflow = ""; // Re-enable scrolling
            }

    });

    const Xbtn = document.getElementById("x-btn").addEventListener('click', () => {
        const book = document.getElementById("booking-appointment");
        book.classList.remove('active');
                if (book.classList.contains('active')) {
            document.body.style.overflow = "hidden"; // Disable scrolling
            } else {
                document.body.style.overflow = ""; // Re-enable scrolling
            }
    });

});