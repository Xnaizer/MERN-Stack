'use client'
import useDebounce from "@/hooks/useDebounce";
import categoryServices from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

const useCategory = () => {

    const { push } = useRouter();
    const debounce = useDebounce();

    const router = useRouter();
    const searchParams = useSearchParams();

    const currentLimit = searchParams.get('limit') ?? "5";
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

    const { data, isLoading } = useQuery({
        queryKey: ["Category", currentPage, currentLimit,currentSearch],
        queryFn: getCategories,
        enabled: isQueryEnabled,
        staleTime: 1 * 60 * 1000
    })

    const categories = data?.data ?? [];
    const pagination = data?.pagination;
    const currentPageNum = Number(currentPage) || 1;
    const currentLimitNum = Number(currentLimit) || 10;

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        debounceSearch(e.target.value);
    }

    const debounceSearch = debounce((value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", "1");
        params.set("search", String(value))

        const next = params.toString();
        const current = searchParams.toString();

        if(next != current) {
            router.replace(`?${next}`);
        }

    }, 500)

    const handleClearSearch = () => {
        const params = new URLSearchParams(searchParams.toString());

        params.set("search", "");
        params.set("page", "1");

        const next = params.toString();
        const current = searchParams.toString();

        if(next != current) {
            router.replace(`?${next}`);
        }
    }

    const handleChangeLimit = useCallback((value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set("page", "1");
        params.set("limit", value);

        const next = params.toString();
        const current = searchParams.toString();

        if(next != current) {
            router.replace(`?${next}`);
        }
    }, [router, searchParams]);

    const handleChangePagination = useCallback((page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(page));

        const next = params.toString();
        const current = searchParams.toString();

        if(next !== current) {
            router.replace(`?${next}`);
        }
    },[searchParams, router]);

    const handlePrevBtn = useCallback(() => {
        const params = new URLSearchParams(searchParams.toString());

        const page =  params.get("page");
        params.set("page", String(Number(page) - 1));

        const next = params.toString();
        const current = searchParams.toString();

        if( next !== current) {
            router.replace(`?${next}`)
        }
    
    }, [searchParams, router]);

    const handleNextBtn = useCallback(() => {
        const params = new URLSearchParams(searchParams.toString());
        const page = params.get("page");
        params.set("page", String(Number(page) + 1))

        const next = params.toString();
        const current = searchParams.toString();

        if(next !== current) {
            router.replace(`?${next}`)
        }
    }, [router, searchParams]);

    return {
        push,
        handleClearSearch,
        handleChangeSearch,
        handleChangeLimit,
        handleChangePagination,
        setURL,
        handlePrevBtn,
        handleNextBtn,
        data: categories,
        pagination,
        currentPage: currentPageNum,
        limit: currentLimitNum,
        isLoading,
    }

}

export default useCategory;
