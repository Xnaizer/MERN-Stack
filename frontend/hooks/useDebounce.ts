import { useRef } from "react";

const useDebounce = () => {
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const debounce = <T>(
        func: (value: T) => void,
        delay: number
    ) => {
        return (value: T) => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }

            debounceTimeout.current = setTimeout(() => {
                func(value);
            }, delay);
        };
    };

    return debounce;
};

export default useDebounce;
