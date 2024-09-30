import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom'
import { AUTH } from './constants'
import { useAppSelector } from '@/redux/hooks';
import { getUser } from '@/redux/user/userSlice';
interface IProps {
    auth: Array<AUTH>,
    children: ReactNode
}

const Protected = (props: IProps) => {
    const user = useAppSelector(getUser)
    let userType:AUTH = AUTH.VISITOR
    if(user){
        userType = user.userType as AUTH
    }
    if (!props.auth.includes(userType)) {
        return <Navigate to="/" replace />
    }
    return (
        <>
            {props.children}
        </>
    )
}

export default Protected