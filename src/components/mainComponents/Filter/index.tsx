import { Fragment } from 'react';
import { Transition, Popover } from '@headlessui/react';
import DownLine from '@/assets/images/down_line.svg'
import { Button } from '@/components/baseComponents/Button';
import Typography from '@/components/baseComponents/Typography';
import TextField from '@/components/baseComponents/TextField';

interface IProps{
  keyword: string
  changeKeyword: Function
  filterLeads: Function
}

const Filter = (props:IProps) => {
  return (
    <>
      <div className="relative text-right flex items-center">
        <Popover as="div" className="relative inline-block text-left">
          <div>
            <Popover.Button className="flex items-center justify-center">
              <img src={DownLine} alt="UpLine" className='cursor-pointer' width={16}/>
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
            <Popover.Panel className="absolute right-0 mt-5 w-[278px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              <div className="px-0 py-0 w-full ">
                <div className='py-[15px] px-5 flexitems-center cursor-pointer w-full'>
                  <Typography variant="h3" className='py-2'>Filter</Typography>
                  {/* <Select
                    options={[
                      { value: 'Name', label: 'Name' },
                      { value: 'Email', label: 'Email' },
                      { value: 'Phone', label: 'Phone' },
                    ]}
                    value={{ value: selectedField, label: selectedField }}
                    onChange={(value) => changeSelectedFiled(value)}
                  /> */}
                </div>
                <div className='px-5'>
                  <TextField placeholder='Enter filter term' value={props.keyword} onChange={(e) => props.changeKeyword(e.target.value)} />
                </div>
                <div className='w-full flex justify-center py-[15px] pb-7'>
                  <Button className='w-[146px] text-15' onClick={() => props.filterLeads()}>Filter</Button>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </>
  );
};
export default Filter;
