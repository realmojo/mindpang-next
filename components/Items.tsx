import Link from "next/link";
import Image from "next/image";

interface Item {
  category: string;
  link: string;
  title: string;
  description: string;
  logo: string;
}

interface ItemsProps {
  items: Item[];
}

export default function Items({ items }: ItemsProps) {
  return (
    <>
      {items.map((item) => (
        <Link
          key={item.link}
          href={`/${item.category}/${item.link}`}
          className="group flex mb-6 bg-[#1E1E1E] border border-white/5 rounded-xl overflow-hidden hover:border-luxury-gold/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:-translate-y-1"
        >
          <figure className="w-1/3 min-w-[120px] relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
            <img
              src={item.logo}
              alt={item.title}
              className="w-full h-full object-cover aspect-square transform group-hover:scale-110 transition-transform duration-500"
            />
          </figure>
          <div className="w-2/3 p-5 flex flex-col justify-center">
            <h2 className="text-lg font-serif font-bold text-gray-100 mb-2 group-hover:text-luxury-gold transition-colors line-clamp-1">
              {item.title}
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
              {item.description}
            </p>
            <div className="mt-3 flex items-center text-xs text-luxury-gold/70 font-medium uppercase tracking-wider">
              <span className="mr-2">Play Now</span>
              <svg
                className="w-3 h-3 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

