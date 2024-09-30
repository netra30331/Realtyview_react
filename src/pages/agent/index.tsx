import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AdvancedTable from '@/components/baseComponents/AdvancedTable'
import Typography from '@/components/baseComponents/Typography'

import icon_graph from '@/assets/icons/graph.png';
import icon_star_connected from '@/assets/icons/star-in-contact.png';
import icon_star_unconnected from '@/assets/icons/star-uncontacted.png';
import icon_star_priority from '@/assets/icons/star-high-priority.png';

import defaulAvatar from '@/assets/images/default_avatar.jpg'
import emptyImage from '@/assets/images/empty.png'
import defaultCoverPhoto from '@/assets/images/default_agent_cover_photo.jpg'

import { Button } from '@/components/baseComponents/Button'
import { getUser, updateMyInfo } from '@/redux/user/userSlice'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { notify } from '@/shared/services/notify'

import { GetAgentsDto, UpdateMyInfoDto } from '@/shared/interfaces/interfaces'
import Filter from '@/components/mainComponents/Filter'
import SortAdvanced from '@/components/mainComponents/SortAdvanced'
import { MdEdit, MdDelete } from 'react-icons/md'
import { XMarkIcon } from '@heroicons/react/24/outline'
import ActionDrawer from './ActionDrawer'
import ViewDrawer from "./ViewDrawer"
import { getAgents, getAgentsByUserId } from '@/redux/agent/agentSlice';
import { IMyInfo } from '@/shared/interfaces/interfaces'

const tabs = [
    { name: 'All', value: 'all' },
    { name: 'Favorite', value: 'favorite' },
    { name: 'Company', value: 'company' },
    { name: 'Team', value: 'team' },
    { name: 'My Profile', value: 'myprofile' },
];

const TableFields = [
    {name:'', type:'custom_image', slug:'avatarURL', class_name:'text-left py-3.5 pl-0 pr-1 lg:pr-2', image_size: 'w-[3.125rem] h-[3.125rem] max-w-none'},
    {name:'Status', type:'custom_image', slug:'iconGraph', class_name:'text-left py-3.5 pl-1 pr-1 lg:pl-3 md:pr-3', image_size: 'w-[1.25rem] h-[1.125rem] max-w-none'},
    {name:'', type:'favoriteAction', slug:'favoriteAction', class_name:'text-left py-3.5 pl-1 pr-1  lg:pl-3 md:pr-3', image_size: 'w-[1rem] h-[1rem] max-w-none'},
    // {name:'', type:'custom_image', slug:'iconShield', class_name:'text-center py-3.5 pl-1 pr-1 hidden lg:pl-3 md:pr-3', image_size: 'w-[1rem] h-[1.125rem max-w-none'},
    {name:'Name',type:'text', slug:'name', class_name:'text-left text-gray-900 text-sm font-semibold py-3.5'},
    {name:'Phone', type:'text', slug:'mobileNumber', class_name:'text-left text-gray-900 text-sm font-semibold py-3.5'},
    {name:'Email', type:'text', slug:'contactEmail', class_name:'text-left text-gray-900 text-sm font-semibold py-3.5'},
    {name:'Member ID', type:'text', slug:'memberID', class_name:'text-left text-gray-900 text-sm font-semibold py-3.5'},
    {name:'Company',type:'text', slug:'companyName', class_name:'text-left text-gray-900 text-sm font-semibold py-3.5'},
    // {name:'', type:"action", slug:'action', class_name:'text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3'}
];

