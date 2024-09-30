import React from 'react'
import AdvancedTable from '@/components/baseComponents/AdvancedTable'
import Typography from '@/components/baseComponents/Typography'
import { getUser } from '@/redux/user/userSlice'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { notify } from '@/shared/services/notify'
import { GetAdvertisementsDto, IAdvertisement, DeleteAdvertisementsDto } from '@/shared/interfaces/interfaces'
import { MdEdit, MdDelete } from 'react-icons/md'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { deleteAdvertisements, getAdvertisements, getAdvertisementsFromDB } from '@/redux/advertisement/advertisementSlice'
import { Button } from '@/components/baseComponents/Button'
import defaultBackground from '@/assets/images/event_background.png'
import CreateModal from './CreateModal'
import PreviewModal from './PreviewModal'

const TableFields = [
    {name:'', type:'custom_image', slug:'adImageURL', class_name:'text-left py-3.5 pl-0 pr-1 lg:pr-2', image_size: 'w-[3.125rem] h-[3.125rem] max-w-none'},
    {name:'Status',type:'text', slug:'status', class_name:'text-left text-gray-900 text-sm font-semibold py-3.5'},
    {name:'Title',type:'text', slug:'adTitle', class_name:'text-left text-gray-900 text-sm font-semibold py-3.5'},
    {name:'Content', type:'text', slug:'adContent', class_name:'text-left text-gray-900 text-sm font-semibold py-3.5'},
    {name:'Link URL', type:'text', slug:'adLinkURL', class_name:'text-left text-gray-900 text-sm font-semibold py-3.5'},
    {name:'Posted At', type:'text', slug:'postedAt', class_name:'text-left text-gray-900 text-sm font-semibold py-3.5'},
    {name:'', type:"action", slug:'action', class_name:'text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3'}
];

