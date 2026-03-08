"use client";
import DataTable from "@/components/ui/DataTable/DataTable";
import { COLUMN_LISTS_CATEGORY } from "./category.constant";
import useCategory from "./useCategory";
import { Key, ReactNode, useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import CategoryModal from "./addCategoryModal";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, Select, SelectItem } from "@heroui/react";
import { CiMenuKebab, CiSearch } from "react-icons/ci";
import { LIMIT_LISTS } from "@/constant/list.constant";
import { useMediaQuery } from "@/components/useMediaQuery";
import useCategoryModal from "./useCategoryModal";
import WarnModal from "@/components/ui/WarnModal";
import useDeleteModal from "./useDeleteModal";
import Image from "next/image";

const CategoryClient: React.FC = () => {
  const searchParams = useSearchParams();
  const isMd = useMediaQuery("(min-width: 768px)");
  const modalAddCategory = useCategoryModal();
  const modalDeleteCategory = useDeleteModal();

  const {
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
    push
  } = useCategory();

  useEffect(() => {
    setURL();
  }, [searchParams, setURL]);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div className="flex w-full items-center md:mt-6">
          <Input
            isClearable
            className="mb-4 w-full md:max-w-[42%]"
            placeholder="Search by name"
            startContent={<CiSearch />}
            onClear={handleClearSearch}
            onChange={handleChangeSearch}
            size={isMd ? "md" : "sm"}
          />
        </div>
        <div className="flex gap-4">
          <Select
            disallowEmptySelection
            disableSelectorIconRotation
            className="w-39"
            placeholder="Select limit"
            selectedKeys={[String(limit)]}
            selectionMode="single"
            onSelectionChange={(keys) => {
              const value = Array.from(keys)[0];
              handleChangeLimit(value as string);
            }}
            aria-label="Select page size"
            label="Show data: "
            labelPlacement="outside-left"
            size={isMd ? "md" : "sm"}
          >
            {LIMIT_LISTS.map((item) => (
              <SelectItem key={String(item.value)}>{item.label}</SelectItem>
            ))}
          </Select>

          <Button
            color="danger"
            className="px-3 md:w-36 md:px-4"
            size={isMd ? "md" : "sm"}
            onPress={modalAddCategory.handleOpenCategory}
          >
            {"Create Category"}
          </Button>
        </div>
      </div>
    );
  }, [
    handleClearSearch,
    handleChangeSearch,
    modalAddCategory.handleOpenCategory,
    handleChangeLimit,
    limit,
    isMd,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div
        className={`flex items-center justify-center px-4 py-3 md:justify-between ${isLoading && ""}`}
      >
        <span className="text-small text-default-400 hidden w-[30%] sm:flex">
          {isLoading
            ? "loading page.."
            : `Viewing ${currentPage} of ${pagination?.totalPages ?? 1} pages`
          }
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
        <div className="hidden w-[30%] justify-end gap-2 sm:flex">
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
    );
  }, [
    handleChangePagination,
    currentPage,
    pagination?.totalPages,
    isLoading,
    handleNextBtn,
    handlePrevBtn,
    isMd,
  ]);

    const renderCell = useCallback((
        category: Record<string, unknown>,
        columnKey: Key
    ) => {
        const cellValue = category[columnKey as keyof typeof category];

        switch(columnKey) {
            case "icon": {
                
                const value = String(cellValue ?? '');
                const isValid = value.includes("/image/upload/") && !value.includes("player.cloudinary.com");

                const src = isValid ? value : "https://res.cloudinary.com/dsurpllxe/image/upload/v1771536124/cancel_oxokbs.png";

                return (
                  <Image 
                    src={src} 
                    alt="icon"
                    width={100}
                    height={200}
                  />
                )
            }
            case "actions":
                return (
                    <Dropdown>
                        <DropdownTrigger>
                            <Button 
                              isIconOnly
                              size="sm"
                              variant="light"
                            >
                              <CiMenuKebab 
                                className="text-default-700"
                              />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                        >
                            <DropdownItem
                              key="detail-category-button" 
                              onPress={() => push(`/admin/category/${category._id}`)}
                            >
                              Detail Category
                            </DropdownItem>

                            <DropdownItem
                              key="delete-category" 
                              className="text-danger-500"
                              onPress={() => modalDeleteCategory.handleOpen(String(category._id))}
                            >  
                              Delete
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                )
            default: 
                return cellValue as ReactNode;
        }

    },[push, modalDeleteCategory]);

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
        routeTo="/admin/category"
      ></DataTable>

      <CategoryModal 
        modalAdd={modalAddCategory} 
      />

      <WarnModal 
        sizes='md' 
        colour='danger'
        additionalClassName=''
        btnText='Are you sure to delete this category?'
        btnClose={modalDeleteCategory.handleClose} 
        onVisible={modalDeleteCategory.isVisible}
        btnFn={modalDeleteCategory.handleDeleteCategory}
        defaultColour="danger"
        onPending={modalDeleteCategory.isPendingDeleteCategory}
      />
    </section>
  );
};

export default CategoryClient;
