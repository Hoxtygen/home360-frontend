import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import useEventCallback from "./useEventCallback";
import useEventListener from "./useEventListener";

declare global {
  // eslint-disable-next-line unused-imports/no-unused-vars
  interface WindowEventMap {
    "local-storage": CustomEvent;
  }
}
type SetValue<T> = Dispatch<SetStateAction<T>>;

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>] {
  // Get from localStorage and then parse stored JSON or return initial value
  const readValue = useCallback((): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? (parseJSON(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading from localStorage key "${key}"`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  // State to store our value
  // Pass initial state function to useState so login is only executed once
  const [storedValue, setStoredValue] = useState<T>(readValue);
  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue: SetValue<T> = useEventCallback((value) => {
    // Prevent build errors "window is undefined" but keeps working
    if (typeof window === "undefined") {
      console.warn(
        `Tried setting localStorage key "${key}" even though environment is not a client`
      );
    }
    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(newValue));
      // Save state
      setStoredValue(newValue);

      // Dispath a custom event so every useLocalStorage hook are notified
      window.dispatchEvent(new Event("local-storage"));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  });
  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
        return;
      }
      setStoredValue(readValue());
    },
    [key, readValue]
  );
  // works for other documents, not the current one.
  useEventListener("storage", handleStorageChange);

  // This is a custom event, triggered in writeValueToLocalStorage. see useLocalStorage
  useEventListener("local-storage", handleStorageChange);
  return [storedValue, setValue];
}

/**
 * A wrapper for JSON.parse to support "undefined" value
 *
 * @template T
 * @param {(string | null)} value
 * @return {*}  {(T | undefined)}
 */
function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === "undefined" ? undefined : JSON.parse(value ?? "");
  } catch (error) {
    console.log("parsing error on ", { value });
    return undefined;
  }
}
