export type EntityType = {
  name: string,
  parent: number | null,
  type: 'folder' | 'file',
  children: number[],
}

export type FolderStateType = {
  byIds: Record<number, EntityType>,
  allIds: number[],
}