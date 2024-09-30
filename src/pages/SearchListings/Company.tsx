import React from 'react'
import { useNavigate } from 'react-router-dom'
import AdvancedTable from '@/components/baseComponents/AdvancedTable'
import Typography from '@/components/baseComponents/Typography'
// import RecycleBin from '@/assets/images/recylebin.svg'
// import showing_image1 from '@/assets/images/showing_image1.svg';
// import showing_image2 from '@/assets/images/showing_image2.svg';
// import showing_image3 from '@/assets/images/showing_image3.svg';
// import showing_image4 from '@/assets/images/showing_image4.svg';
// import showing_image5 from '@/assets/images/showing_image5.svg';
// import showing_image6 from '@/assets/images/showing_image6.svg';
import { Button } from '@/components/baseComponents/Button'
// import View from './View'
import { getLeadsByUserId } from '@/redux/lead/leadSlice'
import { getUser } from '@/redux/user/userSlice'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { notify } from '@/shared/services/notify'

import { DeleteMyListingsDto, GetLeadsDto } from '@/shared/interfaces/interfaces'
import { MdEdit, MdDelete } from 'react-icons/md'
import { XMarkIcon } from '@heroicons/react/24/outline'
import AdvancedSearch from './AdvancedSearch'
import View from '../myListings/View';
import Filter from '@/components/mainComponents/Filter';
import SortAdvanced from '@/components/mainComponents/SortAdvanced';
import TeamInfo from '../profile/TeamInfo';
import MyListingsDrawer from '../myListings/Drawer';
import { Dialog } from '@headlessui/react';
import { toast } from 'react-toastify';
import { deleteMyListings } from '@/redux/myListings/myListingSlice';

const tabs = [
    { name: 'Expansive', url: '/app/listings' },
    { name: 'Company Listings', url: '/app/listings/company' },
    { name: 'Team Listings', url: '/app/listings/team' },
    { name: 'My Listings', url: '/app/my-listings' },
]

const TableFields = [
    { name: '', type: 'image', slug: 'image_src', class_name: 'text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3' },
    { name: 'Address', type: 'text', slug: 'address', class_name: 'text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3' },
    { name: 'City, State, Zip', type: 'text', slug: 'city_state_zip', class_name: 'text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3' },
    { name: 'Property Type', type: 'text', slug: 'property_type', class_name: 'text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3' },
    { name: 'Bedrooms', type: 'text', slug: 'bedrooms', class_name: 'text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3' },
    { name: 'Bathrooms', type: 'text', slug: 'bathrooms', class_name: 'text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3' },
    { name: 'Home Size', type: 'text', slug: 'home_size', class_name: 'text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3' },
    { name: '', type: "action", slug: 'action', class_name: 'text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3' }
]

const SortFieldOptions = [
    { value: 'address', label: 'Address' },
    { value: 'property_type', label: 'Property Type' },
    { value: 'bedrooms', label: 'Bedrooms' },
    { value: 'bathrooms', label: 'Bathrooms' },
];

