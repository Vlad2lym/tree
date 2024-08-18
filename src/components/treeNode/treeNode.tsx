import { useState } from "react";
import { ITree } from "../../types";
import arrowRight from '../../img/arrow-right.png';
import arrowDown from '../../img/arrow-down.png';
import styles from './treeNode.module.scss';

interface IProps {
    tree: ITree;
    currentTreeId: null | number;
    onClickTreeNode: (treeNode: ITree) => void;
    openCreateNodeModal: () => void;
    openEditNodeModal: () => void;
    openDeleteNodeModal: () => void;
}

export const TreeNode = ({tree, onClickTreeNode, currentTreeId, openCreateNodeModal, openEditNodeModal, openDeleteNodeModal}: IProps) => {
    const [showSubNodes, setShowSubNodes] = useState(false);

    const clickTreeHandler = (treeNode: ITree) => {
        setShowSubNodes(prev => !prev);
        onClickTreeNode(treeNode);
    }

    return (
        <div onClick={() => clickTreeHandler(tree)} className={styles['tree-node']}>
            <div className={currentTreeId === tree.id ? `${styles['tree-node__body']} ${styles['tree-node__body--clicked']}` : styles['tree-node__body']}>
                {tree.children.length > 0 && 
                    <img src={showSubNodes ?arrowDown : arrowRight} alt={tree.name} className={styles['tree-node__arrow']} />
                }
                <h2 style={{paddingLeft: tree.children.length > 0 ? '0' : '20px' }} className={styles['tree-node__name']}>{tree.name}</h2>
                {currentTreeId === tree.id && (
                    <div className={styles['tree-node__manage-btns']} onClick={(e) => e.stopPropagation()}>
                        <button className={styles['tree-node__create-btn']} onClick={openCreateNodeModal} />
                        {tree.id !== 1 && <>
                            <button className={styles['tree-node__edit-btn']} onClick={openEditNodeModal} />
                            <button className={styles['tree-node__delete-btn']} onClick={openDeleteNodeModal} />
                        </>
                        }
                    </div>
                )}
            </div>
            <div className={styles['tree-node__children']}>
                {showSubNodes &&
                    <div onClick={(e) => e.stopPropagation()} >{tree.children?.map(node => {
                        return <TreeNode 
                                    tree={node} 
                                    key={node.id} 
                                    onClickTreeNode={onClickTreeNode} 
                                    currentTreeId={currentTreeId} 
                                    openCreateNodeModal={openCreateNodeModal} 
                                    openEditNodeModal={openEditNodeModal}
                                    openDeleteNodeModal={openDeleteNodeModal}
                                />
                    })}</div>
                }
            </div>
        </div>
    )
}
