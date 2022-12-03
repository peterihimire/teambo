import React from "react";
import http from "./httpService";

interface IGet {
  path: string;
  setIsLoading: (arg: boolean) => void;
  setIsError: (arg: boolean) => void;
  setData: (arg: any) => void;
  setError: (arg: string | any) => void;
}

const get = async ({
  path,
  setIsLoading,
  setIsError,
  setData,
  setError,
}: IGet) => {
  setIsLoading(true);
  try {
    const response = await http.get(path);
    if (response?.status === 200) {
      setData(response?.data);
      setIsLoading(false);
    }
    setIsLoading(false);
    return "Something Went Wrong";
  } catch (err: any) {
    setIsLoading(false);
    setIsError(true);
    setError(err?.response ? err?.response : err);
  }
};

export const useGetUserManagement = (path: string) => {
  const [data, setData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | any>(false);

  React.useEffect((): any => {
    get({
      setIsLoading,
      setData,
      setError,
      setIsError,
      path,
    });
  }, [path]);
  return { isLoading, isError, error, data };
};

export const useGetUserPaginated = (path: string, page: number) => {
  const [data, setData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | any>(false);

  React.useEffect((): any => {
    get({
      setIsLoading,
      setData,
      setError,
      setIsError,
      path,
    });
  }, [path, page]);
  return { isLoading, isError, error, data };
};

interface ISwitchHttpMethods {
  type: string;
  payload?: any;
  path: string;
}

const switchHttpMethods = ({ type, payload, path }: ISwitchHttpMethods) => {
  if (type) {
    switch (type?.toLowerCase()) {
      case "put":
        return http.put(path, payload);
      case "post":
        return http.post(path, payload);
      case "delete":
        return http.delete(path, payload);
      case "patch":
        return http.patch(path, payload);
      default:
        throw new Error("unknown type supplied.");
    }
  }
};

interface IHttpMethods {
  path: string | any;
  payload: any;
  setData: any;
  setIsLoading: (arg: boolean) => void;
  setIsError: (arg: boolean) => void;
  setError: (arg: string | any) => void;
  type: string;
}

export const httpMethods = async ({
  path,
  setIsLoading,
  setIsError,
  setError,
  setData,
  type,
  payload,
}: IHttpMethods) => {
  setIsLoading(true);
  try {
    const response = await switchHttpMethods({ path, type, payload });
    if (response?.status === 200 || response?.status === 201) {
      setData(response?.data);
      setIsLoading(false);
    }
    setIsLoading(false);

    return "something went wrong";
  } catch (err: any) {
    setIsError(true);
    setError(err?.response ? err?.response : err);
    setIsLoading(false);
  }
};

export const useHtppMethods = (path: string, type: string, payload: any) => {
  const [data, setData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | any>(false);

  React.useEffect(() => {
    httpMethods({
      path,
      setIsLoading,
      setIsError,
      setError,
      setData,
      type,
      payload,
    });
  }, [path, payload, type]);

  return { isLoading, isError, error, data };
};
