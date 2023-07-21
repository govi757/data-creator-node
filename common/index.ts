import ProjectInfo from "../projectInfo";

export default class CommonFunctions {
    static capitalize(text:string) {
        return text.toUpperCase();
    }

    static getProjectLocation() {
        return `${process.cwd().split('/').slice(0, -1).join('/')}/${ProjectInfo.projectName}`
    }

    static functionName(text:string) {
        return text.charAt(0).toLowerCase() + text.slice(1);
    }
}