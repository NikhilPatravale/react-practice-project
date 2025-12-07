import { useCallback, useEffect, useState } from "react";
import ToastManager, { type Toast } from "./ToastManager";

function Toast(props: Toast) {
  const { id: toastId, content, timer } = props;

  useEffect(() => {
    const id = setTimeout(() => {
      const toastManager = ToastManager.getInstance();
      toastManager.remove(toastId)
    }, timer);

    return () => clearTimeout(id);
  }, [toastId, timer]);

  return <div>
    <span>{content}</span>
  </div>
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

  return <div>
    {toasts.map((t) => {
      return <Toast key={t.id} {...t} />
    })}
  </div>
}

export default function ToastExample() {
  const handleTest = () => {
    const toastManager = ToastManager.getInstance();
    toastManager.show({
      content: 'This is a test toast',
      timer: 3000,
      type: 'SUCCESS'
    })
  }

  return <div>
    <button onClick={handleTest}>Test toast</button>
    <ToastContainer />
  </div>
}