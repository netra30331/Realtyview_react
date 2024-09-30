import React from 'react'
import Logo from '@/assets/images/logo_black.svg'
import Typography from '@/components/baseComponents/Typography'
import TextField from '@/components/baseComponents/TextField'
import { Button } from '@/components/baseComponents/Button'
import Select from '@/components/baseComponents/Select'
import { useNavigate } from 'react-router-dom'
import { CreateUserDto, SelectType } from '@/shared/interfaces/interfaces'
import { signUp, updateStates, getStates } from '@/redux/user/userSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { notify } from '@/shared/services/notify'
import validation from '@/shared/services/validation'


const Register = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const states = useAppSelector(getStates)
    const [firstName, setFirstName] = React.useState<string>('')
    const [lastName, setLastName] = React.useState<string>('')
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [confirm, setConfirm] = React.useState<string>('')
    const [licenseState, setLicenseState] = React.useState<SelectType>({ value: '1', label: '' })
    const [licenseType, setLicenseType] = React.useState<SelectType>({ value: '1', label: '' })

    const [errorFirstName, setErrorFirstName] = React.useState<boolean>(false)
    const [errorLastName, setErrorLastName] = React.useState<boolean>(false)
    const [errorEmail, setErrorEmail] = React.useState<boolean>(false)
    const [errorConfirm, setErrorConfirm] = React.useState<boolean>(false)
    const [errorMessagePassword, setErrorMessagePassword] = React.useState<string>('')

    const [licenseStateList, setLicenseStateList] =  React.useState<Array<any>>([])
    const [licenseTypeList, setLicenseTypeList] =  React.useState<Array<any>>([])
    const goLogin = () => {
        navigate('/auth/login')
    }
    const changeEmail = (value: string) => {
        setEmail(value)
        setErrorEmail(validation.IsInvalidEmail(value))
    }
    const changeFirstName = (value: string) => {
        setFirstName(value)
        setErrorFirstName(validation.IsEmptyString(value))
    }
    const changeLastName = (value: string) => {
        setLastName(value)
        setErrorLastName(validation.IsEmptyString(value))
    }
    const changeConfirm = (value: string) => {
        setConfirm(value)
        setErrorConfirm(validation.IsDifferentString(password, value))
    }
    const changeLicenseState = (value: any) =>{
        setLicenseState(value)
        let temp = states.filter((state: any)=>state.name === value.value)[0]
        let tempTypes = []
            if(temp.licenseType1){
                tempTypes.push({
                    value: temp.licenseType1,
                    label: temp.licenseType1,
                })
            }
            if(temp.licenseType2){
                tempTypes.push({
                    value: temp.licenseType2,
                    label: temp.licenseType2,
                })
            }
            if(temp.licenseType3){
                tempTypes.push({
                    value: temp.licenseType3,
                    label: temp.licenseType3,
                })
            }
            setLicenseTypeList(tempTypes)
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
            setErrorMessagePassword('Should contain at least a special character')
            return
        }
        if (!validation.minLength(value)) {
            setErrorMessagePassword('Should be at least 8 characters')
            return
        }
        setErrorMessagePassword('')
    }
    const registerUser = () => {
        changeFirstName(firstName)
        changeLastName(lastName)
        changeEmail(email)
        changePassword(password)
        changeConfirm(confirm)
        if(validation.IsDifferentString(password, confirm)){
            setErrorConfirm(true)
            return;
        }
        if (!errorFirstName && !errorLastName && !errorEmail && !errorConfirm && errorMessagePassword === '') {
            let data: CreateUserDto = {
                firstName: firstName,
                lastName: lastName,
                email: email.toLocaleLowerCase(),
                password: password,
                licenseState: licenseState.label,
                licenseType: licenseType.label
            }
            dispatch(signUp(data)).then((res) => {
                try {
                    if (res.payload.success) navigate('/app/profile', { state: { id: 'My Info' } })
                    notify(res.payload.success, res.payload.message)
                } catch (e) {
                    notify(false, 'Something went wrong.')
                }
            })
        }
    }
    React.useEffect(()=>{
        dispatch(updateStates()).then((res)=>{
            setLicenseState({
                value: res.payload.states[0].name,
                label: res.payload.states[0].name,
            })
            setLicenseType({
                value: res.payload.states[0].licenseType1,
                label: res.payload.states[0].licenseType1,
            })
            let tempTypes = []
            if(res.payload.states[0].licenseType1){
                tempTypes.push({
                    value: res.payload.states[0].licenseType1,
                    label: res.payload.states[0].licenseType1,
                })
            }
            if(res.payload.states[0].licenseType2){
                tempTypes.push({
                    value: res.payload.states[0].licenseType2,
                    label: res.payload.states[0].licenseType2,
                })
            }
            if(res.payload.states[0].licenseType3){
                tempTypes.push({
                    value: res.payload.states[0].licenseType3,
                    label: res.payload.states[0].licenseType3,
                })
            }
            setLicenseTypeList(tempTypes)
            let tempStates = res.payload.states.map((state:any)=>{
                return {
                    value: state.name,
                    label: state.name
                }
            })
            setLicenseStateList(tempStates)
        })
    },[])

    return (
        <div className='flex items-center justify-center w-full bg-[#F8FAFC] min-h-screen py-8'>
            <div className='w-full'>
                <div className='flex items-center justify-center scale-75 mb-8'>
                    <img src={Logo} alt="logo" />
                </div>
                <div className='flex justify-center'>
                    <div className='rounded-lg bg-white p-10 pt-5 max-w-[600px] w-full'>
                        <Typography variant="h1" className='text-center'>Sign up</Typography>
                        <Typography variant="h4" className='text-button-primary hover:text-button-primary-hover cursor-pointer mt-[10px] text-center mb-[20px]' onClick={() => goLogin()}>Have an account? Sign In.</Typography>
                        <div className='grid grid-cols-2 gap-3 mb-[25px]'>
                            <div className='col-span-1 relative'>
                                <Typography variant='caption' className='text-secondary mb-[9px]'>First Name</Typography>
                                <TextField className={`w-full ${errorFirstName?'outline outline-1 rounded outline-[#E01010]':''}`} value={firstName} onChange={(e) => changeFirstName(e.target.value)} />
                                {errorFirstName &&<Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>This field is required.</Typography>}
                            </div>
                            <div className='col-span-1 relative'>
                                <Typography variant='caption' className='text-secondary mb-[9px]'>Last Name</Typography>
                                <TextField className={`w-full ${errorLastName?'outline outline-1 rounded outline-[#E01010]':''}`} value={lastName} onChange={(e) => changeLastName(e.target.value)} />
                                {errorLastName &&<Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>This field is required.</Typography>}
                            </div>
                        </div>
                        <div className='mb-[25px] relative'>
                            <Typography variant='caption' className='text-secondary mb-[9px]'>Email Address</Typography>
                            <TextField className={`w-full ${errorEmail?'outline outline-1 rounded outline-[#E01010]':''}`} value={email} onChange={(e) => changeEmail(e.target.value)} />
                            {errorEmail &&<Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>Invalid Email Address</Typography>}
                        </div>
                        <div className='grid grid-cols-2 gap-3 mb-[25px]'>
                            <div className='col-span-1 relative'>
                                <Typography variant='caption' className='text-secondary mb-[9px]'>Password</Typography>
                                <TextField className={`w-full ${errorMessagePassword!==''?'outline outline-1 rounded outline-[#E01010]':''}`} type='password' value={password} onChange={(e) => changePassword(e.target.value)} />
                                {errorMessagePassword!=='' &&<Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>{errorMessagePassword}</Typography>}
                            </div>
                            <div className='col-span-1 relative'>
                                <Typography variant='caption' className='text-secondary mb-[9px]'>Confirm Password</Typography>
                                <TextField className={`w-full ${errorConfirm?'outline outline-1 rounded outline-[#E01010]':''}`} type='password' value={confirm} onChange={(e) => changeConfirm(e.target.value)} />
                                {errorConfirm &&<Typography variant='caption' className='text-[#E01010] absolute mt-[2px]'>Passwords must match!</Typography>}
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-3'>
                            <div className='col-span-1'>
                                <Typography variant='caption' className='text-secondary mb-[9px]'>License State</Typography>
                                <Select
                                    options={licenseStateList}
                                    placeholder=''
                                    value={licenseState}
                                    onChange={(value) => changeLicenseState(value)}
                                />
                            </div>
                            <div className='col-span-1'>
                                <Typography variant='caption' className='text-secondary mb-[9px]'>License Type</Typography>
                                <Select
                                    options={licenseTypeList}
                                    placeholder=''
                                    value={licenseType}
                                    onChange={(value) => setLicenseType(value)}
                                />
                            </div>
                        </div>
                        <Button className="w-full text-15 mt-[40px]" onClick={() => registerUser()}>Sign Up</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register