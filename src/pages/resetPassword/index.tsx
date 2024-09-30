import React from 'react'
import Logo from '@/assets/images/logo_black.svg'
import Typography from '@/components/baseComponents/Typography'
import TextField from '@/components/baseComponents/TextField'
import { Button } from '@/components/baseComponents/Button'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/redux/hooks'
import validation from '@/shared/services/validation'
import { resetPassword } from '@/redux/user/userSlice'
import { ResetPasswordDto } from '@/shared/interfaces/interfaces'
import { notify } from '@/shared/services/notify'

const ResetPassword = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [code, setCode] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [confirm, setConfirm] = React.useState<string>('')
    const [errorConfirm, setErrorConfirm] = React.useState<boolean>(false)
    const [errorMessagePassword, setErrorMessagePassword] = React.useState<string>('')

    const goLogin = () => {
        navigate('/auth/login')
    }
    const changeConfirm = (value: string) => {
        setConfirm(value)
        setErrorConfirm(validation.IsDifferentString(password, value))
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
    const resetPasswordFunc = () => {
        changePassword(password)
        changeConfirm(confirm)
        if(!validation.IsDifferentString(password, confirm) && !errorMessagePassword){
            let data: ResetPasswordDto ={
                code: code,
                password: password
            }
            dispatch(resetPassword(data)).then((res)=>{
                notify(res.payload.success, res.payload.message)
                if(res.payload.success)navigate('/auth/login')
            })
        }
    }

    return (
        <div className='flex items-center justify-center w-full bg-[#F8FAFC] min-h-screen py-8'>
            <div className='w-full'>
                <div className='flex items-center justify-center scale-75 mb-8'>
                    <img src={Logo} alt="logo" />
                </div>
                <div className='flex justify-center'>
                    <div className='rounded-lg bg-white p-10 pt-5 max-w-[600px] w-full'>
                        <Typography variant="h1" className='text-center'>Reset Password</Typography>
                        <Typography variant="h4" className='text-button-primary hover:text-button-primary-hover cursor-pointer mt-[10px] text-center mb-[20px]' onClick={()=>goLogin()}>Go to log in</Typography>
                        <Typography variant='caption' className='text-secondary mb-[9px]'>Code</Typography>
                        <TextField className='w-full mb-[5px]' autoComplete='off' value={code} onChange={(e)=>setCode(e.target.value)} />
                        <Typography variant='caption' className='text-button-primary'>Your unique reset code has been sent to the email you have provided.</Typography>
                        <div className='grid grid-cols-2 gap-3 mt-[10px] mb-[25px]'>
                            <div className='col-span-1 relative'>
                                <Typography variant='caption' className='text-secondary mb-[9px]'>Password</Typography>
                                <TextField className={`w-full ${errorMessagePassword!==''?'outline outline-1 rounded outline-[#E01010]':''}`} type='password' autoComplete='new-password' value={password} onChange={(e) => changePassword(e.target.value)} />
                                {errorMessagePassword!=='' &&<Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>{errorMessagePassword}</Typography>}
                            </div>
                            <div className='col-span-1 relative'>
                                <Typography variant='caption' className='text-secondary mb-[9px]'>Confirm Password</Typography>
                                <TextField className={`w-full ${errorConfirm?'outline outline-1 rounded outline-[#E01010]':''}`} type='password' autoComplete='new-password' value={confirm} onChange={(e) => changeConfirm(e.target.value)} />
                                {errorConfirm &&<Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>Passwords must match!</Typography>}
                            </div>
                        </div>
                        <Button className="w-full text-15 mt-[40px]" onClick={() => resetPasswordFunc()}>Reset</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword