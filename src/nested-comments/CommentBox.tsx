import { useState, type ChangeEventHandler } from "react";
import { useCommentsState } from "./context/CommentsState";
import { Box, Button, TextareaAutosize } from "@mui/material";

export default function CommentBox(props: { parentId: number | null, onSubmit?: () => void }) {
  const { parentId, onSubmit } = props;
  const { byId, allIds, setCommentsState } = useCommentsState();
  const [commentText, setCommentText] = useState<string>('');

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setCommentText(e.target.value)
  }

  const handleSubmit = () => {
    if (commentText) {
      const id = Date.now();
      setCommentsState({
        byId: {
          ...byId,
          [id]: {
            id,
            text: commentText,
            likes: 0,
            dislikes: 0,
            parent: parentId,
            children: [],
          },
          ...(parentId ? {
            [parentId]: {
              ...byId[parentId],
              children: [...byId[parentId].children, id]
            }
          } : {}),
        },
        allIds: [...allIds, id],
      })
      if (onSubmit) {
        onSubmit();
      }
      setCommentText('');
    }
  }

  return <Box>
    <TextareaAutosize value={commentText} minRows={5} onChange={handleChange}></TextareaAutosize>
    <Button onClick={handleSubmit}>Add</Button>
  </Box>
}