import { useState } from "react";
import { useCommentsState } from "./context/CommentsState";
import { Box, Button, Typography } from "@mui/material";
import CommentBox from "./CommentBox";

export default function Comment(props: { id: number, level?: number }) {
  const { id: commentId, level = 0 } = props;
  const comments = useCommentsState();
  const { byId, allIds, setCommentsState } = comments;
  const { text, likes, dislikes, children } = byId[commentId];
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false)

  const handleDelete = (id: number) => {
    if (id) {
      const updatedById = byId;
      const childrenIds = updatedById[id].children;
      const parent = updatedById[id].parent;
      const updatedAllIds = allIds.filter(i => i !== id && !childrenIds.includes(id))
      if (parent) {
        updatedById[parent].children = updatedById[parent].children.filter(i => i !== id);
      }
      delete updatedById[id];
      setCommentsState({
        byId: updatedById,
        allIds: updatedAllIds,
      })
    }
  }

  return <Box sx={{ marginLeft: `${level * 20}px` }}>
    <Box>
      <Typography variant="body1">{text}</Typography>
      <Button>{likes}</Button>
      <Button>{dislikes}</Button>
      <Button onClick={() => setIsCommentOpen(prev => !prev)}>Comment</Button>
      <Button onClick={() => handleDelete(commentId)}>Delete</Button>
    </Box>
    {isCommentOpen && <CommentBox parentId={commentId} onSubmit={() => setIsCommentOpen(false)} />}
    {children.length > 0 && <Box>{
      children.map((id) => <Comment id={id} level={level + 1} />)}</Box>}
  </Box>
}