// const selecedOptions = [
//     { value: 'Client Type', label: 'Client Type' },
//     { value: 'Property Type', label: 'Property Type' },
// ]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}
const Company = () => {
  const dispatch = useAppDispatch();
  const showing_data: Array<any> = [
    // {
    //   status: 0,
    //   address1: "123 Main St",
    //   address2: "Unit1",
    //   city: "Miami",
    //   neighborhood: "North Bay Village",
    //   state: "Florida",
    //   zip_code: "33141",
    //   client: "Sarah Restrepo",
    //   date: "2023-10-17",
    //   start_time: "12:30",
    //   end_time: "14:30",
    //   agent: "Chris Wang Keller Williams",
    //   image: [
    //     { src: showing_image1 },
    //     { src: showing_image2 },
    //     { src: showing_image3 },
    //     { src: showing_image4 },
    //     { src: showing_image5 },
    //   ],
    //   instruction:
    //     "This is the property description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    //   remark:
    //     "This is the property description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    //   lockbox_keypad: "",
    //   access_code: "",
    //   occupany_status: "Owner Occupied",
    //   require_agency_disclosure: 1,
    //   bedrooms: 2,
    //   bathrooms: 1,
    //   home_size: "2,800 SqFt",
    //   property_type: "Single Family Residence",
    // },
    // {
    //   status: 1,
    //   address1: "123 Main St",
    //   address2: "Unit1",
    //   city: "Miami",
    //   neighborhood: "North Bay Village",
    //   state: "Florida",
    //   zip_code: "33141",
    //   client: "Sarah Restrepo",
    //   date: "2023-10-17",
    //   start_time: "12:30",
    //   end_time: "14:30",
    //   agent: "Chris Wang Keller Williams",
    //   image: [
    //     { src: showing_image4 },
    //     { src: showing_image5 },
    //     { src: showing_image6 },
    //   ],
    //   instruction:
    //     "This is the property description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    //   remark:
    //     "This is the property description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    //   lockbox_keypad: "",
    //   access_code: "",
    //   occupany_status: "Owner Occupied",
    //   require_agency_disclosure: 1,
    //   bedrooms: 2,
    //   bathrooms: 1,
    //   home_size: "2,800 SqFt",
    //   property_type: "Single Family Residence",
    // },
    // {
    //   status: 2,
    //   address1: "123 Main St",
    //   address2: "Unit1",
    //   city: "Miami",
    //   neighborhood: "North Bay Village",
    //   state: "Florida",
    //   zip_code: "33141",
    //   client: "Sarah Restrepo",
    //   date: "2023-10-17",
    //   start_time: "12:30",
    //   end_time: "14:30",
    //   agent: "Chris Wang Keller Williams",
    //   image: [
    //     { src: showing_image4 },
    //     { src: showing_image5 },
    //     { src: showing_image6 },
    //   ],
    //   instruction:
    //     "This is the property description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    //   remark:
    //     "This is the property description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    //   lockbox_keypad: "",
    //   access_code: "",
    //   occupany_status: "Owner Occupied",
    //   require_agency_disclosure: 1,
    //   bedrooms: 2,
    //   bathrooms: 1,
    //   home_size: "2,800 SqFt",
    //   property_type: "Single Family Residence",
    // },
  ];
  const user = useAppSelector(getUser);
  const [currentTab, setCurrentTab] = React.useState<string>("All");

  const [openView, setOpenView] = React.useState<boolean>(false);
  const [viewData, setViewdata] = React.useState<any>(null);
  const [filteredData, setFilteredData] = React.useState<Array<any>>([]);
  const [keyword, setKeyword] = React.useState<string>("");
  // const [selectedField, setSelectedField] = React.useState<any>({ value: '', label: '' })
  const [sortType, setSortType] = React.useState<string>("Descending");
  const [sortField, setSortField] = React.useState<string>("Address");
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [recordsPerPage, setRecordsPerPage] = React.useState<number>(10);
  const [openConfirm, setOpenConfirm] = React.useState<{
    action?: string;
    state: boolean;
  }>({ action: "archive", state: false });
  const [open, setOpen] = React.useState<boolean>(false);
  const [openMyListingsDrawer, setOpenMyListingsDrawer] =
    React.useState<boolean>(false);
  const [selectedPeople, setSelectedPeople] = React.useState<Array<any>>([]);
  const [selectedListing, setSelectedListing] = React.useState<any>({});

  const onSetPage = (value: number) => {
    setCurrentPage(value);
  };

  const onClickRow = (value: any) => {
    setOpenView(true);
    setViewdata(value);
  };

  const changeKeyword = (keyword: string) => {
    setKeyword(keyword);
  };
  // const changeSelectedField = (selectedField: any) => {
  //     setSelectedField(selectedField)
  // }
  const changeSortType = (value: string) => {
    setSortType(value);
  };
  const changeSortField = (value: string) => {
    setSortField(value);
  };
  const filterData = () => {
    const data: GetLeadsDto = {
      userId: user._id,
      keyword: keyword,
      sortType: sortType,
      sortField: sortField,
      recordsPerPage: recordsPerPage,
      currentPage: currentPage,
    };
    dispatch(getLeadsByUserId(data)).then((res: any) => {
      try {
        setTotalCount(res.payload.totalCount);
        // notify(res.payload.success, res.payload.message)
      } catch (e) {
        notify(false, "Something went wrong.");
      }
    });
  };

  const makeTableData = (data: Array<object>) => {
    const res: Array<object> = [];
    data.map((item: any) => {
      const isUserOwned = user._id !== item.owner?._id;
      const new_item = JSON.parse(JSON.stringify(item));
      new_item.address = item.address1 + " " + item.address2;
      new_item.city_state_zip =
        item.city + ", " + item.state + " " + item.zip_code;
      new_item.image_src =
        item.image != undefined && item.image[0] != undefined
          ? item.image[0].src
          : "";
      new_item.action = [
        { name: "Edit", icon: <MdEdit className="mt-1" />, color: "black", hidden: isUserOwned },
        {
          name: "Archive",
          icon: <MdDelete className="text-[#C77E90] mt-1" />,
          color: "#C77E90",
          hidden: isUserOwned,
        },
      ];
      res.push(new_item);
    });
    return res;
  };

  React.useEffect(() => {
    const table_data = makeTableData(showing_data);
    setFilteredData(table_data);
      setCurrentTab("All");
  }, []);

  React.useEffect(() => {
    setRecordsPerPage(10);
    const data: GetLeadsDto = {
      userId: user._id,
      keyword: keyword,
      sortType: sortType,
      sortField: sortField,
      recordsPerPage: recordsPerPage,
      currentPage: currentPage,
    };
    dispatch(getLeadsByUserId(data)).then((res) => {
      try {
        setTotalCount(res.payload.totalCount);
        // notify(res.payload.success, res.payload.message)
      } catch (e) {
        notify(false, "Something went wrong.");
      }
    });
  }, []);
  React.useEffect(() => {
    const data: GetLeadsDto = {
      userId: user._id,
      keyword: keyword,
      sortType: sortType,
      sortField: sortField,
      recordsPerPage: recordsPerPage,
      currentPage: currentPage,
    };
    dispatch(getLeadsByUserId(data)).then((res) => {
      try {
        setTotalCount(res.payload.totalCount);
        // notify(res.payload.success, res.payload.message)
      } catch (e) {
        notify(false, "Something went wrong.");
      }
    });
    setSelectedPeople([]);
  }, [currentPage]);

  const editRow = (data: any) => {
    console.log("editdata", data);
  };

  const deleteRow = (item: any) => {
    setOpenConfirm({ action: "archive", state: true });
    setSelectedListing(item);
  };

  const archiveListing = () => {
    let archivingToast = toast.loading("Archiving your listing");

    let ids: Array<string> = [];
    if (selectedPeople.length === 0 && selectedListing) {
      ids = [selectedListing._id];
    } else {
      ids = selectedPeople.map((lead: any) => {
        return lead._id;
      });
    }

    const data: DeleteMyListingsDto = {
      ids: ids,
      userId: user._id,
      search: {
        userId: user._id,
        keyword: keyword,
        sortType: sortType,
        sortField: sortField,
        recordsPerPage: recordsPerPage,
        currentPage: currentPage,
        status: currentTab,
      },
    };

    dispatch(deleteMyListings(data)).then((res) => {
      try {
        setTotalCount(res.payload.totalCount);
        toast.update(archivingToast, {
          render: res.payload.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } catch (e) {
        toast.update(archivingToast, {
          render:
            "Something went wrong while archiving your listing. Please try again.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    });
  };

  const navigate = useNavigate();

  return (
    <div className="p-8">
      {(open || openView || openMyListingsDrawer) && (
        <div className="!bg-[#00000075] h-screen w-full fixed top-0 left-0 z-10"></div>
      )}
      <AdvancedSearch open={open} changeState={setOpen} />
      <Dialog
        open={openConfirm.state}
        onClose={() => setOpenConfirm({ state: false })}
        className="relative shadow-md z-50"
      >
        <div className="bg-[#00000040] fixed inset-0 flex w-screen items-center justify-center ">
          <Dialog.Panel className="w-full max-w-sm rounded bg-white">
            <div className="rounded-lg max-w-[435px] w-full bg-white p-3">
              <div className="flex justify-end w-full text-secondary hover:text-primary cursor-pointer">
                <XMarkIcon
                  className="h-6 w-6"
                  aria-hidden="true"
                  onClick={() => setOpenConfirm({ state: false })}
                />
              </div>
              <div className="w-full flex justify-center mt-[10px]">
                <Typography variant="body">
                  Are you sure you want to {openConfirm.action} this listing?
                </Typography>
              </div>
              <div className="flex gap-[15px] justify-center mt-[20px] mb-[10px]">
                <div
                  className="bg-[#C18193] hover:bg-[#B17183] w-[100px] h-[40px] rounded flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    openConfirm.action === "archive"
                      ? archiveListing()
                      : setOpenMyListingsDrawer(false);
                    setOpenConfirm({ state: false });
                  }}
                >
                  <span className="text-[#B32F43] capitalize body button2">
                    {openConfirm.action} Listing
                  </span>
                </div>
                <div
                  className="bg-[#B5E2C4] hover:bg-[#B5E2C4] w-[100px] h-[40px] rounded flex items-center justify-center cursor-pointer"
                  onClick={() => setOpenConfirm({ state: false })}
                >
                  <span className="text-[#6DA172] body button2">Continue</span>
                </div>
                {openConfirm.action === "discard" && (
                  <div
                    className="bg-[#B5E2C4] hover:bg-[#B5E2C4] w-[100px] h-[40px] rounded flex items-center justify-center cursor-pointer"
                    onClick={() => setOpenConfirm({ state: false })}
                  >
                    <span className="text-[#6DA172] button2">
                      Save as Draft
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      <div>
        <div className="block">
          <div className="lg:flex items-center gap-3">
            <div className="flex max-[570px]:flex-col min-[570px]:items-end min-[570px]:justify-between sm:max-lg:mb-3">
              <Typography
                variant="h2"
                color="primary"
                className="whitespace-nowrap"
              >
                Company Listings
              </Typography>
              <div className="flex gap-5 block lg:hidden">
                <div className="flex items-center gap-5 min-[900px]:hidden">
                  <Filter
                    changeKeyword={changeKeyword}
                    keyword={keyword}
                    filterLeads={filterData}
                  />
                  <SortAdvanced
                    sortFieldOptions={SortFieldOptions}
                    sortType={sortType}
                    sortField={sortField}
                    changeSortField={changeSortField}
                    changeSortType={changeSortType}
                    filterData={filterData}
                  />
                </div>
                <Button onClick={() => setOpen(true)}>
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
                      tab.name === "Company Listings"
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                      "whitespace-nowrap border-b-2 p-1 cursor-pointer"
                    )}
                    aria-current={
                      tab.name === "Company Listings" ? "page" : undefined
                    }
                    onClick={() => navigate(tab.url)}
                  >
                    <Typography variant="page-menu">{tab.name}</Typography>
                  </div>
                ))}
              </div>
              <div className="lg:flex gap-3">
                <div className="flex items-center gap-3 hidden min-[900px]:flex">
                  <Filter
                    changeKeyword={changeKeyword}
                    keyword={keyword}
                    filterLeads={filterData}
                  />
                  <SortAdvanced
                    sortFieldOptions={SortFieldOptions}
                    sortType={sortType}
                    sortField={sortField}
                    changeSortField={changeSortField}
                    changeSortType={changeSortType}
                    filterData={filterData}
                  />
                </div>
                <Button
                  className="hidden lg:block"
                  onClick={() => setOpen(true)}
                >
                  <Typography variant="button2">Advanced Search</Typography>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <View open={openView} changeState={setOpenView} data={viewData} />
        <AdvancedTable
          minCellWidth={100}
          class_name="showing_table table grid grid-cols-8 items-center"
          data={filteredData}
          fields={TableFields}
          onClickRow={onClickRow}
          totalPage={Math.ceil(totalCount / recordsPerPage)}
          totalCount={totalCount}
          currentPage={currentPage}
          recordsPerpage={recordsPerPage}
          onSetPage={onSetPage}
          editRow={editRow}
          deleteRow={deleteRow}
          emptyStateProps={{
            attachment: <TeamInfo isTeamDetailsHidden={true} />,
            attachmentCondition: user.agent.companyName?.businessName !== "",
            heading: "Be the first to Add a Listing",
            content:
              "After you add your listings, you’ll unlock ultimate listing management and productivity.",
            buttonText: "Add a Listing",
            onButtonClick: () => setOpenMyListingsDrawer(true),
            drawer: (
              <MyListingsDrawer
                open={openMyListingsDrawer}
                closeDrawer={() => setOpenMyListingsDrawer(false)}
                changeState={setOpenMyListingsDrawer}
                setOpenConfirm={setOpenConfirm}
                currentTab={currentTab}
              />
            ),
          }}
        />
      </div>
    </div>
  );
}

export default Company