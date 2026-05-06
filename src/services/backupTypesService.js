const fileService = require('./fileService');

// Переменная для хранения пути к файлу данных, будет установлена при инициализации
let dataFilePath;

// Функция инициализации сервиса с путем к файлу данных
const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = (title) => {
    const backupTypes = fileService.readData(dataFilePath);
    if (title) {
        return backupTypes.filter(backupType => 
            backupType.title.toLowerCase().includes(title.toLowerCase())
        );
    }
    return backupTypes;
};

const findOne = (id) => {
    const backupTypes = fileService.readData(dataFilePath);
    return backupTypes.find(backupType => backupType.id === id);
};

const create = (backupTypeData) => {
    const backupTypes = fileService.readData(dataFilePath);
    
    // Генерация ID: берем максимальный ID + 1
    const newId = backupTypes.length > 0 
        ? Math.max(...backupTypes.map(s => s.id)) + 1 
        : 1;
        
    const newStock = { id: newId, ...backupTypeData };
    backupTypes.push(newStock);
    fileService.writeData(dataFilePath, backupTypes);
    
    return newStock;
};

const update = (id, backupTypeData) => {
    const backupTypes = fileService.readData(dataFilePath);
    const index = backupTypes.findIndex(s => s.id === id);
    
    if (index === -1) return null;
    
    backupTypes[index] = { ...backupTypes[index], ...backupTypeData };
    fileService.writeData(dataFilePath, backupTypes);
    
    return backupTypes[index];
};

const remove = (id) => {
    const backupTypes = fileService.readData(dataFilePath);
    const filteredStocks = backupTypes.filter(s => s.id !== id);
    
    if (filteredStocks.length === backupTypes.length) {
        return false; // Ничего не удалили
    }
    
    fileService.writeData(dataFilePath, filteredStocks);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };