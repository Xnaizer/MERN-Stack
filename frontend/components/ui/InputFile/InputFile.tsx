'use client';
import { cn } from "@/utils/cn";
import { Button } from "@heroui/react";
import Image from "next/image";
import { ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { FiUpload, FiX } from "react-icons/fi";

interface InputProps {
    name: string;
    className? : string;
    isDropable?: boolean;
}


const InputFile = (props: InputProps) => {

    const [uploadedImage, setUploadedImage] = useState<File | null>(null);

    const { 
        name,
        className,
        isDropable = false
    } = props;

    const drop = useRef<HTMLLabelElement>(null);
    const dropzoneId = useId();

    const handleDragOver = (e: DragEvent) => {
        if(isDropable) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        setUploadedImage(e.dataTransfer?.files?.[0] || null)
    }

    const handleDelete = () => {
        setUploadedImage(null);
    }

    useEffect(() => {
        const dropCurrent = drop.current;

        if(dropCurrent) {
            dropCurrent.addEventListener('dragover', handleDragOver);
            dropCurrent.addEventListener('drop', handleDrop);

            return () => {
                dropCurrent.removeEventListener("dragover", handleDragOver);
                dropCurrent.removeEventListener("drop", handleDrop);
            }
        }
    },[]);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;

        if(files && files.length > 0) {
            setUploadedImage(files[0]);
        }
    }

    return (
        <label
            ref={drop}
            htmlFor={`dropzone-file-${dropzoneId}`}
            className={cn("flex min-h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-400", className)}
        >
            {uploadedImage ? (
                <div className="flex flex-col items-center justify-center p-5">

                    <div>
                        <Image 
                            fill 
                            src={URL.createObjectURL(uploadedImage)} 
                            alt="uploaded image"
                            className="relative!" 
                        />
                        <p className="text-center text-sm font-semibold text-gray-500 mt-6">
                            {uploadedImage.name}
                        </p>

                    </div>
                    <Button 
                        // isIconOnly
                        className="mt-3"
                        onPress={handleDelete}
                        color="danger"
                        variant="flat"
                    >
                        <FiX /> Cancel
                    </Button>
                </div>
            ):(
                <div className="flex flex-col items-center text-center justify-center p-5">
                    <FiUpload className="text-2xl text-gray-500 mb-3" />
                    <p className="text-center text-sm font-semibold text-gray-500">
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
            >
            </input>
        </label>
    )

}

export default InputFile;