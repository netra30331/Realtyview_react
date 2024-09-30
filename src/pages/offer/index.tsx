import React from "react";
import AdvancedTable from "@/components/baseComponents/AdvancedTable";
import Typography from "@/components/baseComponents/Typography";
import { Button } from "@/components/baseComponents/Button";
import SubmitOffer from "./SubmitOffer";
import { getUser } from "@/redux/user/userSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { notify } from "@/shared/services/notify";
import { DeleteOffersDto, GetOffersDto } from "@/shared/interfaces/interfaces";
import Filter from "@/components/mainComponents/Filter";
import SortAdvanced from "@/components/mainComponents/SortAdvanced";
import { MdEdit, MdDelete, MdOutlineMoveToInbox } from "react-icons/md";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FaRegPaperPlane } from "react-icons/fa";
import ViewOfferDrawer from "./ViewOfferDrawer";
import {
  deleteOffers,
  getOffers,
  getOffersByUserId,
} from "@/redux/offer/offerSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const tabs = [
  { name: "All" },
  { name: "Sent" },
  { name: "Received" },
  { name: "Archived" },
];

const TableFields = [
  {
    name: "",
    type: "image",
    slug: "image_src",
    class_name:
      "text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3",
  },
  {
    name: "",
    type: "icon",
    slug: "icon",
    class_name:
      "text-center text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3",
  },
  {
    name: "Status",
    type: "text",
    slug: "status",
    class_name:
      "text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3",
  },
  {
    name: "Address",
    type: "text",
    slug: "address",
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
    name: "Offer",
    type: "text",
    slug: "offer",
    class_name:
      "text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3",
  },
  {
    name: "Representing",
    type: "text",
    slug: "representing",
    class_name:
      "text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3",
  },
  {
    name: "",
    type: "text",
    slug: "date_time",
    class_name:
      "text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3",
  },
  {
    name: "",
    type: "action",
    slug: "action",
    class_name:
      "text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3",
  },
];

