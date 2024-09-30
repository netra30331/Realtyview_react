import React, { Fragment } from 'react'
import Logo from '@/assets/images/logo_black.svg'
import LogoMain from '@/assets/images/logo_main.svg'
import IconWrapper from '@/components/baseComponents/IconWrapper'
import Typography from '@/components/baseComponents/Typography'
import { useNavigate } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import {MdOutlineKeyboardArrowDown} from 'react-icons/md'

interface IProps {
    open: boolean
    changeOpen: Function
}
const SideBar = (props: IProps) => {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = React.useState<string>('')
    const goPage = (page: string) => {
        setCurrentPage(page)
        navigate('/app/'+page)
    }
    const [showListingSubmenu, setShowListingSubmenu] = React.useState<boolean>(false);

    return (
        <div className='bg-[#F5F5F5] min-h-screen fixed'>
            <div className="w-[250px] py-3 px-3 shrink-0 bg-[#F5F5F5] hidden lg:block">
                <img src={Logo} alt="logo" className='scale-[80%]' />
                <div className='mt-16'>
                    <div className={`${currentPage === '' ? 'text-[#294661]' : 'text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]'} flex items-center gap-3 p-2 px-5 rounded-lg cursor-pointer mb-3`} onClick={() => goPage('')}>
                        <IconWrapper name="home" stroke={currentPage === '' ? '#294661' : '#7D8E9F'} />
                        <Typography variant="left-menu">Home</Typography>
                    </div>
                    <div className={`${currentPage === 'leads' ? 'text-[#294661]' : 'text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]'} flex items-center gap-3 p-2 px-5 rounded-lg cursor-pointer mb-3`} onClick={() => goPage('leads')}>
                        <IconWrapper name="leads" stroke={currentPage === 'leads' ? '#294661' : '#7D8E9F'} />
                        <Typography variant="left-menu">Leads</Typography>
                    </div>
                    <div className={`${currentPage === 'clients' ? 'text-[#294661]' : 'text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]'} flex items-center gap-3 p-2 px-5 rounded-lg cursor-pointer mb-3`} onClick={() => goPage('clients')}>
                        <IconWrapper name="clients" stroke={currentPage === 'clients' ? '#294661' : '#7D8E9F'} />
                        <Typography variant="left-menu">Clients</Typography>
                    </div>
                    <div className={`${currentPage.includes('listings') ? 'text-[#294661]' : 'text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]'} flex justify-between p-2 px-5 rounded-lg mb-3 cursor-pointer`} onClick={() => setShowListingSubmenu(!showListingSubmenu)}>
                        <div className='flex items-center gap-3'>
                            <IconWrapper name="listings" stroke={currentPage.includes('listings') ? '#294661' : '#7D8E9F'} />
                            <Typography variant="left-menu">Listings</Typography>
                        </div>
                        <MdOutlineKeyboardArrowDown className="text-[#7D8E9F80] mt-1" />
                    </div>
                    {showListingSubmenu && (
                        <div className='sub-menu-area pl-[3rem]'>
                            <Typography variant="left-menu" className={`${currentPage === 'my-listings' ? 'text-[#294661]' : 'text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]'} cursor-pointer select-none p-2`} onClick={() => goPage('my-listings')}>My Listings</Typography>
                            <Typography variant="left-menu" className={`${currentPage === 'listings/team' ? 'text-[#294661]' : 'text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]'} cursor-pointer select-none p-2`} onClick={() => goPage('listings/team')}>Team Listings</Typography>
                            <Typography variant="left-menu" className={`${currentPage === 'listings/company' ? 'text-[#294661]' : 'text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]'} cursor-pointer select-none p-2`} onClick={() => goPage('listings/company')}>Company Listings</Typography>
                            <Typography variant="left-menu" className={`${currentPage === 'listings' ? 'text-[#294661]' : 'text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]'} cursor-pointer select-none p-2`} onClick={() => goPage('listings')} >Expansive Search</Typography>
                        </div>
                    )}
                    <div className={`${currentPage === 'showings' ? 'text-[#294661]' : 'text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]'} flex items-center gap-3 p-2 px-5 rounded-lg cursor-pointer mb-3`} onClick={() => goPage('showings')}>
                        <IconWrapper name="showings" stroke={currentPage === 'showings' ? '#294661' : '#7D8E9F'} />
                        <Typography variant="left-menu" >Showings</Typography>
                    </div>
                    <div className={`${currentPage === 'offers' ? 'text-[#294661]' : 'text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]'} flex items-center gap-3 p-2 px-5 rounded-lg cursor-pointer mb-3`} onClick={() => goPage('offers')}>
                        <IconWrapper name="offers" stroke={currentPage === 'offers' ? '#294661' : '#7D8E9F'}/>
                        <Typography variant="left-menu" >Offers</Typography>
                    </div>
                </div>
            </div>
            <div className="w-[60px] py-3 shrink-0 bg-[#F5F5F5] hidden md:flex lg:hidden justify-center">
                <div>
                    <img src={LogoMain} alt="logoMain" className='w-[36px] h-[36px] mb-16' />
                    <div className={`${currentPage === '' ? 'text-[#294661]' : 'text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]'} flex justify-center items-center p-1 rounded-lg cursor-pointer mb-3`} onClick={() => goPage('')}>
                        <IconWrapper name="home" stroke={currentPage === '' ? '#294661' : '#7D8E9F'} />
                    </div>
                    <div className={`${currentPage === 'leads' ? 'text-[#294661]' : 'text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]'} flex justify-center items-center p-1 rounded-lg cursor-pointer mb-3`} onClick={() => goPage('leads')}>
                        <IconWrapper name="leads" stroke={currentPage === 'leads' ? '#294661' : '#7D8E9F'} className={`${currentPage === 'leads' ? '' : ''}`} />
                    </div>
                    <div className={`${currentPage === 'clients' ? 'text-[#294661]' : 'text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]'} flex justify-center items-center p-1 rounded-lg cursor-pointer mb-3`} onClick={() => goPage('clients')}>
                        <IconWrapper name="clients" stroke={currentPage === 'clients' ? '#294661' : '#7D8E9F'} className={`${currentPage === 'clients' ? '' : ''}`} />
                    </div>
                    <div className='flex justify-center items-center p-1 rounded-lg mb-3'>
                        <IconWrapper name="listings" stroke='#7D8E9F80' />
                    </div>
                    <div className={`${currentPage === 'showings' ? 'text-[#294661]' : 'text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]'} flex justify-center items-center p-1 rounded-lg cursor-pointer mb-3`} onClick={() => goPage('showings')}>
                        <IconWrapper name="showings"stroke={currentPage === 'showings' ? '#294661' : '#7D8E9F'} className={`${currentPage === 'showings' ? '' : ''}`}/>
                    </div>
                    <div className='flex justify-center items-center p-1 rounded-lg mb-3'>
                        <IconWrapper name="offers" stroke='#7D8E9F80' />
                    </div>
                </div>
            </div>
            {props.open && <div className='bg-[#00000040] h-screen w-full fixed top-0 left-0 z-10'></div>}
            <Transition.Root show={props.open} as={Fragment}>
                <Dialog as="div" className="relative z-10 bg-[#FF0000]" onClose={() => props.changeOpen(false)}>
                    <div className="fixed inset-0" />
                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10 sm:pr-16">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-300"
                                    enterFrom="-translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-300"
                                    leaveFrom="translate-x-0"
                                    leaveTo="-translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-[250px]">
                                        <div className="flex h-full flex-col  bg-white py-6 shadow-xl">
                                            <img src={Logo} alt="logo" className='scale-[80%]' />
                                            <div className='mt-16 px-5'>
                                                <div className={`${currentPage === '' ?  'text-[#294661]' : 'text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]'} flex items-center gap-3 p-2 px-5 rounded-lg cursor-pointer mb-3`} onClick={() => goPage('')}>
                                                    <IconWrapper name="home" stroke={currentPage === '' ? '#294661' : '#7D8E9F'} />
                                                    <Typography variant="left-menu">Home</Typography>
                                                </div>
                                                <div className={`${currentPage === 'leads' ?  'text-[#294661]' : 'text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]'} flex items-center gap-3 p-2 px-5 rounded-lg cursor-pointer mb-3`} onClick={() => goPage('leads')}>
                                                    <IconWrapper name="leads" stroke={currentPage === 'leads' ? '#294661' : '#7D8E9F'} />
                                                    <Typography variant="left-menu">Leads</Typography>
                                                </div>
                                                <div className={`${currentPage === 'clients' ?  'text-[#294661]' : 'text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]'} flex items-center gap-3 p-2 px-5 rounded-lg cursor-pointer mb-3`} onClick={() => goPage('clients')}>
                                                    <IconWrapper name="clients" stroke={currentPage === 'clients' ? '#294661' : '#7D8E9F'} />
                                                    <Typography variant="left-menu">Clients</Typography>
                                                </div>
                                                <div className='flex items-center gap-3 p-2 px-5 rounded-lg mb-3'>
                                                    <IconWrapper name="listings" stroke='#7D8E9F80' />
                                                    <Typography variant="left-menu" >Listings</Typography>
                                                </div>
                                                <div className={`${currentPage === 'showings' ?  'text-[#294661]' : 'text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]'} flex items-center gap-3 p-2 px-5 rounded-lg cursor-pointer mb-3`} onClick={() => goPage('showings')}>
                                                    <IconWrapper name="showings" stroke={currentPage === 'showings' ? '#294661' : '#7D8E9F'}  />
                                                    <Typography variant="left-menu" >Showings</Typography>
                                                </div>
                                                <div className='flex items-center gap-3 p-2 px-5 rounded-lg mb-3'>
                                                    <IconWrapper name="offers" stroke='#7D8E9F80' />
                                                    <Typography variant="left-menu" className='text-[#7D8E9F80] select-none'>Offers</Typography>
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
        </div>
    )
}

export default SideBar