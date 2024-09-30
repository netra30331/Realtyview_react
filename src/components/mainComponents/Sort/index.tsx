import { Fragment } from 'react';
import { Transition, Popover } from '@headlessui/react';
import UpLine from '@/assets/images/up_line.svg'
import Select from '@/components/baseComponents/Select';
import { Button } from '@/components/baseComponents/Button';
import Typography from '@/components/baseComponents/Typography';

const notificationMethods = [
  { id: 'Ascending', title: 'Ascending' },
  { id: 'Descending', title: 'Descending' },
]

interface IProps {
  sortType: string
  sortField: string
  filterLeads: Function
  changeSortType: Function
  changeSortField: Function
  options?: any
}
const Sort = (props:IProps) => {
  return (
    <>
      <div className="relative text-right flex items-center">
        <Popover as="div" className="relative inline-block text-left">
          <div>
            <Popover.Button className="flex items-center justify-center">
              <img src={UpLine} alt="UpLine" className='cursor-pointer' width={18} />
            </Popover.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Popover.Panel className="absolute z-50 right-0 mt-5 w-[278px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-0 py-0 w-full ">
                <div className='py-3 px-5 flexitems-center cursor-pointer w-full'>
                  <Typography variant="h3" className='py-2'>Sort</Typography>
                  <Select
                    options={props.options}
                    value={{value: props.sortField, label: props.sortField}}
                    onChange={(value)=>props.changeSortField(value)}
                  />
                </div>
                <div className='px-5'>
                    <div className="space-y-4">
                      {notificationMethods.map((notificationMethod) => (
                        <div key={notificationMethod.id} className="flex items-center">
                          <input
                            id={notificationMethod.id}
                            name="notification-method"
                            type="radio"
                            defaultChecked={notificationMethod.id === 'Descending'}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            onChange={(e)=>props.changeSortType(e.target.id)}
                          />
                          <label htmlFor={notificationMethod.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                            {notificationMethod.title}
                          </label>
                        </div>
                      ))}
                    </div>
                </div>
                <div className='w-full flex justify-center py-[15px] pb-7'>
                  <Button className='w-[146px] text-15' onClick={()=>props.filterLeads()}>Sort</Button>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </>
  );
};
export default Sort;
