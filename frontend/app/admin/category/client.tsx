"use client";
import DataTable from "@/components/ui/DataTable/DataTable";
import { COLUMN_LISTS_CATEGORY } from "./category.constant";
import useCategory from "./useCategory";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import CategoryModal from "./addCategoryModal";
import { Button, Input, Pagination, Select, SelectItem } from "@heroui/react";
import { CiSearch } from "react-icons/ci";
import { LIMIT_LISTS } from "@/constant/list.constant";
import { useMediaQuery } from "@/components/useMediaQuery";
import useCategoryModal from "./useCategoryModal";

const CategoryClient: React.FC = () => {

  const searchParams = useSearchParams();
  const isMd = useMediaQuery("(min-width: 768px)");
  const modalAddCategory = useCategoryModal();

  const {
    renderCell,
    handleChangeSearch,
    handleClearSearch,
    handleChangeLimit,
    handleChangePagination,
    setURL,
    handlePrevBtn,
    handleNextBtn,
    data,
    isLoading,
    pagination,
    currentPage,
    limit,
  } = useCategory();

  const {

  } = useCategoryModal();

  useEffect(() => {
    setURL();
  }, [searchParams, setURL]);

    const topContent = useMemo(() => {
        return (
            <div
                className="flex flex-col md:flex-row justify-between items-center"
            >
                <div className="w-full flex items-center md:mt-6">
                    <Input  
                    isClearable
                    className="w-full md:max-w-[42%] mb-4"
                    placeholder="Search by name"
                    startContent={<CiSearch/>}
                    onClear={handleClearSearch}
                    onChange={handleChangeSearch}
                    size={isMd ? "md" : "sm"}
                />
                </div>
                <div className="flex gap-4 ">
                    <Select
                        disallowEmptySelection
                        disableSelectorIconRotation
                        className=" w-39 "
                        placeholder="Select limit"
                        selectedKeys={[String(limit)]}
                        selectionMode="single"
                        onSelectionChange={(keys) => {
                            const value = Array.from(keys)[0]
                            handleChangeLimit(value as string);
                        }}
                        aria-label="Select page size"
                        label="Show data: "
                        labelPlacement="outside-left"
                        size={isMd ? "md" : "sm"}

                    >
                        {LIMIT_LISTS.map((item) => (
                            <SelectItem 
                            key={String(item.value)}
                            >
                                {item.label}
                            </SelectItem>
                        ) )}
                    </Select>

                    <Button 
                    color="danger"
                    className=" md:w-36 px-3 md:px-4"
                    size={isMd ? "md" : "sm"}
                    onPress={modalAddCategory.handleOpenCategory}
                    >
                    {"Create Category"}
                    </Button>
                </div>
            </div>
        )
    }, [
        handleClearSearch, 
        handleChangeSearch, 
        modalAddCategory.handleOpenCategory,
        handleChangeLimit,
        limit,
        isMd
    ]);

    const bottomContent = useMemo(() => {
        return (
            <div className={`flex items-center px-4 py-3  justify-center md:justify-between ${isLoading && ''}`}>
                <span className="hidden  sm:flex w-[30%] text-small text-default-400">
                    {isLoading ? 'loading page..' : `Viewing ${currentPage} of ${pagination?.totalPages ?? 1} pages`}
                </span>
                {!isLoading && (
                    <Pagination 
                        isCompact
                        showShadow
                        color="danger"
                        page={currentPage}
                        total={pagination?.totalPages ?? 1}
                        size={isMd ? "md" : "sm"}
                        onChange={(page) => handleChangePagination(page)}
                    />
                )}
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    {!isLoading && (
                        <>
                            <Button 
                                isDisabled={currentPage === 1}
                                size="sm"
                                variant="solid"
                                color="danger"
                                onPress={handlePrevBtn}
                                value={String(currentPage)}
                            >
                                Previous
                            </Button>
                            <Button
                                isDisabled={currentPage === pagination?.totalPages}
                                size="sm"
                                variant="solid"
                                color="danger"
                                onPress={handleNextBtn}
                                value={String(currentPage)}
                            >
                                Next
                            </Button>
                        </>
                    )}
                </div>
            </div>
        )
    },[
        handleChangePagination,
        currentPage,
        pagination?.totalPages,
        isLoading,
        handleNextBtn,
        handlePrevBtn,
        isMd
    ]);

  return (
    <section>
      <DataTable
        renderCell={renderCell}
        colums={COLUMN_LISTS_CATEGORY}
        data={data}
        emptyContent="Category is empty"
        limit={limit}
        isLoading={isLoading}
        topContent={topContent}
        bottomContent={bottomContent}
      ></DataTable>
      <CategoryModal 
        modalAdd={modalAddCategory}
      />
    </section>
  );
};

export default CategoryClient;
