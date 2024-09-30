import React from 'react'
import Logo from '@/assets/images/logo_black.svg'
import Typography from '@/components/baseComponents/Typography'
import TextField from '@/components/baseComponents/TextField'
import { Button } from '@/components/baseComponents/Button'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/redux/hooks'
import { forgotPassword } from '@/redux/user/userSlice'
import { ForgotPasswordDto } from '@/shared/interfaces/interfaces'
import { notify } from '@/shared/services/notify'
const ForgotPassword = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [email, setEmail] = React.useState<string>('')

    const goLogin = () =>{
        navigate('/auth/login')
    }

    const sendCode = () =>{
        if(email.length === 0){
            notify(false, 'Email field is required')
        } else {
            let data: ForgotPasswordDto ={
                email: email.toLocaleLowerCase()
            }
            dispatch(forgotPassword(data)).then((res)=>{
                notify(res.payload.success, res.payload.message)
                if(res.payload.success)navigate('/auth/reset-password')
            })
        }
    }
    return (
        <div className='flex items-center justify-center w-full bg-[#F8FAFC] p-16 min-h-screen'>
            <div className='w-full'>
                <div className='flex items-center justify-center scale-75 mb-16'>
                    <img src={Logo} alt="logo" />
                </div>
                <div className='flex justify-center'>
                    <div className='rounded-lg bg-white p-10 pt-5 max-w-[448px] w-full'>
                        <Typography variant="h1" className='text-center'>Forgot Password</Typography>
                        <Typography variant="h4" className='text-button-primary hover:text-button-primary-hover cursor-pointer mt-[10px] text-center mb-[20px]' onClick={()=>goLogin()}>Go to log in</Typography>
                        <Typography variant='caption' className='text-secondary mb-[9px]'>Email Address</Typography>
                        <TextField className='w-full mb-[20px]' autoComplete='off' value={email} onChange={(e)=>setEmail(e.target.value)} />
                        <Button className="w-full text-15" onClick={()=>sendCode()}>Send Code</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword