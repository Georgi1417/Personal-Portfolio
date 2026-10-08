/**
 * GEORGI SERGIEV - PERSONAL PORTFOLIO SCRIPT
 * Vanilla JavaScript (No Frameworks or Libraries)
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. PROJECTS DATA ARRAY
    // ----------------------------------------------------------------------
    const projectsData = [
        {
            id: 1,
            title: "Clinic Management System",
            description: "Система за управление на медицинска клиника. Позволява регистриране на пациенти, запазване на прегледи и управление на медицински досиета.",
            image: "assets/project1.jpg",
            tags: ["Python", "SQL", "HTML/CSS", "OOP"],
            details: "Тази платформа оптимизира работата в медицински центрове чрез централизирано управление на графики на лекари, електронен картон на пациента и бързи справки в релационна база данни."
        },
        {
            id: 2,
            title: "Movie App",
            description: "Модерно приложение за откриване и разглеждане на филми. Интегрира външен REST API за информация в реално време.",
            image: "assets/project2.jpg",
            tags: ["JavaScript", "REST API", "CSS3", "Responsive"],
            details: "Потребителите могат да търсят филми, да разглеждат рейтинг, актьорски състав и ревюта. Включва възможност за филтриране по жанр и запазване на любими заглавия."
        },
        {
            id: 3,
            title: "Weather App",
            description: "Приложение за показване на актуална информация за времето и прогноза за предстоящите дни.",
            image: "assets/project3.jpg",
            tags: ["JavaScript", "OpenWeather API", "CSS Grid", "Fetch API"],
            details: "Интерактивно приложение за прогноза за времето. Открива текущото местоположение или дава възможност за търсене на градове по целия свят с динамични фонови ефекти."
        },
        {
            id: 4,
            title: "Personal Portfolio",
            description: "Личен уебсайт и CV портфолио. Създаден с чист HTML, CSS и Vanilla JavaScript с бързо зареждане.",
            image: "assets/project4.jpg",
            tags: ["HTML5", "CSS3", "Vanilla JS", "UI/UX"],
            details: "Минималистичен и модерен тъмен дизайн, оптимизиран за всички типове устройства. Включва адаптивно меню, анимации при скролиране и клиентска валидация на контакти."
        }
    ];

    // ⚙️ PROJECTS DISPLAY MODE TOGGLE:
    // Change isSliderMode to true for Carousel Slider (with ← → arrows)
    // Change isSliderMode to false for standard Grid Layout (the default)
    const isSliderMode = false; /* 👈 TEACHER: Change false to true to turn ON Slider Mode! */

    // ----------------------------------------------------------------------
    // 2. DYNAMIC PROJECT CARD RENDERING & SLIDER LOGIC
    // ----------------------------------------------------------------------
    const projectsContainer = document.getElementById('projects-grid');
    const sliderControls = document.getElementById('projects-slider-controls');
    let currentSliderIndex = 0;

    function updateSliderView() {
        const cards = document.querySelectorAll('.project-card');
        const counter = document.getElementById('project-counter');
        
        cards.forEach((card, idx) => {
            if (idx === currentSliderIndex) {
                card.classList.add('active-slide');
            } else {
                card.classList.remove('active-slide');
            }
        });

        if (counter) {
            counter.textContent = `${currentSliderIndex + 1} / ${projectsData.length}`;
        }
    }

    function renderProjects() {
        if (!projectsContainer) return;
        
        projectsContainer.innerHTML = projectsData.map(project => `
            <article class="project-card reveal">
                <div class="project-img-wrapper">
                    <img src="${project.image}" alt="${project.title}" class="project-img" loading="lazy">
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech-list">
                        ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                    </div>
                    <button class="btn btn-primary project-btn" data-project-id="${project.id}">
                        Виж проекта
                    </button>
                </div>
            </article>
        `).join('');

        // Attach modal triggers to dynamic buttons
        document.querySelectorAll('.project-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const projectId = parseInt(e.currentTarget.getAttribute('data-project-id'));
                openProjectModal(projectId);
            });
        });

        // Initialize Slider Mode if enabled
        if (isSliderMode) {
            projectsContainer.classList.add('slider-mode');
            if (sliderControls) sliderControls.classList.add('active');
            updateSliderView();
        }
    }

    renderProjects();

    // Slider Navigation Arrows Handler
    document.getElementById('project-next')?.addEventListener('click', () => {
        currentSliderIndex = (currentSliderIndex + 1) % projectsData.length;
        updateSliderView();
    });

    document.getElementById('project-prev')?.addEventListener('click', () => {
        currentSliderIndex = (currentSliderIndex - 1 + projectsData.length) % projectsData.length;
        updateSliderView();
    });

    // ----------------------------------------------------------------------
    // 3. PROJECT MODAL POPUP
    // ----------------------------------------------------------------------
    const modalOverlay = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalCloseBtn = document.getElementById('modal-close');

    function openProjectModal(id) {
        const project = projectsData.find(p => p.id === id);
        if (!project || !modalOverlay || !modalBody) return;

        modalBody.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="modal-project-img">
            <h3 class="modal-project-title">${project.title}</h3>
            <p class="modal-project-desc">${project.details}</p>
            <div class="project-tech-list" style="margin-bottom: 1.5rem;">
                ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
            </div>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <a href="#contact" class="btn btn-primary modal-action-btn">Запитване за проект</a>
                <button class="btn btn-outline modal-close-action">Затвори</button>
            </div>
        `;

        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Modal interior close handler
        modalBody.querySelector('.modal-close-action')?.addEventListener('click', closeProjectModal);
        modalBody.querySelector('.modal-action-btn')?.addEventListener('click', () => {
            closeProjectModal();
        });
    }

    function closeProjectModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeProjectModal();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) {
            closeProjectModal();
        }
    });

    // ----------------------------------------------------------------------
    // 4. MOBILE HAMBURGER MENU
    // ----------------------------------------------------------------------
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isOpen);
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ----------------------------------------------------------------------
    // 5. NAVBAR SCROLL EFFECT & ACTIVE SCROLLSPY
    // ----------------------------------------------------------------------
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');

    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar shadow/blur background on scroll
        if (header) {
            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Active link highlighting
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const targetNavLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

            if (targetNavLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    targetNavLink.classList.add('active');
                } else {
                    targetNavLink.classList.remove('active');
                }
            }
        });

        // Back to top button visibility
        const backToTopBtn = document.getElementById('back-to-top');
        if (backToTopBtn) {
            if (scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    }

    window.addEventListener('scroll', handleScroll);

    // Back to top click behavior
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ----------------------------------------------------------------------
    // 6. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
    // ----------------------------------------------------------------------
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active'); // Re-triggers smooth animation every time you scroll past it!
            }
        });
    }, observerOptions);

    function initReveal() {
        document.querySelectorAll('.reveal').forEach(el => {
            revealObserver.observe(el);
        });
    }

    initReveal();

    // ----------------------------------------------------------------------
    // 7. CONTACT FORM VALIDATION
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formStatus = document.getElementById('form-status');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;
            formStatus.className = 'form-status';
            formStatus.style.display = 'none';

            // Validate Name
            if (!nameInput.value.trim()) {
                nameInput.classList.add('has-error');
                nameError.classList.add('visible');
                isValid = false;
            } else {
                nameInput.classList.remove('has-error');
                nameError.classList.remove('visible');
            }

            // Validate Email
            if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
                emailInput.classList.add('has-error');
                emailError.classList.add('visible');
                isValid = false;
            } else {
                emailInput.classList.remove('has-error');
                emailError.classList.remove('visible');
            }

            // Validate Message
            if (!messageInput.value.trim()) {
                messageInput.classList.add('has-error');
                messageError.classList.add('visible');
                isValid = false;
            } else {
                messageInput.classList.remove('has-error');
                messageError.classList.remove('visible');
            }

            if (isValid) {
                // Show Bulgarian Success Message
                formStatus.textContent = 'Благодаря! Съобщението е готово за изпращане.';
                formStatus.classList.add('success');
                formStatus.style.display = 'block';

                // Reset inputs
                contactForm.reset();

                // Auto hide status after 6 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 6000);
            } else {
                formStatus.textContent = 'Моля, попълнете правилно всички полета във формата.';
                formStatus.classList.add('error');
                formStatus.style.display = 'block';
            }
        });

        // Real-time input clearing of error states
        [nameInput, emailInput, messageInput].forEach(input => {
            if (input) {
                input.addEventListener('input', () => {
                    input.classList.remove('has-error');
                    const errorSpan = document.getElementById(`${input.id}-error`);
                    if (errorSpan) errorSpan.classList.remove('visible');
                });
            }
        });
    }

    // ----------------------------------------------------------------------
    // 8. DYNAMIC CURRENT YEAR IN FOOTER
    // ----------------------------------------------------------------------
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
});
