"use client";
import DataTable from "@/components/ui/DataTable/DataTable";
import { COLUMN_LISTS_CATEGORY } from "./category.constant";
import useCategory from "./useCategory";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FiX } from "react-icons/fi";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from "@heroui/react";
import InputFile from "@/components/ui/InputFile/InputFile";

const CategoryClient: React.FC = () => {
  const searchParams = useSearchParams();

  const {
    renderCell,
    handleChangeSearch,
    handleClearSearch,
    handleBtnTopContent,
    handleChangeLimit,
    handleChangePagination,
    setURL,
    handlePrevBtn,
    handleNextBtn,
    handleOpenCategory,
    handleCloseCategory,
    data,
    isLoading,
    pagination,
    currentPage,
    limit,
    isCategoryVisible,
  } = useCategory();

  useEffect(() => {
    setURL();
  }, [searchParams, setURL]);

  return (
    <section>
      <DataTable
        renderCell={renderCell}
        colums={COLUMN_LISTS_CATEGORY}
        data={data}
        emptyContent="Category is empty"
        onChangeSearch={handleChangeSearch}
        onClearSearch={handleClearSearch}
        onClickButtonTopContent={handleBtnTopContent}
        buttonTopContentLabel="Create Category"
        currentPage={currentPage}
        limit={limit}
        onChangeLimit={handleChangeLimit}
        onChangePagination={handleChangePagination}
        totalPage={pagination?.totalPages ?? 1}
        isLoading={isLoading}
        onNextBtn={handleNextBtn}
        onPrevBtn={handlePrevBtn}
        onOpenCategory={handleOpenCategory}
      ></DataTable>

        <Modal
            backdrop="opaque"
            isOpen={isCategoryVisible}
            motionProps={{
            variants: {
                enter: {
                y: 0,
                opacity: 1,
                transition: {
                    duration: 0.3,
                    ease: "easeOut",
                },
                },
                exit: {
                y: -20,
                opacity: 0,
                transition: {
                    duration: 0.2,
                    ease: "easeIn",
                },
                },
            },
            }}
            onOpenChange={handleOpenCategory}
            onClose={handleCloseCategory}
        >
            <ModalContent>
            {(onClose) => (
                <>
                <ModalBody>
                    <section className="px-4 py-8">
                        <h1 className="text-xl font-semibold">Add Category</h1>

                        <div className="mt-6 font-semibold gap-2">
                            <h2 className="text-base mb-3">Information</h2>
                            <Input 
                                label="Name" 
                                size="md" 
                                type="name" 
                                variant="bordered" 
                                
                                className="font-light"
                            />
                            <Textarea 
                                
                                className="max-w-xs" 
                                label="Description" 
                                variant="bordered" 
                                className="w-full mt-4 font-light"
                            />
                            <h2 className="text-base mt-6 mb-3">Icon</h2>
                            <InputFile 
                                name='Click / Drag to upload file here'
                                isDropable
                            />
                        </div>
                    </section>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                        Close
                    </Button>
                    <Button color="danger" onPress={onClose}>
                        Create Category
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    </section>
  );
};

export default CategoryClient;