const SortFieldOptions = [
    { value: 'firstName', label: 'Name' },
    { value: 'mobileNumber', label: 'Phone' },
    { value: 'contactEmail', label: 'Email' },
    { value: 'memberID', label: 'Member ID' },
];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const Agent = () => {
    const dispatch = useAppDispatch();
    const agents = useAppSelector(getAgents);
    const user = useAppSelector(getUser)
    const navigate = useNavigate()
    const location = useLocation()
    const tabValue = location.pathname.split('/')[3]
    const curTab = tabs.filter(tab => tab.value === tabValue)
    let currentTab = 'All';
    if (curTab && curTab.length > 0) {
        currentTab = curTab[0].name
    }

    const initialSearchData: IMyInfo = {
        // General Details
        prefix: '',
        firstName: '',
        middleName: '',
        lastName: '',
        mobileNumber: '',
        officeNumber: '',
        contactEmail: '',
        avatarURL: '',
        // License Details
        licenseNumber: '',
        licenseState: '',
        licenseType: '',
        licenseDate: undefined,
        licenseExpiration: undefined,
        //Associations
        localAssociations: [],
        stateAssociations: [],
        mlsAssociations: [],
        // Serviced Areas
        serviceAreas: [],
        // Social Profile
        instagram: '',
        facebook: '',
        tiktok: '',
        linkedin: '',
        youtube: '',
        // Professional Profiles
        zillow: '',
        homes: '',
        realtor: '',
        ratemyagent: '',
    }
    
    const [openActionDrawer, setActionDrawer] = React.useState<boolean>(false)
    const [openViewDrawer, setOpenViewDrawer] = React.useState<boolean>(false)
    const [openConfirm, setOpenConfirm] = React.useState<boolean>(false)
    const [filteredData, setFilteredData] = React.useState<Array<any>>([])
    const [keyword, setKeyword] =  React.useState<string>('')
    const [sortType, setSortType] =  React.useState<string>('Descending')
    const [sortField, setSortField] =  React.useState<string>('memberID')
    const [totalCount, setTotalCount] = React.useState<number>(0)
    const [currentPage, setCurrentPage] = React.useState<number>(1)
    const [recordsPerPage, setRecordsPerPage] = React.useState<number>(10)
    const [selectedRowData, setSelectedRowData] = React.useState<IMyInfo>(initialSearchData)
    const [searchData, setSearchData] = React.useState<IMyInfo>(initialSearchData)
    
    const changeTab = (value: string) =>{
        navigate('/app/agents/'+ value)
    }

    const prepareData = (agents: any) => {
        if (!agents) {
            return []
        }

        return agents.map((agent: any) => {
            return {
                id: agent._id ?? '',
                name: (agent.firstName ?? '') + ' ' + agent.lastName ?? '',
                firstName: agent.firstName ?? '',
                lastName: agent.lastName ?? '',
                avatarURL: (agent.avatarURL && agent.avatarURL !== '') ? agent.avatarURL : defaulAvatar,
                coverPhotoURL: (agent.coverPhotoURL && agent.coverPhotoURL !== '') ? agent.coverPhotoURL : defaultCoverPhoto,
                description: agent.description ?? '',
                favorite: (user.agent?.favorites && user.agent.favorites.length > 0 && user.agent.favorites.includes(agent._id)) ? 'favorite' : 'colleague',
                isActive: 'active',
                mobileNumber: agent.mobileNumber ?? '',
                contactEmail: agent.contactEmail ?? '',
                instagram: agent.instagram ?? '',
                facebook: agent.facebook ?? '',
                tiktok: agent.tiktok ?? '',
                linkedin: agent.linkedin ?? '',
                youtube: agent.youtube ?? '',
                zillow: agent.zillow ?? '',
                homes: agent.homes ?? '',
                realtor: agent.realtor ?? '',
                ratemyagent: agent.ratemyagent ?? '',
                memberID: agent.memberID ?? '',
                companyName: agent.company?.businessName ?? '',
                company: agent.company ? {
                    companyId: agent.company.companyId ?? '',
                    businessName: agent.company.businessName ?? '',
                    businessAddress1: agent.company.businessAddress1 ?? '',
                    businessAddress2: agent.company.businessAddress2 ?? '',
                    businessCity: agent.company.businessCity ?? '',
                    state: agent.company.state ?? '',
                    businessZip: agent.company.businessZip ?? '',
                    county: agent.company.county ?? '',
                    businessLogo: (agent.company.businessLogo && agent.company.businessLogo !== '') ? agent.company.businessLogo : emptyImage,
                    isProfile: agent.company.isProfile ?? '',
                    principalBrokerFirstName: agent.company.principalBrokerFirstName ?? '',
                    principalBrokerLastName: agent.company.principalBrokerLastName ?? '',
                    principalBrokerEmail: agent.company.principalBrokerEmail ?? '',
                    principalBrokerPhone: agent.company.principalBrokerPhone ?? '',
                } : undefined,
                licenseNumber: agent.licenseNumber ?? '',
                licenseState: agent.licenseState ?? '',
                licenseType: agent.licenseType ?? '',
                licenseDate: agent.licenseDate ?? undefined,
                licenseExpiration: agent.licenseExpiration ?? undefined,
                localAssociations: agent.localAssociations ?? [],
                stateAssociations: agent.stateAssociations ?? [],
                mlsAssociations: agent.mlsAssociations ?? [],
                serviceAreas: agent.serviceAreas ?? [],
            }
        })
    }

    const onSetPage = (value:number) =>{
        setCurrentPage(value)
    }
    
    const onClickRow = (value: any) => {
        if (!openConfirm) {
            setOpenViewDrawer(true);
        }
        setSelectedRowData(value);
    }

    const clickMyProfileTab = () => {
        if (user.agent) {
            setSelectedRowData(user.agent)
            setOpenViewDrawer(true)
        }
    }
    
    const changeKeyword = (keyword: string) =>{
        setKeyword(keyword)
    }

    const changeSortType = (value:string) =>{
        setSortType(value)
    }

    const changeSortField = (value:string) =>{
        setSortField(value)
    }

    const filterData = () =>{
        if (searchData.currentTab && searchData.currentTab.tab !== '' && searchData.currentTab.id === '') {
            setFilteredData([])
            setCurrentPage(1)
            setTotalCount(0)
            return
        }
        
        const data: GetAgentsDto = {
            userId: user._id,
            keyword: keyword,
            sortType: sortType,
            sortField: sortField,
            recordsPerPage: recordsPerPage,
            currentPage: currentPage,
            searchData: searchData
        }
        dispatch(getAgentsByUserId(data)).then((res)=>{
            try {
                setTotalCount(res.payload.totalCount)
            } catch (e) {
                notify(false, 'Something went wrong.')
            }
        })
    }

    const editRow = (data:any) => {
        console.log('editdata', data);
    }

    const deleteRow = (data:any) => {
        console.log('deletedata', data);
        setOpenConfirm(true)
    }

    const changeFovorite = (agentId: string, type: string) => {
        if (agentId === undefined || agentId === '') {
            return
        }

        if (type === 'Favorite' && !user.agent?.favorites?.includes(agentId)) {
            const favorites: Array<string> = user.agent?.favorites ? [...user.agent.favorites] : []
            favorites.push(agentId)
            
            const updatedInfo: IMyInfo = {
                ...user.agent,
                favorites: favorites
            }

            const updateData: UpdateMyInfoDto = {
                email: user.email,
                data: updatedInfo
            }
            dispatch(updateMyInfo(updateData)).then((res) => {
                try {
                    console.log(res)
                    // notify(res.payload.success, res.payload.message)
                } catch (e) {
                    notify(false, 'Something went wrong.')
                }
            })
        } else if (type === 'Colleague' && user.agent?.favorites?.includes(agentId)) {
            const favorites: Array<string> = user.agent?.favorites ? [...user.agent.favorites] : []
            const index = favorites.indexOf(agentId)
            if (index !== -1) {
                favorites.splice(index, 1)
            }
            
            const updatedInfo: IMyInfo = {
                ...user.agent,
                favorites: favorites
            }

            const updateData: UpdateMyInfoDto = {
                email: user.email,
                data: updatedInfo
            }
            dispatch(updateMyInfo(updateData)).then((res) => {
                try {
                    console.log(res)
                    // notify(res.payload.success, res.payload.message)
                } catch (e) {
                    notify(false, 'Something went wrong.')
                }
            })
        }
    }

    const advancedSearch = (values: IMyInfo) => {
        setCurrentPage(1)
        setSearchData({
            ...searchData,
            ...values
        })
    }

    const makeTableData = (data: Array<object>) => {
        const res: Array<object> = [];

        data !== undefined && data.map((item:any) => {
            const new_item = JSON.parse(JSON.stringify(item));
            
            new_item.iconGraph = icon_graph;
            
            if (new_item.favorite === 'activeDeal') {
                new_item.iconStar = icon_star_connected;
            } else if (new_item.favorite === 'favorite') {
                new_item.iconStar = icon_star_priority;
            } else {
                new_item.iconStar = icon_star_unconnected;
            }

            new_item.favoriteAction = [
                {name:'Colleague', image: <img src={icon_star_unconnected} className='w-[1rem] h-[1rem] max-w-none' />, icon:<MdEdit className="my-3"/>, color:'black'},
                {name:'Active Deal', image: <img src={icon_star_connected} className='w-[1rem] h-[1rem] max-w-none'/>, icon:<MdDelete className="text-[#C77E90] mt-1"/>, color:'#C77E90'},
                {name:'Favorite', image: <img src={icon_star_priority} className='w-[1rem] h-[1rem] max-w-none'/>, icon:<MdDelete className="text-[#C77E90] mt-1"/>, color:'#C77E90'}
            ]

            new_item.action = [
                {name:'Edit', icon:<MdEdit className="mt-1"/>, color:'black'},
                {name:'Archive', icon:<MdDelete className="text-[#C77E90] mt-1"/>, color:'#C77E90'}
            ];
            
            res.push(new_item);
        })
        return res;
    }

    React.useEffect(() => {
        setRecordsPerPage(10)
    }, []);

    React.useEffect(() => {
        const dataList = prepareData(agents)
        const tableData = makeTableData(dataList)
        setFilteredData(tableData)
    }, [agents]);

    React.useEffect(() => {
        if (currentTab === 'Favorite') {
            setSearchData({
                ...searchData,
                currentTab: {
                    tab: 'favorites',
                    id: user.agent?.favorites ?? []
                }
            })
        } else {
            const dataList = prepareData(agents)
            const tableData = makeTableData(dataList)
            setFilteredData(tableData)
        }
    }, [user])

    React.useEffect(() => {
        if (openActionDrawer) {
            setActionDrawer(false)
        }
    }, [filteredData])

    React.useEffect(() => {
        setCurrentPage(1)
        if (currentTab === 'My Profile') {
            // navigate('/app/profile/info')
            clickMyProfileTab()
        } else if (currentTab === 'Favorite') {
            setSearchData({
                ...searchData,
                currentTab: {
                    tab: 'favorites',
                    id: user.agent?.favorites ?? []
                }
            })
        } else if (currentTab === 'Company') {
            setSearchData({
                ...searchData,
                currentTab: {
                    tab: 'company',
                    id: user.agent?.company ?? ''
                }
            })
        } else if (currentTab === 'Team') {
            setSearchData({
                ...searchData,
                currentTab: {
                    tab: 'team',
                    id: user.agent?.team ?? ''
                }
            })
        } else {
            setSearchData({
                ...searchData,
                currentTab: {
                    tab: '',
                    id: ''
                }
            })
        }
    }, [currentTab])

    React.useEffect(()=>{
        filterData()
    }, [currentPage, searchData]);
    
    React.useEffect(() => {
        if (!openViewDrawer && currentTab === 'My Profile') {
            changeTab('all')
        }
    }, [openViewDrawer])

    // React.useEffect(()=>{
    //     if (currentPage === 1) {
    //         const data: GetAgentsDto = {
    //             userId: user._id,
    //             keyword: keyword,
    //             sortType: sortType,
    //             sortField: sortField,
    //             recordsPerPage: recordsPerPage,
    //             currentPage: currentPage,
    //             searchData: searchData
    //         }
    //         dispatch(getAgentsByUserId(data)).then((res)=>{
    //             try {
    //                 setTotalCount(res.payload.totalCount)
    //             } catch (e) {
    //                 notify(false, 'Something went wrong.')
    //             }
    //         })
    //     } else {
    //         setCurrentPage(1)
    //     }
    // }, [searchData]);
    
    return (
        <div>
            {(openActionDrawer || openViewDrawer) && <div className='!bg-[#00000040] h-screen w-full fixed top-0 left-0 z-10'></div>}
            <ActionDrawer open={openActionDrawer} changeState={setActionDrawer} advancedSearch={advancedSearch}/>
            <ViewDrawer open={openViewDrawer} changeViewDrawer={setOpenViewDrawer} data={selectedRowData}/>
            {openConfirm && 
            <div className='bg-[#00000040] w-full h-screen flex items-center justify-center fixed top-0 left-0' onClick={()=>setOpenConfirm(false)}>
                <div className='rounded-lg max-w-[435px] w-full bg-white p-3'>
                    <div>
                        <div className='flex justify-end w-full text-secondary hover:text-primary cursor-pointer'>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" onClick={()=>setOpenConfirm(false)} />
                        </div>
                        <div className='w-full flex justify-center mt-[10px]'>
                            <Typography variant='button2'>Are you sure you want to archive this listing?</Typography>
                        </div>
                        <div className='flex justify-center mt-[20px] mb-[10px]'>
                            <div className='bg-[#C18193] hover:bg-[#B17183] mr-4 w-[146px] h-[40px] rounded flex items-center justify-center cursor-pointer'>
                                <Typography variant='button2' className='text-[#B32F43]'>Archive Listing</Typography>
                            </div>
                            <div className='bg-[#B5E2C4] hover:bg-[#B17183] w-[146px] h-[40px] rounded flex items-center justify-center cursor-pointer'>
                                <Typography variant='button2' className='text-[#6DA172]'>Keep Listing</Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            <div className="p-10">
                <div className="block">
                    <div className="min-[1300px]:flex gap-8">
                        <div className='flex max-[570px]:flex-col min-[570px]:items-end min-[570px]:justify-between max-[1300px]:mb-3'>
                            <Typography variant='h2' color='primary' className='py-1'>Colleagues</Typography>
                            <div className='flex gap-5 block min-[1300px]:hidden'>
                                <div className='flex items-center gap-5 min-[900px]:hidden'>
                                    <Filter changeKeyword={changeKeyword} keyword={keyword} filterLeads={filterData} />
                                    <SortAdvanced sortFieldOptions={SortFieldOptions} sortType={sortType} sortField={sortField} changeSortField={changeSortField} changeSortType={changeSortType} filterData={filterData} />
                                </div>
                                <Button onClick={() => setActionDrawer(true)}>
                                    <Typography variant='button1'>Search</Typography>
                                </Button>
                            </div>
                        </div>
                        <nav className="-mb-px flex justify-between w-full" aria-label="Tabs">
                            <div className='flex items-center gap-8'>
                                {tabs.map((tab, index) => (
                                    <div
                                        key={index}
                                        className={classNames(
                                            tab.name === currentTab
                                                ? 'border-indigo-500 text-indigo-600'
                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                            'whitespace-nowrap border-b-2 p-1 cursor-pointer'
                                        )}
                                        aria-current={tab.name === currentTab ? 'page' : undefined}
                                        onClick={() => changeTab(tab.value)}
                                    >
                                        <Typography variant='page-menu'>{tab.name}</Typography>
                                    </div>
                                ))}
                            </div>
                            <div className='min-[1300px]:flex max-[1300px]:pt-4 items-center max-[1320px]:gap-2 gap-8'>
                                <div className='flex items-center gap-8 hidden min-[900px]:flex'>
                                    <Filter changeKeyword={changeKeyword} keyword={keyword} filterLeads={filterData} />
                                    <SortAdvanced sortFieldOptions={SortFieldOptions} sortType={sortType} sortField={sortField} changeSortField={changeSortField} changeSortType={changeSortType} filterData={filterData} />
                                </div>
                                <Button className='hidden min-[1300px]:block' onClick={() => setActionDrawer(true)}>
                                    <Typography variant='button1'>Search</Typography>
                                </Button>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="px-10 pb-10">
                <AdvancedTable
                    minCellWidth={100}
                    class_name='table grid grid-cols-8'
                    data={filteredData}
                    fields={TableFields}
                    onClickRow={onClickRow} 
                    totalPage={Math.ceil(totalCount/recordsPerPage)} 
                    totalCount={totalCount} 
                    currentPage={currentPage} 
                    recordsPerpage={recordsPerPage} 
                    onSetPage={onSetPage}
                    editRow={editRow}
                    deleteRow={deleteRow}
                    changeFavorite={changeFovorite}
                />
            </div>
        </div>

    )
}

export default Agent