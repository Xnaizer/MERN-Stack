"use client"
import { useState } from "react";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { Yuji_Boku } from "next/font/google";

const registerSchema = yup.object().shape({
    fullName: yup.string().required("Please input your full name"),
    username: yup.string().required("Please input your username"),
    email: yup.string().email("Email format not valid").required("Please input your email"),
    password: yup.string().min(8,"Minimal 8 Characters").required("Please input your password"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), ""], "Password not match").required("Please input your password")

})

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

    const { register, handleSubmit, formState: {errors}, reset, setError } = useForm({
        resolver: yupResolver(registerSchema)
    });

    return {
        visiblePassword,
        handleVisiblePassword
    }
}

export default useRegister;