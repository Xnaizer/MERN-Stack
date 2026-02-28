import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

interface IProps {
    message?: string;
    linkTo: string;
}

const NotFoundData: React.FC<IProps> = (props) => {

    const {
        message,
        linkTo
    } = props;

    const router = useRouter();

    return (
        <section className="w-full mx-auto flex justify-center items-center text-center min-h-screen">
            <div>
                <div>
                    <h1 className="text-danger-500 font-extrabold text-7xl ">404</h1>
                    <h1 className="text-danger-500 font-semibold text-2xl mt-2">Resource Not Found!</h1>
                </div>
                <div className="mt-6">
                    <Button
                        color="danger"
                        variant="flat"
                        onPress={() => router.push(`${linkTo}`)}
                    >
                        Go Back
                    </Button>
                </div>
            </div>
        </section>
    )

}

export default NotFoundData;