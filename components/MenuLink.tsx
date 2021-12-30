import Link from "next/link";
import { useRouter } from "next/router";
import { FC, SVGProps } from "react";

interface LinkProps {
  path: string;
  label: string;
  icon: (props?: SVGProps<SVGSVGElement>) => JSX.Element;
}
const MenuLink: FC<LinkProps> = ({ path, label, icon }) => {
  const router = useRouter();

  return (
    <Link href={path}>
      <a
        className={`flex p-2 items-center space-x-2 hover:text-white rounded-md transition-colors ${
          router.pathname === path ? "bg-gray-900 text-white" : ""
        }`}
      >
        <div className="h-5 w-5">{icon()}</div>
        <p>{label}</p>
      </a>
    </Link>
  );
};

export default MenuLink;
