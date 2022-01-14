import Link from "next/link";
import { IconContext } from "react-icons";
import { FaGithub } from "react-icons/fa";

export const Header = () => {
  return (
    <div className="flex justify-between">
      <h2 className="text-green-500 text-5xl">Roman Converter</h2>
      <div className="flex">
        <Link href="https://github.com/kyohei-horikawa/roman">
          <a>
            <IconContext.Provider value={{ size: "50px" }}>
              <FaGithub />
            </IconContext.Provider>
          </a>
        </Link>
      </div>
    </div>
  );
};
