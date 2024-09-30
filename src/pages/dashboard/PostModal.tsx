import { Fragment } from 'react'
import Typography from '@/components/baseComponents/Typography'
import { Dialog, Transition } from '@headlessui/react'
import { IPost } from '@/shared/interfaces/interfaces'
import XMark from '@/assets/icons/XMark.png'

interface IProps {
    open: boolean
    closeModal: Function
    value: IPost
}

const PostModal = (props: IProps) => {
    const closeModal = props.closeModal

    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="relative z-30" onClose={() => props.closeModal()}>
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <Dialog.Panel className='rounded-lg max-w-[800px] w-full bg-white'>
                        <div className='px-10 py-3'>
                            <div className='flex justify-between items-center'>
                                <Typography variant='h2' className='mt-[8px] text-[#4C42D7]'>Preview</Typography>
                                <img src={XMark} alt="XMark" className='cursor-pointer w-4 h-4' onClick={() => closeModal()} />
                            </div>
                            <div className='px-4 border-[1px] border-[#4C42D7] w-full'></div>
                        </div>
                        <div className='flex flex-col gap-4 px-16 py-3 h-[70vh] overflow-y-auto'>
                            <Typography variant='h3'>{props.value?.postTitle}</Typography>
                            <Typography variant='body'>{props.value?.postContent}</Typography>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
export default PostModal;