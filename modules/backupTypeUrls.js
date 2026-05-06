class BackupTypeUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getBackupTypes() {
        return `${this.baseUrl}/backupTypes`;
    }

    getBackupTypeById(id) {
        return `${this.baseUrl}/backupTypes/${id}`;
    }

    getBackupTypeByTitle(title) {
        return `${this.baseUrl}/backupTypes?title=${title}`;
    }

    createBackupType() {
        return `${this.baseUrl}/backupTypes`;
    }

    removeBackupTypeById() {
        return `${this.baseUrl}/backupTypes/${id}`;
    }

    updateBackupTypeById() {
        return `${this.baseUrl}/backupTypes/${id}`;
    }
}

export const backupTypeUrls = new BackupTypeUrls();