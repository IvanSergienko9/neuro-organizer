// ========== Локации по типам мероприятий ==========
const locationsByType = {
    birthday: ['🍽️ Ресторан "Уют"', '🎈 Кафе "Праздник"', '🏛️ Банкетный зал "Веранда"', '🏭 Лофт "Своя атмосфера"', '🎪 Дом культуры'],
    corporate: ['🏢 Бизнес-центр "Премьер"', '🏨 Отель "Marriott"', '📊 Конференц-зал "Технопарк"', '🍷 Ресторан "Корпоративный"', '🌳 Загородный клуб'],
    wedding: ['💒 ЗАГС "Центральный"', '🍽️ Ресторан "Свадебный"', '🏰 Усадьба "Лесная"', '✨ Банкетный зал "Престиж"', '🏖️ Пляжный комплекс'],
    concert: ['🎭 Актовый зал', '🏛️ Дворец культуры', '🏟️ Стадион', '🎵 Концертный зал "Крокус"', '🎪 Летняя эстрада'],
    party: ['💃 Ночной клуб "Energy"', '🏭 Лофт "Танцпол"', '🍸 Бар "Коктейль"', '🎉 Пати-пространство', '🏠 Квартирник'],
    conference: ['🏛️ Конгресс-центр', '🏨 Бизнес-отель', '🎓 Актовый зал университета', '💻 Коворкинг "Точка"', '🔬 Технопарк'],
    festival: ['🌳 Городской парк', '🏟️ Стадион', '🏖️ Пляж', '🌾 Поле "Фестивальное"', '🏰 Загородный комплекс'],
    graduation: ['🎓 Школьный актовый зал', '🍽️ Ресторан "Выпускной"', '✨ Банкетный зал', '💃 Ночной клуб', '🚢 Прогулочный теплоход']
};

// ========== Подробное меню по блюдам ==========
const detailedMenus = {
    regular: {
        name: '🍖 Классическое меню',
        items: [
            '🍣 Рыбная нарезка (лосось, форель, сёмга)',
            '🥩 Мясная нарезка (буженина, карпаччо, прошутто)',
            '🥗 Цезарь с креветками',
            '🍗 Куриные рулетики с грибами',
            '🥔 Картофель по-деревенски',
            '🐟 Стейк из сёмги с лимоном',
            '🍰 Тирамису на десерт',
            '🍎 Фруктовая тарелка (виноград, яблоки, киви)'
        ]
    },
    vegetarian: {
        name: '🥗 Вегетарианское меню',
        items: [
            '🥑 Гуакамоле с тортильей',
            '🍅 Брускетта с томатами и базиликом',
            '🥗 Греческий салат с фетой',
            '🍝 Паста с песто и кедровыми орешками',
            '🍄 Ризикотто с белыми грибами',
            '🥦 Овощи гриль (цукини, перец, баклажан)',
            '🍫 Трюфели из тёмного шоколада',
            '🍎 Печёные яблоки с корицей'
        ]
    },
    both: {
        name: '🍖🥗 Комбинированное меню',
        items: [
            '🍣 Рыбная и мясная нарезка',
            '🥗 Греческий салат (вегетарианский)',
            '🥩 Цезарь с курицей',
            '🍗 Медальоны из говядины',
            '🍄 Ризикотто с грибами (вегетарианский)',
            '🐟 Лосось на гриле',
            '🥦 Овощи гриль',
            '🍰 Ассорти десертов (тирасуми, чизкейк, фрукты)'
        ]
    },
    halal: {
        name: '🕌 Халяль меню',
        items: [
            '🍣 Халяль рыбная нарезка (сертифицированная)',
            '🍗 Халяль курица-гриль',
            '🥗 Салат с ягнёнком',
            '🐑 Плов с бараниной',
            '🍆 Запечённые баклажаны с сыром',
            '🥙 Фалафель с соусом тахини',
            '🍏 Финики и орехи',
            '🍎 Свежие фрукты'
        ]
    }
};

