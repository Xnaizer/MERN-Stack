import { useMediaQuery } from "@/components/useMediaQuery";
import { LIMIT_LISTS } from "@/constant/list.constant";
import { cn } from "@/utils/cn";
import { Button, Input, Pagination, Select, SelectItem, Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { ChangeEvent, Key, ReactNode, useMemo } from "react";
import { CiSearch } from "react-icons/ci";

interface IPropsTypes {
    colums: Record<string, unknown>[];
    data?: Record<string, unknown>[];
    limit: number;
    buttonTopContentLabel?: string;
    totalPage: number;
    emptyContent: string;
    currentPage: number;
    isLoading?: boolean;
    renderCell: (
        item: Record<string, unknown>,
        key: Key
    ) => ReactNode;
    onClearSearch: () => void;
    onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
    onClickButtonTopContent?: () => void;
    onChangePagination: (page: number) => void;
    onChangeLimit: (e: ChangeEvent<HTMLSelectElement>) => void;
    onNextBtn: () => void;
    onPrevBtn: () => void;
    onOpenCategory: () => void;
}

const DataTable: React.FC<IPropsTypes> = (props) => {

    const isMd = useMediaQuery("(min-width: 768px)");

    const {
        data = [],
        colums,
        limit,
        totalPage,
        isLoading,
        currentPage,
        emptyContent,
        buttonTopContentLabel,
        renderCell,
        onClearSearch,
        onChangeSearch,
        onClickButtonTopContent,
        onChangePagination,
        onChangeLimit,
        onNextBtn,
        onPrevBtn,
        onOpenCategory,
    } = props;

    const loading = isLoading ?? false;

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
                    onClear={onClearSearch}
                    onChange={onChangeSearch}
                    size={isMd ? "md" : "sm"}
                />
                </div>
                <div className="flex gap-4 ">
                    <Select
                        disableSelectorIconRotation
                        className=" w-39 "
                        placeholder="Select limit"
                        selectedKeys={[String(limit)]}
                        selectionMode="single"
                        onChange={onChangeLimit}
                        aria-label="Select page size"
                        label="Show data : "
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

                    {buttonTopContentLabel && 
                    <Button 
                    color="danger"
                    className=" md:w-36 px-3 md:px-4"
                    size={isMd ? "md" : "sm"}
                    onPress={onOpenCategory}
                    >
                    {buttonTopContentLabel}
                    </Button>}
                </div>
            </div>
        )
    }, [
        onClearSearch, 
        onChangeSearch, 
        buttonTopContentLabel, 
        onOpenCategory,
        onChangeLimit,
        limit,
        isMd
    ])

    const bottomContent = useMemo(() => {
        return (
            <div className={`flex items-center px-4 py-3  justify-center md:justify-between ${isLoading && ''}`}>
                <span className="hidden  sm:flex w-[30%] text-small text-default-400">
                    {isLoading ? 'loading page..' : `Viewing ${currentPage} of ${totalPage} pages`}
                </span>
                {!isLoading && (
                    <Pagination 
                        isCompact
                        showShadow
                        color="danger"
                        page={currentPage}
                        total={totalPage}
                        size={isMd ? "md" : "sm"}
                        onChange={(page) => onChangePagination(page)}
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
                                onPress={onPrevBtn}
                                value={String(currentPage)}
                            >
                                Previous
                            </Button>
                            <Button
                                isDisabled={currentPage === totalPage}
                                size="sm"
                                variant="solid"
                                color="danger"
                                onPress={onNextBtn}
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
        onChangePagination,
        currentPage,
        totalPage,
        isLoading,
        onNextBtn,
        onPrevBtn,
        isMd
    ]);

    return (
        <Table 
            topContent={topContent} 
            topContentPlacement="outside"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
                base: "max-w-full z-10",
                wrapper: cn("text-[11px] md:text-sm", {"overflow-x-hidden": isLoading}),
                th: "text-[11px] md:text-sm font-medium text-start",
                td: "text-[11px] md:text-sm text-start items-start justify-start flex-row",
            }}
              style={{
                    minHeight: loading ? Number(limit)  * 78 : undefined,
                }}
        >
            <TableHeader columns={colums}>
                {(item) => (
                    <TableColumn

                        key={item.uid as Key}
                        
                    >
                        {item.name as string}
                    </TableColumn>
                )}
            </TableHeader>

            <TableBody 
                items={loading ? [] : data}
                emptyContent={loading ? "" : emptyContent}
                isLoading={loading}
                className=""
                loadingContent={
                    <div   className="w-full flex flex-col items-center px-10 gap-3 mt-12">
                    {Array.from({ length: limit }, (_, i) => (
                            <div key={i} className="w-full flex flex-row items-center  gap-3">
                                <div>
                                    <Skeleton className="flex rounded w-32 h-14" />
                                </div>
                                <div className="w-full flex flex-col gap-2 pl-12">
                                    <Skeleton className="h-2 w-4/5 rounded-lg" />
                                    <Skeleton className="h-2 w-5/5 rounded-lg" />
                                    <Skeleton className="h-2 w-3/5 rounded-lg" />
                                </div>
                            </div>
                    ))}
                    </div>
                }
            >
                {(item) => (
                    <TableRow 
                    
                    key={item._id as Key}>
                        {(columnKey) => (
                            <TableCell
                            >{renderCell(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default DataTable;
