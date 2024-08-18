export interface ITree {
    id: number;
    name: string;
    children: ITree[];
}

export type errorMessageType = 'Duplicate name' | 'Empty input' | null;
