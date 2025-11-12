// Простий JavaScript для демонстрації live reload
document.addEventListener('DOMContentLoaded', function () {
    console.log('Gulp SCSS Project завантажено!');

    // Додавання інтерактивності до кнопок
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            // Створення анімації при кліку
            this.style.transform = 'scale(0.95)';

            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Виведення повідомлення
            const cardTitle = this.closest('.card')?.querySelector('h3')?.textContent || 'Кнопка';
            alert(`Ви натиснули кнопку в "${cardTitle}"`);
        });
    });

    // Додавання ефекту паралакса для хедера
    window.addEventListener('scroll', function () {
        const header = document.querySelector('.header');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        if (header) {
            header.style.transform = `translateY(${rate}px)`;
        }
    });

    // Плавна поява карток при скролінгу
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Спостереження за картками
    const cards = document.querySelectorAll('.card, .feature-item');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});