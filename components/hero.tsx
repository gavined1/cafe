"use client";

import * as React from "react";
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from "@/components/ui/button";
import Image from "next/image";

type HeroImage = {
	src: string;
	alt: string;
};

interface HeroProps {
	images: HeroImage[];
}

export default function Hero({ images }: HeroProps) {
	const [activeIdx, setActiveIdx] = React.useState(0);
	const [emblaRef, emblaApi] = useEmblaCarousel({
		axis: 'x',
		loop: true,
		dragFree: false,
	});

	// Sync embla selected index with state
	React.useEffect(() => {
		if (!emblaApi) return;
		const onSelect = () => {
			setActiveIdx(emblaApi.selectedScrollSnap());
		};
		emblaApi.on('select', onSelect);
		return () => {
			emblaApi.off('select', onSelect);
		};
	}, [emblaApi]);

	if (!images || !images.length) {
		return null;
	}

	return (
		<section className="flex flex-col items-center gap-1 py-3">
			{/* Label above carousel */}
			<div className="w-full max-w-6xl flex flex-col items-start mb-0">
				<span className="text-sm font-semibold uppercase tracking-widest text-teal-600 bg-teal-50 dark:bg-teal-900/40 px-4 py-1 rounded-full shadow-sm ml-2">
					Featured Drinks & Pastries
				</span>
			</div>
			<div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6 bg-background/80 rounded-2xl p-4 shadow-xl mt-2">
				{/* Main Carousel Image with Add to Cart button overlay, swipeable */}
				<div className="flex-1 flex items-center justify-center rounded-xl overflow-hidden bg-muted min-h-[320px] relative">
					<div ref={emblaRef} className="w-full h-full overflow-hidden">
						<div className="embla__container flex h-full">
											{images.map((img: HeroImage, idx: number) => (
												<div
													key={img.src}
													className="embla__slide flex-shrink-0 w-full h-full relative aspect-[16/9]"
													style={{ minWidth: '100%', minHeight: '320px' }}
												>
																		<Image
																			src={img.src}
																			alt={img.alt}
																			fill
																			sizes="(min-width: 1024px) 800px, 100vw"
																			className="rounded-xl object-cover w-full h-full max-h-[420px]"
																			priority={idx === activeIdx}
																		/>
													{idx === activeIdx && (
														<Button
															className="absolute bottom-6 right-6 bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-2 rounded-full shadow-lg"
															variant="default"
															size="lg"
															style={{ zIndex: 2 }}
														>
															Add to Cart
														</Button>
													)}
												</div>
											))}
						</div>
					</div>
				</div>
				{/* Thumbnails */}
				<div className="flex lg:flex-col gap-4 justify-center items-center lg:w-48">
								{images.map((img: HeroImage, idx: number) => (
									<button
										key={img.src}
										onClick={() => {
											setActiveIdx(idx);
											if (emblaApi) emblaApi.scrollTo(idx);
										}}
										className={`overflow-hidden rounded-xl border-2 transition-all duration-200 focus:outline-none ${
											idx === activeIdx
												? "border-teal-500 ring-2 ring-teal-400"
												: "border-transparent opacity-70 hover:opacity-100"
										}`}
										style={{ width: 110, height: 70 }}
										aria-label={`Show image ${idx + 1}`}
										type="button"
									>
														<div className="relative aspect-[16/9] w-full h-full">
															<Image
																src={img.src}
																alt={img.alt}
																fill
																sizes="110px"
																className="object-cover w-full h-full rounded-xl"
															/>
														</div>
									</button>
								))}
				</div>
			</div>
			<div className="flex flex-col items-center gap-2 mt-4">
				<h2 className="text-3xl lg:text-4xl font-extrabold text-center tracking-tight text-teal-700 dark:text-teal-400 drop-shadow-lg">
					Discover Our Café Experience
				</h2>
				<p className="text-muted-foreground text-center max-w-xl">
					Enjoy the best coffee, pastries, and atmosphere. Order your favorites
					or visit us today!
				</p>
				<Button
					asChild
					className="mt-4 px-8 py-3 text-base rounded-full font-bold shadow bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-700 hover:to-cyan-600 border-0"
				>
					<a href="/menu">Order Now</a>
				</Button>
			</div>
		</section>
	);
}
