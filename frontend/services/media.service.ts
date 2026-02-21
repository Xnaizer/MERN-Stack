import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IFileURL } from "@/types/File";


const mediaServices = {
    uploadFile: (payload: FormData) => instance.post(
        `${endpoint.MEDIA}/upload-single`, 
        payload, 
    ),
    deleteFile: (payload: IFileURL) => instance.delete(
        `${endpoint.MEDIA}/remove-media`,
        { data: payload }
    )
}

export default mediaServices;