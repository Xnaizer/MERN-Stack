/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import InputFile from "@/components/ui/InputFile/InputFile";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  Spinner,
  Textarea,
} from "@heroui/react";
import { Control, Controller, FieldErrors, UseFormHandleSubmit } from "react-hook-form";

interface Iprops {
  modalEdit: {
    handleOpenCategory?: () => void;
    handleCloseCategory: () => void;
    isCategoryVisible?: boolean;
    control: Control<{
        name: string;
        description: string;
        icon: any;
    }, unknown, {
        name: string;
        description: string;
        icon: any;
    }>;
    handleSubmit: UseFormHandleSubmit<{
        name: string;
        description: string;
        icon: any;
    }, {
        name: string;
        description: string;
        icon: any;
    }>;
    errors: FieldErrors<{
        name: string;
        description: string;
        icon: any;
    }>;
    reset: () => void;
    isOpen: boolean;
    setImage: (file: any) => void;
    image: any;
    handleEditCategory: (data: any) => void;
    isPendingEditCategory: boolean;
    setIsOpen: (open: boolean) => void;
  }
}


const CategoryDetailModal: React.FC<Iprops> = ({modalEdit}) => {

  const {
    isOpen,
    handleCloseCategory,
    reset,
    setImage,
    errors,
    handleSubmit,
    handleEditCategory,
    control,
    image,
    isPendingEditCategory,
    setIsOpen
  } = modalEdit;

  return (
    <section>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
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
        onOpenChange={setIsOpen}
        onClose={() => {
          handleCloseCategory();
          reset();
          setImage(null);
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <section className="px-4 py-8">
                  <h1 className="text-xl font-semibold">Edit Category</h1>

                  {errors.root && (
                    <p className="text-danger mb-2 text-sm font-medium">
                      {errors?.root?.message}
                    </p>
                  )}

                  <form
                    className="mt-6 gap-2 font-semibold"
                    onSubmit={handleSubmit(handleEditCategory)}
                  >
                    <h2 className="mb-3 text-base">Information</h2>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Category name"
                          size="md"
                          type="text"
                          variant="bordered"
                          autoComplete="off"
                          className="font-light"
                          isInvalid={errors.name !== undefined}
                          errorMessage={errors.name?.message}
                          
                        />
                      )}
                    />

                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          type="text"
                          label="Description"
                          variant="bordered"
                          autoComplete="off"
                          className="mt-4 w-full max-w-md font-light"
                          isInvalid={errors.description !== undefined}
                          errorMessage={errors.description?.message}
                        />
                      )}
                    />

                    <h2 className="mt-6 mb-3 text-base">Icon</h2>
                    <Controller
                      name="icon"
                      control={control}
                      rules={{ required: "File wajib diupload" }}
                      render={({ field }) => (
                        <InputFile
                          name="Click / Drag to upload file here"
                          isDropable
                          uploadedImage={image}
                          setUploadedImage={(file) => {
                            setImage(file);
                            field.onChange(file);
                          }}
                          isInvalid={!!errors.icon}
                          errorMessage={typeof errors.icon?.message === "string" ? errors.icon.message : ""}
                        />
                      )}
                    />

                    <section className="mt-6 flex w-full justify-end gap-4">
                      <Button
                        color="danger"
                        variant="flat"
                        onPress={() => {
                          onClose();
                          reset();
                          setImage(null);
                        }}
                      >
                        Close
                      </Button>
                      <Button color="danger" type="submit">
                        {isPendingEditCategory ? (
                          <Spinner color="white" size="sm" />
                        ) : (
                          "Update Category"
                        )}
                      </Button>
                    </section>
                  </form>
                </section>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
};

export default CategoryDetailModal;
