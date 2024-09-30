import React from "react"
import Calendar from "react-calendar"
import Typography from "@/components/baseComponents/Typography"
import IconWrapper from "@/components/baseComponents/IconWrapper"

import { Button } from "@/components/baseComponents/Button"
import { CreateShowingDto, IMyListing } from "@/shared/interfaces/interfaces"
import { format } from "date-fns"
import { Slide } from 'react-slideshow-image';
import { NumericFormat } from "react-number-format"

import View from "@/pages/showing/View"
import SubmitOffer from "@/pages/offer/SubmitOffer"
import ListingDrawerFooter from "@/pages/myListings/common/ListingDrawerFooter"
import ListingImagePlaceholder from '@/assets/images/listing_image_placeholder.png'
import AddProfile from '@/assets/images/add_profile.svg'
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { getUser } from "@/redux/user/userSlice"
import { createNewShowing } from "@/redux/showing/showingSlice"
import { toast } from 'react-toastify'
import { formatWeekDate, WeekDays } from "@/shared/config/constants"
import 'react-slideshow-image/dist/styles.css'
import TextField from "@/components/baseComponents/TextField"

type IProps = {
  data?: IMyListing
  isPublished: boolean
  onSetCurrentStep?: Function
}
const Preview = (props: IProps) => {
  const user = useAppSelector(getUser)
  const dispatch = useAppDispatch()
  const [openShowingDrawer, setOpenShowingDrawer] = React.useState<boolean>(false)
  const [openSubmitOfferDrawer, setOpenSubmitOfferDrawer] = React.useState<boolean>(false)
  const [date, setDate] = React.useState<Date>(new Date())
  const [selectedTimeIndex, setSelectedTimeIndex] = React.useState<number>(0)
  const [selectedDay, setSelectedDay] = React.useState<string>('')
  const [requestedFlag, setRequestedFlag] = React.useState<boolean>(false)
  const [isPublicListinngLinkOpen, setIsPublicListinngLinkOpen] = React.useState<boolean>(false)

  const publicListingUrl = `https://www.realtyview.app/listing/${props.data?._id}`
  
  const times = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
  ]

  const onCopyPublicListingUrlToClipboard = () => {
    navigator.clipboard.writeText(publicListingUrl);
  }

  const onChangeDate = (date: any) => {
    setDate(date);
  }

  const createShowing = () => {
    if (!props.data?._id) return;

    let loadingToast = toast.loading("Creating your request");
    const localDateTime = new Date(
      `${date.toDateString()} ${times[selectedTimeIndex]}`
    );

    setSelectedDay(WeekDays[localDateTime.getDay()]);

    let data: CreateShowingDto = {
      email: user.email,
      data: {
        _id: "",
        status: "Pending",
        listing: props.data?._id,
        dateTime: localDateTime,
      },
      userId: user._id,
    };

    dispatch(createNewShowing(data)).then((res: any) => {
      try {
        toast.update(loadingToast, {
          render: res.payload.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } catch (e) {
        toast.update(loadingToast, {
          render:
            "There was an error creating your request. Please try again.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    });

    setRequestedFlag(true);
  };

  const updateStatus = () => { };

  const onRescheduleShowing = (item: any) => {
    console.log(item);
    // setViewdata(item);
    // setOpenDetailsModal(false);
    // setOpenRescheduleModal(true);
  };

  return (
    <div className="my-[30px]">
      {/* Showing Drawer */}
      <View
        open={openShowingDrawer}
        changeState={setOpenShowingDrawer}
        data={{ listing: props.data }}
        updateStatus={updateStatus}
        onRescheduleShowing={onRescheduleShowing}
      />

      {/* Offer Drawer */}
      <SubmitOffer
        open={openSubmitOfferDrawer}
        changeState={setOpenSubmitOfferDrawer}
        search_list_flag={false}
        data={{ listing: props.data }}
      />

      <div className="px-8">
        <Slide
          autoplay={false}
          slidesToShow={3}
          slidesToScroll={1}
          transitionDuration={500}
          prevArrow={
            <Button className="bg-transparent hover:bg-transparent">
              <IconWrapper
                className="bg-white bg-opacity-40 hover:bg-opacity-90 rounded-full p-1"
                name="arrow-backward"
                width={24}
                height={23}
              />
            </Button>
          }
          nextArrow={
            <Button className="bg-transparent hover:bg-transparent">
              <IconWrapper
                className="bg-white bg-opacity-40 hover:bg-opacity-90 rounded-full p-1"
                name="arrow-forward"
                width={24}
                height={23}
              />
            </Button>
          }
        >
          {props.data?.propertyPhotos && props.data.propertyPhotos.length > 0
            ? [...props.data.propertyPhotos]
              .sort((a, b) => a.order - b.order)
              .map((propertyPhoto, index) => (
                <div key={index} className="flex items-center h-full mx-1">
                  <img
                    key={index}
                    src={
                      propertyPhoto.isFile
                        ? URL.createObjectURL(propertyPhoto.file)
                        : propertyPhoto.file
                    }
                    className="rounded-md aspect-auto"
                  />
                </div>
              ))
            : [...Array(3)].map((placeholder) => (
              <div
                key={placeholder}
                className="flex items-center h-[200px] w-[160px] mx-1"
              >
                {props.isPublished ? (
                  <img
                    key={placeholder}
                    src={ListingImagePlaceholder}
                    className="rounded-md aspect-auto"
                  />
                ) : (
                  <button
                    className="flex justify-center items-center gap-2 bg-white hover:bg-white h-full w-full p-0 border border-2 cursor-pointer rounded-md"
                    onClick={() =>
                      props.onSetCurrentStep && props.onSetCurrentStep(3)
                    }
                  >
                    <IconWrapper name="image" width={11} height={11} />
                    <Typography
                      variant="medium-text"
                      color="primary"
                      className="whitespace-nowrap"
                    >
                      Add Photo
                    </Typography>
                  </button>
                )}
              </div>
            ))}
        </Slide>
      </div>
      {props.isPublished && (
        <div className="flex gap-[16px] mt-[25px] px-9">
          <Button className="bg-success hover:bg-success">
            <Typography variant="medium-text" className="text-[#6DA172]">
              Active
            </Typography>
          </Button>
          <Button className="px-[21px]" onClick={() => setIsPublicListinngLinkOpen(true)}>
            <Typography variant="medium-text" className="whitespace-nowrap">
              Post Listing
            </Typography>
          </Button>
          <a
            href="#schedule-a-showing-section"
            className="flex items-center button2 bg-button-primary hover:bg-button-primary-hover text-white rounded-5 px-[21px]"
          >
            <Typography variant="medium-text" className="whitespace-nowrap">
              Schedule a Showing
            </Typography>
          </a>
          <Button
            className="px-[21px]"
            onClick={() => setOpenSubmitOfferDrawer(true)}
          >
            <Typography variant="medium-text" className="whitespace-nowrap">
              Submit an Offer
            </Typography>
          </Button>
        </div>
      )}
      {isPublicListinngLinkOpen && (
        <div className="mt-[50px] px-9">
          <div className="flex flex-col gap-1">
            <div className="relative flex flex-col justify-center gap-1">
              <Typography variant="caption" color="secondary">
                This is the public listing link for {props.data?.listingAddress}
              </Typography>
              <TextField
                readOnly
                name="publicListingLink"
                value={publicListingUrl}
              />
              <Button variant="text" className="absolute right-0 top-6" onClick={() => onCopyPublicListingUrlToClipboard()}>
                <Typography variant="body" color="primary">Copy</Typography>
              </Button>
            </div>
            <Typography variant="caption" color="secondary">Your showing link has been copied. Share to your MLS listing, social media and your network.</Typography>
          </div>
        </div>
      )}
      <div className="mt-[50px] px-9">
        <div className="grid grid-cols-3 gap-16">
          <div className="col-span-1">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <Typography variant="caption" color="secondary">
                  List Price
                </Typography>
                <Typography variant="body" color="primary">
                  <NumericFormat
                    displayType="text"
                    thousandSeparator=","
                    prefix="$"
                    value={props.data?.listingListPrice}
                  />
                </Typography>
              </div>
              <div className="flex flex-col gap-1">
                <Typography
                  variant="caption"
                  color="secondary"
                  className="whitespace-nowrap"
                >
                  Other Monthly Expenses
                </Typography>
                <Typography variant="body" color="primary">
                  <NumericFormat
                    displayType="text"
                    thousandSeparator=","
                    prefix="$"
                    value={props.data?.listingOtherMonthlyExpenses}
                  />
                </Typography>
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="caption" color="secondary">
                  Listing Type
                </Typography>
                <Typography variant="body" color="primary">
                  {props.data?.listingType || "None"}
                </Typography>
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="caption" color="secondary">
                  Date Listed
                </Typography>
                <Typography variant="body" color="primary">
                  {props.data?.listingDateListed
                    ? format(
                      new Date(props.data?.listingDateListed),
                      "MMMM dd, yyyy"
                    )
                    : "None"}
                </Typography>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <Typography variant="caption" color="secondary">
                  Annual Taxes
                </Typography>
                <Typography variant="body" color="primary">
                  <NumericFormat
                    displayType="text"
                    thousandSeparator=","
                    prefix="$"
                    value={props.data?.listingAnnualTaxes}
                  />
                </Typography>
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="caption" color="secondary">
                  Occupancy Status
                </Typography>
                <Typography variant="body" color="primary">
                  {props.data?.listingOccupancyStatus || "None"}
                </Typography>
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="caption" color="secondary">
                  Sale Type
                </Typography>
                <Typography variant="body" color="primary">
                  {props.data?.listingSaleType || "None"}
                </Typography>
              </div>
              <div className="flex flex-col gap-1">
                <Typography
                  variant="caption"
                  color="secondary"
                  className="whitespace-nowrap"
                >
                  Listing Expiration Date
                </Typography>
                <Typography variant="body" color="primary">
                  {props.data?.listingExpirationDate
                    ? format(
                      new Date(props.data?.listingExpirationDate),
                      "MMMM dd, yyyy"
                    )
                    : "None"}
                </Typography>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <Typography variant="caption" color="secondary">
                  HOA Expenses
                </Typography>
                <Typography variant="body" color="primary">
                  <NumericFormat
                    displayType="text"
                    thousandSeparator=","
                    prefix="$"
                    value={props.data?.listingHoaExpenses}
                  />
                </Typography>
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="caption" color="secondary">
                  Has Lis Pendens
                </Typography>
                <Typography variant="body" color="primary">
                  {props.data?.listingLisPendens || "None"}
                </Typography>
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="caption" color="secondary">
                  MLS Number
                </Typography>
                <Typography variant="body" color="primary">
                  {props.data?.listingMlsNumber || "None"}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[50px] px-9">
        <Typography variant="h3" color="primary" className="mb-5">
          Address
        </Typography>
        <div className=" gap-16">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <Typography variant="caption" color="secondary">
                Address 1
              </Typography>
              <Typography variant="body" color="primary">
                {props.data?.listingAddress || "None"}
              </Typography>
            </div>
            <div className="grid grid-cols-2">
              <div>
                <Typography variant="caption" color="secondary">
                  Neighborhood
                </Typography>
                <Typography variant="body" color="primary">
                  {props.data?.listingNeigborhood || "None"}
                </Typography>
              </div>
              <div>
                <Typography variant="caption" color="secondary">
                  Unit
                </Typography>
                <Typography variant="body" color="primary">
                  {props.data?.listingUnit || "None"}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[50px] px-9">
        <Typography variant="h3" color="primary" className="mb-5">
          Details
        </Typography>
        <div className="grid grid-cols-3 gap-16">
          <div className="col-span-1">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <Typography variant="caption" color="secondary">
                  Property Type
                </Typography>
                <Typography
                  variant="body"
                  color="primary"
                  className="whitespace-nowrap"
                >
                  {props.data?.propertyType || "None"}
                </Typography>
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="caption" color="secondary">
                  Stories
                </Typography>
                <Typography variant="body" color="primary">
                  {props.data?.propertyStories || "None"}
                </Typography>
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="caption" color="secondary">
                  Home SqFt
                </Typography>
                <Typography variant="body" color="primary">
                  {props.data?.propertyHomeSqft || "None"}
                </Typography>
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="caption" color="secondary">
                  Cooling
                </Typography>
                <Typography variant="body" color="primary">
                  {props.data?.propertyCooling}
                </Typography>
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="caption" color="secondary">
                  Views
                </Typography>
                <Typography variant="body" color="primary">
                  {props.data?.propertyViews !== undefined &&
                    props.data?.propertyViews.length > 0
                    ? props.data?.propertyViews.join(", ")
                    : "None"}
                </Typography>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <Typography variant="caption" color="secondary">
                  Property Sub-Type
                </Typography>
                <Typography variant="body" color="primary">
                  {props.data?.propertySubType || "None"}
                </Typography>
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="caption" color="secondary">
                  Bedrooms
                </Typography>
                <Typography variant="body" color="primary">
                  {props.data?.propertyBedrooms || "None"}
                </Typography>
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="caption" color="secondary">
                  Lot SqFt
                </Typography>
                <Typography variant="body" color="primary">
                  {props.data?.propertyLotSqft || "None"}
                </Typography>
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="caption" color="secondary">
                  Heating
                </Typography>
                <Typography variant="body" color="primary">
                  {props.data?.propertyHeating}
                </Typography>
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="caption" color="secondary">
                  Pool
                </Typography>
                <Typography variant="body" color="primary">
                  {props.data?.propertyPool}
                </Typography>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <Typography variant="caption" color="secondary">
                  Units
                </Typography>
                <Typography variant="body" color="primary">
                  {props.data?.propertyNumberOfUnits || "None"}
                </Typography>
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="caption" color="secondary">
                  Bathrooms
                </Typography>
                <Typography variant="body" color="primary">
                  {props.data?.propertyBathrooms || "None"}
                </Typography>
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="caption" color="secondary">
                  Parking
                </Typography>
                <Typography variant="body" color="primary">
                  {props.data?.propertyParking}
                </Typography>
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="caption" color="secondary">
                  Garage
                </Typography>
                <Typography variant="body" color="primary">
                  {props.data?.propertyGarage}
                </Typography>
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="caption" color="secondary">
                  Is Attached
                </Typography>
                <Typography variant="body" color="primary">
                  {props.data?.propertyAttached}
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-16 mt-[1.25rem]">
          <div className="col-span-1">
            <div className="flex flex-col gap-1">
              <Typography variant="caption" color="secondary">
                Is New Construction
              </Typography>
              <Typography variant="body" color="primary">
                {props.data?.propertyNewConstruction}
              </Typography>
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex flex-col gap-1">
              <Typography variant="caption" color="secondary">
                Amenities
              </Typography>
              <Typography variant="body" color="primary">
                {props.data?.propertyAmenities !== undefined &&
                  props.data?.propertyAmenities.length > 0
                  ? props.data?.propertyAmenities.join(", ")
                  : "None"}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[50px] px-9 text-justify">
        <Typography variant="h3" color="primary" className="mb-[10px]">
          Description
        </Typography>
        <Typography variant="body" color="primary">
          {props.data?.propertyDescription || "None"}
        </Typography>
      </div>
      <div className="mt-[50px] px-9 text-justify">
        <Typography variant="h3" color="primary">
          Showings
        </Typography>
        <div className="flex flex-col gap-1 mt-[25px]">
          <Typography variant="caption" color="secondary">
            Showing Instructions
          </Typography>
          <Typography variant="body" color="primary">
            {props.data?.showingInstuction || "None"}
          </Typography>
        </div>
        <div className="flex flex-col gap-1 mt-[25px]">
          <Typography variant="caption" color="secondary">
            Showing Remarks
          </Typography>
          <Typography variant="body" color="primary">
            {props.data?.showingRemarks || "None"}
          </Typography>
        </div>
      </div>
      <div className="mt-[25px] px-9">
        <div className="grid grid-cols-3 gap-16">
          <div className="col-span-1">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <Typography variant="caption" color="secondary">
                  Lockbox or Keypad
                </Typography>
                <Typography variant="body" color="primary">
                  {props.data?.showingLockboxOrKeypad || "None"}
                </Typography>
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="caption" color="secondary">
                  Occupancy Status
                </Typography>
                <Typography variant="body" color="primary">
                  {props.data?.listingOccupancyStatus || "None"}
                </Typography>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <Typography variant="caption" color="secondary">
                  Access Code
                </Typography>
                <Typography variant="body" color="primary">
                  {props.data?.showingAccessCode || "None"}
                </Typography>
              </div>
              <div className="flex flex-col gap-1">
                <Typography
                  variant="caption"
                  color="secondary"
                  className="whitespace-nowrap"
                >
                  Require Agency Disclosure
                </Typography>
                <Typography variant="body" color="primary">
                  {props.data?.showingRequireAgencyDisclosure || "None"}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[50px] px-9" id="schedule-a-showing-section">
        <div className="flex gap-[15px]">
          {requestedFlag ? (
            <div>
              <div className="grid grid-cols-3 items-center gap-16">
                <div className="col-span-1">
                  <img
                    className="aspect-square rounded-md"
                    src={(props.data?.propertyPhotos && props.data?.propertyPhotos[0] && props.data?.propertyPhotos[0].file) || ListingImagePlaceholder}
                  />
                </div>
                <div className="col-span-2 grid grid-cols-3 items-center gap-[25px]">
                  <div className="col-span-1">
                    <img
                      className="w-[145px] rounded-full"
                      src={(props.data as any)?.owner.agent.avatarURL || AddProfile}
                    />
                  </div>
                  <div className="col-span-2">
                    <Typography variant="h4" color="primary">
                      {(props.data as any)?.owner.agent.firstName + " " + (props.data as any)?.owner.agent.lastName}
                    </Typography>
                    <div className="flex items-center gap-2">
                      <IconWrapper name="telephone" width={13} />
                      <Typography
                        variant="medium-text"
                        color="secondary"
                        className="flex items-center gap-2"
                      >
                        {(props.data as any)?.owner.agent.mobileNumber || "None"}
                      </Typography>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconWrapper name="envelope" width={13} />
                      <Typography
                        variant="medium-text"
                        color="secondary"
                        className="flex items-center gap-2"
                      >
                        {(props.data as any)?.owner.agent.contactEmail || "None"}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[25px]">
                <Typography
                  variant="body"
                  color="primary"
                  className="text-justfiy break-words"
                >
                  You’re request to show{" "}
                  <span className="font-semibold">
                    {props.data?.listingAddress}
                  </span>{" "}
                  at{" "}
                  <span className="font-semibold">
                    {times[selectedTimeIndex]} on {selectedDay}{" "}
                    {format(new Date(date), "MMMM do")}
                  </span>{" "}
                  has been received by{" "}
                  <span className="font-semibold">
                    {(props.data as any)?.owner.agent.firstName + " " + (props.data as any)?.owner.agent.lastName}
                  </span>
                  . You will be notified via email and your RealtyView
                  dashboard when a response is entered.{" "}
                </Typography>
                <Typography
                  variant="body"
                  color="primary"
                  className="mt-[25px] text-justfiy"
                >
                  Please allow some time for a response but always follow up
                  if necessary.
                </Typography>
              </div>
            </div>
          ) : (
            <>
              <Calendar
                onChange={onChangeDate}
                value={date}
                calendarType="US"
                className="border-none h-[200px] w-[350px]"
              />
              <div>
                <Typography
                  variant="h3"
                  color="primary"
                  className="text-center mb-4 pr-5 pt-2"
                >
                  {formatWeekDate(date)}
                </Typography>
                <div className="h-[200px] overflow-x-hidden overflow-y-auto">
                  {times.map((item, index) => {
                    if (index === selectedTimeIndex) {
                      return (
                        <div
                          key={index}
                          className="flex justify-between mb-[10px]"
                        >
                          <Typography
                            variant="medium-text"
                            className="bg-[#D3D3D3] text-[#4C42D7] w-[110px] text-center py-3 rounded-5"
                          >
                            {item}
                          </Typography>
                          <Button onClick={() => createShowing()}>
                            <Typography variant="medium-text">
                              Request Showing
                            </Typography>
                          </Button>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          onClick={() => setSelectedTimeIndex(index)}
                          className="cursor-pointer text-[#4C42D7] rounded w-[250px] text-center border-2 border-[#4C42D7] py-2 mb-2"
                        >
                          <Typography variant="medium-text">
                            {item}
                          </Typography>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <ListingDrawerFooter data={(props.data as any)?.owner?.agent} />
    </div>
  );
}

export default Preview