// ========== Генерация случайного номера телефона ==========
function generatePhone() {
    const phones = [
        '+7 (901) 123-45-67', '+7 (902) 234-56-78', '+7 (903) 345-67-89',
        '+7 (904) 456-78-90', '+7 (905) 567-89-01', '+7 (906) 678-90-12',
        '+7 (909) 789-01-23', '+7 (912) 890-12-34', '+7 (915) 901-23-45',
        '+7 (916) 012-34-56', '+7 (917) 123-45-67', '+7 (918) 234-56-78'
    ];
    return phones[Math.floor(Math.random() * phones.length)];
}

// ========== Логика обновления локаций ==========
document.getElementById('eventType').addEventListener('change', function() {
    const eventType = this.value;
    const locationSelect = document.getElementById('location');
    locationSelect.innerHTML = '<option value="">Выберите локацию</option>';
    
    if (locationsByType[eventType]) {
        locationsByType[eventType].forEach(loc => {
            const option = document.createElement('option');
            option.value = loc;
            option.textContent = loc;
            locationSelect.appendChild(option);
        });
    }
});

// ========== Динамическая проверка даты с исчезновением ошибки ==========
const dateInput = document.getElementById('eventDate');
const dateHint = document.getElementById('dateHint');

function validateDateOnInput() {
    const dateValue = dateInput.value;
    if (!dateValue) {
        dateHint.textContent = '❌ Пожалуйста, выберите дату';
        dateHint.className = 'hint error';
        return false;
    }
    
    const selectedDate = new Date(dateValue);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate.getTime() === today.getTime()) {
        dateHint.textContent = '❌ Нельзя выбрать сегодняшний день! Выберите другой день.';
        dateHint.className = 'hint error';
        return false;
    }
    
    if (selectedDate < today) {
        dateHint.textContent = '❌ Нельзя выбрать дату в прошлом!';
        dateHint.className = 'hint error';
        return false;
    }
    
    const diffDays = Math.ceil((selectedDate - today) / (1000 * 60 * 60 * 24));
    if (diffDays < 7) {
        dateHint.textContent = '⏰ ВНИМАНИЕ: До мероприятия меньше недели! Может не хватить времени.';
        dateHint.className = 'hint time-warning';
    } else {
        dateHint.textContent = '✅ Дата выбрана корректно';
        dateHint.className = 'hint success';
    }
    return true;
}

dateInput.addEventListener('input', validateDateOnInput);
dateInput.addEventListener('change', validateDateOnInput);

// ========== Показ/скрытие блоков ==========
document.getElementById('hasChildren').addEventListener('change', function() {
    document.getElementById('childrenBlock').classList.toggle('hidden', this.value !== 'yes');
});

document.getElementById('hasAllergies').addEventListener('change', function() {
    document.getElementById('allergiesBlock').classList.toggle('hidden', this.value !== 'yes');
});

document.getElementById('alcohol').addEventListener('change', function() {
    document.getElementById('alcoholBlock').classList.toggle('hidden', this.value !== 'yes');
});

// ========== Проверка даты (для отправки) ==========
function checkDateForSubmit(dateString) {
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate.getTime() === today.getTime()) {
        return { valid: false, warning: '❌ Нельзя организовать мероприятие сегодня! Выберите другой день.' };
    }
    
    if (selectedDate < today) {
        return { valid: false, warning: '❌ Нельзя выбрать дату в прошлом!' };
    }
    
    const diffDays = Math.ceil((selectedDate - today) / (1000 * 60 * 60 * 24));
    let warning = null;
    if (diffDays < 7) {
        warning = '⏰ ВНИМАНИЕ: До мероприятия меньше недели! Может не хватить времени на подготовку.';
    }
    
    return { valid: true, warning };
}

