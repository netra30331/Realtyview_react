import React from 'react'
import MyInfo from './MyInfo'
import TeamInfo from './TeamInfo'
import Credentials from './Credentials'
import Settings from './Setting'
import Verify from './Verify'
import Typography from '@/components/baseComponents/Typography'
import { useLocation, useNavigate } from 'react-router-dom'
let tabs = [
    { name: 'My Info', value:'info' },
    { name: 'Company/Team Info', value:'company' },
    { name: 'Credentials', value:'credentials' },
    { name: 'Settings', value: 'settings'},
    // { name: 'Verify', value: 'verify' },
]
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}
const Profile = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [currentTab, setCurrentTab] = React.useState<string>('My Info')

    const changeTab = (value:string) =>{
        setCurrentTab(value)
        navigate('/app/profile/'+ value )
    }
    React.useEffect(() => {
        switch (location.pathname.split('/')[3]) {
            case 'info':
                setCurrentTab('My Info')
                break;
            case 'company':
                setCurrentTab('Company/Team Info')
                break;
            case 'credentials':
                setCurrentTab('Credentials')
                break;
            case 'settings':
                setCurrentTab('Settings')
                break;
            // case 'verify':
            //     setCurrentTab('Verify')
                break;
        }
    }, [location.pathname])
    return (
        <div>
            <div className="px-5 mt-5">
                <div className="sm:hidden">
                    <label htmlFor="tabs" className="sr-only">
                        Select a tab
                    </label>
                    {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                    <select
                        id="tabs"
                        name="tabs"
                        className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        value={currentTab}
                        onChange={(e) => changeTab(e.target.value)}
                    >
                        {tabs.map((tab) => (
                            <option key={tab.name} value={tab.value} >{tab.name}</option>
                        ))}
                    </select>
                </div>
                <div className="hidden sm:block">
                    <div className="md:flex items-center gap-8">
                        <Typography variant='h2' color='primary'>Profile</Typography>
                        <nav className="-mb-px flex gap-8" aria-label="Tabs">
                            {tabs.map((tab) => (
                                <div
                                    key={tab.name}
                                    className={classNames(
                                        tab.name === currentTab
                                            ? 'border-indigo-500 text-indigo-600'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                        'whitespace-nowrap border-b-2 p-1 cursor-pointer'
                                    )}
                                    aria-current={tab.name === currentTab ? 'page' : undefined}
                                    onClick={() => changeTab(tab.value)}
                                >
                                    <Typography variant='page-menu'>{tab.name}</Typography>
                                </div>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
            {currentTab === 'My Info' && <MyInfo />}
            {currentTab === 'Company/Team Info' && <TeamInfo />}
            {currentTab === 'Credentials' && <Credentials />}
            {currentTab === 'Settings' && <Settings />}
            {currentTab === 'Verify' && <Verify />}
        </div>

    )
}

export default Profile