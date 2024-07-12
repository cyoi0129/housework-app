import { sha256 } from './func';
import Cookies from 'js-cookie';
import type {
  UserType,
  UserApiResponseType,
  MasterListApiResponseType,
  TaskListApiResponseType,
  MasterDbType,
  MasterDbDataType,
  MasterApiResponseType,
  TaskApiResponseType,
  TaskDbType,
  TaskDbDataType,
  RemoveApiResponseType,
} from './types';

const api_base = 'http://localhost:8080/api/';

/**
 *
 * @param request
 * @returns
 */
export const userDbLogin = async (request: UserType): Promise<UserApiResponseType> => {
  const url: string = api_base + 'login';
  const password = await sha256(request.password);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({ Email: request.email, Password: password }),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
  return {
    status: response.status,
    user: response.user,
    token: response.token,
  };
};

/**
 *
 * @returns
 */
export const fetchDbMaster = async (): Promise<MasterListApiResponseType> => {
  const url: string = api_base + 'masters/' + '1';
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: String(Cookies.get('token')),
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
  return {
    status: response.status,
    data: response.data,
  };
};

/**
 *
 * @param data
 * @returns
 */
export const addDbMaster = async (data: MasterDbType): Promise<MasterApiResponseType> => {
  const url: string = api_base + 'master';
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: String(Cookies.get('token')),
    }),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
  return {
    status: response.status,
    data: response.data,
  };
};

/**
 *
 * @param data
 * @returns
 */
export const updateDbMaster = async (data: MasterDbDataType): Promise<MasterApiResponseType> => {
  const url: string = api_base + 'master/' + data.Id;
  const response = await fetch(url, {
    method: 'PUT',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: String(Cookies.get('token')),
    }),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
  return {
    status: response.status,
    data: response.data,
  };
};

/**
 *
 * @param id
 * @returns
 */
export const removeDbMaster = async (id: number): Promise<RemoveApiResponseType> => {
  const url: string = api_base + 'master/' + id;
  const response = await fetch(url, {
    method: 'DELETE',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: String(Cookies.get('token')),
    }),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
  return {
    status: response.status,
    data: id,
  };
};

/**
 *
 * @param start
 * @param end
 * @returns
 */
export const fetchDbTask = async (start: string, end: string): Promise<TaskListApiResponseType> => {
  const url: string = api_base + 'tasks/' + '1?' + new URLSearchParams({ start: start, end: end });
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: String(Cookies.get('token')),
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
  return {
    status: response.status,
    data: response.data,
  };
};

/**
 *
 * @param data
 * @returns
 */
export const addDbTask = async (data: TaskDbType): Promise<TaskApiResponseType> => {
  const url: string = api_base + 'task';
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: String(Cookies.get('token')),
    }),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
  return {
    status: response.status,
    data: response.data,
  };
};

/**
 *
 * @param data
 * @returns
 */
export const updateDbTask = async (data: TaskDbDataType): Promise<TaskApiResponseType> => {
  const url: string = api_base + 'task/' + data.Id;
  const response = await fetch(url, {
    method: 'PUT',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: String(Cookies.get('token')),
    }),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
  return {
    status: response.status,
    data: response.data,
  };
};

/**
 *
 * @param id
 * @returns
 */
export const removeDbTask = async (id: number): Promise<RemoveApiResponseType> => {
  const url: string = api_base + 'task/' + id;
  const response = await fetch(url, {
    method: 'DELETE',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: String(Cookies.get('token')),
    }),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
  return {
    status: response.status,
    data: id,
  };
};
