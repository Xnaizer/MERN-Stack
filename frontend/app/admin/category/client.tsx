'use client'
import DataTable from "@/components/ui/DataTable/DataTable";
import { COLUMN_LISTS_CATEGORY } from "./category.constant";
import useCategory from "./useCategory";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

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
        data,
        isLoading,
        pagination,
        currentPage,
        limit
    } = useCategory();

    useEffect(() => {
        setURL();
    },[searchParams,setURL]);

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
            >

            </DataTable>
        </section>
    )
}

export default CategoryClient;
