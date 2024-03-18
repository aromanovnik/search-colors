const fs = require('fs');

const filePath = 'example.txt';
const searchString = 'Удалить меня';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const lines = data.split('\n');
    const filteredLines = lines.filter((line) => !line.includes(searchString));
    const result = filteredLines.join('\n');

    fs.writeFile(filePath, result, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Done.');
    });
});