import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";

const ProgressBar = (props: { progress: number }) => {
  const { progress } = props;

  return <Box sx={{
    height: '10px',
    width: '100%',
    border: '1px solid'
  }}>
    <Box sx={{
      height: '100%',
      width: `${progress}%`,
      backgroundColor: 'green',
      transition: 'width 1s ease-in'
    }}></Box>
  </Box>
}

export default function AnimateInSequence() {
  const [progressBars, setProgressBars] = useState<{ id: number, width: number }[]>([{
    id: Date.now(),
    width: 0,
  }]);
  const [isStarted, setIsStarted] = useState(false);
  const [current, setCurrent] = useState(0);

  const handleStartClick = () => {
    setIsStarted(prev => !prev)
  }

  const handleAddBar = () => {
    setProgressBars(prev => [...prev, { id: Date.now(), width: 0 }]);
  }

  const handleReset = () => {
    setIsStarted(false);
    setProgressBars([{ id: Date.now(), width: 0 }]);
    setCurrent(0);
  }

  useEffect(() => {
    let id = null;
    if (isStarted) {
      const currentProgressBar = progressBars[current];
      if (currentProgressBar && currentProgressBar.width < 91) {
        id = setInterval(() => {
          setProgressBars(prev => {
            prev[current] = { ...prev[current], width: currentProgressBar.width + 10 }
            return [...prev];
          })
        }, 300);
      } else if (currentProgressBar && currentProgressBar.width >= 100) {
        setCurrent(current + 1);
      }
    }

    return () => {
      if (id) {
        clearInterval(id);
      };
    }
  }, [isStarted, current, progressBars]);

  return <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    gap: '2rem'
  }}>
    {progressBars.map((p) => <ProgressBar key={p.id} progress={p.width} />)}
    <Box
      sx={{
        display: 'flex',
        gap: '1rem'
      }}>
      <Button variant="contained" sx={{ backgroundColor: `${isStarted ? 'red' : 'green'}` }} onClick={handleStartClick}>{isStarted ? "Stop" : "Start"}</Button>
      <Button variant="contained" onClick={handleAddBar}>Add Bar</Button>
      <Button variant="contained" sx={{ backgroundColor: 'red' }} onClick={handleReset}>Reset</Button>
    </Box>
  </Box>
}