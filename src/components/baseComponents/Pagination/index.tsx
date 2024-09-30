import React from 'react';
import Typography from '../Typography';

interface IProps {
	totalPage: number
	currentPage: number
	onSetPage: Function
	loadingData: boolean
}
const Pagination = ({ totalPage, currentPage, onSetPage, loadingData }: IProps) => {
	const normalClass = 'cursor-pointer select-none text-secondary';
	const activeClass = 'cursor-pointer select-none text-primary';

	React.useEffect(() => {
		console.log(totalPage, currentPage)
	}, [])
	return (
		<div className={`flex gap-10 items-center ${loadingData ? 'pointer-events-none' : ''}`}>
			<Typography
				variant="medium-text"
				className={`${currentPage === 1 ? 'cursor-default text-secondary' : 'text-primary cursor-pointer'} pr-10`}
				onClick={() => {
					onSetPage(currentPage > 1 ? currentPage - 1 : 1);
				}}
			>
				Previous
			</Typography>
			{currentPage > 1 ? (
				<Typography
					variant="medium-text"
					className={normalClass}
					onClick={() => {
						onSetPage(1);
					}}
				>
					1
				</Typography>
			) : (
				<></>
			)}
			{currentPage > 3 && totalPage <= 4 ? (
				<Typography
					variant="medium-text"
					className={normalClass}
					onClick={() => {
						onSetPage(2);
					}}
				>
					2
				</Typography>
			) : (
				<></>
			)}
			{currentPage > 3 && totalPage > 4 ? <Typography variant="medium-text" className={normalClass}>...</Typography> : <></>}
			{currentPage > 2 ? (
				<Typography
					variant="medium-text"
					className={normalClass}
					onClick={() => {
						onSetPage(currentPage - 1);
					}}
				>
					{currentPage - 1}
				</Typography>
			) : (
				<></>
			)}
			<Typography variant="medium-text" className={activeClass}>{currentPage}</Typography>

			{currentPage + 1 < totalPage ? (
				<Typography
					variant="medium-text"
					className={normalClass}
					onClick={() => {
						onSetPage(currentPage + 1);
					}}
				>
					{currentPage + 1}
				</Typography>
			) : (
				<></>
			)}
			{currentPage + 2 < totalPage && currentPage === 1 ? (
				<Typography
					variant="medium-text"
					className={normalClass}
					onClick={() => {
						onSetPage(currentPage + 2);
					}}
				>
					{currentPage + 2}
				</Typography>
			) : (
				<></>
			)}
			{totalPage > 3 && currentPage + 3 <= totalPage ? <Typography variant="medium-text" className={normalClass}>...</Typography> : <></>}

			{totalPage > 1 && currentPage !== totalPage ? (
				<Typography
					variant="medium-text"
					className={normalClass}
					onClick={() => {
						onSetPage(totalPage);
					}}
				>
					{totalPage}
				</Typography>
			) : (
				<></>
			)}

			<Typography
				variant="medium-text"
				className={`${currentPage === (totalPage > 0 ? totalPage : 1) ? 'cursor-default text-secondary' : 'text-primary  cursor-pointer'} pl-10`}
				onClick={() => {
					onSetPage(currentPage < (totalPage > 0 ? totalPage : 1) ? currentPage + 1 : (totalPage > 0 ? totalPage : 1));
				}}
			>
				Next
			</Typography>
		</div>
	);
}

export default Pagination