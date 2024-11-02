import { useRef, useEffect, useState } from "react";

const useComponentWidth = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (ref.current) {
        setWidth(ref.current.clientWidth);
      }
    };

    const resizeObserver = new ResizeObserver(() => updateWidth());
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        resizeObserver.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, width };
};

export default useComponentWidth;
