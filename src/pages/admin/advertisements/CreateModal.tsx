import { useState, Fragment, useRef, useEffect } from 'react'
import Typography from '@/components/baseComponents/Typography'
import TextField from "@/components/baseComponents/TextField"
import Textarea from '@/components/baseComponents/Textarea'
import Checkbox from '@/components/baseComponents/Checkbox'
import { Button } from '@/components/baseComponents/Button';
import { Dialog, Transition } from '@headlessui/react'
import { CreateAdvertisementDto, UpdateAdvertisementDto, IAdvertisement, GetAdvertisementsDto } from '@/shared/interfaces/interfaces'
import { createAdvertisement, updateAdvertisement } from '@/redux/advertisement/advertisementSlice';
import validation from '@/shared/services/validation'
import { notify } from '@/shared/services/notify'
import { myBucket } from '@/shared/services/s3Bucket'
import defaultBackground from '@/assets/images/event_background.png'
import XMark from '@/assets/icons/XMark.png'
import { useAppDispatch } from '@/redux/hooks'

interface IProps {
    open: boolean
    closeModal: Function
    search: GetAdvertisementsDto
    value: IAdvertisement
}

const CreateModal = (props: IProps) => {
    const closeModal = props.closeModal
    const imageRef = useRef(null)
    const dispatch = useAppDispatch()
    const defaultValue: IAdvertisement = {
        adImageURL: '',
        adTitle: '',
        adContent: '',
        adLinkURL: '',
        adButtonLabel: ''
    }

    const [isNew, setIsNew] = useState<boolean>(true)
    const [values, setValues] = useState<IAdvertisement>(defaultValue)
    const [imageURL, setImageURL] = useState<string>('')
    const [errorTitle, setErrorTitle] = useState<boolean>(false)
    const [errorContent, setErrorContent] = useState<boolean>(false)
    const [errorLinkURL, setErrorLinkURL] = useState<boolean>(false)
    const [submitDisable, setSubmitDisable] = useState<boolean>(false)

    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        
        switch (name) {
            case "adTitle":
                setErrorTitle(validation.IsEmptyString(value))
                break
            case "adContent":
                setErrorContent(validation.IsEmptyString(value))
                break
            case "adLinkURL":
                setErrorLinkURL(validation.IsEmptyString(value))
                break
        }
    }

    const handleCheckboxChange = (e: any) => {
        const { name, checked } = e.target
        if (name === 'adMute') {
            setValues({
                ...values,
                [name]: checked ? 1 : 0
            })
        } else if (name === 'status') {
            setValues({
                ...values,
                [name]: checked ? 'active' : 'inactive'
            })
        }
    }

    const openDialog = () => {
        (imageRef.current as any).click()
    }

    const changeImage = (files: Array<any>) => {
        setImageURL(URL.createObjectURL(files[0]))
        updateImage(files[0]);
    }

    const updateImage = (file: any) => {
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
                setImageURL(data.Location)
                setValues({
                    ...values,
                    'adImageURL': data.Location
                })
                setSubmitDisable(false);
            }
        })
    }

    const submitAdvertisement = () => {
        setErrorTitle(validation.IsEmptyString(values.adTitle))
        setErrorContent(validation.IsEmptyString(values.adContent))
        setErrorLinkURL(validation.IsEmptyString(values.adLinkURL))

        if (!validation.IsEmptyString(values.adTitle) &&
            !validation.IsEmptyString(values.adContent) &&
            !validation.IsEmptyString(values.adLinkURL)
        ) {
            if (isNew) {
                const data: CreateAdvertisementDto = {
                    data: values,
                    search: props.search
                }
    
                dispatch(createAdvertisement(data)).then((res) => {
                    try {
                        notify(res.payload.success, res.payload.message)
                    } catch (e) {
                        notify(false, 'Something went wrong.')
                    }
                }).finally(() => {
                    closeModal()
                })
            } else if (values._id !== undefined && values._id !== '') {
                const data: UpdateAdvertisementDto = {
                    data: values,
                    id: values._id,
                    search: props.search
                }
    
                dispatch(updateAdvertisement(data)).then((res) => {
                    try {
                        notify(res.payload.success, res.payload.message)
                    } catch (e) {
                        notify(false, 'Something went wrong.')
                    }
                }).finally(() => {
                    closeModal()
                })
            }
        }
    }
    
    useEffect(() => {
        if (props.value) {
            setIsNew(!(props.value._id !== undefined))
            setValues(props.value)
            setImageURL(props.value.adImageURL ?? '')
        }
    }, [props.value])

    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="relative z-30" onClose={() => props.closeModal()}>
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <Dialog.Panel className='rounded-lg max-w-[800px] w-full bg-white'>
                        <div className='px-10 py-3'>
                            <div className='flex justify-between items-center'>
                                <Typography variant='h2' className='mt-[8px] text-[#4C42D7]'>Create Advertisement</Typography>
                                <img src={XMark} alt="XMark" className='cursor-pointer w-4 h-4' onClick={() => closeModal()} />
                            </div>
                            <div className='px-4 border-[1px] border-[#4C42D7] w-full'></div>
                        </div>
                        <div className='flex flex-col gap-4 px-16 py-3 h-[70vh] overflow-y-auto'>
                            <div className="flex flex-col mt-5">
                                <Typography variant='body' className='text-secondary mb-[5px]'>Image</Typography>
                                <div className='relative flex flex-col sm:flex-row gap-4'>
                                    <input type="file" className='hidden' ref={imageRef} hidden onChange={(e) => changeImage((e.target as any).files)} />
                                    <img src={imageURL !== '' ? imageURL : defaultBackground} alt="addProfile" className="cursor-pointer w-64 h-56 rounded" />
                                    <Button className='mt-4 sm:mt-44' onClick={() => openDialog()}>Change Image</Button>
                                </div>
                            </div>
                            <div className='relative mt-2'>
                                <Typography variant='body' className='text-secondary mb-[5px]'>Title *</Typography>
                                <TextField className={`w-full ${errorTitle ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} name="adTitle" value={values.adTitle} onChange={(e) => handleInputChange(e)} />
                                {errorTitle && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>This field is required</Typography>}
                            </div>
                            <div className='relative mt-2'>
                                <Typography variant='body' className='text-secondary mb-[5px]'>Content *</Typography>
                                <Textarea className={`w-full ${errorContent ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} name="adContent" value={values.adContent} onChange={(e) => handleInputChange(e)} />
                                {errorContent && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>This field is required</Typography>}
                            </div>
                            <div className='relative mt-2'>
                                <Typography variant='body' className='text-secondary mb-[5px]'>Link URL *</Typography>
                                <TextField className={`w-full ${errorTitle ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} name="adLinkURL" value={values.adLinkURL} onChange={(e) => handleInputChange(e)} />
                                {errorLinkURL && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>This field is required</Typography>}
                            </div>
                            <div className='relative mt-2'>
                                <Typography variant='body' className='text-secondary mb-[5px]'>Button Label</Typography>
                                <TextField className={`w-full ${errorTitle ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} name="adButtonLabel" value={values.adButtonLabel} onChange={(e) => handleInputChange(e)} />
                                {errorLinkURL && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>This field is required</Typography>}
                            </div>
                            <div className='flex flex-row items-center gap-2 mt-2'>
                                <Checkbox variant='primary' inputSize='medium' name='adMute' checked={values.adMute === 1} onChange={(e) => handleCheckboxChange(e)}/>
                                <Typography variant='body' className='text-secondary'>Add 24-Hour Mute</Typography>
                            </div>
                            <div className='flex flex-row items-center gap-2 mt-2'>
                                <Checkbox variant='primary' inputSize='medium' name='status' checked={values.status === 'active'} onChange={(e) => handleCheckboxChange(e)}/>
                                <Typography variant='body' className='text-secondary'>Activate This Advertisement</Typography>
                            </div>
                            <div className="flex justify-center mt-8 mb-16">
                                <Button className="w-[200px] text-15" disabled={submitDisable} onClick={() => submitAdvertisement()}>Submit</Button>
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
export default CreateModal;