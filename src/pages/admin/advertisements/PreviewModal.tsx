import { Fragment } from 'react'
import Typography from '@/components/baseComponents/Typography'
import { Button } from '@/components/baseComponents/Button';
import { Dialog, Transition } from '@headlessui/react'
import { IAdvertisement } from '@/shared/interfaces/interfaces'
import defaultBackground from '@/assets/images/event_background.png'
import XMark from '@/assets/icons/XMark.png'
import WhiteXMark from '@/assets/icons/x-mark-white.png'

interface IProps {
    open: boolean
    closeModal: Function
    value: IAdvertisement
}

const PreviewModal = (props: IProps) => {
    const closeModal = props.closeModal
    const handleNavigate = (url: string) => {
        window.open(url, "_blank")
    };

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
                        <div className='flex items-center justify-center px-16 py-3 w-full h-[70vh] overflow-y-auto'>
                            <div className="relative flex flex-col justify-between w-[400px] h-[400px] bg-cover bg-center bg-image rounded-md p-8 mb-6" style={{ backgroundImage: "url('" + (props.value?.adImageURL && props.value.adImageURL !== '' ? props.value.adImageURL : defaultBackground)  + "')" }}>
                                {props.value?.adMute === 1 && (
                                    <img src={WhiteXMark} alt="XMark" className="absolute w-3 h-3 top-3 right-3 cursor-pointer" />
                                )}
                                <Typography variant='h3' color='white' className='mb-6'>{props.value.adTitle}</Typography>
                                <Typography variant='h4' color='white' className='mb-2'>{props.value.adContent}</Typography>
                                <div className='w-full flex items-center justify-center'>
                                    <Button className='w-[8rem]' onClick={() => handleNavigate(props.value.adLinkURL)}>
                                        <Typography variant='button1'>{props.value.adButtonLabel !== undefined && props.value.adButtonLabel !== '' ? props.value.adButtonLabel : 'RSVP' }</Typography>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
export default PreviewModal;