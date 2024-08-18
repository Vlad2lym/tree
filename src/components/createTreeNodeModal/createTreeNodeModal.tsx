import { useState } from 'react'
import { InputText } from '../UI/inputText/inputText'
import styles from './createTreeNodeModal.module.scss'
import { CustomButton } from '../UI/customButton/customButton';
import { errorMessageType, ITree } from '../../types';
import { checkIsUniqName } from '../../helpers';

interface IProps {
    onCancel: () => void;
    createNode: (newNode: ITree, id?: number, treeArr?: ITree[]) => ITree[];
    setUpdatedTree: (tree: ITree) => void;
    parentNode: ITree | null;
}

export const CreateTreeNodeModal = ({onCancel, parentNode, createNode, setUpdatedTree}: IProps) => {
    const [nameNode, setNameNode] = useState('');
    const [errorMessage, setErrorMessage] = useState<errorMessageType>(null);

    const nameNodeChangeHahdler = (name: string) => {
        setNameNode(name);
        if (errorMessage) {
            setErrorMessage(null);
        }
    }

    const onCreateHandler = (name: string) => {
        if (!name.trim()) {
            setErrorMessage('Empty input');
            return;
        }
        if (!checkIsUniqName(parentNode?.children ?? [], name)) {
            setErrorMessage('Duplicate name');
            return;
        }
        const newNode: ITree = {
            name,
            id: Date.now(),
            children: [],
        }
        const newTree: ITree = createNode(newNode)[0];
        setUpdatedTree(newTree);
        setNameNode('');
        onCancel();
    }

    return (
        <div className={styles['create-modal']}>
            <h1 className={styles['create-modal__title']}>Add</h1>
            <hr/>
            <h2 className={styles['create-modal__error-message']}>{errorMessage}</h2>
            <InputText onChange={nameNodeChangeHahdler} value={nameNode} placeholder='Node Name' className={styles['create-modal__input']} />
            <hr/>
            <div className={styles['create-modal__btns']}>
                <CustomButton onClick={onCancel} >Cancel</CustomButton>
                <CustomButton onClick={() => onCreateHandler(nameNode)} primary>Add</CustomButton>
            </div>
        </div>
    )
}