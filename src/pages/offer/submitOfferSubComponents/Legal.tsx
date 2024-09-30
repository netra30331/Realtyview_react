import Typography from "@/components/baseComponents/Typography"
import TextField from '@/components/baseComponents/TextField'
import { IOffer } from '@/shared/interfaces/interfaces'
import AddressAutoComplete from '@/components/baseComponents/AddressAutoComplete'

type IProps = {
    handleTextChange:Function
    values:IOffer
    errorBuyerAttorneyPhoneNumber:boolean
    errorBuyerAttorneyEmailAddress:boolean
    errorSellerAttorneyPhoneNumber:boolean
    errorSellerAttorneyEmailAddress:boolean
    addresses: Array<any>
    onChangeAddressAutoComplete: Function
    onSelectAddressAutoComplete: Function
}

const Legal = (props: IProps) => {

    return (
        <div>
            <div className='mt-6'>
                <Typography variant="h3" color="primary">Buyer’s Attorney</Typography>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 md:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>First Name</Typography>
                        <TextField placeholder='' onChange={(e) => props.handleTextChange(e, 'buyeraAttorneyFirstName')} value={props.values.buyeraAttorneyFirstName} className={`w-full`} />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>Last Name</Typography>
                        <TextField placeholder='' onChange={(e) => props.handleTextChange(e, 'buyerAttorneyLastName')} value={props.values.buyerAttorneyLastName} className={`w-full`} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 md:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>Phone Number</Typography>
                        <TextField maxLength={12} placeholder='' onChange={(e) => props.handleTextChange(e, 'buyerAttorneyPhoneNumber')} value={props.values.buyerAttorneyPhoneNumber} 
                            className={`w-full ${props.errorBuyerAttorneyPhoneNumber ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} />
                        {props.errorBuyerAttorneyPhoneNumber && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>Please enter a valid phone number</Typography>}
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>Email Address</Typography>
                        <TextField placeholder='' onChange={(e) => props.handleTextChange(e, 'buyerAttorneyEmailAddress')} value={props.values.buyerAttorneyEmailAddress} 
                            className={`w-full ${props.errorBuyerAttorneyEmailAddress ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} />
                        {props.errorBuyerAttorneyEmailAddress && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>Invalid Email Address</Typography>}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 md:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>Company</Typography>
                        <TextField placeholder='' onChange={(e) => props.handleTextChange(e, 'buyerAttorneyCompany')} value={props.values.buyerAttorneyCompany} className={`w-full`} />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>Address</Typography>
                        <AddressAutoComplete 
                            options={props.addresses} 
                            placeholder="" 
                            filterKey='streetLine' 
                            value={props.values.buyerAttorneyAddress} 
                            onChange={(e) => props.onChangeAddressAutoComplete(e, 'buyerAttorneyAddress')} 
                            onAllChange={(e) => props.onSelectAddressAutoComplete(e, 'buyerAttorneyAddress')} />
                    </div>
                </div>
            </div>

            <div className='mt-6'>
                <Typography variant="h3" color="primary">Seller’s Attorney</Typography>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 md:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>First Name</Typography>
                        <TextField placeholder='' onChange={(e) => props.handleTextChange(e, 'sellerAttorneyFirstName')} value={props.values.sellerAttorneyFirstName} className={`w-full`} />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>Last Name</Typography>
                        <TextField placeholder='' onChange={(e) => props.handleTextChange(e, 'sellerAttorneyLastName')} value={props.values.sellerAttorneyLastName} className={`w-full`} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 md:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>Phone Number</Typography>
                        <TextField maxLength={12} placeholder='' onChange={(e) => props.handleTextChange(e, 'sellerAttorneyPhoneNumber')} value={props.values.sellerAttorneyPhoneNumber} 
                            className={`w-full ${props.errorSellerAttorneyPhoneNumber ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} />
                        {props.errorSellerAttorneyPhoneNumber && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>Please enter a valid phone number</Typography>}
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>Email Address</Typography>
                        <TextField placeholder='' onChange={(e) => props.handleTextChange(e, 'sellerAttorneyEmailAddress')} value={props.values.sellerAttorneyEmailAddress} 
                            className={`w-full ${props.errorSellerAttorneyEmailAddress ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} />
                        {props.errorSellerAttorneyEmailAddress && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>Invalid Email Address</Typography>}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 md:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>Company</Typography>
                        <TextField placeholder='' onChange={(e) => props.handleTextChange(e, 'sellerAttorneyCompany')} value={props.values.sellerAttorneyCompany} className={`w-full`} />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>Address</Typography>
                        <AddressAutoComplete 
                            options={props.addresses} 
                            placeholder="" 
                            filterKey='streetLine' 
                            value={props.values.sellerAttorneyAddress} 
                            onChange={(e) => props.onChangeAddressAutoComplete(e, 'sellerAttorneyAddress')} 
                            onAllChange={(e) => props.onSelectAddressAutoComplete(e, 'sellerAttorneyAddress')} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Legal