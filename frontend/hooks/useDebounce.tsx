import { useRef } from "react";

const useDebound = () => {
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const debounce = (func: Function, delay: number) => {
        return () => {
            if(debounceTimeout.current) clearTimeout(debounceTimeout.current);
            debounceTimeout.current = setTimeout(() => {
                func();
                debounceTimeout.current = null
            }, delay)
        }
    }

    return  debounce;
}

export default useDebound;