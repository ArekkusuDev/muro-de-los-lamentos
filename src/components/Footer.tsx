export function Footer() {
	const currentYear = new Date().getFullYear()

	return (
		<footer className='bg-gray-800 font-body'>
			<div className='mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8'>
				<div className='md:flex md:justify-between'>
					<div className='mb-6 md:mb-0'>
						<h2 className='mb-6 text-sm font-semibold uppercase'>Integrantes</h2>
						<ul className='flex flex-col gap-3 text-gray-400 font-medium'>
							<li>
								Victor Alejandro{' '}
								<span className='bg-gradient-to-r from-[#58E1FF] to-blue-500 bg-clip-text text-transparent'>
									[ Lead Developer, WebDesigner ]
								</span>
							</li>
							<li>Kevin Leonardo</li>
							<li>Brayant Javier</li>
							<li>Oscar</li>
						</ul>
					</div>
					<div className='grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3'>
						<div>
							<h2 className='mb-6 text-sm font-semibold uppercase'>Resources</h2>
							<ul className='text-gray-400 font-medium'>
								<li className='mb-4'>
									<a
										href='https://tailwindcss.com/'
										target='_blank'
										className='hover:underline'
									>
										Tailwind CSS
									</a>
								</li>
								<li className='mb-4'>
									<a
										href='https://react.dev/'
										target='_blank'
										className='hover:underline'
									>
										React
									</a>
								</li>
								<li>
									<a
										href='https://www.typescriptlang.org/'
										target='_blank'
										className='hover:underline'
									>
										TypeScript
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<hr className='my-6 sm:mx-auto border-gray-700 lg:my-8' />
				<div className='sm:flex sm:items-center sm:justify-between'>
					<span className='text-sm sm:text-center text-gray-400'>
						© {currentYear} Muro de los Lamentos. All Rights Reserved.
					</span>
				</div>
			</div>
		</footer>
	)
}
