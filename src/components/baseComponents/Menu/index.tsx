import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import ThreeDots from '@/assets/icons/dot_vertical.png';
import Edit from "@/assets/icons/edit.png";
import Trash from "@/assets/icons/trash.png";
import UserCheck from "@/assets/icons/user-check.png";
import StarHighPriority from '@/assets/icons/star-high-priority.png'
import StarInContact from '@/assets/icons/star-in-contact.png'
import StarUncontacted from '@/assets/icons/star-uncontacted.png'
import GraphActive from '@/assets/icons/graph-active.png'
import GraphWaiting from '@/assets/icons/graph-waiting.png'
import GraphLost from '@/assets/icons/graph-lost.png'
type IProps = {
    item: any,
    editLead: Function
    archive: Function
    convertToClient: Function
  }
  
export function DeleteMenu({
    editLead,
    convertToClient,
    archive,
    item
}: IProps) {
  return (
    <Popover className="relative">
      <Popover.Button className="flex items-center text-sm focus:outline-none h-full">
        <img
          src={ThreeDots}
          width={15}
          alt="ThreeDots"
          className="object-none"
        />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute -left-[100px] -top-[20px] z-10  flex  max-w-min -translate-x-1/2 px-2">
          {/* Uncomment the background overlay */}

          <div className="w-48 shrink rounded-xl bg-white p-2 text-sm  text-gray-700 shadow-lg ring-1 ring-gray-900/5">
            <div
              className="flex p-2 hover:text-indigo-600"
              onClick={() => editLead(item)}
            >
              Edit
              <img
                src={Edit}
                width={15}
                alt="ThreeDots"
                className="object-none ml-2"
              />
            </div>
            <div
              className="flex p-2 hover:text-indigo-600 text-[#C77E90]"
              onClick={() => archive(item)}
            >
              Archive
              <img
                src={Trash}
                width={15}
                alt="ThreeDots"
                className="object-none ml-2"
              />
            </div>
            {item.isClient ? (
              <div
                className="flex p-2 hover:text-indigo-600"
                onClick={() => convertToClient(item, false)}
              >
                Back to Lead
                <img
                  src={UserCheck}
                  width={15}
                  height={15}
                  alt="ThreeDots"
                  className="object-contain ml-2"
                />
              </div>
            ) : (
              <div
                className="flex p-2 hover:text-indigo-600"
                onClick={() => convertToClient(item, true)}
              >
                Convert to Client
                <img
                  src={UserCheck}
                  width={15}
                  height={15}
                  alt="ThreeDots"
                  className="object-contain ml-2"
                />
              </div>
            )}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

type ILikeProps = {
    item: any,
    setPriority: Function
}

export  function LikeMenu({
    setPriority,
    item
}: ILikeProps) {
  return (
    <Popover className="relative">
      <Popover.Button className="flex items-center text-sm focus:outline-none h-full">
        {
          item.rating === "High Priority"?
          <img src={StarHighPriority}  alt="ThreeDots"  className='object-none w-[20px]'/>
          :item.rating === "In Contact"?
          <img src={StarInContact}  alt="ThreeDots"  className='object-none w-[20px]'/>:
          <img src={StarUncontacted} alt="ThreeDots"  className='object-none w-[20px]'/>
        }
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute -left-[100px] -top-[20px] z-10  flex  max-w-min -translate-x-1/2 px-2">
            {/* Uncomment the background overlay */}
 
          <div className="w-48 shrink rounded-xl bg-white p-2 text-sm  text-gray-700 shadow-lg ring-1 ring-gray-900/5">
            <div  className="flex items-center p-2 hover:text-indigo-600" onClick={() => setPriority(item, 'Uncontacted')}>
                <img src={StarUncontacted} width={15} alt="ThreeDots"  className='object-none mr-2'/>
                Uncontacted
            </div>
            <div  className="flex items-center p-2 hover:text-indigo-600 " onClick={() => setPriority(item, 'In Contact')}>
                <img src={StarInContact} width={15} height={15} alt="ThreeDots"  className='object-contain mr-2'/>
                In Contact
            </div>
            <div  className="flex items-center p-2 hover:text-indigo-600" onClick={() => setPriority(item, 'High Priority')}>
                <img src={StarHighPriority} width={15} height={15} alt="ThreeDots"  className='object-contain mr-2'/>
                High Priority
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

type IStatusProps = {
  item: any,
  setStatus: Function
}

export  function StatusMenu({
  setStatus,
  item
}: IStatusProps) {
return (
  <Popover className="relative">
    <Popover.Button className="flex items-center text-sm focus:outline-none h-full">
      <p className='body text-secondary'>
          {
            item.leadStatus
          }
      </p>
      
    </Popover.Button>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
    >
      <Popover.Panel className="absolute -left-[100px] -top-[20px] z-10  flex  max-w-min -translate-x-1/2 px-2">
          {/* Uncomment the background overlay */}

        <div className="w-48 shrink rounded-xl bg-white p-2 text-sm  text-gray-700 shadow-lg ring-1 ring-gray-900/5">
          <div  className="flex items-center p-2 hover:text-indigo-600" onClick={() => setStatus(item, 'Active')}>
              <img src={GraphActive} width={15} alt="ThreeDots"  className='object-none mr-2'/>
              Active
          </div>
          <div  className="flex items-center p-2 hover:text-indigo-600 " onClick={() => setStatus(item, 'Waiting')}>
              <img src={GraphWaiting} width={15} height={15} alt="ThreeDots"  className='object-contain mr-2'/>
              Waiting
          </div>
          <div  className="flex items-center p-2 hover:text-indigo-600" onClick={() => setStatus(item, 'Lost')}>
              <img src={GraphLost} width={15} height={15} alt="ThreeDots"  className='object-contain mr-2'/>
              Lost
          </div>
        </div>
      </Popover.Panel>
    </Transition>
  </Popover>
)
}

type IMyListingStatusProps = {
  datarow: any;
  item: any;
  setStatus: Function;
};

export function MyListingStatusMenu({
  datarow,
  item,
  setStatus,
}: IMyListingStatusProps) {
  return (
    <Popover className="relative">
      <Popover.Button className="flex items-center text-sm focus:outline-none h-full">
        <p className="body">{datarow ? datarow[item.slug] : ""}</p>
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute -left-[60px] -top-[20px] z-10  flex  max-w-min -translate-x-1/2 px-2">
          {/* Uncomment the background overlay */}

          <div className="w-28 shrink rounded-xl bg-white p-2 text-sm  text-gray-700 shadow-lg ring-1 ring-gray-900/5">
            <div
              className="flex items-center p-2 hover:text-indigo-600"
              onClick={() => setStatus(datarow, "Active")}
            >
              Active
            </div>
            <div
              className="flex items-center p-2 hover:text-indigo-600 "
              onClick={() => setStatus(datarow, "Pending")}
            >
              Pending
            </div>
            <div
              className="flex items-center p-2 hover:text-indigo-600"
              onClick={() => setStatus(datarow, "Closed")}
            >
              Closed
            </div>
            <div
              className="flex items-center p-2 hover:text-indigo-600"
              onClick={() => setStatus(datarow, "Withdrawn")}
            >
              Withdrawn
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}