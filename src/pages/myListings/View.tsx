import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Preview from './common/Preview'
import { XMarkIcon } from '@heroicons/react/24/outline'
import StarEmpty from '@/assets/icons/star-uncontacted.png'
import StarFilled from '@/assets/icons/star-high-priority.png'
import Scrollbars from 'react-custom-scrollbars'
import TableActionPopover from '@/components/baseComponents/TableActionPopover'

type IProps = {
    open: boolean
    changeState: Function
    data: any
    setAsFavorite?: Function
    onEdit?: Function
    onArchive?: Function
}
const View = (props: IProps) => {

    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="relative z-30" onClose={() => props.changeState(false)}>
                <div className="fixed inset-0" />
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-300"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-300"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-[600px]">
                                    <div className="flex h-full flex-col bg-white shadow-xl">
                                        <div className='fixed w-full bg-white z-30 pt-5'>
                                            <div className="px-4 sm:px-6 w-full bg-white">
                                                <div className="flex items-start justify-between">
                                                    <Dialog.Title className="text-[25px] font-medium truncate w-80 text-indigo-600">{props.data?.listingAddress || "View Listing"}</Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center gap-3">
                                                        <button
                                                            onClick={() => props.setAsFavorite && props.setAsFavorite(props.data?._id, props.data?.isFavorite === 0 ? 1 : 0)}
                                                            type="button"
                                                            className="relative rounded-md bg-white text-gray-400 hover:text-[#6DA172] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 px-1"
                                                        >
                                                            {props.data?.isFavorite ? <img src={StarFilled} alt="Star" width={18} /> : <img src={StarEmpty} alt="Star" width={18} />}
                                                        </button>
                                                        {/* <button
                                                            type="button"
                                                            className="relative rounded-md bg-white text-gray-400 hover:text-[#6DA172] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 px-1"
                                                        >
                                                            <img src={Note} alt="Note" width={15} />
                                                        </button> */}
                                                        <TableActionPopover data={props.data} onEdit={props.onEdit} onArchive={props.onArchive} />
                                                        <button
                                                            type="button"
                                                            className="relative rounded-md bg-white text-gray-400 hover:text-[#C84156] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                            onClick={() => props.changeState(false)}
                                                        >
                                                            <span className="absolute -inset-2.5" />
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='border-t mt-16'></div>
                                        <Scrollbars autoHide className="h-full scroll-smooth">
                                            <Preview data={props.data} isPublished={true} />
                                        </Scrollbars>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root >
    )
}

export default View
