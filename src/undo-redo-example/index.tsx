import { Box, Button, Typography } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { CIRCLE_SIZE } from "./constants";
import Circle from "./Circle";

export default function UndoRedoExample() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [circles, setCircles] = useState<{ id: string, left: number, top: number, right: number, bottom: number }[]>([]);
  const [undoList, setUndoList] = useState<{ id: string, left: number, top: number, right: number, bottom: number }[]>([]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current?.getBoundingClientRect();
      const left = e.pageX - rect.left - CIRCLE_SIZE / 2;
      const top = e.pageY - rect.top - CIRCLE_SIZE / 2;
      const right = left + CIRCLE_SIZE / 2;
      const bottom = top + CIRCLE_SIZE / 2;
      const id = Date.now() + '';
      setCircles([...circles, { id, left, top, right, bottom }]);
    }
  }, [containerRef, circles]);

  const handleUndo = useCallback(() => {
    const updatedCircles = [...circles];
    const lastCircle = updatedCircles.pop();
    if (lastCircle) {
      setCircles(updatedCircles)
      setUndoList(prev => [...prev, lastCircle]);
    }
  }, [circles])

  const handleRedo = useCallback(() => {
    const updatedUndoList = [...undoList];
    const lastUndone = updatedUndoList.pop();
    if (lastUndone) {
      setUndoList(updatedUndoList);
      setCircles(prev => [...prev, lastUndone]);
    }
  }, [undoList])

  const handleReset = () => {
    setCircles([]);
    setUndoList([]);
  }

  return <Box sx={{ padding: '2rem' }}>
    <Typography variant="h5">Undo Redo Example</Typography>

    <Box sx={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Button variant="contained" sx={{ marginRight: '1rem' }} onClick={handleUndo} disabled={!(circles.length > 0)}>Undo</Button>
      <Button variant="outlined" sx={{ marginRight: '1rem' }} disabled={!(undoList.length > 0 || circles.length > 0)} onClick={handleReset}>Reset</Button>
      <Button variant="contained" disabled={!(undoList.length > 0)} onClick={handleRedo}>Redo</Button>
    </Box>

    <div id="container" ref={containerRef} onClick={handleClick} style={{ border: '1px solid', height: '500px', marginTop: '1rem', position: 'relative' }}>
      {circles.map((c) => <Circle key={c.id} left={c.left} top={c.top} />)}
    </div>
  </Box>
}