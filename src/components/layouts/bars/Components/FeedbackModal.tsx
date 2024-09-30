import Typography from '@/components/baseComponents/Typography'
import { Button } from '@/components/baseComponents/Button';
import Textarea from '@/components/baseComponents/Textarea'
import {Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

interface IProps {
    open:boolean
    closeModal: Function
}

const FeedbackModal = (props: IProps) => {
    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="relative z-30" onClose={() => props.closeModal()}>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-700"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-700"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                <Dialog.Panel className='rounded-lg max-w-[512px] w-full bg-white'>
                    <div className='px-5 py-3'>
                        <Typography variant='h2' className='mt-[8px] text-[#4C42D7]'>Feedback & Suggestions</Typography>
                        <div className='mt-4 border-[2px] border-[#4C42D7] w-[100px]'></div>
                    </div>
                    <div className='px-5 py-3 max-h-[80vh] overflow-y-auto'>
                        <div className='my-4'>
                            <Typography variant='body' color='secondary'>
                            We love and encourage feedback and suggestions from our community. Please share your thoughts on what we’ve built so far and what you’d like to see going forward. If you’ve found a bug, please share what you’ve found on the bug form to the right. Thanks in advance!
                            </Typography>
                        </div>
                        <div className='my-4'>
                            <Textarea textareaClassName='h-[150px]'/>
                        </div>
                        <div className='text-right my-4 mt-10'>
                            <Button variant="contained" className='w-[180px]'>Submit</Button>
                        </div>
                    </div>
                </Dialog.Panel>
                </Transition.Child>
            </div>
            </Dialog>
        </Transition.Root>
            
    )
}
export default FeedbackModal;