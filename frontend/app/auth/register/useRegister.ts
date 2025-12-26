"use client"
import { useState } from "react";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/types/Auth";
import authServices from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const registerSchema = yup.object().shape({
    fullName: yup.string().required("Please input your full name"),
    username: yup.string().required("Please input your username"),
    email: yup.string().email("Email format not valid").required("Please input your email"),
    password: yup.string().min(8,"Minimal 8 Characters").matches(/^(?=.*[A-Z])/, "Password must contain at least one uppercase letter").required("Please input your password"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), ""], "Password not match").required("Please input your password")

})

type VisiblePassword = {
  password: boolean;
  confirmPassword: boolean;
};


const useRegister = () => {

    const router = useRouter();

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

    const { control, handleSubmit, formState: {errors}, reset, setError } = useForm({
        resolver: yupResolver(registerSchema)
    });

    const registerService = async (payload: IRegister) => {
        const result = await authServices.register(payload);
        return result;
    }

    const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
        mutationFn: registerService,
        onError(error) {
            setError("root", {
                message: error.message
            })
        },
        onSuccess: () => {
            router.push("/auth/register/success")
            reset()
        }
    })

    const handleRegister = (data: IRegister) => mutateRegister(data);

    return {
        visiblePassword,
        handleVisiblePassword,
        control,
        handleSubmit,
        handleRegister,
        isPendingRegister,
        errors
    }
}

export default useRegister;