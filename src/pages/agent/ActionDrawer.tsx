import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import XMark from '@/assets/icons/XMark.png'
import Typography from "@/components/baseComponents/Typography"
import Select from "@/components/baseComponents/Select"
import TextField from '@/components/baseComponents/TextField'
import { useAppDispatch } from '@/redux/hooks'
import {
    fetchStateAssociation,
    fetchLocalAssociation,
    fetchMLSAssociation,
} from '@/redux/user/userSlice'
import { IMyInfo } from '@/shared/interfaces/interfaces'
import AddressMultiAutoComplete from '@/components/baseComponents/AddressMultiAutoComplete'

type IProps = {
    open: boolean
    changeState: Function
    advancedSearch: Function
}

const ActionDrawer = (props: IProps) => {
    const dispatch = useAppDispatch()
    const { advancedSearch } = props

    const initialValue: IMyInfo = {
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
    const [values, setValues] = React.useState<IMyInfo>(initialValue)
    const [stateAssociations, setStateAssociations] = React.useState<Array<any>>([])
    const [localAssociations, setLocalAssociations] = React.useState<Array<any>>([])
    const [mlsAssociations, setMLSAssociations] = React.useState<Array<any>>([])

    const clickSearch = () => {
        advancedSearch(values)
    }

    const handleTextChange = (e:any, name:any) => {
        const temp = JSON.parse(JSON.stringify(values));
        temp[name] = e.target.value;
        setValues(temp);
    }

    const handleSelectChange = (vals: any, name: string) => {
        let tempValue = vals.map((value: any) => (value.label))
        setValues({
            ...values,
            [name]: tempValue
        })
    }

	React.useEffect(() => {
        dispatch(fetchStateAssociation()).then((res:any) => {
            let tempStateAssociations =[]
            for(let i = 0; i<res.payload.stateAssociations?.length;i++){
                tempStateAssociations.push({
                    value: res.payload.stateAssociations[i].name,
                    label: res.payload.stateAssociations[i].name
                })
            }
            setStateAssociations(tempStateAssociations)
        })
        dispatch(fetchMLSAssociation()).then((res:any) => {
            let tempMLSAssociations =[]
            for(let i = 0; i<res.payload.mlsAffiliations?.length;i++){
                tempMLSAssociations.push({
                    value: res.payload.mlsAffiliations[i].name,
                    label: res.payload.mlsAffiliations[i].name
                })
            }
            setMLSAssociations(tempMLSAssociations)
        })
        dispatch(fetchLocalAssociation()).then((res:any) => {
            let tempLocalAssociations =[]
            for(let i = 0; i<res.payload.localAssociations?.length;i++){
                tempLocalAssociations.push({
                    value: res.payload.localAssociations[i].name,
                    label: res.payload.localAssociations[i].name
                })
            }
            setLocalAssociations(tempLocalAssociations)
        })
    }, [])

    React.useEffect(() => {
        setTimeout(() => {
            const main_body = document.getElementById('action_drawer');
            if (main_body){
                main_body.scrollTop = 0;
            }
        }, 500);
    }, [props.open])

    return (
        <div>
            <Transition.Root show={props.open} as={Fragment}>
                <Dialog as="div" className="relative z-30" onClose={() => props.changeState(false)}>
                    <div className="fixed inset-0" />
                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-300"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-300"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-[700px]">
                                    <div className="flex h-full flex-col overflow-y-auto bg-white py-0 shadow-xl px-2" id="action_drawer">
                                        <div className="px-4 sm:px-6 py-4">
                                            <div className="flex justify-between pr-6">
                                                <div className="flex items-center">                                                
                                                    <Typography variant='h2' className='py-0 my-0'>Search Colleagues</Typography>
                                                </div>
                                                <div className="flex items-center gap-x-5">
                                                    <Typography variant='button2' color='secondary' className='cursor-pointer py-0' onClick={clickSearch}>Search</Typography>
                                                    <img src={XMark} alt="XMark" className='cursor-pointer' onClick={()=>props.changeState(false)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='border-b'></div>
                                        <div className='flex flex-col justify-center w-full mt-4'>
                                            <div className='general-details py-8 w-full px-10'>
                                                <Typography className='text-[#191E3B] font-montserrat text-[1.25rem] font-semibold mb-4'>General  Details</Typography>
                                                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                                                    <div className="col-span-2 md:col-span-1">
                                                        <Typography variant="caption" color="secondary" className=''>First Name</Typography>
                                                        <TextField placeholder='' onChange={(e) => handleTextChange(e, 'firstName')} value={values.firstName} className={`w-full`} />
                                                    </div>
                                                    <div className="col-span-2 md:col-span-1">
                                                        <Typography variant="caption" color="secondary" className=''>Last Name</Typography>
                                                        <TextField placeholder='' onChange={(e) => handleTextChange(e, 'lastName')} value={values.lastName} className={`w-full`} />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                                                    <div className="col-span-2 md:col-span-1">
                                                        <Typography variant="caption" color="secondary" className=''>Mobile Number</Typography>
                                                        <TextField onChange={(e) => handleTextChange(e, 'mobileNumber')} value={values.mobileNumber} placeholder='' className={`w-full`} />
                                                    </div>
                                                    <div className="col-span-2 md:col-span-1">
                                                        <Typography variant="caption" color="secondary" className=''>Contact Email</Typography>
                                                        <TextField placeholder='' onChange={(e) => handleTextChange(e, 'contactEmail')} value={values.contactEmail} className={`w-full`} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='lisence-details py-8 w-full px-10'>
                                                <Typography className='text-[#191E3B] font-montserrat text-[1.56rem] font-bold mb-4'>License Details</Typography>
                                                <div className="grid mt-[15px]">
                                                    <div className="">
                                                        <Typography variant="caption" color="secondary" className=''>Lisence Number</Typography>
                                                        <TextField placeholder='' onChange={(e) => handleTextChange(e, 'licenseNumber')} value={values.licenseNumber} className={`w-full`} />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3 mt-[15px]">
                                                    <div className="col-span-2 md:col-span-1">
                                                        <Typography variant="caption" color="secondary" className=''>Lisence State</Typography>
                                                        <TextField onChange={(e) => handleTextChange(e, 'licenseState')} value={values.licenseState} placeholder='' className={`w-full`} />
                                                    </div>
                                                    <div className="col-span-2 md:col-span-1">
                                                        <Typography variant="caption" color="secondary" className=''>Lisence Type</Typography>
                                                        <TextField placeholder='' onChange={(e) => handleTextChange(e, 'licenseType')} value={values.licenseType} className={`w-full`} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='associations py-8 w-full px-10'>
                                                <Typography className='text-[#191E3B] font-montserrat text-[1.56rem] font-bold mb-4'>Associations</Typography>
                                                <div className="w-full mb-[25px]">
                                                    <Typography variant='caption' className='text-secondary mb-[10px]'>Local Associations</Typography>
                                                    <Select
                                                        options={localAssociations}
                                                        name='localAssociations'
                                                        isMulti={true}
                                                        value={values.localAssociations.map((item: any) => {
                                                            return {
                                                                value: item,
                                                                label: item
                                                            }
                                                        })}
                                                        onChange={(value) => handleSelectChange(value, 'localAssociations')}
                                                    />
                                                </div>
                                                <div className="w-full mb-[25px]">
                                                    <Typography variant='caption' className='text-secondary mb-[10px]'>State Associations</Typography>
                                                    <Select
                                                        options={stateAssociations}
                                                        name='association_state'
                                                        isMulti={true}
                                                        value={values.stateAssociations?.map((item: any) => {
                                                            return {
                                                                value: item,
                                                                label: item
                                                            }
                                                        })}
                                                        onChange={(value) => handleSelectChange(value, 'stateAssociations')}
                                                    />
                                                </div>
                                                <div className="w-full mb-[25px]">
                                                    <Typography variant='caption' className='text-secondary mb-[10px]'>MLS Associations</Typography>
                                                    <Select
                                                        options={mlsAssociations}
                                                        name='association_MSL'
                                                        isMulti={true}
                                                        value={values.mlsAssociations?.map((item: any) => {
                                                            return {
                                                                value: item,
                                                                label: item
                                                            }
                                                        })}
                                                        onChange={(value) => handleSelectChange(value, 'mlsAssociations')}
                                                    />
                                                </div>
                                            </div>
                                            <div className='lisence-details pt-8 pb-24 w-full px-10'>
                                                <Typography className='text-[#191E3B] font-montserrat text-[1.56rem] font-bold mb-4'>Serviced Areas</Typography>
                                                <div className="w-full mb-[25px]">
                                                    <AddressMultiAutoComplete
                                                        filterKeys={['city', 'state', 'zipcode']}
                                                        value={values.serviceAreas?.map((item: any) => {
                                                            return {
                                                                value: item,
                                                                label: item
                                                            }
                                                        })}
                                                        isMulti={true}
                                                        onChange={(value) => handleSelectChange(value, 'serviceAreas')}
                                                    />
                                                    {/* <Select
                                                        options={addresses.map((area: any) => {
                                                            var areaString = (area.streetLine ?? '') + ' ' + (area.city ?? '') + ', ' + (area.state ?? '') + ' ' + (area.zipcode ?? '') + ' ' + (area.secondary ?? '')
                                                            return {
                                                                value: areaString,
                                                                label: areaString,
                                                            }
                                                        })}
                                                        name='serviceAreas'
                                                        isMulti={true}
                                                        value={values.serviceAreas?.map((item: any) => {
                                                            return {
                                                                value: item,
                                                                label: item
                                                            }
                                                        })}
                                                        onInputChange={onChangeAreaInput}
                                                        onChange={(value) => handleSelectChange(value, 'serviceAreas')}
                                                    /> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}

export default ActionDrawer
