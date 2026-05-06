const backupTypesService = require('../services/backupTypesService');

const getAllBackupTypes = (req, res) => {
    const { title } = req.query;
    const backupType = backupTypesService.findAll(title);
    res.json(backupType);
};

const getBackupTypeById = (req, res) => {
    const id = parseInt(req.params.id);
    const backupType = backupTypesService.findOne(id);
    
    if (!backupType) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }
    
    res.json(backupType);
};

const createBackupType = (req, res) => {
    const { src, title, text } = req.body;
    
    // Простая валидация
    if (!src || !title || !text) {
        return res.status(400).json({ error: 'Не все поля заполнены' });
    }
    
    const newBackupType = backupTypesService.create({ src, title, text });
    res.status(201).json(newBackupType);
};

const updateBackupType = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedBackupType = backupTypesService.update(id, req.body);
    
    if (!updatedBackupType) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }
    
    res.json(updatedBackupType);
};

const deleteBackupType = (req, res) => {
    const id = parseInt(req.params.id);
    const success = backupTypesService.remove(id);
    
    if (!success) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }
    
    res.status(204).send(); // 204 No Content
};

module.exports = {
    getAllBackupType: getAllBackupTypes,
    getBackupTypeById: getBackupTypeById,
    createBackupType: createBackupType,
    updateBackupType: updateBackupType,
    deleteBackupType: deleteBackupType
};