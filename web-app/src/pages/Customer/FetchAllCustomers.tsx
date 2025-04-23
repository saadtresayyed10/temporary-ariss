import { useEffect, useState } from 'react';
import { getAllCustomers } from '../../api/customerAPI';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    ColumnDef,
    flexRender,
} from '@tanstack/react-table';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { Button } from '../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Input } from '../../components/ui/input';
import { Checkbox } from '../../components/ui/checkbox';
import { Badge } from '../../components/ui/badge';
import { ChevronDown } from 'lucide-react';

type UserType = 'DEALER' | 'TECHNICIAN' | 'BACKOFFICE';

interface CommonFields {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    isApproved: boolean;
    usertype: UserType;
    createdAt: string;
    business_name?: string;
}

interface Dealer extends CommonFields {
    dealer_id: string;
    gstin: string;
}

interface Technician extends CommonFields {
    tech_id: string;
    dealer?: { business_name: string };
}

interface Backoffice extends CommonFields {
    backoffice_id: string;
    dealer?: { business_name: string };
}

type Customer = Dealer | Technician | Backoffice;

const FetchAllCustomers = () => {
    const [data, setData] = useState<Customer[]>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
        createdAt: false, // 👈 Hides "Date" column by default
    });

    useEffect(() => {
        const fetchData = async () => {
            const res: {
                data: {
                    data: {
                        dealers: Dealer[];
                        techs: Technician[];
                        backoffices: Backoffice[];
                    };
                };
            } = await getAllCustomers();

            const { dealers, techs, backoffices } = res.data.data;

            const flatDealers: Customer[] = dealers.map((d) => ({
                ...d,
                business_name: d.business_name,
            }));

            const flatTechs: Customer[] = techs.map((t) => ({
                ...t,
                business_name: t.dealer?.business_name || '',
            }));

            const flatBackoffices: Customer[] = backoffices.map((b) => ({
                ...b,
                business_name: b.dealer?.business_name || '',
            }));

            setData([...flatDealers, ...flatTechs, ...flatBackoffices]);
        };

        fetchData();
    }, []);

    const columns: ColumnDef<Customer>[] = [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'first_name',
            header: 'First Name',
        },
        {
            accessorKey: 'last_name',
            header: 'Last Name',
        },
        {
            accessorKey: 'usertype',
            header: 'User Type',
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'phone',
            header: 'Phone',
        },
        {
            accessorKey: 'business_name',
            header: 'Business Name',
        },
        {
            accessorKey: 'isApproved',
            id: 'isApproved',
            header: 'Approved',
            cell: ({ row }) =>
                row.getValue('isApproved') ? (
                    <Badge className="rounded">Yes</Badge>
                ) : (
                    <Badge className="rounded" variant="outline">
                        No
                    </Badge>
                ),
        },
        {
            accessorKey: 'createdAt',
            id: 'createdAt',
            header: 'Date',
            cell: ({ row }) => new Date(row.getValue('createdAt')).toLocaleDateString(),
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            globalFilter,
            columnVisibility,
        },
        onGlobalFilterChange: setGlobalFilter,
        onColumnVisibilityChange: setColumnVisibility,
    });

    return (
        <div className="space-y-4 p-6 font-work rounded">
            <div className="flex items-center justify-between">
                <Input
                    placeholder="Search customers..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="w-[250px] rounded"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="rounded flex items-center gap-2">
                            Filter <ChevronDown size={16} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px] rounded font-work">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                >
                                    {typeof column.columnDef.header === 'string'
                                        ? column.columnDef.header
                                        : column.id.replace(/_/g, ' ')}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="overflow-auto rounded border">
                <Table className="min-w-[1000px] text-sm">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="px-4 py-2 text-left whitespace-nowrap"
                                        style={{ minWidth: '120px' }}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="px-4 py-2 whitespace-nowrap">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center h-24">
                                    No customers found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default FetchAllCustomers;
