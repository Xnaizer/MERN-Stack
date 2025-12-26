"use client"
import { Button, Card, CardBody, Input, Spinner } from "@heroui/react"
import Image from "next/image"
import Link from "next/link"
import useRegister from "./useRegister"
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Controller } from "react-hook-form"
import { cn } from "@/utils/cn"

export default function Register() {

    const {
        visiblePassword, 
        handleVisiblePassword, 
        control,
        handleSubmit,
        handleRegister, 
        isPendingRegister,
        errors 
    } = useRegister();

    console.log(errors);

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
                        <h2 className="text-xl font-bold text-danger-500">Create Accout</h2>
                        <p className="text-sm mb-5">Have an account? &nbsp;
                            <Link href="/auth/login" className="font-semibold text-danger-400">Login here</Link>
                        </p>
                        {errors.root && (
                            <p className="mb-2 font-medium text-danger">
                                {errors?.root?.message}
                            </p>
                        )}
                        <form className={cn("flex w-80 flex-col", Object.keys(errors).length > 0 ? "gap-1" : "gap-2")} onSubmit={handleSubmit(handleRegister)}>
                            <Controller 
                                name="fullName" 
                                control={control}
                                render={({field}) => (
                                    <Input 
                                        {...field}
                                        type="text" 
                                        label="Fullname" 
                                        variant="bordered" 
                                        autoComplete="off"
                                        isInvalid={errors.fullName !== undefined} 
                                        errorMessage={errors.fullName?.message}
                                    />
                                )}
                            />

                            <Controller 
                                name="username" 
                                control={control}
                                render={({field}) => (
                                    <Input 
                                        {...field}
                                        type="text" 
                                        label="Username" 
                                        variant="bordered" 
                                        autoComplete="off"
                                        isInvalid={errors.username !== undefined}
                                        errorMessage={errors.username?.message} 
                                    />
                                )}
                            />

                            <Controller 
                                name="email" 
                                control={control}
                                render={({field}) => (
                                    <Input 
                                        {...field}
                                        type="email" 
                                        label="Email" 
                                        variant="bordered" 
                                        autoComplete="off" 
                                        isInvalid={errors.email !== undefined}
                                        errorMessage={errors.email?.message}
                                    />
                                )}
                            />

                            <Controller 
                                name="password" 
                                control={control}
                                render={({field}) => (
                                    <Input 
                                        {...field}
                                        type={!visiblePassword.password ? "password" : "text"}
                                        label="Password" 
                                        variant="bordered" 
                                        autoComplete="off"
                                        isInvalid={errors.password !== undefined}
                                        errorMessage={errors.password?.message} 
                                        endContent={
                                            <button
                                                className="focus:outline-none"
                                                type="button"
                                                onClick={() => handleVisiblePassword("password")}
                                            >
                                                {visiblePassword.password ? (
                                                    <IoMdEye className="pointer-events-none text-xl text-default-400"/>
                                                ):(
                                                    <IoMdEyeOff className="pointer-events-none text-xl text-default-400"/>
                                                )}
                                            </button>
                                        }
                                    />
                                )}
                            />

                            <Controller 
                                name="confirmPassword" 
                                control={control}
                                render={({field}) => (
                                    <Input 
                                        {...field}
                                        type={!visiblePassword.confirmPassword ? "password" : "text"}
                                        label="ConfirmPassword" 
                                        variant="bordered" 
                                        autoComplete="off"
                                        isInvalid={errors.confirmPassword !== undefined}
                                        errorMessage={errors.confirmPassword?.message}
                                        endContent={
                                            <button
                                                className="focus:outline-none"
                                                type="button"
                                                onClick={() => handleVisiblePassword("confirmPassword")}
                                            >
                                                {visiblePassword.confirmPassword ? (
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
                                {isPendingRegister ? (
                                    <Spinner color="white" size="sm" /> 
                                ) : "Register" }
                            </Button>
                        </form>

                    </CardBody>
                </Card>
            </div>

        </section>
    )
}