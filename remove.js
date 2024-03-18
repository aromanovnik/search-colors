const fs = require('fs');

const RESULT = './result.json';
const FILES = [
    './colors.scss',
]


/**
 * @param {string} path
 * @returns {Promise<{ notUsed: string[], colors: {[key: string]: string[]} }>}
 */
const getResult = async (path) => {
    try {
        const data = await fs.promises.readFile(path, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw error;
    }
}

const remove = async () => {
    const {notUsed} = await getResult(RESULT)
    if (!notUsed) {
        return;
    }

    for (let i = 0; i < FILES.length; i++) {
        const filePath = FILES[i];

        try {
            const data = await fs.promises.readFile(filePath, 'utf8');
            const lines = data.split('\n');
            const filteredLines = lines.filter((line) => !notUsed.some(color => line.includes(color)));
            const result = filteredLines.join('\n');

            await fs.promises.writeFile(filePath, result, 'utf8');

        } catch (error) {
            throw error;
        }
    }

}

remove().then(() => {
    console.log('Done.');
});
