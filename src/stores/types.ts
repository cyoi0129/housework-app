export interface MasterDataType {
  user: number;
  name: string;
  category: string;
  point: number;
}

export interface TaskDataType {
  user: number;
  master: number;
  person: string;
  date: string;
}

export interface MasterItemType extends MasterDataType {
  id: number;
}

export interface TaskItemType extends TaskDataType {
  id: number;
}

export interface UserType {
  email: string;
  password: string;
}

export interface MasterDbType {
  UserID: number;
  Name: string;
  Category: string;
  Point: number;
}

export interface TaskDbType {
  UserID: number;
  MasterID: number;
  Person: string;
  Date: string;
}

export interface MasterDbDataType extends MasterDbType {
  Id: number;
}

export interface TaskDbDataType extends TaskDbType {
  Id: number;
}

export interface UserDbType {
  Email: string;
  Password: string;
}

interface ApiResponseBaseType {
  status: number;
}

export interface MasterListApiResponseType extends ApiResponseBaseType {
  data: Array<MasterDbDataType>;
}

export interface TaskListApiResponseType extends ApiResponseBaseType {
  data: Array<TaskDbDataType>;
}

export interface MasterApiResponseType extends ApiResponseBaseType {
  data: MasterDbDataType;
}

export interface TaskApiResponseType extends ApiResponseBaseType {
  data: TaskDbDataType;
}

export interface RemoveApiResponseType extends ApiResponseBaseType {
  data: number;
}

export interface UserApiResponseType extends ApiResponseBaseType {
  user: string;
  token: string;
}
