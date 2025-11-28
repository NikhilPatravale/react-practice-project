import { ArrowDownwardSharp, ArrowUpwardSharp, HomeOutlined } from "@mui/icons-material";
import { Box, List, ListItem } from "@mui/material";
import { useEffect, useState } from "react";

type entity = {
  id: number
  name: string,
  parentId: number | null,
  children: number[],
}

type NormalizeStateType = {
  byId: Record<number, entity>,
  allIds: number[],
}

const initialData: { id: number, name: string, parentId: number | null }[] = [
  { "id": 1, "name": "Parent 1", "parentId": null },
  { "id": 2, "name": "Child 1.1", "parentId": 1 },
  { "id": 3, "name": "Child 1.2", "parentId": 1 },
  { "id": 4, "name": "Parent 2", "parentId": null },
  { "id": 5, "name": "Child 2.1", "parentId": 4 },
  { "id": 6, "name": "Child 1.1.1", "parentId": 2 },
  { "id": 7, "name": "Child 1.1.2", "parentId": 2 },
  { "id": 8, "name": "Child 1.2.1", "parentId": 3 }
]

const getChildren = (list: Array<{ id: number, name: string, parentId: number | null }>, id: number) => {
  return list.reduce<number[]>((acc, next) => {
    if (next.parentId === id) {
      acc.push(next.id);
    }
    return acc;
  }, []);
}

const normalize = (data: { id: number, name: string, parentId: number | null }[]) => {
  const result: NormalizeStateType = { byId: {}, allIds: [] };

  data.forEach(({ id, ...rest }) => {
    result.byId[id] = {
      id,
      ...rest,
      children: getChildren(data, id),
    };
    result.allIds.push(id);
  });
  return result;
}

function RenderEntity(props: { data: NormalizeStateType, id: number, level: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, id, level } = props;
  const { name, children } = data.byId[id];
  const OpenIcon = isOpen ? ArrowUpwardSharp : ArrowDownwardSharp
  const FinalIcon = children.length > 0 ? OpenIcon : HomeOutlined;

  return <List>
    <Box sx={{ display: 'flex', marginLeft: `${level * 20}px` }} onClick={() => setIsOpen(prev => !prev)}>
      <FinalIcon />
      <ListItem>{name}</ListItem>
    </Box>
    {isOpen && children.map((i) => <RenderEntity data={data} id={i} level={level + 1} />)}
  </List>
}


export default function NestedAccordion() {
  const [data, setData] = useState<NormalizeStateType>({ byId: {}, allIds: [] });

  useEffect(() => {
    setData(normalize(initialData));
  }, []);

  return <Box sx={{ padding: '2rem' }}>
    <Box sx={{ maxWidth: '60rem', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >{data.allIds
      .filter(i => data.byId[i].parentId === null)
      .map(i => <RenderEntity data={data} id={i} level={0} />)}</Box>
  </Box>
}