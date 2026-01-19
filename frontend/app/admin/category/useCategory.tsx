import categoryServices from "@/services/category.service";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, Key, ReactNode, useCallback, useMemo } from "react";
import { CiMenuKebab } from "react-icons/ci";


const useCategory = () => {

    const { push } = useRouter();

    const router = useRouter();
    const searchParams = useSearchParams();

    const currentLimit = searchParams.get('limit') ?? "10";
    const currentPage = searchParams.get('page') ?? "1";
    const currentSearch = searchParams.get('search') ?? "";

    const setURL = useCallback(() => {
        const params = new URLSearchParams(searchParams.toString());

        params.set("limit", currentLimit);
        params.set("page", currentPage);
        params.set("search", currentSearch);

        const next = params.toString();
        const current = searchParams.toString();

        if(next !== current) {
            router.replace(`?${next}`);
        }


    }, [searchParams, currentLimit, currentPage, currentSearch, router]);

    const getCategories = useCallback(async () => {
        let params = `limit=${currentLimit}&page=${currentPage}`;

        if(currentSearch) {
            params += `&search=${currentSearch}`
        }

        const res = await categoryServices.getCategories(params);
        const { data } = res;

        return data
        
    },[currentLimit, currentPage, currentSearch]);

    const isQueryEnabled = useMemo(() => {
        const pageNum = Number(currentPage);
        const limitNum = Number(currentLimit);

        if(!currentPage || !currentLimit) return false;
        if(Number.isNaN(pageNum) || Number.isNaN(limitNum)) return false;
        if(pageNum <= 0 || limitNum <= 0) return false;

        return true;
    },[currentPage, currentLimit])

    const { data, isLoading, isFetching, refetch } = useQuery({
        queryKey: ["Category", currentPage, currentLimit,currentSearch],
        queryFn: getCategories,
        enabled: isQueryEnabled,
    })

    const categories = data?.data ?? [];
    const pagination = data?.pagination;
    const currentPageNum = Number(currentPage) || 1;
    const currentLimitNum = Number(currentLimit) || 10;


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

    },[push]);

    const handleChangeSearch = () => {

    }

    const handleClearSearch = () => {

    }

    const handleBtnTopContent = () => {

    }

    const handleChangeLimit = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set("page", "1");
        params.set("limit", String(e.target.value));

        const next = params.toString();
        const current = searchParams.toString();

        if(next != current) {
            router.replace(`?${next}`);
        }
        refetch();
    }, [refetch, router, searchParams])

    const handleChangePagination = useCallback((page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(page));

        const next = params.toString();
        const current = searchParams.toString();

        if(next !== current) {
            router.replace(`?${next}`);
        }
        refetch();
    },[searchParams, refetch, router])

    return {
        renderCell,
        handleClearSearch,
        handleChangeSearch,
        handleBtnTopContent,
        handleChangeLimit,
        handleChangePagination,
        setURL,
        data: categories,
        pagination,
        currentPage: currentPageNum,
        limit: currentLimitNum,
        isLoading
    }


}

export default useCategory;
