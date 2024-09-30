import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ILead } from '@/shared/interfaces/interfaces'
import ViewRelationship from '@/pages/lead/common/ViewRelationship'

type IProps = {
    open: boolean
    changeState: Function
    data: any
    archive: Function
    setRating: Function
    setStatus: Function
    editLead: Function
    convertToClient:Function
}
const View = (props: IProps) => {
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
        renterMinimumLotSize: props.data?.renterMinimumLotSize ?? 1000,
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
    React.useEffect(() => {
        setValues(initialLead)
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
                                    <ViewRelationship
                                        changeState={props.changeState}
                                        data={values}
                                        archive={props.archive}
                                        convertToClient={props.convertToClient}
                                        setRating={props.setRating}
                                        setStatus={props.setStatus}
                                        editLead={props.editLead} 
                                    />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default View
