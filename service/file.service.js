const fs = require('fs-extra');
const path = require('path');

module.exports = {
    deleteFile: (subFolderName, userId) => {
        const attachmentDir = path.join(process.cwd(), 'static', subFolderName, `${userId}`);

        fs.remove(attachmentDir);
    }
};
