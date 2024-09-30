// import React from 'react'
// import { IMyListing } from '@/shared/interfaces/interfaces'

// import {
//     useReactTable,
//     getCoreRowModel,
//     getFilteredRowModel,
//     getFacetedRowModel,
//     getFacetedUniqueValues,
//     getFacetedMinMaxValues,
//     getPaginationRowModel,
//     getSortedRowModel,
//     ColumnDef,
//     flexRender,
//     sortingFns,
//     SortingFn,
//     FilterFn
// } from '@tanstack/react-table'

// import {
//     RankingInfo,
//     compareItems,
//     rankItem,
// } from '@tanstack/match-sorter-utils'
// import Typography from '@/components/baseComponents/Typography'
// import { TbCaretUpFilled, TbCaretDownFilled } from "react-icons/tb";
// import Pagination from './Pagination'

// declare module '@tanstack/table-core' {
//     interface FilterFns {
//         fuzzy: FilterFn<unknown>
//     }
//     interface FilterMeta {
//         itemRank: RankingInfo
//     }
// }

// type ITableProps = {
//     data: IMyListing[]
//     columns: ColumnDef<IMyListing>[]
//     onRowClick: Function
// }

// const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
//     // Rank the item
//     const itemRank = rankItem(row.getValue(columnId), value)

//     // Store the itemRank info
//     addMeta({
//         itemRank,
//     })

//     // Return if the item should be filtered in/out
//     return itemRank.passed
// }

// const fuzzySort: SortingFn<any> = (rowA: any, rowB: any, columnId) => {
//     let dir = 0

//     // Only sort by rank if the column has ranking information
//     if (rowA.columnFiltersMeta[columnId]) {
//         dir = compareItems(
//             rowA.columnFiltersMeta[columnId]?.itemRank!,
//             rowB.columnFiltersMeta[columnId]?.itemRank!
//         )
//     }

//     // Provide an alphanumeric fallback for when the item ranks are equal
//     return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
// }

// const DebouncedInput = ({
//     value: initialValue,
//     onChange,
//     debounce = 500,
//     ...props
// }: {
//     value: string | number
//     onChange: (value: string | number) => void
//     debounce?: number
// } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
//     const [value, setValue] = React.useState(initialValue)

//     React.useEffect(() => {
//         setValue(initialValue)
//     }, [initialValue])

//     React.useEffect(() => {
//         const timeout = setTimeout(() => {
//             onChange(value)
//         }, debounce)

//         return () => clearTimeout(timeout)
//     }, [value])

//     return (
//         <input {...props} value={value} onChange={e => setValue(e.target.value)} />
//     )
// }

// const ReactTable = ({
//     data,
//     columns,
//     onRowClick
// }: ITableProps) => {

//     const [globalFilter, setGlobalFilter] = React.useState('')

//     const table = useReactTable({
//         data,
//         columns,
//         initialState: {
//             pagination: {
//                 pageSize: 1
//             }
//         },
//         filterFns: {
//             fuzzy: fuzzyFilter,
//         },
//         sortingFns: {
//             fuzzy: fuzzySort
//         },
//         state: {
//             globalFilter,
//         },
//         enableColumnResizing: true,
//         columnResizeMode: 'onChange',
//         globalFilterFn: fuzzyFilter,
//         onGlobalFilterChange: setGlobalFilter,
//         getCoreRowModel: getCoreRowModel(),
//         getFilteredRowModel: getFilteredRowModel(),
//         getSortedRowModel: getSortedRowModel(),
//         getPaginationRowModel: getPaginationRowModel(),
//         getFacetedRowModel: getFacetedRowModel(),
//         getFacetedUniqueValues: getFacetedUniqueValues(),
//         getFacetedMinMaxValues: getFacetedMinMaxValues(),
//         debugTable: true,
//         debugHeaders: true,
//         debugColumns: true,
//     })

//     React.useEffect(() => {
//         if (table.getState().columnFilters[0]?.id === 'fullName') {
//             if (table.getState().sorting[0]?.id !== 'fullName') {
//                 table.setSorting([{ id: 'fullName', desc: false }])
//             }
//         }
//     }, [table.getState().columnFilters[0]?.id])

//     return (
//         <div className="bg-white p-8 pb-0 block max-w-full">
//             <div>
//                 <DebouncedInput
//                     value={globalFilter ?? ''}
//                     onChange={value => setGlobalFilter(String(value))}
//                     className="p-2 font-lg shadow border border-block hidden"
//                     placeholder="Search all columns..."
//                 />
//             </div>
//             <table className='w-full'>
//                 <thead>
//                     {table.getHeaderGroups().map(headerGroup => (
//                         <tr key={headerGroup.id}>
//                             {headerGroup.headers.map(header => {
//                                 return (
//                                     <th
//                                         key={header.id}
//                                         colSpan={header.colSpan}
//                                         style={{ width: header.getSize() }}
//                                         className='relative text-start px-2'
//                                     >
//                                         <div
//                                             {...{
//                                                 className: header.column.getCanSort()
//                                                     ? 'flex items-center gap-2 cursor-pointer select-none z-0'
//                                                     : '',
//                                                 onClick: header.column.getToggleSortingHandler(),
//                                             }}
//                                         >
//                                             {flexRender(
//                                                 header.column.columnDef.header,
//                                                 header.getContext()
//                                             )}
//                                             {{
//                                                 asc: <TbCaretUpFilled className='text-[#4C42D7]' />,
//                                                 desc: <TbCaretDownFilled className='text-[#4C42D7]' />,
//                                             }[header.column.getIsSorted() as string] ?? null}
//                                         </div>
//                                         {header.column.getCanResize() && (
//                                             <div
//                                                 onMouseDown={header.getResizeHandler()}
//                                                 onTouchStart={header.getResizeHandler()}
//                                                 className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''
//                                                     }`}
//                                             ></div>
//                                         )}
//                                     </th>
//                                 )
//                             })}
//                         </tr>
//                     ))}
//                 </thead>
//                 <tbody>
//                     {table.getRowModel().rows.map(row => {
//                         return (
//                             <tr key={row.id} className='hover:bg-gray-200 cursor-pointer'>
//                                 {row.getVisibleCells().map(cell => {
//                                     return (
//                                         <td key={cell.id} className='text-start p-3' onClick={() => !cell.id.includes('action') && onRowClick(row.original)}>
//                                             {flexRender(
//                                                 cell.column.columnDef.cell,
//                                                 cell.getContext()
//                                             )}
//                                         </td>
//                                     )
//                                 })}
//                             </tr>
//                         )
//                     })}
//                 </tbody>
//             </table>
//             <div className="flex justify-between items-center border-t-1 p-3">
//                 <Typography variant='medium-text' color='secondary'>
//                     {(table.getState().pagination.pageIndex * table.getState().pagination.pageSize) + 1} to {(table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize} of {table.getPrePaginationRowModel().rows.length} results
//                 </Typography>
                
//                 <Pagination
//                     gotoPage={table.setPageIndex}
//                     length={data.length}
//                     pageSize={table.getState().pagination.pageSize}
//                     setPageSize={table.setPageSize}
//                 />
//             </div>
//         </div>
//     )
// }

// export default ReactTable