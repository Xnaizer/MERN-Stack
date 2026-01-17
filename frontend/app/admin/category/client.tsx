'use client'
import DataTable from "@/components/ui/DataTable/DataTable";
import { COLUMN_LISTS_CATEGORY } from "./category.constant";
import useCategory from "./useCategory";

const CategoryClient: React.FC = () => {

    const { 
        renderCell,
        handleChangeSearch,
        handleClearSearch,
        handleBtnTopContent,
        handleChangeLimit,
        handleChangePagination 
    } = useCategory();

    return (
        <section>
            <DataTable
                renderCell={renderCell}
                colums={COLUMN_LISTS_CATEGORY}
                data={[
                    {
                        _id: '123',
                        name: "category 1",
                        description: "description 1",
                        icon: "/images/general/logo.png"
                    }
                ]}
                emptyContent="Category is empty"
                onChangeSearch={handleChangeSearch}
                onClearSearch={handleClearSearch}
                onClickButtonTopContent={handleBtnTopContent}
                buttonTopContentLabel="Create Category"
                currentPage={1}
                limit={10}
                onChangeLimit={handleChangeLimit}
                onChangePagination={handleChangePagination}
                totalPage={12}
            >

            </DataTable>
        </section>
    )
}

export default CategoryClient;