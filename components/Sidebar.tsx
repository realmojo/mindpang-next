import Link from "next/link";
import categoryJSON from "@/app/assets/js/category.json";

interface SidebarItem {
  category: string;
  link: string;
  title: string;
  logo: string;
}

interface CategoryItem {
  title: string;
  key: string;
  link: string;
  icon?: string;
}

interface SidebarProps {
  recentlyItems: SidebarItem[];
  popularItems: SidebarItem[];
}

const convertCategory = (value: string) => {
  let convertString = value;
  if (value.includes("life")) {
    convertString = convertString.replace("life", "라이프");
  }
  if (value.includes("love")) {
    convertString = convertString.replace("love", "사랑");
  }
  if (value.includes("health")) {
    convertString = convertString.replace("health", "건강");
  }
  if (value.includes("entertain")) {
    convertString = convertString.replace("entertain", "연예");
  }
  if (value.includes("money")) {
    convertString = convertString.replace("money", "돈");
  }
  if (value.includes("test")) {
    convertString = convertString.replace("test", "테스트");
  }
  if (value.includes("download")) {
    convertString = convertString.replace("download", "다운로드");
  }
  return convertString;
};

export default function Sidebar({ recentlyItems, popularItems }: SidebarProps) {
  const menuItems = categoryJSON;

  return (
    <div className="mt-12 mb-8 px-4">
      {/* Categories */}
      <div className="mb-10">
        <h3 className="text-xl font-serif font-bold text-luxury-gold mb-6 border-b border-white/10 pb-2">
          Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          {(menuItems as CategoryItem[]).map((menu) => (
            <Link
              key={menu.key}
              href={menu.key !== "all" ? `/${menu.key}` : "/"}
              className="px-4 py-2 rounded-full border border-white/10 text-sm text-gray-400 hover:text-luxury-gold hover:border-luxury-gold hover:bg-luxury-gold/5 transition-all duration-300"
            >
              #{menu.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Latest Tests */}
      <div className="mb-10">
        <h3 className="text-xl font-serif font-bold text-luxury-gold mb-6 border-b border-white/10 pb-2">
          Latest Tests
        </h3>
        <ul className="space-y-4">
          {recentlyItems.map((item, index) => (
            <li key={index}>
              <Link
                href={`/${item.category}/${item.link}`}
                className="group flex items-center p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-luxury-gold/30 transition-all duration-300"
              >
                <img
                  className="w-12 h-12 rounded-lg object-cover mr-4 opacity-80 group-hover:opacity-100 transition-opacity"
                  alt={item.title}
                  src={item.logo}
                />
                <div className="flex flex-col overflow-hidden">
                  <span className="text-gray-300 font-medium truncate group-hover:text-luxury-gold transition-colors">
                    {item.title}
                  </span>
                  <span className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                    {convertCategory(item.category)}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Tests */}
      <div>
        <h3 className="text-xl font-serif font-bold text-luxury-gold mb-6 border-b border-white/10 pb-2">
          Popular Tests
        </h3>
        <ul className="space-y-4">
          {popularItems.map((item, index) => (
            <li key={index}>
              <Link
                href={`/${item.category}/${item.link}`}
                className="group flex items-center p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-luxury-gold/30 transition-all duration-300"
              >
                <img
                  className="w-12 h-12 rounded-lg object-cover mr-4 opacity-80 group-hover:opacity-100 transition-opacity"
                  alt={item.title}
                  src={item.logo}
                />
                <div className="flex flex-col overflow-hidden">
                  <span className="text-gray-300 font-medium truncate group-hover:text-luxury-gold transition-colors">
                    {item.title}
                  </span>
                  <span className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                    {convertCategory(item.category)}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
