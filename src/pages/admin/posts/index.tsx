import React from 'react'
import AdvancedTable from '@/components/baseComponents/AdvancedTable'
import Typography from '@/components/baseComponents/Typography'
import { getUser } from '@/redux/user/userSlice'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { notify } from '@/shared/services/notify'
import { DeletePostsDto, GetPostsDto, IPost } from '@/shared/interfaces/interfaces'
import { importanceLevels } from '@/shared/config/constants'
import { MdEdit, MdDelete } from 'react-icons/md'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { getPosts, getPostsFromDB, deletePosts } from '@/redux/post/postSlice'
import { Button } from '@/components/baseComponents/Button'
import CreateModal from './CreateModal'
import PreviewModal from './PreviewModal'

const TableFields = [
    {name:'Title',type:'text', slug:'postTitle', class_name:'text-left text-gray-900 text-sm font-semibold py-3.5'},
    {name:'Content', type:'text', slug:'postContent', class_name:'text-left text-gray-900 text-sm font-semibold py-3.5'},
    {name:'Importance',type:'icon', slug:'importanceLevel', class_name:'text-left text-gray-900 text-sm font-semibold py-3.5'},
    {name:'Posted At', type:'text', slug:'postedAt', class_name:'text-left text-gray-900 text-sm font-semibold py-3.5'},
    {name:'', type:"action", slug:'action', class_name:'text-left text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3'}
]

const Posts = () => {
  const dispatch = useAppDispatch()
  const posts = useAppSelector(getPosts)
  const user = useAppSelector(getUser)
  const defaultValue: IPost = {
    postTitle: '',
    postContent: '',
    postImportanceLevel: 0,
  }

  const [openConfirm, setOpenConfirm] = React.useState<boolean>(false)
  const [openCreateModal, setOpenCreateModal] = React.useState<boolean>(false)
  const [openPreviewModal, setOpenPreviewModal] = React.useState<boolean>(false)
  const [data, setData] = React.useState<Array<any>>([])
  const [totalCount, setTotalCount] = React.useState<number>(0)
  const [currentPage, setCurrentPage] = React.useState<number>(1)
  const [recordsPerPage, setRecordsPerPage] = React.useState<number>(10)
  const [selectedRowData, setSelectedRowData] = React.useState<IPost>(defaultValue)

  const onSetPage = (value:number) =>{
    setCurrentPage(value)
  }
  
  const onClickRow = (value: any) => {
    setSelectedRowData(value)
    setOpenPreviewModal(true)
  }

  const CreatePost = () => {
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

  const search: GetPostsDto = {
    userId: user._id,
    keyword: '',
    sortType: 'Desending',
    sortField: '',
    recordsPerPage: recordsPerPage,
    currentPage: currentPage,
  }

  const confirmDelete = () => {
    const data: DeletePostsDto = {
      ids: [selectedRowData._id ?? ''],
      search: search
    }

    dispatch(deletePosts(data)).then((res) => {
        try {
            notify(res.payload.success, res.payload.message)
        } catch (e) {
            notify(false, 'Something went wrong.')
        }
    })
  }

  const fetchData = () => {
    dispatch(getPostsFromDB(search)).then((res)=>{
      try {
        setTotalCount(res.payload.totalCount)
      } catch (e) {
        notify(false, 'Something went wrong.')
      }
    })
  }

  const makeTableData = (data: Array<object>) => {
    const res: Array<object> = [];

    data !== undefined && data.map((item:any) => {
      const newItem = JSON.parse(JSON.stringify(item))

      newItem.importanceLevel = (
        <div className='flex flex-row gap-2'>
          <div className='flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="5" fill={importanceLevels[item.postImportanceLevel].color}/>
            </svg>
          </div>
          <Typography variant='body' className='hover:font-semibold'>{importanceLevels[item.postImportanceLevel].title}</Typography>
        </div>
      )
      newItem.postedAt = item.updatedAt.toString().replace('T', ' ').slice(0, -5)
      newItem.action = [
        {name:'Edit', icon:<MdEdit className="mt-1"/>, color:'black'},
        {name:'Archive', icon:<MdDelete className="text-[#C77E90] mt-1"/>, color:'#C77E90'}
      ]
      
      res.push(newItem)
    })
    return res
  }

  React.useEffect(() => {
    setRecordsPerPage(10)
  }, []);

  React.useEffect(() => {
    const tableData = makeTableData(posts)
    setData(tableData)
  }, [posts]);

  React.useEffect(()=>{
      fetchData()
  }, [currentPage])
    
  return (
    <div>
      {(openCreateModal || openPreviewModal) && (
        <div className='bg-[#00000040] w-full h-screen flex items-center justify-center fixed top-0 left-0'></div>
      )}
      {openConfirm && (
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
                <div onClick={() => confirmDelete()}  className='bg-[#C18193] hover:bg-[#B17183] mr-4 w-[146px] h-[40px] rounded flex items-center justify-center cursor-pointer'>
                  <Typography variant='button2' className='text-[#B32F43]'>Archive Listing</Typography>
                </div>
                <div onClick={()=>setOpenConfirm(false)} className='bg-[#B5E2C4] hover:bg-[#B17183] w-[146px] h-[40px] rounded flex items-center justify-center cursor-pointer'>
                  <Typography variant='button2' className='text-[#6DA172]'>Keep Listing</Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="p-10">
        <Typography variant='h2' color='primary' className='py-1'>Posts</Typography>
      </div>
      <div className='relative'>
        <Button className='absolute right-10 bottom-4' onClick={() => CreatePost()}>
          <Typography variant='button1'>New Post</Typography>
        </Button>
      </div>
      <div className="px-10 pb-10">
        {data?.length > 0 ? (
          <AdvancedTable
            minCellWidth={100}
            class_name='table grid grid-cols-5 pb-12'
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

export default Posts
