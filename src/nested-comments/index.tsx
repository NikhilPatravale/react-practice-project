import { CommentsStateProvider } from "./context/CommentsState";
import CommentsRenderer from "./CommentList";


export default function NestedComments() {
  return <CommentsStateProvider>
    <CommentsRenderer />
  </CommentsStateProvider>
}