'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import useCartStore from '@/store/cartStore';

const MotionLink = motion(Link);

export default function CartSummary({
	subtotal,
	serviceCharge,
	total,
	checkoutDisabled,
}) {
	const closeCart = useCartStore((state) => state.closeCart);

	return (
		<motion.footer
			layout
			className='shrink-0 border-t border-line-soft px-5 py-4'>
			<div className='space-y-2 font-mono text-xs'>
				<div className='flex justify-between text-text-soft'>
					<span>Subtotal</span>
					<span className='text-primary'>₦{subtotal.toLocaleString()}</span>
				</div>
				<div className='flex justify-between text-text-soft'>
					<span>Service (10%)</span>
					<span className='text-primary'>
						₦{serviceCharge.toLocaleString()}
					</span>
				</div>
				<div className='flex justify-between border-t border-line-soft pt-2 text-sm font-semibold text-primary'>
					<span>Total</span>
					<motion.span
						key={total}
						initial={{ opacity: 0, y: 4 }}
						animate={{ opacity: 1, y: 0 }}>
						₦{total.toLocaleString()}
					</motion.span>
				</div>
			</div>

			<div className='mt-4 border-t border-line-soft pt-4'>
				<MotionLink
					href='/checkout'
					aria-disabled={checkoutDisabled}
					onClick={(event) => {
						if (checkoutDisabled) {
							event.preventDefault();
							return;
						}
						closeCart();
					}}
					whileHover={checkoutDisabled ? undefined : { y: -1 }}
					whileTap={checkoutDisabled ? undefined : { scale: 0.99 }}
					className={`flex min-h-12 w-full items-center justify-center rounded-[0.625rem] px-4 font-mono text-sm font-semibold transition-colors ${checkoutDisabled ? 'cursor-not-allowed bg-line-soft text-text-soft' : 'bg-ember text-white hover:bg-ember-hover'}`}>
					Proceed to Checkout
				</MotionLink>
			</div>
		</motion.footer>
	);
}
