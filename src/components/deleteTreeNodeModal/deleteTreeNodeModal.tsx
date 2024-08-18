import styles from './deleteTreeNodeModal.module.scss'
import { CustomButton } from '../UI/customButton/customButton';
import { ITree } from '../../types';

interface IProps {
    onCancel: () => void;
    deletedTree: ITree | null;
    clearCurrentTreeNode: () => void;
    deleteNode: (id?: number, treeArr?: ITree[]) => ITree[];
    setUpdatedTree: (tree: ITree) => void;
}

export const DeleteTreeNodeModal = ({onCancel, deletedTree, clearCurrentTreeNode, deleteNode, setUpdatedTree}: IProps) => {

    const onDeleteHandler = () => {
        const newTree: ITree = deleteNode()[0];
        setUpdatedTree(newTree);
        clearCurrentTreeNode();
        onCancel();
    }

    return (
        <div className={styles['delete-modal']}>
            <h1 className={styles['delete-modal__title']}>Delete</h1>
            <hr/>
            <h2 className={styles['delete-modal__text']}>{`Do you want to delete ${deletedTree?.name ?? ''} ?`}</h2>
            <hr/>
            <div className={styles['delete-modal__btns']}>
                <CustomButton onClick={onCancel} >Cancel</CustomButton>
                <CustomButton onClick={onDeleteHandler}  danger>Delete</CustomButton>
            </div>
        </div>
    )
}