import Typography from "@/components/baseComponents/Typography"
import Select from "@/components/baseComponents/Select"
import { ILead } from '@/shared/interfaces/interfaces'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchAddressAutocomplete, getAddresses } from '@/redux/user/userSlice'
import React from "react"
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
const buyerProperty = (props: IProps) => {
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
        props.handleSelectChange(value, 'buyerPropertyType')
        SubTypeList.map(item => {
            if(item.parent === value.value){
                setPropertySubType(item.contents)
            }
        })
    }

    const onInputChangeAutoComplete = (value: any, name: string) => {
        if(name=== 'buyerKeywordsMulti'){
            setSearchKeyword(value);
            dispatch(fetchKeywords({ query: value }))
        }else if(name === 'buyerAmenitiesMulti'){
            setSearchAmenities(value)
            dispatch(fetchAmenities({ query: value }))
        }else if(name === 'buyerLocationsMulti'){
            dispatch(fetchAddressAutocomplete({ address: value }))
        }
        else {
            dispatch(fetchSchoolDistricts({ query: value }))
        }
    }
   
    return (
        <div>
            <div className="mt-8 px-8">
                <Typography variant="h3" color="primary">Buyer Preferences</Typography>
                <div className="mt-[15px]">
                    <Typography variant="caption" color="secondary">Locations</Typography>
                    {/* <AddressAutoComplete options={addresses} filterKey='streetLine' value={props.data?.buyerLocationsMulti} onChange={(value) => props.onChangeAddressAutoComplete(value, 'buyerLocationsMulti' )} onAllChange={(value) => props.onSelectAddressAutoComplete(value, 'buyerLocationsMulti')}  /> */}
                    <Select
                        options={addresses && addresses.map(item => {return {value: item.city +', '+ item.state + ' '+item.zipcode, label:  item.city +', '+ item.state + ' '+item.zipcode}})
                           }
                        name='buyerLocationsMulti'
                        isMulti={true}
                        value={props.data?.buyerLocationsMulti.map((item: any) => {
                            return {
                                value: item,
                                label: item
                            }
                        })}
                        onChange={(value) => props.handleSelectChange(value,  'buyerLocationsMulti') }
                        onInputChange={(value) => onInputChangeAutoComplete(value,  'buyerLocationsMulti')}
                    />
                </div>
                <div className="mt-[15px]">
                    <Typography variant="caption" color="secondary">School Districts</Typography>
                    <Select
                        options={schoolDistricts && schoolDistricts.map(item => {return {value: item.districtIDNumber +'-'+ item.countyNames, label: item.schoolDistrictName+'-'+ item.countyNames}})
                           }
                        name='buyerSchoolDistrictsMulti'
                        isMulti={true}
                        value={props.data?.buyerSchoolDistrictsMulti.map((item: any) => {
                            return {
                                value: item,
                                label: item
                            }
                        })}
                        onChange={(value) => props.handleSelectChange(value,  'buyerSchoolDistrictsMulti') }
                        onInputChange={(value) => onInputChangeAutoComplete(value,  'buyerSchoolDistrictsMulti')}
                    />
                </div>

                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Property Type</Typography>
                        <Select
                            options={propertyType}
                            name='buyerPropertyType'
                            value={{ value: props.data?.buyerPropertyType, label: props.data?.buyerPropertyType }}
                            onChange={(value) => changePropertyType(value)}
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Property Sub-Type</Typography>
                        <Select
                            options={propertySubType}
                            name='buyerPropertySubType'
                            value={{ value: props.data?.buyerPropertySubType, label: props.data?.buyerPropertySubType }}
                            onChange={(value) => props.handleSelectChange(value, 'buyerPropertySubType')}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Stories</Typography>
                        <NumericFormat allowLeadingZeros thousandSeparator=","  name="buyerStories" value={props.data?.buyerStories ? parseFloat(props.data?.buyerStories.toString()).toLocaleString('en'):''} onChange={(e) => props.handleInputChange(e, 'number')}  className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Unit Count</Typography>
                        <NumericFormat allowLeadingZeros thousandSeparator=","  name="buyerUnitCount" value={props.data?.buyerUnitCount ? parseFloat(props.data?.buyerUnitCount.toString()).toLocaleString('en'):''} onChange={(e) => props.handleInputChange(e, 'number')}  className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Minimum Home Size (SqFt)</Typography>
                        <NumericFormat allowLeadingZeros thousandSeparator=","  name="buyerMinimumHomeSqFt" value={props.data?.buyerMinimumHomeSqFt ? parseFloat(props.data?.buyerMinimumHomeSqFt.toString()).toLocaleString('en'):''} onChange={(e) => props.handleInputChange(e, 'number')}  className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Minimum Lot Size (SqFt)</Typography>
                        <NumericFormat allowLeadingZeros thousandSeparator="," placeholder='1,000'  name="buyerMinimumLotSqFtSqFt" value={props.data?.buyerMinimumLotSqFt ? parseFloat(props.data?.buyerMinimumLotSqFt.toString()).toLocaleString('en'):''} onChange={(e) => props.handleInputChange(e, 'number')}  className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Minimum Bedrooms</Typography>
                        <NumericFormat allowLeadingZeros thousandSeparator="," placeholder='1'  name="buyerMinimumBedrooms" value={props.data?.buyerMinimumBedrooms ? parseFloat(props.data?.buyerMinimumBedrooms.toString()).toLocaleString('en'):''} onChange={(e) => props.handleInputChange(e, 'number')}  className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Minimum Bathrooms</Typography>
                        <NumericFormat allowLeadingZeros thousandSeparator="," placeholder='1'  name="buyerMinimumBathrooms" value={props.data?.buyerMinimumBathrooms ? parseFloat(props.data?.buyerMinimumBathrooms.toString()).toLocaleString('en'):''} onChange={(e) => props.handleInputChange(e, 'number')}  className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark" />
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
                            name='buyerParking'
                            value={{ value: props.data?.buyerParking, label: props.data?.buyerParking }}
                            onChange={(value) => props.handleSelectChange(value, 'buyerParking')}
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Garage</Typography>
                        <Select
                            options={[
                                { value: 'Yes', label: 'Yes' },
                                { value: 'No', label: 'No' },
                            ]}
                            name='buyerGarage'
                            value={{ value: props.data?.buyerGarage, label: props.data?.buyerGarage }}
                            onChange={(value) => props.handleSelectChange(value, 'buyerGarage')}
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
                            name='buyerHeating'
                            value={{ value: props.data?.buyerHeating, label: props.data?.buyerHeating }}
                            onChange={(value) => props.handleSelectChange(value, 'buyerHeating')}
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
                            name='buyerHeatingTypeMulti'
                            isMulti={true}
                            value={props.data?.buyerHeatingTypeMulti.map((item: any) => {
                                return {
                                    value: item,
                                    label: item
                                }
                            })}
                            onChange={(value) => props.handleSelectChange(value,  'buyerHeatingTypeMulti') }
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
                            name='buyerCooling'
                            value={{ value: props.data?.buyerCooling, label: props.data?.buyerCooling }}
                            onChange={(value) => props.handleSelectChange(value, 'buyerCooling')}
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
                            isMulti={true}
                            name='buyerCoolingTypeMulti'
                            value={props.data?.buyerCoolingTypeMulti.map((item: any) => {
                                return {
                                    value: item,
                                    label: item
                                }
                            })}
                            onChange={(value) => props.handleSelectChange(value, 'buyerCoolingTypeMulti')}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">View</Typography>
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
                            name='buyerViewsMulti'
                            isMulti={true}
                            value={props.data?.buyerViewsMulti.map((item: any) => {
                                return {
                                    value: item,
                                    label: item
                                }
                            })}
                            onChange={(value) => props.handleSelectChange(value, 'buyerViewsMulti')}
                        />

                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Pool</Typography>
                        <Select
                            options={[
                                { value: 'Yes', label: 'Yes' },
                                { value: 'No', label: 'No' },
                            ]}
                            name='buyerPool'
                            value={{ value: props.data?.buyerPool, label: props.data?.buyerPool }}
                            onChange={(value) => props.handleSelectChange(value, 'buyerPool')}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">Attached Ok?</Typography>
                        <Select
                            options={[
                                { value: 'Yes'
                                , label: 'Yes' },
                                { value: 'No', label: 'No' },
                            ]}
                            name='buyerIsAttached'
                            isSearchable={false}
                            value={{ value: props.data?.buyerIsAttached, label: props.data?.buyerIsAttached }}
                            onChange={(value) => props.handleSelectChange(value, 'buyerIsAttached')}
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Typography variant="caption" color="secondary">New Construction Only</Typography>
                        <Select
                            options={[
                                { value: 'Yes', label: 'Yes' },
                                { value: 'No', label: 'No' },
                            ]}
                            name='buyerAtbuyerNewConstructiontached'
                            isSearchable={false}
                            value={{ value: props.data?.buyerNewConstruction, label: props.data?.buyerNewConstruction }}
                            onChange={(value) => props.handleSelectChange(value, 'buyerNewConstruction')}
                        />
                    </div>
                </div>
                <div className="mt-[15px]">
                    <Typography variant="caption" color="secondary">Amenities</Typography>
                    <Select
                        options={[{value: searchAmenities, label: searchAmenities} , ...(amenities && amenities.map(item => {return {value: item.name, label: item.name}}))
                        ]}
                        name='buyerAmenitiesMulti'
                        isMulti={true}
                        value={props.data?.buyerAmenitiesMulti.map((item: any) => {
                            return {
                                value: item,
                                label: item
                            }
                        })}
                        onChange={(value) => props.handleSelectChange(value,  'buyerAmenitiesMulti') }
                        onInputChange={(value) => onInputChangeAutoComplete(value,  'buyerAmenitiesMulti')}
                    />
                </div>
                <div className="mt-[15px]">
                    <Typography variant="caption" color="secondary">Keywords</Typography>
                    <Select
                        options={[{value: searchKeyword, label: searchKeyword} , ...(keywords && keywords.map(item => {return {value: item.name, label: item.name}}))
                           ]}
                        name='buyerKeywordsMulti'
                        isMulti={true}
                        value={props.data?.buyerKeywordsMulti.map((item: any) => {
                            return {
                                value: item,
                                label: item
                            }
                        })}
                        onChange={(value) => props.handleSelectChange(value,  'buyerKeywordsMulti') }
                        onInputChange={(value) => onInputChangeAutoComplete(value,  'buyerKeywordsMulti')}
                    />
                </div>
            </div>
        </div>
    )
}

export default buyerProperty