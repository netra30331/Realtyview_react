import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'
import Typography from "@/components/baseComponents/Typography"
import Select from "@/components/baseComponents/Select"
import TextField from '@/components/baseComponents/TextField'
import { DatePicker } from '@/components/baseComponents/DatePickers'
import AddressAutoComplete from '@/components/baseComponents/AddressAutoComplete'
import { getAddresses } from '@/redux/user/userSlice'
import { useAppSelector } from '@/redux/hooks'
import { MdOutlineWrongLocation, MdOutlineAddLocationAlt } from 'react-icons/md'
import { Button } from '@/components/baseComponents/Button'
import Scrollbars from 'react-custom-scrollbars'
import { NumericFormat } from 'react-number-format'

type IProps = {
    open: boolean
    data?: any
    changeState: Function
    keyword?: string
    sortType?: string
    sortField?: string
}
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const AdvancedSearch = (props: IProps) => {
    const tabs = [
        { name: 'All' },
        { name: 'Locations' },
        { name: 'Property' },
        { name: 'Listing' },
        { name: 'Expenses' },
        { name: 'Other' },
    ];
    const select_options = [
        { value: 'Option1', label: 'Option 1' },
        { value: 'Option2', label: 'Option 2' },
        { value: 'Option3', label: 'Option 3' },
    ];

    const [currentTab, setCurrentTab] = React.useState<string>('All')
    const [addressInputNumbers, setAddressInputNumbers] = React.useState<Array<number>>([0, 1]);
    const [forceUpdateFlag, setForceUpdateFlag] = React.useState<boolean>(false)
    const addresses = useAppSelector(getAddresses)

    const addAddress = () => {
        addressInputNumbers.push(Math.max(...addressInputNumbers) + 1);
        setAddressInputNumbers(addressInputNumbers);
        setForceUpdateFlag(!forceUpdateFlag);
    }

    const deleteAddress = (index: any) => {
        addressInputNumbers.splice(index, 1);
        setAddressInputNumbers(addressInputNumbers);
        setForceUpdateFlag(!forceUpdateFlag);
    }


    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="relative z-30" onClose={() => props.changeState(false)}>
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
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-[600px]">
                                    <div className="flex h-full flex-col bg-white shadow-xl">
                                        <div className='fixed w-full bg-white z-30 pt-5'>
                                            <div className="px-4 sm:px-6  w-full bg-white">
                                                <div className="flex items-start justify-between">
                                                    <Dialog.Title className="">
                                                        <Typography variant="h2" color="primary" className='my-0'>Advanced Search</Typography>
                                                    </Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center gap-3">
                                                        <button
                                                            type="button"
                                                            className="relative rounded-md bg-white text-gray-400 hover:text-[#6DA172] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                            onClick={() => props.changeState(false)}
                                                        >
                                                            <span className="absolute -inset-2.5" />
                                                            <span className="sr-only">Close panel</span>
                                                            <Typography variant="body" color="secondary" className='my-0'>Search</Typography>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="relative rounded-md bg-white text-gray-400 hover:text-[#C84156] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                            onClick={() => props.changeState(false)}
                                                        >
                                                            <span className="absolute -inset-2.5" />
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex h-full flex-col bg-white py-6 shadow-xl">
                                            <div className='border-b mt-10'></div>
                                            <Scrollbars autoHide>
                                                <div className='flex justify-center w-full mt-4'>
                                                    <nav className="-mb-px flex justify-center mx-10 w-full border-b" aria-label="Tabs">
                                                        <div className='flex justify-between items-end w-full'>
                                                            {tabs.map((tab, index) => (
                                                                <div
                                                                    key={index}
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

                                                {(currentTab === 'All' || currentTab === 'Locations') && (
                                                    <div className='mt-8 px-8'>
                                                        <Typography variant="h3" color="primary">Locations</Typography>
                                                        <div className="grid grid-cols-1 gap-3 mt-[15px]">
                                                            <div className="col-span-1">
                                                                <Typography variant="caption" color="secondary" className=''>Address</Typography>
                                                                <AddressAutoComplete
                                                                    value={''}
                                                                    options={addresses}
                                                                    placeholder="Enter an Address, City, State or Zip Code"
                                                                    filterKey='streetLine'
                                                                    onChange={(e) => { console.log('eee', e) }}
                                                                    onAllChange={(e) => { console.log('all', e) }}
                                                                />
                                                                {addressInputNumbers.map((item: any, index: any) => {
                                                                    return (
                                                                        <div key={index} className='flex mt-4 relative'>
                                                                            <AddressAutoComplete
                                                                                className='w-full'
                                                                                value={''}
                                                                                options={addresses}
                                                                                placeholder="Enter an Address, City, State or Zip Code"
                                                                                filterKey='streetLine'
                                                                                onChange={(e) => { console.log('eee', e, item) }}
                                                                                onAllChange={(e) => { console.log('all', e) }}
                                                                            />
                                                                            <MdOutlineWrongLocation
                                                                                className='absolute right-2 top-2 text-[20px] cursor-pointer hover:text-secondary'
                                                                                onClick={() => deleteAddress(index)}
                                                                            />
                                                                        </div>
                                                                    )
                                                                })}
                                                                <Button className='w-[250px] bg-gray-200 hover:bg-[lightgray] mt-4' onClick={() => addAddress()}>
                                                                    <div className='flex'>
                                                                        <div className='mr-2 text-primary'><MdOutlineAddLocationAlt className='text-[20px]' /></div>
                                                                        <Typography variant='button2' color="primary">Add Another Location</Typography>
                                                                    </div>
                                                                </Button>

                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {(currentTab === 'All' || currentTab === 'Property') && (
                                                    <div className='mt-8 px-8'>
                                                        <Typography variant="h3" color="primary">Property Details</Typography>
                                                        <div className="grid grid-cols-2 gap-3 mt-[15px]">
                                                            <div className="col-span-2 md:col-span-1">
                                                                <Typography variant="caption" color="secondary" className=''>Property Type</Typography>
                                                                <Select
                                                                    options={select_options}
                                                                    name='leadType'
                                                                // value={{ value: props.data.leadType, label: props.data.leadType }}
                                                                // onChange={(value) => props.handleSelectChange(value, 'leadType')}
                                                                />
                                                            </div>
                                                            <div className="col-span-2 md:col-span-1">
                                                                <Typography variant="caption" color="secondary" className=''>Property Sub-Type</Typography>
                                                                <Select
                                                                    options={[
                                                                        { value: 'Active', label: 'Active' },
                                                                        { value: 'Inactive', label: 'Inactive' },
                                                                    ]}
                                                                    name='leadStatus'
                                                                // value={{ value: props.data.leadStatus, label: props.data.leadStatus }}
                                                                // onChange={(value) => props.handleSelectChange(value, 'leadStatus')}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-3 mt-[15px]">
                                                            <div className="col-span-2 md:col-span-1">
                                                                <Typography variant="caption" color="secondary" className=''>Bedrooms</Typography>
                                                                <NumericFormat
                                                                    thousandSeparator=","
                                                                    name="propertyBedrooms"
                                                                    // value={props.data?.propertyBedrooms}
                                                                    // onChange={(e) => props.handleInputChange(e, "number")}
                                                                    className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark"
                                                                />
                                                            </div>
                                                            <div className="col-span-2 md:col-span-1">
                                                                <Typography variant="caption" color="secondary" className=''>Bathrooms</Typography>
                                                                <NumericFormat
                                                                    thousandSeparator=","
                                                                    name="propertyBathrooms"
                                                                    // value={props.data?.propertyBathrooms}
                                                                    // onChange={(e) => props.handleInputChange(e, "number")}
                                                                    className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-3 mt-[15px]">
                                                            <div className="col-span-2 md:col-span-1">
                                                                <Typography variant="caption" color="secondary" className=''>Home SqFt (Minimum)</Typography>
                                                                <TextField placeholder='' name="home_sqft" className={`w-full`} />
                                                            </div>
                                                            <div className="col-span-2 md:col-span-1">
                                                                <Typography variant="caption" color="secondary" className=''>Lot SqFt  (Minimum)</Typography>
                                                                <TextField placeholder='' name="lot_sqft" className={`w-full`} />
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-3 mt-[15px]">
                                                            <div className="col-span-2 md:col-span-1">
                                                                <Typography variant="caption" color="secondary" className=''>Stories</Typography>
                                                                <Select
                                                                    options={select_options}
                                                                    name='leadType'
                                                                // value={{ value: props.data.leadType, label: props.data.leadType }}
                                                                // onChange={(value) => props.handleSelectChange(value, 'leadType')}
                                                                />
                                                            </div>
                                                            <div className="col-span-2 md:col-span-1">
                                                                <Typography variant="caption" color="secondary" className=''>Parking</Typography>
                                                                <Select
                                                                    options={select_options}
                                                                    name='leadStatus'
                                                                // value={{ value: props.data.leadStatus, label: props.data.leadStatus }}
                                                                // onChange={(value) => props.handleSelectChange(value, 'leadStatus')}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-3 mt-[15px]">
                                                            <div className="col-span-2 md:col-span-1">
                                                                <Typography variant="caption" color="secondary" className=''>Cooling</Typography>
                                                                <Select
                                                                    options={select_options}
                                                                    name='leadType'
                                                                // value={{ value: props.data.leadType, label: props.data.leadType }}
                                                                // onChange={(value) => props.handleSelectChange(value, 'leadType')}
                                                                />
                                                            </div>
                                                            <div className="col-span-2 md:col-span-1">
                                                                <Typography variant="caption" color="secondary" className=''>Garage</Typography>
                                                                <Select
                                                                    options={select_options}
                                                                    name='leadStatus'
                                                                // value={{ value: props.data.leadStatus, label: props.data.leadStatus }}
                                                                // onChange={(value) => props.handleSelectChange(value, 'leadStatus')}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-3 mt-[15px]">
                                                            <div className="col-span-2 md:col-span-1">
                                                                <Typography variant="caption" color="secondary" className=''>Views</Typography>
                                                                <Select
                                                                    options={select_options}
                                                                    name='leadType'
                                                                // value={{ value: props.data.leadType, label: props.data.leadType }}
                                                                // onChange={(value) => props.handleSelectChange(value, 'leadType')}
                                                                />
                                                            </div>
                                                            <div className="col-span-2 md:col-span-1">
                                                                <Typography variant="caption" color="secondary" className=''>Pool</Typography>
                                                                <Select
                                                                    options={select_options}
                                                                    name='leadStatus'
                                                                // value={{ value: props.data.leadStatus, label: props.data.leadStatus }}
                                                                // onChange={(value) => props.handleSelectChange(value, 'leadStatus')}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-3 mt-[15px]">
                                                            <div className="col-span-2 md:col-span-1">
                                                                <Typography variant="caption" color="secondary" className=''>Attached</Typography>
                                                                <Select
                                                                    options={select_options}
                                                                    name='leadType'
                                                                // value={{ value: props.data.leadType, label: props.data.leadType }}
                                                                // onChange={(value) => props.handleSelectChange(value, 'leadType')}
                                                                />
                                                                {/* <Typography variant="body" color="primary" className='pl-4'>$</Typography> */}

                                                            </div>
                                                            <div className="col-span-2 md:col-span-1">
                                                                <Typography variant="caption" color="secondary" className=''>New Construction</Typography>
                                                                <Select
                                                                    options={select_options}
                                                                    name='leadStatus'
                                                                // value={{ value: props.data.leadStatus, label: props.data.leadStatus }}
                                                                // onChange={(value) => props.handleSelectChange(value, 'leadStatus')}
                                                                />
                                                                {/* <Typography variant="body" color="primary" className='pl-4'>$</Typography> */}
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-1 mt-[15px]">
                                                            <div className="col-span-1">
                                                                <Typography variant="caption" color="secondary">Amenities</Typography>
                                                                <TextField placeholder='Enter Lead’s Desired Amenities' name="amenities" className={`w-full`} />
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-1 mt-[15px]">
                                                            <div className="col-span-1">
                                                                <Typography variant="caption" color="secondary">Keywords</Typography>
                                                                <TextField placeholder='Add Keywords to Look for in Listings' name="keyword" className={`w-full`} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {(currentTab === 'All' || currentTab === 'Listing') && (
                                                    <div className='mt-8 px-8'>
                                                        <Typography variant="h3" color="primary">Listing Details</Typography>
                                                        <div className="grid grid-cols-2 gap-3 mt-[15px]">
                                                            <div className="col-span-2 md:col-span-1">
                                                                <Typography variant="caption" color="secondary">Date Listed</Typography>
                                                                <DatePicker name='date_listed' />
                                                            </div>
                                                            <div className="col-span-2 md:col-span-1">
                                                                <Typography variant="caption" color="secondary">Listing Expiration Date</Typography>
                                                                <DatePicker name='expiration_date' />
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-3 mt-[15px]">
                                                            <div className="col-span-2 md:col-span-1">
                                                                <Typography variant="caption" color="secondary">Listing Type</Typography>
                                                                <Select
                                                                    options={select_options}
                                                                    name='leadType'
                                                                // value={{ value: props.data.leadType, label: props.data.leadType }}
                                                                // onChange={(value) => props.handleSelectChange(value, 'leadType')}
                                                                />
                                                            </div>
                                                            <div className="col-span-2 md:col-span-1">
                                                                <Typography variant="caption" color="secondary">Sale Type</Typography>
                                                                <Select
                                                                    options={select_options}
                                                                    name='leadType'
                                                                // value={{ value: props.data.leadType, label: props.data.leadType }}
                                                                // onChange={(value) => props.handleSelectChange(value, 'leadType')}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {(currentTab === 'All' || currentTab === 'Expenses') && (
                                                    <div className='mt-8 px-8'>
                                                        <Typography variant="h3" color="primary">Expenses</Typography>
                                                        <div className="grid grid-cols-2 gap-3 mt-[15px]">
                                                            <div className="col-span-2 md:col-span-1">
                                                                <Typography variant="caption" color="secondary" className=''>List Price</Typography>
                                                                <TextField placeholder='' name="list_price" className={`w-full`} />
                                                            </div>
                                                            <div className="col-span-2 md:col-span-1">
                                                                <Typography variant="caption" color="secondary" className=''>Annual Taxes</Typography>
                                                                <TextField placeholder='' name="annual_taxes" className={`w-full`} />
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-3 mt-[15px]">
                                                            <div className="col-span-2 md:col-span-1">
                                                                <Typography variant="caption" color="secondary" className=''>HOA Expenses</Typography>
                                                                <TextField placeholder='' name="hoa_expenses" className={`w-full`} />
                                                            </div>
                                                            <div className="col-span-2 md:col-span-1">
                                                                <Typography variant="caption" color="secondary" className=''>Other Monthly Expenses</Typography>
                                                                <TextField placeholder='' name="other_monthly_expenses" className={`w-full`} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {(currentTab === 'All' || currentTab === 'Other') && (
                                                    <div className='mt-8 px-8'>
                                                        <Typography variant="h3" color="primary">Other</Typography>
                                                        <div className="grid grid-cols-2 gap-3 mt-[15px]">
                                                            <div className="col-span-2 md:col-span-1">
                                                                <Typography variant="caption" color="secondary">Occupancy Status</Typography>
                                                                <Select
                                                                    options={select_options}
                                                                    name='leadType'
                                                                // value={{ value: props.data.leadType, label: props.data.leadType }}
                                                                // onChange={(value) => props.handleSelectChange(value, 'leadType')}
                                                                />
                                                            </div>
                                                            <div className="col-span-2 md:col-span-1">
                                                                <Typography variant="caption" color="secondary">Lis Pendens</Typography>
                                                                <Select
                                                                    options={select_options}
                                                                    name='leadType'
                                                                // value={{ value: props.data.leadType, label: props.data.leadType }}
                                                                // onChange={(value) => props.handleSelectChange(value, 'leadType')}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-3 mt-[15px]">
                                                            <div className="col-span-2 md:col-span-1">
                                                                <Typography variant="caption" color="secondary">MLS Number</Typography>
                                                                <Select
                                                                    options={select_options}
                                                                    name='leadType'
                                                                // value={{ value: props.data.leadType, label: props.data.leadType }}
                                                                // onChange={(value) => props.handleSelectChange(value, 'leadType')}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Scrollbars>
                                        </div>

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default AdvancedSearch