import { Box, Input, ListItem, Typography } from "@mui/material";
import { useState, type ChangeEvent } from "react";

function debounce<T extends (...args: any[]) => any>(fn: T, time = 300) {
  let id: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    if (id) {
      clearTimeout(id);
    }
    id = setTimeout(() => fn(...args), time);
  };
}

export default function SearchWithAutoComplete() {
  const [results, setResults] = useState<{ name: string, global_id: string }[]>([]);

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const resp = await fetch(`https://demo.dataverse.org/api/search?q=${e.target.value}`);
      if (resp.ok) {
        const results = await resp.json();
        setResults(results.data.items);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const debouncedSearch = debounce(handleSearch, 300);

  return <Box sx={{ display: 'flex', flexDirection: 'column', width: '25rem', margin: '0 auto' }}>
    <Input sx={{ border: '1px solid', marginTop: '1rem', padding: '0.5rem' }} onChange={debouncedSearch} aria-label="search-input" />
    {results.length > 0 && (
      <Box sx={{ backgroundColor: 'lightgrey' }}>
        {results.map((r, indx) => <ListItem key={r.global_id} sx={{ border: '1px solid', borderTop: indx === 0 ? 'none' : '1px solid', borderBottom: indx !== results.length - 1 ? 'none' : '1px solid' }}>
          <Typography variant="body1">{r.name}</Typography>
        </ListItem>)}
      </Box>
    )}
  </Box>
}