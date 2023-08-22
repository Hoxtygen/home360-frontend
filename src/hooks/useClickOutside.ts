import { useEffect, useRef } from "react";

export default function useClickOutside(handler: Function) {
  const domNode: any = useRef();

  useEffect(() => {
    const maybeHandler = (event: any) => {
      if (domNode.current && !domNode.current.contains(event.target)) {
        handler();
      }
    };
    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
}
