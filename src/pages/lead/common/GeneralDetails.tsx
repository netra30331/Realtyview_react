import Typography from "@/components/baseComponents/Typography"
import Select from "@/components/baseComponents/Select"
import { DatePicker } from '@/components/baseComponents/DatePickers'
import { ILead } from '@/shared/interfaces/interfaces'

type IProps = {
    values?: ILead
    handleSelectChange: Function
    handleDateChange: Function
}
const AddRelationship = (props: IProps) => {
    return (
        <div className="mt-8 px-8">
            <Typography variant="h3" color="primary">General Details</Typography>
            <div className="grid grid-cols-2 gap-3 mt-[15px]">
                <div className="col-span-2 sm:col-span-1">
                    <Typography variant="caption" color="secondary" className=''>Lead Type *</Typography>
                    <Select
                        options={[
                            { value: 'Buyer', label: 'Buyer' },
                            { value: 'Seller', label: 'Seller' },
                            { value: 'Renter', label: 'Renter' },
                            { value: 'Landlord', label: 'Landlord' },
                        ]}
                        name='leadType'
                        value={{ value: props.values?.leadType, label: props.values?.leadType }}
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
                        value={{ value: props.values?.leadStatus, label: props.values?.leadStatus }}
                        onChange={(value) => props.handleSelectChange(value, 'leadStatus')}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-[15px]">
                <div className="col-span-2 sm:col-span-1">
                    <Typography variant="caption" color="secondary" className=''>Date Added</Typography>
                    <DatePicker name='dateAdded' value={props.values?.dateAdded}  onChange={(value) => props.handleDateChange(value, 'dateAdded')}/>
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <Typography variant="caption" color="secondary" className=''>Lead Source</Typography>
                    <Select
                        options={[
                            { value: 'Active', label: 'Active' },
                            { value: 'Inactive', label: 'Inactive' },
                        ]}
                        name='leadSource'
                        value={{ value: props.values?.leadSource, label: props.values?.leadSource }}
                        onChange={(value) => props.handleSelectChange(value, 'leadSource')}
                    />
                </div>
            </div>
        </div>
    )
}

export default AddRelationship