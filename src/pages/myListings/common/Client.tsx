import Typography from "@/components/baseComponents/Typography"
import Select from "@/components/baseComponents/Select"
import TextField from '@/components/baseComponents/TextField'
import Textarea from '@/components/baseComponents/Textarea'
import AddressAutoComplete from '@/components/baseComponents/AddressAutoComplete'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchAllClientsByUserId, getClients } from "@/redux/lead/leadSlice"
import { IMyListing } from "@/shared/interfaces/interfaces"
import { getUser } from "@/redux/user/userSlice"

type IProps = {
    data?: IMyListing
    handleInputChange: Function
    handleSelectChange: Function
    handleDateChange: Function
    errorPrimarySellerFirstName: boolean
    errorPrimarySellerLastName: boolean
    errorPrimarySellerPhoneNumber: boolean
    errorPrimarySellerEmailAddress: boolean
    errorSecondarySellerPhoneNumber: boolean
    errorSecondarySellerEmailAddress: boolean
    addresses: Array<any>
    onChangeAddressAutoComplete: Function
    onSelectAddressAutoComplete: Function
}

const Client = (props: IProps) => {
    const dispatch = useAppDispatch()
    const clients = useAppSelector(getClients);
    const user = useAppSelector(getUser);
    const onInputChangeAutoComplete = (value: any) => {
        dispatch(fetchAllClientsByUserId({ query: value ,type: "Seller",  userId: user._id, }))
    }
    return (
        <div className="my-[30px]">
            <div className="px-8">
                <Typography variant="h3" color="primary">Listing Details</Typography>
                <div className="grid grid-cols-2 gap-[15px] mt-[25px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>Listing Type *</Typography>
                        <Select
                            options={[
                                { value: 'Exclusive Agency', label: 'Exclusive Agency' },
                                { value: 'Exclusive Right To Lease', label: 'Exclusive Right To Lease' },
                                { value: 'Exclusive Right To Sell', label: 'Exclusive Right To Sell' },
                                { value: 'Exclusive Right With Exception', label: 'Exclusive Right With Exception' },
                                { value: 'Net (Listing Agreement)', label: 'Net (Listing Agreement)' },
                                { value: 'Open', label: 'Open' },
                                { value: 'Probate', label: 'Probate' }
                            ]}
                            name='listingType'
                            value={{ value: props.data?.listingType, label: props.data?.listingType }}
                            onChange={(value) => props.handleSelectChange(value, 'listingType')}
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>Client</Typography>
                        <Select
                            options={[{value:{}, label: "New Client"},...(clients && Array.isArray(clients) ? clients.map(item => {return {value: item, label:  item.firstName+' '+item.lastName}}): [])]
                            }
                            name='client'
                            onChange={(value) => props.handleSelectChange(value, 'client')}
                            onInputChange={(value) => onInputChangeAutoComplete(value)}
                        />
                    </div>
                </div>
            </div>
            <div className="mt-[50px] px-8">
                <Typography variant="h3" color="primary">Primary Seller Details</Typography>
                <div className="grid grid-cols-2 gap-[15px] mt-[25px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">First Name *</Typography>
                        <TextField name="primarySellerFirstName" disabled={props.data?.client? true: false} className={`w-full ${props.errorPrimarySellerFirstName ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} value={props.data?.primarySellerFirstName} onChange={(e) => props.handleInputChange(e)} />
                        {props.errorPrimarySellerFirstName && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>This field is required</Typography>}
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Last Name *</Typography>
                        <TextField  disabled={props.data?.client? true: false} className={`w-full ${props.errorPrimarySellerLastName ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} name="primarySellerLastName" value={props.data?.primarySellerLastName} onChange={(e) => props.handleInputChange(e)} />
                        {props.errorPrimarySellerLastName && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>This field is required</Typography>}
                    </div>
                </div>
                <div className="mt-[25px]">
                    <Typography variant="caption" color="secondary">Company Name</Typography>
                    <TextField placeholder="" disabled={props.data?.client? true: false} name="primarySellerCompanyName" value={props.data?.primarySellerCompanyName} onChange={(e) => props.handleInputChange(e)} />
                </div>
                <div className="grid grid-cols-2 gap-[15px] mt-[25px]">
                    <div className="col-span-2 sm:col-span-1 relative">
                        <Typography variant="caption" color="secondary">Phone Number</Typography>
                        <TextField disabled={props.data?.client? true: false} className={`w-full ${props.errorPrimarySellerPhoneNumber ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} maxLength={12} name="primarySellerPhoneNumber" value={props.data?.primarySellerPhoneNumber} onChange={(e) => props.handleInputChange(e)} />
                        {props.errorPrimarySellerPhoneNumber && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>Please enter a valid phone number</Typography>}
                    </div>
                    <div className="col-span-2 sm:col-span-1 relative">
                        <Typography variant="caption" color="secondary">Email Address</Typography>
                        <TextField disabled={props.data?.client? true: false} className={`w-full ${props.errorPrimarySellerEmailAddress ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} name="primarySellerEmailAddress" value={props.data?.primarySellerEmailAddress} onChange={(e) => props.handleInputChange(e)} />
                        {props.errorPrimarySellerEmailAddress && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>Invalid Email Address</Typography>}
                    </div>
                </div>
                <div className="mt-[25px]">
                    <Typography variant="caption" color="secondary">Current Address</Typography>
                    <AddressAutoComplete disabled={props.data?.client? true: false} options={props.addresses} placeholder="Enter Primary Seller's Current Address" filterKey='streetLine' value={props.data?.primarySellerCurrentAddress} onChange={(e) => props.onChangeAddressAutoComplete(e, 'primarySellerCurrentAddress')} onAllChange={(e) => props.onSelectAddressAutoComplete(e, 'primarySellerCurrentAddress')} />
                </div>
                <div className="mt-[25px]">
                    <Typography variant="caption" color="secondary">Mailing Address</Typography>
                    <AddressAutoComplete disabled={props.data?.client? true: false} options={props.addresses} placeholder="Enter Primary Seller's Mailing Address" filterKey='streetLine' value={props.data?.primarySellerMailingAddress} onChange={(e) => props.onChangeAddressAutoComplete(e, 'primarySellerMailingAddress')} onAllChange={(e) => props.onSelectAddressAutoComplete(e, 'primarySellerMailingAddress')} />
                </div>
            </div>
            <div className="mt-[50px] px-8">
                <Typography variant="h3" color="primary">Secondary Seller Details</Typography>
                <div className="grid grid-cols-2 gap-[15px] mt-[25px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">First Name</Typography>
                        <TextField disabled={props.data?.client? true: false} name="secondarySellerFirstName" value={props.data?.secondarySellerFirstName} onChange={(e) => props.handleInputChange(e)} />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Last Name</Typography>
                        <TextField disabled={props.data?.client? true: false} name="secondarySellerLastName" value={props.data?.secondarySellerLastName} onChange={(e) => props.handleInputChange(e)} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-[15px] mt-[25px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Phone Number</Typography>
                        <TextField disabled={props.data?.client? true: false} className={`w-full ${props.errorSecondarySellerPhoneNumber ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} maxLength={12} name="secondarySellerPhoneNumber" value={props.data?.secondarySellerPhoneNumber} onChange={(e) => props.handleInputChange(e)} />
                        {props.errorSecondarySellerPhoneNumber && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>Please enter a valid phone number</Typography>}
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Email Address</Typography>
                        <TextField disabled={props.data?.client? true: false} className={`w-full ${props.errorSecondarySellerEmailAddress ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} name="secondarySellerEmailAddress" value={props.data?.secondarySellerEmailAddress} onChange={(e) => props.handleInputChange(e)} />
                        {props.errorSecondarySellerEmailAddress && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>Invalid Email Address</Typography>}
                    </div>
                </div>
            </div>
            <div className="mt-[50px] px-8">
                <Typography variant="h3" color="primary">Notes</Typography>
                <div className="mt-[25px]">
                    <Typography variant="caption" color="secondary">About the Listing</Typography>
                    <Textarea name="listingNotes" value={props.data?.listingNotes} rows={5} onChange={(e) => props.handleInputChange(e)} />
                </div>
            </div>
        </div>
    )
}

export default Client