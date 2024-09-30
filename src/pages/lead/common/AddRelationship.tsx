import React from 'react'
import Typography from "@/components/baseComponents/Typography"
import Select from "@/components/baseComponents/Select"
import TextField from '@/components/baseComponents/TextField'
import { DatePicker } from '@/components/baseComponents/DatePickers'
import Textarea from '@/components/baseComponents/Textarea'
import AddressAutoComplete from '@/components/baseComponents/AddressAutoComplete'
import LendloardProperty from './LendloardProperty';
import RenterProperty from './RenterProperty';
import SellerProperty from './SellerProperty';
import BuyerProperty from './BuyerProperty';
import BuyerPreApprovalDetails from './BuyerPreApprovalDetails';
import Scrollbars from 'react-custom-scrollbars'
type IProps = {
    data?: any
    handleInputChange: Function
    handleSelectChange: Function
    handleDateChange: Function
    errorFirstName: boolean
    errorLastName: boolean
    errorPhoneNumber: boolean
    errorBuyerLoanOfficerPhone: boolean
    errorEmail: boolean
    errorBuyerLoanOfficerEmail: boolean
    errorSecondaryPhoneNumber: boolean
    errorSecondaryEmail: boolean
    addresses: Array<any>
    onChangeAddressAutoComplete: Function
    onSelectAddressAutoComplete: Function
}
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}
const AddRelationship = (props: IProps) => {

    let tabs = [
        { name: 'All' },
        { name: 'Buyer info' },
        { name: 'Buyer Preferences' },
        { name: 'Financing' },
        { name: 'Notes' },
    ];
    if (props.data.leadType === "Buyer") {
    } else {
        tabs = [
            { name: 'All' },
            { name: 'Seller info' },
            { name: 'Property Description' },
            { name: 'Notes' },
        ];
    }
    const [currentTab, setCurrentTab] = React.useState<string>('All')

    return (
        <div className="relative flex-1 mt-16">
            <div className='border-b mt-0'></div>
            {/* Filter Tap */}

            <Scrollbars autoHide>
                <div className='flex justify-center mt-4 mx-8 border-b border-gray-200'>
                    <nav className="-mb-px flex justify-center w-full" aria-label="Tabs">
                        <div className='flex justify-between items-end w-full'>
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
                                    <Typography variant='h4'>{tab.name}</Typography>
                                </div>
                            ))}
                        </div>
                    </nav>
                </div>
                {/* General */}
                {currentTab === 'All' &&
                    <div className="mt-8 px-8">
                        <Typography variant="h3" color="primary">General Details</Typography>
                        <div className="grid grid-cols-2 gap-3 mt-[15px]">
                            <div className="col-span-2 sm:col-span-1">
                                <Typography variant="caption" color="secondary" className=''>Lead Type *</Typography>
                                <Select
                                    options={[
                                        { value: 'Buyer', label: 'Buyer' },
                                        { value: 'Seller', label: 'Seller' },
                                        // { value: 'Renter', label: 'Renter' },
                                        // { value: 'Landlord', label: 'Landlord' },
                                    ]}
                                    name='leadType'
                                    value={{ value: props.data.leadType, label: props.data.leadType }}
                                    onChange={(value) => props.handleSelectChange(value, 'leadType')}
                                />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <Typography variant="caption" color="secondary" className=''>Lead Status *</Typography>
                                <Select
                                    options={[
                                        { value: 'Active', label: 'Active' },
                                        { value: 'Inactive', label: 'Inactive' },
                                    ]}
                                    name='leadStatus'
                                    value={{ value: props.data.leadStatus, label: props.data.leadStatus }}
                                    onChange={(value) => props.handleSelectChange(value, 'leadStatus')}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-[15px]">
                            <div className="col-span-2 sm:col-span-1">
                                <Typography variant="caption" color="secondary" className=''>Date Added</Typography>
                                <DatePicker name='dateAdded' value={props.data.dateAdded} onChange={(value) => props.handleDateChange(value, 'dateAdded')} />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <Typography variant="caption" color="secondary" className=''>Lead Source</Typography>
                                <Select
                                    options={[
                                        { value: 'Real Estate Platform', label: 'Real Estate Platform' },
                                        { value: 'Social Network', label: 'Social Network' },
                                        { value: 'Outreach', label: 'Outreach' },
                                        { value: 'Referral', label: 'Referral' },
                                        { value: 'Advertising', label: 'Advertising' },
                                        { value: 'Friends and Family', label: 'Friends and Family' },
                                        { value: 'Open House', label: 'Open House' },
                                    ]}
                                    name='leadSource'
                                    value={{ value: props.data.leadSource, label: props.data.leadSource }}
                                    onChange={(value) => props.handleSelectChange(value, 'leadSource')}
                                />
                            </div>
                        </div>
                    </div>
                }
                {(currentTab === 'All' || currentTab.endsWith('info')) &&
                    <div className="mt-8 px-8">
                        <Typography variant="h3" color="primary">Primary {props.data.leadType} Details</Typography>
                        <div className="grid grid-cols-2 gap-3 mt-[15px]">
                            <div className="col-span-2 sm:col-span-1">
                                <Typography variant="caption" color="secondary">First Name *</Typography>
                                <TextField name="firstName" className={`w-full ${props.errorFirstName ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} value={props.data.firstName} onChange={(e) => props.handleInputChange(e)} />
                                {props.errorFirstName && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>This field is required</Typography>}
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <Typography variant="caption" color="secondary">Last Name *</Typography>
                                <TextField className={`w-full ${props.errorLastName ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} name="lastName" value={props.data.lastName} onChange={(e) => props.handleInputChange(e)} />
                                {props.errorLastName && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>This field is required</Typography>}
                            </div>
                        </div>
                        <div className="mt-[15px]">
                            <Typography variant="caption" color="secondary">Company Name</Typography>
                            <TextField placeholder="" name="companyName" value={props.data.companyName} onChange={(e) => props.handleInputChange(e)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-[15px]">
                            <div className="col-span-2 sm:col-span-1 relative">
                                <Typography variant="caption" color="secondary">Phone Number</Typography>
                                <TextField className={`w-full`} maxLength={12} name="phoneNumber" value={props.data.phoneNumber} onChange={(e) => props.handleInputChange(e)} />
                                {props.errorPhoneNumber && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>Please enter a valid phone number</Typography>}
                            </div>
                            <div className="col-span-2 sm:col-span-1 relative">
                                <Typography variant="caption" color="secondary">Email Address</Typography>
                                <TextField className={`w-full ${props.errorEmail ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} name="email" value={props.data.email} onChange={(e) => props.handleInputChange(e)} />
                                {props.errorEmail && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>Invalid Email Address</Typography>}
                            </div>
                        </div>
                        <div className="mt-[15px]">
                            <Typography variant="caption" color="secondary">Current Address</Typography>
                            {/* <TextField placeholder="Enter Lead's Current Address" name="address" value={props.data.address} onChange={(e) => props.handleInputChange(e)} /> */}
                            <AddressAutoComplete options={props.addresses} placeholder="Enter Lead's Current Address" filterKey='streetLine' value={props.data.address} onChange={(e) => props.onChangeAddressAutoComplete(e, 'address')} onAllChange={(e) => props.onSelectAddressAutoComplete(e, 'address')} />
                        </div>
                        <div className="mt-[15px]">
                            <Typography variant="caption" color="secondary">Mailing Address</Typography>
                            <AddressAutoComplete options={props.addresses} placeholder="Enter Lead's Mailing Address" filterKey='streetLine' value={props.data.emailAddress} onChange={(e) => props.onChangeAddressAutoComplete(e, 'emailAddress')} onAllChange={(e) => props.onSelectAddressAutoComplete(e, 'emailAddress')} />
                        </div>
                    </div>
                }
                {(currentTab === 'All' || currentTab.endsWith('info')) &&
                    <div className="mt-8 px-8">
                        <Typography variant="h3" color="primary">Secondary  {props.data?.leadType} Details</Typography>
                        <div className="grid grid-cols-2 gap-3 mt-[15px]">
                            <div className="col-span-2 sm:col-span-1">
                                <Typography variant="caption" color="secondary">First Name</Typography>
                                <TextField name="secondaryFirstName" value={props.data?.secondaryFirstName} onChange={(e) => props.handleInputChange(e)} />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <Typography variant="caption" color="secondary">Last Name</Typography>
                                <TextField name="secondaryLastName" value={props.data?.secondaryLastName} onChange={(e) => props.handleInputChange(e)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-[15px]">
                            <div className="col-span-2 sm:col-span-1">
                                <Typography variant="caption" color="secondary">Phone Number</Typography>
                                <TextField className={`w-full`} maxLength={12} name="secondaryPhoneNumber" value={props.data.secondaryPhoneNumber} onChange={(e) => props.handleInputChange(e)} />
                                {props.errorSecondaryPhoneNumber && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>Please enter a valid phone number</Typography>}
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <Typography variant="caption" color="secondary">Email Address</Typography>
                                <TextField className={`w-full ${props.data.errorSecondaryEmail ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} name="secondaryEmailAddress" value={props.data.secondaryEmailAddress} onChange={(e) => props.handleInputChange(e)} />
                                {props.errorSecondaryEmail && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>Invalid Email Address</Typography>}
                            </div>
                        </div>
                    </div>
                }
                {props.data.leadType === 'Buyer' &&
                    <div>
                        {(currentTab === 'All' || currentTab === 'Buyer Preferences') &&
                            <BuyerProperty
                                data={props.data}
                                handleSelectChange={props.handleSelectChange}
                                handleDateChange={props.handleDateChange}
                                handleInputChange={props.handleInputChange}
                                onChangeAddressAutoComplete={props.onChangeAddressAutoComplete}
                                onSelectAddressAutoComplete={props.onSelectAddressAutoComplete}
                            />
                        }
                        {(currentTab === 'All' || currentTab === 'Financing') &&
                            <BuyerPreApprovalDetails
                                data={props.data}
                                handleSelectChange={props.handleSelectChange}
                                handleDateChange={props.handleDateChange}
                                handleInputChange={props.handleInputChange}
                                errorBuyerLoanOfficerPhone={props.errorBuyerLoanOfficerPhone}
                                errorBuyerLoanOfficerEmail={props.errorBuyerLoanOfficerEmail} />
                        }
                    </div>

                }
                {props.data.leadType === 'Seller' && (currentTab === 'All' || currentTab === 'Property Description') &&
                    <div>
                        <SellerProperty
                            data={props.data}
                            handleSelectChange={props.handleSelectChange}
                            handleDateChange={props.handleDateChange}
                            handleInputChange={props.handleInputChange}
                            onChangeAddressAutoComplete={props.onChangeAddressAutoComplete}
                            onSelectAddressAutoComplete={props.onSelectAddressAutoComplete}
                        />
                    </div>
                }
                {props.data.leadType === 'Renter' &&
                    <div>
                        <RenterProperty data={props.data} handleSelectChange={props.handleSelectChange} handleDateChange={props.handleDateChange} handleInputChange={props.handleInputChange} />
                    </div>
                }
                {props.data.leadType === 'Landlord' &&
                    <LendloardProperty data={props.data} handleSelectChange={props.handleSelectChange} handleDateChange={props.handleDateChange} handleInputChange={props.handleInputChange} />
                }
                {/* Note section */}
                {(currentTab === 'All' || currentTab.endsWith('Notes')) &&
                    <div className="mt-8 px-8">
                        <Typography variant="h3" color="primary">Notes</Typography>
                        <div className="mt-[15px]">
                            <Typography variant="caption" color="secondary">About the Lead</Typography>
                            <Textarea name="about" value={props.data.about} onChange={(e) => props.handleInputChange(e)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-[15px]">
                            <div className="col-span-2 sm:col-span-1">
                                <Typography variant="caption" color="secondary" className=''>Last Contact Date</Typography>
                                <DatePicker name='lastContact' value={props.data.lastContact} onChange={(value) => props.handleDateChange(value, 'lastContact')} />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <Typography variant="caption" color="secondary" className=''>Next Contact Date</Typography>
                                <DatePicker name='nextContact' value={props.data.nextContact} onChange={(value) => props.handleDateChange(value, 'nextContact')} />
                            </div>
                        </div>
                    </div>
                }
                {(currentTab === 'All' || currentTab.endsWith('Notes')) &&
                    <div className="mt-8 px-8">
                        <Typography variant="h3" color="primary">Timeframe to {props.data.leadType === 'Buyer' ? 'Buy' : props.data.leadType === 'Seller' ? 'Sell' : 'Lease'}</Typography>
                        <div className="grid grid-cols-2 gap-3 mt-[15px]">
                            <div className="col-span-2 sm:col-span-1">
                                <Typography variant="caption" color="secondary" className=''>Start of Target Date</Typography>
                                <DatePicker name='startOfTarget' value={props.data.startOfTarget} onChange={(value) => props.handleDateChange(value, 'startOfTarget')} />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <Typography variant="caption" color="secondary" className=''>End of Target Date</Typography>
                                <DatePicker name='endOfTarget' value={props.data.endOfTarget} onChange={(value) => props.handleDateChange(value, 'endOfTarget')} />
                            </div>
                        </div>
                    </div>
                }
            </Scrollbars>
        </div>
    )
}

export default AddRelationship