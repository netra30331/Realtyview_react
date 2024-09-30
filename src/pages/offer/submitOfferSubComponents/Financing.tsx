import Typography from "@/components/baseComponents/Typography"
import TextField from '@/components/baseComponents/TextField'
import { IOffer } from '@/shared/interfaces/interfaces'
import { DatePicker } from '@/components/baseComponents/DatePickers'
import AddressAutoComplete from '@/components/baseComponents/AddressAutoComplete'

type IProps = {
    handleTextChange:Function
    handleDateChange:Function
    values:IOffer
    errorLoanPhoneNumber:boolean
    errorLoanEmailAddress:boolean
    addresses: Array<any>
    onChangeAddressAutoComplete: Function
    onSelectAddressAutoComplete: Function
}

const Financing = (props: IProps) => {

    return (
        <div>
            <div className='mt-6'>
                <Typography variant="h3" color="primary">Mortgage</Typography>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 md:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>Mortgage Held By</Typography>
                        <TextField placeholder='' onChange={(e) => props.handleTextChange(e, 'mortgageHeldBy')} value={props.values.mortgageHeldBy} className={`w-full`} />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>Mortgage Type</Typography>
                        <TextField placeholder='' onChange={(e) => props.handleTextChange(e, 'mortgageType')} value={props.values.mortgageType} className={`w-full`} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 md:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>Mortgage Period</Typography>
                        <TextField placeholder='' onChange={(e) => props.handleTextChange(e, 'mortgagePeriod')} value={props.values.mortgagePeriod} className={`w-full`} />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>Payment Due Date</Typography>
                        <DatePicker onChange={(value) => props.handleDateChange(value, 'paymentDate')} value={props.values.paymentDate !== '' ? new Date(props.values.paymentDate):null} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 md:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>Interest Rate</Typography>
                        <TextField placeholder='' onChange={(e) => props.handleTextChange(e, 'interestRate')} value={props.values.interestRate} className={`w-full`} />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>Monthly Payment</Typography>
                        <TextField placeholder='' onChange={(e) => props.handleTextChange(e, 'monthlyPayment')} value={props.values.monthlyPayment} className={`w-full`} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 md:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>Proposed Closing Date</Typography>
                        <DatePicker onChange={(value) => props.handleDateChange(value, 'mortgageProposedClosingDate')} value={props.values.mortgageProposedClosingDate  ? new Date(props.values.mortgageProposedClosingDate):null} />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>Proposed Formal Contact Date</Typography>
                        <DatePicker onChange={(value) => props.handleDateChange(value, 'mortgageProposedFormalContactDate')} value={props.values.mortgageProposedFormalContactDate  ? new Date(props.values.mortgageProposedFormalContactDate):null} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 md:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>Mortgage Due (days from formal contract)</Typography>
                        <TextField placeholder='' onChange={(e) => props.handleTextChange(e, 'mortgageDays')} value={props.values.mortgageDays} className={`w-full`} />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                    </div>
                </div>
            </div>

            <div className='mt-6'>
                <Typography variant="h3" color="primary">Loan Officer</Typography>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 md:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>First Name</Typography>
                        <TextField placeholder='' onChange={(e) => props.handleTextChange(e, 'loanFirstName')} value={props.values.loanFirstName} className={`w-full`} />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>Last Name</Typography>
                        <TextField placeholder='' onChange={(e) => props.handleTextChange(e, 'loanLastName')} value={props.values.loanLastName} className={`w-full`} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 md:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>Phone Number</Typography>
                        <TextField maxLength={12} placeholder='' onChange={(e) => props.handleTextChange(e, 'loanPhoneNumber')} value={props.values.loanPhoneNumber} 
                            className={`w-full ${props.errorLoanPhoneNumber ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} />
                        {props.errorLoanPhoneNumber && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>Please enter a valid phone number</Typography>}
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>Email Address</Typography>
                        <TextField placeholder='' onChange={(e) => props.handleTextChange(e, 'loanEmailAddress')} value={props.values.loanEmailAddress} 
                            className={`w-full ${props.errorLoanEmailAddress ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} />
                        {props.errorLoanEmailAddress && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>Invalid Email Address</Typography>}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 md:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>Company</Typography>
                        <TextField placeholder='' onChange={(e) => props.handleTextChange(e, 'loanCompany')} value={props.values.loanCompany} className={`w-full`} />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>Address</Typography>
                        <AddressAutoComplete 
                            options={props.addresses} 
                            placeholder="" 
                            filterKey='streetLine' 
                            value={props.values.loanCompanyAddress} 
                            onChange={(e) => props.onChangeAddressAutoComplete(e, 'loanCompanyAddress')} 
                            onAllChange={(e) => props.onSelectAddressAutoComplete(e, 'loanCompanyAddress')} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Financing