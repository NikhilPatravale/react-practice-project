import { Box, Button, CircularProgress } from "@mui/material";
import useInfiniteScroll from "./useInfiniteScroll";

export default function InfiniteScroll() {
  const { isLoading, results, triggerNextFetch } = useInfiniteScroll();

  return (
    <Box>
      <Box sx={{ margin: '0 auto', maxWidth: '50rem', padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {results?.results.map((entry, indx) => <Box key={`${entry.id}-${indx}`}>
          <img src={entry.image} alt={entry.name} style={{ width: '100%' }} />
        </Box>)}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {isLoading && <CircularProgress />}
        {!isLoading && <Button onClick={triggerNextFetch}>Load More</Button>}
      </Box>
    </Box>
  )
}