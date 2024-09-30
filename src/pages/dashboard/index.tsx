import React from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from '@/components/baseComponents/Button'
import { useAppSelector } from '@/redux/hooks'
import { getUser } from '@/redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { getZendeskToken } from '@/redux/user/userSlice';
import Typography from '@/components/baseComponents/Typography'
import IconWrapper from '@/components/baseComponents/IconWrapper'
import ToolTip from '@/components/mainComponents/ToolTip'
import DashboardSimple from './DashboardSimple'
import Events from './Events'
import PartnerResourcesModal from '@/components/layouts/bars/Components/PartnerResourcesDrawer';
import InvestModal from '@/components/layouts/bars/Components/InvestModal';
import FeedbackModal from '@/components/layouts/bars/Components/FeedbackModal';
import ReportModal from '@/components/layouts/bars/Components/ReportModal';
import VerifiedModal from '@/components/layouts/bars/Components/VerifiedModal';

const Dashboard = () => {

    const user = useAppSelector(getUser)
    const zendeskToken = useAppSelector(getZendeskToken)
    const navigate = useNavigate()
    const location = useLocation()
    const curPage = location.pathname.split('/')[2]

    const [openResourceModal, setOpenResourceModal] = React.useState<boolean>(false);
    const [openInvestModal, setOpenInvestModal] = React.useState<boolean>(false);
    const [openFeedbackModal, setOpenFeedbackModal] = React.useState<boolean>(false);
    const [openReportModal, setOpenReportModal] = React.useState<boolean>(false);
    const [openVerifiedModal, setOpenVerifiedModal] = React.useState<boolean>(false);

    return (
    <div className="w-full h-[calc(100vh-60px)] p-8 pt-6">
            {(openResourceModal || openVerifiedModal || openFeedbackModal || openInvestModal || openReportModal) &&
                <div className='!bg-[#00000075] h-screen w-full fixed top-0 left-0 z-10'></div>
            }
            <div className="flex justify-between items-start">
                <div>
                    <Typography variant="h2" color="black" className="whitespace-nowrap">
                        Good Morning, {user.agent.firstName} ☀️
                    </Typography>
                    <Typography variant="h4" color="secondary">
                        Welcome to your RealtyView!
                    </Typography>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex flex-items-center gap-3">
                        <ToolTip text="Invest">
                            <Button variant='icon' color='inherit' className='pt-[5px]' onClick={() => setOpenInvestModal(true)}>
                                <IconWrapper name='leaf' width={20} height={20} className='cursor-pointer' />
                            </Button>
                        </ToolTip>
                        <ToolTip text="Resources">
                            <Button variant='icon' color='inherit' className='pt-[5px]' onClick={() => setOpenResourceModal(true)}>
                                <IconWrapper name='thunder' width={20} height={24} className='cursor-pointer' />
                            </Button>
                        </ToolTip>
                        <ToolTip text="Get Verified">
                            <Button variant='icon' color='inherit' onClick={() => setOpenVerifiedModal(true)}>
                                <IconWrapper name='protect' width={20} height={20} className='cursor-pointer' />
                            </Button>
                        </ToolTip>
                        <ToolTip text="Make a Suggestion">
                            <Button variant='icon' color='inherit' onClick={() => { setOpenFeedbackModal(true) }}>
                                <IconWrapper name='message' width={24} height={20} className='cursor-pointer' />
                            </Button>
                        </ToolTip>
                        <ToolTip text="Report a Bug">
                            <Button variant='icon' color='inherit' onClick={() => { setOpenReportModal(true) }}>
                                <IconWrapper name='warning' width={20} height={20} className='cursor-pointer' />
                            </Button>
                        </ToolTip>
                        <Button variant="icon" color="inherit" className="block sm:hidden">
                            <IconWrapper name="search" stroke='#616161' />
                        </Button>
                        <a href={`https://realtyviewhelp.zendesk.com/access/jwt?jwt=${zendeskToken}`} target='_blank'>
                            <ToolTip text="Support">
                                <Button variant="icon" color="inherit">
                                    <IconWrapper name='help' width={20} height={20} className='cursor-pointer' />
                                </Button>
                            </ToolTip>
                        </a>
                    </div>
                    <Button onClick={() => navigate('/app/listings')}>
                        <Typography variant="button2">Search Listings</Typography>
                    </Button>
                </div>
            </div>
            {curPage === 'dashboard' ? (
                <DashboardSimple />
            ) : (
                <Events />
            )}

            <PartnerResourcesModal
                open={openResourceModal}
                closeModal={() => setOpenResourceModal(false)}
            />

            <InvestModal
                open={openInvestModal}
                closeModal={() => setOpenInvestModal(false)}
            />

            <FeedbackModal
                open={openFeedbackModal}
                closeModal={() => setOpenFeedbackModal(false)}
            />

            <ReportModal
                open={openReportModal}
                closeModal={() => setOpenReportModal(false)}
            />

            <VerifiedModal
                open={openVerifiedModal}
                closeModal={() => setOpenVerifiedModal(false)}
            />

        </div>
    )
}

export default Dashboard