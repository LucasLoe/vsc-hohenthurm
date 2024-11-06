import { TriangleRightIcon } from '@radix-ui/react-icons'
import React from 'react'
import { roboto } from '../Fonts'
import Img from '@/ui/Img'
import { cn } from '@/lib/utils'

type BoardMember = {
	name: string
	image: Sanity.Image
}

const Polaroid = ({ boardmember }: { boardmember: BoardMember }) => {
	return (
		<div className="mx-auto aspect-[72/64] w-full max-w-64 rounded bg-white p-2 shadow-lg sm:p-4">
			<div className="shadow-inner">
				<Img
					className="aspect-square w-full self-center rounded bg-vsc-grey object-cover"
					image={boardmember.image}
					imageWidth={800}
				/>
			</div>
			<p
				className={cn(
					'text-light tex-md mt-2 truncate sm:text-lg',
					roboto.className,
				)}
			>
				{boardmember.name}
			</p>
		</div>
	)
}

const VSCBoardMembers = ({ boardMembers }: { boardMembers: BoardMember[] }) => {
	return (
		<section className="mx-auto flex w-full max-w-5xl flex-col place-items-center py-8">
			<div className="grid w-full grid-cols-2 gap-x-4 gap-y-4 p-4 sm:grid-cols-3 sm:gap-y-8">
				{boardMembers
					? boardMembers.map((member, idm) => (
							<Polaroid key={idm} boardmember={member} />
						))
					: null}
			</div>
		</section>
	)
}

export default VSCBoardMembers
