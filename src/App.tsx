import { useEffect, useState } from 'react';
import './App.scss';
import { ITree } from './types';
import { TreeNode } from './components/treeNode/treeNode';
import { Modal } from './components/UI/modal/modal';
import { CreateTreeNodeModal } from './components/createTreeNodeModal/createTreeNodeModal';
import { EditTreeNodeModal } from './components/editTreeNodeModal/editTreeNodeModal';
import { DeleteTreeNodeModal } from './components/deleteTreeNodeModal/deleteTreeNodeModal';

const GUID_TREE = 'GUID_TREE';

function App() {
 const [tree, setTree] = useState<ITree>(() => JSON.parse(localStorage.getItem(GUID_TREE) ?? JSON.stringify({id: 1, name: 'GUID', children: []})));
 const [currentTreeNode, setCurrentTreeNode] = useState<null | ITree>(null);
 const [showCreateNodeModal, setShowCreateNodeModal] = useState(false);
 const [showEditNodeModal, setShowEditNodeModal] = useState(false);
 const [showDeleteNodeModal, setShowDeleteNodeModal] = useState(false);

 useEffect(() => {
  localStorage.setItem(GUID_TREE, JSON.stringify(tree));
}, [tree]);

 const onCloseCreateNodeModal = () => {
  setShowCreateNodeModal(false);
 }

 const onCloseEditNodeModal = () => {
  setShowEditNodeModal(false);
 }

 const onCloseDeleteNodeModal = () => {
  setShowDeleteNodeModal(false);
 }

 const onClickTreeNode = (treeNode: ITree) => {
  setCurrentTreeNode(treeNode);
 }

 const createNode = (newNode: ITree, id: number = currentTreeNode?.id ?? 0, treeArr: ITree[] = [tree]): ITree[] => {
    return treeArr.reduce((arr: ITree[], item) => {
      if (item.id === id) {
          item.children.push(newNode);
          arr.push(item);
      } else {
          arr.push({...item, children: createNode(newNode, id, item.children,)});
      }

      return arr;
    }, []);
  };

  const setUpdatedTree = (tree: ITree) => {
    setTree(tree);
  }

  const findParentNode = (id: number = currentTreeNode?.id ?? 0, treeArr: ITree[] = [tree]): ITree[] => {
    return treeArr.reduce((parent: ITree[], node) => {
      if (node.children.find(item => item.id === id)) {
        parent.push(node);
      } else {
        parent.push(findParentNode(id, node.children)[0]);
      }

      return parent;
    }, [])
  }

  const editNode = (newNameNode: string, id: number = currentTreeNode?.id ?? 0, treeArr: ITree[] = [tree]): ITree[] => {
    return treeArr.reduce((arr: ITree[], item) => {
      if (item.id !== id) {
          arr.push({...item, children: editNode(newNameNode, id, item.children)});
      } else {
          arr.push({
            ...item, 
            name: newNameNode, 
          });
      }
  
      return arr;
    }, []);
  };

  const deleteNode = (id: number = currentTreeNode?.id ?? 0, treeArr: ITree[] = [tree]): ITree[] => {
    return treeArr.reduce((arr: ITree[], item) => {
      if (item.id !== id) {
        arr.push({...item, children: deleteNode(id, item.children)});
      } 
  
      return arr;
    }, []);
  };

  return (
    <div className="App" style={{display: 'flex', flexDirection: 'column'}}>
      <TreeNode 
        tree={tree} 
        currentTreeId={currentTreeNode?.id ?? null} 
        onClickTreeNode={onClickTreeNode} 
        openCreateNodeModal={() => setShowCreateNodeModal(true)}
        openEditNodeModal={() => setShowEditNodeModal(true)}
        openDeleteNodeModal={() => setShowDeleteNodeModal(true)}
      />
      <Modal show={showCreateNodeModal} onClose={onCloseCreateNodeModal} >
        <CreateTreeNodeModal
          onCancel={onCloseCreateNodeModal} 
          createNode={createNode} 
          setUpdatedTree={setUpdatedTree} 
          parentNode={currentTreeNode} 
          key={+showCreateNodeModal} 
        />
      </Modal>
      <Modal onClose={onCloseEditNodeModal} show={showEditNodeModal}>
        <EditTreeNodeModal
          onCancel={onCloseEditNodeModal} 
          editedTree={currentTreeNode} 
          key={currentTreeNode?.id}
          findParentNode={findParentNode}
          editNode={editNode}
          setUpdatedTree={setUpdatedTree}
          updateCurrentTreeNode={onClickTreeNode}
        />
      </Modal>
      <Modal show={showDeleteNodeModal} onClose={onCloseDeleteNodeModal}>
        <DeleteTreeNodeModal 
          deletedTree={currentTreeNode} 
          onCancel={onCloseDeleteNodeModal}
          clearCurrentTreeNode={() => setCurrentTreeNode(null)}
          deleteNode={deleteNode}
          setUpdatedTree={setUpdatedTree} 
        />
      </Modal>
    </div>
  );
}

export default App;
