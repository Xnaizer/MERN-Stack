import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICreateCategory } from "@/types/Category";

const categoryServices = {
    getCategories: (params: string) => instance.get(`${endpoint.CATEGORY}?${params}`),
    createCategories: (payload: ICreateCategory) => instance.post(`${endpoint.CATEGORY}`, payload),
    deleteCategories: (params: string) => instance.delete(`${endpoint.CATEGORY}/${params}`)
}

export default categoryServices;