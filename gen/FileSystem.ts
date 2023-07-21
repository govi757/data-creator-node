import * as fs from 'fs';
import * as path from 'path';
export class FilesSystem {


    static rootFolderPath() {
        return process.cwd().split('/').slice(0, -1).join('/');
    }



    static writeFile(path: string, fileName: string, content: string = "Test") {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }

        const filePath = path + '/' + fileName;
        fs.writeFileSync(filePath, content);
    }


    static createFile(path: string, fileName: string, content: string = "Test") {
        // Check if the file exists
        const filePath = path + '/' + fileName;
        if (!fs.existsSync(filePath)) {
            // File doesn't exist, create it and write the content
            fs.writeFileSync(filePath, content);
            console.log('File created successfully.');
        } else {
            console.log('File already exists.');
        }
    }


    static copyFolder(src: string, dest: string) {
        if(!fs.existsSync(src)) {
        fs.cpSync(src, dest, {recursive: true});
        }

    }

    static appendFile(path: string, fileName: string, content: string = "Test") {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }

        const filePath = path + '/' + fileName;
        fs.appendFileSync(filePath, content);
    }


}