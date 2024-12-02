import React from "react";
import Image from "next/image";
import logo from "../../public/images/full_logo.png";
import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="flex items-center px-5 h-[60px] bg-white shadow-sm shadow-main">
      <Link href={"/"}>
        <Image src={logo} alt="logo" height={30} />
      </Link>
      <ul className="flex items-center gap-20 justify-end flex-grow">
        <li>
          <Link href={"/recipe/my"} className="text-main text-lg font-bold">
            MOJE PRZEPISY
          </Link>
        </li>
        <li>
          <Link href={"/about"} className="text-main text-lg font-bold">
            O NAS
          </Link>
        </li>
        <li>
          <Link
            href={"/login"}
            className="text-white bg-main rounded-lg text-lg px-5 py-2 font-bold"
          >
            ZALOGUJ SIĘ
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
