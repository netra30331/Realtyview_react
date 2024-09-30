import React from 'react'
import TextField from "@/components/baseComponents/TextField"
import Typography from "@/components/baseComponents/Typography"
import { Button } from "@/components/baseComponents/Button"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { getUser, replaceEmail, replacePassword } from "@/redux/user/userSlice"
import validation from '@/shared/services/validation'
import { ChangeEmailDto, ChangePasswordDto } from '@/shared/interfaces/interfaces'
import { notify } from '@/shared/services/notify'

const Credentials = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(getUser)
    const [email, setEmail] = React.useState<string>(user.email)
    const [errorEmail, setErrorEmail] = React.useState<boolean>(false)
    const [currentPassword, setCurrentPassword] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [confirm, setConfirm] = React.useState<string>('')
    const [errorConfirm, setErrorConfirm] = React.useState<boolean>(false)
    const [errorCurrentPassword, setErrorCurrentPassword] = React.useState<boolean>(false)
    const [errorMessagePassword, setErrorMessagePassword] = React.useState<string>('')
    const changeEmail = (value: string) => {
        setEmail(value)
        setErrorEmail(validation.IsInvalidEmail(value))
    }
    const updateEmail = () => {
        if (!errorEmail) {
            let data: ChangeEmailDto = {
                email: user.email,
                updatedEmail: email
            }
            dispatch(replaceEmail(data)).then((res) => {
                notify(res.payload.success, res.payload.message)
            })
        }
    }
    const changeCurrentPassword = (value: string) => {
        setCurrentPassword(value)
        setErrorCurrentPassword(validation.IsEmptyString(value))
    }
    const changePassword = (value: string) => {
        setPassword(value)
        if (!validation.emptyPassword(value)) {
            setErrorMessagePassword('This field is required')
            return
        }
        if (!validation.containsNumber(value)) {
            setErrorMessagePassword('Should contain at least a number')
            return
        }
        if (!validation.containsUppercase(value)) {
            setErrorMessagePassword('Should contain at least a uppercase character')
            return
        }
        if (!validation.containsSpecial(value)) {
            setErrorMessagePassword('Should contain at least a sepcial character')
            return
        }
        if (!validation.minLength(value)) {
            setErrorMessagePassword('Should be at least 8 characters')
            return
        }
        setErrorMessagePassword('')
    }
    const changeConfirm = (value: string) => {
        setConfirm(value)
        setErrorConfirm(validation.IsDifferentString(password, value))
    }
    const updatePassword = () =>{
        changeCurrentPassword(currentPassword)
        changePassword(password)
        changeConfirm(confirm)
        if (!errorCurrentPassword && !errorConfirm && errorMessagePassword === '') {
            let data: ChangePasswordDto = {
                email: email,
                password: currentPassword,
                updatedPassword: password,
            }
            dispatch(replacePassword(data)).then((res) => {
                try {
                    notify(res.payload.success, res.payload.message)
                    if(res.payload.success){
                        setCurrentPassword('')
                        setPassword('')
                        setConfirm('')
                        setErrorCurrentPassword(false)
                        setErrorConfirm(false)
                        setErrorMessagePassword('')
                    }
                } catch (e) {
                    notify(false, 'Something went wrong.')
                }
            })
        }
    }
    return (
        <div className="px-5 py-8">
            <div className="lg2:flex items-start justify-between">
                <div>
                    <Typography variant="h2" color="primary">Update Log In Email</Typography>
                    {/* <Typography variant="body" color="secondary" className='text-[11px] leading-[15px] mt-2 w-[250px]'>
                        Login Details: Essential credentials for accessing digital platforms or systems, typically comprised of a username and a password.
                    </Typography> */}
                </div>
                <div className="w-full lg2:max-w-[670px] mt-[25px] lg2:mt-[0px]">
                    <div className="grid grid-cols-1 mb-[25px]">
                        <div className="col-span-1">
                            <Typography variant='caption' className='text-secondary mb-[10px]'>Email</Typography>
                            <div className="flex gap-3">
                                <div className='relative w-full'>
                                    <TextField className={`w-full ${(errorEmail) ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} placeholder='' value={email} onChange={(e) => changeEmail(e.target.value)} />
                                    {(errorEmail) && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>Invalid Email Address</Typography>}
                                </div>
                                <Button className={`text-15 w-[280px] ${(errorEmail || user.email === email)?'!bg-[#4C42D780]':'bg-[#4C42D7]'}`} disabled={(errorEmail || user.email === email)?true:false} onClick={() => updateEmail()}>Update Email</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-b border-gray-200 w-full mt-[25px]"></div>
            <div className="lg2:flex items-start justify-between mt-[50px]">
                <div>
                    <Typography variant="h2" color="primary">Update Password</Typography>
                    {/* <Typography variant="body" color="secondary" className='text-[11px] leading-[15px] w-[250px] mt-2 '>
                        Information about the team composition, including members, roles, and key aspects.
                    </Typography> */}
                </div>
                <div className="w-full lg2:max-w-[670px] mt-[25px] lg2:mt-[0px]">
                    <div className="grid grid-cols-1 mb-[25px]">
                        <div className="col-span-1 relative">
                            <Typography variant='caption' className='text-secondary mb-[10px]'>Current Password</Typography>
                            <TextField type="password" className={`w-full ${errorCurrentPassword ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} placeholder='' value={currentPassword} onChange={(e) => changeCurrentPassword(e.target.value)} />
                            {errorCurrentPassword && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>This field is required.</Typography>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 mb-[25px]">
                        <div className="col-span-1 relative">
                            <Typography variant='caption' className='text-secondary mb-[10px]'>New Password</Typography>
                            <TextField type="password" className={`w-full ${errorMessagePassword !== '' ? 'outline outline-1 rounded outline-[#E01010]' : ''}`} placeholder='' value={password} onChange={(e) => changePassword(e.target.value)} />
                            {errorMessagePassword !== '' && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>{errorMessagePassword}</Typography>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 mb-[25px]">
                        <div className="col-span-1">
                            <Typography variant='caption' className='text-secondary mb-[10px]'>Confirm Password</Typography>
                            <div className="flex gap-3">
                                <div className='w-full relative'>
                                    <TextField type="password" className='w-full' placeholder='' value={confirm} onChange={(e) => changeConfirm(e.target.value)} />
                                    {errorConfirm && <Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>Passwords must match!</Typography>}
                                </div>
                                <Button className={`text-15 w-[280px] ${(password ===''||currentPassword ===''|| confirm === '' ||errorMessagePassword !== '' ||  errorConfirm)?'!bg-[#4C42D780]':'bg-[#4C42D7]'}`} disabled={(password ===''||currentPassword ===''|| confirm === '' ||errorMessagePassword !== '' || errorConfirm)?true:false} onClick={()=>updatePassword()}>Update Password</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Credentials
