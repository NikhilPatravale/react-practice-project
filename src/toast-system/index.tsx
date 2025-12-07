import { useCallback, useEffect, useState } from "react";
import ToastManager, { type Toast } from "./ToastManager";
import { Box, Button, Typography } from "@mui/material";

function Toast(props: Toast) {
  const { id: toastId, content, timer, type } = props;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let id = null;
    if (progress < 96) {
      id = setInterval(() => {
        setProgress(progress + 5)
      }, timer / 30)
    }

    return () => {
      if (id) clearInterval(id);
    }
  }, [progress, timer]);

  useEffect(() => {
    const id = setTimeout(() => {
      const toastManager = ToastManager.getInstance();
      toastManager.remove(toastId)
    }, timer);

    return () => clearTimeout(id);
  }, [toastId, timer]);

  return <Box sx={{
    border: '1px solid',
    minWidth: '150px'
  }}>
    <Box sx={{
      height: '5px',
      borderBottom: '1px solid',
    }}>
      <Box sx={{
        height: '100%',
        backgroundColor: `${type === 'SUCCESS' ? 'green' : 'red'}`,
        width: `${progress}%`,
        transition: 'width 1s ease-out'
      }}></Box>
    </Box>
    <Box sx={{
      padding: '0.5rem'
    }}>
      <Typography variant="body1">{content}</Typography>
    </Box>
  </Box >
}

const useCustomSyncStore = <T,>(subscribe: (fn: () => void) => () => void, getData: () => T[]) => {
  const [data, setData] = useState(getData());

  const handleChange = useCallback(() => {
    setData(getData());
  }, [getData]);

  useEffect(() => {
    const unsubscribe = subscribe(handleChange);

    return () => unsubscribe();
  }, [subscribe, handleChange])

  return data;
}

function ToastContainer() {
  const toastManager = ToastManager.getInstance();

  const toasts = useCustomSyncStore<Toast>(
    toastManager.subscribe.bind(toastManager),
    toastManager.getToasts.bind(toastManager)
  )

  return <Box sx={{
    position: 'fixed',
    bottom: 0,
    right: 0,
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem'
  }}>
    {toasts.map((t) => {
      return <Toast key={t.id} {...t} />
    })}
  </Box>
}

export default function ToastExample() {
  const toastManager = ToastManager.getInstance();

  const handleTest = () => {
    toastManager.show({
      content: 'This is a test message...',
      timer: 3000,
      type: 'SUCCESS'
    });
  }

  return <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    gap: '1rem',
    margin: '0 auto'
  }}>
    <Button variant="contained" onClick={handleTest}>Publish</Button>
    <ToastContainer />
  </Box>
}