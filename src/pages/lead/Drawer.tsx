import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'
import Typography from "@/components/baseComponents/Typography"
import { CreateLeadDto, ILead, UpdateLeadDto } from '@/shared/interfaces/interfaces'
import validation from '@/shared/services/validation'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getUser, getAddresses, fetchAddressAutocomplete } from '@/redux/user/userSlice'
import { createNewLead, updateLead } from '@/redux/lead/leadSlice'
import { notify } from '@/shared/services/notify'
import { AiOutlineCheck } from 'react-icons/ai'
import AddRelationship from '@/pages/lead/common/AddRelationship'

type IProps = {
    open: boolean
    data?: any
    changeState: Function
    keyword: string
    sortType: string
    sortField: string
    recordsPerPage: number
    currentPage: number
    setTotalCount: Function
    setCurrentPage: Function
}
const Drawer = (props: IProps) => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(getUser)
    const addresses = useAppSelector(getAddresses)

    const initialLead: ILead = {
        _id: props.data?._id ?? null,
        leadType: props.data?.leadType ?? 'Buyer',
        leadStatus: props.data?.leadStatus ?? 'Active',
        dateAdded: props.data?.dateAdded ? new Date(props.data?.dateAdded) : new Date(),
        leadSource: props.data?.leadSource ?? 'Real Estate Platform',
        firstName: props.data?.firstName ?? '',
        lastName: props.data?.lastName ?? '',
        companyName: props.data?.companyName ?? '',
        phoneNumber: props.data?.phoneNumber ?? '',
        email: props.data?.email ?? '',
        address: props.data?.address ?? '',
        emailAddress: props.data?.emailAddress ?? '',
        secondaryFirstName: props.data?.secondaryFirstName ?? '',
        secondaryLastName: props.data?.secondaryLastName ?? '',
        secondaryPhoneNumber: props.data?.secondaryPhoneNumber ?? '',
        secondaryEmailAddress: props.data?.secondaryEmailAddress ?? '',
        // Buyer
        buyerIsPreApproved: props.data?.buyerIsPreApproved ?? 'No',
        buyerMaximumPurchasPrice: props.data?.buyerMaximumPurchasPrice ?? '',
        buyerLocationsMulti: props.data?.buyerLocationsMulti ?? [],
        buyerSchoolDistrictsMulti: props.data?.buyerSchoolDistrictsMulti ?? [],
        buyerPropertyType: props.data?.buyerPropertyType ?? 'Single Family Residence',
        buyerPropertySubType: props.data?.buyerPropertySubType ?? '',
        buyerUnitCount: props.data?.buyerUnitCount ?? 1,
        buyerMinimumBedrooms: props.data?.buyerMinimumBedrooms ?? 1,
        buyerMinimumBathrooms: props.data?.buyerMinimumBathrooms ?? 1,
        buyerMinimumHomeSqFt: props.data?.buyerMinimumHomeSqFt ?? 1,
        buyerMinimumLotSqFt: props.data?.buyerMinimumLotSqFt ?? 1,
        buyerStories: props.data?.buyerStories ?? 'No',
        buyerParking: props.data?.buyerParking ?? 'No',
        buyerHeating: props.data?.buyerHeating ?? 'No',
        buyerHeatingTypeMulti: props.data?.buyerHeatingTypeMulti ?? [],
        buyerCooling: props.data?.buyerCooling ?? 'No',
        buyerCoolingTypeMulti: props.data?.buyerCoolingTypeMulti ?? [],
        buyerGarage: props.data?.buyerGarage ?? 'No',
        buyerViewsMulti: props.data?.buyerViewsMulti ?? [],
        buyerPool: props.data?.buyerPool ?? 'No',
        buyerIsAttached: props.data?.buyerAttached ?? 'Yes',
        buyerNewConstruction: props.data?.buyerNewConstruction ?? 'No',
        buyerAmenitiesMulti: props.data?.buyerAmenitiesMulti ?? [],
        buyerKeywordsMulti: props.data?.buyerKeywordsMulti ?? [],

        buyerLoanOfficerFirstName: props.data?.buyerLoanOfficerFirstName ?? '',
        buyerLoanOfficerLastName: props.data?.buyerLoanOfficerLastName ?? '',
        buyerLoanOfficerPhone: props.data?.buyerLoanOfficerPhone ?? '',
        buyerLoanOfficerEmail: props.data?.buyerLoanOfficerEmail ?? '',
        buyerLenderCompany: props.data?.buyerLenderCompany ?? '',
        buyerPreApprovalIssueDate: props.data?.buyerPreApprovalIssueDate ? new Date(props.data?.buyerPreApprovalIssueDate) : undefined,
        buyerPreApprovalExpirationDate: props.data?.buyerPreApprovalExpirationDate? new Date(props.data?.buyerPreApprovalExpirationDate) : undefined,
        buyerPrimaryBorrower: props.data?.buyerPrimaryBorrower ?? '',
        buyerSecondaryBorrower: props.data?.buyerSecondaryBorrower ?? '',
        buyerLoanType: props.data?.buyerLoanType ?? '',
        buyerPurchasPrice: props.data?.buyerPurchasPrice ?? '',
        buyerSellerConsession: props.data?.buyerSellerConsession ?? '',
        buyerDownPaymentAmount: props.data?.buyerDownPaymentAmount ?? '',
        buyerBaseLoanAmount: props.data?.buyerBaseLoanAmount ?? '',
        buyerLoanToValue: props.data?.buyerLoanToValue ?? '',
        buyerAnnualTaxes: props.data?.buyerAnnualTaxes ?? '',
        buyerAnnualInsurance: props.data?.buyerAnnualInsurance ?? '',
        buyerAnnualHOADues: props.data?.buyerAnnualHOADues ?? '',
        buyerMortgageRate: props.data?.buyerMortgageRate ?? '',
        buyerAnnualOtherExpenses: props.data?.buyerAnnualOtherExpenses ?? '',
        buyerLenderCredit: props.data?.buyerLenderCredit ?? '',
        // Seller
        sellerListPrice: props.data?.sellerListPrice ?? '',
        sellerPropertyAddress: props.data?.sellerPropertyAddress ?? '',
        sellerUnit: props.data?.sellerUnit ?? '',
        sellerSchoolDistrictsMulti: props.data?.sellerSchoolDistrictsMulti ?? [],
        sellerPropertyType: props.data?.sellerPropertyType ?? 'Single Family Residence',
        sellerPropertySubType: props.data?.sellerPropertySubType ?? '',
        sellerUnitCount: props.data?.sellerUnitCount ?? 1,
        sellerStories: props.data?.sellerStories ?? 1,
        sellerHomeSqFt: props.data?.sellerHomeSqFt ?? '',
        sellerLotSqFt: props.data?.sellerLotSqFt ?? '',
        sellerBedrooms: props.data?.sellerBedrooms ?? 1,
        sellerBathrooms: props.data?.sellerBathrooms ?? 1,
        sellerParking: props.data?.sellerParking ?? 'Yes',
        sellerGarage: props.data?.sellerGarage ?? 'No',
        sellerHeating: props.data?.sellerHeating ?? 'No',
        sellerHeatingTypeMulti: props.data?.sellerHeatingTypeMulti ?? [],
        sellerCooling: props.data?.sellerCooling ?? 'No',
        sellerCoolingTypeMulti: props.data?.sellerCoolingTypeMulti ?? [],
        sellerViewsMulti: props.data?.sellerViewsMulti ?? [],
        sellerPool: props.data?.sellerPool ?? 'No',
        sellerIsAttached: props.data?.sellerIsAttached ?? 'No',
        sellerNewConstruction: props.data?.sellerNewConstruction ?? 'No',
        sellerAmenitiesMulti: props.data?.sellerAmenitiesMulti ?? [],
        sellerKeywordsMulti: props.data?.sellerKeywordsMulti ?? [],
        sellerPropertyDescription: props.data?.sellerPropertyDescription ?? '',


        sellerOccupancyStatus: props.data?.sellerOccupancyStatus ?? 'Owner Occupied',
        sellerAnnualHOADues: props.data?.sellerAnnualHOADues ?? '',
        sellerAnnualTaxes: props.data?.sellerAnnualTaxes ?? '',
        sellerAnnualOtherExpenses: props.data?.sellerAnnualOtherExpenses ?? '',
        sellerVillageAnnualTaxes: props.data?.sellerVillageAnnualTaxes ?? '',

        // Renter
        renterLocationsMulti: props.data?.renterLocationsMulti ?? [],
        renterSchoolDistrictsMulti: props.data?.renterSchoolDistrictsMulti ?? [],
        renterMinimumBedrooms: props.data?.renterMinimumBedrooms ?? 1,
        renterMinimumBathrooms: props.data?.renterMinimumBathrooms ?? 1,
        renterMinimumLotSize: props.data?.renterMinimumLotSize ?? 1,
        renterStories: props.data?.renterStories ?? '',
        renterPropertyType: props.data?.renterPropertyType ?? '',
        renterMaximumMonthlyPayment: props.data?.renterMaximumMonthlyPayment ?? '',
        renterMinimumHomeSqFt: props.data?.renterMinimumHomeSqFt ?? '',
        renterHeatingAndCooling: props.data?.renterHeatingAndcooling ?? '',
        renterGarage: props.data?.renterGarage ?? '',
        renterViewsMulti: props.data?.renterViewsMulti ?? [],
        renterParkingMulti: props.data?.renterParkingMulti ?? [],
        renterAttachedOk: props.data?.renterAttachedOk ?? '',
        renterNewConstructionOnly: props.data?.renterNewConstructionOnly ?? '',
        renterAmenities: props.data?.renterAmenities ?? '',
        renterKeywords: props.data?.renterKeywords ?? '',

        // Landlord
        landlordPropertyAddress: props.data?.landlordPropertyAddress ?? '',
        landlordUnit: props.data?.landlordUnit ?? '',
        landlordPropertyType: props.data?.landlordPropertyType ?? 'test1',
        landlordPropertySubType: props.data?.landlordPropertySubType ?? 0,
        landlordListingType: props.data?.landlordListingType ?? '',
        landlordOccupancyStatus: props.data?.landlordOccupancyStatus ?? 0,
        landlordListPrice: props.data?.landlordListPrice ?? 0,
        landlordAssertType: props.data?.landlordAssertType ?? '',
        landlordBuildingClass: props.data?.landlordBuildingClass ?? '',
        landlordNumberOfUnits: props.data?.landlordNumberOfUnits ?? 0,
        landlordBedrooms: props.data?.landlordBedrooms ?? 0,
        landlordBathrooms: props.data?.landlordBathrooms ?? 0,
        landlordHomeSqFt: props.data?.landlordHomeSqFt ?? 0,
        landlordLotSqFt: props.data?.landlordLotSqFt ?? 0,
        landlordStories: props.data?.landlordStories ?? '',
        landlordParking: props.data?.landlordParking ?? '',
        landlordHeatingAndCooling: props.data?.landlordHeatingAndCooling ?? '',
        landlordGarage: props.data?.landlordGarage ?? '',
        landlordViews: props.data?.landlordViews ?? '',
        landlordPool: props.data?.landlordPool ?? '',
        landlordAttached: props.data?.landlordAttached ?? 'No',
        landlordNewConstruction: props.data?.landlordNewConstruction ?? '',
        landlordAmenities: props.data?.landlordAmenities ?? '',
        landlordKeywords: props.data?.landlordKeywords ?? '',
        landlordPropertyDescription: props.data?.landlordPropertyDescription ?? '',
        //note

        sellerIsPreForeclosure: props.data?.sellerIsPreForeclosure ?? 'No',
        about: props.data?.about ?? '',
        lastContact: props.data?.lastContact? new Date(props.data?.lastContact) : undefined,
        nextContact: props.data?.nextContact? new Date(props.data?.nextContact) : undefined,
        startOfTarget: props.data?.startOfTarget? new Date(props.data?.startOfTarget) : undefined,
        endOfTarget: props.data?.endOfTarget ? new Date(props.data?.endOfTarget) : undefined,
        rating: props.data?.rating ?? undefined,
    }
    const [values, setValues] = React.useState<ILead>(initialLead)
    const [errorFirstName, setErrorFirstName] = React.useState<boolean>(false)
    const [errorLastName, setErrorLastName] = React.useState<boolean>(false)
    const [errorPhoneNumber, setErrorPhoneNumber] = React.useState<boolean>(false)
    const [errorSecondaryPhoneNumber, setErrorSecondaryPhoneNumber] = React.useState<boolean>(false)
    const [errorBuyerLoanOfficerPhone, setErrorBuyerLoanOfficerPhone] = React.useState<boolean>(false)
    const [errorEmail, setErrorEmail] = React.useState<boolean>(false)
    const [errorSecondaryEmail, setErrorSecondaryEmail] = React.useState<boolean>(false)
    const [errorBuyerLoanOfficerEmail, setErrorBuyerLoanOfficerEmail] = React.useState<boolean>(false)
    
    const handleInputChange = (e: any, type: string = '') => {
        const { name, value } = e.target
        let tempValue = value

        if (name.includes('Name') && name !== "companyName") {
            tempValue = value.replace(/[^a-z]/gi, '')
        }

        if (type === 'number') {
            tempValue = value.replace(/,/g, '');
        }
        setValues({
            ...values,
            [name]: tempValue
        })
        if (name === 'phoneNumber' || name === 'buyerLoanOfficerPhone' || name === 'secondaryPhoneNumber') {
            const formattedPhoneNumber = validation.phoneNumberAutoFormat(value);
            if (name === 'phoneNumber' && formattedPhoneNumber.length > 0 && formattedPhoneNumber.length < 12) setErrorPhoneNumber(true)
            else setErrorPhoneNumber(false)
            if (name === 'secondaryPhoneNumber' && formattedPhoneNumber.length > 0 && formattedPhoneNumber.length < 12) setErrorSecondaryPhoneNumber(true)
            else setErrorSecondaryPhoneNumber(false)
            if (name === 'buyerLoanOfficerPhone' && formattedPhoneNumber.length > 0 && formattedPhoneNumber.length < 12) setErrorBuyerLoanOfficerPhone(true)
            else setErrorBuyerLoanOfficerPhone(false)
            setValues({
                ...values,
                [name]: formattedPhoneNumber
            })
        }
        switch (name) {
            case "firstName":
                setErrorFirstName(validation.IsEmptyString(value))
                break
            case "lastName":
                setErrorLastName(validation.IsEmptyString(value))
                break
            case "email":
                setErrorEmail(validation.IsInvalidEmail(value) && value.length > 0)
                break
            case "secondaryEmailAddress":
                setErrorSecondaryEmail(validation.IsInvalidEmail(value) && value.length > 0)
                break
            case "buyerLoanOfficerEmail":
                setErrorBuyerLoanOfficerEmail(validation.IsInvalidEmail(value) && value.length > 0)
                break
        }
    }

    const handleSelectChange = (value: any, name: string) => {
        let tempValue = value.label;
        if (name.includes('Multi')) {
            tempValue = value.map((item: any) => {
                return item.label
            })
        }
        console.log(name, tempValue)
        setValues({
            ...values,
            [name]: tempValue
        })
    }

    const handleDateChange = (value: any, name: string) => {

        console.log(name,  value, new Date(value).toUTCString(),  new Date(value).toISOString())
        
        setValues({
            ...values,
            [name]: value
        })
    }
    const submitNewLead = () => {
        setErrorFirstName(validation.IsEmptyString(values.firstName))
        setErrorLastName(validation.IsEmptyString(values.lastName))

        if (!validation.IsEmptyString(values.firstName) && !validation.IsEmptyString(values.lastName) && !errorPhoneNumber && !errorEmail) {
            if (values.leadType === 'Buyer' && errorBuyerLoanOfficerPhone) return
            if (values.leadType === 'Buyer' && errorBuyerLoanOfficerEmail) return
            let submitValues : ILead = {...values};
            //submitValues.dateAdded = new Date(submitValues.dateAdded).toUTCString();
            if (props.data && props.data._id) {
                let updateData: UpdateLeadDto = {
                    data: submitValues,
                    leadId: props.data._id,
                    userId: user._id,
                    search: {
                        userId: user._id,
                        keyword: props.keyword,
                        sortType: props.sortType,
                        sortField: props.sortField,
                        recordsPerPage: props.recordsPerPage,
                        currentPage: props.currentPage
                    }
                }
                dispatch(updateLead(updateData)).then((res) => {
                    try {
                        props.setTotalCount(res.payload.totalPages)
                        notify(res.payload.success, res.payload.message)
                    } catch (e) {
                        notify(false, 'Something went wrong.')
                    }
                })
            } else {
                let data: CreateLeadDto = {
                    email: user.email,
                    data: submitValues,
                    userId: user._id,
                    search: {
                        userId: user._id,
                        keyword: props.keyword,
                        sortType: props.sortType,
                        sortField: props.sortField,
                        recordsPerPage: props.recordsPerPage,
                        currentPage: 1
                    }
                }
                props.setCurrentPage(1)
                dispatch(createNewLead(data)).then((res) => {
                    try {
                        notify(res.payload.success, res.payload.message)
                        if (res.payload.success) {
                            setValues(initialLead)
                            setErrorFirstName(false)
                            setErrorLastName(false)
                            props.setTotalCount(res.payload.totalCount)
                        }
                    } catch (e) {
                        notify(false, 'Something went wrong.')
                    }
                })
            }
        }
    }

    
    const onChangeAddressAutoComplete = (value: any, name: string) => {
        setValues({
            ...values,
            //addrezss: value
            [name]: value
        })
        dispatch(fetchAddressAutocomplete({ address: value }))
    }

    const onSelectAddressAutoComplete  = (value: any, name: string) => {
        if(name === 'sellerPropertyAddress'){
            setValues({
                ...values,
                [name]: value.streetLine+' '+value.city+', '+value.state+' '+value.zipcode+' '+value.secondary,
                'sellerUnit': value.secondary
            })
        }else {
            setValues({
                ...values,
                [name]: value.streetLine+' '+value.city+', '+value.state+' '+value.zipcode+' '+value.secondary,
            })
        }
    }

    React.useEffect(() => {
        setValues(initialLead)
        setErrorFirstName(false)
        setErrorLastName(false)
    }, [props.open])
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
                                    <div className="flex h-full flex-col bg-white pb-6 shadow-xl">
                                        <div className='fixed w-full bg-white z-30 pt-5'>
                                            <div className="px-4 sm:px-6  w-full bg-white">
                                                <div className="flex items-start justify-between">
                                                    <Dialog.Title className="">
                                                        <Typography variant="h2" color="primary" className='my-0'>{props.data && props.data._id  ? 'Edit a Lead' : 'Add a New Lead'}</Typography>
                                                    </Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center gap-3">
                                                        <button
                                                            type="button"
                                                            className="relative rounded-md bg-white text-gray-400 hover:text-[#6DA172] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                            onClick={() => submitNewLead()}
                                                        >
                                                            <span className="absolute -inset-2.5" />
                                                            <span className="sr-only">Close panel</span>
                                                            <AiOutlineCheck className="h-6 w-6" aria-hidden="true" />
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
                                        <AddRelationship 
                                            data={values}
                                            handleInputChange={handleInputChange}
                                            handleSelectChange={handleSelectChange}
                                            handleDateChange={handleDateChange}
                                            errorFirstName={errorFirstName}
                                            errorLastName={errorLastName}
                                            errorPhoneNumber={errorPhoneNumber}
                                            errorSecondaryPhoneNumber={errorSecondaryPhoneNumber}
                                            errorSecondaryEmail={errorSecondaryEmail}
                                            errorBuyerLoanOfficerPhone={errorBuyerLoanOfficerPhone}
                                            errorEmail={errorEmail}
                                            errorBuyerLoanOfficerEmail={errorBuyerLoanOfficerEmail}
                                            addresses={addresses}
                                            onChangeAddressAutoComplete={onChangeAddressAutoComplete}
                                            onSelectAddressAutoComplete={onSelectAddressAutoComplete}
                                        />
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

export default Drawer