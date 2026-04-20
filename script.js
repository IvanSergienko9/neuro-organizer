// Показ/скрытие блока с детьми
document.getElementById('hasChildren').addEventListener('change', function() {
    const childrenBlock = document.getElementById('childrenBlock');
    if (this.value === 'yes') {
        childrenBlock.classList.remove('hidden');
    } else {
        childrenBlock.classList.add('hidden');
    }
});

// Показ/скрытие блока с аллергиями
document.getElementById('hasAllergies').addEventListener('change', function() {
    const allergiesBlock = document.getElementById('allergiesBlock');
    if (this.value === 'yes') {
        allergiesBlock.classList.remove('hidden');
    } else {
        allergiesBlock.classList.add('hidden');
    }
});

// Обработка отправки формы
document.getElementById('eventForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Получаем данные
    const eventType = document.getElementById('eventType').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    let budget = parseInt(document.getElementById('budget').value);
    let guests = parseInt(document.getElementById('guests').value);
    const style = document.getElementById('style').value || 'любой';
    const hasChildren = document.getElementById('hasChildren').value;
    const childrenCount = hasChildren === 'yes' ? parseInt(document.getElementById('childrenCount').value) || 0 : 0;
    const childrenEntertainment = hasChildren === 'yes' ? document.getElementById('childrenEntertainment').value : 'none';
    const menuType = document.getElementById('menuType').value;
    const hasAllergies = document.getElementById('hasAllergies').value;
    const allergiesText = hasAllergies === 'yes' ? document.getElementById('allergiesText').value : 'нет';
    const musicPreference = document.getElementById('musicPreference').value;
    const alcohol = document.getElementById('alcohol').value;

    // Валидация
    if (budget < 5000) {
        alert('⚠️ Бюджет не может быть меньше 5 000 рублей!');
        return;
    }
    if (guests < 5 || guests > 3000) {
        alert('⚠️ Количество гостей должно быть от 5 до 3000 человек!');
        return;
    }
    if (!eventDate) {
        alert('⚠️ Пожалуйста, выберите дату мероприятия!');
        return;
    }
    if (!eventTime) {
        alert('⚠️ Пожалуйста, выберите время мероприятия!');
        return;
    }
    if (hasChildren === 'yes' && (!childrenCount || childrenCount < 1)) {
        alert('⚠️ Укажите количество детей!');
        return;
    }

    // Показываем загрузку
    const resultDiv = document.getElementById('result');
    const scenarioText = document.getElementById('scenarioText');
    resultDiv.classList.remove('hidden');
    scenarioText.innerHTML = '<p>⏳ Нейросеть анализирует все параметры и создаёт идеальный сценарий...</p>';

    // Имитация работы нейросети
    setTimeout(() => {
        const scenario = generateScenario(
            eventType, eventDate, eventTime, budget, guests, style,
            hasChildren, childrenCount, childrenEntertainment,
            menuType, hasAllergies, allergiesText,
            musicPreference, alcohol
        );
        scenarioText.innerHTML = scenario;
    }, 2000);
});

