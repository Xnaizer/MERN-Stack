"use client"
import { Button, Card, CardBody, Input } from "@heroui/react"
import Image from "next/image"
import Link from "next/link"
import useRegister from "./useRegister"
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export default function Register() {

    const {visiblePassword, handleVisiblePassword} = useRegister();

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

                        <form className="flex w-80 flex-col gap-2">
                            <Input 
                                type="text" 
                                label="Fullname" 
                                variant="bordered" 
                                autoComplete="off" 
                            />
                            <Input 
                                type="text" 
                                label="Username" 
                                variant="bordered" 
                                autoComplete="off" 
                            />
                            <Input 
                                type="email" 
                                label="Email" 
                                variant="bordered" 
                                autoComplete="off" 
                            />
                            <Input 
                                type={!visiblePassword.password ? "password" : "text"}
                                label="Password" 
                                variant="bordered" 
                                autoComplete="off" 
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
                            <Input 
                                type={!visiblePassword.confirmPassword ? "password" : "text"}
                                label="ConfirmPassword" 
                                variant="bordered" 
                                autoComplete="off"
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
                        </form>
                        <Button className="mt-4" color="danger" size="lg" type="submit" >Register</Button>
                    </CardBody>
                </Card>
            </div>

        </section>
    )
}