import React from "react";
import Typography from "@/components/baseComponents/Typography";
import { Button } from "@/components/baseComponents/Button";
import Drawer from "./Drawer";
import View from "./View";
import {
  getMyListings,
  getMyListingsByUserId,
  deleteMyListings,
  setListingStatus,
  //favoriteMyListing,
} from "@/redux/myListings/myListingSlice";
import { getUser } from "@/redux/user/userSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { notify } from "@/shared/services/notify";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  DeleteMyListingsDto,
  //FavoriteMyListingsDto,
  GetMyListingsDto,
  SetListingStatusDto,
} from "@/shared/interfaces/interfaces";
import Filter from "@/components/mainComponents/Filter";
import Sort from "@/components/mainComponents/Sort";
import AdvancedTable from "@/components/baseComponents/AdvancedTable";
import Pencil from "@/assets/icons/pencil.svg";
import RecycleBin from "@/assets/images/recylebin.svg";
import ListingImagePlaceholder from "@/assets/images/listing_image_placeholder.png";
import { toast } from "react-toastify";
import { Dialog } from "@headlessui/react";
//import { ColumnDef } from "@tanstack/react-table";
// import ReactTable from "./ReactTable";
// import TableActionPopover from "@/components/baseComponents/TableActionPopover";

let tabs = [
  { name: "Active" },
  { name: "Pending" },
  { name: "Closed" },
  { name: "Withdrawn" },
  { name: "Archived" },
];

const TableFields = [
  {
    name: "",
    type: "image",
    slug: "photo",
    class_name:
      "text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3",
  },
  // {
  //   name: "Status",
  //   type: "text",
  //   slug: "status",
  //   class_name:
  //     "text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3",
  // },
  {
    name: "Status",
    type: "status_menu",
    slug: "status",
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
    name: "Client",
    type: "text",
    slug: "client_name",
    class_name:
      "text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3",
  },
  {
    name: "Showings",
    type: "text",
    slug: "showings",
    class_name:
      "text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3",
  },
  {
    name: "Offers",
    type: "text",
    slug: "offers",
    class_name:
      "text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3",
  },
  {
    name: "Next Task",
    type: "text",
    slug: "nextTask",
    class_name:
      "text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3",
  },
  { name: "", type: "action", slug: "action", class_name: "" },
];

