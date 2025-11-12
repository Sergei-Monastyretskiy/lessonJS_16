// Простий JavaScript для кнопок
document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 Gulp SCSS проект завантажено!');

    // Знаходимо всі кнопки
    const buttons = document.querySelectorAll('.btn');

    // Додаємо обробники подій для кожної кнопки
    buttons.forEach((button, index) => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            // Анімація натискання
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Визначаємо тип кнопки та дії
            const cardTitle = this.closest('.card').querySelector('h3').textContent;

            if (cardTitle.includes('Компіляція SCSS')) {
                showMessage('✅ SCSS успішно компілюється в CSS!', 'success');
            }
            else if (cardTitle.includes('Автопрефікси')) {
                showMessage('🔧 Автопрефікси додаються автоматично!', 'info');
                demonstrateAutoprefixer();
            }
            else if (cardTitle.includes('Live Reload')) {
                showMessage('🔄 Live Reload працює! Змініть SCSS файл і побачите!', 'warning');
                demonstrateLiveReload();
            }
            else if (cardTitle.includes('Мінімізація')) {
                showMessage('📦 CSS мінімізується для продакшну!', 'success');
                demonstrateMinification();
            }
        });
    });

    // Функція показу повідомлень
    function showMessage(text, type = 'info') {
        const message = document.createElement('div');
        message.className = `message message--${type}`;
        message.textContent = text;
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            max-width: 300px;
            animation: slideIn 0.3s ease;
        `;

        // Кольори для різних типів повідомлень
        const colors = {
            success: '#28a745',
            info: '#007bff',
            warning: '#ffc107',
            error: '#dc3545'
        };
        message.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(message);

        // Автоматичне видалення через 3 секунди
        setTimeout(() => {
            message.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(message);
            }, 300);
        }, 3000);
    }

    // Демонстрація автопрефіксів
    function demonstrateAutoprefixer() {
        console.log('🔧 Демонстрація автопрефіксів:');
        console.log('Ваш SCSS: transform: translateY(-3px);');
        console.log('Згенерований CSS: -webkit-transform: translateY(-3px); transform: translateY(-3px);');
    }

    // Демонстрація Live Reload
    function demonstrateLiveReload() {
        console.log('🔄 Щоб побачити Live Reload в дії:');
        console.log('1. Відкрийте src/scss/style.scss');
        console.log('2. Змініть $primary-color на інший колір');
        console.log('3. Збережіть файл');
        console.log('4. Дивіться як сторінка оновиться автоматично!');
    }

    // Демонстрація мінімізації
    function demonstrateMinification() {
        console.log('📦 Мінімізація CSS:');
        console.log('Запустіть "npm run build" щоб побачити стиснений CSS у css/style.css');
    }
});

// CSS анімації для повідомлень
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);