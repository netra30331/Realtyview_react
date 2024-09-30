import { useState, useEffect, Fragment } from 'react'
import Typography from '@/components/baseComponents/Typography'
import TextField from "@/components/baseComponents/TextField"
import Textarea from '@/components/baseComponents/Textarea'
import Select from '@/components/baseComponents/Select'
import { Button } from '@/components/baseComponents/Button';
import { Dialog, Transition } from '@headlessui/react'
import { CreatePostDto, UpdatePostDto, IPost, GetPostsDto } from '@/shared/interfaces/interfaces'
import { createPost, updatePost } from '@/redux/post/postSlice';
import validation from '@/shared/services/validation'
import { notify } from '@/shared/services/notify'
import { importanceLevels } from '@/shared/config/constants';
import XMark from '@/assets/icons/XMark.png'
import { useAppDispatch } from '@/redux/hooks'

interface IProps {
    open: boolean
    closeModal: Function
    search: GetPostsDto
    value: IPost
}

const CreateModal = (props: IProps) => {
    const closeModal = props.closeModal
    const dispatch = useAppDispatch()
    const defaultValue: IPost = {
        postTitle: '',
        postContent: '',
        postImportanceLevel: 0,
    }

    const [isNew, setIsNew] = useState<boolean>(true)
    const [values, setValues] = useState<IPost>(defaultValue)
    const [errorTitle, setErrorTitle] = useState<boolean>(false)
    const [errorContent, setErrorContent] = useState<boolean>(false)

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
        }
    }

    const handleSelectBox = (selectedValue: any) => {
        const importanceLevel = selectedValue.value
        setValues({
            ...values,
            postImportanceLevel: importanceLevel
        })
    }

    const handleSubmitPost = () => {
        setErrorTitle(validation.IsEmptyString(values.postTitle))
        setErrorContent(validation.IsEmptyString(values.postContent))

        if (!validation.IsEmptyString(values.postTitle) &&
            !validation.IsEmptyString(values.postContent)
        ) {
            if (isNew) {
                const data: CreatePostDto = {
                    data: values,
                    search: props.search
                }

                dispatch(createPost(data)).then((res) => {
                    try {
                        notify(res.payload.success, res.payload.message)
                    } catch (e) {
                        notify(false, 'Something went wrong.')
                    }
                }).finally(() => {
                    closeModal()
                })
            } else if (values._id !== undefined && values._id !== '') {
                const data: UpdatePostDto = {
                    data: values,
                    id: values._id,
                    search: props.search
                }
    
                dispatch(updatePost(data)).then((res) => {
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
        }
    }, [props.value])

    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="relative z-30" onClose={() => props.closeModal()}>
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <Dialog.Panel className='rounded-lg max-w-[800px] w-full bg-white'>
                        <div className='px-10 py-3'>
                            <div className='flex justify-between items-center'>
                                <Typography variant='h2' className='mt-[8px] text-[#4C42D7]'>Create Post</Typography>
                                <img src={XMark} alt="XMark" className='cursor-pointer w-4 h-4' onClick={() => closeModal()} />
                            </div>
                            <div className='px-4 border-[1px] border-[#4C42D7] w-full'></div>
                        </div>
                        <div className='flex flex-col gap-4 px-16 py-3 h-[70vh] overflow-y-auto'>
                            <div className='relative mt-2'>
                                <Typography variant='body' className='text-secondary mb-[5px]'>Title *</Typography>
                                <TextField className={`w-full ${errorTitle ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} name="postTitle" value={values.postTitle} onChange={(e) => handleInputChange(e)} />
                                {errorTitle && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>This field is required</Typography>}
                            </div>
                            <div className='relative mt-2'>
                                <Typography variant='body' className='text-secondary mb-[5px]'>Content *</Typography>
                                <Textarea className={`w-full ${errorContent ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} name="postContent" value={values.postContent} onChange={(e) => handleInputChange(e)} />
                                {errorContent && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>This field is required</Typography>}
                            </div>
                            <div className='relative mt-2'>
                                <Typography variant='body' className='text-secondary mb-[5px]'>Importance Level</Typography>
                                <Select
                                    options={importanceLevels.map((item: any, index: number) => {
                                        const label = item.title
                                        const value = index
                                        return {
                                            label, value
                                        }
                                    })}
                                    value={{label: importanceLevels[values.postImportanceLevel ?? 0].title, value: values.postImportanceLevel ?? 0}}
                                    name='postImportanceLevel'
                                    onChange={(e) => handleSelectBox(e)}
                                />
                            </div>
                            <div className="flex justify-center mb-16">
                                <Button className="w-[200px] text-15" onClick={() => handleSubmitPost()}>Submit</Button>
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
export default CreateModal;