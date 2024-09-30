import React from 'react'
import Table from '@/components/baseComponents/table'
import Typography from '@/components/baseComponents/Typography'
import RecycleBin from '@/assets/images/recylebin.svg'
import { Button } from '@/components/baseComponents/Button'
import Drawer from './Drawer'
import View from './View'
import { getClients, getClientsByUserId, deleteClients } from '@/redux/client/clientSlice'
import {
  convertToClientLeads,
  setLeadRating,
  setLeadStatus,
} from "@/redux/lead/leadSlice";
import { getUser } from "@/redux/user/userSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { notify } from "@/shared/services/notify";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ConvertToClientDto,
  DeleteClientsDto,
  GetClientsDto,
  SetLeadStatusDto,
  SetRatingDto,
} from "@/shared/interfaces/interfaces";
import Filter from "@/components/mainComponents/Filter";
import Sort from "@/components/mainComponents/Sort";
// import AdvancedTable from '@/components/baseComponents/AdvancedTable'
import { MdDelete, MdEdit } from 'react-icons/md'

let tabs = [
  { name: "All" },
  { name: "Buyer" },
  { name: "Seller" },
  // { name: 'Renter' },
  // { name: 'Landlord' },
];
// const TableFields = [
//   {name:'', type:'checkbox', slug:'avatarURL', class_name:'text-left py-3.5 pl-0 pr-1 lg:pr-2', image_size: 'w-[3.125rem] h-[3.125rem] max-w-none'},
//   {name:'Name',type:'text', slug:'name', class_name:'text-left text-gray-900 text-sm font-semibold py-3.5'},
//   {name:'Email', type:'text', slug:'contactEmail', class_name:'text-left text-gray-900 text-sm font-semibold py-3.5'},
//   {name:'Phone', type:'text', slug:'mobileNumber', class_name:'text-left text-gray-900 text-sm font-semibold py-3.5'},
//   {name:'Client Type', type:'text', slug:'clientType', class_name:'text-left text-gray-900 text-sm font-semibold py-3.5'},
//   {name:'Status',type:'text', slug:'status', class_name:'text-left text-gray-900 text-sm font-semibold py-3.5'},
// ];


