import React from 'react'
import TextField from "@/components/baseComponents/TextField"
import Typography from "@/components/baseComponents/Typography"
import { DatePicker } from "@/components/baseComponents/DatePickers"
import Select from "@/components/baseComponents/Select"
import { Button } from "@/components/baseComponents/Button"
import AddProfile from '@/assets/images/add_profile.svg'
import defaultCoverPhotoImage from '@/assets/images/default_cover_image.jpg'
import { IMyInfo, UpdateMyInfoDto } from '@/shared/interfaces/interfaces'
import {
    getUser,
    getStates,
    // getAddresses,
    updateMyInfo,
    // fetchAddressAutocomplete,
    fetchStateAssociation,
    updateStates,
    fetchLocalAssociation,
    fetchMLSAssociation
} from '@/redux/user/userSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import validation from '@/shared/services/validation'
import { notify } from '@/shared/services/notify'
import { myBucket } from '@/shared/services/s3Bucket'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import Textarea from '@/components/baseComponents/Textarea'
import AddressMultiAutoComplete from '@/components/baseComponents/AddressMultiAutoComplete'
// import AddressAutoComplete from '@/components/baseComponents/AddressAutoComplete';
const MyInfo = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(getUser)
    const states = useAppSelector(getStates)
    // const addresses = useAppSelector(getAddresses)
    const initialMyInfo: IMyInfo = {
        // General Details
        prefix: user.agent.prefix ?? '',
        firstName: user.agent.firstName ?? '',
        middleName: user.agent.middleName ?? '',
        lastName: user.agent.lastName ?? '',
        mobileNumber: user.agent.mobileNumber ?? '',
        officeNumber: user.agent.officeNumber ?? '',
        contactEmail: user.agent.contactEmail ?? '',
        avatarURL: user.agent.avatarURL ?? '',
        coverPhotoURL: user.agent.coverPhotoURL ?? '',
        description: user.agent.description ?? '',
        // License Details
        licenseNumber: user.agent.licenseNumber ?? '',
        licenseState: user.agent.licenseState ?? '',
        licenseType: user.agent.licenseType ?? '',
        licenseDate: user.agent.licenseDate ? new Date(user.agent.licenseDate) : undefined,
        licenseExpiration: user.agent.licenseExpiration ? new Date(user.agent.licenseExpiration) : undefined,
        //Associations
        localAssociations: user.agent.localAssociations ?? '',
        stateAssociations: user.agent.stateAssociations ?? '',
        mlsAssociations: user.agent.mlsAssociations ?? '',
        // Serviced Areas
        serviceAreas: user.agent.serviceAreas ?? [],
        // Social Profile
        instagram: user.agent.instagram ?? '',
        facebook: user.agent.facebook ?? '',
        tiktok: user.agent.tiktok ?? '',
        linkedin: user.agent.linkedin ?? '',
        youtube: user.agent.youtube ?? '',
        // Professional Profiles
        zillow: user.agent.zillow ?? '',
        homes: user.agent.homes ?? '',
        realtor: user.agent.realtor ?? '',
        ratemyagent: user.agent.ratemyagent ?? ''
    }
    const [avatarURL, setAvatarURL] = React.useState<string>('')
    const [coverPhotoURL, setCoverPhotoURL] = React.useState<string>('')
    const avatarRef = React.useRef(null)
    const coverPhotoRef = React.useRef(null)
    const [values, setValues] = React.useState<IMyInfo>(initialMyInfo)
    const [errorFirstName, setErrorFirstName] = React.useState<boolean>(false)
    const [errorLastName, setErrorLastName] = React.useState<boolean>(false)
    const [errorEmail, setErrorEmail] = React.useState<boolean>(false)
    const [errorMobileNumber, setErrorMobileNumber] = React.useState<boolean>(false)
    const [errorOfficeNumber, setErrorOfficeNumber] = React.useState<boolean>(false)

    const [stateAssociations, setStateAssociations] = React.useState<Array<any>>([])
    const [localAssociations, setLocalAssociations] = React.useState<Array<any>>([])
    const [mlsAssociations, setMLSAssociations] = React.useState<Array<any>>([])

    const [licenseStateList, setLicenseStateList] = React.useState<Array<any>>([])
    const [licenseTypeList, setLicenseTypeList] = React.useState<Array<any>>([])
    const [licenseLookup, setLicenseLookup] = React.useState<string>('');
    const [submitDisable, setSubmitDisable] = React.useState<boolean>(false)

    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        let tempValue = value
        if(name.includes('Name')){
            tempValue = value.replace(/[^a-z]/gi, '')
        }
        setValues({
            ...values,
            [name]: tempValue
        })
        if(name === 'mobileNumber' || name === 'officeNumber'){
            const formattedPhoneNumber = validation.phoneNumberAutoFormat(value);
            if(name === 'mobileNumber' && formattedPhoneNumber.length>0 && formattedPhoneNumber.length<12) setErrorMobileNumber(true) 
            else setErrorMobileNumber(false)
            if(name === 'officeNumber' && formattedPhoneNumber.length>0 && formattedPhoneNumber.length<12) setErrorOfficeNumber(true)
            else setErrorOfficeNumber(false)
            setValues({
                ...values,
                [name]: formattedPhoneNumber
            })
        }
        switch (name) {
            case "firstName":
                setErrorFirstName(validation.IsEmptyString(value))
                break
            case "lastName":
                setErrorLastName(validation.IsEmptyString(value))
                break
            case "contactEmail":
                setErrorEmail(validation.IsInvalidEmail(value))
                break
        }
    }

    const handleSelectChange = (value: any, name: string) => {
        let tempValue = value.label;
        if (!name.includes('license')) {
            tempValue = (value as any).map((item: any) => {
                return item.label
            })
        }
        setValues({
            ...values,
            [name]: tempValue
        })
        if (name === 'licenseState') {
            let temp = (states as any).filter((state: any) => state.name === value.value)[0]
            let tempTypes = []
            if (temp.licenseType1) {
                tempTypes.push({
                    value: temp.licenseType1,
                    label: temp.licenseType1,
                })
            }
            if (temp.licenseType2) {
                tempTypes.push({
                    value: temp.licenseType2,
                    label: temp.licenseType2,
                })
            }
            if (temp.licenseType3) {
                tempTypes.push({
                    value: temp.licenseType3,
                    label: temp.licenseType3,
                })
            }
            if ( temp.licenseLookup) {
                setLicenseLookup(temp.licenseLookup)
            }
            setLicenseTypeList(tempTypes)
        }
    }

    const changeFile = (files: Array<any>) => {
        setAvatarURL(URL.createObjectURL(files[0]))
        updateAvatar(files[0]);
    }

    const changeCoverPhotoFile = (files: Array<any>) => {
        setCoverPhotoURL(URL.createObjectURL(files[0]))
        updateCoverPhoto(files[0]);
    }

	// const onChangeAreaInput = (value: string) => {
    //     if (value !== '') {
    //         dispatch(fetchAddressAutocomplete({ address: value }))
    //     }
	// }

    const openDialog = () => {
        (avatarRef.current as any).click()
    }

    const openCoverPhotoDialog = () => {
        (coverPhotoRef.current as any).click()
    }

    const updateCoverPhoto = (file: any) => {
        if (file === '') return
        setSubmitDisable(true);
        const timestamp = (new Date()).getTime()
        const newFile = new File([file], timestamp + "_" + file.name)
        const fileParams: any = {
            ACL: 'public-read',
            Body: newFile,
            Bucket: import.meta.env.VITE_BUCKET_NAME,
            Key: newFile.name
        }

        myBucket.upload(fileParams, (err:any, data:any)=>{
            if (err) {
                console.log(err);
            } if (data) {
                setCoverPhotoURL(data.Location)
                setValues({
                    ...values,
                    'coverPhotoURL': data.Location
                })
                setSubmitDisable(false);
            }
        })
    }

    const updateAvatar = (file: any) => {
        if (file === '') return
        setSubmitDisable(true);
        const timestamp = (new Date()).getTime()
        const newFile = new File([file], timestamp + "_" + file.name)
        const fileParams: any = {
            ACL: 'public-read',
            Body: newFile,
            Bucket: import.meta.env.VITE_BUCKET_NAME,
            Key: newFile.name
        }

        myBucket.upload(fileParams, (err:any, data:any)=>{
            if (err) {
                console.log(err);
            } if (data) {
                setAvatarURL(data.Location)
                setValues({
                    ...values,
                    'avatarURL': data.Location
                })
                setSubmitDisable(false);
            }
        })
    }
    const changeDate = (value: any, name: string) => {
        setValues({
            ...values,
            [name]: value
        })
    }

    const updateMyInfoFunc = () => {
        setErrorFirstName(validation.IsEmptyString(values.firstName))
        setErrorLastName(validation.IsEmptyString(values.lastName))
        setErrorEmail(validation.IsInvalidEmail(values.contactEmail))

        if (!validation.IsEmptyString(values.firstName) &&
            !validation.IsEmptyString(values.lastName) &&
            !validation.IsInvalidEmail(values.contactEmail) &&
            !errorMobileNumber &&
            !errorOfficeNumber
        ) {
            let data: UpdateMyInfoDto = {
                email: user.email,
                data: values
            }
            dispatch(updateMyInfo(data)).then((res) => {
                try {
                    notify(res.payload.success, res.payload.message)
                } catch (e) {
                    notify(false, 'Something went wrong.')
                }
            })
        }
    }

    const openLookup = () => {
        if(licenseLookup){
            window.open(licenseLookup, "_blank")
        }
    }
    React.useEffect(() => {
        dispatch(updateStates()).then((res) => {
            // setLicenseState({
            //     value: res.payload.states[0].name,
            //     label: res.payload.states[0].name,
            // })

            // setLicenseType({
            //     value: res.payload.states[0].licenseType1,
            //     label: res.payload.states[0].licenseType1,
            // })
            
            let tempLicenseState =  res.payload.states.filter((state:any)=>state.name ===values.licenseState)[0]
            let tempTypes = []
            if (tempLicenseState.licenseType1) {
                tempTypes.push({
                    value: tempLicenseState.licenseType1,
                    label: tempLicenseState.licenseType1,
                })
            }
            if (tempLicenseState.licenseType2) {
                tempTypes.push({
                    value: tempLicenseState.licenseType2,
                    label: tempLicenseState.licenseType2,
                })
            }
            if (tempLicenseState.licenseType3) {
                tempTypes.push({
                    value: tempLicenseState.licenseType3,
                    label: tempLicenseState.licenseType3,
                })
            }
            if ( tempLicenseState.licenseLookup) {
                setLicenseLookup(tempLicenseState.licenseLookup)
            }
            setLicenseTypeList(tempTypes)
            let tempStates = (res.payload.states as any).map((state: any) => {
                return {
                    value: state.name,
                    label: state.name
                }
            })
            setLicenseStateList(tempStates)
        })
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

    return (
        <div className="px-5 py-8">
            <div className="lg2:flex items-start justify-between">
                <div>
                    <Typography variant="h2" color="primary">General Details</Typography>
                    <div className="flex items-center gap-5 mt-5">
                        <img src={avatarURL !== '' ? avatarURL : values.avatarURL? values.avatarURL : AddProfile} alt="addProfile" className="cursor-pointer w-[75px] h-[75px] rounded" onClick={() => openDialog()} />
                        <input type="file" ref={avatarRef} hidden onChange={(e) => changeFile((e.target as any).files)} />
                        {/* <Button className="text-15" onClick={() => updateAvatar()}>Update</Button> */}
                    </div>
                </div>
                <div className="w-full lg2:max-w-[670px] mt-[25px] lg2:mt-[0px]">
                    <div className="grid grid-cols-5 md:gap-3 mb-[25px]">
                        <div className="col-span-5 md:col-span-2">
                            <Typography variant='caption' className='text-secondary mb-[10px]'>Prefix</Typography>
                            <TextField className='w-full' name="prefix" value={values.prefix} onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className="col-span-5 md:col-span-3 mt-[25px] md:mt-[0px] relative">
                            <Typography variant='caption' className='text-secondary mb-[10px]'>First Name *</Typography>
                            <TextField className={`w-full ${errorFirstName ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} name="firstName" value={values.firstName} onChange={(e) => handleInputChange(e)} />
                            {errorFirstName && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>This field is required</Typography>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:gap-3 mb-[25px]">
                        <div className="col-span-2 md:col-span-1">
                            <Typography variant='caption' className='text-secondary mb-[10px]'>Middle Name</Typography>
                            <TextField className='w-full' name="middleName" value={values.middleName} onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className="col-span-2 md:col-span-1 mt-[25px] md:mt-[0px] relative">
                            <Typography variant='caption' className='text-secondary mb-[10px]'>Last Name *</Typography>
                            <TextField className={`w-full ${errorLastName ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} name="lastName" value={values.lastName} onChange={(e) => handleInputChange(e)} />
                            {errorLastName && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>This field is required</Typography>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:gap-3 mb-[25px]">
                        <div className="col-span-2 md:col-span-1 relative">
                            <Typography variant='caption' className='text-secondary mb-[10px]'>Mobile Number</Typography>
                            <TextField className={`w-full`} name="mobileNumber" value={values.mobileNumber} maxLength={12} onChange={(e) => handleInputChange(e)} />
                            {errorMobileNumber && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>Please enter a valid phone number</Typography>}
                        </div>
                        <div className="col-span-2 md:col-span-1 mt-[25px] md:mt-[0px] relative">
                            <Typography variant='caption' className='text-secondary mb-[10px]'>Office Number</Typography>
                            <TextField className={`w-full`} name="officeNumber" value={values.officeNumber} maxLength={12} onChange={(e) => handleInputChange(e)} />
                            {errorOfficeNumber && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>Please enter a valid phone number</Typography>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 mb-[25px]">
                        <div className="col-span-1 relative">
                            <Typography variant='caption' className='text-secondary mb-[10px]'>Contact Email *</Typography>
                            <TextField className={`w-full ${errorEmail ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} name="contactEmail" value={values.contactEmail} onChange={(e) => handleInputChange(e)} />
                            {errorEmail && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>Invalid Email Address</Typography>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-b border-gray-200 w-full mt-[25px]"></div>
            <div className="lg2:flex items-start justify-between mt-[50px]">
                <div>
                    <Typography variant="h2" color="primary">License Details</Typography>
                </div>
                <div className="w-full lg2:max-w-[670px] mt-[25px] lg2:mt-[0px]">
                    
                    <div className="grid grid-cols-2 md:gap-3 mb-[25px]">
                        <div className="col-span-2 md:col-span-1">
                            <Typography variant='caption' className='text-secondary mb-[10px]'>License State</Typography>
                            <Select
                                options={licenseStateList}
                                name='licenseState'
                                value={{ value: values.licenseState, label: values.licenseState }}
                                onChange={(value) => handleSelectChange(value, 'licenseState')}
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1 mt-[25px] md:mt-[0px]">
                            <Typography variant='caption' className='text-secondary mb-[10px]'>License Type</Typography>
                            <Select
                                options={licenseTypeList}
                                name='licenseType'
                                value={{ value: values.licenseType, label: values.licenseType }}
                                onChange={(value) => handleSelectChange(value, 'licenseType')}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 mb-[25px]">
                        <div className="col-span-1">
                            <div className='flex justify-between'>
                                <Typography variant='caption' className='text-secondary mb-[10px]'>License Number</Typography>
                                <Typography variant='caption' className='text-secondary mb-[10px] flex items-center cursor-pointer hover:text-gray-700' onClick={openLookup}>
                                    <AiOutlineInfoCircle className="h-4 w-4 mr-1" aria-hidden="true" />
                                    {values.licenseState} State License Lookup
                                </Typography>
                            </div>
                            <TextField className='w-full' name="licenseNumber" value={values.licenseNumber} onChange={(e) => handleInputChange(e)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:gap-3 mb-[25px]">
                        <div className="col-span-2 md:col-span-1">
                            <Typography variant='caption' className='text-secondary mb-[10px]'>License Date</Typography>
                            <DatePicker name='licenseDate' value={values.licenseDate} onChange={(value) => changeDate(value, 'licenseDate')} />
                        </div>
                        <div className="col-span-2 md:col-span-1 mt-[25px] md:mt-[0px]">
                            <Typography variant='caption' className='text-secondary mb-[10px]'>License Expiration</Typography>
                            <DatePicker name='licenseExpiration' value={values.licenseExpiration} onChange={(value) => changeDate(value, 'licenseExpiration')} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-b border-gray-200 w-full mt-[25px]"></div>
            <div className="lg2:flex items-start justify-between mt-[50px]">
                <div>
                    <Typography variant="h2" color="primary">Associations</Typography>
                </div>
                <div className="w-full lg2:max-w-[670px] mt-[25px] lg2:mt-[0px]">
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
                            name='stateAssociations'
                            isMulti={true}
                            value={values.stateAssociations.map((item: any) => {
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
                            name='mlsAssociations'
                            isMulti={true}
                            value={values.mlsAssociations.map((item: any) => {
                                return {
                                    value: item,
                                    label: item
                                }
                            })}
                            onChange={(value) => handleSelectChange(value, 'mlsAssociations')}
                        />
                    </div>
                </div>
            </div>
            <div className="border-b border-gray-200 w-full mt-[25px]"></div>
            <div className="lg2:flex items-start justify-between mt-[50px]">
                <div>
                    <Typography variant="h2" color="primary">Serviced Areas</Typography>
                </div>
                <div className="w-full lg2:max-w-[670px] mt-[25px] lg2:mt-[0px]">
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
            <div className="border-b border-gray-200 w-full mt-[25px]"></div>
            <div className="lg2:flex items-start justify-between mt-[50px]">
                <div>
                    <Typography variant="h2" color="primary">Social Profiles</Typography>
                </div>
                <div className="w-full lg2:max-w-[670px] mt-[25px] lg2:mt-[0px]">
                    <div className="w-full mb-[25px]">
                        <Typography variant='caption' className='text-secondary mb-[10px]'>Instagram</Typography>
                        <TextField placeholder="https://www.instagram.com/" name='instagram' value={values.instagram} onChange={(e) => handleInputChange(e)} />
                    </div>
                    <div className="w-full mb-[25px]">
                        <Typography variant='caption' className='text-secondary mb-[10px]'>Facebook</Typography>
                        <TextField placeholder="https://www.facebook.com/" name='facebook' value={values.facebook} onChange={(e) => handleInputChange(e)} />
                    </div>
                    <div className="w-full mb-[25px]">
                        <Typography variant='caption' className='text-secondary mb-[10px]'>TikTok</Typography>
                        <TextField placeholder="https://www.tiktok.com/@" name='tiktok' value={values.tiktok} onChange={(e) => handleInputChange(e)} />
                    </div>
                    <div className="w-full mb-[25px]">
                        <Typography variant='caption' className='text-secondary mb-[10px]'>LinkedIn</Typography>
                        <TextField placeholder="https://www.linkedin.com/in" name='linkedin' value={values.linkedin} onChange={(e) => handleInputChange(e)} />
                    </div>
                    <div className="w-full mb-[25px]">
                        <Typography variant='caption' className='text-secondary mb-[10px]'>YouTube</Typography>
                        <TextField placeholder="https://www.youtube.com/@" name='youtube' value={values.youtube} onChange={(e) => handleInputChange(e)} />
                    </div>
                </div>
            </div>
            <div className="border-b border-gray-200 w-full mt-[25px]"></div>
            <div className="lg2:flex items-start justify-between mt-[50px]">
                <div>
                    <Typography variant="h2" color="primary">Professional Profiles</Typography>
                </div>
                <div className="w-full lg2:max-w-[670px] mt-[25px] lg2:mt-[0px]">
                    <div className="w-full mb-[25px]">
                        <Typography variant='caption' className='text-secondary mb-[10px]'>Zillow</Typography>
                        <TextField placeholder="https://www.zillow.com/profile/" name='zillow' value={values.zillow} onChange={(e) => handleInputChange(e)} />
                    </div>
                    <div className="w-full mb-[25px]">
                        <Typography variant='caption' className='text-secondary mb-[10px]'>Homes.com</Typography>
                        <TextField placeholder="https://www.homes.com/real-estate-agents/" name='homes' value={values.homes} onChange={(e) => handleInputChange(e)} />
                    </div>
                    <div className="w-full mb-[25px]">
                        <Typography variant='caption' className='text-secondary mb-[10px]'>Realtor.com</Typography>
                        <TextField placeholder="https://www.realtor.com/realestateagents/" name='realtor' value={values.realtor} onChange={(e) => handleInputChange(e)} />
                    </div>
                    <div className="w-full mb-[25px]">
                        <Typography variant='caption' className='text-secondary mb-[10px]'>RateMyAgent</Typography>
                        <TextField placeholder="https://www.ratemyagent.com/real-estate-agent/" name='ratemyagent' value={values.ratemyagent} onChange={(e) => handleInputChange(e)} />
                    </div>
                </div>
            </div>
            <div className="border-b border-gray-200 w-full mt-[25px]"></div>
            <div className="lg2:flex items-start justify-between mt-[50px]">
                <div>
                    <Typography variant="h2" color="primary">My RealyView Profile</Typography>
                    <input type="file" ref={coverPhotoRef} hidden onChange={(e) => changeCoverPhotoFile((e.target as any).files)}/>
                    <Button className="w-[207px] text-15 mt-5" onClick={openCoverPhotoDialog}>
                        Update your Cover Photo
                    </Button>
                </div>
                <div className="w-full lg2:max-w-[670px] mt-[25px] lg2:mt-[0px]">
                    <div className="w-full mb-[25px]">
                        <img src={coverPhotoURL !== '' ? coverPhotoURL : values.coverPhotoURL? values.coverPhotoURL : defaultCoverPhotoImage} className='w-full'/>
                    </div>
                    <div className="w-full mb-[25px]">
                        <Typography variant='caption' className='text-secondary mb-[10px]'>Tell your colleagues about who you are.</Typography>
                        <Textarea className='' name='description' value={values.description} onChange={(e) => handleInputChange(e)}></Textarea>
                    </div>
                    <div className="flex justify-center mb-16">
                        <Button className="w-[200px] text-15" disabled={submitDisable} onClick={() => updateMyInfoFunc()}>Submit</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MyInfo