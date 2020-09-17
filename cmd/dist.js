const ncp = require('ncp').ncp;
const fs = require('fs');
const path = require('path')
const glob = require("glob");

if (!fs.existsSync(process.cwd() + '\\dist')) {
    fs.mkdirSync(process.cwd() + '\\dist');
}
if (!fs.existsSync(process.cwd() + '\\dist\\Libs')) {
    fs.mkdirSync(process.cwd() + '\\dist\\Libs');
}

// # libs
const libs = [
    'es6-promise\\dist\\es6-promise.auto.min.js'
];
for (let iL = 0; iL < libs.length; iL++) {
    const lib = libs[iL];
    console.log('\n %%% update [' + lib + ']!');
    const root = process.cwd() + '\\';
    const srcRoot = 'node_modules\\';
    const tarRoot = 'dist\\Libs\\';
    glob(srcRoot + lib, (err, matches) => {
        for (let iM = 0; iM < matches.length; iM++) {
            const match = matches[iM];
            const matchSub = match.substring(srcRoot.length);
            const src = (root + match).replace(new RegExp('/', 'g'), '\\');
            const tar = (root + tarRoot + matchSub).replace(new RegExp('/', 'g'), '\\');
            const paths = tar.split('\\');
            const folder = (tar.substr(0, tar.length - paths[paths.length - 1].length - 1)).replace(new RegExp('/', 'g'), '\\');
            fs.mkdirSync(folder, { recursive: true });
            fs.copyFileSync(src, tar);
        }
    });
}


const dirTree =(dir) => {
    var stats = fs.lstatSync(dir);

    if (stats.isDirectory()) {
        const items = fs.readdirSync(dir).filter(t=>!(t === '__fs.json')).map((child) => {
            const subfolder = path.join(dir, child);
            const itemstats = fs.lstatSync(subfolder);
            if (itemstats.isDirectory()) {
                dirTree(subfolder);
                return {
                    "name": child,
                    "isDir": true
                };
            } else {
                return {
                    "name": child,
                    "isDir": false
                };
            }
        });
        fs.writeFileSync(path.join(dir, '__fs.json'), JSON.stringify(items, null, 4));

    } else {
    }
}

// # root
console.log('\n %%% update root!');
ncp(
    process.cwd() + '\\root',
    process.cwd() + '\\dist',
    (err) => {
        if (err) {
            return console.error(err)
        }



        // # __fs.json
        console.log('\n %%% write __fs.json!');
        const dir = process.cwd() + '\\dist';
        dirTree(dir);



    }
);


