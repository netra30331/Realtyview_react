import React from 'react'
import Typography from '@/components/baseComponents/Typography'

let tabs = [
    { name: 'All' },
    { name: 'On Track' },
    { name: 'In Danger' },
    { name: 'Off Track' }
]

const Transactions = () => {

    const [currentTab, setCurrentTab] = React.useState<string>('All')

    return (
        <div className="p-8">
            <div className="block">
                <div className="lg:flex items-center gap-3">
                    <div className='flex max-[570px]:flex-col min-[570px]:items-end min-[570px]:justify-between'>
                        <Typography variant='h2' color='primary'>Transactions</Typography>
                    </div>
                    <nav className="-mb-px flex justify-between w-full" aria-label="Tabs">
                        <div className='flex items-end gap-3'>
                            {tabs.map((tab, index) => (
                                <div
                                    key={index}
                                    className={classNames(
                                        tab.name === currentTab
                                            ? 'border-indigo-500 text-indigo-600'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                        'whitespace-nowrap border-b-2 p-1 cursor-pointer'
                                    )}
                                    aria-current={tab.name === currentTab ? 'page' : undefined}
                                    onClick={() => setCurrentTab(tab.name)}
                                >
                                    <Typography variant='page-menu'>{tab.name}</Typography>
                                </div>
                            ))}
                        </div>
                    </nav>
                </div>
                <div className="grid grid-cols-4 gap-8 mt-8">
                    <div>
                        <Typography variant="h4" className="max-[570px]:text-12">Offer Negotiation</Typography>
                        <div className="flex flex-col gap-[25px] mt-[25px]">
                            <div className="flex flex-col gap-[10px] p-5 rounded-md shadow-lg">
                                <div className="flex">
                                    <Typography variant="small-text" className="font-semibold uppercase bg-[#CCD01C40] bg-opacity-25 text-[#3C3C3CA6] rounded-md px-2 py-1">In Danger</Typography>
                                </div>
                                <div>
                                    <Typography variant="caption" color="secondary" className="font-semibold uppercase">Kerr to Minguez</Typography>
                                </div>
                                <div>
                                    <Typography variant="body" color="primary">7520 Miami View Dr. North Bay Village, FL 33141</Typography>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[10px] p-5 rounded-md shadow-lg">
                                <div className="flex">
                                    <Typography variant="small-text" className="font-semibold uppercase bg-[#B5E2C4] text-[#6DA172] rounded-md px-2 py-1">On Track</Typography>
                                </div>
                                <div>
                                    <Typography variant="caption" color="secondary" className="font-semibold uppercase">Pierre to Acosta</Typography>
                                </div>
                                <div>
                                    <Typography variant="body" color="primary">7520 W Treasure Dr. North Bay Village, FL 33141</Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Typography variant="h4" className="max-[570px]:text-12">Accepted Offer</Typography>
                    </div>
                    <div>
                        <Typography variant="h4" className="max-[570px]:text-12">Due Diligence</Typography>
                    </div>
                    <div>
                        <Typography variant="h4" className="max-[570px]:text-12">Open Escrow</Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default Transactions