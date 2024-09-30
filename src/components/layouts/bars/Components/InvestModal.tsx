import Typography from '@/components/baseComponents/Typography'
import { Button } from '@/components/baseComponents/Button';
import {Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

interface IProps {
    open:boolean
    closeModal: Function
}

const InvestModal = (props: IProps) => {
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
                        <Typography variant='h2' className='mt-[8px] text-[#4C42D7]'>Invest in RealtyView</Typography>
                        <div className='mt-4 border-[2px] border-[#4C42D7] w-[100px]'></div>
                    </div>
                    <div className='px-5 py-3 max-h-[80vh] overflow-y-auto'>
                        <div className='my-4'>
                            <Typography variant='body' color='secondary'>
                            <p>We’re thrilled to serve the Agent & Broker community and want to continue building the ultimate all-in-one platform created by Agents with guidance from Realtors like you. We will never charge for our core features but plan to add hundreds of add-ons that serve the unique needs of each Realtor. We believe in community and prefer that the shareholders we serve are Real Estate professionals like you.</p><br/>
                            <p>We’re currently only accepting investments in RealtyView from the Agent  community to avoid pressure from outside investors. </p><br/>
                            <p>We encourage you to learn more and consider becoming a shareholder of RealtyView.</p>
                            </Typography>
                        </div>
                        <div className='text-center my-4 mt-10'>
                            <a target='_blank' href="https://calendly.com/realtyview/interview">
                                <Button variant="outlined" className='w-[180px] mr-4 !text-[#4C42D7] !border-[#4C42D7]'>
                                    <Typography variant='button2'>Meet with the CEO</Typography>
                                </Button>
                            </a>
                            <a target='_blank' href="https://wefunder.com/realtyview">
                                <Button variant="contained" className='w-[180px]'>Learn More</Button>
                            </a>
                        </div>
                    </div>
                </Dialog.Panel>
                </Transition.Child>
            </div>
            </Dialog>
        </Transition.Root>
    )
}
export default InvestModal;