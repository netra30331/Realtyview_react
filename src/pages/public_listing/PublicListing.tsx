import React from 'react'
import { useNavigate } from 'react-router-dom'
import Scrollbars from 'react-custom-scrollbars'
import { Button } from '@/components/baseComponents/Button'
import Typography from '@/components/baseComponents/Typography'
import listing_img1 from '@/assets/images/listing.png';
import listing_img2 from '@/assets/images/listing_2.svg';
import listing_img3 from '@/assets/images/listing_3.svg';
import agent_avatar from '@/assets/images/agent_avatar.svg';
import company_logo2 from '@/assets/images/company_logo2.svg';
import {AiOutlinePhone, AiOutlineMail} from 'react-icons/ai';
import Calendar from 'react-calendar';
import SubmitOffer from '../offer/SubmitOffer';
import 'react-calendar/dist/Calendar.css';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { notify } from '@/shared/services/notify'
import { getUser } from '@/redux/user/userSlice';
import { CreateShowingDto } from '@/shared/interfaces/interfaces';
import { createNewShowing } from '@/redux/showing/showingSlice';
import { formatWeekDate } from "@/shared/config/constants"

const PublicListing = () => {
    const navigate = useNavigate()
    const user = useAppSelector(getUser)
    const dispatch = useAppDispatch()
    const [openSubmitDrawer, setOpenSubmitDrawer] = React.useState<boolean>(false);

    const img_array = [listing_img1, listing_img2, listing_img3];
    const times = [
        "8:00 AM",
        "9:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "1:00 PM",
        "2:00 PM",
        "3:00 PM",
        "4:00 PM",
        "5:00 PM",
        "6:00 PM",
        "7:00 PM",
        "8:00 PM",
    ];
    
    const [selectedImgIndex, setSelectedImgIndex] = React.useState<number>(0);
    const [selectedTimeIndex, setSelectedTimeIndex] = React.useState<number>(0);
    const [date, setDate] = React.useState<Date>(new Date());
    const [requestedFlag, setrequestedFlag] = React.useState<boolean>(false);

    const onChange = (date:any) => {
        setDate(date);
    }

    const HouseData = {
        _id:'654665bce54d370f6000a7f2',
        status:0,
        icon:'paper',
        address1 : '123 Main St',
        address2 : 'Unit1',
        city:'Miami',
        neighborhood : 'North Bay Village',
        state:'FL',
        zip_code:'33141',
        client:'Sarah Restrepo',
        offer:'$500, 000',
        representing:'Buyer',
        date_time:'2:30PM',
        agent:'Jade M. Walker',
        agent_avatar:agent_avatar,
        mls_number:'A123124124',
        image:[
            {src:listing_img1},
            {src:listing_img2},
            {src:listing_img3},
        ],
        instruction:'This is the property description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        remark:'This is the property description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        lockbox_keypad:'',
        access_code :'',
        occupany_status:'Owner Occupied',
        require_agency_disclosure:1
    }
    
    const createShowing = () => {
        // Combine the local date and time
        const localDateTime = new Date(`${date.toDateString()} ${times[selectedTimeIndex]}`);
        // Convert the local date and time to UTC
        const utcDateTime = localDateTime.toISOString();
        console.log(utcDateTime); // Output: 2022-11-07T15:00:00.000Z
        let data: CreateShowingDto = {
          email: user.email,
          data: {
            _id: "",
            status: "Pending",
            listing: HouseData._id,
            dateTime: localDateTime,
          },
          userId: user._id,
        };
        dispatch(createNewShowing(data)).then((res: any) => {
          try {
            notify(res.payload.success, res.payload.message);
          } catch (e) {
            notify(false, "Something went wrong.");
          }
        });
        setrequestedFlag(true)
    }
    return(
        <div>
            {(openSubmitDrawer) && <div className='!bg-[#00000040] h-screen w-full fixed top-0 left-0 z-10'></div>}
            <SubmitOffer open={openSubmitDrawer} changeState={setOpenSubmitDrawer} houseData={HouseData}/>
            <div className="px-5 mt-5">
                <div className='block h-screen'>
                    <Scrollbars autoHide className="block w-full h-fit">
                        <div className="border-b border-gray-200 md:flex">
                            <div className='flex items-center justify-between'>
                                <Typography variant='h2' color='primary' className='pr-5 pb-1 pt-3 whitespace-nowrap'>Listings</Typography>
                            </div>
                            <nav className="-mb-px flex justify-end space-x-2 md:space-x-8 w-full">
                                <div className='md:flex items-center gap-5'>
                                    <Button className='text-15 hidden md:block'>Contact Agent</Button>
                                    <Button className='text-15 hidden md:block' onClick={() => navigate('#schedule-a-showing-section')}>Schedule a Showing</Button>
                                    <Button className='text-15 hidden md:block' onClick={() => setOpenSubmitDrawer(true)}>Submit an Offer</Button>
                                </div>
                            </nav>
                        </div>
                        <div className='md:flex px-5 py-8'>
                            <div className='md:w-2/3 w-full'>
                                <div className='w-full'>
                                    <img className='w-full' src={img_array[selectedImgIndex]}/>
                                </div>
                                <div className='w-full flex mt-4'>
                                    <div className={'w-1/3 mr-4 ' + (selectedImgIndex === 0 ? 'border-[4px] border-purple-700':'')} onClick={() => setSelectedImgIndex(0)}>
                                        <img className='w-full' src={listing_img1}/>
                                    </div>
                                    <div className={'w-1/3 mr-4 ' + (selectedImgIndex === 1 ? 'border-[4px] border-purple-700':'')} onClick={() => setSelectedImgIndex(1)}>
                                        <img className='w-full' src={listing_img2}/>
                                    </div>
                                    <div className={'w-1/3 ' + (selectedImgIndex === 2 ? 'border-[4px] border-purple-700':'')} onClick={() => setSelectedImgIndex(2)}>
                                        <img className='w-full' src={listing_img3}/>
                                    </div>
                                </div>
                            </div>
                            <div className='md:w-1/3 w-full md:mt-0 mt-6 px-8'>
                                <div className='flex w-9/10 mb-6 shadow-lg px-4 py-4'>
                                    <div className='w-1/4'>
                                        <img className='w-4/5' src={agent_avatar}/>
                                    </div>
                                    <div>
                                        <Typography variant='h4' color='primary' className='px-2 pb-2'>Agent Name</Typography>
                                        <div className='flex'>
                                            <AiOutlinePhone className="h-[21px] w-[21px] mx-2 flex-shrink-0 text-[#4C42D7]"/>
                                            <Typography variant='body' color='secondary'>{'534-534-3454'}</Typography>
                                        </div>
                                        <div className='flex'>
                                            <AiOutlineMail className="h-[21px] w-[21px] mx-2 flex-shrink-0 text-[#4C42D7]"/>
                                            <Typography variant='body' color='secondary'>{'popovskiy@gmail.com'}</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex w-9/10 mb-6 shadow-lg px-4 py-4'>
                                    <div className='w-1/4'>
                                        <img className='w-4/5' src={company_logo2}/>
                                    </div>
                                    <div>
                                        <Typography variant='h4' color='primary' className='px-2 pb-2'>Company Name</Typography>
                                        <div className='flex'>
                                            <AiOutlinePhone className="h-[21px] w-[21px] mx-2 flex-shrink-0 text-[#4C42D7]"/>
                                            <Typography variant='body' color='secondary'>{'534-534-3454'}</Typography>
                                        </div>
                                        <div className='flex'>
                                            <AiOutlineMail className="h-[21px] w-[21px] mx-2 flex-shrink-0 text-[#4C42D7]"/>
                                            <Typography variant='body' color='secondary'>{'popovskiy@gmail.com'}</Typography>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='px-5'>
                            <Typography variant='h3' color='primary' className=' mb-4'>Address</Typography>
                            <div className='md:flex justify-between'>
                                <div className='mr-4'>
                                    <Typography variant='h4' color='secondary' className=' mb-4 mt-4'>Address</Typography>
                                    <Typography variant='h4' color='primary' className='font-opensans'>{HouseData.address1}</Typography>
                                </div>
                                <div className='mr-4'>
                                    <Typography variant='h4' color='secondary' className=' mb-4 mt-4'>Address 2</Typography>
                                    <Typography variant='h4' color='primary' className='font-opensans'>{HouseData.address2}</Typography>
                                </div>
                                <div className='mr-4'>
                                    <Typography variant='h4' color='secondary' className=' mb-4 mt-4'>City</Typography>
                                    <Typography variant='h4' color='primary' className='font-opensans'>{HouseData.city}</Typography>
                                </div>
                                <div className='mr-4'>
                                    <Typography variant='h4' color='secondary' className=' mb-4 mt-4'>Neighborhood</Typography>
                                    <Typography variant='h4' color='primary' className='font-opensans'>{HouseData.neighborhood}</Typography>
                                </div>
                                <div className='mr-4'>
                                    <Typography variant='h4' color='secondary' className=' mb-4 mt-4'>State</Typography>
                                    <Typography variant='h4' color='primary' className='font-opensans'>{HouseData.state}</Typography>
                                </div>
                                <div className='mr-4'>
                                    <Typography variant='h4' color='secondary' className=' mb-4 mt-4'>Zip Code</Typography>
                                    <Typography variant='h4' color='primary' className='font-opensans'>{HouseData.zip_code}</Typography>
                                </div>
                            </div>
                        </div>
                        <div className='px-5 mt-10'>
                            <Typography variant='h3' color='primary' className=' mb-4'>Property Details</Typography>
                            <div className='md:flex justify-between'>
                                <div className='mr-4'>
                                    <Typography variant='h4' color='secondary' className=' mb-4 mt-4'>Property Type</Typography>
                                    <Typography variant='h4' color='primary' className='font-opensans'>Single Family Residence</Typography>
                                </div>
                                <div className='mr-4'>
                                    <Typography variant='h4' color='secondary' className=' mb-4 mt-4'>Bedrooms</Typography>
                                    <Typography variant='h4' color='primary' className='font-opensans'>3</Typography>
                                </div>
                                <div className='mr-4'>
                                    <Typography variant='h4' color='secondary' className=' mb-4 mt-4'>Bathrooms</Typography>
                                    <Typography variant='h4' color='primary' className='font-opensans'>3</Typography>
                                </div>
                                <div className='mr-4'>
                                    <Typography variant='h4' color='secondary' className=' mb-4 mt-4'>SqFt</Typography>
                                    <Typography variant='h4' color='primary' className='font-opensans'>1,534</Typography>
                                </div>
                                <div className='mr-4'>
                                    <Typography variant='h4' color='secondary' className=' mb-4 mt-4'>Lot size SqFt</Typography>
                                    <Typography variant='h4' color='primary' className='font-opensans'>1,534</Typography>
                                </div>
                            </div>
                        </div>
                        <div className='px-5 mt-10'>
                            <Typography variant='h3' color='primary' className=' mb-8'>Description</Typography>
                            <Typography variant='h4' color='primary' className='font-opensans'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
                        </div>
                        <div className='px-5 mt-10'>
                            <Typography variant='h3' color='primary' className=' mb-8'>Showings</Typography>
                            <Typography variant='h4' color='primary' className='font-opensans'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
                        </div>
                        <div className='px-5 mt-10 pb-10' id="schedule-a-showing-section">
                            <Typography variant='h3' color='primary' className=' mb-8'>Select a Date & Time</Typography>
                            <div className='md:flex justify-center text-center'>
                                {requestedFlag ? (
                                    <div className='md:w-1/2 w-full'>
                                        <div className='md:flex'>
                                            <div className={'md:w-1/3 w-full'}>
                                                <img className='w-4/5' src={img_array[selectedImgIndex]}/>
                                            </div>
                                            <div className='flex md:w-2/3 w-full mb-6 px-8 py-4'>
                                                <div className='w-1/4'>
                                                    <img className='md:w-4/5' src={agent_avatar}/>
                                                </div>
                                                <div>
                                                    <Typography variant='h4' color='primary' className='text-left px-2 pb-2'>Agent Name</Typography>
                                                    <div className='flex md:my-4'>
                                                        <AiOutlinePhone className="h-[21px] w-[21px] mx-2 flex-shrink-0 text-[#4C42D7]"/>
                                                        <Typography variant='body' color='secondary'>{'534-534-3454'}</Typography>
                                                    </div>
                                                    <div className='flex md:my-4'>
                                                        <AiOutlineMail className="h-[21px] w-[21px] mx-2 flex-shrink-0 text-[#4C42D7]"/>
                                                        <Typography variant='body' color='secondary'>{'popovskiy@gmail.com'}</Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='mt-8'>
                                            <Typography variant='h4' color='primary' className='text-left font-opensans'>You’re request to show [Full Address]  at [10am] on [Tuesday August 15th] has been received by [Agent Name]. You will be notified via email and your RealtyView dashboard when a response is entered. </Typography>
                                            <Typography variant='h4' color='primary' className='mt-6 text-left font-opensans'>Please allow some time for a response but always follow up if necessary.</Typography>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                    <Calendar
                                        onChange={onChange}
                                        value={date}
                                        calendarType="US"
                                    />
                                    <div className='md:ml-10 md:mt-0 mt-6'>
                                        <Typography variant='h3' color='primary' className='text-center  mb-8'>{formatWeekDate(date)}</Typography>
                                        <div className='h-[260px] overflow-y-auto'>
                                        {times.map((item, index) => {
                                            if (index === selectedTimeIndex){
                                                return (
                                                    <div className='flex font-montserrat font-normal justify-between w-[250px]' key={index}>
                                                        <div className='text-[12px] text-purple-700 w-[90px] rounded py-2 mb-2 text-center bg-gray-200'>{item}</div>
                                                        <Button className='text-[12px] h-[34px] ml-4' onClick={() => createShowing() }>Request Showing</Button>
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div onClick={() => setSelectedTimeIndex(index)} className='text-[12px] cursor-pointer text-purple-700 font-montserrat font-normal rounded w-[250px] text-center border-[1px] border-purple-700 py-2 mb-2' key={index}>{item}</div>
                                                )
                                            }
                                        })}
                                        </div>
                                    </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </Scrollbars>
                </div>
            </div>
        </div>
    )
}
export default PublicListing