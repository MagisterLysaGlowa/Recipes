import React from "react";
import Image from "next/image";
import logo from "../../public/images/full_logo.png";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { LogoutButton } from "../auth";
const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const data = JSON.parse(JSON.stringify(session));

  return (
    <nav className="flex items-center px-5 h-[60px] bg-white shadow-sm shadow-main">
      <Link href={"/"}>
        <Image src={logo} alt="logo" height={30} />
      </Link>
      <ul className="flex items-center gap-20 justify-end flex-grow">
        <li>
          <Link href={"/recipe"} className="text-main text-lg font-bold">
            PRZEPISY
          </Link>
        </li>
        <li>
          <Link href={"/recipe/my"} className="text-main text-lg font-bold">
            MOJE PRZEPISY
          </Link>
        </li>
        <li>
          <Link href={"/cooking"} className="text-main text-lg font-bold">
            GOTOWANIE
          </Link>
        </li>
        <li>
          <Link href={"/about"} className="text-main text-lg font-bold">
            O NAS
          </Link>
        </li>
        {!data && (
          <li>
            <Link
              href={"/auth/login"}
              className="text-white bg-main rounded-lg text-lg px-5 py-2 font-bold"
            >
              ZALOGUJ SIĘ
            </Link>
          </li>
        )}
        {data && (
          <li>
            <LogoutButton />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
