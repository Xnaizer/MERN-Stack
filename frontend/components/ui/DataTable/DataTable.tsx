import { LIMIT_LISTS } from "@/constant/list.constant";
import { cn } from "@/utils/cn";
import { Button, Input, Pagination, Select, SelectItem, Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { ChangeEvent, Key, ReactNode, useMemo } from "react";
import { CiSearch } from "react-icons/ci";

interface IPropsTypes {
    colums: Record<string, unknown>[];
    data: Record<string, unknown>[];
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
        data,
        colums,
        limit,
        totalPage,
        isLoading = false,
        currentPage,
        emptyContent,
        buttonTopContentLabel,
        renderCell,
        onClearSearch,
        onChangeSearch,
        onClickButtonTopContent,
        onChangePagination,
        onChangeLimit,
    } = props

    const topContent = useMemo(() => {
        return (
            <div
                className="flex flex-row justify-between items-center"
            >
                <div className="w-full flex items-center mt-6">
                    <Input  
                    isClearable
                    className="w-full sm:max-w-[42%] mb-6"
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
                        className=" w-42"
                        placeholder="Select limit"
                        selectedKeys={[limit]}
                        selectionMode="single"
                        onChange={onChangeLimit}
                        // startContent={<p className="text-small">Show:</p>}

                    >
                        {LIMIT_LISTS.map((item) => (
                            <SelectItem key={item.value}>
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
            <div className="flex items-center px-4 py-3 justify-between">
                <span className="hidden  sm:flex w-[30%] text-small text-default-400">
                    {/* {selectedKey === "all" 
                    ? "All items selected"
                    : `${selectedKeys.size} of ${filteredItems.length} selected`
                    } */}
                    1 of 2 pages
                </span>
                <Pagination 
                    isCompact
                    showControls
                    showShadow
                    color="danger"
                    page={currentPage}
                    total={totalPage}
                    onChange={onChangePagination}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
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
                </div>
            </div>
        )
    },[
        onChangePagination,
        currentPage,
        totalPage
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
                items={isLoading ? [] : data}
                emptyContent={isLoading ? "" : emptyContent}
                isLoading={isLoading}
                loadingContent={
                    <div className=" w-full flex items-center px-10 gap-3">
                        <div>
                            <Skeleton className="flex rounded w-36 h-16" />
                        </div>
                        <div className="w-full flex flex-col gap-2 pl-12">
                            <Skeleton className="h-3 w-4/5 rounded-lg" />
                            <Skeleton className="h-3 w-5/5 rounded-lg" />
                            <Skeleton className="h-3 w-3/5 rounded-lg" />
                        </div>
                    </div>
                }
            >
                {(item) => (
                    <TableRow key={item._id as Key}>
                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default DataTable;
