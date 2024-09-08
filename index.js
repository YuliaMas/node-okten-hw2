const fsPromises = require('node:fs/promises');
const path = require("node:path");

const foo = async() => {
    const pathToFile = path.join(__dirname, 'test.txt');

    const pathToDir = path.join(__dirname, 'baseFolder');

    await fsPromises.writeFile(pathToFile, 'Hello World!\n');

    await fsPromises.mkdir(path.join(__dirname, 'baseFolder'), {recursive: true});
    for (let i= 1; i<=5; i++) {
        let pathInsideDir = path.join(pathToDir, 'folder' + i);
        await fsPromises.mkdir(path.join(pathToDir, 'folder' + i), {recursive: true});
        // await fsPromises.rm(path.join(pathToDir, 'folder' + i), {recursive: true}

        // const stat = await fsPromises.stat(pathInsideDir);
        // console.log(pathInsideDir);
        // console.log(stat.isDirectory()? 'folder' + i + ': IT IS A FOLDER' : 'folder' + i + ': IT IS A FILE');
        for (let j= 1; j<=5; j++) {
            const filePath = path.join(pathInsideDir, `file${j}.txt`);
            await fsPromises.writeFile(filePath, 'Hello World!' );

            // const stat = await fsPromises.stat(filePath);
            // console.log(filePath);
            // console.log(stat.isFile()? `file${j}.txt` + ':IT IS A FILE' : `file${j}.txt` + ':IT IS A FOLDER');
        }
    }

   const data = await fsPromises.readFile(pathToFile, 'utf-8');
   console.log(data);

    const dataRead = await fsPromises.readdir(pathToDir);
    for (const folder of dataRead) {
        const pathFolder = path.join(pathToDir, folder);
        const stat = await fsPromises.stat(pathFolder);
        console.log(pathFolder);
        console.log(stat.isDirectory()? `${folder}: IT IS A FOLDER` : `${folder}: IT IS A FILE`);

        const dataFolder = await fsPromises.readdir(pathFolder);
        for (const file of dataFolder) {
            const pathFile = path.join(pathFolder, file);
            const stat = await fsPromises.stat(pathFile);
            console.log(pathFile);
            console.log(stat.isFile()? `${file}` + ': IT IS A FILE' : `${file}` + ': IT IS A FOLDER');
        }
    }


};

void foo();
