const express = require('express');
const CORS = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const path = require('path');
const backupTypesRouter = require('./routes/backupTypes');
const backupTypesService = require('./services/backupTypesService');

const app = express();
const PORT = 3000;

// Определяем путь к файлу данных
const DATA_FILE_PATH = path.join(__dirname, 'data/backupTypes.json');

// Инициализируем сервис с путем к файлу данных
backupTypesService.init(DATA_FILE_PATH);

// 1. Встроенный middleware для парсинга JSON
app.use(express.json());

app.use(helmet());

const corsSettings = {
    origin: (origin, callback) => {
        if (!origin || origin.hostname == 'localhost') {
            callback(null, true)
        } else {
            callback(null, false)
        }
    }
}

app.use(CORS(corsSettings));

const limiter = rateLimit({
    windowMs: 60000,
    limit: 30,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: 'draft-8',
    legacyHeaders: false, 
})

app.use(limiter)

// 2. Логирующий middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Обязательно вызываем next(), иначе запрос зависнет
});

// 3. Подключение маршрутов
app.use('/backupTypes', backupTypesRouter);

// 4. Глобальная обработка 404
app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

// error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// 5. Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});