'use client';

import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Amader categories - image er moto numbered card akare dekhay
// Card e click korle browseMenu e oi category soho chole jay
const categories = [
  // Notun category list - value = label (browseMenu filter er sathe match kore)
  { number: '01', value: 'Classic Pizzas', label: 'Classic Pizzas' },
  { number: '02', value: 'Vegetarian Pizzas', label: 'Vegetarian Pizzas' },
  { number: '03', value: 'Meat Lovers', label: 'Meat Lovers' },
  { number: '04', value: 'Specialty / Gourmet Pizzas', label: 'Specialty / Gourmet Pizzas' },
  { number: '05', value: 'Sides & Appetizers', label: 'Sides & Appetizers' },
  { number: '06', value: 'Beverages & Desserts', label: 'Beverages & Desserts' },
];

// Animation: fade-in + slide-up + stagger (baki home components er motoi)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// Home page er notun section: category cards (PizzaHut theme color)
export function MenuCategories() {
  return (
    <section className="relative overflow-hidden bg-[#fff8ee] py-16 text-[#2d1610] sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header - left aligned (image er moto) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#a4161a]">
            A little something for everyone
          </span>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            What sounds{' '}
            <span className="bg-gradient-to-r from-[#8f1116] via-[#a4161a] to-[#ea580c] bg-clip-text text-transparent italic">
              good?
            </span>
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-[#6b4737] sm:text-base">
            From the classics to &ldquo;one more slice,&rdquo; find your kind of
            delicious.
          </p>
        </motion.div>

        {/* Category cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.value}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="h-full"
            >
              <Link
                href={`/browseMenu?category=${cat.value}`}
                className="group relative flex h-full min-h-36 flex-col justify-between overflow-hidden rounded-3xl border border-[#8d1b1b]/10 bg-white p-6 shadow-[0_10px_30px_-18px_rgba(80,20,10,0.25)] transition-all duration-300 hover:border-[#a4161a]/30 hover:shadow-[0_20px_40px_-18px_rgba(164,22,26,0.35)]"
              >
                {/* Decorative circle - top right (image er moto) */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-12 size-36 rounded-full bg-[#ea580c]/10 transition-colors duration-300 group-hover:bg-[#ea580c]/20"
                />

                {/* Number */}
                <span className="relative text-xs font-extrabold tracking-wider text-[#ea580c]">
                  {cat.number}
                </span>

                {/* Title + arrow */}
                <div className="relative mt-8 flex items-center justify-between gap-3">
                  <h3 className="text-lg font-extrabold text-[#3d211a] sm:text-xl">
                    {cat.label}
                  </h3>
                  <ArrowRight
                    className="size-5 shrink-0 text-[#a4161a] transition-transform duration-300 group-hover:translate-x-1.5"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default MenuCategories;
