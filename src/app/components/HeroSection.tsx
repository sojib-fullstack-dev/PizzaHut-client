'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Flame } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

// Stagger container for the hero content
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Smooth fade-in & slide-up variant for hero text elements
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

export function HeroSection() {
  return (
    <section className="relative min-h-[580px] lg:min-h-[680px] overflow-hidden bg-[#180a06] flex items-center">
      {/* Full Background Image with subtle cinematic zoom-in */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <Image
          src="/images/pizza-hero.jpg"
          alt="Hot and fresh pizza background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center lg:object-[right_center]"
        />
        {/* Cinematic dark warm gradient overlay so text remains crystal clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#120603]/95 via-[#120603]/80 to-[#120603]/35 lg:via-[#120603]/75 lg:to-[#120603]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#120603] via-transparent to-transparent opacity-80 lg:opacity-40" />
      </motion.div>

      <div className="relative mx-auto flex min-h-[580px] w-full max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 sm:py-20 lg:min-h-[680px] lg:px-8 lg:py-24">
        {/* Left side: animated text and actions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl text-center lg:max-w-2xl lg:text-left"
        >
          {/* Tag badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#f59e0b] shadow-lg backdrop-blur-md">
              <Flame
                className="size-3.5 text-[#f59e0b]"
                strokeWidth={2.4}
                aria-hidden
              />
              Fresh from the oven
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="mt-5 text-balance text-[2.55rem] font-extrabold leading-[1.04] tracking-[-0.045em] text-[#fff8ee] sm:text-5xl lg:text-[3.9rem] xl:text-[4.35rem]"
          >
            Hot &amp; Fresh Pizza{' '}
            <span className="bg-gradient-to-r from-[#f59e0b] via-[#ea580c] to-[#ef4444] bg-clip-text text-transparent">
              Delivered
            </span>{' '}
            to Your Door
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-[#e2c7b7] sm:text-base sm:leading-8 lg:mx-0"
          >
            Discover local pizza shops, explore delicious handcrafted pizzas,
            and enjoy fresh pizza delivery — straight from the oven to your
            doorstep.
          </motion.p>

          {/* Action button */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/browseMenu"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#8f1116] via-[#a4161a] to-[#c2410c] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_28px_-14px_rgba(164,22,26,0.9)] transition-all duration-300 hover:shadow-[0_18px_34px_-14px_rgba(194,65,12,0.95)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b]/50"
              >
                Explore Pizza Menu
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2.4}
                  aria-hidden
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Small trust row */}
          <motion.ul
            variants={itemVariants}
            className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] font-semibold text-[#ddc2b2] lg:justify-start"
          >
            <li className="flex items-center gap-1.5">
              <Check
                className="size-4 text-[#ea580c]"
                strokeWidth={2.8}
                aria-hidden
              />
              Local pizza shops
            </li>
            <li className="flex items-center gap-1.5">
              <Check
                className="size-4 text-[#ea580c]"
                strokeWidth={2.8}
                aria-hidden
              />
              Fresh ingredients
            </li>
            <li className="flex items-center gap-1.5">
              <Check
                className="size-4 text-[#ea580c]"
                strokeWidth={2.8}
                aria-hidden
              />
              Fast delivery
            </li>
          </motion.ul>
        </motion.div>

        {/* Floating badge placed at bottom right with entrance + gentle hover */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          whileHover={{ y: -4 }}
          className="mt-10 flex justify-center sm:justify-end lg:absolute lg:bottom-10 lg:right-8 lg:mt-0 xl:bottom-12 xl:right-10"
        >
          <div className="inline-flex items-center gap-3.5 rounded-2xl border border-white/20 bg-white/95 px-5 py-3.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9)]">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#ea580c]/15 text-[#ea580c]">
              <Flame className="size-5" strokeWidth={2.4} aria-hidden />
            </span>
            <span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#8a6553]">
                Straight from the oven
              </span>
              <span className="mt-0.5 block text-sm font-bold text-[#2d1610]">
                Hot &amp; Fresh Pizza
              </span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
