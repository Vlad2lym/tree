import { useState } from 'react'
import { InputText } from '../UI/inputText/inputText'
import styles from './editTreeNodeModal.module.scss'
import { CustomButton } from '../UI/customButton/customButton';
import { errorMessageType, ITree } from '../../types';
import { checkIsUniqName } from '../../helpers';

interface IProps {
    onCancel: () => void;
    editedTree: ITree | null;
    findParentNode: (id?: number, treeArr?: ITree[]) => ITree[];
    editNode: (newNameNode: string, id?: number, treeArr?: ITree[]) => ITree[];
    setUpdatedTree: (tree: ITree) => void;
    updateCurrentTreeNode: (tree: ITree) => void;
}

export const EditTreeNodeModal = ({onCancel, editedTree, findParentNode, editNode, setUpdatedTree, updateCurrentTreeNode}: IProps) => {
    const [nameNode, setNameNode] = useState(editedTree?.name ?? '');
    const [errorMessage, setErrorMessage] = useState<errorMessageType>(null);

    const nameNodeChangeHahdler = (name: string) => {
        setNameNode(name);
        if (errorMessage) {
            setErrorMessage(null);
        }
    }

    const onEditHandler = (name: string) => {
        if (!name.trim()) {
            setErrorMessage('Empty input');
            return;
        }
        const parentNode = findParentNode()[0];
        if (!checkIsUniqName(parentNode?.children ?? [], name)) {
            setErrorMessage('Duplicate name');
            return;
        }
        const newTree: ITree = editNode(name)[0];
        setUpdatedTree(newTree);
        editedTree && updateCurrentTreeNode({...editedTree, name})
        onCancel();
    }

    return (
        <div className={styles['edit-modal']}>
            <h1 className={styles['edit-modal__title']}>Rename</h1>
            <hr/>
            <h2 className={styles['edit-modal__error-message']}>{errorMessage}</h2>
            <InputText onChange={nameNodeChangeHahdler} value={nameNode} placeholder='New Node Name' className={styles['edit-modal__input']} />
            <hr/>
            <div className={styles['edit-modal__btns']}>
                <CustomButton onClick={onCancel} >Cancel</CustomButton>
                <CustomButton onClick={() => onEditHandler(nameNode)}  primary>Rename</CustomButton>
            </div>
        </div>
    )
}