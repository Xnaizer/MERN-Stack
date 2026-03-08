'use client'
import { Button, Card, CardBody, Skeleton } from "@heroui/react";
import Image from "next/image";
import useCategoryDetail from "./useCategoryDetail";
import { HiArrowCircleLeft } from "react-icons/hi";
import WarnModal from "@/components/ui/WarnModal";
import NotFoundData from "@/components/ui/errors/not-found";
import LoadingSpinner from "@/components/ui/loadings/LoadCategory";
import CategoryDetailModal from "./CategoryDetailModal";

interface IProps {
    paramsId: string;
}

const CategoryDetailClient: React.FC<IProps> = ({paramsId}) => {

    const catDetails = useCategoryDetail(paramsId);

    if(catDetails.isLoadData) {
        return <LoadingSpinner />
    }

    if (!catDetails.data) {
        return <NotFoundData 
            linkTo="/admin/category"
        />
    }

    return (
        <section className="flex w-full flex-col px-6 py-12">
            <div>
                <Button
                    variant="light"
                    size="md"
                    color="danger"
                    onPress={() => catDetails.router.push('/admin/category')}
                    className="flex justify-center text-center !hover:bg-blue-100"
                >
                    <HiArrowCircleLeft className="text-lg" />
                    {catDetails.isLoadData ? <Skeleton />  : "Back to Category"}
                </Button>
            </div>

            <section className="mt-8">
            <Card className="p-2 ">
                <CardBody className="flex flex-row gap-4 ">

                <div>
                    <Image
                        src={catDetails.data.icon}
                        alt="icon"
                        width={200}
                        height={200}
                        className="rounded-lg shadow-lg w-fit"
                    />
                </div>

                <div className="p-4 flex-col h-full w-full">
                    <div className="text-sm text-default-500">
                        ID: {catDetails.data._id}
                    </div>

                    <h1 className="text-2xl font-semibold mt-2">{catDetails.data.name}</h1>
                    <p className="text-lg text-default-600 mt-1">{catDetails.data.description}</p>
                </div>
                </CardBody>
            </Card>
            </section>

            <div className="mt-8 flex w-full gap-3 justify-end">
                <Button
                    color="danger"
                    variant="flat"
                    onPress={() => catDetails.handleOpenCategory()}
                >
                    Edit
                </Button>
                <Button
                    className=" text-red-100 bg-danger-500"
                    onPress={() => catDetails.handleOpenModal(paramsId)}
                >
                    Delete
                </Button>
            </div>
            <WarnModal
                sizes='md' 
                colour='danger'
                additionalClassName=''
                btnText='Are you sure to delete this category?'
                btnClose={catDetails.handleCloseModal} 
                onVisible={catDetails.isVisible}
                btnFn={catDetails.handleDeleteCategory}
                defaultColour="danger"
                onPending={catDetails.isPendingDeleteCategory}
            />
            <CategoryDetailModal modalEdit={catDetails}/>
        </section>
    )
}

export default CategoryDetailClient;