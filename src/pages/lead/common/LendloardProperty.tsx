import Typography from "@/components/baseComponents/Typography"
import Select from "@/components/baseComponents/Select"
import TextField from '@/components/baseComponents/TextField'
import Textarea from '@/components/baseComponents/Textarea'
import { ILead } from '@/shared/interfaces/interfaces'
type IProps = {
    data?: ILead
    handleSelectChange: Function
    handleDateChange: Function
    handleInputChange: Function
}
const LendloardProperty = (props: IProps) => {
    const handleKeyDown = (event: any) => {
        if (event.key === 'e') {
            event.preventDefault();
        }
    };
    return (
        <div>
            <div className="mt-8 px-8">
                <Typography variant="h3" color="primary">Property Description</Typography>
                <div className="grid grid-cols-5 gap-3 mt-[15px]">
                    <div className="col-span-5 sm:col-span-3">
                        <Typography variant="caption" color="secondary">Address</Typography>
                        <TextField placeholder='Enter the address' name="landlordPropertyAddress" value={props.data?.landlordPropertyAddress} onChange={(e) => props.handleInputChange(e)} />
                    </div>
                    <div className="col-span-5 sm:col-span-2">
                        <Typography variant="caption" color="secondary">Unit</Typography>
                        <TextField name="landlordUnit" value={props.data?.landlordUnit} onChange={(e) => props.handleInputChange(e)} />
                    </div>
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
                            name='landlordPropertyType'
                            value={{ value: props.data?.landlordPropertyType, label: props.data?.landlordPropertyType }}
                            onChange={(value) => props.handleSelectChange(value, 'landlordPropertyType')}
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Property Sub-Type</Typography>
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
                            name='landlordPropertySubType'
                            value={{ value: props.data?.landlordPropertySubType, label: props.data?.landlordPropertySubType }}
                            onChange={(value) => props.handleSelectChange(value, 'landlordPropertySubType')}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Listing Type</Typography>
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
                            name='landlordListingType'
                            value={{ value: props.data?.landlordListingType, label: props.data?.landlordListingType }}
                            onChange={(value) => props.handleSelectChange(value, 'landlordListingType')}
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Occupancy Status</Typography>
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
                            name='landlordOccupancyStatus'
                            value={{ value: props.data?.landlordOccupancyStatus, label: props.data?.landlordOccupancyStatus }}
                            onChange={(value) => props.handleSelectChange(value, 'landlordOccupancyStatus')}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">List Price</Typography>
                        <TextField type='number' onKeyDown={handleKeyDown} name="landlordListPrice" value={props.data?.landlordListPrice} onChange={(e) => props.handleInputChange(e)} />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Assert Type</Typography>
                        <TextField type='text' name="landlordAssertType" value={props.data?.landlordAssertType} onChange={(e) => props.handleInputChange(e)} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Building Class</Typography>
                        <TextField type='text'  name="landlordBuildingClass" value={props.data?.landlordBuildingClass} onChange={(e) => props.handleInputChange(e)} />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Number of Units</Typography>
                        <TextField type='text' name="landlordNumberOfUnits" value={props.data?.landlordNumberOfUnits} onChange={(e) => props.handleInputChange(e)} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Bedrooms</Typography>
                        <TextField type='number' onKeyDown={handleKeyDown} name="landlordBedrooms" value={props.data?.landlordBedrooms} onChange={(e) => props.handleInputChange(e)} />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Bathrooms</Typography>
                        <TextField type='number' onKeyDown={handleKeyDown} name="landlordBathrooms" value={props.data?.landlordBathrooms} onChange={(e) => props.handleInputChange(e)} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Home SqFt</Typography>
                        <TextField type='number' onKeyDown={handleKeyDown} placeholder='' name="landlordHomeSqFt" value={props.data?.landlordHomeSqFt} onChange={(e) => props.handleInputChange(e)} />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Lot SqFt</Typography>
                        <TextField type='number' onKeyDown={handleKeyDown} placeholder='' name="landlordLotSqFt" value={props.data?.landlordLotSqFt} onChange={(e) => props.handleInputChange(e)} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Stories</Typography>
                        <TextField type='number' onKeyDown={handleKeyDown} placeholder='' name="landlordStories" value={props.data?.landlordStories} onChange={(e) => props.handleInputChange(e)} />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Parking</Typography>
                        <TextField type='text'  placeholder='' name="landlordParking" value={props.data?.landlordParking} onChange={(e) => props.handleInputChange(e)} />
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
                            name='landlordHeatingAndCooling'
                            value={{ value: props.data?.landlordHeatingAndCooling, label: props.data?.landlordHeatingAndCooling }}
                            onChange={(value) => props.handleSelectChange(value, 'landlordHeatingAndCooling')}
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Garage</Typography>
                        <Select
                            options={[
                                { value: 'Yes', label: 'Yes' },
                                { value: 'No', label: 'No' },
                            ]}
                            name='landlordGarage'
                            value={{ value: props.data?.landlordGarage, label: props.data?.landlordGarage }}
                            onChange={(value) => props.handleSelectChange(value, 'landlordGarage')}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Lot Types & Views</Typography>
                        <TextField type='text'  placeholder='' name="landlordViews" value={props.data?.landlordViews} onChange={(e) => props.handleInputChange(e)} />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Pool</Typography>
                        <TextField type='text'  placeholder='' name="landlordPool" value={props.data?.landlordPool} onChange={(e) => props.handleInputChange(e)} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Attached</Typography>
                        <Select
                            options={[
                                { value: 'No', label: 'No' },
                                { value: 'Yes', label: 'Yes' },
                            ]}
                            name='landlordAttached'
                            isSearchable={false}
                            value={{ value: props.data?.landlordAttached, label: props.data?.landlordAttached }}
                            onChange={(value) => props.handleSelectChange(value, 'landlordAttached')}
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">New Construction</Typography>
                        <TextField type='text'  placeholder='' name="landlordNewConstruction" value={props.data?.landlordNewConstruction} onChange={(e) => props.handleInputChange(e)} />
                    </div>
                </div>
                <div className="mt-[15px]">
                    <Typography variant="caption" color="secondary">Amenities</Typography>
                    <TextField type='text'  placeholder="Enter Lead's Desired Amenities" name="landlordAmenities" value={props.data?.landlordAmenities} onChange={(e) => props.handleInputChange(e)} />
                </div>
                <div className="mt-[15px]">
                    <Typography variant="caption" color="secondary">Keywords</Typography>
                    <TextField type='text'  placeholder='Add keywords to Look for in Listings' name="landlordKeywords" value={props.data?.landlordKeywords} onChange={(e) => props.handleInputChange(e)} />
                </div>
                
                <div className="mt-[15px]">
                    <Typography variant="caption" color="secondary">Property Description</Typography>
                    <Textarea placeholder='Describe the Property' name="landlordPropertyDescription" value={props.data?.landlordPropertyDescription} onChange={(e) => props.handleInputChange(e)} />
                </div>
            </div>
        </div>
    )
}

export default LendloardProperty