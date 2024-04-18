import TableHeader from "@/components/table-header";
import TablePagination from "@/components/table-pagination";
import CommonTable from "@/components/table";
import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

interface PCategoriesProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[] | undefined;
    isLoading?: boolean;
}

function ProductsDataTable<TData, TValue>({
    columns,
    data,
    isLoading,
}: PCategoriesProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 8,
    });
    const table = useReactTable({
        columns,
        data: data ?? [],
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onPaginationChange: setPagination,
        state: {
            columnFilters,
            pagination,
        },
    });
    return (
        <div>
            {!isLoading || data ? (
                <>
                    <div>
                        <TableHeader table={table} name="Product Name" filterKey="productName" />
                    </div>
                    <CommonTable table={table} />
                    <div className="flex items-center justify-end">
                        <TablePagination table={table} />
                    </div>
                </>
            ) : (
                // Loading Skelton Ui
                <div>Loading...</div>
            )}
        </div>
    );
}

export default ProductsDataTable;
