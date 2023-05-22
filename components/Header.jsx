import Image from "next/image";
import cargoWhite from '../images/cargo-white.svg'
import Link from "next/link";
import ActionsFooter from "./ActionsFooter";
import { getCurrentUser } from "csc-start/utils/data";


const Header = async () => {
    const{data, error, success} = await getCurrentUser();

    return <header className="barge bg-black flex justify-between items-center">
        <ActionsFooter />
        <p className="h1 text-white">
        <Link className="hover:text-brutal-yello  duration-300 transition-all" href="/">
        </Link>
        </p>
    </header>;
}

export default Header;