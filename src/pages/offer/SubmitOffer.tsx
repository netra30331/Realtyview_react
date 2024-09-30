import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  CreateOfferDto,
  ILead,
  IMyListing,
  IOffer,
  UpdateOfferDto,
} from "@/shared/interfaces/interfaces";
import Typography from "@/components/baseComponents/Typography";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ViewDocumentModal from "./ViewDocumentModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getListingsByAddressOrMLSNumber,
  getListingsForOffer,
} from "@/redux/myListings/myListingSlice";
import {
  getAddresses,
  fetchAddressAutocomplete,
  getUser,
} from "@/redux/user/userSlice";
// import { getClients } from '@/redux/lead/leadSlice'
import Scrollbars from "react-custom-scrollbars";
import Listing from "./submitOfferSubComponents/Listing";
import Buyers from "./submitOfferSubComponents/Buyers";
import Financing from "./submitOfferSubComponents/Financing";
import Terms from "./submitOfferSubComponents/Terms";
import Docs from "./submitOfferSubComponents/Docs";
import Legal from "./submitOfferSubComponents/Legal";
import Review from "./submitOfferSubComponents/Review";
import validation from "@/shared/services/validation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { createNewOffer, updateOffer } from "@/redux/offer/offerSlice";
//import { notify } from "@/shared/services/notify";
import { fileUpload } from "@/shared/services/utils";
import { toast } from "react-toastify";

type IProps = {
  open: boolean;
  changeState: Function;
  data?: any;
  search_list_flag?: boolean;
  houseData?: any;
  keyword?: string;
  sortType?: string;
  sortField?: string;
  recordsPerPage?: number;
  currentPage?: number;
  currentTab?: string;
  setTotalCount?: Function;
  setCurrentPage?: Function;
};

const selectOptions = [
  { value: "Contact", label: "Contact" },
  { value: "Option2", label: "Option 2" },
  { value: "Option3", label: "Option 3" },
];

