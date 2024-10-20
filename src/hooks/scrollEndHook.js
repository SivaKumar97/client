import { useEffect, useRef, useState } from "react";

export function useScrollToEnd(callback) {
    const ref = useRef(null);
    const [isScrollingToEnd, setIsScrollingToEnd] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        const element = ref.current;
        if (element) {
          const { scrollTop, scrollHeight, clientHeight } = element;
          setIsScrollingToEnd(scrollTop + clientHeight >= scrollHeight);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    return [ref, isScrollingToEnd];
  }