// ========== Исправленная проверка бюджета ==========
function checkBudget(budget, costs) {
    let warnings = [];
    let total = 0;
    
    for (const cost of Object.values(costs)) {
        total += cost;
    }
    
    if (total > budget) {
        warnings.push(`💰 Общая стоимость (${total.toLocaleString()} ₽) превышает бюджет (${budget.toLocaleString()} ₽) на ${(total - budget).toLocaleString()} ₽`);
        
        for (const [item, cost] of Object.entries(costs)) {
            if (cost > budget) {
                warnings.push(`❌ ${item} (${cost.toLocaleString()} ₽) дороже всего бюджета!`);
            }
        }
    } else {
        warnings.push(`✅ Бюджет позволяет реализовать все пункты. Остаток: ${(budget - total).toLocaleString()} ₽`);
    }
    
    return { warnings, total };
}

// ========== Генератор сценария ==========
function generateScenario(data) {
    const {
        eventType, eventDate, eventTime, location, budget, guests, style,
        hasChildren, childrenCount, childrenEntertainment,
        menuType, hasAllergies, allergiesText,
        musicPreference, alcohol, alcoholChoices
    } = data;

    const typeText = {
        birthday: 'День рождения', corporate: 'Корпоратив', wedding: 'Свадьбу',
        concert: 'Концерт', party: 'Вечеринку', conference: 'Конференцию',
        festival: 'Фестиваль', graduation: 'Выпускной'
    }[eventType];

    const formattedDate = new Date(eventDate).toLocaleDateString('ru-RU');
    
    // Расчёты стоимости (от общего бюджета, не почасово)
    const perPersonBudget = budget / guests;
    const foodCost = Math.min(Math.round(budget * 0.4), budget);
    const entertainmentCost = Math.min(Math.round(budget * 0.25), budget - foodCost);
    const decorCost = Math.min(Math.round(budget * 0.1), budget - foodCost - entertainmentCost);
    const musicCost = Math.min(Math.round(budget * 0.1), budget - foodCost - entertainmentCost - decorCost);
    const animatorCost = (hasChildren === 'yes' && childrenEntertainment !== 'none') ? Math.min(30000, budget * 0.15) : 0;
    const alcoholCost = (alcohol === 'yes') ? Math.min(Math.round(budget * 0.05), budget * 0.1) : 0;
    
    // Стоимость специалистов от общего бюджета
    const hostCost = Math.round(budget * 0.08);
    const photographerCost = Math.round(budget * 0.1);
    
    const costs = {
        'Питание': foodCost,
        'Развлечения': entertainmentCost,
        'Декор': decorCost,
        'Музыка': musicCost,
        'Ведущий': hostCost,
        'Фотограф': photographerCost,
        ...(animatorCost > 0 && { 'Аниматор': animatorCost }),
        ...(alcoholCost > 0 && { 'Алкоголь': alcoholCost })
    };
    
    const { warnings, total } = checkBudget(budget, costs);
    
    // Детская секция
    let childrenSection = '';
    if (hasChildren === 'yes') {
        const entertainmentMap = {
            'animator': '🎪 Аниматор', 'masterclass': '🎨 Мастер-класс',
            'playzone': '🧸 Игровая зона', 'bouncy': '🤸 Батуты/горки',
            'all': '🎉 Всё вместе', 'none': 'Не указано'
        };
        childrenSection = `
            <h3>👶 Детская программа</h3>
            <div class="menu-card">
                <h4>${entertainmentMap[childrenEntertainment]}</h4>
                <p>👧 Количество детей: ${childrenCount}</p>
                <p>💰 Стоимость: ${animatorCost > 0 ? animatorCost.toLocaleString() + ' ₽' : 'не выделена'}</p>
            </div>
        `;
    }
    
    // Меню
    const menu = detailedMenus[menuType];
    let menuHTML = `
        <h3>🍽️ ${menu.name}</h3>
        <div class="menu-grid">
    `;
    
    menu.items.forEach((item) => {
        menuHTML += `
            <div class="menu-card">
                <label>
                    <input type="checkbox" class="menu-item-check" checked data-item="${item}">
                    ${item}
                </label>
            </div>
        `;
    });
    
    menuHTML += `</div><small>💡 Снимите галочку, чтобы исключить блюдо из меню</small>`;
    
    // Алкоголь
    let alcoholSection = '';
    if (alcohol === 'yes' && alcoholChoices.length > 0) {
        const drinkNames = { vodka: '🥃 Водка', wine: '🍷 Вино', champagne: '🥂 Шампанское', beer: '🍺 Пиво', whiskey: '🥃 Виски', cocktails: '🍹 Коктейли' };
        const drinksList = alcoholChoices.map(d => drinkNames[d] || d).join(', ');
        alcoholSection = `
            <h3>🍾 Алкогольная программа</h3>
            <div class="menu-card">
                <p>🍸 Напитки: ${drinksList}</p>
                <p>💰 Бюджет: ${alcoholCost.toLocaleString()} ₽</p>
            </div>
        `;
    }
    
    // Музыка
    const musicMap = {
        'pop': '🎤 Поп-музыка', 'rock': '🎸 Рок', 'electronic': '🪩 Электронная',
        'jazz': '🎷 Джаз', 'classical': '🎻 Классическая', 'russian': '🎵 Русская эстрада', 'mixed': '🎧 Микс'
    };
    
    // Бюджетные предупреждения
    let budgetHTML = '';
    if (warnings.some(w => w.includes('превышает'))) {
        budgetHTML = `<div class="budget-warning">⚠️ ${warnings.filter(w => w.includes('превышает')).join('<br>')}</div>`;
    } else if (warnings.some(w => w.includes('✅'))) {
        budgetHTML = `<div class="budget-warning budget-success">✅ ${warnings.filter(w => w.includes('✅'))[0]}</div>`;
    }
    
    // Генерация телефонов
    const hostPhone = generatePhone();
    const photographerPhone = generatePhone();
    const animatorPhone = generatePhone();
    
    return `
        <div class="menu-card">
            <p><strong>📅 Дата и время:</strong> ${formattedDate}, ${eventTime}</p>
            <p><strong>🎯 Мероприятие:</strong> ${typeText} в стиле «${style}»</p>
            <p><strong>🏟️ Локация:</strong> ${location}</p>
            <p><strong>👥 Гостей:</strong> ${guests} чел. | <strong>💰 Бюджет:</strong> ${budget.toLocaleString()} ₽</p>
            <p><strong>💰 На одного гостя:</strong> ${Math.round(perPersonBudget).toLocaleString()} ₽</p>
        </div>
        
        ${budgetHTML}
        
        ${menuHTML}
        
        ${alcoholSection}
        
        <h3>🎵 Музыкальная программа</h3>
        <div class="menu-card">
            <p>🎧 ${musicMap[musicPreference]}</p>
            <p>💰 Бюджет: ${musicCost.toLocaleString()} ₽</p>
        </div>
        
        ${childrenSection}
        
        <h3>✨ Специалисты</h3>
        <div class="menu-grid">
            <div class="menu-card">
                <h4>🎤 Ведущий</h4>
                <p>Артур Смирнов</p>
                <p>💰 Стоимость: ${hostCost.toLocaleString()} ₽</p>
                <span class="phone-number">📞 ${hostPhone}</span>
            </div>
            <div class="menu-card">
                <h4>📸 Фотограф</h4>
                <p>Алексей Евреев</p>
                <p>💰 Стоимость: ${photographerCost.toLocaleString()} ₽</p>
                <span class="phone-number">📞 ${photographerPhone}</span>
            </div>
            ${hasChildren === 'yes' && childrenEntertainment !== 'none' ? `
            <div class="menu-card">
                <h4>🧸 Аниматор</h4>
                <p>Роман Таракан</p>
                <p>💰 Стоимость: ${animatorCost.toLocaleString()} ₽</p>
                <span class="phone-number">📞 ${animatorPhone}</span>
            </div>` : ''}
        </div>
        
        ${hasAllergies === 'yes' && allergiesText !== 'нет' ? `<div class="menu-card"><p><strong>⚠️ Учитываем аллергии:</strong> ${allergiesText}</p></div>` : ''}
        
        <p><em>✨ Сценарий сгенерирован нейросетью на основе ваших предпочтений.</em></p>
    `;
}

