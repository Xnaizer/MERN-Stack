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
import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";

interface IPropsTypes {
  modalAdd: {
    handleOpenCategory: () => void;
    handleCloseCategory: () => void;
    isCategoryVisible: boolean;
    control: Control<
      {
        name: string;
        description: string;
        icon: any;
      },
      unknown,
      {
        name: string;
        description: string;
        icon: any;
      }
    >;
    handleSubmit: UseFormHandleSubmit<
      {
        name: string;
        description: string;
        icon: any;
      },
      {
        name: string;
        description: string;
        icon: any;
      }
    >;
    errors: FieldErrors<{
      name: string;
      description: string;
      icon: any;
    }>;
    isPendingAddCategory: boolean;
    handleAddCategory: (data: {
        name: string; 
        description: string;
        icon: any 
    }) => void;
    image: any;
    setImage: (image: any) => void;
    reset: () => void;
  };
}

const CategoryModal: React.FC<IPropsTypes> = ({ modalAdd }) => {
  const {
    handleSubmit,
    control,
    errors,
    isPendingAddCategory,
    handleAddCategory,
    handleOpenCategory,
    handleCloseCategory,
    isCategoryVisible,
    image,
    setImage,
    reset,
  } = modalAdd;

  return (
    <section>
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
                  <h1 className="text-xl font-semibold">Add Category</h1>

                  {errors.root && (
                    <p className="text-danger mb-2 text-sm font-medium">
                      {errors?.root?.message}
                    </p>
                  )}

                  <form
                    className="mt-6 gap-2 font-semibold"
                    onSubmit={handleSubmit(handleAddCategory)}
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
                      defaultValue={null}
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
                        {isPendingAddCategory ? (
                          <Spinner color="white" size="sm" />
                        ) : (
                          "Create Category"
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

export default CategoryModal;
