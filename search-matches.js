const glob = require("glob")
const fs = require("fs");

// const SRC = '/Users/alekseyromanov/GIT/spelleronline/projects/ngx-lookup';
const SRC = '/';
const regex = /(\$colors|\$colors-new)/g;
const EXCLUDE_FILES = ['colors.scss', 'color-new.scss'];

console.log("Start!")
let count = 0;
let matchesString = '';

// options is optional
glob(`${SRC.trim()}/**/*.{html,scss}`, {}, async function (error, files) {
    if (error) {
        throw error;
    }

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
            const matches = data.match(regex);
            if (matches?.length) {
                const str = `File name: ${fileName}, Matches:  ${matches}`
                matchesString += str + '\n';
                count = count + matches.length;
            }

        } catch (error) {
            throw error;
        }
    }

    fs.writeFile('result-matches.txt', matchesString, function (err) {
        if (err) return console.log(err);
        console.log(`
        Done!  
        Count: ${count},  
        See: result-matches.txt
        `);
    });

})


