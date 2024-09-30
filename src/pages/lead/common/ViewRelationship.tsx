import React from 'react'
import Typography from "@/components/baseComponents/Typography"
import { ILead } from '@/shared/interfaces/interfaces'
import UserCheck from '@/assets/icons/user-check.png'
import Note from '@/assets/icons/note.png'
import XMark from '@/assets/icons/XMark.png'
import { format } from 'date-fns';
import {LuUser2} from 'react-icons/lu';
import {AiOutlinePhone, AiOutlineMail, AiOutlineHome} from 'react-icons/ai';
import {BsMailbox} from 'react-icons/bs';
import DefaultAvatar from '@/assets/images/default_avatar.jpg'
import { DeleteMenu, LikeMenu } from '@/components/baseComponents/Menu'
import GraphActive from '@/assets/icons/graph-active.png'
import GraphWaiting from '@/assets/icons/graph-waiting.png'
import GraphLost from '@/assets/icons/graph-lost.png'
type IProps = {
    data?: any
    changeState: Function
    setStatus: Function
    editLead: Function
    archive: Function
    convertToClient: Function
    setRating: Function
}

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}
const ViewRelationship = (props: IProps) => {

    let tabs =  [
        { name: 'All' },
        { name: 'Buyer info' },
        { name: 'Buyer Preferences' },
        { name: 'Financing' },
        { name: 'Notes' },
    ];
    if(props.data.leadType === "Buyer"){
    }else {
        tabs =  [
            { name: 'All' },
            { name: 'Seller info' },
            { name: 'Property Description' },
            { name: 'Notes' },
        ];
    }
    const [currentTab, setCurrentTab] = React.useState<string>('All')
    const [values, setValues] = React.useState<ILead>(props.data)
    React.useEffect(() => {
        setValues(props.data)
    }, [props.data])
    return (
        <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl px-2">
            {/* head bar */}
            <div className="px-4 sm:px-6">
                <div className="flex items-start justify-between">
                    <div className="flex h-3 items-center">
                       <h5 className='text-blue-700 font-bold text-sm sm:text-[25px] '>{values.firstName+' '+values.lastName}</h5>
                       <span className='px-3 py-1 mx-2 text-[10px] text-gray-500 bg-gray-100'>{values.leadType}</span>
                    </div>
                    <div className="flex h-3 items-center ">
                        <img src={UserCheck} alt="UserCheck "  className='mx-2'/>
                        <div className="whitespace-nowrap mx-2 text-sm text-gray-500" >
                            <img src={Note} alt="Note" className='object-none'/>
                        </div>
                        <div className="whitespace-nowrap mx-2  text-sm text-gray-500" >
                        <LikeMenu item={values} setPriority={props.setRating}/>
                        </div>
                        <div className="whitespace-nowrap mx-2  text-sm text-gray-500" >
                        <DeleteMenu item={values} editLead={props.editLead} archive={props.archive} convertToClient={props.convertToClient}/>
                        </div>
                        {/* <img src={Star} alt="Star" />
                        <img src={Note} alt="Note" />
                        <img src={DotsVertical} alt="DotsVertical" /> */}
                        <img src={XMark} alt="XMark" className='mx-2' onClick={()=>props.changeState(false)} />
                    </div>
                </div>
            </div>
            <div className='border-b mt-5'></div>
            {/* Filter Tap */}
            <div className='flex justify-center w-full mt-4'>
                <nav className="-mb-px flex justify-center mx-10 w-full" aria-label="Tabs">
                    <div className='flex justify-between items-end w-full overflow-y-scroll'>
                        {tabs.map((tab) => (
                            <div
                                key={tab.name}
                                className={classNames(
                                    tab.name === currentTab
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                    'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium cursor-pointer'
                                )}
                                aria-current={tab.name === currentTab ? 'page' : undefined}
                                onClick={() => setCurrentTab(tab.name)}
                            >
                                <Typography variant='h4' className=''>{tab.name}</Typography>
                            </div>
                        ))}
                    </div>
                </nav>
            </div>

            <div className="relative flex-1 px-4 sm:px-6">
                {/* main info */}
                {(currentTab === 'All' || currentTab.endsWith('info')) &&
                    <ul role="list" className="divide-y divide-gray-100">
                        <li className="flex justify-between gap-x-6 py-5">
                            <div className="flex min-w-0 gap-x-4">
                                <img src={DefaultAvatar} alt="addProfile" className="h-[80px] w-[80px] flex-none rounded-full bg-gray-50" />
                                <div className="min-w-0 flex-auto text-[15px]">
                                    {values.firstName &&
                                    <div className='flex'>
                                        <LuUser2 className="h-[22px] w-[22px] mx-4 flex-shrink-0"/>
                                        <p className="text-sm leading-6 text-gray-900">{values.firstName+' '+values.lastName}</p>
                                    </div>
                                    }
                                    {values.phoneNumber &&
                                    <div className='flex mt-2'>
                                        <AiOutlinePhone className="h-[22px] w-[22px] mx-4 flex-shrink-0"/>
                                        <p className="text-sm leading-6 text-gray-900">{values.phoneNumber}</p>
                                    </div>
                                    }
                                    {values.email &&
                                    <div className='flex mt-2'>
                                        <AiOutlineMail className="h-[22px] w-[22px] mx-4 flex-shrink-0"/>
                                        <p className="text-sm leading-6 text-gray-900">{values.email}</p>
                                    </div>
                                    }
                                    {values.address &&
                                    <div className='flex mt-2'>
                                        <AiOutlineHome className="h-[22px] w-[22px] mx-4 flex-shrink-0"/>
                                        <p className="text-sm leading-6 text-gray-900">{values.address}</p>
                                    </div>
                                    }
                                    {values.emailAddress &&
                                    <div className='flex mt-2 '>
                                        <BsMailbox className="h-[22px] w-[22px] mx-4 flex-shrink-0"/>
                                        <p className="text-sm leading-6 text-gray-900">{values.emailAddress}</p>
                                    </div>}
                                </div>
                            </div>
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm leading-6 text-gray-900">Added {values.dateAdded ? format(new Date(values.dateAdded), 'MM/dd/yyyy'):''}</p>
                                {true ? (
                                    <div className='text-[#6DA172] flex items-center'>
                                        {values.leadStatus === "Active" ?
                                        <img src={GraphActive} width={17} alt="ThreeDots"  className='object-none mr-2'/>:
                                        values.leadStatus === "Waiting"?
                                        <img src={GraphWaiting} width={17} height={17} alt="ThreeDots"  className='object-contain mr-2'/>:
                                        values.leadStatus === "Lost" ?
                                        <img src={GraphLost} width={17} height={17} alt="ThreeDots"  className='object-contain mr-2'/>: null
                                    }
                                        <p className="mt-1 text-xs leading-5 ">
                                            {values.leadStatus}
                                        </p>
                                    </div>
                                ) : null}
                            </div>
                        </li>
                        {values.secondaryFirstName && values.secondaryPhoneNumber &&
                        <li className="flex justify-between gap-x-6 py-5">
                            <div className="flex min-w-0 gap-x-4">
                            <img src={DefaultAvatar} alt="addProfile" className="h-[80px] w-[80px] flex-none rounded-full bg-gray-50" />
                                <div className="min-w-0 flex-auto">
                                    {values.secondaryFirstName &&
                                    <div className='flex'>
                                        <LuUser2 className="h-[22px] w-[22px] mx-4"/>
                                        <p className="text-sm leading-6 text-gray-900">{values.secondaryFirstName+' '+values.secondaryLastName}</p>
                                    </div>
                                    }
                                    {values.secondaryPhoneNumber &&
                                    <div className='flex mt-2'>
                                        <AiOutlinePhone className="h-[22px] w-[22px] mx-4"/>
                                        <p className="text-sm leading-6 text-gray-900">{values.secondaryPhoneNumber}</p>
                                    </div>
                                    }
                                    {values.secondaryEmailAddress &&
                                    <div className='flex mt-2'>
                                        <AiOutlineMail className="h-[22px] w-[22px] mx-4"/>
                                        <p className="text-sm leading-6 text-gray-900">{values.email}</p>
                                    </div>
                                    }
                                </div>
                            </div>
                        </li>}
                    </ul>
                }
                {values.leadType === 'Buyer' &&
                (currentTab === 'All' || currentTab.endsWith('Preferences')) &&
                    <div>
                        <div className='mt-[25px]'>
                            <Typography variant='h3' color='primary' >{values.leadType} Preferences</Typography>
                            <div className='flex justify-between mt-[10px]'>
                                <div>
                                    <Typography variant='caption' color='secondary'>Locations</Typography>
                                    <div className='flex gap-x-4'>
                                        {values.buyerLocationsMulti.map((value: string, index: number) => {
                                                return <Typography key={index} variant='h4' color='primary' className='mb-[10px]'>{value}</Typography>
                                            })}
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-between mt-[10px]'>
                                <div>
                                    <Typography variant='caption' color='secondary'>Schoole Districts</Typography>
                                    <div className='flex gap-x-4'>
                                        {values.buyerSchoolDistrictsMulti.map((value: string, index: number) => {
                                                return <Typography key={index} variant='h4' color='primary' className='mb-[10px]'>{value}</Typography>
                                            })}
                                    </div>
                                </div>
                            </div>

                            <div className='flex w-full '>
                                <div className='w-1/2 gap-y-4'>
                                    <Typography variant='caption' color='secondary'>Property Type</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.buyerPropertyType}</Typography>
                                </div>
                                <div className='w-1/2 gap-y-4'>
                                    <Typography variant='caption' color='secondary'>Minimum Home SqFt</Typography>
                                    <Typography variant='h4' color='primary'  className='mb-[10px] '>{values.buyerMinimumHomeSqFt}</Typography>
                                </div>
                            </div>
                            <div className='flex w-full '>
                                <div className='w-1/2 gap-y-4'>
                                    <Typography variant='caption' color='secondary'>Stories</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.buyerStories}</Typography>
                                </div>
                                <div className='w-1/2 gap-y-4'>
                                    <Typography variant='caption' color='secondary'>Parking</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.buyerParking}</Typography>
                                </div>
                            </div>
                            <div className='flex w-full '>
                                <div className='w-1/2 gap-y-4'>
                                    <Typography variant='caption' color='secondary'>Minimum Bedrooms</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.buyerMinimumBathrooms}</Typography>
                                </div>
                                <div className='w-1/2 gap-y-4'>
                                    <Typography variant='caption' color='secondary'>Minimum Bathrooms</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.buyerMinimumBathrooms}</Typography>
                                </div>
                            </div>
                            <div className='flex w-full '>
                                <div className='w-1/2 gap-y-4'>
                                    <Typography variant='caption' color='secondary'>Cooling</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.buyerCooling}</Typography>
                                </div>
                                <div className='w-1/2 gap-y-4'>
                                    <Typography variant='caption' color='secondary'>Garage</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.buyerGarage}</Typography>
                                </div>
                            </div>

                            <div className='flex w-full '>
                                <div className='w-1/2 gap-y-4'>
                                    <Typography variant='caption' color='secondary'>Views</Typography>
                                    <div className='flex gap-x-4'>
                                        {values.buyerViewsMulti.map((value: string, index: number) => {
                                                return <Typography key={index} variant='h4' color='primary' className='mb-[10px]'>{value}</Typography>
                                            })}
                                    </div>
                                </div>
                                <div className='w-1/2 gap-y-4'>
                                    <Typography variant='caption' color='secondary'>Pool</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.buyerPool}</Typography>
                                </div>
                            </div>

                            <div className='flex w-full '>
                                <div className='w-1/2 gap-y-4'>
                                    <Typography variant='caption' color='secondary'>Attached Ok?</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.buyerIsAttached}</Typography>
                                </div>
                                <div className='w-1/2 gap-y-4'>
                                    <Typography variant='caption' color='secondary'>New Construction only</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.buyerNewConstruction}</Typography>
                                </div>
                            </div>
                            <div className='flex justify-between mt-[10px]'>
                                <div>
                                    <Typography variant='caption' color='secondary'>Amenities</Typography>
                                    <div className='flex gap-x-4'>
                                        {values.buyerAmenitiesMulti.map((value: string, index: number) => {
                                                return <Typography key={index} variant='h4' color='primary' className='mb-[10px]'>{value}</Typography>
                                            })}
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-between mt-[10px]'>
                                <div>
                                    <Typography variant='caption' color='secondary'>Keywords</Typography>
                                    <div className='flex gap-x-4'>
                                        {values.buyerKeywordsMulti.map((value: string, index: number) => {
                                                return <Typography key={index} variant='h4' color='primary' className='mb-[10px]'>{value}</Typography>
                                            })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {(currentTab === 'All' || currentTab.endsWith('Notes')) &&
                    <div className='mt-[25px]'>
                        <Typography variant='h3' color='primary' >Notes</Typography>
                        <div className='flex justify-between mt-[10px]'>
                            <div>
                                <Typography variant='caption' color='secondary'>About the lead</Typography>
                                <Typography variant='h4' color='primary' className='mb-[10px]'>{values.about}</Typography>
                            </div>
                        </div>
                        <div className='flex w-full mt-[10px]'>
                            <div className='w-1/2 gap-y-4'>
                                <Typography variant='caption' color='secondary'>Last Contact Date</Typography>
                                <Typography variant='h4' color='primary' className='mb-[10px]'>{values.lastContact?format(new Date(values.lastContact), 'MM/dd/yyyy'):''}</Typography>
                                <Typography variant='caption' color='secondary'>Start of Target Date</Typography>
                                <Typography variant='h4' color='primary' className='mb-[10px]'>{values.startOfTarget?format(new Date(values.startOfTarget), 'MM/dd/yyyy'):''}</Typography>
                            </div>
                            <div className='w-1/2 gap-y-4'>
                                <Typography variant='caption' color='secondary'>Next Contact Date</Typography>
                                <Typography variant='h4' color='primary'  className='mb-[10px] '>{values.nextContact?format(new Date(values.nextContact), 'MM/dd/yyyy'):''}</Typography>
                                <Typography variant='caption' color='secondary'>End of Target Date</Typography>
                                <Typography variant='h4' color='primary' className='mb-[10px]'>{values.endOfTarget?format(new Date(values.endOfTarget), 'MM/dd/yyyy'):''}</Typography>
                            </div>
                        </div>
                        
                    </div>
                }
                {values.leadType === 'Seller' && (currentTab === 'All' || currentTab ==='Property Description') &&
                    <div>
                        <div className='mt-[25px]'>
                            <Typography variant='h3' color='primary' >Property Description</Typography>
                            <div className=' mt-[10px]'>
                                <div className='flex w-full '>
                                    <div className='w-1/2 gap-y-4'>
                                        <Typography variant='caption' color='secondary'>Address</Typography>
                                        <Typography variant='h4' color='primary' className='mb-[10px]'>{values.sellerPropertyAddress}</Typography>
                                    </div>
                                    <div className='w-1/2 gap-y-4'>
                                        <Typography variant='caption' color='secondary'>Unit</Typography>
                                        <Typography variant='h4' color='primary' className='mb-[10px]'>{values.sellerUnit}</Typography>
                                    </div>
                                </div>
                                <div className='flex w-full '>
                                    <div className='w-1/2 gap-y-4'>
                                        <Typography variant='caption' color='secondary'>Property Type</Typography>
                                        <Typography variant='h4' color='primary' className='mb-[10px]'>{values.sellerPropertyType}</Typography>
                                    </div>
                                    <div className='w-1/2 gap-y-4'>
                                        <Typography variant='caption' color='secondary'>Property Sub-Type</Typography>
                                        <Typography variant='h4' color='primary' className='mb-[10px]'>{values.sellerPropertySubType}</Typography>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-between mt-[10px]'>
                                <div>
                                    <Typography variant='caption' color='secondary'>School Districts</Typography>
                                    <div className='flex gap-x-4'>
                                        {values.sellerSchoolDistrictsMulti.map((value: string, index: number) => {
                                                return <Typography key={index} variant='h4' color='primary' className='mb-[10px]'>{value}</Typography>
                                            })}
                                    </div>
                                </div>
                            </div>
                            <div className='mt-[10px]'>
                                <div className='flex w-full '>
                                    <div className='w-1/2 gap-y-4'>
                                        <Typography variant='caption' color='secondary'>Property Type</Typography>
                                        <Typography variant='h4' color='primary' className='mb-[10px]'>{values.sellerPropertyType}</Typography>
                                    </div>
                                    <div className='w-1/2 gap-y-4'>
                                        <Typography variant='caption' color='secondary'>Property Sub-Type</Typography>
                                        <Typography variant='h4' color='primary' className='mb-[10px]'>{values.sellerPropertySubType}</Typography>
                                    </div>
                                </div>
                                <div className='flex w-full '>
                                    <div className='w-1/2 gap-y-4'>
                                        <Typography variant='caption' color='secondary'>Unit Count</Typography>
                                        <Typography variant='h4' color='primary' className='mb-[10px]'>{values.sellerUnitCount}</Typography>
                                    </div>
                                    <div className='w-1/2 gap-y-4'>
                                        <Typography variant='caption' color='secondary'>Stories</Typography>
                                        <Typography variant='h4' color='primary' className='mb-[10px]'>{values.sellerStories}</Typography>
                                    </div>
                                </div>
                                <div className='flex w-full '>
                                    <div className='w-1/2 gap-y-4'>
                                        <Typography variant='caption' color='secondary'>Home Size (SqFt)</Typography>
                                        <Typography variant='h4' color='primary' className='mb-[10px]'>{values.sellerHomeSqFt}</Typography>
                                    </div>
                                    <div className='w-1/2 gap-y-4'>
                                        <Typography variant='caption' color='secondary'>Lot Size (SqFt)</Typography>
                                        <Typography variant='h4' color='primary'  className='mb-[10px] '>{values.sellerLotSqFt}</Typography>
                                    </div>
                                </div>
                                <div className='flex w-full '>
                                    <div className='w-1/2 gap-y-4'>
                                        <Typography variant='caption' color='secondary'>Bedrooms</Typography>
                                        <Typography variant='h4' color='primary' className='mb-[10px]'>{values.sellerBedrooms}</Typography>
                                    </div>
                                    <div className='w-1/2 gap-y-4'>
                                        <Typography variant='caption' color='secondary'>Bathrooms</Typography>
                                        <Typography variant='h4' color='primary' className='mb-[10px]'>{values.sellerBathrooms}</Typography>
                                    </div>
                                </div>
                                <div className='flex w-full '>
                                    <div className='w-1/2 gap-y-4'>
                                        <Typography variant='caption' color='secondary'>Parking</Typography>
                                        <Typography variant='h4' color='primary' className='mb-[10px]'>{values.sellerParking}</Typography>
                                    </div>
                                    <div className='w-1/2 gap-y-4'>
                                        <Typography variant='caption' color='secondary'>Garage</Typography>
                                        <Typography variant='h4' color='primary' className='mb-[10px]'>{values.sellerGarage}</Typography>
                                    </div>
                                </div>
                                <div className='flex w-full '>
                                    <div className='w-1/2 gap-y-4'>
                                        <Typography variant='caption' color='secondary'>Heating</Typography>
                                        <Typography variant='h4' color='primary' className='mb-[10px]'>{values.sellerHeating}</Typography>
                                    </div>
                                    <div className='w-1/2 gap-y-4'>
                                        <Typography variant='caption' color='secondary'>Cooling</Typography>
                                        <Typography variant='h4' color='primary' className='mb-[10px]'>{values.sellerCooling}</Typography>
                                    </div>
                                </div>
                                <div className='flex w-full '>
                                    <div className='w-1/2 gap-y-4'>
                                        <Typography variant='caption' color='secondary'>Views</Typography>
                                        <div className='flex gap-x-4'>
                                            {values.sellerViewsMulti.map((value: string, index: number) => {
                                                    return <Typography key={index} variant='h4' color='primary' className='mb-[10px]'>{value}</Typography>
                                                })}
                                        </div>
                                    </div>
                                    <div className='w-1/2 gap-y-4'>
                                        <Typography variant='caption' color='secondary'>Pool</Typography>
                                        <Typography variant='h4' color='primary' className='mb-[10px]'>{values.sellerPool}</Typography>
                                    </div>
                                </div>
                                <div className='flex w-full '>
                                    <div className='w-1/2 gap-y-4'>
                                        <Typography variant='caption' color='secondary'>Is Attached?</Typography>
                                        <Typography variant='h4' color='primary' className='mb-[10px]'>{values.sellerIsAttached}</Typography>
                                    </div>
                                    <div className='w-1/2 gap-y-4'>
                                        <Typography variant='caption' color='secondary'>New Construction</Typography>
                                        <Typography variant='h4' color='primary' className='mb-[10px]'>{values.sellerNewConstruction}</Typography>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-between mt-[10px]'>
                                <div>
                                    <Typography variant='caption' color='secondary'>Amenities</Typography>
                                    <div className='flex gap-x-4'>
                                        {values.sellerAmenitiesMulti.map((value: string, index: number) => {
                                                return <Typography key={index} variant='h4' color='primary' className='mb-[10px]'>{value}</Typography>
                                            })}
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-between mt-[10px]'>
                                <div>
                                    <Typography variant='caption' color='secondary'>Keywords</Typography>
                                    <div className='flex gap-x-4'>
                                        {values.sellerKeywordsMulti.map((value: string, index: number) => {
                                                return <Typography key={index} variant='h4' color='primary' className='mb-[10px]'>{value}</Typography>
                                            })}
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-between mt-[10px]'>
                                <div>
                                    <Typography variant='caption' color='secondary'>Property Description</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.sellerPropertyDescription}</Typography>
                                </div>
                            </div>
                            
                        </div>
                        <div className='mt-[25px]'>
                            <Typography variant='h3' color='primary'>Other Details</Typography>
                            <div className=' mt-[10px]'>
                                <div className='flex w-full '>
                                    <div className='w-1/2 gap-y-4'>
                                        <Typography variant='caption' color='secondary'>Address</Typography>
                                        <Typography variant='h4' color='primary' className='mb-[10px]'>{values.sellerPropertyAddress}</Typography>
                                    </div>
                                    <div className='w-1/2 gap-y-4'>
                                        <Typography variant='caption' color='secondary'>Unit</Typography>
                                        <Typography variant='h4' color='primary' className='mb-[10px]'>{values.sellerUnit}</Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {values.leadType === 'Renter' &&
                    <div>
                    </div>
                }

                {values.leadType === 'Landlord' &&
                    <div>
                    </div>
                }
                
                {values.leadType === 'Buyer' &&
                    <div>
                        {(currentTab === 'All' || currentTab === 'Financing') &&
                        <div className='mt-[25px]'>
                            <Typography variant='h3' color='primary' >Pre-Approval</Typography>
                            <div className='flex w-full mt-[10px]'>
                                <div className='w-1/2'>
                                    <Typography variant='caption' color='secondary'>Is pre-approved?</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px] '>{values.buyerIsPreApproved}</Typography>
                                    <Typography variant='caption' color='secondary'>Loan officer First Name</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.buyerLoanOfficerFirstName}</Typography>
                                    <Typography variant='caption' color='secondary'>Loan officer Phone</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.buyerLoanOfficerPhone}</Typography>
                                    <Typography variant='caption' color='secondary'>Lender Company</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.buyerLenderCompany}</Typography>
                                    <Typography variant='caption' color='secondary'>Primary Borrower</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.buyerPrimaryBorrower}</Typography>
                                    <Typography variant='caption' color='secondary'>Loan Type</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.buyerLoanType}</Typography>
                                    <Typography variant='caption' color='secondary'>Seller's Consession</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.buyerSellerConsession}</Typography>
                                    <Typography variant='caption' color='secondary'>Base Loan Amount</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.buyerBaseLoanAmount}</Typography>
                                    <Typography variant='caption' color='secondary'>Taxes (Annual)</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.buyerAnnualTaxes}</Typography>
                                    <Typography variant='caption' color='secondary'>HOA Dues (Annual)</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.buyerAnnualHOADues}</Typography>
                                    <Typography variant='caption' color='secondary'>Other Expenses (Annual)</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.buyerAnnualOtherExpenses}</Typography>
                                </div>
                                <div className='w-1/2'>
                                    <Typography variant='caption' color='secondary'>Maximum Purchas Price</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.buyerMaximumPurchasPrice}</Typography>
                                    <Typography variant='caption' color='secondary'>Loan Officer Last Name</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.buyerLoanOfficerLastName}</Typography>
                                    <Typography variant='caption' color='secondary'>Loan Officer Email</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.buyerLoanOfficerEmail}</Typography>
                                    <Typography variant='caption' color='secondary'>Secondary Borrower</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.buyerSecondaryBorrower}</Typography>
                                    <Typography variant='caption' color='secondary'>Purchas Price</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.buyerPurchasPrice}</Typography>
                                    <Typography variant='caption' color='secondary'>Down Pament Amount</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.buyerDownPaymentAmount}</Typography>
                                    <Typography variant='caption' color='secondary'>Loan to Value</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.buyerLoanToValue}</Typography>
                                    <Typography variant='caption' color='secondary'>Insurance (Annual)</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.buyerAnnualInsurance}</Typography>
                                    <Typography variant='caption' color='secondary'>Down Payment</Typography>
                                    <Typography variant='h4' color='primary' className='mb-[10px]'>{values.buyerDownPaymentAmount}</Typography>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default ViewRelationship