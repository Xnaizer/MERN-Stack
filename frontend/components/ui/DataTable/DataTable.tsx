import { cn } from "@/utils/cn";
import { Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { Key, ReactNode } from "react";

interface IPropsTypes {
    colums: Record<string, unknown>[];
    data?: Record<string, unknown>[];
    limit: number;
    emptyContent: string;
    isLoading?: boolean;
    renderCell: (
        item: Record<string, unknown>,
        key: Key
    ) => ReactNode;
    topContent: ReactNode,
    bottomContent: ReactNode,
}

const DataTable: React.FC<IPropsTypes> = (props) => {

    const {
        data = [],
        colums,
        limit,
        isLoading,
        emptyContent,
        renderCell,
        topContent,
        bottomContent
    } = props;

    const loading = isLoading ?? false;
    let sizeTable = 1;

    if(limit === 5) {
        sizeTable = 66;
    } else if (limit === 8) {
        sizeTable = 62;
    } else if (limit === 10) {
        sizeTable = 61;
    } else if (limit === 12) {
        sizeTable = 60;
    } else {
        sizeTable = 1;
    }

    return (
        <Table 
            topContent={topContent} 
            topContentPlacement="outside"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            selectionMode="single"
            classNames={{
                base: "max-w-full z-10",
                wrapper: cn("text-[11px] md:text-sm", {"overflow-x-hidden": isLoading}),
                th: "text-[11px] md:text-sm font-medium text-start",
                td: "text-[11px] md:text-sm text-start items-start justify-start flex-row",
            }}
            style={{
                minHeight: loading ? Number(limit)  * sizeTable : undefined,
            }}
        >
            <TableHeader columns={colums}>
                {(item) => (
                    <TableColumn
                        key={item.uid as Key}
                        className="text-xs"
                        
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
                    <div   className="w-full flex flex-col items-center px-7  gap-4 mt-12">
                    {Array.from({ length: limit }, (_, i) => (
                            <div key={i} className="w-full flex flex-row items-center  gap-2">
                                <div>
                                    <Skeleton className="flex rounded w-28 h-10" />
                                </div>
                                <div className="w-full flex flex-col gap-2 pl-10">
                                    <Skeleton className="h-3 w-5/5 rounded-lg" />
                                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                                </div>
                            </div>
                    ))}
                    </div>
                }
            >
                {(item) => (
                    <TableRow 
                        key={item._id as Key}
                    >
                        {(columnKey) => (
                            <TableCell
                            >
                                {renderCell(item, columnKey)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default DataTable;
