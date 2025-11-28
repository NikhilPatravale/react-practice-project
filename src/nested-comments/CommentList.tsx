import { Box, Typography } from "@mui/material";
import { useCommentsState, type COMMENTS_STATE } from "./context/CommentsState";
import CommentBox from "./CommentBox";
import Comment from "./Comment";

const getParentComments = ({ byId, allIds }: COMMENTS_STATE) => {
  return allIds.filter((id) => byId[id].parent === null);
}

export default function CommentsRenderer() {
  const { byId, allIds } = useCommentsState();
  return <Box>
    <Typography variant="h4">Nested Comments</Typography>
    <Box>
      <CommentBox parentId={null} />
    </Box>
    {getParentComments({ byId, allIds }).map((id) => {
      return <Comment id={id} />
    })}
  </Box>
};