const tabs = [
  { name: "Listing" },
  { name: "Buyers" },
  { name: "Financing" },
  { name: "Terms" },
  { name: "Legal/Title" },
  { name: "Docs" },
  { name: "Review" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const SubmitOffer = (props: IProps) => {
  const dispatch = useAppDispatch();
  const listingsForOffer = useAppSelector(getListingsForOffer);
  const user = useAppSelector(getUser);
  const initialOffer: IOffer = {
    status: props.data?.status ?? "Received",
    listing: props.data?.listing?._id ?? "",
    client: props.data?.client?._id ?? "",

    primaryBuyerFirstName: props.data?.client?.firstName ?? "",
    primaryBuyerLastName: props.data?.client?.lastName ?? "",
    primaryBuyerCompanyName: props.data?.client?.companyName ?? "",
    primaryBuyerPhoneNumber: props.data?.client?.phoneNumber ?? "",
    primaryBuyerEmailAddress: props.data?.client?.email ?? "",
    primaryBuyerCurrentAddress: props.data?.client?.address ?? "",
    primaryBuyerMailingAddress: props.data?.client?.emailAddress ?? "",
    secondaryBuyerFirstName: props.data?.client?.secondaryFirstName ?? "",
    secondaryBuyerLastName: props.data?.client?.secondaryLastName ?? "",
    secondaryBuyerPhoneNumber: props.data?.client?.secondaryPhoneNumber ?? "",
    secondaryBuyerEmailAddress: props.data?.client?.secondaryEmailAddress ?? "",

    offerAmount: props.data?.offerAmount ?? "",
    earnestMoneyDeposit: props.data?.earnestMoneyDeposit ?? "",
    downPayment: props.data?.downPayment ?? "",
    subjectToMortgage: props.data?.subjectToMortgage ?? "",
    sellerConcession: props.data?.sellerConcession ?? "",
    cashOnClosing: props.data?.cashOnClosing ?? "",
    proposedClosingLocation: props.data?.proposedClosingLocation ?? "",
    proposedClosingDate: props.data?.proposedClosingDate ?? "",
    personalPropertyInclusions: props.data?.personalPropertyInclusions ?? "",
    personalPropertyExclusions: props.data?.personalPropertyExclusions ?? "",
    noteToListingAgent: props.data?.noteToListingAgent ?? "",

    mortgageHeldBy: props.data?.mortgageHeldBy ?? "",
    mortgageType: props.data?.mortgageType ?? "",
    mortgagePeriod: props.data?.mortgagePeriod ?? "",
    paymentDate: props.data?.paymentDate ?? "",
    interestRate: props.data?.interestRate ?? "",
    monthlyPayment: props.data?.monthlyPayment ?? "",
    mortgageProposedClosingDate: props.data?.mortgageProposedClosingDate ?? "",
    mortgageProposedFormalContactDate:
      props.data?.mortgageProposedFormalContactDate ?? "",
    mortgageDays: props.data?.mortgageDays ?? "",

    loanFirstName: props.data?.loanFirstName ?? "",
    loanLastName: props.data?.loanLastName ?? "",
    loanPhoneNumber: props.data?.loanPhoneNumber ?? "",
    loanEmailAddress: props.data?.loanEmailAddress ?? "",
    loanCompany: props.data?.loanCompany ?? "",
    loanCompanyAddress: props.data?.loanCompanyAddress ?? "",

    buyeraAttorneyFirstName: props.data?.buyeraAttorneyFirstName ?? "",
    buyerAttorneyLastName: props.data?.buyerAttorneyLastName ?? "",
    buyerAttorneyPhoneNumber: props.data?.buyerAttorneyPhoneNumber ?? "",
    buyerAttorneyEmailAddress: props.data?.buyerAttorneyEmailAddress ?? "",
    buyerAttorneyCompany: props.data?.buyerAttorneyCompany ?? "",
    buyerAttorneyAddress: props.data?.buyerAttorneyAddress ?? "",

    sellerAttorneyFirstName: props.data?.sellerAttorneyFirstName ?? "",
    sellerAttorneyLastName: props.data?.sellerAttorneyLastName ?? "",
    sellerAttorneyPhoneNumber: props.data?.sellerAttorneyPhoneNumber ?? "",
    sellerAttorneyEmailAddress: props.data?.sellerAttorneyEmailAddress ?? "",
    sellerAttorneyCompany: props.data?.sellerAttorneyCompany ?? "",
    sellerAttorneyAddress: props.data?.sellerAttorneyAddress ?? "",
    documents: props.data?.documents ?? [
      { docType: "", rename: "", file: null, uploadAt: null, isFile: false },
    ],
  };
  const [values, setValues] = React.useState<IOffer>(initialOffer);
  const [currentTab, setCurrentTab] = React.useState<string>("Listing");
  const [isLoading, setIsLoading] = React.useState(false);
  // const [openPreview, setOpenPreview] = React.useState<boolean>(false)
  const [fromPreviewFlag, setFromPreviewFlag] = React.useState<boolean>(false);
  const [existRelationFlag, setExistRelationFlag] =
    React.useState<boolean>(false);
  const [openDocModal, setOpenDocModal] = React.useState<boolean>(false);
  const [addressKeyword, setAddressKeyword] = React.useState<string>("");
  const [selectedlisting, setSelectedListng] = React.useState<IMyListing>(
    props.data?.listing
  );
  const [selectedIndex, setSelectedIndex] = React.useState<any>(null);
  const [selectedBuyer, setSelectedBuyer] = React.useState<string>("");

  const [errorPrimaryBuyerFirstName, setErrorPrimaryBuyerFirstName] =
    React.useState<boolean>(false);
  const [errorPrimaryBuyerLastName, setErrorPrimaryBuyerLastName] =
    React.useState<boolean>(false);
  const [errorPrimaryBuyerPhoneNumber, setErrorPrimaryBuyerPhoneNumber] =
    React.useState<boolean>(false);
  const [errorPrimaryBuyerEmailAddress, setErrorPrimaryBuyerEmailAddress] =
    React.useState<boolean>(false);
  const [errorSecondaryBuyerPhoneNumber, setErrorSecondaryBuyerPhoneNumber] =
    React.useState<boolean>(false);
  const [errorSecondaryBuyerEmailAddress, setErrorSecondaryBuyerEmailAddress] =
    React.useState<boolean>(false);
  const [errorLoanEmailAddress, setErrorLoanEmailAddress] =
    React.useState<boolean>(false);
  const [errorLoanPhoneNumber, setErrorLoanPhoneNumber] =
    React.useState<boolean>(false);

  const [errorBuyerAttorneyPhoneNumber, setErrorBuyerAttorneyPhoneNumber] =
    React.useState<boolean>(false);
  const [errorBuyerAttorneyEmailAddress, setErrorBuyerAttorneyEmailAddress] =
    React.useState<boolean>(false);
  const [errorSellerAttorneyPhoneNumber, setErrorSellerAttorneyPhoneNumber] =
    React.useState<boolean>(false);
  const [errorSellerAttorneyEmailAddress, setErrorSellerAttorneyEmailAddress] =
    React.useState<boolean>(false);

  const addresses = useAppSelector(getAddresses);

  React.useEffect(() => {
    if (fromPreviewFlag === false) {
      setValues(initialOffer);
    }
    setTimeout(() => {
      const main_body = document.getElementById("submit_offer_drawer");
      if (main_body) {
        main_body.scrollTop = 0;
      }
    }, 500);
    if (props.houseData && props.search_list_flag !== true) {
      setSelectedListng(props.houseData);
    }
    if (props.open) {
      setSelectedListng(props.data?.listing);
      setSelectedBuyer(props.data?.client?._id ?? "");
      setExistRelationFlag(props.data?.client?._id ? true : false);
    }
  }, [props.open]);

  const closeViewDocModal = () => {
    setOpenDocModal(false);
    setFromPreviewFlag(true);
    props.changeState(true);
  };

  const changeDocType = (value: any, index: any) => {
    const temp = JSON.parse(JSON.stringify(values));
    const documents = JSON.parse(JSON.stringify(temp.documents));
    documents[index].docType = value.value;
    for (let i = 0; i < documents.length; i++) {
      documents[i].file = values.documents[i].file;
    }
    temp.documents = documents;
    setValues(temp);
  };

  const changeRenameFile = (e: any, index: any) => {
    const temp = JSON.parse(JSON.stringify(values));
    const documents = JSON.parse(JSON.stringify(values.documents));
    documents[index].rename = e.target.value;
    for (let i = 0; i < documents.length; i++) {
      documents[i].file = values.documents[i].file;
    }
    temp.documents = documents;
    setValues(temp);
  };

  const handleFileChange = (e: any, index: any) => {
    const temp = JSON.parse(JSON.stringify(values));
    const documents = JSON.parse(JSON.stringify(temp.documents));
    for (let i = 0; i < documents.length; i++) {
      documents[i].file = values.documents[i].file;
    }
    documents[index].file = e.target.files[0] ? e.target.files[0] : null;
    documents[index].isFile = true;
    documents[index].uploadAt = new Date();
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      documents[index].view_pdf_data = result;
      temp.documents = documents;
      setValues(temp);
    };
    reader.readAsDataURL(documents[index].file);
  };

  const addDocsLine = () => {
    const temp = JSON.parse(JSON.stringify(values));
    const documents = JSON.parse(JSON.stringify(temp.documents));
    for (let i = 0; i < documents.length; i++) {
      documents[i].file = values.documents[i].file;
    }
    documents.push({ docType: "", rename: "", file: null, uploadAt: null });
    temp.documents = documents;
    setValues(temp);
  };

  const deleteDocLine = (index: any) => {
    const temp = JSON.parse(JSON.stringify(values));
    const documents = JSON.parse(JSON.stringify(temp.documents));
    for (let i = 0; i < documents.length; i++) {
      documents[i].file = values.documents[i].file;
    }
    documents.splice(index, 1);
    temp.documents = documents;
    setValues(temp);
  };

  const onChangeAddressAutoComplete = (value: any, name: string) => {
    setValues({
      ...values,
      [name]: value,
    });
    dispatch(fetchAddressAutocomplete({ address: value }));
  };

  const onSelectAddressAutoComplete = (value: any, name: string) => {
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
  };

  const handleTextChange = (e: any, name: any, type: string = "") => {
    let tempValue = e.target.value;
    if (type === "number") {
      tempValue = tempValue.replace(/,/g, "");
    }

    if (
      name === "primaryBuyerPhoneNumber" ||
      name === "secondaryBuyerPhoneNumber" ||
      name === "loanPhoneNumber" ||
      name === "buyerAttorneyPhoneNumber" ||
      name === "sellerAttorneyPhoneNumber"
    ) {
      const formattedPhoneNumber = validation.phoneNumberAutoFormat(
        e.target.value
      );
      if (
        name === "primaryBuyerPhoneNumber" &&
        formattedPhoneNumber.length > 0 &&
        formattedPhoneNumber.length < 12
      ) {
        setErrorPrimaryBuyerPhoneNumber(true);
      } else {
        setErrorPrimaryBuyerPhoneNumber(false);
      }

      if (
        name === "secondaryBuyerPhoneNumber" &&
        formattedPhoneNumber.length > 0 &&
        formattedPhoneNumber.length < 12
      ) {
        setErrorSecondaryBuyerPhoneNumber(true);
      } else {
        setErrorSecondaryBuyerPhoneNumber(false);
      }

      if (
        name === "loanPhoneNumber" &&
        formattedPhoneNumber.length > 0 &&
        formattedPhoneNumber.length < 12
      ) {
        setErrorLoanPhoneNumber(true);
      } else {
        setErrorLoanPhoneNumber(false);
      }

      if (
        name === "buyerAttorneyPhoneNumber" &&
        formattedPhoneNumber.length > 0 &&
        formattedPhoneNumber.length < 12
      ) {
        setErrorBuyerAttorneyPhoneNumber(true);
      } else {
        setErrorBuyerAttorneyPhoneNumber(false);
      }

      if (
        name === "sellerAttorneyPhoneNumber" &&
        formattedPhoneNumber.length > 0 &&
        formattedPhoneNumber.length < 12
      ) {
        setErrorSellerAttorneyPhoneNumber(true);
      } else {
        setErrorSellerAttorneyPhoneNumber(false);
      }

      tempValue = formattedPhoneNumber;
    }

    setValues({
      ...values,
      [name]: tempValue,
    });
    switch (name) {
      case "primaryBuyerFirstName":
        setErrorPrimaryBuyerFirstName(validation.IsEmptyString(tempValue));
        break;
      case "primaryBuyerLastName":
        setErrorPrimaryBuyerLastName(validation.IsEmptyString(tempValue));
        break;
      case "primaryBuyerEmailAddress":
        setErrorPrimaryBuyerEmailAddress(
          validation.IsInvalidEmail(tempValue) && tempValue.length > 0
        );
        break;
      case "secondaryBuyerEmailAddress":
        setErrorSecondaryBuyerEmailAddress(
          validation.IsInvalidEmail(tempValue) && tempValue.length > 0
        );
        break;
      case "loanEmailAddress":
        setErrorLoanEmailAddress(
          validation.IsInvalidEmail(tempValue) && tempValue.length > 0
        );
        break;
      case "sellerAttorneyEmailAddress":
        setErrorSellerAttorneyEmailAddress(
          validation.IsInvalidEmail(tempValue) && tempValue.length > 0
        );
        break;
      case "buyerAttorneyEmailAddress":
        setErrorBuyerAttorneyEmailAddress(
          validation.IsInvalidEmail(tempValue) && tempValue.length > 0
        );
        break;
    }
  };

  const handleDateChange = (date: any, name: any) => {
    setValues({
      ...values,
      [name]: new Date(date),
    });
  };

  const changeTab = (direction: number) => {
    if (direction === -1) {
      if (currentTab === "Listing") {
        props.changeState(false);
      } else {
        const index = tabs.findIndex((x) => x.name === currentTab);
        setCurrentTab(tabs[index - 1].name);
      }
    } else {
      const index = tabs.findIndex((x) => x.name === currentTab);
      setCurrentTab(tabs[index + 1].name);
    }
  };

  const selectListingRecord = (item: any, index: any) => {
    setSelectedListng(item);
    setSelectedIndex(index);
    setValues({
      ...values,
      listing: item._id,
    });
  };

  const searchListings = (value: string) => {
    setAddressKeyword(value);
    if (value === "") {
      //setSelectedListng(null);
      //setSelectedIndex(null)
    } else {
      dispatch(
        getListingsByAddressOrMLSNumber({ userId: user._id, query: value })
      );
    }
  };

  const setBuyer = (item: ILead) => {
    setSelectedBuyer(item._id);

    setValues({
      ...values,
      client: item._id,
      primaryBuyerFirstName: item.firstName ?? "",
      primaryBuyerLastName: item.lastName ?? "",
      primaryBuyerCompanyName: item.companyName ?? "",
      primaryBuyerPhoneNumber: item.phoneNumber ?? "",
      primaryBuyerEmailAddress: item.emailAddress ?? "",
      primaryBuyerCurrentAddress: item.address ?? "",
      primaryBuyerMailingAddress: item.emailAddress ?? "",
      secondaryBuyerFirstName: item.secondaryFirstName ?? "",
      secondaryBuyerLastName: item.secondaryLastName ?? "",
      secondaryBuyerPhoneNumber: item.secondaryPhoneNumber ?? "",
      secondaryBuyerEmailAddress: item.secondaryEmailAddress ?? "",
    });
  };

  const sendOffer = async () => {
    setErrorPrimaryBuyerFirstName(
      validation.IsEmptyString(values.primaryBuyerFirstName)
    );
    setErrorPrimaryBuyerLastName(
      validation.IsEmptyString(values.primaryBuyerLastName)
    );
    setErrorPrimaryBuyerEmailAddress(
      validation.IsInvalidEmail(values.primaryBuyerEmailAddress) &&
        values.primaryBuyerEmailAddress.length > 0
    );
    setErrorSecondaryBuyerEmailAddress(
      validation.IsInvalidEmail(values.secondaryBuyerEmailAddress) &&
        values.secondaryBuyerEmailAddress.length > 0
    );
    setErrorLoanEmailAddress(
      validation.IsInvalidEmail(values.loanEmailAddress) &&
        values.loanEmailAddress.length > 0
    );
    setErrorSellerAttorneyEmailAddress(
      validation.IsInvalidEmail(values.sellerAttorneyEmailAddress) &&
        values.sellerAttorneyEmailAddress.length > 0
    );
    setErrorBuyerAttorneyEmailAddress(
      validation.IsInvalidEmail(values.buyerAttorneyEmailAddress) &&
        values.buyerAttorneyEmailAddress.length > 0
    );

    if (
      !validation.IsEmptyString(values.primaryBuyerFirstName) &&
      !validation.IsEmptyString(values.primaryBuyerLastName) &&
      !validation.IsEmptyString(values.listing) &&
      !validation.IsEmptyString(
        values.offerAmount ? values.offerAmount.toString() : ""
      )
    ) {
      setIsLoading(true);
      let docs: Array<any> = [];
      let loadingToast = toast.loading("Preparing to upload docs.");
      let totalProgress = 2;

      for (var i = 0; i < values.documents.length; i++) {
        if (values.documents[i].isFile && values.documents[i].file) {
          totalProgress++;
        }
      }

      for (var i = 0; i < values.documents.length; i++) {
        if (!values.documents[i].isFile) {
          docs.push({ ...values.documents[i] });
        } else {
          try {
            toast.update(loadingToast, {
              render: "Uploading photo " + (i + 1) + "/" + (totalProgress - 2),
              progress: (i + 1) / totalProgress,
            });
            const location = await fileUpload(values.documents[i].file, "doc");
            if (location)
              docs.push({
                ...values.documents[i],
                file: location,
                isFile: false,
                view_pdf_data: null,
              });
          } catch (error) {
            setIsLoading(false);
            toast.update(loadingToast, {
              render:
                "Error uploading file: " +
                (i + 1) +
                "/" +
                values.documents.length,
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
        progress: (totalProgress - 1) / totalProgress,
      });

      let submitValues: IOffer = { ...values };
      submitValues.documents = docs;
      if (props.data && props.data._id) {
        let updateData: UpdateOfferDto = {
          email: user.email,
          data: submitValues,
          offerId: props.data._id,
          userId: user._id,
          search: {
            userId: user._id,
            keyword: props.keyword || "",
            sortType: props.sortType || "",
            sortField: props.sortField || "",
            recordsPerPage: props.recordsPerPage || 10,
            currentPage: props.currentPage || 1,
            status: props.currentTab || "All",
          },
        };
        dispatch(updateOffer(updateData)).then((res: any) => {
          setIsLoading(false);
          try {
            if (res.payload.success) {
              //notify(res.payload.success, res.payload.message);
              props.setTotalCount &&
                props.setTotalCount(res.payload.totalPages);
              props.changeState(false);
              toast.update(loadingToast, {
                render: res.payload.message,
                type: "success",
                progress: 0,
                isLoading: isLoading,
                autoClose: 3000,
              });
            }
          } catch (e) {}
        });
      } else {
        let data: CreateOfferDto = {
          email: user.email,
          data: submitValues,
          listingId:
            selectedlisting && selectedlisting._id ? selectedlisting._id : "",
          userId: user._id,
          search: {
            userId: user._id,
            keyword: props.keyword || "",
            sortType: props.sortType || "",
            sortField: props.sortField || "",
            recordsPerPage: props.recordsPerPage || 10,
            currentPage: 1,
            status: props.currentTab || "All",
          },
        };

        props.setCurrentPage && props.setCurrentPage(1);

        dispatch(createNewOffer(data)).then((res: any) => {
          setIsLoading(false);
          try {
            if (res.payload.success) {
              props.setTotalCount &&
                props.setTotalCount(res.payload.totalPages);
              props.changeState(false);
              toast.update(loadingToast, {
                render: res.payload.message,
                type: "success",
                progress: 0,
                isLoading: isLoading,
                autoClose: 3000,
              });
            }
          } catch (e) {}
        });
      }
    }
  };

  return (
    <div>
      {/* {(openPreview) && <div className='!bg-[#00000040] h-screen w-full fixed top-0 left-0 z-10'></div>} */}
      <Transition.Root show={props.open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-30"
          onClose={() => props.changeState(false)}
        >
          <div className="fixed inset-0" />
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
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-[700px]">
                    <div
                      className="flex h-full flex-col bg-white pt-6 shadow-xl px-2"
                      id="submit_offer_drawer"
                    >
                      {/* head bar */}
                      <div className="px-3 sm:px-6">
                        <div className="flex items-start justify-between">
                          <div className="flex h-3 items-center">
                            {currentTab === "Review" && selectedlisting ? (
                              <Typography
                                variant="h2"
                                className="mt-[12px] text-sm sm:text-[1rem]"
                              >
                                {selectedlisting.listingAddress}
                              </Typography>
                            ) : (
                              <Typography variant="h2">
                                Submit an Offer
                              </Typography>
                            )}
                          </div>
                          <div className="flex h-3 items-center gap-x-5">
                            <Typography
                              variant="button2"
                              color="secondary"
                              className="cursor-pointer"
                              onClick={() => changeTab(-1)}
                            >
                              Back
                            </Typography>
                            {currentTab === "Review" ? (
                              <Typography
                                variant="button2"
                                className="cursor-pointer text-[#6DA172]"
                                onClick={() => setOpenDocModal(true)}
                              >
                                View Document
                              </Typography>
                            ) : (
                              <Typography
                                variant="button2"
                                color="secondary"
                                className="cursor-pointer"
                                onClick={() => changeTab(1)}
                              >
                                Next Step
                              </Typography>
                            )}
                            <button
                              type="button"
                              className="relative rounded-md bg-white text-gray-400 hover:text-[#C84156] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => props.changeState(false)}
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
                      <div className="border-b mt-5"></div>
                      <Scrollbars autoHide>
                        <div className="flex justify-center w-full mt-4">
                          <nav
                            className="-mb-px flex justify-center mx-10 w-full border-b"
                            aria-label="Tabs"
                          >
                            <div className="flex justify-between items-end w-full">
                              {tabs.map((tab) => (
                                <div
                                  key={tab.name}
                                  className={classNames(
                                    tab.name === currentTab
                                      ? "border-indigo-500 text-indigo-600"
                                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                    "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium cursor-pointer"
                                  )}
                                  aria-current={
                                    tab.name === currentTab ? "page" : undefined
                                  }
                                  onClick={() => setCurrentTab(tab.name)}
                                >
                                  <Typography variant="h4">
                                    {tab.name}
                                  </Typography>
                                </div>
                              ))}
                            </div>
                          </nav>
                        </div>

                        <div className="px-4 sm:px-[2.5rem] py-6">
                          {currentTab === "Listing" && (
                            <>
                              <Listing
                                selectedlisting={selectedlisting}
                                search_list_flag={props.search_list_flag}
                                addressKeyword={addressKeyword}
                                searchListings={searchListings}
                                listingsForOffer={listingsForOffer}
                                selectListingRecord={selectListingRecord}
                                selectedIndex={selectedIndex}
                              />
                            </>
                          )}
                          {currentTab === "Buyers" && (
                            <Buyers
                              existRelationFlag={existRelationFlag}
                              setExistRelationFlag={setExistRelationFlag}
                              handleTextChange={handleTextChange}
                              setBuyer={setBuyer}
                              selectedBuyer={selectedBuyer}
                              values={values}
                              errorPrimaryBuyerFirstName={
                                errorPrimaryBuyerFirstName
                              }
                              errorPrimaryBuyerLastName={
                                errorPrimaryBuyerLastName
                              }
                              errorPrimaryBuyerPhoneNumber={
                                errorPrimaryBuyerPhoneNumber
                              }
                              errorPrimaryBuyerEmailAddress={
                                errorPrimaryBuyerEmailAddress
                              }
                              errorSecondaryBuyerPhoneNumber={
                                errorSecondaryBuyerPhoneNumber
                              }
                              errorSecondaryBuyerEmailAddress={
                                errorSecondaryBuyerEmailAddress
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
                          {currentTab === "Terms" && (
                            <Terms
                              handleTextChange={handleTextChange}
                              handleDateChange={handleDateChange}
                              values={values}
                            />
                          )}
                          {currentTab === "Financing" && (
                            <Financing
                              handleTextChange={handleTextChange}
                              handleDateChange={handleDateChange}
                              values={values}
                              errorLoanPhoneNumber={errorLoanPhoneNumber}
                              errorLoanEmailAddress={errorLoanEmailAddress}
                              addresses={addresses}
                              onChangeAddressAutoComplete={
                                onChangeAddressAutoComplete
                              }
                              onSelectAddressAutoComplete={
                                onSelectAddressAutoComplete
                              }
                            />
                          )}
                          {currentTab === "Legal/Title" && (
                            <Legal
                              handleTextChange={handleTextChange}
                              values={values}
                              errorBuyerAttorneyPhoneNumber={
                                errorBuyerAttorneyPhoneNumber
                              }
                              errorBuyerAttorneyEmailAddress={
                                errorBuyerAttorneyEmailAddress
                              }
                              errorSellerAttorneyPhoneNumber={
                                errorSellerAttorneyPhoneNumber
                              }
                              errorSellerAttorneyEmailAddress={
                                errorSellerAttorneyEmailAddress
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
                          {currentTab === "Docs" && (
                            <Docs
                              changeRenameFile={changeRenameFile}
                              changeDocType={changeDocType}
                              handleFileChange={handleFileChange}
                              deleteDocLine={deleteDocLine}
                              addDocsLine={addDocsLine}
                              values={values}
                              selectOptions={selectOptions}
                            />
                          )}
                          {currentTab === "Review" && (
                            <Review
                              selectedlisting={selectedlisting}
                              setOpenDocModal={setOpenDocModal}
                              sendOffer={sendOffer}
                              values={values}
                            />
                          )}
                        </div>
                      </Scrollbars>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <ViewDocumentModal
        open={openDocModal}
        pdf_data={values.documents}
        closeModal={() => closeViewDocModal()}
      />
    </div>
  );
};

export default SubmitOffer
