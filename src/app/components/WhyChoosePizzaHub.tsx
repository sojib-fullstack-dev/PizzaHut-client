'use client';

import { motion, type Variants } from 'framer-motion';
import { Truck, Leaf, Award, Flame, Sparkles } from 'lucide-react';

// 4 distinct customer benefits for PizzaHub
const benefits = [
  {
    id: '01',
    title: 'Fast Delivery',
    tagline: 'Under 30 Minutes',
    description:
      'Steaming hot pizza brought straight from our brick ovens to your doorstep in lightning time.',
    icon: Truck,
    badge: '30 Mins or Free',
  },
  {
    id: '02',
    title: 'Fresh Ingredients',
    tagline: '100% Farm Sourced',
    description:
      'Locally sourced ripe tomatoes, organic herbs, and crisp toppings picked fresh each morning.',
    icon: Leaf,
    badge: 'Organic & Crisp',
  },
  {
    id: '03',
    title: 'Quality Food',
    tagline: 'Master Craftsmanship',
    description:
      'Hand-tossed dough, premium aged mozzarella, and recipes perfected by certified pizzaiolos.',
    icon: Award,
    badge: 'Chef Approved',
  },
  {
    id: '04',
    title: 'Best Taste',
    tagline: 'Stone-Oven Perfection',
    description:
      'Mouthwatering smoky aroma with our secret signature sauce that makes every slice unforgettable.',
    icon: Flame,
    badge: 'Top Rated 4.9★',
  },
];

// Framer Motion animation variants
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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: 'easeOut',
    },
  },
};

export function WhyChoosePizzaHub() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#fffdf9] via-[#fffaf2] to-[#fffdf9] text-[#2d1610]">
      {/* Decorative ambient background blur glows */}
      <div className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-[#ea580c]/10 via-[#a4161a]/10 to-[#f59e0b]/10 blur-3xl opacity-60" />
      <div className="pointer-events-none absolute -bottom-24 left-10 h-80 w-80 rounded-full bg-[#f59e0b]/10 blur-3xl" />

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
          <span className="inline-flex items-center gap-2 rounded-full border border-[#a4161a]/20 bg-[#a4161a]/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#a4161a] shadow-xs">
            <Sparkles className="size-3.5 text-[#ea580c]" />
            The PizzaHub Difference
          </span>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#2d1610] sm:text-4xl lg:text-5xl">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-[#8f1116] via-[#a4161a] to-[#ea580c] bg-clip-text text-transparent">
              PizzaHub
            </span>
            ?
          </h2>

          <p className="mt-3 text-base sm:text-lg leading-relaxed text-[#6b4737]">
            We blend traditional recipes, the finest ingredients, and lightning-fast delivery to give you an unforgettable pizza experience.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 sm:mt-16 lg:mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col justify-between rounded-3xl border border-[#a4161a]/15 bg-white/95 p-7 shadow-[0_10px_30px_-15px_rgba(143,17,22,0.08)] backdrop-blur-sm transition-all duration-300 hover:border-[#a4161a]/30 hover:shadow-[0_20px_40px_-15px_rgba(164,22,26,0.18)]"
              >
                {/* Top row: Icon and index badge */}
                <div>
                  <div className="flex items-center justify-between">
                    {/* Creative Icon Container */}
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8f1116] via-[#a4161a] to-[#ea580c] text-white shadow-[0_10px_20px_-8px_rgba(164,22,26,0.5)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="size-7" strokeWidth={2.2} />
                    </div>

                    {/* Step / benefit number */}
                    <span className="text-2xl font-black text-[#a4161a]/15 group-hover:text-[#a4161a]/30 transition-colors">
                      {benefit.id}
                    </span>
                  </div>

                  {/* Title and details */}
                  <h3 className="mt-6 text-xl font-bold text-[#2d1610]">
                    {benefit.title}
                  </h3>

                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#ea580c]">
                    {benefit.tagline}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-[#6b4737]">
                    {benefit.description}
                  </p>
                </div>

                {/* Bottom pill highlight */}
                <div className="mt-6 pt-5 border-t border-[#a4161a]/10">
                  <span className="inline-block text-xs font-semibold text-[#8a6553] bg-[#fff8ee] px-3 py-1 rounded-full border border-[#ea580c]/15">
                    {benefit.badge}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default WhyChoosePizzaHub;

