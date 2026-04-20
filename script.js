document.getElementById('eventForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // 1. Получаем данные формы
    const eventType = document.getElementById('eventType').value;
    const budget = parseInt(document.getElementById('budget').value);
    const guests = parseInt(document.getElementById('guests').value);
    const style = document.getElementById('style').value || 'любой';

    // 2. Показываем индикатор загрузки (можно добавить спиннер)
    const resultDiv = document.getElementById('result');
    const scenarioText = document.getElementById('scenarioText');
    resultDiv.classList.remove('hidden');
    scenarioText.innerHTML = '<p>⏳ Нейросеть думает над идеальным сценарием...</p>';

    // 3. Имитация вызова ML-ядра (через 2 секунды)
    setTimeout(() => {
        const scenario = generateScenario(eventType, budget, guests, style);
        scenarioText.innerHTML = scenario;
    }, 2000);

    // 4. Позже здесь будет реальный API-запрос:
    /*
    const response = await fetch('https://ваш-бэкенд.ru/generate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({eventType, budget, guests, style})
    });
    const data = await response.json();
    scenarioText.innerHTML = data.scenario;
    */
});

// Функция-заглушка (имитация работы нейросети)
function generateScenario(type, budget, guests, style) {
    const typeText = {
        birthday: 'День рождения',
        corporate: 'Корпоратив',
        wedding: 'Свадьбу',
        concert: 'Концерт',
        party: 'Вечеринку'
    }[type];

    const perPerson = Math.round(budget / guests);
    const foodBudget = Math.round(budget * 0.4);
    const entertainmentBudget = Math.round(budget * 0.3);
    const decorBudget = Math.round(budget * 0.2);

    return `
        <p><strong>🎯 Мероприятие:</strong> ${typeText} в стиле «${style}»</p>
        <p><strong>👥 Гостей:</strong> ${guests} | <strong>💰 Бюджет:</strong> ${budget.toLocaleString()} ₽</p>
        <p><strong>🍽️ Рекомендуемый бюджет на еду:</strong> ${foodBudget.toLocaleString()} ₽</p>
        <p><strong>🎭 Развлечения:</strong> ${entertainmentBudget.toLocaleString()} ₽</p>
        <p><strong>🎨 Декор:</strong> ${decorBudget.toLocaleString()} ₽</p>
        <hr>
        <h3>📅 Примерный тайминг:</h3>
        <ul>
            <li><strong>18:00</strong> – Сбор гостей, welcome-drink</li>
            <li><strong>18:30</strong> – Начало программы (ведущий / конкурсы)</li>
            <li><strong>20:00</strong> – Ужин / фуршет</li>
            <li><strong>21:30</strong> – Танцы / интерактив</li>
            <li><strong>23:00</strong> – Торт / финальная часть</li>
        </ul>
        <h3>🎤 Рекомендованные подрядчики (AI-подбор):</h3>
        <ul>
            <li>🎤 Ведущий: Артур Смирнов (рейтинг 4.9, от ${Math.round(budget*0.1).toLocaleString()} ₽)</li>
            <li>📸 Фотограф: Мария Искра (рейтинг 4.8, от ${Math.round(budget*0.12).toLocaleString()} ₽)</li>
            <li>🍰 Кейтеринг: «Пир на весь мир» (от ${foodBudget.toLocaleString()} ₽)</li>
        </ul>
        <p><em>✨ Сценарий сгенерирован нейросетью. Вы можете скопировать его и доработать под себя.</em></p>
    `;
}

// Копирование текста
document.getElementById('copyBtn').addEventListener('click', function() {
    const text = document.getElementById('scenarioText').innerText;
    navigator.clipboard.writeText(text);
    alert('✅ Сценарий скопирован в буфер обмена!');
});