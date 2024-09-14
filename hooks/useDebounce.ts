import {useEffect, useState} from 'react';

type UseDebounceProps = {text: string; delay: number};
const useDebounce = ({text, delay}: UseDebounceProps) => {
  const [debounce, setDebounce] = useState(text);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(text);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [text, delay]);

  return debounce;
};

export default useDebounce;
