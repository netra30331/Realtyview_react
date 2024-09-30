import React, { Fragment } from 'react'
import Logo from '@/assets/images/logo_black.svg'
import LogoMain from '@/assets/images/logo_main.svg'
import IconWrapper from '@/components/baseComponents/IconWrapper'
import Typography from '@/components/baseComponents/Typography'
import { useNavigate } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

interface IProps {
    open: boolean
    changeOpen: Function
}

const UserSidebar = (props: IProps) => {

    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = React.useState<string>('')
    const [showRelationshipsSubmenu, setShowRelationshipsSubmenu] = React.useState<boolean>(false);
    const [showListingSubmenu, setShowListingSubmenu] = React.useState<boolean>(false);
    const [showRealStateBrokersSubmenu, setShowRealStateBrokersSubmenu] = React.useState<boolean>(false);
    const [showDirectorySubmenu, setShowDirectorySubmenu] = React.useState<boolean>(false);
    const goPage = (page: string) => {
        setCurrentPage(page)
        navigate('/app/' + page)
    }

    return (
        <>
            <div className="py-3 pt-1 pb-8 shrink-0 hidden lg:block">
                <img src={Logo} alt="Logo" className='scale-[80%]' />
                <div className='mt-[50px] px-5'>
                    <div className={`${currentPage === '' ? 'text-primary' : 'text-secondary hover:text-primary hover:stroke-primary'} cursor-pointer px-6`} onClick={() => goPage('')}>
                        <Typography variant="left-menu">Home</Typography>
                    </div>
                    <div className={`${currentPage === 'dashboard' ? 'text-primary' : 'text-secondary hover:text-primary hover:stroke-primary'} cursor-pointer px-6 mt-4`} onClick={() => goPage('dashboard')}>
                        <Typography variant="left-menu">Dashboard</Typography>
                    </div>
                    <div className='mt-4 pl-3'>
                        <Typography color='secondary' className='uppercase font-bold text-10 select-none'>Workspace</Typography>
                        <div className='mt-2 pl-3'>
                            <div className={`${currentPage.includes('leads') || currentPage.includes('clients') ? 'text-[#294661]' : 'text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]'} flex justify-between cursor-pointer mt-4`} onClick={() => setShowRelationshipsSubmenu(!showRelationshipsSubmenu)}>
                                <Typography variant="left-menu">Relationships</Typography>
                                <MdOutlineKeyboardArrowDown className='mt-1' />
                            </div>
                            {showRelationshipsSubmenu && (
                                <div className='sub-menu-area pl-3 ml-1 border-l-2 border-[#E6E6E6]'>
                                    <div className={`${currentPage === 'leads' ? 'text-primary' : 'text-secondary hover:text-primary hover:stroke-primary'} cursor-pointer mt-2 pt-2`} onClick={() => goPage('leads')}>
                                        <Typography variant="left-menu">Leads</Typography>
                                    </div>
                                    <div className={`${currentPage === 'clients' ? 'text-primary' : 'text-secondary hover:text-primary hover:stroke-primary'} cursor-pointer mt-4 pb-2`} onClick={() => goPage('clients')}>
                                        <Typography variant="left-menu">Clients</Typography>
                                    </div>
                                </div>
                            )}
                            <div className={`${currentPage.includes('listings') ? 'text-[#294661]' : 'text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]'} flex justify-between cursor-pointer mt-4`} onClick={() => setShowListingSubmenu(!showListingSubmenu)}>
                                <Typography variant="left-menu">Listings</Typography>
                                <MdOutlineKeyboardArrowDown className='mt-1' />
                            </div>
                            {showListingSubmenu && (
                                <div className='sub-menu-area pl-3 ml-1 border-l-2 border-[#E6E6E6]'>
                                    <div className={`${currentPage === 'my-listings' ? 'text-primary' : 'text-secondary hover:text-primary hover:stroke-primary'} cursor-pointer mt-2 pt-2`} onClick={() => goPage('my-listings')}>
                                        <Typography variant="left-menu">My Listings</Typography>
                                    </div>
                                    <div className={`${currentPage === 'listings/team' ? 'text-primary' : 'text-secondary hover:text-primary hover:stroke-primary'} cursor-pointer mt-4`} onClick={() => goPage('listings/team')}>
                                        <Typography variant="left-menu">Team Listings</Typography>
                                    </div>
                                    <div className={`${currentPage === 'listings/company' ? 'text-primary' : 'text-secondary hover:text-primary hover:stroke-primary'} cursor-pointer mt-4`} onClick={() => goPage('listings/company')}>
                                        <Typography variant="left-menu">Company Listings</Typography>
                                    </div>
                                    <div className={`${currentPage === 'listings' ? 'text-primary' : 'text-secondary hover:text-primary hover:stroke-primary'} cursor-pointer mt-2 py-2`} onClick={() => goPage('listings')}>
                                        <Typography variant="left-menu">Expansive Search</Typography>
                                    </div>
                                </div>
                            )}
                            <div className={`${currentPage === 'showings' ? 'text-primary' : 'text-secondary hover:text-primary hover:stroke-primary'} cursor-pointer mt-4`} onClick={() => goPage('showings')}>
                                <Typography variant="left-menu" >Showings</Typography>
                            </div>
                            <div className={`${currentPage === 'offers' ? 'text-primary' : 'text-secondary hover:text-primary hover:stroke-primary'} cursor-pointer mt-4`} onClick={() => goPage('offers')}>
                                <Typography variant="left-menu" >Offers</Typography>
                            </div>
                            <div className={`${currentPage === 'transactions' ? 'text-primary' : 'text-secondary hover:text-primary hover:stroke-primary'} cursor-pointer mt-4`} onClick={() => goPage('transactions')}>
                                <Typography variant="left-menu" >Transactions</Typography>
                            </div>
                        </div>
                    </div>
                    <div className='mt-[50px] pl-3'>
                        <Typography color='secondary' className='uppercase font-bold text-10 select-none'>Realconnect</Typography>
                        <div className='mt-2 pl-3'>
                            <div className={`${currentPage.includes('brokers') || currentPage.includes('clients') ? 'text-[#294661]' : 'text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]'} flex justify-between cursor-pointer mt-4`} onClick={() => setShowRealStateBrokersSubmenu(!showRealStateBrokersSubmenu)}>
                                <Typography variant="left-menu">Real Estate Brokers</Typography>
                                <MdOutlineKeyboardArrowDown className='mt-1' />
                            </div>
                            {showRealStateBrokersSubmenu && (
                                <div className='sub-menu-area pl-3 ml-1 border-l-2 border-[#E6E6E6]'>
                                    <div className={`${currentPage === 'agents/all' ? 'text-primary' : 'text-secondary hover:text-primary hover:stroke-primary'} cursor-pointer mt-2 pt-2`} onClick={() => goPage('agents/all')}>
                                        <Typography variant="left-menu">Agents</Typography>
                                    </div>
                                    <div className={`${currentPage === 'agents/team' ? 'text-primary' : 'text-secondary hover:text-primary hover:stroke-primary'} cursor-pointer mt-4`} onClick={() => goPage('agents/team')}>
                                        <Typography variant="left-menu">Teams</Typography>
                                    </div>
                                    <div className={`${currentPage === 'agents/company' ? 'text-primary' : 'text-secondary hover:text-primary hover:stroke-primary'} cursor-pointer mt-4`} onClick={() => goPage('agents/company')}>
                                        <Typography variant="left-menu">Brokerages</Typography>
                                    </div>
                                    <div className={`${currentPage === 'associations' ? 'text-primary' : 'text-secondary hover:text-primary hover:stroke-primary'} cursor-pointer mt-2 py-2`} onClick={() => goPage('#')}>
                                        <Typography variant="left-menu">Associations</Typography>
                                    </div>
                                </div>
                            )}
                            <div className={`${currentPage.includes('directory') ? 'text-[#294661]' : 'text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]'} flex justify-between cursor-pointer mt-4`} onClick={() => setShowDirectorySubmenu(!showDirectorySubmenu)}>
                                <Typography variant="left-menu">Directory</Typography>
                                <MdOutlineKeyboardArrowDown className='mt-1' />
                            </div>
                            {showDirectorySubmenu && (
                                <div className='sub-menu-area pl-3 ml-1 border-l-2 border-[#E6E6E6]'>
                                    <div className={`${currentPage === 'inspectors' ? 'text-primary' : 'text-secondary hover:text-primary hover:stroke-primary'} cursor-pointer mt-2 pt-2`} onClick={() => goPage('#')}>
                                        <Typography variant="left-menu">Inspectors</Typography>
                                    </div>
                                    <div className={`${currentPage === 'loan-officers' ? 'text-primary' : 'text-secondary hover:text-primary hover:stroke-primary'} cursor-pointer mt-4`} onClick={() => goPage('#')}>
                                        <Typography variant="left-menu">Loan Officers</Typography>
                                    </div>
                                    <div className={`${currentPage === 'attorneys' ? 'text-primary' : 'text-secondary hover:text-primary hover:stroke-primary'} cursor-pointer mt-4`} onClick={() => goPage('#')}>
                                        <Typography variant="left-menu">Attorneys</Typography>
                                    </div>
                                    <div className={`${currentPage === 'title-reps' ? 'text-primary' : 'text-secondary hover:text-primary hover:stroke-primary'} cursor-pointer mt-4`} onClick={() => goPage('#')}>
                                        <Typography variant="left-menu">Title Reps</Typography>
                                    </div>
                                    <div className={`${currentPage === 'insurance-agents' ? 'text-primary' : 'text-secondary hover:text-primary hover:stroke-primary'} cursor-pointer mt-4`} onClick={() => goPage('#')}>
                                        <Typography variant="left-menu">Insurance Agents</Typography>
                                    </div>
                                    <div className={`${currentPage === 'contractors' ? 'text-primary' : 'text-secondary hover:text-primary hover:stroke-primary'} cursor-pointer mt-4`} onClick={() => goPage('#')}>
                                        <Typography variant="left-menu">Contractors</Typography>
                                    </div>
                                    <div className={`${currentPage === 'movers' ? 'text-primary' : 'text-secondary hover:text-primary hover:stroke-primary'} cursor-pointer mt-4`} onClick={() => goPage('#')}>
                                        <Typography variant="left-menu">Movers</Typography>
                                    </div>
                                    <div className={`${currentPage === 'photographers' ? 'text-primary' : 'text-secondary hover:text-primary hover:stroke-primary'} cursor-pointer mt-4`} onClick={() => goPage('#')}>
                                        <Typography variant="left-menu">Photographers</Typography>
                                    </div>
                                    <div className={`${currentPage === 'investors' ? 'text-primary' : 'text-secondary hover:text-primary hover:stroke-primary'} cursor-pointer mt-4`} onClick={() => goPage('#')}>
                                        <Typography variant="left-menu">Investors</Typography>
                                    </div>
                                    <div className={`${currentPage === 'interior-designers' ? 'text-primary' : 'text-secondary hover:text-primary hover:stroke-primary'} cursor-pointer mt-4 pb-2`} onClick={() => goPage('#')}>
                                        <Typography variant="left-menu">Interior Designers</Typography>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-3 shrink-0 hidden md:flex lg:hidden justify-center">
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
                        <IconWrapper name="showings" stroke={currentPage === 'showings' ? '#294661' : '#7D8E9F'} className={`${currentPage === 'showings' ? '' : ''}`} />
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
                                                <div className='flex items-center gap-3 p-2 px-5 rounded-lg mb-3'>
                                                    <IconWrapper name="listings" stroke='#7D8E9F80' />
                                                    <Typography variant="left-menu" >Listings</Typography>
                                                </div>
                                                <div className={`${currentPage === 'showings' ? 'text-[#294661]' : 'text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]'} flex items-center gap-3 p-2 px-5 rounded-lg cursor-pointer mb-3`} onClick={() => goPage('showings')}>
                                                    <IconWrapper name="showings" stroke={currentPage === 'showings' ? '#294661' : '#7D8E9F'} />
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
        </>
    )
}

export default UserSidebar