// Генератор сценария
function generateScenario(type, eventDate, eventTime, budget, guests, style, 
                          hasChildren, childrenCount, childrenEntertainment,
                          menuType, hasAllergies, allergiesText,
                          musicPreference, alcohol) {
    
    const typeText = {
        birthday: 'День рождения',
        corporate: 'Корпоратив',
        wedding: 'Свадьбу',
        concert: 'Концерт',
        party: 'Вечеринку',
        conference: 'Конференцию',
        festival: 'Фестиваль',
        graduation: 'Выпускной'
    }[type];

    // Форматируем дату
    const formattedDate = eventDate ? new Date(eventDate).toLocaleDateString('ru-RU') : 'не указана';
    
    // Логика детей
    let childrenSection = '';
    if (hasChildren === 'yes') {
        const entertainmentMap = {
            'animator': '🎈 Аниматор',
            'masterclass': '🎨 Мастер-класс',
            'playzone': '🧸 Игровая зона',
            'bouncy': '🤸 Батуты/горки',
            'all': '🎉 Всё вместе (аниматор + игры + мастер-класс)',
            'none': 'Не указано'
        };
        childrenSection = `
            <h3>👶 Детская программа:</h3>
            <ul>
                <li>👧 Количество детей: ${childrenCount}</li>
                <li>🎈 Развлечения: ${entertainmentMap[childrenEntertainment] || 'не выбрано'}</li>
                <li>💡 Рекомендация: выделите отдельную зону для детей и няню/аниматора на ${Math.ceil(childrenCount / 10)} человек(а)</li>
            </ul>
        `;
    }
    
    // Логика меню (добавлен халяль)
    const menuMap = {
        'regular': 'Обычное меню (мясо, рыба, гарниры)',
        'vegetarian': 'Вегетарианское меню (без мяса и рыбы)',
        'both': 'Обычное + вегетарианское меню',
        'halal': 'Халяль (сертифицированные продукты, без свинины, по исламским нормам)'
    };
    
    let allergiesSection = '';
    if (hasAllergies === 'yes' && allergiesText !== 'нет') {
        allergiesSection = `<p><strong>⚠️ Учитываем аллергии:</strong> ${allergiesText}. Обязательно предупредите кейтеринг!</p>`;
    }
    
    // Логика музыки
    const musicMap = {
        'pop': 'Поп-музыка (хиты, танцевальные треки)',
        'rock': 'Рок (живое звучание, гитары)',
        'electronic': 'Электронная музыка (диджей-сет)',
        'jazz': 'Джаз / Lounge (фоновая музыка)',
        'classical': 'Классическая музыка (пианино, струнные)',
        'russian': 'Русская эстрада',
        'mixed': 'Микс жанров (под любой вкус)'
    };
    
    // Алкоголь
    const alcoholText = alcohol === 'yes' 
        ? '🍷 С алкоголем (бар, коктейли, шампанское)' 
        : '🚫 Без алкоголя (безалкогольные коктейли, лимонады, морсы)';
    
    // Бюджетные расчёты
    const perPerson = Math.round(budget / guests);
    const foodBudget = Math.round(budget * 0.35);
    const entertainmentBudget = Math.round(budget * 0.3);
    const decorBudget = Math.round(budget * 0.15);
    const musicBudget = Math.round(budget * 0.1);
    
    // Специфичные рекомендации
    let typeSpecific = '';
    if (type === 'conference') {
        typeSpecific = '🎤 Оборудование: проектор, микрофоны, сцена, флипчарты.';
    } else if (type === 'festival') {
        typeSpecific = '🎪 Зоны активности: музыкальная сцена, фуд-корты, фотозоны.';
    } else if (type === 'graduation') {
        typeSpecific = '🎓 Атрибутика: ленты, шары, фотозона "Выпускник", слайд-шоу из фото.';
    } else if (type === 'wedding') {
        typeSpecific = '💍 Особое внимание: выкуп невесты, первый танец, каравай.';
    } else if (type === 'birthday') {
        typeSpecific = '🎂 Не забудьте про торт со свечами и конкурсы для именинника.';
    } else {
        typeSpecific = '🎵 Музыкальное сопровождение: подберите плейлист под стиль мероприятия.';
    }
    
    // Музыкальный совет
    let musicAdvice = '';
    if (musicPreference === 'jazz' || musicPreference === 'classical') {
        musicAdvice = 'Рекомендуем живого музыканта (пианист/саксофонист) для создания атмосферы.';
    } else if (musicPreference === 'electronic' || musicPreference === 'mixed') {
        musicAdvice = 'Рекомендуем профессионального диджея со световым шоу.';
    } else {
        musicAdvice = 'Можно использовать готовый плейлист или пригласить кавер-группу.';
    }

    // Дополнительная рекомендация для халяль
    let halalAdvice = '';
    if (menuType === 'halal') {
        halalAdvice = '<p>🕌 Важно: убедитесь, что кейтеринг имеет сертификат халяль. Рекомендуем согласовать меню заранее.</p>';
    }

    return `
        <p><strong>📅 Дата и время:</strong> ${formattedDate}, начало в ${eventTime}</p>
        <p><strong>🎯 Мероприятие:</strong> ${typeText} в стиле «${style}»</p>
        <p><strong>👥 Гостей:</strong> ${guests} чел. | <strong>💰 Бюджет:</strong> ${budget.toLocaleString()} ₽</p>
        <p><strong>🍽️ Бюджет на кейтеринг:</strong> ${foodBudget.toLocaleString()} ₽</p>
        <p><strong>🎭 Развлечения:</strong> ${entertainmentBudget.toLocaleString()} ₽</p>
        <p><strong>🎨 Декор:</strong> ${decorBudget.toLocaleString()} ₽</p>
        <p><strong>🎵 Музыка:</strong> ${musicBudget.toLocaleString()} ₽</p>
        <p><strong>${alcoholText}</strong></p>
        
        <h3>🍽️ Питание:</h3>
        <p>${menuMap[menuType]}</p>
        ${halalAdvice}
        ${allergiesSection}
        
        <h3>🎵 Музыкальная программа:</h3>
        <p>🎧 Жанр: ${musicMap[musicPreference]}</p>
        <p>💡 ${musicAdvice}</p>
        
        ${childrenSection}
        
        <hr>
        <h3>📅 Примерный тайминг:</h3>
        <ul>
            <li><strong>${eventTime}</strong> – Сбор гостей, welcome-drink</li>
            <li><strong>${addMinutes(eventTime, 30)}</strong> – Начало программы (ведущий / конкурсы)</li>
            <li><strong>${addMinutes(eventTime, 120)}</strong> – Ужин / фуршет</li>
            <li><strong>${addMinutes(eventTime, 210)}</strong> – Танцы / интерактив / музыка</li>
            <li><strong>${addMinutes(eventTime, 300)}</strong> – Торт / финальная часть</li>
        </ul>
        <p><strong>✨ Специально для ${typeText.toLowerCase()}:</strong> ${typeSpecific}</p>
        
        <h3>🎤 Рекомендованные подрядчики (AI-подбор):</h3>
        <ul>
            <li>🎤 Ведущий: Артур Смирнов (рейтинг 4.9, от ${Math.round(budget*0.1).toLocaleString()} ₽)</li>
            <li>📸 Фотограф: Алексей Евреев (рейтинг 4.95, от ${Math.round(budget*0.12).toLocaleString()} ₽)</li>
            <li>🍰 Кейтеринг: «Пир на весь мир» (от ${foodBudget.toLocaleString()} ₽)</li>
            <li>🎧 Музыкальное оформление: студия «SoundPro» (от ${musicBudget.toLocaleString()} ₽)</li>
        </ul>
        ${hasChildren === 'yes' ? '<li>🧸 Аниматор: Роман Таракан (от 10 000 ₽ за час)</li>' : ''}
        <p><em>✨ Сценарий сгенерирован нейросетью на основе всех ваших предпочтений.</em></p>
    `;
}

// Вспомогательная функция для добавления минут к времени
function addMinutes(timeStr, minutesToAdd) {
    if (!timeStr) return '--:--';
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes + minutesToAdd);
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

// Копирование текста
document.getElementById('copyBtn').addEventListener('click', function() {
    const text = document.getElementById('scenarioText').innerText;
    navigator.clipboard.writeText(text);
    alert('✅ Сценарий скопирован в буфер обмена!');
});