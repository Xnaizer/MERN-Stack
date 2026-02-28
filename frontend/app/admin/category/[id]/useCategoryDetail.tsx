'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import categoryServices from "@/services/category.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from 'yup';
import mediaServices from "@/services/media.service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ICreateCategory } from "@/types/Category";

const editCategorySchema = Yup.object({
    name: Yup.string().required("Please input name"),
    description: Yup.string().required("Please input description"),
    icon: Yup.mixed().nullable()
})

const useCategoryDetail = (id: string) => {
    
    const router = useRouter();
    const qc = useQueryClient();

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);

    const handleOpenCategory = () => {
        if(data){
            reset({
                name: data.name,
                description: data.description,
                icon: data.icon
            });
        }
        setIsOpen(true);
    };

    const handleCloseCategory = () => setIsOpen(false);

    const handleOpenModal = (id: string) => {
        setSelectedId(id);
        setIsVisible(true);
    }

    const handleCloseModal = () => {
        setSelectedId(null);
        setIsVisible(false);
    }
    
    const handleCategoryDetail = async () => {
        const res = await categoryServices.findByIdCategories(id);
        return res.data.data;
    }

    const {data, isLoading: isLoadData} = useQuery({
        queryKey: ['CategoryDetail', id],
        queryFn: handleCategoryDetail,
        enabled: !!id
    })

    const { control, handleSubmit, formState: {errors}, reset, setError } = useForm({
        resolver: yupResolver(editCategorySchema)
    })

    const editCategoryService = async (payload: ICreateCategory) => {

        let imageUrl = data.icon
        let iconId = data.iconId

        if(payload.icon instanceof File){
            await mediaServices.deleteFile({
                fileUrl: imageUrl,
                iconId: iconId,
            });

            const formData = new FormData();
            formData.append("file", payload.icon);

            const uploadRes = await mediaServices.uploadFile(formData);
            imageUrl = uploadRes.data.data.url;
            iconId = uploadRes.data.data._id;
        }

        return await categoryServices.updateByIdCategories(id,{
            name: payload.name,
            description: payload.description,
            icon: imageUrl,
            iconId
        });
    }

    const { mutate: mutateEditCategory, isPending: isPendingEditCategory } = useMutation({
        mutationFn: editCategoryService,
        onError(err) {
            setError("root", {
                message: err.message
            })
            toast.error('Failed update category')
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["CategoryDetail", id]})
            qc.invalidateQueries({ queryKey: ["Category"]})
            reset();
            setImage(null);
            setIsOpen(false);
            toast.success('Success update a category')
        } 
    })

    const deleteCategoryService = async (id: string) => {
       return await categoryServices.deleteCategories(id);
    }

    const { mutate: mutateDeleteCategories, isPending: isPendingDeleteCategory } = useMutation({
        mutationFn: deleteCategoryService,
        onError: () => {
            toast.error('Failed delete this category');
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["Category"]});
            handleCloseModal()
            toast.success('Success delete a category');
            router.push("/admin/category");
        }
    })

    const handleDeleteCategory = () => {
        if(selectedId) mutateDeleteCategories(selectedId);
    }

    const handleEditCategory = (data: ICreateCategory) => mutateEditCategory(data);


    return {
        data,
        isLoadData,
        router,
        handleOpenModal,
        handleCloseModal,
        isVisible,
        handleDeleteCategory,
        isPendingDeleteCategory,
        isPendingEditCategory,
        control,
        handleSubmit,
        errors,
        handleOpenCategory,
        handleCloseCategory,
        isOpen,
        image,
        handleEditCategory,
        reset,
        setImage,
        setIsOpen
    }

}

export default useCategoryDetail;