/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useState, type Dispatch, type PropsWithChildren, type SetStateAction } from "react";

export type COMMENT = {
  id: number,
  text: string,
  likes: number,
  dislikes: number,
  parent: number | null,
  children: number[],
}

export type COMMENTS_STATE = {
  byId: Record<number, COMMENT>,
  allIds: number[],
}

export const CommentsContext = React.createContext<COMMENTS_STATE & {
  setCommentsState: Dispatch<SetStateAction<COMMENTS_STATE>>
}>({
  byId: {},
  allIds: [],
  setCommentsState: () => { },
});

export const useCommentsState = () => useContext(CommentsContext)

export const CommentsStateProvider = ({ children }: PropsWithChildren) => {
  const [commentsState, setCommentsState] = useState<COMMENTS_STATE>({
    byId: {},
    allIds: [],
  })
  return <CommentsContext.Provider value={{ ...commentsState, setCommentsState }}>
    {children}
  </CommentsContext.Provider>
}