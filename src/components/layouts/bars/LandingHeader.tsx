import { Button } from '@/components/baseComponents/Button'
import Logo from '@/assets/images/logo.svg'
import  { useNavigate} from 'react-router-dom'
const LandingHeader = () =>{
    const navigate = useNavigate()
    const goLogin = () =>{
        navigate('/auth/login')
    }
    const goRegister = () =>{
        navigate('/auth/register')
    }
    return (
        <div className="flex items-center justify-center bg-[#00000066] w-full h-[60px] fixed z-50">
            <div className="max-w-[1024px] w-full px-[30px] md:px-[60px] flex items-center justify-between">
                <div>
                    <img src={Logo} alt="logo" className='h-[24px]' />
                </div>
                <div className='flex gap-5'>
                    <Button className='h-[26px] w-[70px] md:w-[110px] text-[10.5px] bg-transparent hover:bg-transparent hover:text-gray-200' onClick={()=>goLogin()}>
                        Log in
                    </Button>
                    <Button className='h-[26px] w-[110px] text-[10.5px]' onClick={()=>goRegister()} >
                        Sign up
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LandingHeader