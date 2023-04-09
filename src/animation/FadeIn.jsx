import { useRef, useState, useEffect } from "react";

export default function FadeIn({ children, threshold = 0.5 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }else {
          setIsVisible(false);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold,
      }
    );
    observer.observe(node);
    return () => {
      const nodeCopy = node;
      observer.unobserve(nodeCopy);
    };
  }, [ref,threshold]);

  const wrapperClassName = `fade-in${isVisible ? ' visible' : ''}`;

  return (
    <div style={{ overflowY: 'hidden' }}>
      <div ref={ref} className={wrapperClassName}>
        {children}
      </div>
    </div>
  );
}