const SortFieldOptions = [
  { value: "address", label: "Address" },
  { value: "client_name", label: "Client" },
  { value: "offer", label: "Offer" },
  { value: "representing", label: "Representing" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
const Offer = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const offers = useAppSelector(getOffers);
  const [currentTab, setCurrentTab] = React.useState<string>("All");
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
  const [openViewDrawer, setOpenViewDrawer] = React.useState<boolean>(false);
  // const [viewData, setViewdata] = React.useState<any>(null)
  const [openConfirm, setOpenConfirm] = React.useState<boolean>(false);
  const [filteredData, setFilteredData] = React.useState<Array<any>>([]);
  const [keyword, setKeyword] = React.useState<string>("");
  const [sortType, setSortType] = React.useState<string>("Descending");
  const [sortField, setSortField] = React.useState<string>("Address");
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [recordsPerPage, setRecordsPerPage] = React.useState<number>(10);
  const [selectedRowData, setSelectedRowData] = React.useState<any>(null);

  const goPage = (page: string) => {
    navigate("/app/" + page);
  };

  const onSetPage = (value: number) => {
    setCurrentPage(value);
  };

  const onClickRow = (value: any) => {
    setOpenViewDrawer(true);
    setSelectedRowData(value);
  };

  const changeKeyword = (keyword: string) => {
    setKeyword(keyword);
  };
  const changeSortType = (value: string) => {
    setSortType(value);
  };
  const changeSortField = (value: string) => {
    setSortField(value);
  };
  const filterData = () => {
    const data: GetOffersDto = {
      userId: user._id,
      keyword: keyword,
      sortType: sortType,
      sortField: sortField,
      recordsPerPage: recordsPerPage,
      currentPage: currentPage,
      status: currentTab,
    };
    dispatch(getOffersByUserId(data)).then((res: any) => {
      try {
        setTotalCount(res.payload.totalCount);
        const table_data = makeTableData(res.payload.offers);
        setFilteredData(table_data);
        // notify(res.payload.success, res.payload.message)
      } catch (e) {
        notify(false, "Something went wrong.");
      }
    });
  };

  const openNewSubmitDrawer = () => {
    setOpenDrawer(true);
    setSelectedRowData(null);
  };
  const editRow = (data: any) => {
    setSelectedRowData(data);
    setOpenDrawer(true);
  };
  const deleteRow = (data: any) => {
    setSelectedRowData(data);
    setOpenConfirm(true);
  };

  const makeTableData = (data: Array<object>) => {
    const res: Array<object> = [];
    data.map((item: any) => {
      const new_item = JSON.parse(JSON.stringify(item));
      new_item.status = item.owner?._id === user._id ? "Sent" : "Received";
      new_item.address = new_item?.listing?.listingAddress;
      new_item.client_name =
        new_item?.client?.firstName + " " + new_item?.client?.lastName;
      new_item.offer = "$" + new_item?.offerAmount;
      new_item.representing = new_item.client.leadType;
      new_item.image_src = new_item?.listing?.propertyPhotos
        ? new_item?.listing?.propertyPhotos[0]?.file
        : "";
      new_item.action = [
        { name: "Edit", icon: <MdEdit className="mt-1" />, color: "black" },
        {
          name: "Archive",
          icon: <MdDelete className="text-[#C77E90] mt-1" />,
          color: "#C77E90",
        },
      ];
      if (item.icon == "paper") {
        new_item.icon = <FaRegPaperPlane />;
      }
      if (item.icon == "move_inbox") {
        new_item.icon = <MdOutlineMoveToInbox />;
      }
      res.push(new_item);
    });
    return res;
  };

  const archiveOffer = () => {
    console.log(selectedRowData);
    let archivingToast = toast.loading("Archiving your offer");
    let ids: Array<string> = [];
    ids.push(selectedRowData._id);

    const data: DeleteOffersDto = {
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

    dispatch(deleteOffers(data)).then((res) => {
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
            "Something went wrong while archiving your offer. Please try again.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    });
  };
  React.useEffect(() => {
    const table_data = makeTableData(offers);
    setFilteredData(table_data);
  }, [offers]);

  React.useEffect(() => {
    filterData();
  }, [currentTab]);
  React.useEffect(() => {
    setRecordsPerPage(10);
    filterData();
  }, []);
  React.useEffect(() => {
    filterData();
  }, [currentPage]);

  return (
    <div>
      {(openDrawer || openViewDrawer) && (
        <div className="!bg-[#00000040] h-screen w-full fixed top-0 left-0 z-10"></div>
      )}
      <SubmitOffer
        search_list_flag={true}
        open={openDrawer}
        changeState={setOpenDrawer}
        data={selectedRowData}
        keyword={keyword}
        sortType={sortType}
        sortField={sortField}
        currentPage={currentPage}
        currentTab={currentTab}
        recordsPerPage={recordsPerPage}
        setTotalCount={setTotalCount}
        setCurrentPage={setCurrentPage}
      />
      <ViewOfferDrawer
        open={openViewDrawer}
        changeViewDrawer={setOpenViewDrawer}
        data={selectedRowData}
      />
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
                <div
                  onClick={archiveOffer}
                  className="bg-[#C18193] hover:bg-[#B17183] mr-4 w-[146px] h-[40px] rounded flex items-center justify-center cursor-pointer"
                >
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
      <div className="p-10">
        <div className="block">
          <div className="min-[1300px]:flex gap-8">
            <div className="flex max-[570px]:flex-col min-[570px]:items-end min-[570px]:justify-between max-[1300px]:mb-3">
              <Typography
                variant="h2"
                color="primary"
                className="whitespace-nowrap py-1"
              >
                Offer Inbox
              </Typography>
              <div className="flex gap-5 block min-[1300px]:hidden">
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
                <Button onClick={() => openNewSubmitDrawer()}>
                  <Typography variant="button1">Submit an Offer</Typography>
                </Button>
              </div>
            </div>
            <nav
              className="-mb-px flex justify-between w-full"
              aria-label="Tabs"
            >
              <div className="flex items-center gap-8">
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
              <div className="min-[1300px]:flex max-[1300px]:pt-4 items-center max-[1320px]:gap-2 gap-8">
                <div className="flex items-center gap-8 hidden min-[900px]:flex">
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
                  className="hidden min-[1300px]:block"
                  onClick={() => openNewSubmitDrawer()}
                >
                  <Typography variant="button1">Submit an Offer</Typography>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="px-10 pb-10">
        <AdvancedTable
          minCellWidth={100}
          class_name="showing_table table offer-table grid grid-cols-9 items-center"
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
            heading: "Submit an Offer",
            content:
              "Search for the listing you will submit an offer on.",
            buttonText: "Search Listings",
            onButtonClick: () => goPage('listings'),
          }}
        />
      </div>
    </div>
  );
};

export default Offer;
