import { FieldType, ICollection } from "./interfaces/ICollection";

export const collectionList: ICollection[] = [
    {
        fields: [
            {name:"userName",type: FieldType.String},
            {name:"userEmail",type: FieldType.Object}
        ],
        name: "User"
    },
    {
        fields: [
            {name:"workTitle",type: FieldType.String},
            {name:"imgUrl",type: FieldType.Number}
        ],
        name: "Work"
    }
];