import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppBarComponent from './components/AppBar';
import UndoRedoExample from './undo-redo-example';
import SearchWithAutoComplete from './search-with-autocomplete';
import Pagination from './pagination';
import NestedFolders from './nested-folders';

export default function App() {

  return (
    <Router>
      <AppBarComponent />

      <Routes>
        <Route path='/undo-redo' element={<UndoRedoExample />} />
        <Route path='/search-autocomplete' element={<SearchWithAutoComplete />} />
        <Route path='/pagination' element={<Pagination />} />
        <Route path='/nested-folders' element={<NestedFolders />} />
      </Routes>
    </Router>
  )
}


