import Typography from "@/components/baseComponents/Typography"
import Select from "@/components/baseComponents/Select"
import TextField from '@/components/baseComponents/TextField'
import { ILead } from '@/shared/interfaces/interfaces'
type IProps = {
    data?: ILead
    handleSelectChange: Function
    handleDateChange: Function
    handleInputChange: Function
}
const RenterProperty = (props: IProps) => {
    const handleKeyDown = (event: any) => {
        if (event.key === 'e') {
            event.preventDefault();
        }
    };
    return (
        <div>
            <div className="mt-8 px-8">
                <Typography variant="h3" color="primary">Renter Preferences</Typography>
                <div className="mt-[15px]">
                    <Typography variant="caption" color="secondary">Locations</Typography>
                    {/* <TextField type='text' onKeyDown={handleKeyDown}  placeholder='Enter Cities, Neighborhoods and Zip Codes' name="renterLocationsMulti" value={props.data?.renterLocationsMulti} onChange={(e) => props.handleInputChange(e)} /> */}
                    <Select
                        options={[
                            { value: 'test1', label: 'test1' },
                            { value: 'test2', label: 'test2' },
                        ]}
                        name='renterLocationsMulti'
                        isMulti={true}
                        value={props.data?.renterLocationsMulti.map((item: any) => {
                            return {
                                value: item,
                                label: item
                            }
                        })}
                        onChange={(value) => props.handleSelectChange(value, 'renterLocationsMulti')}
                    />
                    
                </div>
                <div className="mt-[15px]">
                    <Typography variant="caption" color="secondary">School Districts</Typography>
                    {/* <TextField type='text' onKeyDown={handleKeyDown}  placeholder="Enter Lead's Desired school Districts" name="renterSchoolDistrictsMulti" value={props.data?.renterSchoolDistrictsMulti} onChange={(e) => props.handleInputChange(e)} /> */}
                    <Select
                        options={[
                            { value: 'test1', label: 'test1' },
                            { value: 'test2', label: 'test2' },
                        ]}
                        name='renterSchoolDistrictsMulti'
                        isMulti={true}
                        value={props.data?.renterSchoolDistrictsMulti.map((item: any) => {
                            return {
                                value: item,
                                label: item
                            }
                        })}
                        onChange={(value) => props.handleSelectChange(value, 'renterSchoolDistrictsMulti')}
                    />
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Property Type</Typography>
                        <Select
                            options={[
                                { value: 'Single Family Residence', label: 'Single Family Residence' },
                                { value: 'Multi Family Residence', label: 'Multi Family Residence' },
                                { value: 'Apartment', label: 'Apartment' },
                                { value: 'Townhouse', label: 'Townhouse' },
                                { value: 'Land Mobile', label: 'Land Mobile' },
                                { value: 'Commercial', label: 'Commercial' },
                                { value: 'Other', label: 'Other' },
                            ]}
                            name='renterPropertyType'
                            value={{ value: props.data?.renterPropertyType, label: props.data?.renterPropertyType }}
                            onChange={(value) => props.handleSelectChange(value, 'renterPropertyType')}
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Maximum Monthly Payment</Typography>
                        <TextField type='text'  placeholder='1' name="renterMaximumMonthlyPayment" value={props.data?.renterMaximumMonthlyPayment} onChange={(e) => props.handleInputChange(e)} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Stories</Typography>
                        <TextField type='number' onKeyDown={handleKeyDown} placeholder='' name="renterStories" value={props.data?.renterStories} onChange={(e) => props.handleInputChange(e)} />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Minimum Home SqFt</Typography>
                        <TextField type='text'  placeholder='' name="renterMinimumHomeSqFt" value={props.data?.renterMinimumHomeSqFt} onChange={(e) => props.handleInputChange(e)} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Minimum Bedrooms</Typography>
                        <TextField type='number' onKeyDown={handleKeyDown}  placeholder='1' name="renterMinimumBedrooms" value={props.data?.renterMinimumBedrooms} onChange={(e) => props.handleInputChange(e)} />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Minimum Bathrooms</Typography>
                        <TextField type='number' onKeyDown={handleKeyDown}  placeholder='1' name="renterMinimumBathrooms" value={props.data?.renterMinimumBathrooms} onChange={(e) => props.handleInputChange(e)} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Heating & Cooling</Typography>
                        <Select
                            options={[
                                { value: 'Yes', label: 'Yes' },
                                { value: 'No', label: 'No' },
                            ]}
                            name='renterHeatingAndCooling'
                            value={{ value: props.data?.renterHeatingAndCooling, label: props.data?.renterHeatingAndCooling }}
                            onChange={(value) => props.handleSelectChange(value, 'renterHeatingAndCooling')}
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Garage</Typography>
                        <Select
                            options={[
                                { value: 'Yes', label: 'Yes' },
                                { value: 'No', label: 'No' },
                            ]}
                            name='renterGarage'
                            value={{ value: props.data?.renterGarage, label: props.data?.renterGarage }}
                            onChange={(value) => props.handleSelectChange(value, 'renterGarage')}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Views</Typography>
                        <Select
                            options={[
                                { value: 'test1', label: 'test1' },
                                { value: 'test2', label: 'test2' },
                            ]}
                            name='renterViewsMulti'
                            isMulti={true}
                            value={props.data?.renterViewsMulti.map((item: any) => {
                                return {
                                    value: item,
                                    label: item
                                }
                            })}
                            onChange={(value) => props.handleSelectChange(value, 'renterViewsMulti')}
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Parking</Typography>
                        <Select
                            options={[
                                { value: 'test1', label: 'test1' },
                                { value: 'test2', label: 'test2' },
                            ]}
                            name='renterParkingMulti'
                            isMulti={true}
                            value={props.data?.renterParkingMulti.map((item: any) => {
                                return {
                                    value: item,
                                    label: item
                                }
                            })}
                            onChange={(value) => props.handleSelectChange(value, 'renterParkingMulti')}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Attached Ok</Typography>
                        <TextField type='text'  placeholder='' name="renterAttachedOk" value={props.data?.renterAttachedOk} onChange={(e) => props.handleInputChange(e)} />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">New Construction Only</Typography>
                        <TextField type='text'  placeholder='' name="renterNewConstructionOnly" value={props.data?.renterNewConstructionOnly} onChange={(e) => props.handleInputChange(e)} />
                    </div>
                </div>
                <div className="mt-[15px]">
                    <Typography variant="caption" color="secondary">Amenities</Typography>
                    <TextField type='text'  placeholder='' name="renterAmenities" value={props.data?.renterAmenities} onChange={(e) => props.handleInputChange(e)} />
                </div>
                <div className="mt-[15px]">
                    <Typography variant="caption" color="secondary">Keywords</Typography>
                    <TextField type='text'  placeholder='' name="renterKeywords" value={props.data?.renterKeywords} onChange={(e) => props.handleInputChange(e)} />
                </div>
            </div>
        </div>
    )
}

export default RenterProperty