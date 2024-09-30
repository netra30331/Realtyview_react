import { Button } from "@/components/baseComponents/Button"
import IconWrapper from "@/components/baseComponents/IconWrapper"
import Select from "@/components/baseComponents/Select"
import TextField from "@/components/baseComponents/TextField"
import Textarea from "@/components/baseComponents/Textarea"
import Typography from "@/components/baseComponents/Typography"
import { MyListingShowingAvailabilityTime } from "@/shared/interfaces/interfaces"
import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { MdContentCopy } from 'react-icons/md'

type IProps = {
  data?: any
  handleInputChange: Function
  handleSelectChange: Function
  onAddAvailability: Function
  onRemoveAvailability: Function
  handleSelectAvailability: Function
  handleChangeAvailabilityTime: Function
}
const Showings = (props: IProps) => {

  const yesOrNoOptions = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' }
  ]

  const occupancyStatus = [
    { value: 'Owner Occupied', label: 'Owner Occupied' },
    { value: 'Renter Occupied', label: 'Renter Occupied' },
    { value: 'Squatters', label: 'Squatters' },
    { value: 'Vacant', label: 'Vacant' }
  ]

  return (
    <div className="my-[30px]">
      <div className="px-8">
        <Typography variant="h3" color="primary">Showing Instructions</Typography>
        <div className="mt-[25px]">
          <Typography variant="caption" color="secondary">Showing Instructions</Typography>
          <Textarea placeholder="Describe the Property" name="showingInstuction" rows={5} value={props.data?.showingInstuction} onChange={(e) => props.handleInputChange(e)} />
        </div>
        <div className="mt-[25px]">
          <Typography variant="caption" color="secondary">Showing Remarks</Typography>
          <Textarea placeholder="Describe the Property" name="showingRemarks" rows={5} value={props.data?.showingRemarks} onChange={(e) => props.handleInputChange(e)} />
        </div>
        <div className="grid grid-cols-2 gap-[15px] mt-[25px]">
          <div className="col-span-2 sm:col-span-1">
            <Typography variant="caption" color="secondary">Lockbox or Keypad</Typography>
            <Select
              options={[
                { value: 'Lockbox', label: 'Lockbox' },
                { value: 'Keypad', label: 'Keypad' },
              ]}
              name='showingLockboxOrKeypad'
              value={{ value: props.data?.showingLockboxOrKeypad, label: props.data?.showingLockboxOrKeypad }}
              onChange={(value) => props.handleSelectChange(value, 'showingLockboxOrKeypad')}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Typography variant="caption" color="secondary">Access Code</Typography>
            <TextField name="showingAccessCode" value={props.data?.showingAccessCode} onChange={(e) => props.handleInputChange(e)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[15px] mt-[25px]">
          <div className="col-span-2 sm:col-span-1">
            <Typography variant="caption" color="secondary">Occupancy Status</Typography>
            <Select
              options={occupancyStatus}
              name='showingOccupanyStatus'
              value={{ value: props.data?.showingOccupanyStatus, label: props.data?.showingOccupanyStatus }}
              onChange={(value) => props.handleSelectChange(value, 'showingOccupanyStatus')}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Typography variant="caption" color="secondary">Require Agency Disclosure</Typography>
            <Select
              options={yesOrNoOptions}
              name='showingRequireAgencyDisclosure'
              value={{ value: props.data?.showingRequireAgencyDisclosure, label: props.data?.showingRequireAgencyDisclosure }}
              onChange={(value) => props.handleSelectChange(value, 'showingRequireAgencyDisclosure')}
            />
          </div>
        </div>
      </div>
      <div className="mt-[50px] px-8">
        <Typography variant="h3" color="primary">Showing Availability</Typography>
        {props.data?.showingAvailability && Object.entries(props.data.showingAvailability).map(([key, day]: any, index: any) => {
          return (
            <div
              key={key}
              className="grid grid-cols-5 gap-10 justify-center items-start text-center mt-[25px]"
            >
              <label
                htmlFor={`${key}_${index}`}
                className="col-span-1 flex items-center"
              >
                <input
                  type="checkbox"
                  checked={day.isSelected}
                  id={`${key}_${index}`}
                  name={`${key}_${index}`}
                  className="rounded border-gray-300 bg-indigo-600 text-indigo-600 focus:ring-indigo-600 mr-3"
                  onChange={(e) =>
                    props.handleSelectAvailability(e, key)
                  }
                />
                <Typography
                  variant="medium-text"
                  color="primary"
                  className="capitalize"
                >
                  {key}
                </Typography>
              </label>
              <div className="col-span-3">
                {day.time &&
                  day.time.map(
                    (
                      time: MyListingShowingAvailabilityTime,
                      timeIndex: number
                    ) => {
                      return (
                        <div className="flex gap-3 mb-2">
                          <TextField
                            type="time"
                            id={`timeStart_${index}_${timeIndex}`}
                            name="timeStart"
                            inputClassName="medium-text"
                            value={time.timeStart}
                            onChange={(e) =>
                              props.handleChangeAvailabilityTime(
                                e,
                                key,
                                timeIndex
                              )
                            }
                          />
                          <TextField
                            type="time"
                            id={`timeEnd_${index}_${timeIndex}`}
                            name="timeEnd"
                            inputClassName="medium-text"
                            value={time.timeEnd}
                            onChange={(e) =>
                              props.handleChangeAvailabilityTime(
                                e,
                                key,
                                timeIndex
                              )
                            }
                          />
                          <Button
                            variant="icon"
                            className="disabled:bg-transparent"
                            disabled={day.time.length === 1}
                            onClick={() =>
                              props.onRemoveAvailability(
                                key,
                                timeIndex
                              )
                            }
                          >
                            <IconWrapper
                              name="trash-can"
                              className="cursor-pointer"
                              width={19}
                              height={19}
                            />
                          </Button>
                        </div>
                      );
                    }
                  )}
              </div>
              <div className="col-span-1 flex gap-3">
                <Button
                  variant="icon"
                  onClick={() => props.onAddAvailability(key)}
                >
                  <IconWrapper name="plus" width={21} height={21} />
                </Button>

                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="mt-2 px-3">
                      <MdContentCopy size={19} />
                    </Menu.Button>
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
                    <Menu.Items className="absolute right-7 top-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="px-0 py-0">
                        {props.data?.showingAvailability && Object.entries(props.data.showingAvailability).filter(([secondKey]: any) => secondKey !== key).map(([key, day]: any, index: any) => {

                          return (
                            <Menu.Item disabled>
                              <label key={day + index} className='pl-3 pr-8 py-2 flex flex-row gap-3 items-center cursor-pointer hover:bg-gray-300'>
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                  // ref={checkbox as any}
                                  // checked={checked}
                                  // onChange={toggleAll}
                                />
                                <Typography variant='button2' className='capitalize'>{key}</Typography>
                              </label>
                            </Menu.Item>
                          )
                        })}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          );
        })}
      </div>
    </div >
  )
}

export default Showings