// ========== Обработка отправки формы ==========
document.getElementById('eventForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Сбор данных
    const eventType = document.getElementById('eventType').value;
    const location = document.getElementById('location').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    const budget = parseInt(document.getElementById('budget').value);
    const guests = parseInt(document.getElementById('guests').value);
    const style = document.getElementById('style').value || 'любой';
    const hasChildren = document.getElementById('hasChildren').value;
    const childrenCount = hasChildren === 'yes' ? parseInt(document.getElementById('childrenCount').value) || 0 : 0;
    const childrenEntertainment = hasChildren === 'yes' ? document.getElementById('childrenEntertainment').value : 'none';
    const menuType = document.getElementById('menuType').value;
    const hasAllergies = document.getElementById('hasAllergies').value;
    const allergiesText = hasAllergies === 'yes' ? document.getElementById('allergiesText').value : 'нет';
    const musicPreference = document.getElementById('musicPreference').value;
    const alcohol = document.getElementById('alcohol').value;
    
    // Сбор алкоголя
    const alcoholChoices = [];
    if (alcohol === 'yes') {
        document.querySelectorAll('#alcoholOptions input:checked').forEach(cb => {
            alcoholChoices.push(cb.value);
        });
    }
    
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
    
    const dateCheck = checkDateForSubmit(eventDate);
    if (!dateCheck.valid) {
        alert(dateCheck.warning);
        return;
    }
    
    if (!eventTime) {
        alert('⚠️ Пожалуйста, выберите время мероприятия!');
        return;
    }
    if (!location) {
        alert('⚠️ Пожалуйста, выберите локацию!');
        return;
    }
    if (hasChildren === 'yes' && (!childrenCount || childrenCount < 1)) {
        alert('⚠️ Укажите количество детей!');
        return;
    }
    if (alcohol === 'yes' && alcoholChoices.length === 0) {
        alert('⚠️ Выберите хотя бы один алкогольный напиток!');
        return;
    }
    
    // Генерация
    const resultDiv = document.getElementById('result');
    const scenarioText = document.getElementById('scenarioText');
    resultDiv.classList.remove('hidden');
    scenarioText.innerHTML = '<p>⏳ Нейросеть анализирует параметры и создаёт идеальный сценарий...</p>';
    
    setTimeout(() => {
        const scenario = generateScenario({
            eventType, eventDate, eventTime, location, budget, guests, style,
            hasChildren, childrenCount, childrenEntertainment,
            menuType, hasAllergies, allergiesText,
            musicPreference, alcohol, alcoholChoices
        });
        scenarioText.innerHTML = scenario;
        
        // Активация чекбоксов меню
        setTimeout(() => {
            document.querySelectorAll('.menu-item-check').forEach(cb => {
                cb.addEventListener('change', function() {
                    const parent = this.closest('.menu-card');
                    if (!this.checked) {
                        parent.style.opacity = '0.6';
                        parent.style.textDecoration = 'line-through';
                    } else {
                        parent.style.opacity = '1';
                        parent.style.textDecoration = 'none';
                    }
                });
            });
        }, 100);
    }, 2000);
});

// Копирование
document.getElementById('copyBtn').addEventListener('click', function() {
    const text = document.getElementById('scenarioText').innerText;
    navigator.clipboard.writeText(text);
    alert('✅ Сценарий скопирован!');
});