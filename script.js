            let slideIndex = 1;
        let slideshowInterval; // Variable to hold the interval ID for hero section

        let testimonialSlideIndex = 1;
        let testimonialSlideshowInterval; // Variable to hold the interval ID for testimonials

        // Function to show slides for Hero Section
        function showSlides(n) {
            let i;
            const slides = document.getElementsByClassName("mySlides");
            const dots = document.getElementsByClassName("dot");

            // Reset animations for all text elements
            for (let j = 0; j < slides.length; j++) {
                const heading = slides[j].querySelector('.block-heading');
                const paragraph = slides[j].querySelector('.primary-paragraph');
                const ctaButton = slides[j].querySelector('.cta-button');

                // Remove animation classes to allow re-triggering
                if (heading) {
                    heading.classList.remove('animate-heading-in');
                    // Force reflow to restart animation
                    void heading.offsetWidth;
                }
                if (paragraph) {
                    paragraph.classList.remove('animate-paragraph-in');
                    void paragraph.offsetWidth;
                }
                if (ctaButton) {
                    ctaButton.classList.remove('animate-cta-in');
                    void ctaButton.offsetWidth;
                }
            }

            // Wrap around logic for slides
            if (n > slides.length) { slideIndex = 1 }
            if (n < 1) { slideIndex = slides.length }

            // Hide all slides and deactivate all dots
            for (i = 0; i < slides.length; i++) {
                slides[i].classList.remove('active');
                slides[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].classList.remove('active');
            }

            // Show the current slide and activate the corresponding dot
            slides[slideIndex - 1].classList.add('active');
            slides[slideIndex - 1].style.display = "block";
            dots[slideIndex - 1].classList.add('active');

            // Apply animations to the current slide's text elements
            const currentSlideElement = slides[slideIndex - 1];
            const currentHeading = currentSlideElement.querySelector('.block-heading');
            const currentParagraph = currentSlideElement.querySelector('.primary-paragraph');
            const currentCtaButton = currentSlideElement.querySelector('.cta-button');

            // Use a small timeout to ensure the display: block and opacity: 1 are applied before animation starts
            setTimeout(() => {
                if (currentHeading) currentHeading.classList.add('animate-heading-in');
                if (currentParagraph) currentParagraph.classList.add('animate-paragraph-in');
                if (currentCtaButton) currentCtaButton.classList.add('animate-cta-in');
            }, 50); /* Small delay to re-trigger animation */
        }

        // Next/previous controls for Hero Section
        function plusSlides(n) {
            resetSlideshowInterval(); // Reset interval on manual navigation
            showSlides(slideIndex += n);
        }

        // Thumbnail image controls for Hero Section
        function currentSlide(n) {
            resetSlideshowInterval(); // Reset interval on manual navigation
            showSlides(slideIndex = n);
        }

        // Automatic slideshow function for Hero Section
        function autoSlideshow() {
            plusSlides(1); // Move to the next slide
        }

        // Function to start/reset the slideshow interval for Hero Section
        function startSlideshowInterval() {
            slideshowInterval = setInterval(autoSlideshow, 5000); // Change image every 5 seconds
        }

        // Function to clear and restart the slideshow interval for Hero Section
        function resetSlideshowInterval() {
            clearInterval(slideshowInterval); // Clear existing interval
            startSlideshowInterval(); // Start a new one
        }

        // Function to show slides for Testimonials Section
        function showTestimonialSlides(n) {
            let i;
            const slides = document.getElementsByClassName("testimonial-slide");
            const dots = document.getElementsByClassName("testimonial-dot");

            if (n > slides.length) { testimonialSlideIndex = 1 }
            if (n < 1) { testimonialSlideIndex = slides.length }

            for (i = 0; i < slides.length; i++) {
                slides[i].classList.remove('active');
                slides[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].classList.remove('active');
            }

            slides[testimonialSlideIndex - 1].classList.add('active');
            slides[testimonialSlideIndex - 1].style.display = "flex"; /* Use flex for centering content */
            dots[testimonialSlideIndex - 1].classList.add('active');
        }

        // Next/previous controls for Testimonials Section
        function plusTestimonialSlides(n) {
            resetTestimonialSlideshowInterval(); // Reset interval on manual navigation
            showTestimonialSlides(testimonialSlideIndex += n);
        }

        // Thumbnail image controls for Testimonials Section
        function currentTestimonialSlide(n) {
            resetTestimonialSlideshowInterval(); // Reset interval on manual navigation
            showTestimonialSlides(testimonialSlideIndex = n);
        }

        // Automatic slideshow function for Testimonials Section
        function autoTestimonialSlideshow() {
            plusTestimonialSlides(1); // Move to the next slide
        }

        // Function to start/reset the slideshow interval for Testimonials Section
        function startTestimonialSlideshowInterval() {
            testimonialSlideshowInterval = setInterval(autoTestimonialSlideshow, 7000); // Change testimonial every 7 seconds
        }

        // Function to clear and restart the slideshow interval for Testimonials Section
        function resetTestimonialSlideshowInterval() {
            clearInterval(testimonialSlideshowInterval); // Clear existing interval
            startTestimonialSlideshowInterval(); // Start a new one
        }

        // Mobile menu toggle
        function toggleMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            const hamburgerIcon = document.querySelector('.hamburger-icon');
            mobileMenu.classList.toggle('open');
            hamburgerIcon.classList.toggle('open'); /* Toggle 'open' class on hamburger icon */
        }

        // Close mobile menu when a link is clicked (for smooth scrolling)
        document.querySelectorAll('#mobileMenu a').forEach(link => {
            link.addEventListener('click', () => {
                const mobileMenu = document.getElementById('mobileMenu');
                const hamburgerIcon = document.querySelector('.hamburger-icon');
                if (mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                    hamburgerIcon.classList.remove('open'); /* Also remove 'open' class from hamburger */
                }
            });
        });

        // Intersection Observer for scroll animations
        const elementsToAnimate = document.querySelectorAll(
            '#about .section-heading, #about .section-paragraph, ' +
            '#menu .section-heading, #menu .menu-item, ' +
            '#testimonials .section-heading, ' + // Only the heading for testimonials
            '#contact .section-heading, #contact .section-paragraph, #contact .contact-info, #contact .contact-form-container'
        );

        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.25 // Trigger when 25% of the element is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Apply delay based on the parent section for staggering
                    let delay = 0;
                    const parentSection = entry.target.closest('section');
                    if (parentSection) {
                        let siblingsToStagger = [];
                        if (parentSection.id === 'about') {
                            siblingsToStagger = Array.from(parentSection.querySelectorAll('.section-heading, .section-paragraph'));
                        } else if (parentSection.id === 'menu') {
                            siblingsToStagger = Array.from(parentSection.querySelectorAll('.menu-item'));
                        } else if (parentSection.id === 'testimonials') {
                            siblingsToStagger = Array.from(parentSection.querySelectorAll('.section-heading')); // Only heading
                        } else if (parentSection.id === 'contact') {
                            siblingsToStagger = Array.from(parentSection.querySelectorAll('.section-heading, .section-paragraph, .contact-info, .contact-form-container'));
                        }
                        const index = siblingsToStagger.indexOf(entry.target);
                        if (index !== -1) {
                            delay = index * 0.08; // Adjusted stagger delay for faster, moderate effect
                        }
                    }

                    entry.target.style.transitionDelay = `${delay}s`;
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, observerOptions);

        elementsToAnimate.forEach(element => {
            element.classList.add('animate-on-scroll');
            observer.observe(element);
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            const heroSection = document.getElementById('home');
            if (heroSection) {
                const heroHeight = heroSection.offsetHeight;
                // Trigger when past hero section. Adjusted threshold slightly for better feel.
                if (window.scrollY > heroHeight * 0.1) {
                    navbar.classList.add('navbar-scrolled');
                } else {
                    navbar.classList.remove('navbar-scrolled');
                }
            }
        });


        // Initialize slideshows and event listeners on window load
        window.onload = function() {
            showSlides(slideIndex); // Display the first hero slide
            startSlideshowInterval(); // Start the automatic hero slideshow

            showTestimonialSlides(testimonialSlideIndex); // Display the first testimonial slide
            startTestimonialSlideshowInterval(); // Start the automatic testimonial slideshow

            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();

                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });

            // Initial check for navbar background in case page loads scrolled down
            const navbar = document.querySelector('.navbar');
            const heroSection = document.getElementById('home');
            if (heroSection) {
                const heroHeight = heroSection.offsetHeight;
                if (window.scrollY > heroHeight * 0.1) {
                    navbar.classList.add('navbar-scrolled');
                }
            }
        };
  