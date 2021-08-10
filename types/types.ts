/* eslint-disable no-use-before-define */
export interface User {
    id: string;
    email: string;
    name: string;
    password: string;
    adminWorkspaces: Workspace[];
    adminProjects: Project[];
    workspaces: Workspace[];
    projects: Project[];
}

export interface Workspace {
    id: string;
    projects: Project[];
    administrators: Workspace[];
    users: User[];
}


export interface Project {
    id: string;
    name: string;
    description: string;
    workspace: Workspace;
    users: User[];
    items: Item[];
    workspaceId: string;
    administrators: Project[];
}





export interface PropertyCollection {
    id: string;
    value?: object;
    Item: Item[];
}


export interface Item {
    id: string;
    title: string;
    description: string;
    project: Project[];
    properties: PropertyCollection;
    blocks: Block[];
    subItems: Item[];
    Item?: Item;
    itemId?: string;
    propertyCollectionId: string;
}


export interface Block {
    id: string;
    content?: object;
    Item: Item;
    itemId: string;
    type: string;
}
