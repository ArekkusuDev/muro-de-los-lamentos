export function Footer() {
	const currentYear = new Date().getFullYear()

	return (
		<footer className='relative bg-base text-text font-body font-medium'>
			<div className='mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8'>
				<div className='md:flex md:justify-between'>
					<div className='mb-6 md:mb-0'>
						<h2 className='mb-6 text-sm font-semibold uppercase text-overlay-2 tracking-wide'>
							Members
						</h2>
						<ul className='flex flex-col gap-3'>
							<li>
								<a
									href='https://github.com/ArekkusuDev'
									target='_blank'
								>
									Victor Salazar{' '}
									<span className='bg-gradient-to-r from-[#58E1FF] to-blue-500 bg-clip-text text-transparent'>
										[ Lead Developer, WebDesigner ]
									</span>
								</a>
							</li>
							<li>Kevin Zaldívar</li>
							<li>Brayant Santana</li>
							<li>Oscar López</li>
						</ul>
					</div>
					<div className='grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3'>
						<div>
							<h2 className='mb-6 text-sm font-semibold text-overlay-2 tracking-wide uppercase'>
								Resources
							</h2>
							<ul>
								<li className='mb-4'>
									<a
										href='https://tailwindcss.com/'
										target='_blank'
									>
										Tailwind CSS
									</a>
								</li>
								<li className='mb-4'>
									<a
										href='https://react.dev/'
										target='_blank'
									>
										React
									</a>
								</li>
								<li>
									<a
										href='https://www.typescriptlang.org/'
										target='_blank'
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
					<span className='text-sm sm:text-center text-overlay-2'>
						© {currentYear} Muro de los Lamentos. All Rights Reserved.
					</span>
				</div>
			</div>
		</footer>
	)
}
