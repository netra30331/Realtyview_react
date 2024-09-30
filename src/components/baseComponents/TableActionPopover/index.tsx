import { Fragment } from 'react';
import { Transition, Menu } from '@headlessui/react';
import Typography from '@/components/baseComponents/Typography';
import Pencil from '@/assets/icons/pencil.svg'
import VerticalDots from '@/assets/icons/dot_vertical.png'
import RecycleBin from '@/assets/images/recylebin.svg'

type IAdditionalActionProps = {
    text: string
    icon: React.ReactNode
    function: Function
    textClassName?: string
}

type ITableActionPopoverProps = {
    data?: any
    onEdit?: Function
    onArchive?: Function
    additionalActions?: Array<IAdditionalActionProps>
}

const TableActionPopover = ({
    data,
    onEdit,
    onArchive,
    additionalActions
}: ITableActionPopoverProps) => {

    return (
        <>
            <div className="relative text-right z-20">
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="mt-2 px-3">
                            <img src={VerticalDots} alt="Vertical Dots" width={4} />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-7 top-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="px- py-0">
                                {onEdit && (
                                    <Menu.Item>
                                        <div className='pl-3 pr-8 py-2 flex gap-3 items-center cursor-pointer hover:bg-gray-300' onClick={() => onEdit(data)}>
                                            <Typography variant='button2'>Edit</Typography>
                                            <img src={Pencil} alt="Pencil" className='pl-[2px] mb-[2px] w-[14px]' />
                                        </div>
                                    </Menu.Item>
                                )}
                                {onArchive && (
                                    <Menu.Item>
                                        <div className='pl-3 pr-8 py-2 flex gap-3 items-center cursor-pointer hover:bg-gray-300' onClick={() => onArchive(data)}>
                                            <Typography variant='button2' className='text-[#C77E90]'>Archive</Typography>
                                            <img src={RecycleBin} alt="recyclebin" className='pl-[2px] w-[15px]' />
                                        </div>
                                    </Menu.Item>
                                )}
                                {additionalActions && additionalActions.length > 0 && additionalActions.map((action, index) => {
                                    return (
                                        <Menu.Item>
                                            <div key={index} className='pl-3 pr-8 py-2 flex gap-3 items-center cursor-pointer hover:bg-gray-300' onClick={() => action.function(data)}>
                                                <Typography variant='button2' className={action.textClassName}>{action.text}</Typography> {action.icon}
                                            </div>
                                        </Menu.Item>
                                    )
                                })}
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </>
    );
};
export default TableActionPopover;
