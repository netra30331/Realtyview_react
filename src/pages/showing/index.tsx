import React from "react";
import AdvancedTable from "@/components/baseComponents/AdvancedTable";
import Typography from "@/components/baseComponents/Typography";
// import RecycleBin from '@/assets/images/recylebin.svg'
import { Button } from "@/components/baseComponents/Button";
import View from "./View";
import {
  getShowings,
  getShowingsByUserId,
  showingReschedule,
  updateShowingStatus,
} from "@/redux/showing/showingSlice";
import { getUser } from "@/redux/user/userSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { notify } from "@/shared/services/notify";
import {
  GetShowingsDto,
  showingRescheduleStatusDto,
  updateShowingStatusDto,
} from "@/shared/interfaces/interfaces";
import Filter from "@/components/mainComponents/Filter";
import SortAdvanced from "@/components/mainComponents/SortAdvanced";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import DetailsModal from "./DetailsModal";
import RescheduleModal from "./RescheduleModal";
import ListingImagePlaceholder from "@/assets/images/listing_image_placeholder.png";
import Drawer from "./Drawer";

const tabs = [
  { name: "All" },
  { name: "Pending" },
  { name: "Confirmed" },
  { name: "Denied" },
  { name: "Past" },
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
    type: "text",
    slug: "is_received",
    class_name:
      "text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3",
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
    slug: "client",
    class_name:
      "text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3",
  },
  {
    name: "Date",
    type: "text",
    slug: "date",
    class_name:
      "text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3",
  },
  {
    name: "Time",
    type: "text",
    slug: "time",
    class_name:
      "text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3",
  },
  {
    name: "Agent",
    type: "text",
    slug: "agent",
    class_name:
      "text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3",
  },
  { name: "", type: "action", slug: "action", class_name: "" },
];

const SortFieldOptions = [
  { value: "address", label: "Address" },
  { value: "client", label: "Client" },
  { value: "agent", label: "Agent" },
  { value: "date", label: "Date" },
];

