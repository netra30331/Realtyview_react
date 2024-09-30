import Typography from '@/components/baseComponents/Typography'
import { Button } from '@/components/baseComponents/Button';
import Icon from '@/components/baseComponents/IconWrapper';
import verify_img from '@/assets/images/verify_img.svg';
import {Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

interface IProps {
    open:boolean
    closeModal: Function
}

const VerifiedModal = (props: IProps) => {
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
                <Dialog.Panel className='rounded-lg max-w-[800px] w-full bg-white'>
                    <div className='pl-10 py-3'>
                        <div className='flex'>
                            <Typography variant='h2' className='mt-[8px] text-[#4C42D7]'>Get Verified</Typography>
                            <Icon name='protect' width={20} height={20} stroke={'#4C42D7'} className='ml-1'  />
                        </div>
                        <div className='mt-4 border-[2px] border-[#4C42D7] w-[100px]'></div>
                    </div>
                    <div className='pl-10 py-3 max-h-[80vh] overflow-y-auto'>
                        <div className='my-4 md:flex'>
                            <div className='md:w-[60%] w-full py-10 pr-3'>
                                <Typography variant='body' color='secondary'>
                                Getting verified is simple and only takes  2-3 minutes. When you are verified, you’ll display a badge letting your colleagues know that you are in fact a licensed professional which they look for when scheduling showings and evaluating offers.
                                </Typography>
                                <div className='text-cneter my-4 mt-10'>
                                    <a target='_blank' href='="https://verifyonrealtyview.withpersona.com/verify?inquiry-template-id=itmpl_Ma5nCCNBNU7AzudWPeDiCZhY&environment-id=env_PbSr1VcvHiQtWXeb5hhAKTuM'>
                                        <Button variant="contained" className='w-full'>Get Verified</Button>
                                    </a>
                                </div>
                            </div>
                            <div className='md:w-[40%] w-full px-4'>
                                <img className='w-full' src={verify_img}/>
                            </div>
                        </div>
                        
                    </div>
                </Dialog.Panel>
                </Transition.Child>
            </div>
            </Dialog>
        </Transition.Root>
    )
}
export default VerifiedModal;