import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Star from "@/assets/icons/star.png";
import Note from "@/assets/icons/note.png";
import VerticalDots from "@/assets/icons/dot_vertical.png";
import React from "react";
import Typography from "@/components/baseComponents/Typography";
import validation from "@/shared/services/validation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getAddresses,
  fetchAddressAutocomplete,
  getUser,
} from "@/redux/user/userSlice";
import Client from "@/pages/myListings/common/Client";
import ListingDetails from "@/pages/myListings/common/ListingDetails";
import Photos from "@/pages/myListings/common/Photos";
import Showings from "./common/Showings";
import Preview from "./common/Preview";
import {
  CreateMyListingDto,
  IMyListing,
  MyListingShowingAvailability,
  MyListingShowingAvailabilityTime,
  UpdateMyListingDto,
} from "@/shared/interfaces/interfaces";
import {
  createNewMyListing,
  updateMyListing,
} from "@/redux/myListings/myListingSlice";
import { isValid } from "date-fns";
import { fileUpload } from "@/shared/services/utils";
import { toast } from "react-toastify";
import Scrollbars from "react-custom-scrollbars";

let tabs = [
  { name: "Client", step: 1 },
  { name: "Listing Details", step: 2 },
  { name: "Photos", step: 3 },
  { name: "Showings", step: 4 },
  { name: "Preview", step: 5 },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

type IProps = {
  open: boolean;
  data?: any;
  changeState: Function;
  keyword?: string;
  sortType?: string;
  sortField?: string;
  currentTab: string;
  recordsPerPage?: number;
  currentPage?: number;
  setTotalCount?: Function;
  setCurrentPage?: Function;
  closeDrawer: Function;
  setOpenConfirm: Function;
};
const Drawer = (props: IProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const addresses = useAppSelector(getAddresses);

  const [isLoading, setIsLoading] = React.useState(false);

  const initialShowingAvailability: MyListingShowingAvailability = {
    monday: {
      isSelected: false,
      time: [{ timeStart: "", timeEnd: "" }],
    },
    tuesday: {
      isSelected: false,
      time: [{ timeStart: "", timeEnd: "" }],
    },
    wednesday: {
      isSelected: false,
      time: [{ timeStart: "", timeEnd: "" }],
    },
    thursday: {
      isSelected: false,
      time: [{ timeStart: "", timeEnd: "" }],
    },
    friday: {
      isSelected: false,
      time: [{ timeStart: "", timeEnd: "" }],
    },
    saturday: {
      isSelected: false,
      time: [{ timeStart: "", timeEnd: "" }],
    },
    sunday: {
      isSelected: false,
      time: [{ timeStart: "", timeEnd: "" }],
    },
  };

  const initialMyListing: IMyListing = {
    _id: props.data?._id ?? "",
    listingType: props.data?.listingType ?? "Exclusive Right To Sell",
    client: props.data?.client ?? "",

    // Primary Seller Details
    primarySellerFirstName: props.data?.primarySellerFirstName ?? "",
    primarySellerLastName: props.data?.primarySellerLastName ?? "",
    primarySellerCompanyName: props.data?.primarySellerCompanyName ?? "",
    primarySellerPhoneNumber: props.data?.primarySellerPhoneNumber ?? "",
    primarySellerEmailAddress: props.data?.primarySellerEmailAddress ?? "",
    primarySellerCurrentAddress: props.data?.primarySellerCurrentAddress ?? "",
    primarySellerMailingAddress: props.data?.primarySellerMailingAddress ?? "",

    // Secondary Seller Details
    secondarySellerFirstName: props.data?.secondarySellerFirstName ?? "",
    secondarySellerLastName: props.data?.secondarySellerLastName ?? "",
    secondarySellerPhoneNumber: props.data?.secondarySellerPhoneNumber ?? "",
    secondarySellerEmailAddress: props.data?.secondarySellerEmailAddress ?? "",

    // Listing Details
    listingNotes: props.data?.listingNotes ?? "",
    listingAddress: props.data?.listingAddress ?? "",
    listingUnit: props.data?.listingUnit ?? "",
    listingNeigborhood: props.data?.listingNeigborhood ?? "",
    listingMlsNumber: props.data?.listingMlsNumber ?? "",
    listingDateListed: props.data?.listingDateListed
      ? new Date(props.data?.listingDateListed)
      : undefined,
    listingExpirationDate: props.data?.listingExpirationDate
      ? new Date(props.data?.listingExpirationDate)
      : undefined,
    listingSaleType: props.data?.listingSaleType ?? "Standard",
    listingListPrice: props.data?.listingListPrice ?? 0,
    listingAnnualTaxes: props.data?.listingAnnualTaxes ?? 0,
    listingHoaExpenses: props.data?.listingHoaExpenses ?? 0,
    listingOtherMonthlyExpenses: props.data?.listingOtherMonthlyExpenses ?? 0,
    listingOccupancyStatus: props.data?.listingOccupancyStatus ?? "",
    listingLisPendens: props.data?.listingLisPendens ?? "",

    // Property Details
    propertyType: props.data?.propertyType ?? "",
    propertySubType: props.data?.propertySubType ?? "",
    propertyBathrooms: props.data?.propertyBathrooms ?? "",
    propertyBedrooms: props.data?.propertyBedrooms ?? "",
    propertyHomeSqft: props.data?.propertyHomeSqft ?? "",
    propertyLotSqft: props.data?.propertyLotSqft ?? "",
    propertyStories: props.data?.propertyStories ?? "",
    propertyNumberOfUnits: props.data?.propertyNumberOfUnits ?? "",
    propertyParking: props.data?.propertyParking ?? "No",
    propertyCooling: props.data?.propertyCooling ?? "No",
    propertyHeating: props.data?.propertyHeating ?? "No",
    propertyGarage: props.data?.propertyGarage ?? "No",
    propertyViews: props.data?.propertyViews ?? [],
    propertyPool: props.data?.propertyPool ?? "No",
    propertyAttached: props.data?.propertyAttached ?? "No",
    propertyNewConstruction: props.data?.propertyNewConstruction ?? "No",
    propertyAmenities: props.data?.propertyAmenities ?? [],
    propertyKeywords: props.data?.propertyKeywords ?? [],
    propertyDescription: props.data?.propertyDescription ?? "",

    // Property Photos
    propertyPhotos: props.data?.propertyPhotos
      ? [...props.data?.propertyPhotos]
      : [],

    // Showing Instruction
    showingInstuction: props.data?.showingInstuction ?? "",
    showingRemarks: props.data?.showingRemarks ?? "",
    showingLockboxOrKeypad: props.data?.showingLockboxOrKeypad ?? "",
    showingAccessCode: props.data?.showingAccessCode ?? "",
    showingOccupanyStatus: props.data?.showingOccupanyStatus ?? "",
    showingRequireAgencyDisclosure:
      props.data?.showingRequireAgencyDisclosure ?? "",
    showingAvailability: props.data?.showingAvailability
      ? { ...props.data?.showingAvailability }
      : initialShowingAvailability,
  };

  const [values, setValues] = React.useState<any>(initialMyListing);

  // Primary Seller Validation
  const [errorPrimarySellerFirstName, setErrorPrimarySellerFirstName] =
    React.useState<boolean>(false);
  const [errorPrimarySellerLastName, setErrorPrimarySellerLastName] =
    React.useState<boolean>(false);
  const [errorPrimarySellerPhoneNumber, setErrorPrimarySellerPhoneNumber] =
    React.useState<boolean>(false);
  const [errorPrimarySellerEmailAddress, setErrorPrimarySellerEmailAddress] =
    React.useState<boolean>(false);

  // Secondary Seller Validation
  const [errorSecondarySellerPhoneNumber, setErrorSecondarySellerPhoneNumber] =
    React.useState<boolean>(false);
  const [
    errorSecondarySellerEmailAddress,
    setErrorSecondarySellerEmailAddress,
  ] = React.useState<boolean>(false);

  // Listing Details Validation
  const [errorListingDateListed, setErrorListingDateListed] =
    React.useState<boolean>(false);
  const [errorListingExpirationDate, setErrorListingExpirationDate] =
    React.useState<boolean>(false);
  const [errorListingType, setErrorListingType] =
    React.useState<boolean>(false);
  const [errorListingSaleType, setErrorListingSaleType] =
    React.useState<boolean>(false);
  const [errorListingListPrice, setErrorListingListPrice] =
    React.useState<boolean>(false);

  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const [isPublished, setIsPublished] = React.useState<boolean>(false);

  const handleInputChange = (e: any, type: string = "") => {
    const { name, value } = e.target;
    let tempValue = value;

    if (name.includes("Name") && name !== "primarySellerCompanyName") {
      tempValue = value.replace(/[^a-z -]/gi, "");
    }

    if (type === "number") {
      tempValue = value.replace(/,/g, "");
    }

    setValues({
      ...values,
      [name]: tempValue,
    });

    if (
      name === "primarySellerPhoneNumber" ||
      name === "secondarySellerPhoneNumber"
    ) {
      const formattedPhoneNumber = validation.phoneNumberAutoFormat(value);

      if (
        name === "primarySellerPhoneNumber" &&
        formattedPhoneNumber.length > 0 &&
        formattedPhoneNumber.length < 12
      )
        setErrorPrimarySellerPhoneNumber(true);
      else setErrorPrimarySellerPhoneNumber(false);

      if (
        name === "secondarySellerPhoneNumber" &&
        formattedPhoneNumber.length > 0 &&
        formattedPhoneNumber.length < 12
      )
        setErrorSecondarySellerPhoneNumber(true);
      else setErrorSecondarySellerPhoneNumber(false);

      setValues({
        ...values,
        [name]: formattedPhoneNumber,
      });
    }

    switch (name) {
      case "primarySellerFirstName":
        setErrorPrimarySellerFirstName(validation.IsEmptyString(value));
        break;
      case "primarySellerLastName":
        setErrorPrimarySellerLastName(validation.IsEmptyString(value));
        break;
      case "primarySellerEmailAddress":
        setErrorPrimarySellerEmailAddress(
          validation.IsInvalidEmail(value) && value.length > 0
        );
        break;
      case "secondarySellerEmailAddress":
        setErrorSecondarySellerEmailAddress(
          validation.IsInvalidEmail(value) && value.length > 0
        );
        break;
      case "listingType":
        setErrorListingType(validation.IsEmptyString(value));
        break;
      case "listingSaleType":
        setErrorListingSaleType(validation.IsEmptyString(value));
        break;
      case "listingListPrice":
        setErrorListingListPrice(validation.IsEmptyString(value));
        break;
    }
  };

  const handleSelectChange = (
    value: any,
    name: string,
    isMulti: boolean = false
  ) => {
    let tempValue = value.value;
    if (isMulti) {
      tempValue = value.map((item: any) => {
        return item.value;
      });
    } else if (name === "client") {
      tempValue = value.value._id ?? "";
    }

    if (name === "client") {
      setValues({
        ...values,
        [name]: tempValue,
        primarySellerFirstName: value.value.firstName ?? "",
        primarySellerLastName: value.value.lastName ?? "",
        primarySellerCompanyName: value.value.companyName ?? "",
        primarySellerPhoneNumber: value.value.phoneNumber ?? "",
        primarySellerEmailAddress: value.value.email ?? "",
        primarySellerCurrentAddress: value.value.address ?? "",
        primarySellerMailingAddress: value.value.emailAddress ?? "",
        secondarySellerFirstName: value.value.secondaryFirstName ?? "",
        secondarySellerLastName: value.value.secondaryLastName ?? "",
        secondarySellerEmailAddress: value.value.secondaryEmailAddress ?? "",
        secondarySellerPhoneNumber: value.value.secondaryPhoneNumber ?? "",
      });
    } else {
      setValues({
        ...values,
        [name]: tempValue,
      });
    }

    switch (name) {
      case "listingType":
        setErrorListingType(validation.IsEmptyString(value.value));
        break;
      case "listingSaleType":
        setErrorListingSaleType(validation.IsEmptyString(value.value));
        break;
    }
  };

  const handleDateChange = (value: any, name: string) => {
    setValues({
      ...values,
      [name]: value,
    });

    switch (name) {
      case "listingDateListed":
        setErrorListingDateListed(!isValid(value));
        break;
      case "listingExpirationDate":
        setErrorListingExpirationDate(!isValid(value));
        break;
    }
  };

  const onAddPhoto = (event: any, isDropped: boolean = false) => {
    let files = [];

    if (isDropped) {
      event.preventDefault();
      files = Array.from(event.dataTransfer.files);
    } else {
      files = Array.from(event.target.files);
    }

    files.map((file: any, index) => {
      setValues((prev: any) => {
        return {
          ...prev,
          propertyPhotos: [
            ...prev.propertyPhotos,
            {
              file: file,
              caption: "",
              order: values.propertyPhotos.length + index + 1,
              isFile: true,
            },
          ],
        };
      });
    });
  };

  const onRemovePhoto = (toBeRemovedPhotoIndex: number) => {
    let tempPhotos = [...values.propertyPhotos];
    let leadingPhotos = tempPhotos.filter(
      (m) => m.order > tempPhotos[toBeRemovedPhotoIndex].order
    );

    leadingPhotos.map((m) => {
      m.order = m.order - 1;
    });

    tempPhotos.splice(toBeRemovedPhotoIndex, 1);
    setValues({
      ...values,
      propertyPhotos: tempPhotos,
    });
  };

  const onChangePhotoOrder = (isGoingRight: boolean, currentOrder: number) => {
    let tempPhotos = [...values.propertyPhotos];
    let newOrder = isGoingRight ? currentOrder + 1 : currentOrder - 1;

    if (newOrder > 0 && newOrder <= tempPhotos.length) {
      let photoToMoveIndex = tempPhotos.findIndex(
        (m) => m.order === currentOrder
      );
      let photoToSwitchIndex = tempPhotos.findIndex(
        (m) => m.order === newOrder
      );

      tempPhotos[photoToMoveIndex] = {
        ...tempPhotos[photoToMoveIndex],
        order: newOrder,
      };
      tempPhotos[photoToSwitchIndex] = {
        ...tempPhotos[photoToSwitchIndex],
        order: currentOrder,
      };

      setValues({
        ...values,
        propertyPhotos: tempPhotos.sort((a, b) => a.order - b.order),
      });
    }
  };

  const onAddAvailability = (day: string) => {
    let newAvailability: MyListingShowingAvailabilityTime = {
      timeStart: "",
      timeEnd: "",
    };

    setValues({
      ...values,
      showingAvailability: {
        ...values.showingAvailability,
        [day]: {
          time: [...values.showingAvailability[day].time, newAvailability],
        },
      },
    });
  };

  const onRemoveAvailability = (day: string, timeIndex: number) => {
    var tempShowingAvailabilityDay = { ...values.showingAvailability[day] };

    tempShowingAvailabilityDay.time.splice(timeIndex, 1);

    setValues({
      ...values,
      showingAvailability: {
        ...values.showingAvailability,
        [day]: tempShowingAvailabilityDay,
      },
    });
  };

  const handleSelectAvailability = (event: any, day: string) => {
    const isChecked = event.target.checked;
    var tempShowingAvailabilityDay = { ...values.showingAvailability[day] };

    tempShowingAvailabilityDay.isSelected = isChecked;

    setValues({
      ...values,
      showingAvailability: {
        ...values.showingAvailability,
        [day]: tempShowingAvailabilityDay,
      },
    });
  };

  const handleChangeAvailabilityTime = (
    event: any,
    day: string,
    timeIndex: number
  ) => {
    const { name, value } = event.target;
    var tempShowingAvailabilityDay = { ...values.showingAvailability[day] };

    tempShowingAvailabilityDay.time[timeIndex] = {
      [name]: value,
    };

    setValues({
      ...values,
      showingAvailability: {
        ...values.showingAvailability,
        [day]: tempShowingAvailabilityDay,
      },
    });
  };

  const nextStep = () => {
    if (currentStep === 1) {
      setErrorPrimarySellerFirstName(
        validation.IsEmptyString(values.primarySellerFirstName)
      );
      setErrorPrimarySellerLastName(
        validation.IsEmptyString(values.primarySellerLastName)
      );

      if (
        errorPrimarySellerPhoneNumber ||
        errorPrimarySellerEmailAddress ||
        errorSecondarySellerPhoneNumber ||
        errorSecondarySellerEmailAddress
      )
        return;

      if (
        !validation.IsEmptyString(values.primarySellerFirstName) &&
        !validation.IsEmptyString(values.primarySellerLastName)
      ) {
        setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === 2) {
      setErrorListingDateListed(!isValid(values.listingDateListed));
      setErrorListingExpirationDate(!isValid(values.listingExpirationDate));
      setErrorListingType(validation.IsEmptyString(values.listingType));
      setErrorListingSaleType(validation.IsEmptyString(values.listingSaleType));
      setErrorListingListPrice(
        validation.IsEmptyString(
          values.listingListPrice ? values.listingListPrice.toString() : ""
        )
      );

      if (
        isValid(values.listingDateListed) &&
        isValid(values.listingExpirationDate) &&
        !validation.IsEmptyString(values.listingType) &&
        !validation.IsEmptyString(values.listingSaleType) &&
        !validation.IsEmptyString(
          values.listingListPrice ? values.listingListPrice.toString() : ""
        )
      ) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  // const onChangeTab = (step: number) => {
  //     if (currentStep === 1) {
  //         setErrorPrimarySellerFirstName(validation.IsEmptyString(values.primarySellerFirstName))
  //         setErrorPrimarySellerLastName(validation.IsEmptyString(values.primarySellerLastName))

  //         if (errorPrimarySellerPhoneNumber || errorPrimarySellerEmailAddress || errorSecondarySellerPhoneNumber || errorSecondarySellerEmailAddress) return

  //         if (!validation.IsEmptyString(values.primarySellerFirstName) && !validation.IsEmptyString(values.primarySellerLastName)) {
  //             setCurrentStep(step);
  //         }
  //     } else if (currentStep === 2) {
  //         setErrorListingDateListed(!isValid(values.listingDateListed))
  //         setErrorListingExpirationDate(!isValid(values.listingExpirationDate))
  //         setErrorListingType(validation.IsEmptyString(values.listingType))
  //         setErrorListingSaleType(validation.IsEmptyString(values.listingSaleType))
  //         setErrorListingListPrice(validation.IsEmptyString(values.listingListPrice ? values.listingListPrice.toString():''))

  //         if (
  //             isValid(values.listingDateListed) &&
  //             isValid(values.listingExpirationDate) &&
  //             !validation.IsEmptyString(values.listingType) &&
  //             !validation.IsEmptyString(values.listingSaleType) &&
  //             !validation.IsEmptyString(values.listingListPrice ? values.listingListPrice.toString():'')
  //         ) {
  //             setCurrentStep(currentStep + 1);
  //         }
  //     } else {
  //         setCurrentStep(step);
  //     }
  // }

  const backStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const submitNewListing = async () => {
    setErrorPrimarySellerFirstName(
      validation.IsEmptyString(values.primarySellerFirstName)
    );
    setErrorPrimarySellerLastName(
      validation.IsEmptyString(values.primarySellerLastName)
    );
    setErrorListingDateListed(!isValid(values.listingDateListed));
    setErrorListingExpirationDate(!isValid(values.listingExpirationDate));
    setErrorListingType(validation.IsEmptyString(values.listingType));
    setErrorListingSaleType(validation.IsEmptyString(values.listingSaleType));
    setErrorListingListPrice(
      validation.IsEmptyString(
        values.listingListPrice ? values.listingListPrice.toString() : ""
      )
    );

    if (
      !validation.IsEmptyString(values.primarySellerFirstName) &&
      !validation.IsEmptyString(values.primarySellerLastName) &&
      isValid(values.listingDateListed) &&
      isValid(values.listingExpirationDate) &&
      !validation.IsEmptyString(values.listingType) &&
      !validation.IsEmptyString(values.listingSaleType) &&
      !validation.IsEmptyString(
        values.listingListPrice ? values.listingListPrice.toString() : ""
      )
    ) {
      setIsLoading(true);
      props.closeDrawer();

      let photos: Array<any> = [];
      let loadingToast = toast.loading("Preparing to upload photos.");
      const totalProgress = values.propertyPhotos.length + 2;

      for (var i = 0; i < values.propertyPhotos.length; i++) {
        if (!values.propertyPhotos[i].isFile) {
          photos.push({ ...values.propertyPhotos[i] });
        } else {
          try {
            toast.update(loadingToast, {
              render:
                "Uploading photo " +
                (i + 1) +
                "/" +
                values.propertyPhotos.length,
              progress: (i + 1) / totalProgress,
            });
            const location = await fileUpload(
              values.propertyPhotos[i].file,
              "image"
            );
            if (location)
              photos.push({
                ...values.propertyPhotos[i],
                file: location,
                isFile: false,
              });
          } catch (error) {
            setIsLoading(false);
            toast.update(loadingToast, {
              render:
                "Error uploading file: " +
                (i + 1) +
                "/" +
                values.propertyPhotos.length,
              type: "error",
              isLoading: isLoading,
              autoClose: 3000,
            });
            console.error("Error uploading file:", error);
          }
        }
      }

      toast.update(loadingToast, {
        render: "Finalizing your listing.",
        progress: (photos.length + 1) / totalProgress,
      });

      let submitValues: IMyListing = { ...values };
      submitValues.propertyPhotos = photos;

      if (props.data && props.data._id) {
        let updateData: UpdateMyListingDto = {
          data: submitValues,
          listingId: props.data._id,
          userId: user._id,
          search: {
            userId: user._id,
            keyword: props.keyword || "",
            sortType: props.sortType || "",
            sortField: props.sortField || "",
            recordsPerPage: props.recordsPerPage || 10,
            currentPage: props.currentPage || 1,
            status: props.currentTab,
          },
        };
        dispatch(updateMyListing(updateData)).then((res) => {
          setIsLoading(false);

          try {
            props.setTotalCount && props.setTotalCount(res.payload.totalPages);
            toast.update(loadingToast, {
              render: res.payload.message,
              type: "success",
              progress: 0,
              isLoading: isLoading,
              autoClose: 3000,
            });
            setIsPublished(true);
            props.closeDrawer();
          } catch (e) {
            toast.update(loadingToast, {
              render:
                "There was an error updating your listing. Please try again.",
              type: "error",
              isLoading: isLoading,
              autoClose: 3000,
            });
          }
        });
      } else {
        let data: CreateMyListingDto = {
          email: user.email,
          data: submitValues,
          userId: user._id,
          search: {
            userId: user._id,
            keyword: props.keyword || "",
            sortType: props.sortType || "",
            sortField: props.sortField || "",
            recordsPerPage: props.recordsPerPage || 10,
            currentPage: 1,
            status: props.currentTab,
          },
        };

        props.setCurrentPage && props.setCurrentPage(1);

        dispatch(createNewMyListing(data)).then((res) => {
          setIsLoading(false);

          try {
            if (res.payload.success) {
              toast.update(loadingToast, {
                render: res.payload.message,
                type: "success",
                progress: 0,
                isLoading: isLoading,
                autoClose: 3000,
              });

              setIsPublished(true);
              setValues(initialMyListing);
              setErrorPrimarySellerFirstName(false);
              setErrorPrimarySellerLastName(false);
              props.setTotalCount &&
                props.setTotalCount(res.payload.totalCount);
            }
          } catch (e) {
            toast.update(loadingToast, {
              render:
                "There was an error creating your listing. Please try again.",
              type: "error",
              isLoading: isLoading,
              autoClose: 3000,
            });
          }
        });
      }
    }
  };

  const onChangeAddressAutoComplete = (value: any, name: string) => {
    setValues({
      ...values,
      //addrezss: value
      [name]: value,
    });
    dispatch(fetchAddressAutocomplete({ address: value }));
  };

  const onSelectAddressAutoComplete = (value: any, name: string) => {
    if (name === "listingAddress") {
      setValues({
        ...values,
        [name]:
          value.streetLine +
          " " +
          value.city +
          ", " +
          value.state +
          " " +
          value.zipcode +
          " " +
          value.secondary,
        listingUnit: value.secondary,
      });
    } else {
      setValues({
        ...values,
        [name]:
          value.streetLine +
          " " +
          value.city +
          ", " +
          value.state +
          " " +
          value.zipcode +
          " " +
          value.secondary,
      });
    }
  };

  React.useEffect(() => {
    setValues(initialMyListing);
    setErrorPrimarySellerFirstName(false);
    setErrorPrimarySellerLastName(false);
    setCurrentStep(1);
    setIsPublished(false);
  }, [props.open]);

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-30"
        onClose={() =>
          !isLoading && props.setOpenConfirm({ action: "discard", state: true })
        }
      >
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-[600px]">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    <div className="fixed w-full bg-white z-30 pt-5">
                      <div className="px-4 sm:px-6  w-full bg-white">
                        <div className="flex items-start justify-between gap-12">
                          <Dialog.Title className="text-[25px] font-medium truncate">
                            {currentStep &&
                            currentStep === 5 &&
                            values?.listingAddress
                              ? values?.listingAddress
                              : props.data?._id
                              ? "Edit a Listing"
                              : "Add a New Listing"}
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center gap-3">
                            {!isPublished && currentStep && currentStep > 1 && (
                              <button
                                disabled={isLoading}
                                type="button"
                                className="relative rounded-md bg-white text-gray-400 hover:text-[#6DA172] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={() => backStep()}
                              >
                                <Typography
                                  variant="medium-text"
                                  color="secondary"
                                >
                                  Back
                                </Typography>
                              </button>
                            )}
                            {currentStep && currentStep < 5 ? (
                              <button
                                type="button"
                                className="relative rounded-md bg-white text-gray-400 hover:text-[#6DA172] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={() => nextStep()}
                              >
                                <Typography
                                  variant="medium-text"
                                  color="secondary"
                                >
                                  Next Step
                                </Typography>
                              </button>
                            ) : isPublished ? (
                              <>
                                <button
                                  type="button"
                                  className="relative rounded-md bg-white text-gray-400 hover:text-[#6DA172] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 px-1"
                                >
                                  <img src={Star} alt="Star" width={17} />
                                </button>
                                <button
                                  type="button"
                                  className="relative rounded-md bg-white text-gray-400 hover:text-[#6DA172] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 px-1"
                                >
                                  <img src={Note} alt="Note" width={15} />
                                </button>
                                <button
                                  type="button"
                                  className="relative rounded-md bg-white text-gray-400 hover:text-[#6DA172] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 px-1"
                                >
                                  <img
                                    src={VerticalDots}
                                    alt="Vertical Dots"
                                    width={3.5}
                                  />
                                </button>
                              </>
                            ) : (
                              <button
                                disabled={isLoading}
                                type="button"
                                className="relative rounded-md bg-white text-gray-400 hover:text-[#6DA172] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={() => submitNewListing()}
                              >
                                <Typography
                                  variant="medium-text"
                                  className="text-[#6DA172] whitespace-nowrap"
                                >
                                  Publish Listing
                                </Typography>
                              </button>
                            )}
                            <button
                              disabled={isLoading}
                              type="button"
                              className="relative rounded-md bg-white text-gray-400 hover:text-[#C84156] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() =>
                                props.setOpenConfirm({
                                  action: "discard",
                                  state: true,
                                })
                              }
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-t mt-16"></div>
                    <Scrollbars autoHide className="h-full">
                      {currentStep && currentStep < 5 && (
                        <div className="px-8 mt-2">
                          <div className="block">
                            <div className="border-b border-gray-200 md:flex">
                              <nav
                                className="-mb-px flex justify-between w-full"
                                aria-label="Tabs"
                              >
                                <div className="flex items-end gap-8">
                                  {tabs.map((tab) => (
                                    <div
                                      key={tab.step}
                                      className={classNames(
                                        tab.step === currentStep
                                          ? "border-indigo-500 text-indigo-600"
                                          : "border-transparent text-gray-500",
                                        "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium cursor-pointer"
                                      )}
                                      aria-current={
                                        tab.step === currentStep
                                          ? "page"
                                          : undefined
                                      }
                                      onClick={() => setCurrentStep(tab.step)}
                                    >
                                      <Typography variant="h4">
                                        {tab.name}
                                      </Typography>
                                    </div>
                                  ))}
                                </div>
                              </nav>
                            </div>
                          </div>
                        </div>
                      )}
                      {currentStep && currentStep === 1 && (
                        <Client
                          data={values}
                          handleInputChange={handleInputChange}
                          handleSelectChange={handleSelectChange}
                          handleDateChange={handleDateChange}
                          errorPrimarySellerFirstName={
                            errorPrimarySellerFirstName
                          }
                          errorPrimarySellerLastName={
                            errorPrimarySellerLastName
                          }
                          errorPrimarySellerPhoneNumber={
                            errorPrimarySellerPhoneNumber
                          }
                          errorPrimarySellerEmailAddress={
                            errorPrimarySellerEmailAddress
                          }
                          errorSecondarySellerPhoneNumber={
                            errorSecondarySellerPhoneNumber
                          }
                          errorSecondarySellerEmailAddress={
                            errorSecondarySellerEmailAddress
                          }
                          addresses={addresses}
                          onChangeAddressAutoComplete={
                            onChangeAddressAutoComplete
                          }
                          onSelectAddressAutoComplete={
                            onSelectAddressAutoComplete
                          }
                        />
                      )}
                      {currentStep && currentStep === 2 && (
                        <ListingDetails
                          data={values}
                          addresses={addresses}
                          errorListingDateListed={errorListingDateListed}
                          errorListingExpirationDate={
                            errorListingExpirationDate
                          }
                          errorListingType={errorListingType}
                          errorListingSaleType={errorListingSaleType}
                          errorListingListPrice={errorListingListPrice}
                          handleInputChange={handleInputChange}
                          handleSelectChange={handleSelectChange}
                          handleDateChange={handleDateChange}
                          onChangeAddressAutoComplete={
                            onChangeAddressAutoComplete
                          }
                          onSelectAddressAutoComplete={
                            onSelectAddressAutoComplete
                          }
                        />
                      )}
                      {currentStep && currentStep === 3 && (
                        <Photos
                          data={values}
                          onAddPhoto={onAddPhoto}
                          onRemovePhoto={onRemovePhoto}
                          onChangePhotoOrder={onChangePhotoOrder}
                        />
                      )}
                      {currentStep && currentStep === 4 && (
                        <Showings
                          data={values}
                          handleInputChange={handleInputChange}
                          handleSelectChange={handleSelectChange}
                          onAddAvailability={onAddAvailability}
                          onRemoveAvailability={onRemoveAvailability}
                          handleSelectAvailability={handleSelectAvailability}
                          handleChangeAvailabilityTime={
                            handleChangeAvailabilityTime
                          }
                        />
                      )}
                      {currentStep && currentStep === 5 && (
                        <Preview
                          data={values}
                          isPublished={isPublished}
                          onSetCurrentStep={setCurrentStep}
                        />
                      )}
                    </Scrollbars>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Drawer;