function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
const Client = () => {
  const dispatch = useAppDispatch();
  const clients = useAppSelector(getClients);
  const user = useAppSelector(getUser);
  const [currentTab, setCurrentTab] = React.useState<string>("All");
  const [open, setOpen] = React.useState<boolean>(false);
  const [openView, setOpenView] = React.useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = React.useState<boolean>(false);
  const [viewData, setViewdata] = React.useState<any>(null);
  const [filteredClients, setFilteredClients] = React.useState<Array<any>>([]);
  const [editData, setEditData] = React.useState<any>(null);
  const [selectedPeople, setSelectedPeople] = React.useState<Array<any>>([]);
  const [keyword, setKeyword] = React.useState<string>("");
  const [sortType, setSortType] = React.useState<string>("Descending");
  const [sortField, setSortField] = React.useState<string>("Date");
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [recordsPerPage, setRecordsPerPage] = React.useState<number>(10);
  const [selectedLead, setSelectedLead] = React.useState<any>({});
  const onSetPage = (value: number) => {
    console.log(value);
    setCurrentPage(value);
  };
  const openDrawer = () => {
    setOpen(true);
    setEditData(null);
  };

  const onClickRow = (value: any) => {
    setOpenView(true);
    setViewdata(value);
  };

  const editLead = (value: any) => {
    setEditData(value);
    setOpen(true);
  };
  const changeSelectedPeople = (value: any) => {
    setSelectedPeople(value);
  };
  const deleteOpenModal = () => {
    if (selectedPeople.length > 0) {
      setOpenConfirm(true);
    } else {
      notify(
        false,
        "Please select one or more clients that you wish to archive."
      );
    }
  };
  const deleteConfirm = () => {
    let ids: Array<string> = [];
    if (selectedPeople.length === 0 && selectedLead) {
      ids = [selectedLead._id];
    } else {
      ids = selectedPeople.map((lead: any) => {
        return lead._id;
      });
    }
    const data: DeleteClientsDto = {
      ids: ids,
      userId: user._id,
      search: {
        userId: user._id,
        keyword: keyword,
        sortType: sortType,
        sortField: sortField,
        recordsPerPage: recordsPerPage,
        currentPage: currentPage,
      },
    };
    dispatch(deleteClients(data)).then((res) => {
      try {
        setTotalCount(res.payload.totalCount);
        notify(res.payload.success, res.payload.message);
      } catch (e) {
        notify(false, "Something went wrong.");
      }
    });
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
  const filterClients = () => {
    const data: GetClientsDto = {
      userId: user._id,
      keyword: keyword,
      sortType: sortType,
      sortField: sortField,
      recordsPerPage: recordsPerPage,
      currentPage: currentPage,
    };
    dispatch(getClientsByUserId(data)).then((res) => {
      try {
        console.log("=================", res.payload);
        setTotalCount(res.payload.totalCount);
        // notify(res.payload.success, res.payload.message)
      } catch (e) {
        notify(false, "Something went wrong.");
      }
    });
  };

  const archive = async (item: any) => {
    console.log(item);
    setSelectedLead(item);
    setOpenConfirm(true);
  };

  const convertToClient = async (item: any, toClient: boolean) => {
    const data: ConvertToClientDto = {
      leadId: item._id,
      toClient: toClient,
      search: {
        userId: user._id,
        keyword: keyword,
        sortType: sortType,
        sortField: sortField,
        recordsPerPage: recordsPerPage,
        currentPage: currentPage,
      },
    };
    dispatch(convertToClientLeads(data)).then((res: any) => {
      try {
        setTotalCount(res.payload.totalCount);
        filterData();
        notify(res.payload.success, res.payload.message);
      } catch (e) {
        notify(false, "Something went wrong.");
      }
    });
    setOpenView(false);
  };

  const setRating = async (item: any, value: string) => {
    console.log(item, value);
    console.log(item);
    const data: SetRatingDto = {
      leadId: item._id,
      rating: value,
      search: {
        userId: user._id,
        keyword: keyword,
        sortType: sortType,
        sortField: sortField,
        recordsPerPage: recordsPerPage,
        currentPage: currentPage,
      },
    };
    dispatch(setLeadRating(data)).then((res) => {
      try {
        setTotalCount(res.payload.totalCount);
        notify(res.payload.success, res.payload.message);
        filterClients();
      } catch (e) {
        notify(false, "Something went wrong.");
      }
    });
  };

  const setStatus = async (item: any, value: string) => {
    const data: SetLeadStatusDto = {
      leadId: item._id,
      leadStatus: value,
      search: {
        userId: user._id,
        keyword: keyword,
        sortType: sortType,
        sortField: sortField,
        recordsPerPage: recordsPerPage,
        currentPage: currentPage,
      },
    };
    dispatch(setLeadStatus(data)).then((res) => {
      try {
        setTotalCount(res.payload.totalCount);
        filterClients();
        notify(res.payload.success, res.payload.message);
      } catch (e) {
        notify(false, "Something went wrong.");
      }
    });
  };

  const filterData = () => {
    setRecordsPerPage(10);
    const data: GetClientsDto = {
      userId: user._id,
      keyword: keyword,
      sortType: sortType,
      sortField: sortField,
      recordsPerPage: recordsPerPage,
      currentPage: currentPage,
    };
    dispatch(getClientsByUserId(data)).then((res) => {
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

    data !== undefined && data.map((item:any) => {
        const new_item = JSON.parse(JSON.stringify(item));
        
        // new_item.iconGraph = icon_graph;
        
        // if (new_item.favorite === 'activeDeal') {
        //     new_item.iconStar = icon_star_connected;
        // } else if (new_item.favorite === 'favorite') {
        //     new_item.iconStar = icon_star_priority;
        // } else {
        //     new_item.iconStar = icon_star_unconnected;
        // }

        // new_item.favoriteAction = [
        //     {name:'Colleague', image: <img src={icon_star_unconnected} className='w-[1rem] h-[1rem] max-w-none' />, icon:<MdEdit className="my-3"/>, color:'black'},
        //     {name:'Active Deal', image: <img src={icon_star_connected} className='w-[1rem] h-[1rem] max-w-none'/>, icon:<MdDelete className="text-[#C77E90] mt-1"/>, color:'#C77E90'},
        //     {name:'Favorite', image: <img src={icon_star_priority} className='w-[1rem] h-[1rem] max-w-none'/>, icon:<MdDelete className="text-[#C77E90] mt-1"/>, color:'#C77E90'}
        // ]

        new_item.name = item.firstName + " " + item.lastName;
        new_item.action = [
            {name:'Edit', icon:<MdEdit className="mt-1"/>, color:'black'},
            {name:'Archive', icon:<MdDelete className="text-[#C77E90] mt-1"/>, color:'#C77E90'}
        ];
        
        res.push(new_item);
    })
    return res;
}

  React.useEffect(() => {
    let temp = clients.filter(
      (client: any) => client.leadType === currentTab && client.isArchived === 0
    );
    if (currentTab === "All") {
      var tableData = makeTableData(clients.filter((client: any) => client.isArchived === 0));
      setFilteredClients(tableData);
      setTotalCount(
        clients.filter((client: any) => client.isArchived === 0).length
      );
    } else {
      setFilteredClients(temp);
      setTotalCount(temp.length);
    }
  }, [clients, currentTab]);
  React.useEffect(() => {
    setRecordsPerPage(10);
    const data: GetClientsDto = {
      userId: user._id,
      keyword: keyword,
      sortType: sortType,
      sortField: sortField,
      recordsPerPage: recordsPerPage,
      currentPage: currentPage,
    };
    dispatch(getClientsByUserId(data)).then((res) => {
      try {
        setTotalCount(res.payload.totalCount);
        // notify(res.payload.success, res.payload.message)
      } catch (e) {
        notify(false, "Something went wrong.");
      }
    });
  }, []);
  React.useEffect(() => {
    const data: GetClientsDto = {
      userId: user._id,
      keyword: keyword,
      sortType: sortType,
      sortField: sortField,
      recordsPerPage: recordsPerPage,
      currentPage: currentPage,
    };
    dispatch(getClientsByUserId(data)).then((res) => {
      try {
        setTotalCount(res.payload.totalCount);
        // notify(res.payload.success, res.payload.message)
      } catch (e) {
        notify(false, "Something went wrong.");
      }
    });
  }, [currentPage]);
  return (
    <div className="p-8">
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
                  Are you sure you want to archive{" "}
                  {selectedPeople.length > 1 ? "these clients" : "this lead"}?
                </Typography>
              </div>
              <div className="flex justify-center mt-[20px] mb-[10px]">
                <div
                  className="bg-[#C18193] hover:bg-[#B17183] w-[146px] h-[40px] rounded flex items-center justify-center cursor-pointer"
                  onClick={() => deleteConfirm()}
                >
                  <Typography variant="button2" className="text-[#B32F43]">
                    Archive
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {(open || openView) && (
        <div className="!bg-[#00000040] h-screen w-full fixed top-0 left-0 z-10"></div>
      )}
      <Drawer
        open={open}
        changeState={setOpen}
        data={editData}
        keyword={keyword}
        sortType={sortType}
        sortField={sortField}
        currentPage={currentPage}
        recordsPerPage={recordsPerPage}
        setTotalCount={setTotalCount}
        setCurrentPage={setCurrentPage}
      />
      <View
        open={openView}
        changeState={setOpenView}
        data={viewData}
        setStatus={setStatus}
        setRating={setRating}
        convertToClient={convertToClient}
        archive={archive}
        editLead={editLead}
      />
      <div>
        <div className="block">
          <div className="lg:flex items-center gap-3">
            <div className="flex max-[570px]:flex-col min-[570px]:items-end min-[570px]:justify-between sm:max-lg:mb-3">
              <Typography
                variant="h2"
                color="primary"
                className="whitespace-nowrap"
              >
                Clients
              </Typography>
              <div className="flex gap-3 block lg:hidden">
                <div className="flex items-center gap-5 min-[900px]:hidden">
                  <img
                    src={RecycleBin}
                    alt="recyclebin"
                    className="cursor-pointer"
                    onClick={() => deleteOpenModal()}
                  />
                  <Filter
                    changeKeyword={changeKeyword}
                    keyword={keyword}
                    filterLeads={filterClients}
                  />
                  <Sort
                    sortType={sortType}
                    sortField={sortField}
                    changeSortField={changeSortField}
                    changeSortType={changeSortType}
                    filterLeads={filterClients}
                  />
                </div>
                <Button onClick={() => openDrawer()}>
                  <Typography variant="button2">Add Client</Typography>
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
                  <img
                    src={RecycleBin}
                    alt="recyclebin"
                    className="cursor-pointer"
                    onClick={() => deleteOpenModal()}
                  />
                  <Filter
                    changeKeyword={changeKeyword}
                    keyword={keyword}
                    filterLeads={filterClients}
                  />
                  <Sort
                    sortType={sortType}
                    sortField={sortField}
                    changeSortField={changeSortField}
                    changeSortType={changeSortType}
                    filterLeads={filterClients}
                  />
                </div>
                <Button
                  className="hidden lg:block"
                  onClick={() => openDrawer()}
                >
                  <Typography variant="button2" className="whitespace-nowrap">
                    Add Client
                  </Typography>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Table
          data={filteredClients}
          archive={archive}
          convertToClient={convertToClient}
          setRating={setRating}
          setStatus={setStatus}
          onClickRow={onClickRow}
          editLead={editLead}
          changeSelectedPeople={changeSelectedPeople}
          totalPage={Math.ceil(totalCount / recordsPerPage)}
          totalCount={totalCount}
          currentPage={currentPage}
          recordsPerpage={recordsPerPage}
          onSetPage={onSetPage}
        />
      </div>
    </div>
  );
};

export default Client