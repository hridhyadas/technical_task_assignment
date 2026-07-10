/*==================================================
 ORANGE PR
 script.js
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
        Sticky Navbar
    =========================================*/

    const navbar = document.querySelector(".navbar");

    function stickyNavbar() {

        if (window.scrollY > 80) {

            navbar.classList.add("navbar-scrolled");

        } else {

            navbar.classList.remove("navbar-scrolled");

        }

    }

    stickyNavbar();

    window.addEventListener("scroll", stickyNavbar);


    /*=========================================
        Smooth Scroll
    =========================================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        });

    });


    /*=========================================
        Active Navigation
    =========================================*/

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".navbar .nav-link");

    function activeMenu() {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;

            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", activeMenu);


    /*=========================================
        Mobile Menu Close
    =========================================*/

    const navbarCollapse = document.querySelector(".navbar-collapse");

    const bsCollapse = navbarCollapse
        ? new bootstrap.Collapse(navbarCollapse, { toggle: false })
        : null;

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (window.innerWidth < 992 && bsCollapse) {

                bsCollapse.hide();

            }

        });

    });


    /*=========================================
        Hero Slider (Ready)
    =========================================*/

    const dots = document.querySelectorAll(".slider-dots .dot");
    const prevBtn = document.querySelector(".slider-controls-pill .prev-slide");
    const nextBtn = document.querySelector(".slider-controls-pill .next-slide");

    let currentSlide = 0;

    function updateDots(index) {

        dots.forEach(dot => dot.classList.remove("active"));

        if (dots[index]) {

            dots[index].classList.add("active");

        }

    }

    nextBtn?.addEventListener("click", () => {

        currentSlide++;

        if (currentSlide >= dots.length) {

            currentSlide = 0;

        }

        updateDots(currentSlide);

    });

    prevBtn?.addEventListener("click", () => {

        currentSlide--;

        if (currentSlide < 0) {

            currentSlide = dots.length - 1;

        }

        updateDots(currentSlide);

    });

    updateDots(currentSlide);


    /*=========================================
        Reveal Animation
    =========================================*/

    const revealItems = document.querySelectorAll(

        ".hero-content, .hero-woman-img, .floating-video-card"

    );

    function revealOnScroll() {

        const trigger = window.innerHeight * 0.88;

        revealItems.forEach(item => {

            const top = item.getBoundingClientRect().top;

            if (top < trigger) {

                item.classList.add("show");

            }

        });

    }

    revealOnScroll();

    window.addEventListener("scroll", revealOnScroll);


    /*=========================================
        Services Card Accordion / Expand
    =========================================*/

    const serviceCards = document.querySelectorAll(".service-card");
    const counterActive = document.querySelector(".counter-active");

    serviceCards.forEach((card, idx) => {

        card.addEventListener("click", () => {

            // Remove active from all
            serviceCards.forEach(c => {
                c.classList.remove("service-card--active");
                const body = c.querySelector(".service-card-body");
                const desc = c.querySelector(".service-card-desc");
                const arrow = c.querySelector(".service-card-arrow");
                const peekOverlay = c.querySelector(".service-card-overlay");

                if (body) {
                    // Swap active card overlay back to peek
                    c.querySelector(".service-card-overlay").className =
                        "service-card-overlay service-card-overlay--peek";
                }
            });

            // Activate clicked card
            card.classList.add("service-card--active");

            // Update the active card overlay classes
            const overlay = card.querySelector(".service-card-overlay");
            if (overlay) {
                overlay.className = "service-card-overlay";
            }

            // Update counter
            if (counterActive) {
                counterActive.textContent = String(idx + 1).padStart(2, "0");
            }

        });

    });


    /*=========================================
        Testimonials Slider
    =========================================*/

    const testiSlides  = document.querySelectorAll(".testi-slide");
    const testiPrev    = document.getElementById("testiPrev");
    const testiNext    = document.getElementById("testiNext");
    const testiActive  = document.querySelector(".testi-counter-active");
    const testiTotal   = document.querySelector(".testi-counter-total");

    let testiIdx = 0;
    const testiLen = testiSlides.length;

    function buildTestiCounter(current) {
        // Build "02 / 03" from the remaining slide numbers
        const others = [];
        for (let i = 0; i < testiLen; i++) {
            if (i !== current) others.push(String(i + 1).padStart(2, "0"));
        }
        return others.join(" / ");
    }

    function goToTesti(idx) {
        testiSlides[testiIdx].classList.remove("testi-slide--active");
        testiIdx = (idx + testiLen) % testiLen;
        testiSlides[testiIdx].classList.add("testi-slide--active");

        if (testiActive) testiActive.textContent = String(testiIdx + 1).padStart(2, "0");
        if (testiTotal)  testiTotal.textContent  = buildTestiCounter(testiIdx);
    }

    if (testiPrev) testiPrev.addEventListener("click", () => goToTesti(testiIdx - 1));
    if (testiNext) testiNext.addEventListener("click", () => goToTesti(testiIdx + 1));

    // Set initial counter display
    if (testiTotal) testiTotal.textContent = buildTestiCounter(0);

});