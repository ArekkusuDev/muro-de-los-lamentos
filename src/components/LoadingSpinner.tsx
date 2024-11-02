export function LoadingSpinner() {
	return (
		<div className='flex items-center justify-center h-[calc(100vh-4.5rem)]'>
			<div className='animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500'></div>
		</div>
	)
}
