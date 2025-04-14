// Анимация появления элементов при скролле
document.addEventListener('DOMContentLoaded', function() {
    // Находим все элементы с классами для анимации
    const animateElements = document.querySelectorAll('.animate, .animate-left, .animate-right, .animate-zoom');
    
    // Создаем наблюдатель за пересечением
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
            }
        });
    }, { threshold: 0.1 });
    
    // Наблюдаем за всеми анимируемыми элементами
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Плавный скролл для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Изменение стиля навигации при скролле
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Добавим анимацию к некоторым элементам для большей интерактивности
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        // Эффект плавания для изображения в hero секции
        setInterval(() => {
            heroImage.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                heroImage.style.transform = 'translateY(0)';
            }, 1500);
        }, 3000);
    }
    
    // Анимация пульсации для кнопки CTA
    const ctaButton = document.querySelector('.cta .btn');
    if (ctaButton) {
        setInterval(() => {
            ctaButton.classList.add('pulse');
            setTimeout(() => {
                ctaButton.classList.remove('pulse');
            }, 1000);
        }, 5000);
    }
    
    // Добавим класс active для текущего активного раздела в навигации
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-links a').forEach((a) => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });
    
    // Добавим класс для pulse анимации
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .pulse {
                animation: pulseAnim 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            
            @keyframes pulseAnim {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            .nav-links a.active {
                color: var(--accent-color);
            }
            
            .nav-links a.active:before {
                transform: scaleX(1);
            }
        </style>
    `);
});
