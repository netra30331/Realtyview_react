import { useLayoutEffect, useRef, useState } from 'react'
import Typography from '../Typography'
import Pagination from '@/components/baseComponents/Pagination'

import Note from '@/assets/icons/note.png'
import { DeleteMenu, LikeMenu, StatusMenu } from '../Menu'
type IProps = {
  data: Array<any>,
  onClickRow: Function
  editLead: Function
  changeSelectedPeople: Function
  totalPage: number
  currentPage: number
  recordsPerpage: number
  onSetPage: Function
  setStatus: Function
  convertToClient: Function
  archive: Function
  setRating: Function
  totalCount: number
}

const Table = ({
  data,
  onClickRow,
  editLead,
  changeSelectedPeople,
  totalPage,
  currentPage,
  recordsPerpage,
  onSetPage,
  setRating,
  setStatus,
  archive,
  convertToClient,
  totalCount
}: IProps) => {
  const checkbox = useRef()
  const [checked, setChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)
  const [selectedPeople, setSelectedPeople] = useState<Array<any>>([])

  useLayoutEffect(() => {
    const isIndeterminate = selectedPeople.length > 0 && selectedPeople.length < data.length
    setChecked(selectedPeople.length === data.length)
    setIndeterminate(isIndeterminate);
    (checkbox.current as any).indeterminate = isIndeterminate
  }, [selectedPeople])

  const toggleAll = () => {
    setSelectedPeople(checked || indeterminate ? [] : data)
    setChecked(!checked && !indeterminate)
    setIndeterminate(false)
  }

  const checkedPerson = (e: any, person: any) => {
    const temp = e.target.checked
      ? [...selectedPeople, person]
      : selectedPeople.filter((p) => p !== person)

    setSelectedPeople(temp)
    changeSelectedPeople(temp)
  }

  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-230px)] bg-white rounded-md p-6 pb-0">
      <div className="flow-root">
        <div className="inline-block min-w-full py-2 align-middle">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr className='border-b'>
                <th scope="col" className="relative px-6 sm:w-12 sm:px-6">
                  <input
                    type="checkbox"
                    className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    ref={checkbox as any}
                    checked={checked}
                    onChange={toggleAll}
                  />
                </th>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3 md:hidden block">
                  Client
                </th>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3 md:table-cell hidden">
                  Name
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden md:table-cell  ">
                  Email
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden md:table-cell  ">
                  Phone
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Client Type
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                {/* <th scope="col" className=" py-3.5 pl-3 pr-2 sm:pr-3">
                    <span className="sr-only">note</span>
                  </th>
                  <th scope="col" className=" py-3.5 pl-3 pr-2 sm:pr-3">
                    <span className="sr-only">rating</span>
                  </th>
                  <th scope="col" className=" py-3.5 pl-3 pr-2 sm:pr-3">
                    <span className="sr-only">Edit</span>
                  </th> */}
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.map((person) => (
                <tr key={person._id} className="cursor-pointer hover:bg-gray-200">
                  <td className="relative px-7 sm:w-12 sm:px-6">
                    {selectedPeople.includes(person) && (
                      <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                    )}
                    <input
                      type="checkbox"
                      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      value={person._id}
                      checked={selectedPeople.includes(person)}
                      onChange={(e) => checkedPerson(e, person)}
                    />
                  </td>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3 flex md:hidden" onClick={() => onClickRow(person)}>
                    <div>
                      <Typography variant='h3' color='primary'>{person.firstName + ' ' + person.lastName}</Typography>
                      <Typography variant='body' color='secondary'>{person.phoneNumber}</Typography>
                      <Typography variant='body' color='secondary'>{person.email}</Typography>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3 hidden md:table-cell " onClick={() => onClickRow(person)}>
                    <Typography variant='body' color='primary'>{person.firstName + ' ' + person.lastName}</Typography>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden md:table-cell " onClick={() => onClickRow(person)}><Typography variant='body' color='secondary'>{person.email}</Typography></td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden md:table-cell " onClick={() => onClickRow(person)}><Typography variant='body' color='secondary'>{person.phoneNumber}</Typography></td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500" onClick={() => onClickRow(person)}><Typography variant='body' color='secondary'>{person.leadType}</Typography></td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <StatusMenu item={person} setStatus={setStatus} />
                  </td>
                  <td className="whitespace-nowrap xl:px-3 xl:py-4 text-sm text-gray-500 hidden md:table-cell" >
                    <img src={Note} alt="Note" className='object-none' />
                  </td>
                  <td className="whitespace-nowrap xl:px-3 xl:py-4 text-sm text-gray-500 hidden md:table-cell" >
                    <LikeMenu item={person} setPriority={setRating} />
                  </td>
                  <td className="whitespace-nowrap xl:px-3 xl:py-4 text-sm text-gray-500 hidden md:table-cell"  >
                    <DeleteMenu item={person} editLead={editLead} archive={archive} convertToClient={convertToClient} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 w-full mt-3 py-3">
          <Typography variant='medium-text' color='secondary' className='md:block hidden'>Showing {totalCount > 0 ? (currentPage - 1) * recordsPerpage + 1 : 0} to {totalCount >= currentPage * recordsPerpage ? currentPage * recordsPerpage : totalCount} of {totalCount} results</Typography>
          <Pagination totalPage={totalPage} currentPage={currentPage} onSetPage={onSetPage} loadingData={false} />
        </nav>
      </div>
    </div>
  )
}

export default Table