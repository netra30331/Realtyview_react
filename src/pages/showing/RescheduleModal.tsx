import Typography from '@/components/baseComponents/Typography'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import ListingImagePlaceholder from '@/assets/images/listing_image_placeholder.png'
import IconWrapper from '@/components/baseComponents/IconWrapper';
import { Button } from '@/components/baseComponents/Button'
import DatePicker from "@/components/baseComponents/DatePickers/DatePicker"
import React from 'react'
import TextField from '@/components/baseComponents/TextField'
import { IShowing } from '@/shared/interfaces/interfaces';
import { format, set } from 'date-fns';

interface IProps {
    open: boolean
    closeModal: Function
    reschedule: Function
    data?: any
}

const DetailsModal = (props: IProps) => {

    const initialShowing: IShowing = {
        _id: props.data?._id ?? null,
        status: props.data?.status ?? "Pending",
        listing: props.data?.listing,
        dateTime: props.data?.dateTime ? new Date(props.data?.dateTime) : new Date()
    }

    const [values, setValues] = React.useState<any>(initialShowing)
    const [errorDate, setErrorDate] = React.useState<boolean>(false);

    const handleInputChange = (value: any, name: string) => {
        setErrorDate(false)

        if (name === 'time') {
            let [hours, minutes] = value.split(':')

            setValues({
                ...values,
                dateTime: new Date(values.dateTime).setHours(hours, minutes)
            })
        }

        if (name === 'date') {
            let date = new Date(value)

            setValues({
                ...values,
                dateTime: set(new Date(values.dateTime), { month: date.getMonth(), date: date.getDate(), year: date.getFullYear() })
            })
        }
    }

    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="relative z-30" onClose={() => props.closeModal()}>
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-700"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-700"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Panel className='rounded-lg max-w-[512px] w-full bg-white p-5'>
                            <Typography variant='h4' color='primary' className='flex gap-5'>
                                <IconWrapper name="check-list" /> Reschedule Showing
                            </Typography>
                            <div className='flex flex-col gap-8 mt-10'>
                                <div className='grid grid-cols-5 items-center gap-5'>
                                    <img src={(props.data?.listing?.propertyPhotos && props.data?.listing?.propertyPhotos[0]?.file) || ListingImagePlaceholder} className='aspect-square rounded-md' />
                                    <div className='col-span-4'>
                                        <Typography variant='h4'>{props.data?.listing?.listingAddress}</Typography>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Typography variant='body' color='secondary'>The current showing request is for {props.data && format(new Date(props.data?.dateTime), "iiii MM/dd/yy")} at {props.data && format(new Date(props.data?.dateTime), "p")}.</Typography>
                                </div>
                                <div className='flex'>
                                    <Typography variant='body' color='primary' className='flex gap-5 items-center'><IconWrapper name="check-plus-circle" /> Reschedule Showing to</Typography>
                                </div>
                                <div className="flex flex-col gap-10">
                                    <div className="col-span-2 sm:col-span-1 relative">
                                        <DatePicker className={`${errorDate ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} name='date' value={values.dateTime !== undefined ? new Date(values.dateTime) : null} onChange={(value) => handleInputChange(value, 'date')} />
                                        {errorDate && <Typography variant='caption' className='text-[#E01010] absolute mt-[42px] left-0'>This field is required</Typography>}
                                    </div>
                                    <div className="flex flex-col gap-[10px]">
                                        <Typography variant="caption" color="secondary">Time Due</Typography>
                                        <TextField type="time" id="time" name="time" value={props.data && format(new Date(values.dateTime), "kk:mm").toString()} onChange={(e) => handleInputChange(e.target.value, 'time')} />
                                    </div>
                                </div>
                                <div className='flex justify-between'>
                                    <label htmlFor="remindMe" className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={false}
                                            id="remindMe"
                                            name="remindMe"
                                            className="rounded border-gray-300 bg-indigo-600 text-indigo-600 focus:ring-indigo-600 mr-3"
                                        />
                                        <Typography variant="medium-text" color="primary">Remind Me</Typography>
                                    </label>
                                    <div className='flex flex-row gap-5'>
                                        <Button color='danger'>
                                            <Typography variant='button1' onClick={() => props.closeModal()}>Cancel</Typography>
                                        </Button>
                                        <Button color='success' onClick={() => props.reschedule(values.dateTime)}>
                                            <Typography variant='button1'>Update</Typography>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
export default DetailsModal;