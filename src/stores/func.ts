import type { MasterDbDataType, MasterItemType, TaskDbDataType, TaskItemType, MasterDbType, TaskDbType } from './types';

export const getTargetDate = (target: number): Date => {
  const dt = new Date();
  dt.setDate(dt.getDate() - target);
  return dt;
};

/**
 *
 * @param text
 * @returns
 */
export const sha256 = async (text: string): Promise<string> => {
  const uint8 = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', uint8);
  return Array.from(new Uint8Array(digest))
    .map((v) => v.toString(16).padStart(2, '0'))
    .join('');
};

/**
 *
 * @param data
 * @returns
 */
export const convert2DbMaster = (data: MasterItemType): MasterDbDataType => {
  return {
    Id: data.id,
    UserID: 1,
    Name: data.name,
    Category: data.category,
    Point: Number(data.point),
  };
};

/**
 *
 * @param data
 * @returns
 */
export const convert2NewDbMaster = (data: MasterItemType): MasterDbType => {
  return {
    UserID: 1,
    Name: data.name,
    Category: data.category,
    Point: Number(data.point),
  };
};

/**
 *
 * @param data
 * @returns
 */
export const convertDbMaster = (data: MasterDbDataType): MasterItemType => {
  return {
    id: data.Id,
    user: data.UserID,
    name: data.Name,
    category: data.Category,
    point: data.Point,
  };
};

/**
 *
 * @param data
 * @returns
 */
export const convertDbMasterList = (data: MasterDbDataType[]): MasterItemType[] => {
  const result: MasterItemType[] = [];
  data.forEach((item) => {
    result.push(convertDbMaster(item));
  });
  return result;
};

/**
 *
 * @param data
 * @returns
 */
export const convert2DbTask = (data: TaskItemType): TaskDbDataType => {
  return {
    Id: data.id,
    UserID: 1,
    MasterID: data.master,
    Person: data.person,
    Date: data.date,
  };
};

/**
 *
 * @param data
 * @returns
 */
export const convert2NewDbTask = (data: TaskItemType): TaskDbType => {
  return {
    UserID: 1,
    MasterID: data.master,
    Person: data.person,
    Date: data.date,
  };
};

export const convertDbTask = (data: TaskDbDataType): TaskItemType => {
  return {
    id: data.Id,
    user: data.UserID,
    master: data.MasterID,
    person: data.Person,
    date: data.Date.slice(0, 10),
  };
};

/**
 *
 * @param data
 * @returns
 */
export const convertDbTaskList = (data: TaskDbDataType[]): TaskItemType[] => {
  const result: TaskItemType[] = [];
  data.forEach((item) => {
    result.push(convertDbTask(item));
  });
  return result;
};
