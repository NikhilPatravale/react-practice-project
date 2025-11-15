import { Box, Button } from "@mui/material";
import { useCallback, useState } from "react";
import Modal from "../components/Modal";
import CreateForm from "./components/CreateForm";
import type { FolderStateType } from "./types";
import RenderEntity from "./components/RenderEntity";
import './styles.css';

export default function NestedFolders() {
  const [folderState, setFolderState] = useState<FolderStateType>({
    byIds: {},
    allIds: [],
  });
  const [openIds, setOpenIds] = useState<number[]>([]);
  const [openForm, setOpenForm] = useState<{ parent: number, isOpen: boolean }>({ parent: -1, isOpen: false });

  const addSrc = () => {
    const id = Date.now();
    const updatedState = { ...folderState };
    updatedState.byIds[id] = { name: 'src', type: 'folder', parent: null, children: [] };
    updatedState.allIds.push(id);
    setFolderState(updatedState);
  }

  const handleFolderSelect = useCallback((id: number) => {
    if (openIds.includes(id)) {
      const updatedOpenIds = openIds.filter(i => i !== id);
      setOpenIds(updatedOpenIds);
      return;
    }
    setOpenIds([...openIds, id]);
  }, [openIds])

  const handleCreate = useCallback((data: { name: string, type: 'file' | 'folder', parent: number }) => {
    const { name, type, parent } = data;

    if (name) {
      const id = Date.now();
      const updatedState = { ...folderState };
      updatedState.byIds[id] = {
        name,
        type,
        parent,
        children: [],
      }
      updatedState.byIds[parent].children.push(id);
      updatedState.allIds.push(id);
      setFolderState(updatedState);
      setOpenForm({ parent: -1, isOpen: false })
    }
  }, [folderState]);

  const { allIds } = folderState;

  return <Box sx={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    {allIds.length === 0
      ? <Button onClick={addSrc}>Create Source</Button>
      : <div className="tree">
        <RenderEntity
          state={folderState}
          id={allIds[0]}
          key={allIds[0]}
          openIds={openIds}
          handleOpenForm={(data) => setOpenForm(data)}
          handleFolderSelect={handleFolderSelect}
        />
      </div>}
    <Modal open={openForm.isOpen} onClose={() => setOpenForm(prev => ({ ...prev, isOpen: false }))} title="Create new file / folder">
      <CreateForm parent={openForm.parent} onCreate={handleCreate} />
    </Modal>
  </Box>;
}