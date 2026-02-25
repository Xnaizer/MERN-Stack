'use client'

import categoryServices from "@/services/category.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteModal = () => {

  const qc = useQueryClient();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleClose = () => {
    setIsVisible(false);
    setSelectedId(null)
  }
  console.log(selectedId)

  const handleOpen = (id: string) => {
    setSelectedId(id);
    setIsVisible(true);
  }

  const deleteCategoryService = async (params: string) => {
    return await categoryServices.deleteCategories(params);
  }

  const { mutate: mutateDeleteCategories, isPending: isPendingDeleteCategory } = useMutation({
    mutationFn: deleteCategoryService,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["Category"]});
      handleClose();
      toast.success('Success delete category');
    }
  })

  const handleDeleteCategory = () => {
    if(selectedId) mutateDeleteCategories(selectedId);
  }; 
  
  return {
    handleOpen,
    handleClose,
    isVisible,
    handleDeleteCategory,
    isPendingDeleteCategory
  }
}

export default useDeleteModal;