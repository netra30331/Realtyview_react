import Typography from '@/components/baseComponents/Typography'
import TextField from '@/components/baseComponents/TextField'
import {MdOutlineSearch} from 'react-icons/md'
import company_logo3 from '@/assets/images/company_logo3.svg';
import company_logo4 from '@/assets/images/company_logo4.svg';
import company_logo5 from '@/assets/images/company_logo5.svg';
import company_logo6 from '@/assets/images/company_logo6.svg';
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import XMark from '@/assets/icons/XMark.png'

interface IProps {
    open:boolean
    closeModal: Function
}

const PartnerResourcesDrawer = (props: IProps) => {
    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="relative z-30" onClose={() => props.closeModal()}>
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
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-[675px]">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl px-2">
                                        <div className="px-4 sm:px-6">
                                            <div className="flex items-start justify-between pr-2">
                                                <div className="flex h-3 items-center">
                                                <Typography variant='h2' className='mt-[8px] text-[#4C42D7]'>Partner Resources</Typography>
                                                </div>
                                                <div className="flex h-3 items-center gap-x-3 cursor-pointer">
                                                    <img src={XMark} alt="XMark" onClick={()=>props.closeModal()} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='border-b mt-5'></div>
                                        <div className='px-4 sm:px-[2.5rem] pt-6'>
                                            <div className='relative my-8'>
                                                <MdOutlineSearch className="absolute top-3 left-3 text-[#8E9CB2] z-50"/>
                                                <TextField inputClassName={'pl-8'} name="keyword" placeholder='Search...' />
                                            </div>
                                        
                                            <div className='my-8'>
                                                <div className='flex justify-between mt-8 mb-8'>
                                                    <Typography variant='h3'>Skip Tracing</Typography>
                                                </div>
                                                <div className='md:flex justify-between'>
                                                    <div className='md:w-[40%] w-full py-8'>
                                                        <img className='' src={company_logo3}/>
                                                    </div>
                                                    <div className='md:w-[60%] w-full'>
                                                        <Typography variant='body' color='secondary'>We love and encourage feedback and suggestions from our community. Please share your thoughts on what we’ve built so far and what you’d like to see going forward. If you’ve found a bug, please share what you’ve found on the bug form to the right. Thanks in advance!</Typography>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='my-8'>
                                                <div className='md:flex justify-between mt-8 mb-8'>
                                                    <Typography variant='h3'>Continuing Education</Typography>
                                                </div>
                                                <div className='md:flex justify-between'>
                                                    <div className='md:w-[40%] w-full py-8'>
                                                        <img className='' src={company_logo4}/>
                                                    </div>
                                                    <div className='md:w-[60%] w-full'>
                                                        <Typography variant='body' color='secondary'>We love and encourage feedback and suggestions from our community. Please share your thoughts on what we’ve built so far and what you’d like to see going forward. If you’ve found a bug, please share what you’ve found on the bug form to the right. Thanks in advance!</Typography>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='my-8'>
                                                <div className='flex justify-between mt-8 mb-8'>
                                                    <Typography variant='h3'>Custom IDX Website</Typography>
                                                </div>
                                                <div className='md:flex justify-between'>
                                                    <div className='md:w-[40%] w-full py-8'>
                                                        <img className='' src={company_logo5}/>
                                                    </div>
                                                    <div className='md:w-[60%] w-full'>
                                                        <Typography variant='body' color='secondary'>We love and encourage feedback and suggestions from our community. Please share your thoughts on what we’ve built so far and what you’d like to see going forward. If you’ve found a bug, please share what you’ve found on the bug form to the right. Thanks in advance!</Typography>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='my-8'>
                                                <div className='flex justify-between mt-8 mb-8'>
                                                    <Typography variant='h3'>Foreclosures</Typography>
                                                </div>
                                                <div className='md:flex justify-between'>
                                                    <div className='md:w-[40%] w-full py-8'>
                                                        <img className='' src={company_logo6}/>
                                                    </div>
                                                    <div className='md:w-[60%] w-full'>
                                                        <Typography variant='body' color='secondary'>We love and encourage feedback and suggestions from our community. Please share your thoughts on what we’ve built so far and what you’d like to see going forward. If you’ve found a bug, please share what you’ve found on the bug form to the right. Thanks in advance!</Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>

            </Dialog>
        </Transition.Root>
    )
}
export default PartnerResourcesDrawer;