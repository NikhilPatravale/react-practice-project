import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export default function AppBarComponent() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link to="/undo-redo" style={{ color: 'white', textDecoration: 'none' }}>
              <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                Undo Redo
              </Typography>
            </Link>
            |
            <Link to="/search-autocomplete" style={{ color: 'white', textDecoration: 'none' }}>
              <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                Search with Autocomplete
              </Typography>
            </Link>
            |
            <Link to="/pagination" style={{ color: 'white', textDecoration: 'none' }}>
              <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                Pagination
              </Typography>
            </Link>
            |
            <Link to="/nested-folders" style={{ color: 'white', textDecoration: 'none' }}>
              <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                Nested Folders
              </Typography>
            </Link>
            |
            <Link to="/infinite-scroll" style={{ color: 'white', textDecoration: 'none' }}>
              <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                Infinite Scroll
              </Typography>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}