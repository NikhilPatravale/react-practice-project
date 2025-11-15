import { Box, IconButton, Typography } from "@mui/material";
import type { FolderStateType } from "../types";
import { AddCircleOutline, ArrowDropDown, ArrowDropUpTwoTone, FileCopy } from "@mui/icons-material";

export default function RenderEntity(props: {
  state: FolderStateType,
  id: number,
  openIds: number[],
  handleFolderSelect: (id: number) => void
  handleOpenForm: (props: { parent: number, isOpen: boolean }) => void,
}) {
  const { state, openIds, id, handleFolderSelect, handleOpenForm } = props;
  const { name, type, parent, children } = state.byIds[id];
  const isFolderOpen = type == 'folder' && openIds.includes(id);

  return (
    <div className="node">
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {type === 'folder' && <Box sx={{ display: 'flex' }}>
          <IconButton sx={{ display: 'flex', gap: '1rem' }} key={id} onClick={() => handleFolderSelect(id)}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {isFolderOpen ? <ArrowDropUpTwoTone /> : <ArrowDropDown />}
              <Typography variant="button">{name}</Typography>
            </Box>
          </IconButton>
          <IconButton onClick={() => handleOpenForm({ parent: id, isOpen: true })}>
            <AddCircleOutline fontSize="small" />
          </IconButton>
        </Box>}
        {type === 'file' && parent !== null && openIds.includes(parent) && (
          <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: '1rem' }}>
            <FileCopy fontSize="small" />
            <Typography sx={{ marginLeft: '20px' }} variant="body1" key={id}>{name}</Typography>
          </Box>
        )}
      </Box>
      <div className="children">
        {isFolderOpen && children.length > 0 && children.map((entry) => {
          return <RenderEntity state={state} id={entry} openIds={openIds} handleFolderSelect={handleFolderSelect} handleOpenForm={handleOpenForm} />
        })}
      </div>
    </div>
  )
}