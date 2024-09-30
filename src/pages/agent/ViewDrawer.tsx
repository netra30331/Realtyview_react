import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { IMyInfo } from '@/shared/interfaces/interfaces'
import XMark from '@/assets/icons/x-mark-white.png';
import PhoneSmSVG from '@/assets/icons/phone-1.svg';
import PhoneMdSVG from '@/assets/icons/phone-2.svg';
import MailSmSVG from '@/assets/icons/mail-sm.svg';
import MailMdSVG from '@/assets/icons/mail-md.svg';
import defaultAvatar from '@/assets/images/default_avatar.jpg'
import emptyImage from '@/assets/images/empty.png'
import defaultCoverPhoto from '@/assets/images/default_agent_cover_photo.jpg'
import Typography from "@/components/baseComponents/Typography"
import { useAppSelector } from '@/redux/hooks'
import { getUser } from '@/redux/user/userSlice'

type IProps = {
    open: boolean
    changeViewDrawer: Function
    data: IMyInfo
};

const ViewDrawer = (props: IProps) => {
	const navigate = useNavigate()
	const user = useAppSelector(getUser)
    const { data } = props
	const isCurrentUser = user.agent?.memberID === data.memberID;
	const licenseDate = data.licenseDate ? new Date(data.licenseDate).toLocaleDateString() : ''
	const licenseExpiration = data.licenseExpiration ? new Date(data.licenseExpiration).toLocaleDateString() : ''
	const localAssociations = data.localAssociations ? data.localAssociations.join(', ') : ''
	const stateAssociations = data.stateAssociations ? data.stateAssociations.join(', ') : ''
	const mlsAssociations = data.mlsAssociations ? data.mlsAssociations.join(', ') : ''
    
    React.useEffect(() => {
        // setViewValues(initialData);
        setTimeout(() => {
            const main_body = document.getElementById('view_drawer');
            if (main_body){
                main_body.scrollTop = 0;
            }
        }, 500);
    }, [props.open]);

    return (
        <>
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={() => props.changeViewDrawer(false)}>
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
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-[650px]">
									<div className="grid h-full overflow-y-auto bg-white py-0 px-0 shadow-xl" id="view_drawer">
										<div className="relative bg-cover bg-center bg-image w-full h-[17.125rem]" style={{ backgroundImage: "url('" + ((data.coverPhotoURL !== undefined && data.coverPhotoURL !== '') ? data.coverPhotoURL : defaultCoverPhoto)  + "')" }}>
											<img src={XMark} alt="XMark" className="absolute w-4 h-4 top-8 right-8 cursor-pointer" onClick={()=>props.changeViewDrawer(false)} />
											<div className='absolute bottom-2.5 right-3.5 flex flex-row'>
												{isCurrentUser && (
													<Typography variant='body' className='text-white leading-[20px] px-1 mr-4 cursor-pointer' onClick={() => navigate('/app/profile/info')}>Edit Profile</Typography>
												)}
												{data.memberID && (
													<Typography variant="body" className="flex items-center leading-[20px] rounded-[3px] px-2.5 text-[#FFFFFF] bg-[#D9D9D9]/50">
														{"Member " + data.memberID}
													</Typography>
												)}
											</div>
										</div>
										<div className="personal-info mx-8 mb-24">
											<div className="flex justify-between mb-12">
												<div className="image-and-name w-1/2 md:w-1/3 -mt-14 z-10">
													<img src={(data.avatarURL !== undefined && data.avatarURL !== '') ? data.avatarURL : defaultAvatar} className="w-28 h-28 mb-2 rounded-full border-2 border-white"/>
													{(data.firstName || data.lastName) && (
														<Typography variant="h2" className='my-2 text-[#4C42D7]'>{data.firstName + ' ' + data.lastName}</Typography>
													)}
													{(data.licenseState || data.licenseType) && (
														<Typography variant="body" className='rounded-sm w-fit px-2 my-2 text-[#5C6770] bg-[#D9D9D9] bg-opacity-50'>{(data.licenseState ?? '') + ' ' +(data.licenseType ?? '')}</Typography>
													)}
												</div>
												{data.company && (
													<div className="company-info w-1/2 md:w-4/7 ml-8 flex items-center">
														<div className="company-logo">
															<img src={(data.company.businessLogo !== undefined && data.company.businessLogo !== '') ? data.company.businessLogo : emptyImage} className='w-[4.5rem] max-w-none h-[4.5rem]'/>
														</div>
														<div className="company-contact-info ml-3.5">
															{data.company.businessName && (
																<Typography variant='h4' className='font-montserrat text-[15px] font-medium leading-5 text-blue-900 leading-trim'>{data.company?.businessName}</Typography>
															)}
															{data.company.principalBrokerPhone && (
																<div className='flex flex-row py-1'>
																	<img src={PhoneSmSVG} className='text=[#4C42D7] mr-1'/>
																	<Typography variant='body' className='font-open-sans text-[12px] font-normal leading-5 text-[#8E9CB2] leading-trim'>{data.company?.principalBrokerPhone}</Typography>
																</div>
															)}
															{data.company.principalBrokerEmail && (
																<div className='flex flex-row py-1'>
																	<img src={MailSmSVG} className='text=[#4C42D7] mr-1'/>
																	<Typography variant='body' className='font-open-sans text-[12px] font-normal leading-5 text-[#8E9CB2] leading-trim'>{data.company?.principalBrokerEmail}</Typography>
																</div>
															)}
														</div>
													</div>
												)}
											</div>
											<div className='flex'>
												{data.description && (
													<div className='about-me w-2/3'>
														<Typography variant='body' className='font-open-sans mb-4 text-xs font-normal leading-5 text-[#8E9CB2] leading-trim'>{'About ' + data.firstName}</Typography>
														<Typography variant='body' className='font-open-sans text-sm font-normal leading-6 text-[#191E3B]'>{data.description}</Typography>
													</div>
												)}
												<div className='personal-contact-info x-1/3 pl-6 pt-8'>
													{data.mobileNumber && (
														<div className='phone flex flex-row py-4'>
															<img src={PhoneMdSVG} className='text-black mr-6'/>
															<Typography variant='body'>{data.mobileNumber}</Typography>
														</div>
													)}
													{data.contactEmail && (
														<div className='email flex flex-row'>
															<img src={MailMdSVG} className='text-black mr-6'/>
															<Typography variant='body'>{data.contactEmail}</Typography>
														</div>
													)}
													
												</div>
											</div>
										</div>
										{(data.licenseNumber || data.licenseState || data.licenseType || data.licenseDate || data.licenseExpiration) && (
											<div className='lisence-detail mx-8 pb-4 border-b border-[#182952]/40'>
												<Typography className='font-montserrat text-[25px] mb-5 font-semibold leading-8 text-primary'>
													License Details
												</Typography>
												<div className='w-full md:w-3/4'>
													{data.licenseNumber && (
														<div className='flex flex-col mb-10'>
															<Typography className='text-[#8E9CB2] mb-2.5'>License Number</Typography>
															<Typography className=''>{data.licenseNumber}</Typography>
														</div>
													)}
													<div className='grid grid-cols-2 gap-4'>
														{data.licenseState && (
															<div className='flex flex-col mb-10'>
																<Typography className='text-[#8E9CB2] mb-2.5'>License State</Typography>
																<Typography className=''>{data.licenseState}</Typography>
															</div>
														)}
														{data.licenseType && (
															<div className='flex flex-col mb-10'>
																<Typography className='text-[#8E9CB2] mb-2.5'>License Type</Typography>
																<Typography className=''>{data.licenseType}</Typography>
															</div>
														)}
														{data.licenseDate && (
															<div className='flex flex-col mb-10'>
																<Typography className='text-[#8E9CB2] mb-2.5'>License Date</Typography>
																<Typography className=''>{licenseDate}</Typography>
															</div>
														)}
														{data.licenseExpiration && (
															<div className='flex flex-col mb-10'>
																<Typography className='text-[#8E9CB2] mb-2.5'>License Expiration</Typography>
																<Typography className=''>{licenseExpiration}</Typography>
															</div>
														)}
													</div>
												</div>
											</div>
										)}
										{(data.localAssociations?.length > 0 || data.stateAssociations?.length > 0 || data.mlsAssociations?.length > 0) && (
											<div className='associations mx-8 mt-12 pb-4 border-b border-[#182952]/40'>
												<Typography className='font-montserrat text-[25px] mb-5 font-semibold leading-8 text-primary'>
													Associations
												</Typography>
												<div className='w-full'>
													{data.localAssociations?.length > 0 && (
														<div className='flex flex-col mb-9'>
															<Typography className='text-[#8E9CB2] mb-2.5'>Local Associations</Typography>
															<Typography className=''>{localAssociations}</Typography>
														</div>
													)}
													{data.stateAssociations?.length > 0 && (
														<div className='flex flex-col mb-9'>
															<Typography className='text-[#8E9CB2] mb-2.5'>State Associations</Typography>
															<Typography className=''>{stateAssociations}</Typography>
														</div>
													)}
													{data.mlsAssociations?.length > 0 && (
														<div className='flex flex-col'>
															<Typography className='text-[#8E9CB2] mb-2.5'>MLS Associations</Typography>
															<Typography className=''>{mlsAssociations}</Typography>
														</div>
													)}
												</div>
											</div>
										)}
										{data.serviceAreas?.length > 0 && (
											<div className='serviced-areas mx-8 mt-12 pb-10 border-b border-[#182952]/40'>
												<Typography className='font-montserrat text-[25px] mb-5 font-semibold leading-8 text-primary'>
													Serviced Areas
												</Typography>
												<div className='w-full'>
													<div className='flex mb-6 flex-wrap'>
														{data.serviceAreas.map((area: string) => {
															return (
																<Typography className='text-[#191E3B] text-center mr-5 mb-8 w-[15rem]'>{area}</Typography>
															)
														})}
													</div>
												</div>
											</div>
										)}
										{(data.instagram || data.facebook || data.tiktok || data.linkedin || data.youtube) && (
											<div className='social-profiles mx-8 mt-12 pb-8 border-b border-[#182952]/40'>
												<Typography className='font-montserrat text-[25px] mb-5 font-semibold leading-8 text-primary'>
													Social Profiles
												</Typography>
												<div className='w-full'>
													{data.instagram && (
														<div className='flex mb-2.5'>
															<Typography className='font-montserrat w-1/4 text-[#8E9CB2]'>Instagram</Typography>
															<Typography className='font-open-sans w-1/5 text-[#191E3B]'>{data.instagram}</Typography>
														</div>
													)}
													{data.facebook && (
														<div className='flex mb-2.5'>
															<Typography className='font-montserrat w-1/4 text-[#8E9CB2]'>Facebook</Typography>
															<Typography className='font-open-sans w-1/5 text-[#191E3B]'>{data.facebook}</Typography>
														</div>
													)}
													{data.tiktok && (
														<div className='flex mb-2.5'>
															<Typography className='font-montserrat w-1/4 text-[#8E9CB2]'>TikTok</Typography>
															<Typography className='font-open-sans w-1/5 text-[#191E3B]'>{data.tiktok}</Typography>
														</div>
													)}
													{data.linkedin && (
														<div className='flex mb-2.5'>
															<Typography className='font-montserrat w-1/4 text-[#8E9CB2]'>LinkedIn</Typography>
															<Typography className='font-open-sans w-1/5 text-[#191E3B]'>{data.linkedin}</Typography>
														</div>
													)}
													{data.youtube && (
														<div className='flex'>
															<Typography className='font-montserrat w-1/4 text-[#8E9CB2]'>YouTube</Typography>
															<Typography className='font-open-sans w-1/5 text-[#191E3B]'>{data.youtube}</Typography>
														</div>
													)}
												</div>
											</div>
										)}
										{(data.zillow || data.homes || data.realtor || data.ratemyagent) && (
											<div className='professional-profiles mx-8 mt-12 pb-8'>
												<Typography className='font-montserrat text-[25px] mb-5 font-semibold leading-8 text-primary'>
													Professional Profiles
												</Typography>
												<div className='w-full'>
													{data.zillow && (
														<div className='flex mb-2.5'>
															<Typography className='font-montserrat w-1/4 text-[#8E9CB2]'>Zillow</Typography>
															<Typography className='font-open-sans w-1/5 text-[#191E3B]'>{data.zillow}</Typography>
														</div>
													)}
													{data.homes && (
														<div className='flex mb-2.5'>
															<Typography className='font-montserrat w-1/4 text-[#8E9CB2]'>Homes.com</Typography>
															<Typography className='font-open-sans w-1/5 text-[#191E3B]'>{data.homes}</Typography>
														</div>
													)}
													{data.realtor && (
														<div className='flex mb-2.5'>
															<Typography className='font-montserrat w-1/4 text-[#8E9CB2]'>Realtor.com</Typography>
															<Typography className='font-open-sans w-1/5 text-[#191E3B]'>{data.realtor}</Typography>
														</div>
													)}
													{data.ratemyagent && (
														<div className='flex'>
															<Typography className='font-montserrat w-1/4 text-[#8E9CB2]'>RateMyAgent</Typography>
															<Typography className='font-open-sans w-1/5 text-[#191E3B]'>{data.ratemyagent}</Typography>
														</div>
													)}
												</div>
											</div>
										)}
										{/* <div className='professional-profiles mx-8 mt-10 pb-8'>
											<Typography className='font-montserrat text-[25px] mb-5 font-semibold leading-8 text-primary'>
												Contact
											</Typography>
											<div className='w-full mb-6'>
												<Textarea textareaClassName='h-[9.375rem]'/>
											</div>
											<Button className='flex justify-center items-center float-right w-30 h-9 bg-[#4C42D7]'>
												<Typography className='font-montserrat text-white font-semibold'>Send Message</Typography>
											</Button>
										</div> */}
									</div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
        </>
    )
}

export default ViewDrawer
