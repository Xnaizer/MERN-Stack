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
    renderCell: (
        item: Record<string, unknown>,
        key: Key
    ) => ReactNode;
    onClearSearch: () => void;
    onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
    onClickButtonTopContent?: () => void;
    onChangePagination: (page: number) => void;
    onChangeLimit: (e: ChangeEvent<HTMLSelectElement>) => void;
    isLoading?: boolean;
}

const DataTable: React.FC<IPropsTypes> = (props) => {

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
    } = props;

    const loading = isLoading ?? false;

    const topContent = useMemo(() => {
        return (
            <div
                className="flex flex-row justify-between items-center"
            >
                <div className="w-full flex items-center mt-6">
                    <Input  
                    isClearable
                    className="w-full sm:max-w-[42%] mb-4"
                    placeholder="Search by name"
                    startContent={<CiSearch/>}
                    onClear={onClearSearch}
                    onChange={onChangeSearch}
                    // size="lg"
                />
                </div>
                <div className="flex gap-4 ">
                    <Select
                        disableSelectorIconRotation
                        className=" w-39 text-md"
                        placeholder="Select limit"
                        selectedKeys={[String(limit)]}
                        selectionMode="single"
                        onChange={onChangeLimit}
                        aria-label="Select page size"
                        label="Show data : "
                        labelPlacement="outside-left"
                        

                    >
                        {LIMIT_LISTS.map((item) => (
                            <SelectItem key={String(item.value)}>
                                {item.label}
                            </SelectItem>
                        ) )}
                    </Select>

                    {buttonTopContentLabel && 
                    <Button 
                    color="danger"
                    className="w-36 px-4"
                    size="md"
                    onPress={onClickButtonTopContent}
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
        onClickButtonTopContent,
        onChangeLimit,
        limit
    ])

    const bottomContent = useMemo(() => {
        return (
            <div className={`flex items-center px-4 py-3 justify-between ${isLoading && ''}`}>
                <span className="hidden  sm:flex w-[30%] text-small text-default-400">
                    {isLoading ? 'loading page..' : `Viewing ${currentPage} of ${totalPage} pages`}
                </span>
                {!isLoading && (
                    <Pagination 
                        isCompact
                        showControls
                        showShadow
                        color="danger"
                        page={currentPage}
                        total={totalPage}
                        onChange={(page) => onChangePagination(page)}
                    />
                )}
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    {!isLoading && (
                        <>
                            <Button 
                                // isDisabled
                                size="sm"
                                variant="solid"
                                color="danger"
                                // onPress
                            >
                                Previous
                            </Button>
                            <Button
                                // isDisabled
                                size="sm"
                                variant="solid"
                                color="danger"
                                // onPress
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
        isLoading
    ]);

    return (
        <Table 
            topContent={topContent} 
            topContentPlacement="outside"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
                base: "max-w-full",
                wrapper: cn({"overflow-x-hidden": isLoading})
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
                    <TableRow key={item._id as Key}>
                    {(columnKey) => (
                        <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default DataTable;
