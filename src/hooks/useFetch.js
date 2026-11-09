import { useEffect, useReducer } from "react";

const initialState = { data: null, loading: true, error: null };

function fetchReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { data: null, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { data: action.payload, loading: false, error: null };
    case "FETCH_ERROR":
      return { data: null, loading: false, error: action.payload };
    default:
      return state;
  }
}

// Each call owns its own reducer state; inputs are appended before the AbortSignal.
export default function useFetch(fetcher, inputs = []) {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      dispatch({ type: "FETCH_START" });
      try {
        const data = await fetcher(...inputs, controller.signal);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        if (!controller.signal.aborted) {
          dispatch({
            type: "FETCH_ERROR",
            payload: error instanceof Error ? error.message : "Something went wrong.",
          });
        }
      }
    }

    load();
    return () => controller.abort();
  }, [fetcher, ...inputs]);

  return state;
}
