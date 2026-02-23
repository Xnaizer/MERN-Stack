'use client'
import { cn } from "@/utils/cn";
import { Button } from "@heroui/react";
import Image from "next/image";
import { ChangeEvent, useEffect, useId, useState } from "react";
import { FiUpload, FiX } from "react-icons/fi";

interface InputProps {
    name: string;
    className?: string;
    isDropable?: boolean;
    uploadedImage: File | null;
    setUploadedImage: React.Dispatch<React.SetStateAction<File | null>>;
    isInvalid: boolean;
    errorMessage: string;
}

const InputFile = (props: InputProps) => {

    const {
        name,
        className,
        isDropable = false,
        uploadedImage,
        setUploadedImage,
        isInvalid,
        errorMessage
    } = props;

    const dropzoneId = useId();
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if(!uploadedImage) {
            setPreview(null);
            return;
        }
        const url = URL.createObjectURL(uploadedImage);
        setPreview(url);

        return () => URL.revokeObjectURL(url);
    },[uploadedImage]);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file) setUploadedImage(file);
    }

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        if (!isDropable) return;
        const file = e.dataTransfer.files?.[0]
        if(file) setUploadedImage(file);
    }

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        if(!isDropable) return;
        e.preventDefault();
        e.stopPropagation();
    }

    const handleDelete = () => {
        setUploadedImage(null);
    }

    return (
        <>
        <label
            htmlFor={`dropzone-file-${dropzoneId}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={cn(
                `flex min-h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed ${isInvalid ? "border-danger-400" : "border-gray-400"} hover:border-gray-600 transition`,
                className
            )}
        >
            {preview ? (
                <div className="flex flex-col items-center w-full">
                    <div className="relative w-full max-w-[500px] h-[300px]">
                        <Image
                            fill
                            src={preview}
                            alt="uploaded image"
                            className="object-contain rounded-md"
                        />

                        <Button
                            isIconOnly
                            onPress={handleDelete}
                            variant="flat"
                            size="sm"
                            color="danger"
                            className="absolute top-2 right-2"
                        >
                            <FiX />
                        </Button>
                    </div>

                    <p className="text-sm font-semibold text-gray-500 mt-3">
                        {uploadedImage?.name}
                    </p>
                </div>
            ) : (
                <div className="flex flex-col items-center text-center p-5">
                    <FiUpload className={`text-2xl ${isInvalid ? "text-danger-500" : "text-gray-500"} mb-3`} />
                    <p className={`text-sm font-light
                         ${isInvalid ? "text-danger-500" : "text-gray-500"}`}>
                        {name}
                    </p>
                </div>
            )}

            <input
                name={name}
                type="file"
                className="hidden"
                accept="image/*"
                id={`dropzone-file-${dropzoneId}`}
                onChange={handleOnChange}
            />
            
        </label>
        <div className="mt-2">
            {isInvalid && <p className="text-danger-500 text-xs font-light">{errorMessage}</p>}
        </div>
        </>
    )

}

export default InputFile;