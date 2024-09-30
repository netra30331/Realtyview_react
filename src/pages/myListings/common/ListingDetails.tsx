import React from "react"
import Typography from "@/components/baseComponents/Typography"
import Select from "@/components/baseComponents/Select"
import Textarea from '@/components/baseComponents/Textarea'
import AddressAutoComplete from '@/components/baseComponents/AddressAutoComplete'
import DatePicker from "@/components/baseComponents/DatePickers/DatePicker"
import { NumericFormat } from "react-number-format"
import { fetchAmenities, fetchKeywords, fetchSchoolDistricts, getAmenities, getKeywords } from "@/redux/lead/leadSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { IMyListing } from "@/shared/interfaces/interfaces"
import TextField from "@/components/baseComponents/TextField"

type IProps = {
    data?: IMyListing
    addresses: Array<any>
    errorListingDateListed: boolean
    errorListingExpirationDate: boolean
    errorListingType: boolean
    errorListingSaleType: boolean
    errorListingListPrice: boolean
    handleInputChange: Function
    handleSelectChange: Function
    handleDateChange: Function
    onChangeAddressAutoComplete: Function
    onSelectAddressAutoComplete: Function
}
const ListingDetails = (props: IProps) => {

    const dispatch = useAppDispatch()
    const keywords = useAppSelector(getKeywords);
    const amenities = useAppSelector(getAmenities);

    const [propertySubType, setPropertySubType] = React.useState<Array<any>>([])
    const [searchKeyword, setSearchKeyword] = React.useState('');
    const [searchAmenities, setSearchAmenities] = React.useState('');

    const yesOrNoOptions = [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' }
    ]
    
    const occupancyStatus = [
        { value: 'Owner Occupied', label: 'Owner Occupied' },
        { value: 'Renter Occupied', label: 'Renter Occupied' },
        { value: 'Squatters', label: 'Squatters' },
        { value: 'Vacant', label: 'Vacant' }
    ]

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

    const SubTypeList = [
        {
            parent: 'Single Family Residence', contents: [
                { value: 'Cabin', label: 'Cabin' },
                { value: 'Manufactured Home', label: 'Manufactured Home' },
                { value: 'Manufactured On Land', label: 'Manufactured On Land' },
                { value: 'Mobile Home', label: 'Mobile Home' },
                { value: 'Own Your Own', label: 'Own Your Own' },
                { value: 'Single Family Residence', label: 'Single Family Residence' },
                { value: 'Mixed Use', label: 'Mixed Use' },
            ]
        },
        {
            parent: 'Multi Family Residence', contents: [
                { value: 'Duplex', label: 'Duplex' },
                { value: 'Manufactured Home', label: 'Manufactured Home' },
                { value: 'Manufactured On Land', label: 'Manufactured On Land' },
                { value: 'Mobile Home', label: 'Mobile Home' },
                { value: 'Own Your Own', label: 'Own Your Own' },
                { value: 'Quadruplex', label: 'Quadruplex' },
                { value: 'Triplex', label: 'Triplex' },
            ]
        },
        {
            parent: 'Apartment', contents: [
                { value: 'Apartment', label: 'Apartment' },
                { value: 'Condominium', label: 'Condominium' },
                { value: 'Own Your Own', label: 'Own Your Own' },
                { value: 'Stock Cooperative', label: 'Stock Cooperative' },
            ]
        },
        {
            parent: 'Townhouse', contents: [
                { value: 'Own Your Own', label: 'Own Your Own' },
                { value: 'Townhouse', label: 'Townhouse' },
            ]
        },
        {
            parent: 'Land', contents: [
                { value: 'Farm (PropertySubType)', label: 'Farm (PropertySubType)' },
                { value: 'Own Your Own', label: 'Own Your Own' },
                { value: 'Ranch', label: 'Ranch' },
                { value: 'Unimproved Land', label: 'Unimproved Land' },
            ]
        },
        {
            parent: 'Mobile', contents: [
                { value: 'Mobile Home', label: 'Mobile Home' },
                { value: 'Own Your Own', label: 'Own Your Own' },
            ]
        },
        {
            parent: 'Commercial', contents: [
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
            ]
        },
        {
            parent: 'Other', contents: [
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
            ]
        },
    ]

    const changePropertyType = (value: any) => {
        props.handleSelectChange(value, 'propertyType')
        SubTypeList.map(item => {
            if (item.parent === value.value) {
                setPropertySubType(item.contents)
            }
        })
    }

    const onInputChangeAutoComplete = (value: any, name: string) => {
        if (name === 'propertyKeywords') {
            setSearchKeyword(value)
            dispatch(fetchKeywords({ query: value }))
        } else if (name === 'propertyAmenities') {
            setSearchAmenities(value)
            dispatch(fetchAmenities({ query: value }))
        } else {
            dispatch(fetchSchoolDistricts({ query: value }))
        }
    }

    return (
      <div className="my-[30px]">
        <div className="px-8">
          <Typography variant="h3" color="primary">
            Listing Details
          </Typography>
          <div className="grid grid-cols-3 gap-[15px] mt-[25px]">
            <div className="col-span-2 sm:col-span-2">
              <Typography variant="caption" color="secondary">
                Address
              </Typography>
              <AddressAutoComplete
                options={props.addresses}
                placeholder="Enter Property Address"
                filterKey="streetLine"
                value={props.data?.listingAddress}
                onChange={(e) =>
                  props.onChangeAddressAutoComplete(e, "listingAddress")
                }
                onAllChange={(e) =>
                  props.onSelectAddressAutoComplete(e, "listingAddress")
                }
              />
            </div>
            <div>
              <Typography variant="caption" color="secondary">
                Unit
              </Typography>
              <TextField
                name="listingUnit"
                value={props.data?.listingUnit}
                onChange={(e) => props.handleInputChange(e)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[15px] mt-[25px]">
            <div className="col-span-2 sm:col-span-1">
              <Typography variant="caption" color="secondary">
                Neighborhood
              </Typography>
              <TextField
                placeholder=""
                name="listingNeigborhood"
                value={props.data?.listingNeigborhood}
                onChange={(e) => props.handleInputChange(e)}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Typography variant="caption" color="secondary">
                MLS Number
              </Typography>
              <NumericFormat
                name="listingMlsNumber"
                value={props.data?.listingMlsNumber || ""}
                onChange={(e) => props.handleInputChange(e, "number")}
                className={`body bg-netural rounded-5 h-10 text-primary p-4 w-full placeholder:caption border-transparent focus:border-netural-dark`}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[15px] mt-[25px]">
            <div className="col-span-2 sm:col-span-1 relative">
              <Typography variant="caption" color="secondary">
                Date Listed *
              </Typography>
              <DatePicker
                className={`w-full relative ${
                  props.errorListingDateListed
                    ? "outline outline-1 rounded outline-[#E01010]"
                    : ""
                }`}
                name="listingDateListed"
                value={
                  props.data?.listingDateListed !== undefined
                    ? new Date(props.data?.listingDateListed)
                    : null
                }
                onChange={(value) =>
                  props.handleDateChange(value, "listingDateListed")
                }
              />
              {props.errorListingDateListed && (
                <Typography
                  variant="caption"
                  className="text-[#E01010] absolute mt-[42px] left-0"
                >
                  This field is required
                </Typography>
              )}
            </div>
            <div className="col-span-2 sm:col-span-1 relative">
              <Typography variant="caption" color="secondary">
                Listing Expiration Date *
              </Typography>
              <DatePicker
                className={`${
                  props.errorListingExpirationDate
                    ? "outline outline-1 rounded outline-[#E01010]"
                    : ""
                }`}
                name="listingExpirationDate"
                value={
                  props.data?.listingExpirationDate !== undefined
                    ? new Date(props.data?.listingExpirationDate)
                    : null
                }
                onChange={(value) =>
                  props.handleDateChange(value, "listingExpirationDate")
                }
              />
              {props.errorListingExpirationDate && (
                <Typography
                  variant="caption"
                  className="text-[#E01010] absolute mt-[42px] left-0"
                >
                  This field is required
                </Typography>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[15px] mt-[25px]">
            <div className="col-span-2 sm:col-span-1">
              <Typography variant="caption" color="secondary">
                Listing Type *
              </Typography>
              <Select
                className={`${
                  props.errorListingType
                    ? "border border-1 rounded border-[#E01010]"
                    : ""
                }`}
                options={[
                  { value: "Exclusive Agency", label: "Exclusive Agency" },
                  {
                    value: "Exclusive Right To Lease",
                    label: "Exclusive Right To Lease",
                  },
                  {
                    value: "Exclusive Right To Sell",
                    label: "Exclusive Right To Sell",
                  },
                  {
                    value: "Exclusive Right With Exception",
                    label: "Exclusive Right With Exception",
                  },
                  {
                    value: "Net (Listing Agreement)",
                    label: "Net (Listing Agreement)",
                  },
                  { value: "Open", label: "Open" },
                  { value: "Probate", label: "Probate" },
                ]}
                name="listingType"
                value={{
                  value: props.data?.listingType,
                  label: props.data?.listingType,
                }}
                onChange={(value) =>
                  props.handleSelectChange(value, "listingType")
                }
              />
              {props.errorListingType && (
                <Typography
                  variant="caption"
                  className="text-[#E01010] absolute mt-[2px]"
                >
                  This field is required
                </Typography>
              )}
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Typography variant="caption" color="secondary">
                Sale Type *
              </Typography>
              <Select
                className={`${
                  props.errorListingSaleType
                    ? "!border !border-1 !rounded !border-red-600"
                    : ""
                }`}
                options={[
                  { value: "Auction", label: "Auction" },
                  {
                    value: "Bankruptcy Property",
                    label: "Bankruptcy Property",
                  },
                  { value: "HUD Owned", label: "HUD Owned" },
                  { value: "In Foreclosure", label: "In Foreclosure" },
                  { value: "Notice Of Default", label: "Notice Of Default" },
                  { value: "Probate Listing", label: "Probate Listing" },
                  { value: "Real Estate Owned", label: "Real Estate Owned" },
                  { value: "Short Sale", label: "Short Sale" },
                  { value: "Standard", label: "Standard" },
                  {
                    value: "Third Party Approval",
                    label: "Third Party Approval",
                  },
                ]}
                name="listingSaleType"
                value={{
                  value: props.data?.listingSaleType,
                  label: props.data?.listingSaleType,
                }}
                onChange={(value) =>
                  props.handleSelectChange(value, "listingSaleType")
                }
              />
              {props.errorListingSaleType && (
                <Typography
                  variant="caption"
                  className="text-[#E01010] absolute mt-[2px]"
                >
                  This field is required
                </Typography>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[15px] mt-[25px]">
            <div className="col-span-2 sm:col-span-1 relative">
              <Typography variant="caption" color="secondary">
                List Price *
              </Typography>
              <NumericFormat
                allowLeadingZeros={false}
                thousandSeparator=","
                placeholder="$"
                name="listingListPrice"
                value={props.data?.listingListPrice || ""}
                onChange={(e) => props.handleInputChange(e, "number")}
                className={`body bg-netural rounded-5 h-10 text-primary p-4 w-full placeholder:caption border-transparent focus:border-netural-dark ${
                  props.errorListingListPrice
                    ? "border border-1 rounded !border-[#E01010]"
                    : ""
                }`}
              />
              {props.errorListingListPrice && (
                <Typography
                  variant="caption"
                  className="text-[#E01010] absolute mt-[42px] left-0"
                >
                  This field is required
                </Typography>
              )}
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Typography variant="caption" color="secondary">
                Annual Taxes
              </Typography>
              <NumericFormat
                allowLeadingZeros={false}
                thousandSeparator=","
                placeholder="$"
                name="listingAnnualTaxes"
                value={props.data?.listingAnnualTaxes || ""}
                onChange={(e) => props.handleInputChange(e, "number")}
                className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[15px] mt-[25px]">
            <div className="col-span-2 sm:col-span-1">
              <Typography variant="caption" color="secondary">
                HOA Expenses
              </Typography>
              <NumericFormat
                allowLeadingZeros={false}
                thousandSeparator=","
                placeholder="$"
                name="listingHoaExpenses"
                value={props.data?.listingHoaExpenses || ""}
                onChange={(e) => props.handleInputChange(e, "number")}
                className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Typography variant="caption" color="secondary">
                Other Monthly Expenses
              </Typography>
              <NumericFormat
                allowLeadingZeros={false}
                thousandSeparator=","
                placeholder="$"
                name="listingOtherMonthlyExpenses"
                value={props.data?.listingOtherMonthlyExpenses || ""}
                onChange={(e) => props.handleInputChange(e, "number")}
                className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[15px] mt-[25px]">
            <div className="col-span-2 sm:col-span-1">
              <Typography variant="caption" color="secondary">
                Occupancy Status
              </Typography>
              <Select
                options={occupancyStatus}
                name="listingOccupancyStatus"
                value={{
                  value: props.data?.listingOccupancyStatus,
                  label: props.data?.listingOccupancyStatus,
                }}
                onChange={(value) =>
                  props.handleSelectChange(value, "listingOccupancyStatus")
                }
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Typography variant="caption" color="secondary">
                Lis Pendens
              </Typography>
              <Select
                options={[
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                  { value: "Unknown", label: "Unknown" },
                ]}
                name="listingLisPendens"
                value={{
                  value: props.data?.listingLisPendens,
                  label: props.data?.listingLisPendens,
                }}
                onChange={(value) =>
                  props.handleSelectChange(value, "listingLisPendens")
                }
              />
            </div>
          </div>
        </div>
        <div className="mt-[50px] px-8">
          <Typography variant="h3" color="primary">
            Property Details
          </Typography>
          <div className="grid grid-cols-2 gap-[15px] mt-[25px]">
            <div className="col-span-2 sm:col-span-1">
              <Typography variant="caption" color="secondary">
                Property Type
              </Typography>
              <Select
                options={propertyType}
                name="propertyType"
                value={{
                  value: props.data?.propertyType,
                  label: props.data?.propertyType,
                }}
                onChange={(value) => changePropertyType(value)}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Typography variant="caption" color="secondary">
                Property Sub-Type
              </Typography>
              <Select
                options={propertySubType}
                name="propertySubType"
                value={{
                  value: props.data?.propertySubType,
                  label: props.data?.propertySubType,
                }}
                onChange={(value) =>
                  props.handleSelectChange(value, "propertySubType")
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[15px] mt-[25px]">
            <div className="col-span-2 sm:col-span-1">
              <Typography variant="caption" color="secondary">
                Stories
              </Typography>
              <NumericFormat
                thousandSeparator=","
                name="propertyStories"
                value={props.data?.propertyStories}
                onChange={(e) => props.handleInputChange(e, "number")}
                className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Typography variant="caption" color="secondary">
                Number of Units
              </Typography>
              <NumericFormat
                thousandSeparator=","
                name="propertyNumberOfUnits"
                value={props.data?.propertyNumberOfUnits}
                onChange={(e) => props.handleInputChange(e, "number")}
                className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[15px] mt-[25px]">
            <div className="col-span-2 sm:col-span-1">
              <Typography variant="caption" color="secondary">
                Bedrooms
              </Typography>
              <NumericFormat
                thousandSeparator=","
                name="propertyBedrooms"
                value={props.data?.propertyBedrooms}
                onChange={(e) => props.handleInputChange(e, "number")}
                className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Typography variant="caption" color="secondary">
                Bathrooms
              </Typography>
              <NumericFormat
                thousandSeparator=","
                name="propertyBathrooms"
                value={props.data?.propertyBathrooms}
                onChange={(e) => props.handleInputChange(e, "number")}
                className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[15px] mt-[25px]">
            <div className="col-span-2 sm:col-span-1">
              <Typography variant="caption" color="secondary">
                Home SqFt
              </Typography>
              <NumericFormat
                thousandSeparator=","
                name="propertyHomeSqft"
                value={props.data?.propertyHomeSqft}
                onChange={(e) => props.handleInputChange(e, "number")}
                className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Typography variant="caption" color="secondary">
                Lot SqFt
              </Typography>
              <NumericFormat
                thousandSeparator=","
                name="propertyLotSqft"
                value={props.data?.propertyLotSqft}
                onChange={(e) => props.handleInputChange(e, "number")}
                className="body bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:caption  border-1 border-transparent focus:border-netural-dark"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[15px] mt-[25px]">
            <div className="col-span-2 sm:col-span-1">
              <Typography variant="caption" color="secondary">
                Cooling
              </Typography>
              <Select
                options={yesOrNoOptions}
                name="propertyCooling"
                value={{
                  value: props.data?.propertyCooling,
                  label: props.data?.propertyCooling,
                }}
                onChange={(value) =>
                  props.handleSelectChange(value, "propertyCooling")
                }
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Typography variant="caption" color="secondary">
                Heating
              </Typography>
              <Select
                options={yesOrNoOptions}
                name="propertyHeating"
                value={{
                  value: props.data?.propertyHeating,
                  label: props.data?.propertyHeating,
                }}
                onChange={(value) =>
                  props.handleSelectChange(value, "propertyHeating")
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[15px] mt-[25px]">
            <div className="col-span-2 sm:col-span-1">
              <Typography variant="caption" color="secondary">
                Views
              </Typography>
              <Select
                isMulti={true}
                options={[
                  { value: "Bay", label: "Bay" },
                  { value: "Beach", label: "Beach" },
                  { value: "Bridge(s)", label: "Bridge(s)" },
                  { value: "Canal", label: "Canal" },
                  { value: "Canyon", label: "Canyon" },
                  { value: "City", label: "City" },
                  { value: "City Lights", label: "City Lights" },
                  { value: "Creek/Stream", label: "Creek/Stream" },
                  { value: "Desert", label: "Desert" },
                  { value: "Downtown", label: "Downtown" },
                  { value: "Forest", label: "Forest" },
                  { value: "Garden", label: "Garden" },
                  { value: "Golf Course", label: "Golf Course" },
                  { value: "Hills", label: "Hills" },
                  { value: "Lake", label: "Lake" },
                  { value: "Marina", label: "Marina" },
                  { value: "Meadow", label: "Meadow" },
                  { value: "Mountain(s)", label: "Mountain(s)" },
                  { value: "Neighborhood", label: "Neighborhood" },
                  { value: "None", label: "None" },
                  { value: "Ocean", label: "Ocean" },
                  { value: "Orchard", label: "Orchard" },
                  { value: "Other", label: "Other" },
                  { value: "Panoramic", label: "Panoramic" },
                  { value: "Park/Greenbelt", label: "Park/Greenbelt" },
                  { value: "Pasture", label: "Pasture" },
                  { value: "Pond", label: "Pond" },
                  { value: "Pool", label: "Pool" },
                  { value: "Ridge", label: "Ridge" },
                  { value: "River", label: "River" },
                  { value: "Rural", label: "Rural" },
                  { value: "See Remarks", label: "See Remarks" },
                  { value: "Skyline", label: "Skyline" },
                  { value: "Territorial", label: "Territorial" },
                  { value: "Trees/Woods", label: "Trees/Woods" },
                  { value: "Valley", label: "Valley" },
                  { value: "Vineyard", label: "Vineyard" },
                  { value: "Water", label: "Water" },
                ]}
                name="propertyViews"
                value={props.data?.propertyViews.map((item: any) => {
                  return {
                    value: item,
                    label: item,
                  };
                })}
                onChange={(value) =>
                  props.handleSelectChange(value, "propertyViews", true)
                }
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Typography variant="caption" color="secondary">
                Pool
              </Typography>
              <Select
                options={yesOrNoOptions}
                name="propertyPool"
                value={{
                  value: props.data?.propertyPool,
                  label: props.data?.propertyPool,
                }}
                onChange={(value) =>
                  props.handleSelectChange(value, "propertyPool")
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[15px] mt-[25px]">
            <div className="col-span-2 sm:col-span-1">
              <Typography variant="caption" color="secondary">
                Attached
              </Typography>
              <Select
                options={yesOrNoOptions}
                name="propertyAttached"
                value={{
                  value: props.data?.propertyAttached,
                  label: props.data?.propertyAttached,
                }}
                onChange={(value) =>
                  props.handleSelectChange(value, "propertyAttached")
                }
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Typography variant="caption" color="secondary">
                New Construction
              </Typography>
              <Select
                options={yesOrNoOptions}
                name="propertyNewConstruction"
                value={{
                  value: props.data?.propertyNewConstruction,
                  label: props.data?.propertyNewConstruction,
                }}
                onChange={(value) =>
                  props.handleSelectChange(value, "propertyNewConstruction")
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[15px] mt-[25px]">
            <div className="col-span-2 sm:col-span-1">
              <Typography variant="caption" color="secondary">
                Garage
              </Typography>
              <Select
                options={yesOrNoOptions}
                name="propertyGarage"
                value={{
                  value: props.data?.propertyGarage,
                  label: props.data?.propertyGarage,
                }}
                onChange={(value) =>
                  props.handleSelectChange(value, "propertyGarage")
                }
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Typography variant="caption" color="secondary">
                Parking
              </Typography>
              <Select
                options={yesOrNoOptions}
                name="propertyParking"
                value={{
                  value: props.data?.propertyParking,
                  label: props.data?.propertyParking,
                }}
                onChange={(value) =>
                  props.handleSelectChange(value, "propertyParking")
                }
              />
            </div>
          </div>
          <div className="mt-[25px]">
            <Typography variant="caption" color="secondary">
              Amenities
            </Typography>
            <Select
              options={[
                { value: searchAmenities, label: searchAmenities },
                ...(amenities
                  ? amenities.map((item: any) => {
                      return { value: item.name, label: item.name };
                    })
                  : []),
              ]}
              name="propertyAmenities"
              isMulti={true}
              value={props.data?.propertyAmenities.map((item: any) => {
                return {
                  value: item,
                  label: item,
                };
              })}
              onChange={(value) =>
                props.handleSelectChange(value, "propertyAmenities", true)
              }
              onInputChange={(value) =>
                onInputChangeAutoComplete(value, "propertyAmenities")
              }
            />
          </div>
          <div className="mt-[25px]">
            <Typography variant="caption" color="secondary">
              Keywords
            </Typography>
            <Select
              options={[
                { value: searchKeyword, label: searchKeyword },
                ...(keywords
                  ? keywords.map((item: any) => {
                      return { value: item.name, label: item.name };
                    })
                  : []),
              ]}
              name="propertyKeywords"
              isMulti={true}
              value={props.data?.propertyKeywords.map((item: any) => {
                return {
                  value: item,
                  label: item,
                };
              })}
              onChange={(value) =>
                props.handleSelectChange(value, "propertyKeywords", true)
              }
              onInputChange={(value) =>
                onInputChangeAutoComplete(value, "propertyKeywords")
              }
            />
          </div>
          <div className="mt-[25px]">
            <Typography variant="caption" color="secondary">
              Property Description
            </Typography>
            <Textarea
              placeholder="Describe the Property"
              name="propertyDescription"
              rows={5}
              value={props.data?.propertyDescription}
              onChange={(e) => props.handleInputChange(e)}
            />
          </div>
        </div>
      </div>
    );
}

export default ListingDetails