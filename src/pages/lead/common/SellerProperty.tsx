import Typography from "@/components/baseComponents/Typography"
import Select from "@/components/baseComponents/Select"
import TextField from '@/components/baseComponents/TextField'
import Textarea from '@/components/baseComponents/Textarea'
import { ILead } from '@/shared/interfaces/interfaces'
import { getAddresses } from '@/redux/user/userSlice'
import AddressAutoComplete from "@/components/baseComponents/AddressAutoComplete"
import React from "react"
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchAmenities, fetchKeywords, fetchSchoolDistricts, getAmenities, getKeywords, getSchoolDistricts } from "@/redux/lead/leadSlice"
import { NumericFormat } from 'react-number-format';

type IProps = {
    data?: ILead
    handleSelectChange: Function
    handleDateChange: Function
    handleInputChange: Function
    onChangeAddressAutoComplete: Function
    onSelectAddressAutoComplete: Function
}
const SellerProperty = (props: IProps) => {
    const dispatch = useAppDispatch()
    const addresses = useAppSelector(getAddresses)
    const keywords = useAppSelector(getKeywords);
    const amenities = useAppSelector(getAmenities);
    const schoolDistricts = useAppSelector(getSchoolDistricts);
    const [searchKeyword, setSearchKeyword] = React.useState('');
    const [searchAmenities, setSearchAmenities] = React.useState('');
    const [propertySubType, setPropertySubType] = React.useState<Array<any>>([])
    const propertyType = [
        { value: 'Single Family Residence', label: 'Single Family Residence' },
        { value: 'Multi Family Residence', label: 'Multi Family Residence' },
        { value: 'Apartment', label: 'Apartment' },
        { value: 'Townhouse', label: 'Townhouse' },
        { value: 'Land', label: 'Land' },
        { value: 'Mobile', label: 'Mobile' },
        { value: 'Commercial', label: 'Commercial' },
        { value: 'Other', label: 'Other' },
    ]
    const SubTypeList =[
        { parent: 'Single Family Residence', contents: [
            { value: 'Cabin', label: 'Cabin' },
            { value: 'Manufactured Home', label: 'Manufactured Home' },
            { value: 'Manufactured On Land', label: 'Manufactured On Land' },
            { value: 'Mobile Home', label: 'Mobile Home' },
            { value: 'Own Your Own', label: 'Own Your Own' },
            { value: 'Single Family Residence', label: 'Single Family Residence' },
            { value: 'Mixed Use', label: 'Mixed Use' },
        ] },
        { parent: 'Multi Family Residence', contents: [
            { value: 'Duplex', label: 'Duplex' },
            { value: 'Manufactured Home', label: 'Manufactured Home' },
            { value: 'Manufactured On Land', label: 'Manufactured On Land' },
            { value: 'Mobile Home', label: 'Mobile Home' },
            { value: 'Own Your Own', label: 'Own Your Own' },
            { value: 'Quadruplex', label: 'Quadruplex' },
            { value: 'Triplex', label: 'Triplex' },
        ] },
        { parent: 'Apartment', contents: [
            { value: 'Apartment', label: 'Apartment' },
            { value: 'Condominium', label: 'Condominium' },
            { value: 'Own Your Own', label: 'Own Your Own' },
            { value: 'Stock Cooperative', label: 'Stock Cooperative' },
        ]},
        { parent: 'Townhouse', contents: [
            { value: 'Own Your Own', label: 'Own Your Own' },
            { value: 'Townhouse', label: 'Townhouse' },
        ] },
        { parent: 'Land', contents: [
            { value: 'Farm (PropertySubType)', label: 'Farm (PropertySubType)' },
            { value: 'Own Your Own', label: 'Own Your Own' },
            { value: 'Ranch', label: 'Ranch' },
            { value: 'Unimproved Land', label: 'Unimproved Land' },
        ] },
        { parent: 'Mobile', contents: [
            { value: 'Mobile Home', label: 'Mobile Home' },
            { value: 'Own Your Own', label: 'Own Your Own' },
        ] },
        { parent: 'Commercial', contents: [
            { value: 'Own Your Own', label: 'Own Your Own' },
            { value: 'Stock Cooperative', label: 'Stock Cooperative' },
            { value: 'Business (PropertySubType)', label: 'Business (PropertySubType)' },
            { value: 'Hotel-Motel', label: 'Hotel-Motel' },
            { value: 'Industrial (PropertySubType)', label: 'Industrial (PropertySubType)' },
            { value: 'Mixed Use', label: 'Mixed Use' },
            { value: 'Multi Family', label: 'Multi Family' },
            { value: 'Office (PropertySubType)', label: 'Office (PropertySubType)' },
            { value: 'Retail (PropertySubType)', label: 'Retail (PropertySubType)' },
            { value: 'Warehouse (PropertySubType)', label: 'Warehouse (PropertySubType)' },
        ] },
        { parent: 'Other', contents: [
            { value: 'Boat Slip', label: 'Boat Slip' },
            { value: 'Cabin', label: 'Cabin' },
            { value: 'Deeded Parking', label: 'Deeded Parking' },
            { value: 'Farm (PropertySubType)', label: 'Farm (PropertySubType)' },
            { value: 'Manufactured Home', label: 'Manufactured Home' },
            { value: 'Manufactured On Land', label: 'Manufactured On Land' },
            { value: 'Own Your Own', label: 'Own Your Own' },
            { value: 'Ranch', label: 'Ranch' },
            { value: 'Timeshare', label: 'Timeshare' },
            { value: 'Agriculture (PropertySubType)', label: 'Agriculture (PropertySubType)' },
            { value: 'Business (PropertySubType)', label: 'Business (PropertySubType)' },
        ] },
    ]
    const changePropertyType = (value:any) => {
        props.handleSelectChange(value, 'sellerPropertyType')
        SubTypeList.map(item => {
            if(item.parent === value.value){
                setPropertySubType(item.contents)
            }
        })
    }

    const onInpubhChangeAutoComplete = (value: any, name: String) => {
        if(name=== 'sellerKeywordsMulti'){
            setSearchKeyword(value);
            dispatch(fetchKeywords({ query: value }))
        }else if(name === 'sellerAmenitiesMulti'){
            setSearchAmenities(value)
            dispatch(fetchAmenities({ query: value }))
        }else {
            dispatch(fetchSchoolDistricts({ query: value }))
        }
    }

    return (
        <div>
            <div className="mt-8 px-8">
                <Typography variant="h3" color="primary">Listing Details</Typography>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">List price</Typography>
                        <NumericFormat allowLeadingZeros thousandSeparator="," placeholder='$'  name="sellerListPrice" value={props.data?.sellerListPrice ? parseFloat(props.data?.sellerListPrice.toString()).toLocaleString('en'):''} onChange={(e) => props.handleInputChange(e, 'number')}  className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                    </div>
                </div>
            </div>
            <div className="mt-8 px-8">
                <Typography variant="h3" color="primary">Property Description</Typography>
                <div className="grid grid-cols-5 gap-3 mt-[15px]">
                    <div className="col-span-5 sm:col-span-3">
                        <Typography variant="caption" color="secondary">Address</Typography>
                        <AddressAutoComplete options={addresses} placeholder="Enter the Subject Property Address" filterKey='streetLine' value={props.data?.sellerPropertyAddress} onChange={(value) => props.onChangeAddressAutoComplete(value, 'sellerPropertyAddress' )} onAllChange={(value) => props.onSelectAddressAutoComplete(value, 'sellerPropertyAddress')}  />
                    </div>
                    <div className="col-span-5 sm:col-span-2">
                        <Typography variant="caption" color="secondary">Unit</Typography>
                        <TextField name="sellerUnit" value={props.data?.sellerUnit} onChange={(e) => props.handleInputChange(e)} />
                    </div>
                </div>
                <div className="mt-[15px]">
                    <Typography variant="caption" color="secondary">School Districts</Typography>
                    <Select
                        options={schoolDistricts && schoolDistricts.map(item => {return {value: item.districtIDNumber +'-'+ item.countyNames, label: item.schoolDistrictName+'-'+ item.countyNames}})
                           }
                        name='sellerSchoolDistrictsMulti'
                        isMulti={true}
                        value={props.data?.sellerSchoolDistrictsMulti.map((item: any) => {
                            return {
                                value: item,
                                label: item
                            }
                        })}
                        onChange={(value) => props.handleSelectChange(value,  'sellerSchoolDistrictsMulti') }
                        onInputChange={(value) => onInpubhChangeAutoComplete(value,  'sellerSchoolDistrictsMulti')}
                    />
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Property Type</Typography>
                        <Select
                            options={propertyType}
                            name='sellerPropertyType'
                            value={{ value: props.data?.sellerPropertyType, label: props.data?.sellerPropertyType }}
                            onChange={(value) => changePropertyType(value)}
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Property Sub-Type</Typography>
                        <Select
                            options={propertySubType}
                            name='sellerPropertySubType'
                            value={{ value: props.data?.sellerPropertySubType, label: props.data?.sellerPropertySubType }}
                            onChange={(value) => props.handleSelectChange(value, 'sellerPropertySubType')}
                        />
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Unit Count</Typography>
                        <NumericFormat allowLeadingZeros thousandSeparator="," placeholder='$'  name="sellerUnitCount" value={props.data?.sellerUnitCount ? parseFloat(props.data?.sellerUnitCount.toString()).toLocaleString('en'):''} onChange={(e) => props.handleInputChange(e, 'number')}  className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Stories</Typography>
                        <NumericFormat allowLeadingZeros thousandSeparator="," name="sellerStories" value={props.data?.sellerStories ? parseFloat(props.data?.sellerStories.toString()).toLocaleString('en'):''} onChange={(e) => props.handleInputChange(e, 'number')}  className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Home SqFt</Typography>
                        <NumericFormat allowLeadingZeros thousandSeparator="," name="sellerHomeSqFt" value={props.data?.sellerHomeSqFt ? parseFloat(props.data?.sellerHomeSqFt.toString()).toLocaleString('en'):''} onChange={(e) => props.handleInputChange(e, 'number')}  className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Lot SqFt</Typography>
                        <NumericFormat allowLeadingZeros thousandSeparator="," name="sellerLotSqFt" value={props.data?.sellerLotSqFt ? parseFloat(props.data?.sellerLotSqFt.toString()).toLocaleString('en'):''} onChange={(e) => props.handleInputChange(e, 'number')}  className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Bedrooms</Typography>
                        <NumericFormat allowLeadingZeros thousandSeparator="," name="sellerBedrooms" value={props.data?.sellerBedrooms ? parseFloat(props.data?.sellerBedrooms.toString()).toLocaleString('en'):''} onChange={(e) => props.handleInputChange(e, 'number')}  className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Bathrooms</Typography>
                        <NumericFormat allowLeadingZeros thousandSeparator="," name="sellerBathrooms" value={props.data?.sellerBathrooms ? parseFloat(props.data?.sellerBathrooms.toString()).toLocaleString('en'):''} onChange={(e) => props.handleInputChange(e, 'number')}  className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Parking</Typography>
                        <Select
                            options={[
                                { value: 'Yes', label: 'Yes' },
                                { value: 'No', label: 'No' },
                            ]}
                            name='sellerParking'
                            value={{ value: props.data?.sellerParking, label: props.data?.sellerParking }}
                            onChange={(value) => props.handleSelectChange(value, 'sellerParking')}
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Garage</Typography>
                        <Select
                            options={[
                                { value: 'Yes', label: 'Yes' },
                                { value: 'No', label: 'No' },
                            ]}
                            name='sellerGarage'
                            value={{ value: props.data?.sellerGarage, label: props.data?.sellerGarage }}
                            onChange={(value) => props.handleSelectChange(value, 'sellerGarage')}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Heating</Typography>
                        <Select
                            options={[
                                { value: 'Yes', label: 'Yes' },
                                { value: 'No', label: 'No' },
                            ]}
                            name='sellerHeating'
                            value={{ value: props.data?.sellerHeating, label: props.data?.sellerHeating }}
                            onChange={(value) => props.handleSelectChange(value, 'sellerHeating')}
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Heating Type</Typography>
                        <Select
                            options={[
                                { value: 'Active Solar', label: 'Active Solar' },
                                { value: 'Baseboard', label: 'Baseboard' },
                                { value: 'Ceiling', label: 'Ceiling' },
                                { value: 'Central', label: 'Central' },
                                { value: 'Coal', label: 'Coal' },
                                { value: 'Coal Stove', label: 'Coal Stove' },
                                { value: 'Ductless (Heating)', label: 'Ductless (Heating)' },
                                { value: 'Electric (Heating)', label: 'Electric (Heating)' },
                                { value: 'ENERGY STAR/ACCA RSI Qualified Installation', label: 'ENERGY STAR/ACCA RSI Qualified Installation' },
                                { value: 'ENERGY STAR Qualified Equipment (Heating)', label: 'ENERGY STAR Qualified Equipment (Heating)' },
                                { value: 'Exhaust Fan (Heating)', label: 'Exhaust Fan (Heating)' },
                                { value: 'Fireplace(s)', label: 'Fireplace(s)' },
                                { value: 'Fireplace Insert', label: 'Fireplace Insert' },
                                { value: 'Floor Furnace', label: 'Floor Furnace' },
                                { value: 'Forced Air', label: 'Forced Air' },
                                { value: 'Geothermal (Heating)', label: 'Geothermal (Heating)' },
                                { value: 'Gravity', label: 'Gravity' },
                                { value: 'Heat Pump (Heating)', label: 'Heat Pump (Heating)' },
                                { value: 'Hot Water (Heating)', label: 'Hot Water (Heating)' },
                                { value: 'Humidity Control (Heating)', label: 'Humidity Control (Heating)' },
                                { value: 'Kerosene', label: 'Kerosene' },
                                { value: 'Natural Gas', label: 'Natural Gas' },
                                { value: 'None (Heating)', label: 'None (Heating)' },
                                { value: 'Oil', label: 'Oil' },
                                { value: 'Other (Heating)', label: 'Other (Heating)' },
                                { value: 'Passive Solar', label: 'Passive Solar' },
                                { value: 'Pellet Stove (Heating)', label: 'Pellet Stove (Heating)' },
                                { value: 'Propane (Heating)', label: 'Propane (Heating)' },
                                { value: 'Propane Stove', label: 'Propane Stove' },
                                { value: 'Radiant', label: 'Radiant' },
                                { value: 'Radiant Ceiling', label: 'Radiant Ceiling' },
                                { value: 'Radiant Floor', label: 'Radiant Floor' },
                                { value: 'See Remarks (Heating)', label: 'See Remarks (Heating)' },
                                { value: 'Separate Meters (Heating)', label: 'Separate Meters (Heating)' },
                                { value: 'Solar (Heating)', label: 'Solar (Heating)' },
                                { value: 'Space Heater', label: 'Space Heater' },
                                { value: 'Steam', label: 'Steam' },
                                { value: 'Varies by Unit (Heating)', label: 'Varies by Unit (Heating)' },
                                { value: 'Wall Furnace', label: 'Wall Furnace' },
                                { value: 'Wood (Heating)', label: 'Wood (Heating)' },
                                { value: 'Wood Stove', label: 'Wood Stove' },
                                { value: 'Zoned (Heating)', label: 'Zoned (Heating)' },
                            ]}
                            isMulti={true}
                            name='sellerHeatingTypeMulti'
                            value={props.data?.sellerHeatingTypeMulti.map((item: any) => {
                                return {
                                    value: item,
                                    label: item
                                }
                            })}
                            onChange={(value) => props.handleSelectChange(value, 'sellerHeatingTypeMulti')}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Cooling</Typography>
                        <Select
                            options={[
                                { value: 'Yes', label: 'Yes' },
                                { value: 'No', label: 'No' },
                            ]}
                            name='sellerCooling'
                            value={{ value: props.data?.sellerCooling, label: props.data?.sellerCooling }}
                            onChange={(value) => props.handleSelectChange(value, 'sellerCooling')}
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Cooling Type</Typography>
                        <Select
                            options={[
                                { value: 'Attic Fan', label: 'Attic Fan' },
                                { value: 'Ceiling Fan(s)', label: 'Ceiling Fan(s)' },
                                { value: 'Central Air', label: 'Central Air' },
                                { value: 'Dual', label: 'Dual' },
                                { value: 'Ductless', label: 'Ductless' },
                                { value: 'Electric', label: 'Electric' },
                                { value: 'ENERGY STAR Qualified Equipment', label: 'ENERGY STAR Qualified Equipment' },
                                { value: 'Evaporative Cooling', label: 'Evaporative Cooling' },
                                { value: 'Exhaust Fan (Cooling)', label: 'Exhaust Fan (Cooling)' },
                                { value: 'Gas (Cooling)', label: 'Gas (Cooling)' },
                                { value: 'Geothermal', label: 'Geothermal' },
                                { value: 'Heat Pump', label: 'Heat Pump' },
                                { value: 'Humidity Control', label: 'Humidity Control' },
                                { value: 'Multi Units', label: 'Multi Units' },
                                { value: 'None (Cooling)', label: 'None (Cooling)' },
                                { value: 'Other (Cooling)', label: 'Other (Cooling)' },
                                { value: 'Roof Turbine(s)', label: 'Roof Turbine(s)' },
                                { value: 'Separate Meters', label: 'Separate Meters' },
                                { value: 'Varies by Unit', label: 'Varies by Unit' },
                                { value: 'Wall/Window Unit(s)', label: 'Wall/Window Unit(s)' },
                                { value: 'Wall Unit(s)', label: 'Wall Unit(s)' },
                                { value: 'Whole House Fan', label: 'Whole House Fan' },
                                { value: 'Window Unit(s)', label: 'Window Unit(s)' },
                            ]}
                            name='sellerCoolingTypeMulti'
                            isMulti={true}
                            value={props.data?.sellerCoolingTypeMulti.map((item: any) => {
                                return {
                                    value: item,
                                    label: item
                                }
                            })}
                            onChange={(value) => props.handleSelectChange(value, 'sellerCoolingTypeMulti')}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Views</Typography>
                        <Select
                            options={[
                                { value: 'Bay', label: 'Bay' },
                                { value: 'Beach', label: 'Beach' },
                                { value: 'Bridge(s)', label: 'Bridge(s)' },
                                { value: 'Canal', label: 'Canal' },
                                { value: 'Canyon', label: 'Canyon' },
                                { value: 'City', label: 'City' },
                                { value: 'City Lights', label: 'City Lights' },
                                { value: 'Creek/Stream', label: 'Creek/Stream' },
                                { value: 'Desert', label: 'Desert' },
                                { value: 'Downtown', label: 'Downtown' },
                                { value: 'Forest', label: 'Forest' },
                                { value: 'Garden', label: 'Garden' },
                                { value: 'Golf Course', label: 'Golf Course' },
                                { value: 'Hills', label: 'Hills' },
                                { value: 'Lake', label: 'Lake' },
                                { value: 'Marina', label: 'Marina' },
                                { value: 'Meadow', label: 'Meadow' },
                                { value: 'Mountain(s)', label: 'Mountain(s)' },
                                { value: 'Neighborhood', label: 'Neighborhood' },
                                { value: 'None', label: 'None' },
                                { value: 'Ocean', label: 'Ocean' },
                                { value: 'Orchard', label: 'Orchard' },
                                { value: 'Other', label: 'Other' },
                                { value: 'Panoramic', label: 'Panoramic' },
                                { value: 'Park/Greenbelt', label: 'Park/Greenbelt' },
                                { value: 'Pasture', label: 'Pasture' },
                                { value: 'Pond', label: 'Pond' },
                                { value: 'Pool', label: 'Pool' },
                                { value: 'Ridge', label: 'Ridge' },
                                { value: 'River', label: 'River' },
                                { value: 'Rural', label: 'Rural' },
                                { value: 'See Remarks', label: 'See Remarks' },
                                { value: 'Skyline', label: 'Skyline' },
                                { value: 'Territorial', label: 'Territorial' },
                                { value: 'Trees/Woods', label: 'Trees/Woods' },
                                { value: 'Valley', label: 'Valley' },
                                { value: 'Vineyard', label: 'Vineyard' },
                                { value: 'Water', label: 'Water' },
                            ]}
                            name='sellerViewsMulti'
                            isMulti={true}
                            value={props.data?.sellerViewsMulti.map((item: any) => {
                                return {
                                    value: item,
                                    label: item
                                }
                            })}
                            onChange={(value) => props.handleSelectChange(value, 'sellerViewsMulti')}
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Pool</Typography>
                        <Select
                            options={[
                                { value: 'Yes', label: 'Yes' },
                                { value: 'No', label: 'No' },
                            ]}
                            name='sellerPool'
                            value={{ value: props.data?.sellerPool, label: props.data?.sellerPool }}
                            onChange={(value) => props.handleSelectChange(value, 'sellerPool')}
                        />
                    </div>
                </div>
               
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Is Attached?</Typography>
                        <Select
                            options={[
                                { value: 'Yes', label: 'Yes' },
                                { value: 'No', label: 'No' },
                            ]}
                            name='sellerIsAttached'
                            isSearchable={false}
                            value={{ value: props.data?.sellerIsAttached, label: props.data?.sellerIsAttached }}
                            onChange={(value) => props.handleSelectChange(value, 'sellerIsAttached')}
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">New Construction</Typography>
                        <Select
                            options={[
                                { value: 'Yes', label: 'Yes' },
                                { value: 'No', label: 'No' },
                            ]}
                            name='sellerNewConstruction'
                            isSearchable={false}
                            value={{ value: props.data?.sellerNewConstruction, label: props.data?.sellerNewConstruction }}
                            onChange={(value) => props.handleSelectChange(value, 'sellerNewConstruction')}
                        />
                    </div>
                </div>
                
                <div className="mt-[15px]">
                    <Typography variant="caption" color="secondary">Amenities</Typography>
                    <Select
                        options={[{value: searchAmenities, label: searchAmenities} , ...(amenities && amenities.map(item => {return {value: item.name, label: item.name}}))
                        ]}
                        name='sellerAmenitiesMulti'
                        isMulti={true}
                        value={props.data?.sellerAmenitiesMulti.map((item: any) => {
                            return {
                                value: item,
                                label: item
                            }
                        })}
                        onChange={(value) => props.handleSelectChange(value,  'sellerAmenitiesMulti') }
                        onInputChange={(value) => onInpubhChangeAutoComplete(value,  'sellerAmenitiesMulti')}
                    />
                </div>
                <div className="mt-[15px]">
                    <Typography variant="caption" color="secondary">Keywords</Typography>
                    <Select
                        options={[{value: searchKeyword, label: searchKeyword} , ...(keywords && keywords.map(item => {return {value: item.name, label: item.name}}))
                        ]}
                        name='sellerKeywordsMulti'
                        isMulti={true}
                        value={props.data?.sellerKeywordsMulti.map((item: any) => {
                            return {
                                value: item,
                                label: item
                            }
                        })}
                        onChange={(value) => props.handleSelectChange(value,  'sellerKeywordsMulti') }
                        onInputChange={(value) => onInpubhChangeAutoComplete(value,  'sellerKeywordsMulti')}
                    />
                </div>

                <div className="mt-[15px]">
                    <Typography variant="caption" color="secondary">Property Description</Typography>
                    <Textarea placeholder='' name="sellerPropertyDescription" value={props.data?.sellerPropertyDescription} onChange={(e) => props.handleInputChange(e)} />
                </div>
            </div>
            <div className="mt-8 px-8">
                <Typography variant="h3" color="primary">Other Details</Typography>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Is Pre-Foreclosure?</Typography>
                        <Select
                            options={[
                                { value: 'Yes', label: 'Yes' },
                                { value: 'No', label: 'No' },
                            ]}
                            name='sellerIsPreForeclosure'
                            isSearchable={false}
                            value={{ value: props.data?.sellerIsPreForeclosure, label: props.data?.sellerIsPreForeclosure }}
                            onChange={(value) => props.handleSelectChange(value, 'sellerIsPreForeclosure')}
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Occupancy Status</Typography>
                        <Select
                            options={[
                                { value: 'Owner Occupied', label: 'Owner Occupied' },
                                { value: 'Tenant Occupied', label: 'Tenant Occupied' },
                                { value: 'Vacant', label: 'Vacant' },
                                { value: 'Unknown', label: 'Unknown' },
                                { value: 'Other', label: 'Other' },
                            ]}
                            name='sellerOccupancyStatus'
                            value={{ value: props.data?.sellerOccupancyStatus, label: props.data?.sellerOccupancyStatus }}
                            onChange={(value) => props.handleSelectChange(value, 'sellerOccupancyStatus')}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">HOA Dues (Annual)</Typography>
                        <NumericFormat allowLeadingZeros thousandSeparator="," placeholder='$'  name="sellerAnnualHOADues" value={props.data?.sellerAnnualHOADues ? parseFloat(props.data?.sellerAnnualHOADues.toString()).toLocaleString('en'):''} onChange={(e) => props.handleInputChange(e, 'number')}  className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Taxes (Annual)</Typography>
                        <NumericFormat allowLeadingZeros thousandSeparator="," placeholder='$'  name="sellerAnnualTaxes" value={props.data?.sellerAnnualTaxes ? parseFloat(props.data?.sellerAnnualTaxes.toString()).toLocaleString('en'):''} onChange={(e) => props.handleInputChange(e, 'number')}  className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                <div className="col-span-2 sm:col-span-1">
                    <Typography variant="caption" color="secondary">Other Expenses (Annual)</Typography>
                    <NumericFormat allowLeadingZeros thousandSeparator="," placeholder='$'  name="sellerAnnualOtherExpenses" value={props.data?.sellerAnnualOtherExpenses ? parseFloat(props.data?.sellerAnnualOtherExpenses.toString()).toLocaleString('en'):''} onChange={(e) => props.handleInputChange(e, 'number')}  className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <Typography variant="caption" color="secondary">Village Taxes (Annual)</Typography>
                    <NumericFormat allowLeadingZeros thousandSeparator="," placeholder='$'  name="sellerVillageAnnualTaxes" value={props.data?.sellerVillageAnnualTaxes ? parseFloat(props.data?.sellerVillageAnnualTaxes.toString()).toLocaleString('en'):''} onChange={(e) => props.handleInputChange(e, 'number')}  className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                </div>
            </div>
            </div>
        </div>
    )
}

export default SellerProperty