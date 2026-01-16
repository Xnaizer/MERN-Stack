'use client'
import DataTable from "@/components/ui/DataTable/DataTable";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Key, ReactNode, useCallback } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LISTS_CATEGORY } from "./category.constant";

const CategoryClient: React.FC = () => {

    const { push } = useRouter();

    const renderCell = useCallback((
        category: Record<string, unknown>,
        columnKey: Key
    ) => {
        const cellValue = category[columnKey as keyof typeof category];

        switch(columnKey) {
            case "icon":
                return (
                    <Image 
                        src={`${cellValue}`} 
                        alt="icon"
                        width={100}
                        height={200}
                    />
                )
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
                        <DropdownMenu>
                            <DropdownItem
                                key="detail-category-button" 
                            onPress={() => push(`/admin/category/${category._id}`)}
                            >
                                Detail Category
                            </DropdownItem>

                            <DropdownItem
                                key="delete-category" 
                                className="text-danger-500"
                            >  
                                Delete
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                )
            default: 
                return cellValue as ReactNode;
        }

    },[push])

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
            >

            </DataTable>
        </section>
    )
}

export default CategoryClient;