import { useRef } from "react";
import { useEffect } from "react/cjs/react.development";

export default function usePreviousQuery(val) {
  const ref = useRef();

  useEffect(() => {
    ref.current = val;
  });

  return ref.current;
}