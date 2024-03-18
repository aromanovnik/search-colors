const glob = require("glob")
const fs = require("fs");
const colors = require("./color.js");

const SRC = './src/';
const EXCLUDE_FILES = ['colors.scss', 'color-new.scss'];

console.log("Start!")

const res = {
    "notUsed": [],
    "dark": [],
    "colors": {},
}
// options is optional
glob(`${SRC}/**/*.{html,scss}`, {}, async function (error, files) {
    if (error) {
        throw error;
    }

    res.notUsed = Object.keys(colors);
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file) {
            break;
        }

        const fileName = file.split('/').reverse()[0];
        if (EXCLUDE_FILES.includes(fileName)) {
            continue;
        }

        try {
            const data = await fs.promises.readFile(file, 'utf8');
            for (const key in colors) {
                if (!data.includes(key)) {
                    continue;
                }

                if (!res.colors[key]) {
                    res.colors[key] = [];
                }

                res.colors[key].push(file);

                // RM from notUsed
                const indexOfColor = res.notUsed.indexOf(key);
                if (indexOfColor > -1) {
                    res.notUsed.splice(indexOfColor, 1)
                }
            }
        } catch (error) {
            throw error;
        }
    }

    fs.writeFile('result.json', `${JSON.stringify(res)}`, function (err) {
        if (err) return console.log(err);
        console.log('Done! See: result.json');
    });
})


