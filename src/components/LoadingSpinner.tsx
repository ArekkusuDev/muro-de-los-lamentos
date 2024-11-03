export function LoadingSpinner() {
	return (
		<div className='flex items-center justify-center h-[calc(100vh-4.5rem)] w-full'>
			<div
				className='border-[#CBA6F7] h-20 w-20 animate-spin rounded-full border-8 border-t-transparent'
				role='status'
				aria-label='loading'
			></div>
		</div>
	)
}