const TableSortOptions = [
  { value: 'status', label: 'Status' },
  { value: 'address', label: 'Address' },
  { value: 'client', label: 'Client' },
  { value: 'showings', label: 'Showings' },
  { value: 'offers', label: 'Offers' },
  { value: 'nextTask', label: 'Next Task' },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
const MyListings = () => {
  const dispatch = useAppDispatch();
  const myListings = useAppSelector(getMyListings);
  const user = useAppSelector(getUser);
  const [currentTab, setCurrentTab] = React.useState<string>("Active");
  const [open, setOpen] = React.useState<boolean>(false);
  const [openView, setOpenView] = React.useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = React.useState<{
    action?: string;
    state: boolean;
  }>({ action: "archive", state: false });
  const [viewData, setViewdata] = React.useState<any>(null);
  const [filteredMyListings, setFilteredMyListings] = React.useState<
    Array<any>
  >([]);
  const [editData, setEditData] = React.useState<any>(null);
  const [selectedPeople, setSelectedPeople] = React.useState<Array<any>>([]);
  const [keyword, setKeyword] = React.useState<string>("");
  const [sortType, setSortType] = React.useState<string>("Descending");
  const [sortField, setSortField] = React.useState<string>("");
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [recordsPerPage, setRecordsPerPage] = React.useState<number>(10);
  const [selectedListing, setSelectedListing] = React.useState<any>({});

  const onSetPage = (value: number) => {
    setCurrentPage(value);
  };

  const openDrawer = () => {
    let tempEditData: any = {};
    setEditData(tempEditData);
    setOpen(true);
  };

  const closeDrawer = () => {
    let tempEditData: any = {};
    setEditData(tempEditData);
    setOpen(false);
  };

  const onClickRow = (value: any) => {
    setOpenView(true);
    setViewdata(value);
  };

  const editMyListing = (value: any) => {
    setEditData(value);
    setOpen(true);
  };

  // const onSetMyListingAsFavorite = (id: any, isFavorite: number) => {
  //   const data: FavoriteMyListingsDto = {
  //     id: id,
  //     isFavorite: isFavorite,
  //     userId: user._id,
  //     search: {
  //       userId: user._id,
  //       keyword: keyword,
  //       sortType: sortType,
  //       sortField: sortField,
  //       recordsPerPage: recordsPerPage,
  //       currentPage: currentPage,
  //       status: currentTab,
  //     },
  //   };

  //   dispatch(favoriteMyListing(data)).then((res) => {
  //     try {
  //       setViewdata(
  //         res.payload.listings.find((listing: any) => listing._id === id)
  //       );
  //       setTotalCount(res.payload.totalCount);
  //     } catch (e) {
  //       notify(
  //         false,
  //         "Something went wrong while setting your listing as favorite. Please contact your support."
  //       );
  //     }
  //   });
  // };

  const deleteConfirm = () => {
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

  const changeKeyword = (keyword: string) => {
    setKeyword(keyword);
  };

  const changeSortType = (value: string) => {
    setSortType(value);
  };

  const changeSortField = (option: any) => {
    setSortField(option.label);
  };

  const filterListings = () => {
    const data: GetMyListingsDto = {
      userId: user._id,
      keyword: keyword,
      sortType: sortType,
      sortField: sortField,
      recordsPerPage: recordsPerPage,
      currentPage: currentPage,
      status: currentTab,
    };

    dispatch(getMyListingsByUserId(data)).then((res: any) => {
      try {
        setTotalCount(res.payload.totalCount);
      } catch (e) {
        notify(false, "Something went wrong.");
      }
    });
  };

  const archive = async (item: any) => {
    setSelectedListing(item);
    setOpenConfirm({ action: "archive", state: true });
    setOpenView(false);
  };

  const makeTableData = (myListings: Array<object>) => {
    let res: Array<object> = [];
    myListings.forEach((myListing: any) => {
      const updatedMyListing = {
        ...myListing,
        photo:
          (myListing.propertyPhotos && myListing.propertyPhotos[0]?.file) ||
          ListingImagePlaceholder,
        client_name:
          myListing.client.firstName + " " + myListing.client.lastName,
        action: [
          {
            name: "Edit",
            color: "black",
            icon: (
              <img
                src={Pencil}
                alt="Pencil"
                className="pl-[2px] mb-[2px] w-[15px]"
              />
            ),
          },
          {
            name: "Archive",
            color: "#C77E90",
            icon: (
              <img
                src={RecycleBin}
                alt="RecycleBin"
                width={15}
                className="pl-[2px]"
              />
            ),
          },
        ],
      };
      res.push(updatedMyListing);
    });
    return res;
  };

  const setStatus = (item: any, status: string) => {
    console.log(item, status);
    const data: SetListingStatusDto = {
      listingId: item._id,
      listingStatus: status,
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
    dispatch(setListingStatus(data)).then((res: any) => {
      try {
        setTotalCount(res.payload.totalCount);
        notify(res.payload.success, res.payload.message);
      } catch (e) {
        notify(false, "Something went wrong.");
      }
    });
  };

  React.useEffect(() => {
    setRecordsPerPage(10);
    const data: GetMyListingsDto = {
      userId: user._id,
      keyword: keyword,
      sortType: sortType,
      sortField: sortField,
      recordsPerPage: recordsPerPage,
      currentPage: currentPage,
      status: currentTab,
    };

    dispatch(getMyListingsByUserId(data)).then((res: any) => {
      try {
        setTotalCount(res.payload.totalCount);
      } catch (e) {
        notify(false, "Something went wrong.");
      }
    });
  }, []);

  React.useEffect(() => {
    const tableData = makeTableData(myListings);
    setFilteredMyListings(tableData);
    setRecordsPerPage(10);
    setSelectedPeople([]);
  }, [myListings]);

  React.useEffect(() => {
    setRecordsPerPage(10);
    const data: GetMyListingsDto = {
      userId: user._id,
      keyword: keyword,
      sortType: sortType,
      sortField: sortField,
      recordsPerPage: recordsPerPage,
      currentPage: currentPage,
      status: currentTab,
    };

    dispatch(getMyListingsByUserId(data)).then((res: any) => {
      try {
        setTotalCount(res.payload.totalCount);
      } catch (e) {
        notify(false, "Something went wrong.");
      }
    });
  }, [currentTab]);

  // const columns = React.useMemo<ColumnDef<IMyListing>[]>(
  //     () => [
  //         {
  //             header: '',
  //             accessorKey: 'propertyPhotos',
  //             cell: info => <img src={info.row.original.propertyPhotos[0].file} className='aspect-square rounded-md w-[4rem]' />,
  //             enableColumnFilter: false,
  //             enableResizing: false,
  //             size: 100
  //         },
  //         {
  //             header: 'Status',
  //             accessorKey: 'status',
  //             cell: info => info.getValue(),
  //         },
  //         {
  //             header: 'Address',
  //             accessorKey: 'listingAddress',
  //             cell: info => info.getValue(),
  //         },
  //         {
  //             header: 'Client',
  //             accessorFn: (row: any) => `${row.client.firstName} ${row.client.lastName}`,
  //             cell: (info: any) => `${info.row.original.client.firstName} ${info.row.original.client.lastName}`,
  //         },
  //         {
  //             header: 'Showings',
  //             accessorKey: 'showings',
  //             cell: () => 0,
  //         },
  //         {
  //             header: 'Offers',
  //             accessorKey: 'offers',
  //             cell: () => 0,
  //         },
  //         {
  //             header: 'Next Task',
  //             accessorKey: 'nextTask',
  //             cell: () => '-',
  //         },
  //         {
  //             header: '',
  //             accessorKey: 'action',
  //             cell: info => <TableActionPopover data={info.row.original} onEdit={editMyListing} onArchive={archive} />,
  //             size: 50,
  //             enableResizing: false
  //         }
  //     ],
  //     []
  // )

  return (
    <div className="p-8">
      {(open || openView) && (
        <div className="!bg-[#00000040] h-screen w-full fixed top-0 left-0 z-0"></div>
      )}
      <Drawer
        open={open}
        closeDrawer={closeDrawer}
        changeState={setOpen}
        setOpenConfirm={setOpenConfirm}
        data={editData}
        keyword={keyword}
        sortType={sortType}
        sortField={sortField}
        currentPage={currentPage}
        recordsPerPage={recordsPerPage}
        setTotalCount={setTotalCount}
        setCurrentPage={setCurrentPage}
        currentTab={currentTab}
      />
      <View open={openView} changeState={setOpenView} data={viewData} />

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
                  Are you sure you want to {openConfirm.action}{" "}
                  {selectedPeople.length > 1
                    ? "these listings"
                    : "this listing"}
                  ?
                </Typography>
              </div>
              <div className="flex gap-[15px] justify-center mt-[20px] mb-[10px]">
                <div
                  className="bg-[#C18193] hover:bg-[#B17183] w-[100px] h-[40px] rounded flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    openConfirm.action === "archive"
                      ? deleteConfirm()
                      : setOpen(false);
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
                My Listings
              </Typography>
              <div className="flex gap-3 block lg:hidden">
                <div className="flex items-center gap-5 min-[900px]:hidden">
                  <Filter
                    changeKeyword={changeKeyword}
                    keyword={keyword}
                    filterLeads={filterListings}
                  />
                  <Sort
                    sortType={sortType}
                    sortField={sortField}
                    changeSortField={changeSortField}
                    changeSortType={changeSortType}
                    filterLeads={filterListings}
                    options={TableSortOptions}
                  />
                  <Typography variant="page-menu" color="secondary">
                    Import Listing
                  </Typography>
                </div>
                <Button onClick={() => openDrawer()}>
                  <Typography variant="button2">Add Listing</Typography>
                </Button>
              </div>
            </div>
            <nav
              className="-mb-px flex items-center justify-between w-full"
              aria-label="Tabs"
            >
              <div className="flex items-center gap-2">
                {tabs.map((tab, index) => (
                  <div
                    key={index}
                    className={classNames(
                      tab.name === currentTab
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                      "whitespace-nowrap border-b-2 p-1 cursor-pointer"
                    )}
                    aria-current={tab.name === currentTab ? "page" : undefined}
                    onClick={() => setCurrentTab(tab.name)}
                  >
                    <Typography variant="page-menu">{tab.name}</Typography>
                  </div>
                ))}
              </div>
              <div className="lg:flex items-center gap-3">
                <div className="flex items-center gap-3 hidden min-[900px]:flex">
                  <Filter
                    changeKeyword={changeKeyword}
                    keyword={keyword}
                    filterLeads={filterListings}
                  />
                  <Sort
                    sortType={sortType}
                    sortField={sortField}
                    changeSortField={changeSortField}
                    changeSortType={changeSortType}
                    filterLeads={filterListings}
                    options={TableSortOptions}
                  />
                  <Typography
                    variant="page-menu"
                    color="secondary"
                    className="cursor-pointer whitespace-nowrap"
                  >
                    Import Listing
                  </Typography>
                </div>
                <Button
                  className="hidden lg:block"
                  onClick={() => openDrawer()}
                >
                  <Typography variant="button2" className="whitespace-nowrap">
                    Add Listing
                  </Typography>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <AdvancedTable
          class_name="showing_table table grid grid-cols-8 items-center"
          data={filteredMyListings}
          fields={TableFields}
          onClickRow={onClickRow}
          setStatus={setStatus}
          totalPage={Math.ceil(totalCount / recordsPerPage)}
          totalCount={totalCount}
          currentPage={currentPage}
          recordsPerpage={recordsPerPage}
          onSetPage={onSetPage}
          editRow={editMyListing}
          deleteRow={archive}
          emptyStateProps={{
            heading: "Let's add your listings",
            content:
              "After you add your listings, you’ll unlock ultimate listing management and productivity.",
            buttonText: "Add a Listing",
            onButtonClick: () => openDrawer(),
          }}
          minCellWidth={170}
        />
      </div>
    </div>
  );
};

export default MyListings;
