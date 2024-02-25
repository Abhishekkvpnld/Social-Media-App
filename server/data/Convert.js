/***convert file to base64 format */
import fs from 'fs';

export default function convertToBase64(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                const base64String = data.toString('base64');
                resolve(base64String);
            }
        });
    });
}