const Advertisements = () => {
  const dispatch = useAppDispatch()
  const advertisements = useAppSelector(getAdvertisements)
  const user = useAppSelector(getUser)
  const defaultValue: IAdvertisement = {
    adImageURL: '',
    adTitle: '',
    adContent: '',
    adLinkURL: '',
    adButtonLabel: '',
    adMute: 0,
    status: 'active'
}

  const [openConfirm, setOpenConfirm] = React.useState<boolean>(false)
  const [openCreateModal, setOpenCreateModal] = React.useState<boolean>(false)
  const [openPreviewModal, setOpenPreviewModal] = React.useState<boolean>(false)
  const [data, setData] = React.useState<Array<any>>([])
  const [totalCount, setTotalCount] = React.useState<number>(0)
  const [currentPage, setCurrentPage] = React.useState<number>(1)
  const [recordsPerPage, setRecordsPerPage] = React.useState<number>(10)
  const [selectedRowData, setSelectedRowData] = React.useState<IAdvertisement>(defaultValue)

  const onSetPage = (value:number) =>{
    setCurrentPage(value)
  }
  
  const onClickRow = (value: any) => {
    setSelectedRowData(value)
    setOpenPreviewModal(true)
  }

  const CreateAdvertisement = () => {
    setSelectedRowData(defaultValue)
    setOpenCreateModal(true)
  }

  const editRow = (data:any) => {
    setSelectedRowData(data)
    setOpenCreateModal(true)
  }

  const deleteRow = (data:any) => {
    setSelectedRowData(data)
    setOpenConfirm(true)
  }

  const search: GetAdvertisementsDto = {
    userId: user._id,
    keyword: '',
    sortType: 'Desending',
    sortField: '',
    recordsPerPage: recordsPerPage,
    currentPage: currentPage,
    status: ''
  }

  const confirmDelete = () => {
    const data: DeleteAdvertisementsDto = {
      ids: [selectedRowData._id ?? ''],
      search: search
    }

    dispatch(deleteAdvertisements(data)).then((res) => {
        try {
            notify(res.payload.success, res.payload.message)
        } catch (e) {
            notify(false, 'Something went wrong.')
        }
    })
  }

  const fetchData = () => {
    dispatch(getAdvertisementsFromDB(search)).then((res)=>{
      try {
        setTotalCount(res.payload.totalCount)
      } catch (e) {
        notify(false, 'Something went wrong.')
      }
    })
  }

  const makeTableData = (data: Array<object>) => {
    const res: Array<object> = []

    data !== undefined && data.map((item:any) => {
      const newItem = JSON.parse(JSON.stringify(item))

      newItem.adImageURL = (item.adImageURL !== undefined && item.adImageURL !== '') ? item.adImageURL : defaultBackground
      
      newItem.action = [
        {name:'Edit', icon:<MdEdit className="mt-1"/>, color:'black'},
        {name:'Archive', icon:<MdDelete className="text-[#C77E90] mt-1"/>, color:'#C77E90'}
      ]

      newItem.postedAt = item.updatedAt.toString().replace('T', ' ').slice(0, -5)

      res.push(newItem)
    })

    return res
  }

  React.useEffect(() => {
    setRecordsPerPage(10)
  }, []);

  React.useEffect(() => {
    const tableData = makeTableData(advertisements as Array<object>)
    setData(tableData)
  }, [advertisements]);

  React.useEffect(()=>{
      fetchData()
  }, [currentPage])
    
  return (
    <div>
      {(openCreateModal || openPreviewModal) && (
        <div className='bg-[#00000040] w-full h-screen flex items-center justify-center fixed top-0 left-0'></div>
      )}
      {openConfirm && (
        <div className='bg-[#00000040] w-full h-screen flex items-center justify-center fixed top-0 left-0 z-10' onClick={()=>setOpenConfirm(false)}>
          <div className='rounded-lg max-w-[435px] w-full bg-white p-3'>
            <div>
              <div className='flex justify-end w-full text-secondary hover:text-primary cursor-pointer'>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" onClick={()=>setOpenConfirm(false)} />
              </div>
              <div className='w-full flex justify-center mt-[10px]'>
                <Typography variant='button2'>Are you sure you want to archive this Advertisement?</Typography>
              </div>
              <div className='flex justify-center mt-[20px] mb-[10px]'>
                <div onClick={() => confirmDelete()} className='bg-[#C18193] hover:bg-[#B17183] mr-4 w-[146px] h-[40px] rounded flex items-center justify-center cursor-pointer'>
                  <Typography variant='button2' className='text-[#B32F43]'>Archive</Typography>
                </div>
                <div onClick={()=>setOpenConfirm(false)} className='bg-[#B5E2C4] hover:bg-[#B17183] w-[146px] h-[40px] rounded flex items-center justify-center cursor-pointer'>
                  <Typography variant='button2' className='text-[#6DA172]'>Keep</Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="p-10">
        <Typography variant='h2' color='primary' className='py-1'>Advertisements</Typography>
      </div>
      <div className='relative mt-3'>
        <Button className='absolute right-10 bottom-4' onClick={() => CreateAdvertisement()}>
          <Typography variant='button1'>New Advertisement</Typography>
        </Button>
      </div>
      <div className="px-10 pb-10">
        {data?.length > 0 ? (
          <AdvancedTable
            minCellWidth={100}
            class_name='table grid grid-cols-7'
            data={data}
            fields={TableFields}
            onClickRow={onClickRow}
            totalPage={Math.ceil(totalCount/recordsPerPage)} 
            totalCount={totalCount} 
            currentPage={currentPage} 
            recordsPerpage={recordsPerPage} 
            onSetPage={onSetPage}
            editRow={editRow}
            deleteRow={deleteRow}
          />
        ) : (
          <div className='text-center bg-white py-16'>
            <Typography variant='body'>No data</Typography>
          </div>
        )}
      </div>
      <CreateModal open={openCreateModal} value={selectedRowData} search={search} closeModal={() => setOpenCreateModal(false)} />
      <PreviewModal open={openPreviewModal} value={selectedRowData} closeModal={() => setOpenPreviewModal(false)} />
    </div>
  )
}

export default Advertisements
