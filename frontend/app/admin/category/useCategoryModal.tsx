'use client'

import categoryServices from "@/services/category.service";
import mediaServices from "@/services/media.service";
import { ICreateCategory } from "@/types/Category";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';

const addCategorySchema = Yup.object({
    name: Yup.string().required("Please input name"),
    description: Yup.string().required("Please input description"),
    icon: Yup.mixed().required("Please input icon")
});

const useCategoryModal = () => {

    const qc = useQueryClient();

    const [isCategoryVisible, setCategoryVisible] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);

    const handleOpenCategory = () => setCategoryVisible(true);
    const handleCloseCategory = () => setCategoryVisible(false);

    const { control, handleSubmit, formState: {errors}, reset, setError } = useForm({
        resolver: yupResolver(addCategorySchema)
    })

    const addCategoryService = async (payload: ICreateCategory) => {
    
    const formData = new FormData();
    formData.append("file", payload.icon);

    const uploadRes = await mediaServices.uploadFile(formData);
        const imagesUrl = uploadRes.data.data.url;
        const iconIdData = uploadRes.data.data._id;

        const body = {
            name: payload.name,
            description: payload.description,
            icon: imagesUrl,
            iconId: iconIdData
        }

        return await categoryServices.createCategories(body);
    }

    const { mutate: mutateAddCategory, isPending: isPendingAddCategory } = useMutation({
        mutationFn: addCategoryService,
        onError(error) {
            setError("root", {
                message: error.message
            })
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["Category"] });
            reset();
            setImage(null);
            setCategoryVisible(false);
        }
    })

    const handleAddCategory = (data: ICreateCategory) =>  mutateAddCategory(data);

    return {
        handleOpenCategory,
        handleCloseCategory,
        isCategoryVisible,
        control,
        handleSubmit,
        errors,
        isPendingAddCategory,
        handleAddCategory,
        image,
        setImage,
        reset
    }

}

export default useCategoryModal;