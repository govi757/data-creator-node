import { ApiType, DataTypes, IApi, IApiSection } from "./interfaces/IApi";

export const apiSectionList: IApiSection[] = [
    {
        name: "User",
        apiList: [
            {
                name: "GetUserList",
                input: { userName: DataTypes.String },
                type: ApiType.Get
            },
            {
                name: "AddWork",
                input: { title: DataTypes.String, writterId: DataTypes.String },
                type: ApiType.Get
            },

            {
                name: "DeleteWork",
                input: { title: DataTypes.String},
                type: ApiType.Get
            },
        ]
    },
    {
        name: "Work",
        apiList: [
            {
                name: "Work",
                input: { userName: DataTypes.String },
                type: ApiType.Get
            },
            {
                name: "AddWork",
                input: { title: DataTypes.String, writterId: DataTypes.String },
                type: ApiType.Get
            },

            {
                name: "DeleteWork",
                input: { title: DataTypes.String},
                type: ApiType.Get
            },
        ]
    }
]