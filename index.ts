import { apiSectionList } from "./gen-api";
import { collectionList } from "./gen-collection-data";
import { FilesSystem } from "./gen/FileSystem";
import ApiOperation from "./gen/apiOperations";
import CollectionOperation from "./gen/collectionOperations";
import GenerateCode from "./gen/generateCode";
import ProjectInfo from "./projectInfo";


export default class DataCreator {
    createCollections() {
        let interfaceCode = '';
        collectionList.forEach(collection => {
            interfaceCode = interfaceCode + CollectionOperation.generateCollectionInterfaceCode(collection);
            CollectionOperation.writeCollection(collection);

        });
        CollectionOperation.writeInterfaceCode(interfaceCode);
    }

    createApis() {
        let apiDataCode = "";
        apiSectionList.forEach(apiSection => {
            apiDataCode = apiDataCode + ApiOperation.generateSampleApiDataCode(apiSection);
            ApiOperation.writeInterfaceCode(apiSection);
            ApiOperation.writeApiDatacode(apiSection);
            ApiOperation.writeApi(apiSection);
            ApiOperation.writeRouteCode(apiSection);
        });
    }

    createFolderStructure() {
        console.log(process.cwd(),"process.cwd()")
        const templateFolderSrc = `${process.cwd()}/template`
        const destFolder = `${process.cwd().split('/').slice(0, -1).join('/')}/${ProjectInfo.projectName}`
        FilesSystem.copyFolder(templateFolderSrc, destFolder);
    }
}

new DataCreator().createFolderStructure();

new DataCreator().createCollections();
new DataCreator().createApis();

