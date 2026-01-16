// import { ICategoryData } from "@/types/Category";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { Key, ReactNode } from "react";

interface IPropsTypes {
    colums: Record<string, unknown>[];
    data: Record<string, unknown>[];
    renderCell: (
        item: Record<string, unknown>,
        key: Key
    ) => ReactNode;
}

const DataTable: React.FC<IPropsTypes> = (props) => {

    const {
        data,
        colums,
        renderCell
    } = props

    return (
        <Table>
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
                items={data}
            >
                {(item) => (
                    <TableRow
                        key={item._id as Key}
                    >
                        {(columnKey) => (
                            <TableCell>
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