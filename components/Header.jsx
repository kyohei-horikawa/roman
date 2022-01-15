import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { IconContext } from "react-icons";
import { FaGithub, FaExchangeAlt } from "react-icons/fa";
import { MdChangeCircle } from "react-icons/md";

export const Header = () => {
  const path = useRouter().asPath;
  const href = path === "/" ? "/RomanToArabic" : "/";
  return (
    <div className="flex justify-between">
      <Link href="/">
        <a>
          <Image src="/title.png" alt="title" width={900} height={100} />
        </a>
      </Link>
      <div className="flex">
        <Link href={href}>
          <a  className="block my-auto p-4">
            <IconContext.Provider value={{ size: "60px" }}>
              <FaExchangeAlt />
            </IconContext.Provider>
          </a>
        </Link>
        <Link href="https://github.com/kyohei-horikawa/roman">
          <a  className="block my-auto">
            <IconContext.Provider value={{ size: "60px" }}>
              <FaGithub />
            </IconContext.Provider>
          </a>
        </Link>
      </div>
    </div>
  );
};
