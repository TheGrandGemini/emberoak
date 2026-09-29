import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
	return (
		<motion.div
			whileHover={{ y: -2, scale: 1.03 }}
			whileTap={{ scale: 0.94 }}
			transition={{ type: 'spring', stiffness: 420, damping: 22 }}
			className='origin-left'>
			<Link href='/'>
				<Image
					src='/assets/Ember & Oak.png'
					alt='Ember and Oak Logo'
					width={150}
					height={150}
					className='p-2'
				/>
			</Link>
		</motion.div>
	);
}
