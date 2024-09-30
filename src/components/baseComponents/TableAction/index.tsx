// import { Popover, Transition } from "@headlessui/react"

// const TableAction = () => {
//     return (
//         <Popover as="div">
//             <Popover.Button onClick={() => setActiveFovoritePanel(index)} className="flex items-center justify-center">
//                 <img src={datarow.iconStar} className='w-[1rem] h-[1rem] max-w-none' />
//             </Popover.Button>
//             <Transition
//                 as={Fragment}
//                 enter="transition ease-out duration-100"
//                 enterFrom="transform opacity-0 scale-95"
//                 enterTo="transform opacity-100 scale-100"
//                 leave="transition ease-in duration-75"
//                 leaveFrom="transform opacity-100 scale-100"
//                 leaveTo="transform opacity-0 scale-95"
//             >
//                 <div>
//                     {activeFavoritePanel === index && (
//                         <Popover.Panel className="z-50 absolute left-[1.3rem] top-0 w-[8rem] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                             {datarow[field_item.slug]?.map((action_item: any, action_item_index: any) => {
//                                 return (
//                                     <div key={action_item_index} className='cursor-pointer flex hover:bg-neutral-100 rounded-md px-3 py-1' onClick={() => onChangeFavoriteStatus(datarow.id, action_item.name)}>
//                                         {action_item.image}
//                                         <Typography className={`mr-2 ml-2 text-[${action_item.color}]`} variant='caption' color='primary'>{action_item.name}</Typography>
//                                     </div>
//                                 )
//                             })}
//                         </Popover.Panel>
//                     )}
//                 </div>
//             </Transition>
//         </Popover>
//     )
// }