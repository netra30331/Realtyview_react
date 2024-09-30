import Typography from '@/components/baseComponents/Typography'
import { Button } from '@/components/baseComponents/Button'
import Arrow from '@/assets/images/arrow_to_right.svg'
import Play from '@/assets/images/play.svg'
import Graph from '@/assets/images/land_graph.svg'
import Organiazation from '@/assets/images/organization.svg'
import Communication from '@/assets/images/communication.svg'
import Collaboration from '@/assets/images/collaboration.svg'
import Realtors from '@/assets/images/realtors.svg'
import Reso from '@/assets/images/reso.svg'
import CMLS from '@/assets/images/cmls.svg'
import ListHub from '@/assets/images/listhub.svg'
import Relationship from '@/assets/images/landing_relationship.svg'
import Listing from '@/assets/images/landing_listing.svg'
import Showing from '@/assets/images/landing_showing.svg'
import Offer from '@/assets/images/landing_offer.svg'
import Landing_1 from '@/assets/images/landing_1.png'
import Landing_2 from '@/assets/images/landing_2.png'
import Landing_3 from '@/assets/images/landing_3.png'
import Landing_4 from '@/assets/images/landing_4.png'
import Remax from '@/assets/images/remax.svg'
import KW from '@/assets/images/kw.svg'
import Exp from '@/assets/images/exp.svg'
import GB from '@/assets/images/gb.svg'
import Compass from '@/assets/images/compass.svg'
import BerkShire from '@/assets/images/berkshire.svg'
import FooterImage from '@/assets/images/footer_image.png'
import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import Logo from '@/assets/images/logo_black.svg'
const faqs = [
    {
        question: 'Is it really free?',
        answer: 'Yes, RealtyView’s core features are free to use and we plan to keep it that way forever so that as many Agents can join the community and improve the industry.'
    },
    {
        question: 'How does scheduling a showing work?',
        answer: 'A buyer’s agent can request a showing by either clicking the showing link shared by the listing agent or by searching listings within the RealtyView platform. After requesting a day and time, the request remains pending until the listing agent confirms, denies, or reschedules the showing.'
    },
    {
        question: 'How does receiving an offer work?',
        answer: 'As a listing agent, you’ll receive a notification when an offer is submitted. You can review the offer details, communicate with the buyer’s agent, and choose to accept, counter, or decline the offer directly through the RealtyView platform.'
    },
    {
        question: 'How does receiving showing requests work?',
        answer: 'When a showing request is submitted, the listing agent receives a notification. You can then review the request, confirm, deny, or suggest an alternative time. All communication and scheduling details are managed within the RealtyView platform, streamlining the process for both listing and buyer’s agents.'
    },
]
const Landing = () => {
    return (
        <>
            <div className="relative">
                <video autoPlay loop muted preload="auto" className="object-cover h-[642px] w-full brightness-75">
                    <source src={'../../assets/data/stock.mov'} type="video/mp4" />
                    Your browser does not support HTML5 video.
                </video>
                <div className='absolute h-[642px] w-full top-0 flex justify-center'>
                    <div className='max-w-[1024px] w-full h-full px-[40px] md:px-[60px] flex items-center'>
                        <div className='pt-32'>
                            <div className='w-full max-w-[630px]'>
                                <Typography variant='h1' color='white' className=''>Better End to End</Typography>
                                <Typography variant='h1' color='white' className='mt-1'>Client & Deal Management</Typography>
                                <Typography variant='h4' color='white' className='mt-5'>
                                    RealtyView enables Realtors to create a fully personalized, all-in-one productivity suite. With our core showing and offer management solutions, RealtyView is designed to enhance communication and centralize collaborative deal flow among Realtors.
                                </Typography>
                            </div>
                            <div className='flex items-center gap-[30px] md:gap-[60px] mt-8'>
                                <Button className='w-[180px]'>
                                    <div className='flex items-center justify-center gap-3'>
                                        <span className='whitespace-nowrap'>Sign Up for Free</span>
                                        <img src={Arrow} alt="arrow" className='mb-[1px]' />
                                    </div>
                                </Button>
                                <Button className='w-[180px] bg-white text-[#1358DB] hover:bg-gray-200'>
                                    <div className='flex items-center justify-center gap-3'>
                                        <span className='text-[#1358DB]'>Learn More</span>
                                        <img src={Play} alt="play" className='' />
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[url('@/assets/images/land_back.png')] min-h-[900px] bg-right-top bg-no-repeat flex justify-center w-full">
                <div className='max-w-[1024px] w-full py-5 px-[15px] md:px-[60px]'>
                    <div className='flex justify-between'>
                        <div className='flex items-center gap-8'>
                            <img src={Graph} alt="land_graph" />
                            <Typography variant='h3' color='black' className='text-[9px] sm:text-[15px] font-semibold'>Housing July 2023</Typography>
                        </div>
                        <div className=''>
                            <Typography variant='body' className='font-medium leading-10 sm:leading-22 text-[6.5px] sm:text-[12px]'>Housing Starts</Typography>
                            <Typography variant='body' className='font-medium leading-10 sm:leading-22 text-[6.5px] sm:text-[12px]'>1,420,000</Typography>
                            <Typography variant='body' className='font-medium leading-10 sm:leading-22 text-[6.5px] sm:text-[12px] text-[#0C9CAE]'>+2.37%</Typography>
                        </div>
                        <div className=''>
                            <Typography variant='body' className='font-medium leading-10 sm:leading-22 text-[6.5px] sm:text-[12px]'>Existing Sales</Typography>
                            <Typography variant='body' className='font-medium leading-10 sm:leading-22 text-[6.5px] sm:text-[12px]'>4.44 M. Units</Typography>
                            <Typography variant='body' className='font-medium leading-10 sm:leading-22 text-[6.5px] sm:text-[12px] text-[#0C9CAE]'>+3.75%</Typography>
                        </div>
                        <div className=''>
                            <Typography variant='body' className='font-medium leading-10 sm:leading-22 text-[6.5px] sm:text-[12px]'>New Home Sales</Typography>
                            <Typography variant='body' className='font-medium leading-10 sm:leading-22 text-[6.5px] sm:text-[12px]'>640,000</Typography>
                            <Typography variant='body' className='font-medium leading-10 sm:leading-22 text-[6.5px] sm:text-[12px] text-[#F8B526]'>-0.18%</Typography>
                        </div>
                        <div className=''>
                            <Typography variant='body' className='font-medium leading-10 sm:leading-22 text-[6.5px] sm:text-[12px]'>Median Price</Typography>
                            <Typography variant='body' className='font-medium leading-10 sm:leading-22 text-[6.5px] sm:text-[12px]'>$375,700</Typography>
                            <Typography variant='body' className='font-medium leading-10 sm:leading-22 text-[6.5px] sm:text-[12px] text-[#F8B526]'>-1.75%</Typography>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <div className='text-center'>
                            <Typography variant="h2" color="black">More than a CRM</Typography>
                            <Typography variant="body" color="black" className='text-[13px] mt-5'>
                                RealtyView emphasizes collaboration through our network-based CRM and transaction management system encouraging seamlesscommunication and transactions between Realtors and other real estate professionals.
                            </Typography>
                        </div>
                        <div className='bg-white rounded p-8 max-w-[510px] w-full mt-[40px]'>
                            <div className='flex gap-8 items-center'>
                                <img src={Organiazation} alt="organization" />
                                <Typography variant="h3" color="black">Organization</Typography>
                            </div>
                            <div className=''>
                                <Typography variant="body" color="black" className='text-[13px] mt-3'>
                                    As Realtors, our primary mission is to serve clients. RealtyView’s core is built around the client, ensuring every aspect of our platform is designed to enhance your ability to serve them.
                                </Typography>
                            </div>
                        </div>
                        <div className='bg-white rounded p-8 max-w-[510px] w-full mt-[40px]'>
                            <div className='flex gap-8 items-center'>
                                <img src={Communication} alt="communication" />
                                <Typography variant="h3" color="black">Communication</Typography>
                            </div>
                            <div className=''>
                                <Typography variant="body" color="black" className='text-[13px] mt-3'>
                                    Aside from leads, Realtors’ second most frequent complaint is
                                    communication with other Agents. We plan to bridge to gaps in
                                    communication between Realtors.
                                </Typography>
                            </div>
                        </div>
                        <div className='bg-white rounded p-8 max-w-[510px] w-full mt-[40px]'>
                            <div className='flex gap-8 items-center'>
                                <img src={Collaboration} alt="collaboration" />
                                <Typography variant="h3" color="black">Collaboration</Typography>
                            </div>
                            <div className=''>
                                <Typography variant="body" color="black" className='text-[13px] mt-3'>
                                    There are 5-7 parties in the average transaction. We unify all parties for a streamlined process from showings and offers to closing and beyond helping you working closer with your dream team.
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-center'>
                <div className='flex justify-between items-center max-w-[1024px] w-full py-5 md:py-10 px-[15px] md:px-[60px]'>
                    <img src={Realtors} alt="realtors" className='scale-75 md:scale-100' />
                    <img src={Reso} alt="reso" className='scale-75 md:scale-100' />
                    <img src={CMLS} alt="cmls" className='scale-75 md:scale-100' />
                    <img src={ListHub} alt="listhub" className='scale-75 md:scale-100' />
                </div>
            </div>
            <div className='w-full flex justify-center bg-[#f3f7fc]'>
                <div className='max-w-[1024px] w-full py-5 md:py-[50px] px-[15px] md:px-[60px]'>
                    <div className='text-center'>
                        <Typography variant="h2" color="black">We’re Building for Better Collaboration</Typography>
                        <Typography variant="body" color="black" className='text-[13px] mt-5'>
                            RealtyView’s mission is to enhance your workflow by deeply integrating features tailored specifically to your business. Within our
                            organizational system, communication and collaboration among Realtors become seamless.
                        </Typography>
                    </div>
                    <div className='grid grid-cols-2 mt-[40px]'>
                        <div className='col-span-2 lg:col-span-1 w-full hidden lg:flex items-center'>
                            <div className='w-full lg:w-[418px]'>
                                <div className='flex gap-8 items-center justify-center lg:justify-start'>
                                    <img src={Relationship} alt="relationship" />
                                    <Typography variant="h3" color="black">Relationship Manager</Typography>
                                </div>
                                <div className=''>
                                    <Typography variant="body" color="black" className='text-[13px] mt-10 text-center lg:text-left'>
                                        As Realtors, our primary mission is to serve clients. RealtyView’s core is built around the client, ensuring every aspect of our platform is designed to enhance your ability to serve them.
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-2 lg:col-span-1 w-full flex justify-center lg:justify-end'>
                            <img src={Landing_1} alt="landing_1" />
                        </div>
                        <div className='col-span-2 lg:col-span-1 w-full flex items-center lg:hidden mt-[20px] lg:mt-[0px] mb-[40px] lg:mb-[0bx]'>
                            <div className='w-full lg:w-[418px]'>
                                <div className='flex gap-8 items-center justify-center lg:justify-start'>
                                    <img src={Relationship} alt="relationship" />
                                    <Typography variant="h3" color="black">Relationship Manager</Typography>
                                </div>
                                <div className=''>
                                    <Typography variant="body" color="black" className='text-[13px] mt-10 text-center lg:text-left'>
                                        As Realtors, our primary mission is to serve clients. RealtyView’s core is built around the client, ensuring every aspect of our platform is designed to enhance your ability to serve them.
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 mt-[20px]'>
                        <div className='col-span-2 lg:col-span-1 w-full flex justify-center lg:justify-start'>
                            <img src={Landing_2} alt="landing_2" />
                        </div>
                        <div className='col-span-2 lg:col-span-1 w-full flex items-center mt-[20px] lg:mt-[0px] mb-[40px] lg:mb-[0bx]'>
                            <div className='w-full lg:w-[418px]'>
                                <div className='flex gap-8 items-center justify-center lg:justify-start'>
                                    <img src={Listing} alt="listing" />
                                    <Typography variant="h3" color="black">Listing Manager</Typography>
                                </div>
                                <div className=''>
                                    <Typography variant="body" color="black" className='text-[13px] mt-10 text-center lg:text-left'>
                                        Streamline your property listing management in just a few steps with RealtyView. Either import, claim, or upload your listings and instantly generate shareable links to receive and manage showing requests and offers with ease. Expand your marketing horizons by effortlessly syndicating to multiple channels using RealtyView.
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 mt-[20px]'>
                        <div className='col-span-2 lg:col-span-1 w-full hidden lg:flex items-center'>
                            <div className='w-full lg:w-[418px] text-center'>
                                <div className='flex gap-8 items-center justify-center lg:justify-start'>
                                    <img src={Showing} alt="showing" />
                                    <Typography variant="h3" color="black" className=''>Showing Manager</Typography>
                                </div>
                                <div className=''>
                                    <Typography variant="body" color="black" className='text-[13px] mt-10 text-center lg:text-left'>
                                        Scheduling showings can be a hassle to manage whether your the Buyer’s Agent scheduling showings or the Listing Agent receiving dozens of showing requests. Mange all of your requests from one interactive platform that enhances communication and encourages collaboration between Agents.
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-2 lg:col-span-1 w-full flex justify-center lg:justify-right'>
                            <img src={Landing_3} alt="landing_3" />
                        </div>
                        <div className='col-span-2 lg:col-span-1 w-full flex items-center lg:hidden mt-[20px] lg:mt-[0px] mb-[40px] lg:mb-[0bx]'>
                            <div className='w-full lg:w-[418px] text-center'>
                                <div className='flex gap-8 items-center justify-center lg:justify-start'>
                                    <img src={Showing} alt="showing" />
                                    <Typography variant="h3" color="black" className=''>Showing Manager</Typography>
                                </div>
                                <div className=''>
                                    <Typography variant="body" color="black" className='text-[13px] mt-10 text-center lg:text-left'>
                                        Scheduling showings can be a hassle to manage whether your the Buyer’s Agent scheduling showings or the Listing Agent receiving dozens of showing requests. Mange all of your requests from one interactive platform that enhances communication and encourages collaboration between Agents.
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 mt-[20px]'>
                        <div className='col-span-2 lg:col-span-1 w-full flex justify-center lg:justify-start'>
                            <img src={Landing_4} alt="landing_4" />
                        </div>
                        <div className='col-span-2 lg:col-span-1 w-full flex items-center mt-[20px] lg:mt-[0px] mb-[40px] lg:mb-[0bx]'>
                            <div className='w-full lg:w-[418px]'>
                                <div className='flex gap-8 items-center justify-center lg:justify-start'>
                                    <img src={Offer} alt="offer" />
                                    <Typography variant="h3" color="black">Offer Manager</Typography>
                                </div>
                                <div className=''>
                                    <Typography variant="body" color="black" className='text-[13px] mt-10 text-center lg:text-left'>
                                        Sending and receiving multiple offers can become overwhelming to manage and keep track of though emails and text messages. Your Offer Inbox™ is your unified source of all sent and received offers to and from your colleagues. We enhance communication and encourage collaboration between Realtors for a more streamlined
                                        transaction.
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-center py-[60px]'>
                <div className='max-w-[1024px] w-full px-[15px] md:px-[60px]'>
                    <div className='grid grid-cols-2'>
                        <div className='col-span-2 lg:col-span-1 w-full flex items-center'>
                            <div className='w-full lg:w-[418px]'>
                                <div className='flex gap-8 items-center justify-start'>
                                    <Typography variant="h3" color="black">I'm Joining RealtyView because</Typography>
                                </div>
                                <div className=''>
                                    <Typography variant="body" color="black" className='text-[13px] mt-10 text-left'>
                                        Join like minded Realtors to connect with, collaborate with, and help solve independent and industry problems. Our rapidly growing community can help you. Join a community of Realtors who care about improving the industry by committing to better communication and collaboration.
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-2 lg:col-span-1 w-full flex flex-wrap justify-center'>
                            <img src={Remax} alt="remax" />
                            <img src={KW} alt="kw" />
                            <img src={Exp} alt="exp" />
                            <img src={GB} alt="gb" />
                            <img src={Compass} alt="compass" />
                            <img src={BerkShire} alt="berkshire" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-center pb-[50px]'>
                <div className='max-w-[1024px] w-full px-[15px] md:px-[60px] flex justify-center'>
                    <div className='w-full lg:w-[603px]'>
                        <div className='flex gap-8 items-center justify-center'>
                            <Typography variant="h2" color="black">FAQs</Typography>
                        </div>
                        <div className='mb-[50px]'>
                            <Typography variant="body" color="black" className='text-[13px] mt-10 text-center'>
                                Here are some of the most common questions we receiving from Realtors who we talk to about RealtyView. If you have more questions please visit our knowledge base or send us a message in the chat!
                            </Typography>
                        </div>
                        {faqs.map((faq) => (
                            <Disclosure as="div" key={faq.question} className="pt-6">
                                {({ open }) => (
                                    <>
                                        <dt>
                                            <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                                                <span className="text-base font-semibold leading-7 text-button-primary hover:text-button-primary-hover">{faq.question}</span>
                                                <span className="ml-6 flex h-7 items-center">
                                                    {open ? (
                                                        <div className='w-[26px] h-[26px] bg-black flex items-center justify-center'>
                                                            <MinusSmallIcon className="h-[18px] w-[18px] text-white" aria-hidden="true" />
                                                        </div>
                                                    ) : (
                                                        <div className='w-[26px] h-[26px] bg-black flex items-center justify-center'>
                                                            <PlusSmallIcon className="h-[18px] w-[18px] text-white" aria-hidden="true" />
                                                        </div>

                                                    )}
                                                </span>
                                            </Disclosure.Button>
                                        </dt>
                                        <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                            <p className="text-base leading-28 text-gray-600 py-10">{faq.answer}</p>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-center pb-[50px]'>
                <div className='max-w-[1024px] w-full px-[15px] md:px-[60px] flex justify-center'>
                    <div className='w-full'>
                        <div className='flex justify-center w-full mb-[20px]'>
                            <img src={FooterImage} alt="footerImage" />
                        </div>
                        <div className='w-full grid grid-cols-5 gap-5'>
                            <div className='col-span-2 max-w-[260px]'>
                                <img src={Logo} alt="logo" className='h-[20px]' />
                                <Typography variant="body" className='text-[10.5px] mt-5 text-left text-[#5C6770]'>
                                    Our forever-free CRM & comprehensive marketplace can help youbuild your own true all-in-one productivity suite. You’ll never need another independent subscription again.
                                </Typography>
                            </div>
                            <div className='col-span-1'>
                                <Typography variant="h3" color="black" className='text-[12px] md:text-[17px]'>FAQs</Typography>
                                <Typography variant="body" className='text-[10.5px] mt-3 text-left text-[#5C6770] hover:text-button-primary cursor-pointer hover:font-semibold'>
                                    Active Listing
                                </Typography>
                                <Typography variant="body" className='text-[10.5px] mt-3 text-left text-[#5C6770] hover:text-button-primary cursor-pointer hover:font-semibold'>
                                Property Data
                                </Typography>
                                <Typography variant="body" className='text-[10.5px] mt-3 text-left text-[#5C6770] hover:text-button-primary cursor-pointer hover:font-semibold'>
                                Community
                                </Typography>
                                <Typography variant="body" className='text-[10.5px] mt-3 text-left text-[#5C6770] hover:text-button-primary cursor-pointer hover:font-semibold'>
                                Directory
                                </Typography>
                            </div>
                            <div className='col-span-1'>
                            <Typography variant="h3" color="black" className='text-[12px] md:text-[17px]'>About</Typography>
                                <Typography variant="body" className='text-[10.5px] mt-3 text-left text-[#5C6770] hover:text-button-primary cursor-pointer hover:font-semibold'>
                                    Our Mission
                                </Typography>
                                <Typography variant="body" className='text-[10.5px] mt-3 text-left text-[#5C6770] hover:text-button-primary cursor-pointer hover:font-semibold'>
                                    Updates
                                </Typography>
                                <Typography variant="body" className='text-[10.5px] mt-3 text-left text-[#5C6770] hover:text-button-primary cursor-pointer hover:font-semibold'>
                                    Road Map
                                </Typography>
                                <Typography variant="body" className='text-[10.5px] mt-3 text-left text-[#5C6770] hover:text-button-primary cursor-pointer hover:font-semibold'>
                                    Idea Board
                                </Typography>
                            </div>
                            <div className='col-span-1'>
                            <Typography variant="h3" color="black" className='text-[12px] md:text-[17px]'>Resources</Typography>
                                <Typography variant="body" className='text-[10.5px] mt-3 text-left text-[#5C6770] hover:text-button-primary cursor-pointer hover:font-semibold'>
                                    Give Feedback
                                </Typography>
                                <Typography variant="body" className='text-[10.5px] mt-3 text-left text-[#5C6770] hover:text-button-primary cursor-pointer hover:font-semibold'>
                                    System Status
                                </Typography>
                                <Typography variant="body" className='text-[10.5px] mt-3 text-left text-[#5C6770] hover:text-button-primary cursor-pointer hover:font-semibold'>
                                    Privacy Policy
                                </Typography>
                                <Typography variant="body" className='text-[10.5px] mt-3 text-left text-[#5C6770] hover:text-button-primary cursor-pointer hover:font-semibold'>
                                    Terms of Use
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Landing