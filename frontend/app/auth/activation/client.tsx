"use client"
import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PropTypes {
    status: 'success' | 'failed'
}

const ActivationClient = (props: PropTypes) => {

    const router = useRouter();
    const { status } = props;

    return (
        <section className="flex w-screen flex-col items-center justify-center gap-10 p-4">
            <div className="flex flex-col items-center justify-center gap-10">
                <Image 
                    src="/images/general/logo.svg"
                    alt="logo"
                    width={180}
                    height={180}
                />
                <Image
                    src={status === 'success' ?  "/images/illustration/success.svg" : "/images/illustration/pending.svg" }
                    alt="success"
                    
                    width={300}
                    height={300}
                />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-3xl font-bold text-danger-500">
                    {status === 'success' ? "Activation Success" : "Activation Failed"}
                </h1>
                <p className="text-xl font-bold text-default-500">
                    {status === 'success' ? "Thank you for register account in MERN Stack" : "Confirmation Code Invalid"}
                </p>
                <Button className="mt-4 w-fit" variant="bordered" color="danger" onPress={() => router.push("/")}>
                    Back To Home
                </Button>
            </div>
        </section>
    )
}

export default ActivationClient;