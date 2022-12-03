import { useState } from "react";
import axios from "axios";

// export const useGet = (route, params = {}, onSuccess, onError) => {
//   const [state, setState] = useState({
//     isLoading: true,
//     data: null,
//     error: null,
//   });
//   let retryCount = 0;

//   const doGet = async firstTime => {
//     if (!firstTime && state.isLoading && retryCount === 0) return;
//     const token = await authService.getAccessToken();
//     try {
//       setState(s => ({ ...s, isLoading: true, data: null, error: null }));
//       const response = await createAxiosInstance(token).get(route, { params });
//       if (onSuccess) onSuccess(response);
//       return response;
//     } catch (error) {
//       if (error.statusCode === 401 && retryCount < 1) {
//         try {
//           await authService.refreshAccessToken();
//           retryCount += 1;
//           return doGet();
//         } catch (e) {
//           setState(s => ({ ...s, isLoading: false, error: e }));
//           throw e;
//         }
//       }

//       if (onError) onError(error);
//       throw error;
//     }
//   };

//   useEffect(() => {
//     let isMounted = true;

//     (async () => {
//       try {
//         const response = await doGet(true);
//         if (!isMounted) return;
//         setState(s => ({ ...s, isLoading: false, data: response }));
//       } catch (error) {
//         if (!isMounted) return;
//         setState(s => ({ ...s, isLoading: false, error }));
//       }
//     })();

//     return () => (isMounted = false);
//   }, []);

//   return {
//     ...state,
//     execute: async () => {
//       try {
//         const response = await doGet();

//         setState(s => ({ ...s, isLoading: false, data: response }));
//       } catch (error) {
//         setState(s => ({ ...s, isLoading: false, error }));
//       }
//     },
//   };
// };

type DefaultStateProps = {
  isLoading: boolean;
  data: any;
  error: any;
};

export const useLazyGet = (route: string = "") => {
  const [state, setState] = useState<DefaultStateProps>({
    isLoading: false,
    data: null,
    error: null,
  });
  let retryCount = 0;

  const get = async (
    params?: any,
    altRoute?: string,
    callBack?: (response: any) => void
  ) => {
    if (state.isLoading && retryCount === 0) return;
    // const token = await authService.getAccessToken();
    try {
      setState((s) => ({ ...s, isLoading: true, data: null, error: null }));
      const response = await axios.get(altRoute ? altRoute : route, {
        params,
      });
      setState((s) => ({ ...s, isLoading: false, data: response }));
      if (callBack) {
        callBack(response.data);
      }

      return response.data ? response.data : response;
    } catch (error: any) {
      if (error.statusCode === 401 && retryCount < 1) {
        try {
          //   await authService.refreshAccessToken();
          //   retryCount += 1;
          //   return get(params);
        } catch (e) {
          setState((s) => ({ ...s, isLoading: false, error: e }));
          throw e;
        }
      }

      setState((s) => ({ ...s, isLoading: false, error }));
      throw error;
    }
  };

  return { ...state, get };
};

export const usePost = (route: string) => {
  const [state, setState] = useState<DefaultStateProps>({
    isLoading: false,
    data: null,
    error: null,
  });
  let retryCount = 0;

  const post = async (
    body?: any,
    config = {},
    altRoute?: string,
    callBack?: (response: any) => void
  ) => {
    if (state.isLoading && retryCount === 0) return;
    // const token = await authService.getAccessToken();
    try {
      setState((s) => ({ ...s, isLoading: true, data: null, error: null }));
      const response = await axios.post(
        altRoute ? altRoute : route,
        body,
        config
      );
      setState((s) => ({ ...s, isLoading: false, data: response }));
      if (callBack) {
        callBack(response);
      }
      return response;
    } catch (error: any) {
      if (error.statusCode === 401 && retryCount < 1) {
        try {
          //   await authService.refreshAccessToken();
          //   retryCount += 1;
          //   return post(body, config);
        } catch (e) {
          setState((s) => ({ ...s, isLoading: false, error: e }));
          throw e;
        }
      }

      setState((s) => ({ ...s, isLoading: false, error }));
      throw error;
    }
  };

  return { ...state, post };
};

export const usePatch = (route: string) => {
  const [state, setState] = useState<DefaultStateProps>({
    isLoading: false,
    data: null,
    error: null,
  });

  let retryCount = 0;

  const patch = async (body: any, altRoute: string, config = {}) => {
    if (state.isLoading && retryCount === 0) return;
    // const token = await authService.getAccessToken();
    try {
      setState((s) => ({ ...s, isLoading: true, data: null, error: null }));
      const response = await axios.patch(
        altRoute ? altRoute : route,
        body,
        config
      );
      setState((s) => ({ ...s, isLoading: false, data: response }));
      return response;
    } catch (error: any) {
      if (error.statusCode === 401 && retryCount < 1) {
        try {
          //   await authService.refreshAccessToken();
          //   retryCount += 1;
          //   return patch(body, config);
        } catch (e) {
          setState((s) => ({ ...s, isLoading: false, error: e }));
          throw e;
        }
      }

      setState((s) => ({ ...s, isLoading: false, error }));
      throw error;
    }
  };

  return { ...state, patch };
};

// export const usePut = (route) => {
//   const [state, setState] = useState({
//     isLoading: false,
//     data: null,
//     error: null,
//   });

//   let retryCount = 0;

//   const put = async (body, altRoute, config = {}) => {
//     if (state.isLoading && retryCount === 0) return;
//     const token = await authService.getAccessToken();
//     try {
//       setState((s) => ({ ...s, isLoading: true, data: null, error: null }));
//       const response = await createAxiosInstance(token).put(
//         altRoute ? altRoute : route,
//         body,
//         config
//       );
//       setState((s) => ({ ...s, isLoading: false, data: response }));
//       return response;
//     } catch (error) {
//       if (error.statusCode === 401 && retryCount < 1) {
//         try {
//           await authService.refreshAccessToken();
//           retryCount += 1;
//           return put(body, config);
//         } catch (e) {
//           setState((s) => ({ ...s, isLoading: false, error: e }));
//           throw e;
//         }
//       }

//       setState((s) => ({ ...s, isLoading: false, error }));
//       throw error;
//     }
//   };

//   return { ...state, put };
// };

// export const useDelete = () => {
//   const [state, setState] = useState({
//     isLoading: false,
//     data: null,
//     error: null,
//   });

//   let retryCount = 0;

//   const remove = async (route, config = {}) => {
//     if (state.isLoading && retryCount === 0) return;
//     const token = await authService.getAccessToken();
//     try {
//       setState((s) => ({ ...s, isLoading: true, data: null, error: null }));
//       const response = await createAxiosInstance(token).delete(route, config);
//       setState((s) => ({ ...s, isLoading: false, data: response }));
//       return response;
//     } catch (error) {
//       if (error.statusCode === 401 && retryCount < 1) {
//         try {
//           await authService.refreshAccessToken();
//           retryCount += 1;
//           return remove(config);
//         } catch (e) {
//           setState((s) => ({ ...s, isLoading: false, error: e }));
//           throw e;
//         }
//       }

//       setState((s) => ({ ...s, isLoading: false, error }));
//       throw error;
//     }
//   };

//   return { ...state, remove };
// };
