'use client';

import { motion, type Variants } from 'framer-motion';
import { Pizza, ShoppingBag, UtensilsCrossed, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    stepNumber: '01',
    title: 'Browse Pizza',
    highlight: 'Explore your favorite pizza.',
    description:
      'Explore handcrafted pizzas, signature crusts, and fresh ingredients baked to perfection for every craving.',
    icon: Pizza,
    badgeText: 'Handcrafted Menus',
  },
  {
    stepNumber: '02',
    title: 'Place Order',
    highlight: 'Order easily.',
    description:
      'Customize your toppings, pick your favorite sides, and checkout smoothly in seconds with secure options.',
    icon: ShoppingBag,
    badgeText: 'Quick & Secure',
  },
  {
    stepNumber: '03',
    title: 'Enjoy Your Pizza',
    highlight: 'Receive and enjoy your pizza.',
    description:
      'Delivered straight from our blazing ovens right to your doorstep piping hot, fresh, and ready to enjoy.',
    icon: UtensilsCrossed,
    badgeText: 'Oven-Fresh Delivery',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export function HowPizzaHutWorks() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#fffaf2] via-[#fffdf9] to-[#fffaf2] text-[#2d1610]">
      {/* Decorative background glow accents matching PizzaHut theme */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-[#ea580c]/10 via-[#a4161a]/10 to-[#f59e0b]/10 blur-3xl opacity-60" />
      <div className="pointer-events-none absolute -bottom-24 right-10 w-80 h-80 rounded-full bg-[#f59e0b]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          {/* Eyebrow badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-[#a4161a]/20 bg-[#a4161a]/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#a4161a] shadow-sm">
            <Sparkles className="size-3.5 text-[#ea580c]" />
            Easy 3-Step Process
          </span>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-[#2d1610]">
            How{' '}
            <span className="bg-gradient-to-r from-[#8f1116] via-[#a4161a] to-[#ea580c] bg-clip-text text-transparent">
              PizzaHut
            </span>{' '}
            Works
          </h2>

          <p className="mt-3 text-base sm:text-lg text-[#6b4737] leading-relaxed">
            From our hot brick ovens to your dining table in three effortless steps.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="relative mt-14 sm:mt-16 lg:mt-20 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {/* Connecting line for desktop view */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-[72px] left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-[#ea580c]/30 z-0 pointer-events-none"
          />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="group relative z-10 flex flex-col items-center text-center rounded-3xl border border-[#a4161a]/15 bg-white/95 p-8 shadow-[0_10px_30px_-15px_rgba(143,17,22,0.08)] backdrop-blur-md transition-all duration-300 hover:border-[#a4161a]/30 hover:shadow-[0_20px_40px_-15px_rgba(164,22,26,0.18)]"
              >
                {/* Floating step number pill */}
                <div className="absolute -top-3.5 right-6 inline-flex items-center rounded-full bg-gradient-to-r from-[#8f1116] to-[#ea580c] px-3 py-0.5 text-xs font-extrabold text-white shadow-md">
                  STEP {step.stepNumber}
                </div>

                {/* Creative Icon with warm glow */}
                <div className="relative mb-6 flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8f1116] via-[#a4161a] to-[#ea580c] text-white shadow-[0_12px_24px_-8px_rgba(164,22,26,0.5)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Icon className="size-9" strokeWidth={2.2} />
                </div>

                {/* Step Content */}
                <h3 className="text-xl font-bold text-[#2d1610] sm:text-2xl">
                  {step.title}
                </h3>

                <p className="mt-1 text-sm font-semibold text-[#ea580c]">
                  {step.highlight}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-[#6b4737]">
                  {step.description}
                </p>

                {/* Bottom Badge */}
                <div className="mt-6 pt-5 border-t border-[#a4161a]/10 w-full flex items-center justify-center">
                  <span className="text-xs font-medium text-[#8a6553] bg-[#fff8ee] px-3 py-1 rounded-full border border-[#ea580c]/15">
                    {step.badgeText}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to action below steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/browseMenu"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8f1116] via-[#a4161a] to-[#ea580c] px-7 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_-10px_rgba(164,22,26,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-10px_rgba(234,88,12,0.9)]"
          >
            Start Your Order Now
            <ArrowRight className="size-4" strokeWidth={2.4} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default HowPizzaHutWorks;
