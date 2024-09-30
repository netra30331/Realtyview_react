import Typography from "@/components/baseComponents/Typography"
import TextField from '@/components/baseComponents/TextField'
import { IOffer } from '@/shared/interfaces/interfaces'
import { DatePicker } from '@/components/baseComponents/DatePickers'
import Textarea from '@/components/baseComponents/Textarea'
import { NumericFormat } from "react-number-format"

type IProps = {
    handleTextChange:Function
    handleDateChange:Function
    values:IOffer
}

const Terms = (props: IProps) => {

    return (
        <div className='mt-6'>
            <Typography variant="h3" color="primary">Terms and Conditions</Typography>
            <div className="grid grid-cols-2 gap-3 mt-[15px]">
                <div className="col-span-2 md:col-span-1">
                    <Typography variant="caption" color="secondary" className=''>Offer Amount($)</Typography>
                    <NumericFormat 
                        allowLeadingZeros={false} 
                        thousandSeparator="," 
                        placeholder='$' 
                        name="offerAmount" 
                        value={props.values.offerAmount} 
                        onChange={(e) => props.handleTextChange(e, 'offerAmount', 'number')} 
                        className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <Typography variant="caption" color="secondary" className=''>Earnest Money Deposit($)</Typography>
                    <NumericFormat 
                        allowLeadingZeros={false} 
                        thousandSeparator="," 
                        placeholder='$' 
                        name="earnestMoneyDeposit" 
                        value={props.values.earnestMoneyDeposit} 
                        onChange={(e) => props.handleTextChange(e, 'earnestMoneyDeposit', 'number')} 
                        className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-[15px]">
                <div className="col-span-2 md:col-span-1">
                    <Typography variant="caption" color="secondary" className=''>Down Payment (Includes EDM)($)</Typography>
                    <NumericFormat 
                        allowLeadingZeros={false} 
                        thousandSeparator="," 
                        placeholder='$' 
                        name="downPayment" 
                        value={props.values.downPayment} 
                        onChange={(e) => props.handleTextChange(e, 'downPayment', 'number')} 
                        className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <Typography variant="caption" color="secondary" className=''>Subject to Mortgage($)</Typography>
                    <NumericFormat 
                        allowLeadingZeros={false} 
                        thousandSeparator="," 
                        placeholder='$' 
                        name="subjectToMortgage" 
                        value={props.values.subjectToMortgage} 
                        onChange={(e) => props.handleTextChange(e, 'subjectToMortgage', 'number')} 
                        className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-[15px]">
                <div className="col-span-2 md:col-span-1">
                    <Typography variant="caption" color="secondary" className=''>Seller Concession($)</Typography>
                    <NumericFormat 
                        allowLeadingZeros={false} 
                        thousandSeparator="," 
                        placeholder='$' 
                        name="sellerConcession" 
                        value={props.values.sellerConcession} 
                        onChange={(e) => props.handleTextChange(e, 'sellerConcession', 'number')} 
                        className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <Typography variant="caption" color="secondary" className=''>Cash on Closing($)</Typography>
                    <NumericFormat 
                        allowLeadingZeros={false} 
                        thousandSeparator="," 
                        placeholder='$' 
                        name="cashOnClosing" 
                        value={props.values.cashOnClosing} 
                        onChange={(e) => props.handleTextChange(e, 'cashOnClosing', 'number')} 
                        className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-[15px]">
                <div className="col-span-2 md:col-span-1">
                    <Typography variant="caption" color="secondary" className=''>Proposed Closing Location</Typography>
                    <TextField placeholder='' onChange={(e) => props.handleTextChange(e, 'proposedClosingLocation')} value={props.values.proposedClosingLocation} className={`w-full`} />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <Typography variant="caption" color="secondary" className=''>Proposed Closing Date</Typography>
                    <DatePicker onChange={(value) => props.handleDateChange(value, 'proposedClosingDate')} value={props.values.proposedClosingDate  ? new Date(props.values.proposedClosingDate):null} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-[15px]">
                <div className="col-span-2 md:col-span-1">
                    <Typography variant="caption" color="secondary" className=''>Personal Property Inclusions</Typography>
                    <TextField placeholder='' onChange={(e) => props.handleTextChange(e, 'personalPropertyInclusions')} value={props.values.personalPropertyInclusions} className={`w-full`} />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <Typography variant="caption" color="secondary" className=''>Personal Property Exclusions</Typography>
                    <TextField placeholder='' onChange={(e) => props.handleTextChange(e, 'personalPropertyExclusions')} value={props.values.personalPropertyExclusions} className={`w-full`} />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-3 mt-[15px]">
                <Typography variant="caption" color="secondary" className=''>Note To Listing Agent</Typography>
                <Textarea onChange={(e) => props.handleTextChange(e, 'noteToListingAgent')} value={props.values.noteToListingAgent}></Textarea>
            </div>
        </div>
    )
}

export default Terms