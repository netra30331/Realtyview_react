import { Fragment } from 'react';
import { Transition, Popover } from '@headlessui/react';
import DownLine from '@/assets/images/down_line.svg'
import { Button } from '@/components/baseComponents/Button';
import Typography from '@/components/baseComponents/Typography';
import TextField from '@/components/baseComponents/TextField';
import Select from '@/components/baseComponents/Select';

interface IProps{
  searchTitle?:string
  keyword: string
  changeKeyword: Function
  searchSelectedTitle?:string
  changeSelectedField?:Function
  selectedField?: any
  selecedOptions?:Array<any>
  filterData: Function
}

const FilterAdvanced = (props:IProps) => {
    const changeSelectedField = (value:any) => {
        if (props.changeSelectedField){
            props.changeSelectedField(value);
        }
    }
  return (
    <>
      <div className="relative text-right flex items-center">
        <Popover as="div" className="relative inline-block text-left">
          <div>
            <Popover.Button className="flex items-center justify-center">
              <img src={DownLine} alt="UpLine" className='cursor-pointer' />
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
                  {props.selecedOptions && (
                    <>
                    {props.searchSelectedTitle && (
                        <Typography variant="small-text" className='py-2 text-secondary'>{props.searchSelectedTitle}</Typography>
                    )}
                    <Select
                        options={props.selecedOptions}
                        value={props.selectedField}
                        onChange={(value:any) => changeSelectedField(value)}
                    />
                    </>
                  )}
                </div>
                <div className='px-5'>
                  {props.searchTitle && (
                    <Typography variant="small-text" className='py-2 text-secondary'>{props.searchTitle}</Typography>
                  )}
                  <TextField placeholder='Type to filter' value={props.keyword} onChange={(e) => props.changeKeyword(e.target.value)} />
                </div>
                <div className='w-full flex justify-center py-[15px] pb-7'>
                  <Button className='w-[146px] text-15' onClick={() => props.filterData()}>Filter</Button>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </>
  );
};
export default FilterAdvanced;
