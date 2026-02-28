import { Card, CardBody, Skeleton } from "@heroui/react";

const LoadingSpinner: React.FC = () => {

    return (
        <section className="mt-8">
        <Card className="p-2 ">
            <CardBody className="flex flex-row gap-4 ">

            <div className="w-50">
                <Skeleton className="rounded-lg">
                    <div className="h-24 rounded-lg bg-default-300" />
                </Skeleton>
            </div>

            <div className="p-2 flex-col h-full w-full justify-between flex">
                <Skeleton className="w-2/4 h-4 rounded-2xl mb-3" />
                <Skeleton className="w-3/4 h-4 rounded-2xl mb-3" />
                <Skeleton className="w-[60%] h-4 rounded-2xl" />
            </div>
            </CardBody>
        </Card>
        </section>
    )
}

export default LoadingSpinner;