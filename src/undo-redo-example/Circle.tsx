import { CIRCLE_SIZE } from "./constants";

export default function Circle(props: { left: number, top: number }) {
  const { left, top } = props;
  return <div style={{ height: CIRCLE_SIZE, width: CIRCLE_SIZE, border: '1px solid', borderRadius: '50%', position: 'absolute', left, top }} />
}