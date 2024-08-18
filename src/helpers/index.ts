import { ITree } from "../types";

export const checkIsUniqName = (children: ITree[], name: string): boolean => {
    return !children.find(tree => tree.name === name);
}