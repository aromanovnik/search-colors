const fs = require('fs');


/** @type {{ [key: string]: string }} */
const COLOR = 'color.js';

const FILES = ['/colors.scss']


const extractColors = (input) => {
    const colors = {};
    const lines = input.split('\n');

    lines.forEach((line) => {
        const match = line.match(/(#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3}))|rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)|rgba\((\s*\d{1,3}\s*,){3}\s*(0(\.\d+)?|1(\.0+)?)\s*\)/g);
        if (match) {
            const [key] = line.split(':');
            colors[key.trim()] = match[0];
        }
    });

    return colors;
}

const extract = async () => {
    let result = {};
    for (let i = 0; i < FILES.length; i++) {
        const filePath = FILES[i];

        try {

            try {
                const data = await fs.promises.readFile(filePath, 'utf8');
                result = {
                    ...result,
                    ...extractColors(data),
                }
            } catch (error) {
                console.error(`Error, file: ${filePath}, error: `, error)
            }

        } catch (error) {
            throw error;
        }
    }

    return result;
}

extract().then((colors) => {
    fs.writeFile(COLOR, `
const colors = ${JSON.stringify(colors)}

module.exports = colors
    `, function (err) {
        if (err) return console.log(err);
        console.log('Done.');
    });
})


