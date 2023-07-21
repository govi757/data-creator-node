import CommonFunctions from "../common";
import { IApi, IApiSection } from "../interfaces/IApi";
import { FilesSystem } from "./FileSystem";

export default class ApiOperation {
    static get apiPath() {
        return `${CommonFunctions.getProjectLocation()}/src/services`;
    }

    static get interfacePath() {
        return `${CommonFunctions.getProjectLocation()}/src/data`;
    }


    static get dataPath() {
        return `${CommonFunctions.getProjectLocation()}/src/data`;
    }


    static get routesPath() {
        return `${CommonFunctions.getProjectLocation()}/src/routes`;
    }


    static writeApi(apiSection: IApiSection) {
        const apiCode = this.generateApiCode(apiSection);
        const modelPath = `${this.apiPath}/${apiSection.name}`;
        const fileName = `${apiSection.name}.service.ts`
        FilesSystem.createFile(modelPath, fileName, apiCode);
    }


    static writeInterfaceCode(apiSection: IApiSection) {
        const interfacePath = `${this.apiPath}/${apiSection.name}`;
        const code = this.generateApiInterfaceCode(apiSection);
        FilesSystem.writeFile(interfacePath, "api.interface.ts", code);
    }

    static writeApiDatacode(apiSection: IApiSection) {
        const interfacePath = `${this.apiPath}/${apiSection.name}`;
        const code = this.generateSampleApiDataCode(apiSection);
        FilesSystem.writeFile(interfacePath, "api.data.ts", code);
    }

    static writeRouteCode(apiSection: IApiSection) {
        const code = this.generateRoutesCode(apiSection);
        FilesSystem.writeFile(this.routesPath, `${apiSection.name}.routes.ts`, code);
    }



    static generateApiInterfaceCode(apiSection: IApiSection) {
        const interfaceName: string = `I${apiSection.name}Api`;
        const sectionName: string = `${apiSection.name}Service`;
        const code = `
import express from 'express';\n;
import {${apiSection.apiList.reduce((acc: string, currVal) => {
    const inputName: string = CommonFunctions.capitalize(`${apiSection.name}_${currVal.name}_Input`);
    acc = acc + inputName + ',';
    return acc
},'')}} from './api.data';
export interface ${interfaceName} {
    ${apiSection.apiList.reduce((acc: string, currVal) => {
            const inputName: string = CommonFunctions.capitalize(`${apiSection.name}_${currVal.name}_Input`);
            acc = acc + `${currVal.name}: (input: ${inputName}, res: express.Response)=>void\n\t`
            return acc;
        }, '')
            }
}
`;
        return code;
    }

    static generateSampleApiDataCode(apiSection: IApiSection) {
        const code = `
        ${apiSection.apiList.reduce((acc: string, api) => {
            const inputKeyList = Object.keys(api.input);
            const outputKeyList = api.output ? Object.keys(api.output) : [];
            const inputDataTypeName: string = CommonFunctions.capitalize(`${apiSection.name}_${api.name}_Input`);
            acc = acc + `
export class ${inputDataTypeName} {
    ${inputKeyList.reduce((acc, inputKey) => {
        acc = acc + `${inputKey}: ${api.input[inputKey]};`
        return acc
    }, "")}
    constructor(${inputKeyList.reduce((acc, inputKey) => {
                acc = acc + `${inputKey}: ${api.input[inputKey]},`
                return acc
            }, "")}) {
                ${inputKeyList.reduce((acc, inputKey) => {
                    acc = acc + `this.${inputKey}= ${inputKey};`
                    return acc
                }, "")}
    }

    static fromJSON(jsonObj: any) {
        return new ${inputDataTypeName}(
            ${inputKeyList.reduce((acc, inputKey) => {
                acc = acc + `jsonObj.${inputKey},`
                return acc
            }, "")}
        )    
    }
}
                `
            return acc;
        }, "")
            }
        `
        return code
    }
static generateApiCode(apiSection: IApiSection) {
    const serviceName = `${apiSection.name}Service`;
    const interfaceName  = `I${apiSection.name}Api`;
    const code = `
    import express from 'express';\n
    import { ${interfaceName} } from './api.interface';\n
${apiSection.apiList.length>0?`import {${apiSection.apiList.reduce((acc: string, currVal) => {
    const inputName: string = CommonFunctions.capitalize(`${apiSection.name}_${currVal.name}_Input`);
    acc = acc + inputName + ',';
    return acc
},'')}} from './api.data';`:''}

export default class ${serviceName} implements ${interfaceName} {
    ${
        apiSection.apiList.reduce((acc, api) => {
            const inputName: string = CommonFunctions.capitalize(`${apiSection.name}_${api.name}_Input`);
            acc = acc + `public async ${api.name}(input: ${inputName}, res: express.Response) {
                try {

                }catch (e) {
                    res.status(500).send("Error" + e);
                }
            }\n`;
            return acc;
        },"")
    }
}`

return code;
}

static generateRoutesCode(apiSection: IApiSection) {
    const className = `${apiSection.name}Routes`;
    const serviceName = `${apiSection.name}Service`;

    const code = `
    import { CommonRoutesConfig } from './common/common.routes.config';
    import ${serviceName} from '../services/${apiSection.name}/${apiSection.name}.service';
    import express from 'express';

    ${apiSection.apiList.length>0?`import {${apiSection.apiList.reduce((acc: string, currVal) => {
        const inputName: string = CommonFunctions.capitalize(`${apiSection.name}_${currVal.name}_Input`);
        acc = acc + inputName + ',';
        return acc
    },'')}} from '../services/${apiSection.name}/api.data';`:''}

    export default class ${className} extends CommonRoutesConfig {
        constructor(app: express.Application) {
            super(app, '${className}');
        }
        ${apiSection.name}Service = new ${apiSection.name}Service();

        configureRoutes(): express.Application {

            ${
                apiSection.apiList.reduce((acc, currVal) => {
                    const inputName: string = CommonFunctions.capitalize(`${apiSection.name}_${currVal.name}_Input`);
                    acc = acc + `
                    this.app.route('/${this.getApiName(currVal.name)}').${currVal.type}(async (req: express.Request, res: express.Response) => {
                        const input: ${inputName} = ${inputName}.fromJSON(req.params);
                        this.${serviceName}.${currVal.name}(input, res);
                    });`
                    return acc;
                },'')
            }

            return this.app;
        }
    }
    `

    return code;
}


static getApiName(apiName: string) {
    return apiName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();;
}



}