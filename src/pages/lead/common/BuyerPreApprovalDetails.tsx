import Typography from "@/components/baseComponents/Typography"
import Select from "@/components/baseComponents/Select"
import TextField from '@/components/baseComponents/TextField'
import { DatePicker } from '@/components/baseComponents/DatePickers'
import { ILead } from '@/shared/interfaces/interfaces'
import { NumericFormat } from 'react-number-format';

type IProps = {
    data?: ILead
    handleSelectChange: Function
    handleDateChange: Function
    handleInputChange: Function
    errorBuyerLoanOfficerPhone: boolean
    errorBuyerLoanOfficerEmail: boolean
}
const BuyerPreApprovalDetails = (props: IProps) => {
   
    return (
        <div>
            <div className="mt-8 px-8">
                <Typography variant="h3" color="primary">Pre-Approval Details</Typography>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Is Pre Approved?</Typography>
                        <Select
                            options={[
                                { value: 'Yes', label: 'Yes' },
                                { value: 'No', label: 'No' },
                            ]}
                            name='buyerHeatingAndCooling'
                            value={{ value: props.data?.buyerIsPreApproved, label: props.data?.buyerIsPreApproved }}
                            onChange={(value) => props.handleSelectChange(value, 'buyerIsPreApproved')}
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Maximum Purchas Price</Typography>
                        <NumericFormat allowLeadingZeros thousandSeparator="," placeholder='$'  name="buyerMaximumPurchasPrice" value={props.data?.buyerMaximumPurchasPrice ? parseFloat(props.data?.buyerMaximumPurchasPrice.toString()).toLocaleString('en'):''} onChange={(e) => props.handleInputChange(e, 'number')}  className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Loan Officer's First Name</Typography>
                        <TextField name="buyerLoanOfficerFirstName" value={props.data?.buyerLoanOfficerFirstName} onChange={(e) => props.handleInputChange(e)} />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Loan Officer's Last Name</Typography>
                        <TextField name="buyerLoanOfficerLastName" value={props.data?.buyerLoanOfficerLastName} onChange={(e) => props.handleInputChange(e)} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1 relative">
                        <Typography variant="caption" color="secondary">Loan Officer's Phone</Typography>
                        <TextField className={`w-full`} maxLength={12} name="buyerLoanOfficerPhone" value={props.data?.buyerLoanOfficerPhone} onChange={(e) => props.handleInputChange(e)} />
                        {props.errorBuyerLoanOfficerPhone && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>Please enter a valid phone number</Typography>}
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Loan Officer's Email</Typography>
                        <TextField className={`w-full ${props.errorBuyerLoanOfficerEmail ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} name="buyerLoanOfficerEmail" value={props.data?.buyerLoanOfficerEmail} onChange={(e) => props.handleInputChange(e)} />
                        {props.errorBuyerLoanOfficerEmail && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>Invalid Email Address</Typography>}
                    </div>
                </div>
                <div className="mt-[15px]">
                    <Typography variant="caption" color="secondary">Lender Company</Typography>
                    <TextField name="buyerLenderCompany" value={props.data?.buyerLenderCompany} onChange={(e) => props.handleInputChange(e)} />
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>Pre-Approval Issue Date</Typography>
                        <DatePicker name='licenseDate' value={props.data?.buyerPreApprovalIssueDate}  onChange={(value) => props.handleDateChange(value, 'buyerPreApprovalIssueDate')}/>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary" className=''>Pre-Approval Expiration Date</Typography>
                        <DatePicker name='licenseDate' value={props.data?.buyerPreApprovalExpirationDate}  onChange={(value) => props.handleDateChange(value, 'buyerPreApprovalExpirationDate')}/>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Primary Borrower</Typography>
                        <TextField type='text'  placeholder='' name="buyerPrimaryBorrower" value={props.data?.buyerPrimaryBorrower} onChange={(e) => props.handleInputChange(e)} />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Secondary Borrower</Typography>
                        <TextField type='text'  placeholder='' name="buyerSecondaryBorrower" value={props.data?.buyerSecondaryBorrower} onChange={(e) => props.handleInputChange(e)} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Loan Type</Typography>
                        <Select
                            options={[
                                { value: 'Fixed-Rate Mortgage (FRM)', label: 'Fixed-Rate Mortgage (FRM)' },
                                { value: 'Adjustable-Rate Mortgage (ARM)', label: 'Adjustable-Rate Mortgage (ARM)' },
                                { value: 'Interest-Only Mortgage', label: 'Interest-Only Mortgage' },
                                { value: 'Balloon Mortgage', label: 'Balloon Mortgage' },
                                { value: 'FHA Loan (Federal Housing Administration)', label: 'FHA Loan (Federal Housing Administration)' },
                                { value: 'VA Loan (Veterans Affairs)', label: 'VA Loan (Veterans Affairs)' },
                                { value: 'USDA Loan (U.S. Department of Agriculture)', label: 'USDA Loan (U.S. Department of Agriculture)' },
                                { value: 'Jumbo Loan', label: 'Jumbo Loan' },
                                { value: 'Conventional Loan', label: 'Conventional Loan' },
                                { value: 'Home Equity Loan (Second Mortgage)', label: 'Home Equity Loan (Second Mortgage)' },
                                { value: 'Home Equity Line of Credit (HELOC)', label: 'Home Equity Line of Credit (HELOC)' },
                                { value: 'Reverse Mortgage (HECM)', label: 'Reverse Mortgage (HECM)' },
                                { value: 'Construction Loan', label: 'Construction Loan' },
                                { value: 'Rehab Loan (FHA 203(k))', label: 'Rehab Loan (FHA 203(k))' },
                                { value: 'Buydown Mortgage', label: 'Buydown Mortgage' },
                                { value: 'Graduated Payment Mortgage (GPM)', label: 'Graduated Payment Mortgage (GPM)' },
                                { value: 'Biweekly Mortgage', label: 'Biweekly Mortgage' },
                                { value: 'Assumable Mortgage', label: 'Assumable Mortgage' },
                                { value: 'No-Documentation or Stated-Income Mortgage', label: 'No-Documentation or Stated-Income Mortgage' },
                                { value: 'Portfolio Loan', label: 'Portfolio Loan' },
                                { value: 'Chattel Mortgage', label: 'Chattel Mortgage' },
                                { value: 'Shared Equity Mortgage', label: 'Shared Equity Mortgage' },
                                { value: 'Community Land Trust Mortgage', label: 'Community Land Trust Mortgage' },
                            ]}
                            name='buyerLoanType'
                            value={{ value: props.data?.buyerLoanType, label: props.data?.buyerLoanType }}
                            onChange={(value) => props.handleSelectChange(value, 'buyerLoanType')}
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Purchas Price</Typography>
                        <NumericFormat allowLeadingZeros thousandSeparator="," placeholder='$'  name="buyerPurchasPrice" value={props.data?.buyerPurchasPrice ? parseFloat(props.data?.buyerPurchasPrice.toString()).toLocaleString('en'):''} onChange={(e) => props.handleInputChange(e, 'number')}  className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Seller Consession</Typography>
                        <NumericFormat allowLeadingZeros thousandSeparator="," placeholder='$'  name="buyerSellerConsession" value={props.data?.buyerSellerConsession ? parseFloat(props.data?.buyerSellerConsession.toString()).toLocaleString('en'):''} onChange={(e) => props.handleInputChange(e, 'number')}  className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Down Payment</Typography>
                        <NumericFormat allowLeadingZeros thousandSeparator="," placeholder='$'  name="buyerDownPaymentAmount" value={props.data?.buyerDownPaymentAmount ? parseFloat(props.data?.buyerDownPaymentAmount.toString()).toLocaleString('en'):''} onChange={(e) => props.handleInputChange(e, 'number')}  className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Base Loan Amount</Typography>
                        <NumericFormat allowLeadingZeros thousandSeparator="," placeholder='$'  name="buyerBaseLoanAmount" value={props.data?.buyerBaseLoanAmount ? parseFloat(props.data?.buyerBaseLoanAmount.toString()).toLocaleString('en'):''} onChange={(e) => props.handleInputChange(e, 'number')}  className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Loan to Value</Typography>
                        <NumericFormat allowLeadingZeros thousandSeparator="," placeholder='%'  name="buyerLoanToValue" value={props.data?.buyerLoanToValue ? parseFloat(props.data?.buyerLoanToValue.toString()).toLocaleString('en'):''} onChange={(e) => props.handleInputChange(e, 'number')}  className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Taxes (Annual)</Typography>
                        <NumericFormat allowLeadingZeros thousandSeparator="," placeholder='$'  name="buyerAnnualTaxes" value={props.data?.buyerAnnualTaxes ? parseFloat(props.data?.buyerAnnualTaxes.toString()).toLocaleString('en'):''} onChange={(e) => props.handleInputChange(e, 'number')}  className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Insurance (Annual)</Typography>
                        <NumericFormat allowLeadingZeros thousandSeparator="," placeholder='$'  name="buyerAnnualInsurance" value={props.data?.buyerAnnualInsurance ? parseFloat(props.data?.buyerAnnualInsurance.toString()).toLocaleString('en'):''} onChange={(e) => props.handleInputChange(e, 'number')}  className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">HOA Dues (Annual)</Typography>
                        <NumericFormat allowLeadingZeros thousandSeparator="," placeholder='$'  name="buyerAnnualHOADues" value={props.data?.buyerAnnualHOADues ? parseFloat(props.data?.buyerAnnualHOADues.toString()).toLocaleString('en'):''} onChange={(e) => props.handleInputChange(e, 'number')}  className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Mortgage Rate</Typography>
                        <NumericFormat allowLeadingZeros thousandSeparator="," placeholder='%'  name="buyerMortgageRate" value={props.data?.buyerMortgageRate ? parseFloat(props.data?.buyerMortgageRate.toString()).toLocaleString('en'):''} onChange={(e) => props.handleInputChange(e, 'number')}  className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Other Expenses (Annual)</Typography>
                        <NumericFormat allowLeadingZeros thousandSeparator="," placeholder='$'  name="buyerAnnualOtherExpenses" value={props.data?.buyerAnnualOtherExpenses ? parseFloat(props.data?.buyerAnnualOtherExpenses.toString()).toLocaleString('en'):''} onChange={(e) => props.handleInputChange(e, 'number')}  className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Lender Credit</Typography>
                        <NumericFormat allowLeadingZeros thousandSeparator="," placeholder='$'  name="buyerLenderCredit" value={props.data?.buyerLenderCredit ? parseFloat(props.data?.buyerLenderCredit.toString()).toLocaleString('en'):''} onChange={(e) => props.handleInputChange(e, 'number')}  className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BuyerPreApprovalDetails