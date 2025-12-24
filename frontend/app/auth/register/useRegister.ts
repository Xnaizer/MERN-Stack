"use client"
import { useState } from "react"

type VisiblePassword = {
  password: boolean;
  confirmPassword: boolean;
};


const useRegister = () => {

    const [visiblePassword, setVisiblePassword] = useState<VisiblePassword>({
        password: false,
        confirmPassword: false
    });

    const handleVisiblePassword = (key: keyof VisiblePassword) => {
        setVisiblePassword((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    }

    return {
        visiblePassword,
        handleVisiblePassword
    }
}

export default useRegister;