const sent_status = [
  { id: "All", title: "All" },
  { id: "Sent", title: "Sent" },
  { id: "Received", title: "Received" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
const Showing = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const showings = useAppSelector(getShowings);
  console.log(showings);
  const user = useAppSelector(getUser);
  const [currentTab, setCurrentTab] = React.useState<string>("All");
  const [openView, setOpenView] = React.useState<boolean>(false);
  const [viewData, setViewdata] = React.useState<any>(null);
  const [filteredData, setFilteredData] = React.useState<Array<any>>([]);
  const [keyword, setKeyword] = React.useState<string>("");
  const [sortType, setSortType] = React.useState<string>("Descending");
  const [sortField, setSortField] = React.useState<string>("Address");
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [recordsPerPage, setRecordsPerPage] = React.useState<number>(10);
  const [currentSentStatus, setCurrentSentStatus] = React.useState<string>("All");
  const [openDetailsModal, setOpenDetailsModal] = React.useState<boolean>(false);
  const [openRescheduleModal, setOpenRescheduleModal] = React.useState<boolean>(false);

  const onSetPage = (value: number) => {
    setCurrentPage(value);
  };

  const onClickRow = (value: any) => {
    setViewdata(value);
    setOpenDetailsModal(true);
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
    const data: GetShowingsDto = {
      userId: user._id,
      keyword: keyword,
      sortType: sortType,
      sortField: sortField,
      recordsPerPage: recordsPerPage,
      currentPage: currentPage,
      status: currentTab,
      sentStatus: currentSentStatus,
    };
    dispatch(getShowingsByUserId(data)).then((res) => {
      try {
        setTotalCount(res.payload.totalCount);
        setTotalCount(res.payload.totalCount);
        const table_data = makeTableData(res.payload.showings, currentTab);
        setFilteredData(table_data);
      } catch (e) {
        notify(false, "Something went wrong.");
      }
    });
  };

  const onRescheduleShowing = (item: any) => {
    setViewdata(item);
    setOpenDetailsModal(false);
    setOpenRescheduleModal(true);
  };

  const makeTableData = (data: Array<object>, current_tab: string) => {
    const res: Array<object> = [];
    data.map((item: any) => {
      const new_item = JSON.parse(JSON.stringify(item));

      if (current_tab == "All" || current_tab == item.status) {
        // new_item.status = STATUS[item.status];
        new_item.is_received =
          item.owner?._id === user._id ? "Sent" : "Received";
        new_item.address = item.listing?.listingAddress;
        new_item.agent = item.listing?.owner?.agent?.firstName + " " + item.listing?.owner?.agent?.lastName;
        new_item.client = item.listing?.client?.firstName + " " + item.listing?.client?.lastName;
        new_item.date = item.dateTime
          ? format(new Date(item.dateTime), "yyyy-MM-dd")
          : "";
        new_item.time = item.dateTime
          ? format(new Date(item.dateTime), "hh:mm")
          : "";
        new_item.image_src =
          item.listing &&
            item.listing.propertyPhotos &&
            item.listing.propertyPhotos.length > 0
            ? item.listing.propertyPhotos[0].file
            : ListingImagePlaceholder;
        new_item.action = [
          {
            name: "Reschedule",
            color: "black",
            icon: "",
          },
        ];
        res.push(new_item);
      }
    });
    return res;
  };

  const goPage = (page: string) => {
    navigate("/app/" + page);
  };

  const updateStatus = (status: string) => {
    if (status === "Confirm" || status === "Denied") {
      const data: updateShowingStatusDto = {
        showingId: viewData?._id,
        status: status,
        userId: user._id,
        search: {
          userId: user._id,
          keyword: keyword,
          sortType: sortType,
          sortField: sortField,
          recordsPerPage: recordsPerPage,
          currentPage: currentPage,
          status: currentTab,
          sentStatus: currentSentStatus,
        },
      };

      dispatch(updateShowingStatus(data)).then((res: any) => {
        try {
          setTotalCount(res.payload.totalCount);
          const table_data = makeTableData(res.payload.showings, currentTab);
          setFilteredData(table_data);
          setOpenView(false);
          setOpenDetailsModal(false);
          notify(res.payload.success, res.payload.message);
        } catch (e) {
          notify(false, "Something went wrong.");
        }
      });
    }
  };

  const reschedule = (dateTime: Date) => {
    const data: showingRescheduleStatusDto = {
      showingId: viewData?._id,
      userId: user._id,
      dateTime: dateTime,
      search: {
        userId: user._id,
        keyword: keyword,
        sortType: sortType,
        sortField: sortField,
        recordsPerPage: recordsPerPage,
        currentPage: currentPage,
        status: currentTab,
        sentStatus: currentSentStatus,
      },
    };

    dispatch(showingReschedule(data)).then((res: any) => {
      try {
        setTotalCount(res.payload.totalCount);
        const table_data = makeTableData(res.payload.showings, currentTab);
        setFilteredData(table_data);
        setOpenRescheduleModal(false);
        notify(res.payload.success, res.payload.message);
      } catch (e) {
        notify(false, "Something went wrong.");
      }
    });
  };

  const sentStatusFilter = (value: string) => {
    setCurrentSentStatus(value);
  };
  React.useEffect(() => {
    if (showings) {
      filterData();
    }
  }, [currentTab, currentSentStatus]);

  React.useEffect(() => {
    setRecordsPerPage(10);
    const data: GetShowingsDto = {
      userId: user._id,
      keyword: keyword,
      sortType: sortType,
      sortField: sortField,
      recordsPerPage: recordsPerPage,
      currentPage: currentPage,
      status: currentTab,
      sentStatus: currentSentStatus,
    };
    dispatch(getShowingsByUserId(data)).then((res: any) => {
      try {
        const table_data = makeTableData(res.payload.showings, currentTab);
        setFilteredData(table_data);
        setTotalCount(res.payload.totalCount);
        console.log(res.payload);
      } catch (e) {
        notify(false, "Something went wrong.");
      }
    });
  }, []);
  React.useEffect(() => {
    const data: GetShowingsDto = {
      userId: user._id,
      keyword: keyword,
      sortType: sortType,
      sortField: sortField,
      recordsPerPage: recordsPerPage,
      currentPage: currentPage,
      status: currentTab,
      sentStatus: currentSentStatus,
    };
    dispatch(getShowingsByUserId(data)).then((res) => {
      try {
        setTotalCount(res.payload.totalCount);
        // notify(res.payload.success, res.payload.message)
      } catch (e) {
        notify(false, "Something went wrong.");
      }
    });
  }, [currentPage]);

  return (
    <div>
      {(openView || openDetailsModal || openRescheduleModal) && (
        <div className="!bg-[#00000040] h-screen w-full fixed top-0 left-0 z-10"></div>
      )}
      <View
        open={openView}
        changeState={setOpenView}
        data={viewData}
        updateStatus={updateStatus}
        onRescheduleShowing={onRescheduleShowing}
      />
      <DetailsModal
        open={openDetailsModal}
        closeModal={() => setOpenDetailsModal(false)}
        data={viewData}
        updateStatus={updateStatus}
        onRescheduleShowing={onRescheduleShowing}
      />
      <RescheduleModal
        open={openRescheduleModal}
        closeModal={() => setOpenRescheduleModal(false)}
        data={viewData}
        reschedule={reschedule}
      />
      <Drawer open={openDetailsModal} changeState={() => setOpenDetailsModal(false)} data={viewData} />

      <div className="p-10">
        <div className="block">
          <div className="min-[1300px]:flex gap-8">
            <div className="flex max-[570px]:flex-col min-[570px]:items-end min-[570px]:justify-between max-[1300px]:mb-3">
              <Typography
                variant="h2"
                color="primary"
                className="whitespace-nowrap py-1"
              >
                Showings
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
                <Button onClick={() => goPage("listings")}>
                  <Typography variant="button1">Search Listings</Typography>
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
                  <div className="space-x-2 flex">
                    {sent_status.map((status) => (
                      <div key={status.id} className="flex items-center">
                        <input
                          id={status.id}
                          name="sent-method"
                          type="radio"
                          defaultChecked={status.id === "All"}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          onChange={(e) => sentStatusFilter(e.target.id)}
                        />
                        <label
                          htmlFor={status.id}
                          className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                        >
                          {status.title}
                        </label>
                      </div>
                    ))}
                  </div>
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
                  onClick={() => goPage("listings")}
                >
                  <Typography variant="button1">Search Listings</Typography>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="px-10 pb-10">
        <AdvancedTable
          minCellWidth={100}
          class_name="showing_table table grid grid-cols-9 items-center"
          data={filteredData}
          fields={TableFields}
          onClickRow={onClickRow}
          totalPage={Math.ceil(totalCount / recordsPerPage)}
          totalCount={totalCount}
          currentPage={currentPage}
          recordsPerpage={recordsPerPage}
          onSetPage={onSetPage}
          rescheduleRow={onRescheduleShowing}
          emptyStateProps={{
            heading: "Request a Showing",
            content:
              "Search for the listing you want to request to show.",
            buttonText: "Search Listings",
            onButtonClick: () => goPage('listings'),
          }}
        />
      </div>
    </div>
  );
};

export default Showing;
