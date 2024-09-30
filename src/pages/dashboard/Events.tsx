import { useEffect, useState, useRef } from 'react'
import Slider from 'react-slick';
import Scrollbars from 'react-custom-scrollbars'
import { useCookies } from 'react-cookie'
import Typography from '@/components/baseComponents/Typography'
import { GetMyListingsDto, GetAdvertisementsDto, GetPostsDto, IPost } from '@/shared/interfaces/interfaces'
import { useAppDispatch } from '@/redux/hooks'
// import { getUser } from '@/redux/user/userSlice'
import { getMyListingsByUserId } from '@/redux/myListings/myListingSlice'
import { getAdvertisementsFromDB } from '@/redux/advertisement/advertisementSlice'
import { getPostsFromDB } from '@/redux/post/postSlice';
import { notify } from "@/shared/services/notify";
import { importanceLevels } from '@/shared/config/constants';
import AddProfile from '@/assets/images/add_profile.svg'
import { MdMoreVert } from 'react-icons/md'
import {AiOutlineHome} from 'react-icons/ai';
import IconWrapper from '@/components/baseComponents/IconWrapper'
import { Button } from '@/components/baseComponents/Button'
import ListingImagePlaceholder from '@/assets/images/listing_image_placeholder.png'
import defaultBackground from '@/assets/images/event_background.png'
import XMark from '@/assets/icons/x-mark-white.png'
// import IconEllipse from '@/assets/icons/ellipse1.svg'
import PostModal from './PostModal'

