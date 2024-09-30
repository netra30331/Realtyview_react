import Typography from '@/components/baseComponents/Typography'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import XMark from '@/assets/icons/XMark.png'

interface IProps {
    open:boolean
    closeModal: Function
}

const NotificationDrawer = (props: IProps) => {
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
                                                    <Typography variant='h2' className='mt-[8px]'>Notifications</Typography>
                                                </div>
                                                <div className="flex h-3 items-center gap-x-3 cursor-pointer">
                                                    <img src={XMark} alt="XMark" onClick={()=>props.closeModal()} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='border-b mt-5'></div>
                                        <div className='px-4 sm:px-[2.5rem] pt-6'>
                                            <div className='mb-3'>
                                                <div className='flex justify-between mt-5 mb-3'>
                                                    <Typography variant='h3'>New Offer</Typography>
                                                    <Typography variant='caption'>8/18/2023 4:12PM</Typography>
                                                </div>
                                                <div>
                                                    <Typography variant='caption'>You’ve received a new offer from [Agent Full Name] with [Agent Company Name] on your listing at 123 Main St. Miami, FL 33141. </Typography>
                                                </div>
                                            </div>
                                            <div className='mb-3'>
                                                <div className='flex justify-between mt-5 mb-3'>
                                                    <Typography variant='h3'>New Offer</Typography>
                                                    <Typography variant='caption'>8/18/2023 4:12PM</Typography>
                                                </div>
                                                <div>
                                                    <Typography variant='caption'>You’ve received a new offer from [Agent Full Name] with [Agent Company Name] on your listing at 123 Main St. Miami, FL 33141. </Typography>
                                                </div>
                                            </div>
                                            <div className='mb-3'>
                                                <div className='flex justify-between mt-5 mb-3'>
                                                    <Typography variant='h3'>New Offer</Typography>
                                                    <Typography variant='caption'>8/18/2023 4:12PM</Typography>
                                                </div>
                                                <div>
                                                    <Typography variant='caption'>You’ve received a new offer from [Agent Full Name] with [Agent Company Name] on your listing at 123 Main St. Miami, FL 33141. </Typography>
                                                </div>
                                            </div>
                                            <div className='mb-3'>
                                                <div className='flex justify-between mt-5 mb-3'>
                                                    <Typography variant='h3'>New Offer</Typography>
                                                    <Typography variant='caption'>8/18/2023 4:12PM</Typography>
                                                </div>
                                                <div>
                                                    <Typography variant='caption'>You’ve received a new offer from [Agent Full Name] with [Agent Company Name] on your listing at 123 Main St. Miami, FL 33141. </Typography>
                                                </div>
                                            </div>
                                            <div className='mb-3'>
                                                <div className='flex justify-between mt-5 mb-3'>
                                                    <Typography variant='h3'>New Offer</Typography>
                                                    <Typography variant='caption'>8/18/2023 4:12PM</Typography>
                                                </div>
                                                <div>
                                                    <Typography variant='caption'>You’ve received a new offer from [Agent Full Name] with [Agent Company Name] on your listing at 123 Main St. Miami, FL 33141. </Typography>
                                                </div>
                                            </div>
                                            <div className='mb-3'>
                                                <div className='flex justify-between mt-5 mb-3'>
                                                    <Typography variant='h3'>New Offer</Typography>
                                                    <Typography variant='caption'>8/18/2023 4:12PM</Typography>
                                                </div>
                                                <div>
                                                    <Typography variant='caption'>You’ve received a new offer from [Agent Full Name] with [Agent Company Name] on your listing at 123 Main St. Miami, FL 33141. </Typography>
                                                </div>
                                            </div>
                                            <div className='mb-3'>
                                                <div className='flex justify-between mt-5 mb-3'>
                                                    <Typography variant='h3'>New Offer</Typography>
                                                    <Typography variant='caption'>8/18/2023 4:12PM</Typography>
                                                </div>
                                                <div>
                                                    <Typography variant='caption'>You’ve received a new offer from [Agent Full Name] with [Agent Company Name] on your listing at 123 Main St. Miami, FL 33141. </Typography>
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
export default NotificationDrawer;