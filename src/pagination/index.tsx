import { Box, Button } from "@mui/material";
import { useState } from "react";

type PaginationProps = {
  current: number,
  total: number,
  onChange: (pageNumber: number) => void
}

function Ellipsis(props: PaginationProps) {
  const { current, total, onChange } = props;
  const prev = current > 2 ? current - 1 : null;
  const next = current < total - 1 ? current + 1 : null;

  return <Box sx={{ padding: '2rem' }}>
    <Box sx={{ margin: '0 auto', width: '200px', height: '50px', display: 'flex', justifyContent: 'center', gap: '0.2rem' }}>
      <Button sx={{ border: '1px solid' }} onClick={() => {
        if (current > 1) {
          onChange(current - 1);
        }
      }} disabled={current === 1}>Prev</Button>
      <Button sx={{ color: 'black', border: `1px solid ${current === 1 ? 'green' : ''}`, backgroundColor: `${current === 1 ? 'green' : ''}` }} onClick={() => onChange(1)}>1</Button>
      {prev && ((prev - 1) > 1) && <Button sx={{ border: '1px solid' }}>...</Button>}
      {prev && <Button sx={{ border: '1px solid' }} onClick={() => onChange(prev)}>{prev}</Button>}
      {current > 1 && current < total && <Button sx={{ border: '1px solid green', backgroundColor: 'green', color: 'black' }} onClick={() => onChange(current)}>{current}</Button>}
      {next && <Button sx={{ border: '1px solid' }} onClick={() => onChange(next)}>{next}</Button>}
      {next && ((next + 1) < total) && <Button sx={{ border: '1px solid' }}>...</Button>}
      <Button sx={{ border: `1px solid ${current === total ? 'green' : ''}`, backgroundColor: `${current === total ? 'green' : ''}`, color: 'black' }} onClick={() => onChange(total)}>{total}</Button>
      <Button sx={{ border: '1px solid' }} disabled={current === total} onClick={() => {
        if (current < total) {
          onChange(current + 1);
        }
      }}>Next</Button>
    </Box>
  </Box>
}

export default function Pagination() {
  const [curr, setCurr] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    setCurr(pageNumber);
  }

  return <Ellipsis current={curr} total={10} onChange={handlePageChange} />
}