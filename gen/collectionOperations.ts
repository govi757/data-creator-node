import CommonFunctions from "../common";
import { FieldType, ICollection } from "../interfaces/ICollection";
import { FilesSystem } from "./FileSystem";
import GenerateCode from "./generateCode";

export default class CollectionOperation {


    static get collectionPath() {
        return `${CommonFunctions.getProjectLocation()}/src/models`;
    }

    static get interfacePath() {
        return `${CommonFunctions.getProjectLocation()}/src/data`;
    }

    static writeCollection(collection: ICollection) {
        const collectionCode = this.generateCollectionCode(collection);
        const modelPath = `${this.collectionPath}`;
        const fileName = `${collection.name}.model.ts`
        FilesSystem.writeFile(modelPath, fileName, collectionCode);
    }

    static writeInterfaceCode(code: string='') {
        const interfacePath = `${this.interfacePath}`;
        FilesSystem.writeFile(interfacePath, "interfaces.ts",code);
    }




    static generateCollectionCode(collection: ICollection) {
        const interfaceName: string = `I${collection.name}`;
        const code = `
import { Schema, model, connect, ObjectId } from 'mongoose';\n
import {${interfaceName}} from '../data/interfaces';
const ${collection.name}Schema = new Schema<${interfaceName}>({
    ${collection.fields.reduce((acc: any, currVal) => {
            acc = acc + `${currVal.name}: {type: ${currVal.type},},\n\t`;
            return acc;
        }, "")
            }
});

const ${collection.name} = model<${interfaceName}>('${collection.name}', ${collection.name}Schema);

export default ${collection.name};
`
        return code;
    }


    static generateCollectionInterfaceCode(collection: ICollection) {
        const code = `
        export interface I${collection.name} {
            ${collection.fields.reduce((acc: any, currVal) => {
            acc = acc + `${currVal.name}: ${currVal.type},\n\t\t\t`;
            return acc;
        }, "")
            }
        }
        `
        return code;
    }
}
