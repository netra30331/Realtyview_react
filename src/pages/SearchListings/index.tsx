import React from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@/components/baseComponents/Typography";

import { Button } from "@/components/baseComponents/Button";
import Select from "@/components/baseComponents/Select";
// import TextField from '@/components/baseComponents/TextField'
import AddressAutoComplete from "@/components/baseComponents/AddressAutoComplete";
import { MdOutlineSearch } from "react-icons/md";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAddressAutocomplete, getAddresses } from "@/redux/user/userSlice";
import TableEmptyState from "@/components/baseComponents/TableEmptyState";
import { getListingsByAdvancedSearch } from "@/redux/myListings/myListingSlice";
import { ListingAdvancedSearchDto } from "@/shared/interfaces/interfaces";
import View from "../myListings/View";
import AdvancedSearch from "./AdvancedSearch";
import AdvancedTable from "@/components/baseComponents/AdvancedTable";
import ListingImagePlaceholder from "@/assets/images/listing_image_placeholder.png";
import { NumericFormat } from "react-number-format";

const tabs = [
  { name: "Expansive", url: "/app/listings" },
  { name: "Company Listings", url: "/app/listings/company" },
  { name: "Team Listings", url: "/app/listings/team" },
  { name: "My Listings", url: "/app/my-listings" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
const SearchListings = () => {
  const dispatch = useAppDispatch();
  const [openConfirm, setOpenConfirm] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [noResultFlag, setNoResultFlag] = React.useState<boolean>(false);
  const [isSearched, setIsSearched] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<ListingAdvancedSearchDto>({
    query: "",
    propertyType: "",
    propertySubType: "",
    propertyBedrooms: "",
    propertyBathrooms: "",
    companyOnly: false,
    teamOnly: false,
  });
  const [propertySubType, setPropertySubType] = React.useState<Array<any>>([]);
  const addresses = useAppSelector(getAddresses);
  const navigate = useNavigate();

  const [openView, setOpenView] = React.useState<boolean>(false);
  const [viewData, setViewdata] = React.useState<any>(null);
  const [filteredData, setFilteredData] = React.useState<Array<any>>([]);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  //const [recordsPerPage, setRecordsPerPage] = React.useState<number>(10);

  const TableFields = [
    {
      name: "",
      type: "image",
      slug: "imageSrc",
      class_name:
        "text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3",
    },
    {
      name: "Address",
      type: "text",
      slug: "listingAddress",
      class_name:
        "text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3",
    },
    {
      name: "Property Type",
      type: "text",
      slug: "propertyType",
      class_name:
        "text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3",
    },
    {
      name: "Bedrooms",
      type: "text",
      slug: "propertyBedrooms",
      class_name:
        "text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3",
    },
    {
      name: "Bathrooms",
      type: "text",
      slug: "propertyBathrooms",
      class_name:
        "text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3",
    },
    {
      name: "Home Size",
      type: "text",
      slug: "propertyHomeSqft",
      class_name:
        "text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3",
    },
    // { name: "", type: "action", slug: "action", class_name: "" },
  ];

  const propertyType = [
    { value: "Single Family Residence", label: "Single Family Residence" },
    { value: "Multi Family Residence", label: "Multi Family Residence" },
    { value: "Apartment", label: "Apartment" },
    { value: "Townhouse", label: "Townhouse" },
    { value: "Land", label: "Land" },
    { value: "Mobile", label: "Mobile" },
    { value: "Commercial", label: "Commercial" },
    { value: "Other", label: "Other" },
  ];

  const SubTypeList = [
    {
      parent: "Single Family Residence",
      contents: [
        { value: "Cabin", label: "Cabin" },
        { value: "Manufactured Home", label: "Manufactured Home" },
        { value: "Manufactured On Land", label: "Manufactured On Land" },
        { value: "Mobile Home", label: "Mobile Home" },
        { value: "Own Your Own", label: "Own Your Own" },
        { value: "Single Family Residence", label: "Single Family Residence" },
        { value: "Mixed Use", label: "Mixed Use" },
      ],
    },
    {
      parent: "Multi Family Residence",
      contents: [
        { value: "Duplex", label: "Duplex" },
        { value: "Manufactured Home", label: "Manufactured Home" },
        { value: "Manufactured On Land", label: "Manufactured On Land" },
        { value: "Mobile Home", label: "Mobile Home" },
        { value: "Own Your Own", label: "Own Your Own" },
        { value: "Quadruplex", label: "Quadruplex" },
        { value: "Triplex", label: "Triplex" },
      ],
    },
    {
      parent: "Apartment",
      contents: [
        { value: "Apartment", label: "Apartment" },
        { value: "Condominium", label: "Condominium" },
        { value: "Own Your Own", label: "Own Your Own" },
        { value: "Stock Cooperative", label: "Stock Cooperative" },
      ],
    },
    {
      parent: "Townhouse",
      contents: [
        { value: "Own Your Own", label: "Own Your Own" },
        { value: "Townhouse", label: "Townhouse" },
      ],
    },
    {
      parent: "Land",
      contents: [
        { value: "Farm (PropertySubType)", label: "Farm (PropertySubType)" },
        { value: "Own Your Own", label: "Own Your Own" },
        { value: "Ranch", label: "Ranch" },
        { value: "Unimproved Land", label: "Unimproved Land" },
      ],
    },
    {
      parent: "Mobile",
      contents: [
        { value: "Mobile Home", label: "Mobile Home" },
        { value: "Own Your Own", label: "Own Your Own" },
      ],
    },
    {
      parent: "Commercial",
      contents: [
        { value: "Own Your Own", label: "Own Your Own" },
        { value: "Stock Cooperative", label: "Stock Cooperative" },
        {
          value: "Business (PropertySubType)",
          label: "Business (PropertySubType)",
        },
        { value: "Hotel-Motel", label: "Hotel-Motel" },
        {
          value: "Industrial (PropertySubType)",
          label: "Industrial (PropertySubType)",
        },
        { value: "Mixed Use", label: "Mixed Use" },
        { value: "Multi Family", label: "Multi Family" },
        {
          value: "Office (PropertySubType)",
          label: "Office (PropertySubType)",
        },
        {
          value: "Retail (PropertySubType)",
          label: "Retail (PropertySubType)",
        },
        {
          value: "Warehouse (PropertySubType)",
          label: "Warehouse (PropertySubType)",
        },
      ],
    },
    {
      parent: "Other",
      contents: [
        { value: "Boat Slip", label: "Boat Slip" },
        { value: "Cabin", label: "Cabin" },
        { value: "Deeded Parking", label: "Deeded Parking" },
        { value: "Farm (PropertySubType)", label: "Farm (PropertySubType)" },
        { value: "Manufactured Home", label: "Manufactured Home" },
        { value: "Manufactured On Land", label: "Manufactured On Land" },
        { value: "Own Your Own", label: "Own Your Own" },
        { value: "Ranch", label: "Ranch" },
        { value: "Timeshare", label: "Timeshare" },
        {
          value: "Agriculture (PropertySubType)",
          label: "Agriculture (PropertySubType)",
        },
        {
          value: "Business (PropertySubType)",
          label: "Business (PropertySubType)",
        },
      ],
    },
  ];

  const makeTableData = (data: Array<object>) => {
    const res: Array<object> = [];
    data.map((item: any) => {
      const new_item = JSON.parse(JSON.stringify(item));
      new_item.address = item.address1 + " " + item.address2;
      new_item.imageSrc =
        (new_item.propertyPhotos && new_item.propertyPhotos[0]?.file) ||
        ListingImagePlaceholder;
      //   new_item.action = [
      //     { name: "Edit", icon: <MdEdit className="mt-1" />, color: "black" },
      //     {
      //       name: "Archive",
      //       icon: <MdDelete className="text-[#C77E90] mt-1" />,
      //       color: "#C77E90",
      //     },
      //   ];
      res.push(new_item);
    });
    return res;
  };

  const searchData = () => {
    console.log(value);
    dispatch(getListingsByAdvancedSearch(value)).then((res) => {
      try {
        setTotalCount(res.payload.listingsForAdvancedSearch.length);
        if (res.payload.listingsForAdvancedSearch.length === 0)
          setNoResultFlag(true);
        else {
          setIsSearched(true);
          const table_data = makeTableData(
            res.payload.listingsForAdvancedSearch
          );
          setFilteredData(table_data);
        }
      } catch (e) {}
    });
    // if (results.length > 0) {
    //   if (companyOnlyFlag === false && teamOnlyFlag === false) {
    //     navigate("/app/listings/expansive");
    //   }
    //   if (companyOnlyFlag) {
    //     navigate("/app/listings/company");
    //   }
    //   if (teamOnlyFlag) {
    //     navigate("/app/listings/team");
    //   }
    // } else {
    //   setNoResultFlag(true); // Set no result flat as true of there are no results
    // }
  };

  const changePropertyType = (value: any) => {
    handleSelectChange(value, "propertyType");
    SubTypeList.map((item) => {
      if (item.parent === value.value) {
        setPropertySubType(item.contents);
      }
    });
  };

  const onChangeAddressAutoComplete = (item: any) => {
    setValue({
      ...value,
      query: item,
    });
    dispatch(fetchAddressAutocomplete({ address: item }));
  };

  const handleInputChange = (item: any, key: string) => {
    setValue({
      ...value,
      [key]: item.target.value,
    });
  };

  const handleSelectChange = (item: any, key: string) => {
    setValue({
      ...value,
      [key]: item.value,
    });
  };

  const onClickRow = (value: any) => {
    setOpenView(true);
    setViewdata(value);
  };

  const onSetPage = (value: number) => {
    setCurrentPage(value);
  };

  const editRow = (data: any) => {
    console.log("editdata", data);
  };
  const deleteRow = (data: any) => {
    console.log("deletedata", data);
    setOpenConfirm(true);
  };

  return (
    <div className="p-8">
      {(open || openView) && (
        <div className="!bg-[#00000075] h-screen w-full fixed top-0 left-0 z-10"></div>
      )}
      <AdvancedSearch open={open} changeState={setOpen} />
      {openConfirm && (
        <div
          className="bg-[#00000040] w-full h-screen flex items-center justify-center fixed top-0 left-0"
          onClick={() => setOpenConfirm(false)}
        >
          <div className="rounded-lg max-w-[435px] w-full bg-white p-3">
            <div>
              <div className="flex justify-end w-full text-secondary hover:text-primary cursor-pointer">
                <XMarkIcon
                  className="h-6 w-6"
                  aria-hidden="true"
                  onClick={() => setOpenConfirm(false)}
                />
              </div>
              <div className="w-full flex justify-center mt-[10px]">
                <Typography variant="button2">
                  Are you sure you want to archive this listing?
                </Typography>
              </div>
              <div className="flex justify-center mt-[20px] mb-[10px]">
                <div className="bg-[#C18193] hover:bg-[#B17183] mr-4 w-[146px] h-[40px] rounded flex items-center justify-center cursor-pointer">
                  <Typography variant="button2" className="text-[#B32F43]">
                    Archive Listing
                  </Typography>
                </div>
                <div className="bg-[#B5E2C4] hover:bg-[#B17183] w-[146px] h-[40px] rounded flex items-center justify-center cursor-pointer">
                  <Typography variant="button2" className="text-[#6DA172]">
                    Keep Listing
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* header */}
      <div>
        <div className="block">
          <div className="lg:flex items-center gap-3">
            <div className="flex max-[570px]:flex-col min-[570px]:items-end min-[570px]:justify-between sm:max-lg:mb-3">
              <Typography
                variant="h2"
                color="primary"
                className="whitespace-nowrap"
              >
                Search Listings
              </Typography>
              <div className="flex gap-5 block lg:hidden ">
                <Button onClick={() => setOpen(true)} disabled={true}>
                  <Typography variant="button2">Advanced Search</Typography>
                </Button>
              </div>
            </div>
            <nav
              className="-mb-px flex justify-between w-full"
              aria-label="Tabs"
            >
              <div className="flex items-center gap-3">
                {tabs.map((tab, index) => (
                  <div
                    key={index}
                    className={classNames(
                      tab.name === "Expansive"
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                      "whitespace-nowrap border-b-2 p-1 cursor-pointer"
                    )}
                    onClick={() => navigate(tab.url)}
                  >
                    <Typography variant="page-menu">{tab.name}</Typography>
                  </div>
                ))}
              </div>
              <div className="lg:flex gap-3 ">
                <Button
                  className="hidden lg:block"
                  onClick={() => setOpen(true)}
                  disabled={true}
                >
                  <Typography variant="button2">Advanced Search</Typography>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
      {/* content */}
      {isSearched ? (
        <div className="mt-8">
          <View open={openView} changeState={setOpenView} data={viewData} />
          <AdvancedTable
            minCellWidth={100}
            class_name="showing_table table grid grid-cols-6 items-center"
            data={filteredData}
            fields={TableFields}
            onClickRow={onClickRow}
            totalPage={Math.ceil(totalCount / 10)}
            totalCount={totalCount}
            currentPage={currentPage}
            recordsPerpage={10} //recordsPerPage
            onSetPage={onSetPage}
            editRow={editRow}
            deleteRow={deleteRow}
          />
        </div>
      ) : (
        <div className="mt-8">
          <div className="w-full rounded-md min-h-[calc(100vh-230px)] bg-white p-8 flex justify-center rounded-md">
            <div className="flex flex-col gap-5 w-1/2">
              <div className="flex relative">
                <AddressAutoComplete
                  value={value.query}
                  options={addresses}
                  placeholder="Enter an Address, City, State or Zip Code"
                  filterKey="streetLine"
                  onChange={onChangeAddressAutoComplete}
                  onAllChange={(value) => {
                    setValue({
                      ...value,
                      query:
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
                  }}
                  className="!border-0 !border-b-2 bg-white w-full"
                  inputClassName="!border-0"
                />
                <MdOutlineSearch className="absolute top-3 right-4 text-[#8E9CB2]" />
              </div>
              <div className="flex gap-10">
                <div className="border-b-2 w-full">
                  <Select
                    className="!bg-transparent !border-0 !border-transparent"
                    placeholder="Property Type"
                    options={propertyType}
                    name="propertyType"
                    onChange={(value) => changePropertyType(value)}
                  />
                </div>
                <div className="border-b-2 w-full">
                  <Select
                    className="!bg-transparent !border-0 !border-transparent"
                    placeholder="Property Sub-Type"
                    options={propertySubType}
                    name="propertySubType"
                    onChange={(value) =>
                      handleSelectChange(value, "propertySubType")
                    }
                  />
                </div>
              </div>
              <div className="flex gap-10">
                <div className="border-b-2 w-full">
                  <NumericFormat
                    thousandSeparator=","
                    name="propertyBedrooms"
                    placeholder="Min. Bedrooms"
                    value={value.propertyBedrooms}
                    onChange={(e) => handleInputChange(e, "propertyBedrooms")}
                    className="medium-text bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:medium-text border-transparent bg-transparent focus:border-transparent"
                  />
                </div>
                <div className="border-b-2 w-full">
                  <NumericFormat
                    thousandSeparator=","
                    name="propertyBathrooms"
                    placeholder="Min. Bathrooms"
                    value={value.propertyBathrooms}
                    onChange={(e) => handleInputChange(e, "propertyBathrooms")}
                    className="medium-text bg-netural rounded-5 h-10 text-primary p-4 outline-none w-full placeholder:medium-text border-transparent bg-transparent focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-10">
                <div className="flex justify-between items-center w-full">
                  <Typography
                    variant="medium-text"
                    color="primary"
                    className="pl-4"
                  >
                    Company Only
                  </Typography>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value={"company"}
                      className="sr-only peer"
                      checked={value.companyOnly === true}
                      onChange={(e) => {
                        setValue({
                          ...value,
                          companyOnly: e.target.checked,
                          teamOnly: e.target.checked ? false : value.teamOnly,
                        });
                      }}
                    />
                    <div className="w-16 h-5 bg-gray-200 rounded-md peer peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white before:content-['Off'] before:peer-checked:content-[''] before:h-full before:mt-[1px] before:text-12 before:text-primary before:absolute before:w-1/2 before:right-0 before:text-center after:content-[''] after:peer-checked:content-['On'] after:text-white after:text-12 after:text-center after:absolute after:bg-indigo-600 after:h-full after:w-1/2 after:border-gray-300 after:border after:peer-[:not(:checked)]:rounded-l-md after:peer-checked:rounded-r-md after:transition-all dark:border-gray-600"></div>
                  </label>
                </div>
                <div className="flex justify-between items-center w-full">
                  <Typography
                    variant="medium-text"
                    color="primary"
                    className="pl-4"
                  >
                    Team Only
                  </Typography>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value={"team"}
                      className="sr-only peer"
                      checked={value.teamOnly === true}
                      onChange={(e) => {
                        setValue({
                          ...value,
                          teamOnly: e.target.checked,
                          companyOnly: e.target.checked
                            ? false
                            : value.companyOnly,
                        });
                      }}
                    />
                    <div className="w-16 h-5 bg-gray-200 rounded-md peer peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full before:content-['Off'] before:peer-checked:content-[''] before:h-full before:mt-[1px] before:text-12 before:text-primary before:absolute before:w-1/2 before:right-0 before:text-center peer-checked:after:border-white after:content-[''] after:peer-checked:content-['On'] after:text-white after:text-12 after:text-center after:absolute after:bg-indigo-600 after:h-full after:w-1/2 after:border-gray-300 after:border after:peer-[:not(:checked)]:rounded-l-md after:peer-checked:rounded-r-md after:transition-all dark:border-gray-600"></div>
                  </label>
                </div>
              </div>
              <div className="w-full flex justify-center mt-8">
                <Button onClick={() => searchData()}>
                  <Typography variant="button1" className="px-10">
                    Search
                  </Typography>
                </Button>
              </div>

              {noResultFlag && (
                <TableEmptyState
                  heading="No Results Found"
                  content="Try broader search criteria for results."
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchListings;
