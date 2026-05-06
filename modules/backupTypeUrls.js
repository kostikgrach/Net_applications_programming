class BackupTypeUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getStocks() {
        return `${this.baseUrl}/backupTypes`;
    }

    getStockById(id) {
        return `${this.baseUrl}/backupTypes/${id}`;
    }

    createStock() {
        return `${this.baseUrl}/backupTypes`;
    }

    removeStockById() {
        return `${this.baseUrl}/backupTypes/${id}`;
    }

    updateStockById() {
        return `${this.baseUrl}/backupTypes/${id}`;
    }
}

export const backupTypeUrls = new BackupTypeUrls();