const DashboardSimple = () => {
	const scrollRef = useRef(null)
    const dispatch = useAppDispatch()
	const [cookies, setCookie] = useCookies(['muteAD']);

	const defaultPost: IPost = {
		postTitle: '',
		postContent: ''
	}

	const [listings, setListings] = useState<Array<any>>([])
	const [advertisement, setAdvertisement] = useState<any>(null)
	const [posts, setPosts] = useState<Array<any>>([])
	const [isLoading, setIsLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [totalCount, setTotalCount] = useState<number>(0);
	const [showADPanel, setShowADPanel] = useState<boolean>(true)
	const [openPostModal, setOpenPostModal] = useState<boolean>(false)
	const [selectedPost, setSelectedPost] = useState<IPost>(defaultPost)

	const onCloseADPanel = () => {
		setCookie('muteAD', advertisement._id, { path: '/', expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })
		setShowADPanel(false)
	}

	const onClickPost = (value: any) => {
		setSelectedPost(value)
		setOpenPostModal(true)
	}

	const handleNavigate = (url: string) => {
        window.open(url, "_blank")
    };

	const fetchData = () => {
		setIsLoading(true)

		const data: GetMyListingsDto = {
            userId: '',
			keyword: '',
            sortType: 'Descending',
            sortField: 'Latest',
            recordsPerPage: 5,
            currentPage: currentPage,
            status: 'Active',
        }

        dispatch(getMyListingsByUserId(data)).then((res: any) => {
			try {
				setTotalCount(res.payload.totalCount)
				setListings([
					...listings,
					...res.payload.listings
				])
				setCurrentPage(prevPage => prevPage + 1)
			} catch (e) {
			  	notify(false, "Something went wrong.")
			}
		}).finally(() => {
			setIsLoading(false)
		})
	}

	const fetchAds = () => {
		const data: GetAdvertisementsDto = {
            userId: '',
			keyword: '',
            sortType: 'Descending',
            sortField: '',
            recordsPerPage: 10,
            currentPage: 1,
			status: 'active'
        }

        dispatch(getAdvertisementsFromDB(data)).then((res: any) => {
			try {
				if (res.payload?.advertisements?.length > 0) {
					setAdvertisement(res.payload.advertisements[0])
				}
			} catch (e) {
			  	notify(false, "Something went wrong.")
			}
		})
	}

	const fetchPosts = () => {
		const data: GetPostsDto = {
            userId: '',
			keyword: '',
            sortType: 'Descending',
            sortField: '',
            recordsPerPage: 10,
            currentPage: 1,
        }

        dispatch(getPostsFromDB(data)).then((res: any) => {
			try {
				if (res.payload?.posts?.length > 0) {
					setPosts(res.payload.posts)
				}
			} catch (e) {
			  	notify(false, "Something went wrong.")
			}
		})
	}

	const CustomArrow: React.FC<any> = (props) => {
        const { onClick, direction } = props;
		const className = (direction === 'left' ? 'left-0' : 'right-0')
        return (
            <div className={`custom-arrow ${className}`} onClick={onClick}>
                {direction === "left" && (
					<IconWrapper
						className=""
						name="arrow-backward"
						width={30}
						height={30}
						iconClassName='bg-white bg-opacity-40 hover:bg-opacity-90 rounded-md z-10 p-2 cursor-pointer'
					/>
				)}
				{direction === "right" && (
					<IconWrapper
						className=""
						name="arrow-forward"
						width={30}
						height={30}
						iconClassName='bg-white bg-opacity-40 hover:bg-opacity-90 rounded-md z-10 p-2 cursor-pointer'
					/>
				)}
            </div>
        );
    }

	const sliderSettings = {
		className: 'custom-slider',
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        prevArrow: <CustomArrow direction="left"/>,
        nextArrow: <CustomArrow direction="right"/>
    }

	const handleScroll = (event: any) => {
		const { scrollTop, scrollHeight, clientHeight } = event.target
      	if (scrollTop + clientHeight > scrollHeight * 0.9 && !isLoading && listings.length < totalCount) {
			fetchData()
		}
	}

	useEffect(() => {
		fetchData();
		fetchAds()
		fetchPosts()
	}, [])

	useEffect(() => {
		if (cookies.muteAD && advertisement && cookies.muteAD === advertisement._id) {
			setShowADPanel(false)
		}
	}, [cookies, advertisement])

	

    return (
        <>
			{(openPostModal) && (
				<div className='bg-[#00000040] w-full h-screen flex items-center justify-center fixed top-0 left-0 z-10'></div>
			)}
            <div className='grid grid-cols-3 gap-3 my-10 overflow-y-auto h-[calc(100%-100px)]'>
				<Scrollbars ref={scrollRef} onScroll={handleScroll} autoHide className="min-h-full col-span-3 md:col-span-2">
					{listings?.map((listing, index) => (
						<div key={index} className='flex flex-col bg-white py-8 px-6 mb-[3rem] rounded-md gap-4'>
							<div className='flex flex-row items-center gap-4'>
								<img src={(listing.owner?.agent?.avatarURL !== '' && listing.owner?.agent?.avatarURL !== undefined) ? listing.owner.agent.avatarURL : AddProfile} className='w-[3.125rem] rounded-md'/>
								<div className='flex flex-col w-full'>
									<div className='flex flex-row justify-between'>
										<div className='flex fit-content gap-1'>
											<Typography variant='table-headers'>
												{listing.owner?.agent.firstName + ' ' + listing.owner?.agent.lastName}
											</Typography>
											<Typography variant='body' color='secondary'>listed</Typography>
											<Typography variant='table-row-content'>{listing.listingAddress}</Typography>
										</div>
										<MdMoreVert className='cursor-pointer' />
									</div>
									<Typography variant='caption' color='secondary'>
										14 Minutes Ago
									</Typography>
								</div>
							</div>
							<div className='flex flex-row gap-1.5'>
								{listing.listingListPrice && (
									<div className='flex gap-1'>
										<AiOutlineHome className='w-4.5 text-secondary'/>
										<Typography variant='caption' color='secondary'>{'$' + listing.listingListPrice.toLocaleString()}</Typography>
									</div>
								)}
								{listing.propertyType && (
									<div className='flex gap-1'>
										<AiOutlineHome className='w-4.5 text-secondary'/>
										<Typography variant='caption' color='secondary'>{listing.propertyType}</Typography>
									</div>
								)}
								{listing.propertyBedrooms && (
									<div className='flex gap-1'>
										<AiOutlineHome className='w-4.5 text-secondary'/>
										<Typography variant='caption' color='secondary'>{listing.propertyBedrooms.toLocaleString() + ' Bedroom'}</Typography>
									</div>
								)}
								{listing.propertyBathrooms && (
									<div className='flex gap-1'>
										<AiOutlineHome className='w-4.5 text-secondary'/>
										<Typography variant='caption' color='secondary'>{listing.propertyBathrooms.toLocaleString() + ' Bathroom'}</Typography>
									</div>
								)}
								{listing.propertyLotSqft && (
									<div className='flex gap-1'>
										<AiOutlineHome className='w-4.5 text-secondary'/>
										<Typography variant='caption' color='secondary'>{parseInt(listing.propertyLotSqft).toLocaleString() + ' SqFt'}</Typography>
									</div>
								)}
							</div>
							<div className=''>
								<Slider {...sliderSettings}>
									{listing.propertyPhotos?.map((image: any, index: number) => {
										return (
											<div key={index} className="w-1/3">
												<img className="w-full h-[8rem] rounded-md aspect-auto" 
													src={image.isFile
														? URL.createObjectURL(image.file)
														: image.file}
												/>
											</div>
										)
									})}
									{listing.propertyPhotos.length < 4 && [...Array(4 - listing.propertyPhotos.length)].map((_, index) => (
										<div key={index + listing.propertyPhotos.length} className="w-1/3">
											<img className="w-full h-[8rem] rounded-md aspect-auto" 
												src={ListingImagePlaceholder}
											/>
										</div>
									))}
								</Slider>
							</div>
						</div>
					))}
				</Scrollbars>
				<Scrollbars autoHide className="min-h-full">
					<div className=' col-span-3 md:col-span-1 flex flex-col'>
						{showADPanel && advertisement !== null && advertisement !== undefined && (
							<div className="relative flex flex-col justify-between w-full bg-cover bg-center bg-image rounded-md p-8 mb-6" style={{ backgroundImage: "url('" + (advertisement?.adImageURL && advertisement.adImageURL !== '' ? advertisement.adImageURL : defaultBackground)  + "')" }}>
								<div className='mt-[75%]'></div>
								<div className='absolute top-8 bottom-8 right-8 left-8 flex flex-col justify-between'>
									{advertisement?.adMute === 1 && (
										<img src={XMark} alt="XMark" className="absolute w-3 h-3 -top-3 -right-3 cursor-pointer" onClick={()=>onCloseADPanel()} />
									)}
									<Typography variant='h3' color='white' className='mb-6'>{advertisement.adTitle}</Typography>
									<Typography variant='h4' color='white' className='mb-2 overflow-hidden'>{advertisement.adContent}</Typography>
									<div className='w-full flex items-center justify-center'>
										<Button className='w-[8rem]' onClick={() => handleNavigate(advertisement.adLinkURL)}>
											<Typography variant='button1'>{advertisement.adButtonLabel !== undefined && advertisement.adButtonLabel !== '' ? advertisement.adButtonLabel : 'RSVP' }</Typography>
										</Button>
									</div>
								</div>
							</div>
						)}
						<div className='flex flex-col bg-white py-8 px-8 mb-[3rem] rounded-md gap-4'>
							<Typography variant='h4'>
								Latest Updates
							</Typography>
							<div className='flex flex-col gap-2'>
								{posts?.map((post, index) => (
									<div key={index} className='flex flex-row gap-2 items-center h-[30px] cursor-pointer' onClick={() => onClickPost(post)}>
										<div className='flex items-center justify-center'>
											<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
												<circle cx="5" cy="5" r="5" fill={importanceLevels[post.postImportanceLevel].color}/>
											</svg>
										</div>
										<Typography variant='body' className='hover:font-semibold'>{post.postTitle}</Typography>
									</div>
								))}
							</div>
						</div>
					</div>
				</Scrollbars>
            </div>
			<PostModal open={openPostModal} value={selectedPost} closeModal={() => setOpenPostModal(false)} />
        </>
    )
}

export default DashboardSimple