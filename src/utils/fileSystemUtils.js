const fs = require('fs');
const path = require('path');

function generateUUID () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function getLatestFolderName(directoryPath) {
    const directories = fs.readdirSync(directoryPath);
    if (directories.length === 0) {
        return null;
    }

    const folderNames = directories.filter(itemName => {
        const itemPath = path.join(directoryPath, itemName);
        return fs.statSync(itemPath).isDirectory();
    });

    folderNames.sort((a, b) => {
        const aPath = path.join(directoryPath, a);
        const bPath = path.join(directoryPath, b);
        return fs.statSync(bPath).mtime.getTime() - fs.statSync(aPath).mtime.getTime();
    });

    const latestFolderName = folderNames[0];
    return latestFolderName;
}

function moveAndDeleteSubfolder(mainDir) {
    if (fs.existsSync(mainDir)) {
        const subfolders = fs.readdirSync(mainDir);

        if (subfolders.length === 1) {
            const subfolderName = subfolders[0];
            const subfolderPath = path.join(mainDir, subfolderName);

            const files = fs.readdirSync(subfolderPath);
            files.forEach(file => {
                const sourceFile = path.join(subfolderPath, file);
                const targetFile = path.join(mainDir, file);
                fs.renameSync(sourceFile, targetFile);
            });
            fs.rmdirSync(subfolderPath);
        }
    }
}

module.exports = {getLatestFolderName, moveAndDeleteSubfolder, generateUUID};
