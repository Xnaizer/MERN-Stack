"use client"
import { Button, Card, CardBody, Input, Spinner } from "@heroui/react"
import Image from "next/image"
import Link from "next/link"
import useLogin from "./useLogin"
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Controller } from "react-hook-form"
import { cn } from "@/utils/cn"

export default function LoginClient() {

    const {
        isVisible, 
        toggleVisibility, 
        control, 
        handleSubmit,
        handleLogin, 
        isPendingLogin,
        errors 
    } = useLogin();


    return (
        <section className="flex lg:flex-row flex-col w-full items-center justify-center gap-20  ">
            <div className="flex w-full lg:w-1/3 flex-col items-center justify-center gap-10">
                <Image 
                    src="/images/general/logo.svg"
                    alt="logo"
                    width={180}
                    height={180}
                />
                <Image 
                    src="/images/illustration/login.svg"
                    alt="login"
                    className="w-2/3 lg:w-full"
                    width={1024}
                    height={1024}
                />
            </div>

            <div>
                <Card >
                    <CardBody className="p-8">
                        <h2 className="text-xl font-bold text-danger-500">Login</h2>
                        <p className="text-sm mb-5">Don&apos;t have an account? &nbsp;
                            <Link href="/auth/register" className="font-semibold text-danger-400">Register here</Link>
                        </p>
                        {errors.root && (
                            <p className="mb-2 font-medium text-danger">
                                {errors?.root?.message}
                            </p>
                        )}
                        <form className={cn("flex w-80 flex-col", Object.keys(errors).length > 0 ? "gap-1" : "gap-2")} onSubmit={handleSubmit(handleLogin)}>

                            <Controller 
                                name="identifier" 
                                control={control}
                                render={({field}) => (
                                    <Input 
                                        {...field}
                                        type="text" 
                                        label="Username / Email" 
                                        variant="bordered" 
                                        autoComplete="off"
                                        isInvalid={errors.identifier !== undefined}
                                        errorMessage={errors.identifier?.message} 
                                    />
                                )}
                            />

                            <Controller 
                                name="password" 
                                control={control}
                                render={({field}) => (
                                    <Input 
                                        {...field}
                                        type={isVisible ? "password" : "text"}
                                        label="Password" 
                                        variant="bordered" 
                                        autoComplete="off"
                                        isInvalid={errors.password !== undefined}
                                        errorMessage={errors.password?.message} 
                                        endContent={
                                            <button
                                                className="focus:outline-none"
                                                type="button"
                                                onClick={toggleVisibility}
                                            >
                                                {isVisible ? (
                                                    <IoMdEye className="pointer-events-none text-xl text-default-400"/>
                                                ):(
                                                    <IoMdEyeOff className="pointer-events-none text-xl text-default-400"/>
                                                )}
                                            </button>
                                        }
                                    />
                                )}
                            />

                            <Button className="mt-4" color="danger" size="lg" type="submit" >
                                {isPendingLogin ? (
                                    <Spinner color="white" size="sm" /> 
                                ) : "Login" }
                            </Button>
                        </form>

                    </CardBody>
                </Card>
            </div>

        </section>
    )
}