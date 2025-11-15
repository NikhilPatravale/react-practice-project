import { Box, Button, Input, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export default function CreateForm(props: { parent: number, onCreate: (data: { name: string, type: 'file' | 'folder', parent: number }) => void }) {
  const { parent, onCreate } = props;
  const [type, setType] = useState<'file' | 'folder'>('file');
  const [name, setName] = useState('')

  const handleTypeSelection = (type: 'file' | 'folder') => {
    setType(type);
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Input
          value={name}
          size="small"
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="File / Folder Name"
          sx={{ bolderBottom: 'none' }}
        />
        <Select size="small" sx={{}} value={type}>
          <MenuItem value="file" onClick={() => handleTypeSelection("file")}>File</MenuItem>
          <MenuItem value="folder" onClick={() => handleTypeSelection("folder")}>Folder</MenuItem>
        </Select>
      </Box>
      <Button sx={{ border: '1px solid' }} onClick={() =>
        onCreate({
          name,
          type,
          parent
        })
      }>Create</Button>
    </Box>
  )
}