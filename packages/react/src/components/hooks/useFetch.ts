import { useEffect, useReducer, useCallback, useMemo, useRef } from "react";
import { safeParseJSON } from "src/utils/parse";

type State<T> = {
  data: T | undefined;
  error: Error | undefined;
  isLoading: boolean;
};

type Action<T> =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_SUCCESS"; payload: T }
  | { type: "FETCH_FAILURE"; payload: Error }
  | { type: "FETCH_RESET" }
  | { type: "UPDATE_DATA"; payload: T };

function fetchReducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, error: undefined };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: undefined,
      };
    case "FETCH_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    case "FETCH_RESET":
      return { data: undefined, error: undefined, isLoading: false };
    case "UPDATE_DATA":
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

function useFetch<T = unknown>(
  url: string,
  options?: RequestInit,
  isMutate = false
) {
  const cache = useRef<Record<string, any>>({});

  const initialState: State<T> = {
    data: cache.current[url] as T | undefined,
    error: undefined,
    isLoading: !cache.current[url],
  };

  const [state, dispatch] = useReducer(fetchReducer<T>, initialState);

  const memoizedOptions = useMemo(() => options, [JSON.stringify(options)]);

  const fetchData = useCallback(
    async (data?: T) => {
      if (cache.current[url] && !isMutate) {
        dispatch({ type: "FETCH_SUCCESS", payload: cache.current[url] });
        return;
      }

      console.log("ren");

      dispatch({ type: "FETCH_INIT" });
      try {
        const options = isMutate
          ? { ...memoizedOptions, body: JSON.stringify(data) }
          : memoizedOptions;
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const dataOrError = await safeParseJSON<T>(response);
        if (dataOrError instanceof Error) {
          throw dataOrError;
        }
        dispatch({ type: "FETCH_SUCCESS", payload: dataOrError });
        if (!isMutate) {
          cache.current[url] = dataOrError;
        }
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE", payload: error as Error });
      }
    },
    [url, memoizedOptions, isMutate]
  );

  useEffect(() => {
    if (!isMutate) {
      fetchData();
    } else {
      dispatch({ type: "FETCH_RESET" });
    }
  }, [fetchData, isMutate]);

  const updateData = useCallback(
    (newData: T) => {
      dispatch({ type: "UPDATE_DATA", payload: newData });
      cache.current[url] = newData;
    },
    [url]
  );

  return { ...state, mutate: fetchData, updateData };
}

export function useQuery<T = unknown>(url: string, options?: RequestInit) {
  const { data, error, isLoading, updateData } = useFetch<T>(url, options);
  return { data, error, isLoading, updateData };
}

export function useMutation<T = unknown>(url: string, options?: RequestInit) {
  const { data, error, isLoading, mutate } = useFetch<T>(url, options, true);
  return { data, error, isLoading, mutate };
}
