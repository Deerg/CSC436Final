import Image from "next/image";
import cargoWhite from '../images/cargo-white.svg'
import Link from "next/link";
import ActionsFooter from "./ActionsFooter";
const Header = () => {
    return <header className="barge bg-black flex justify-between items-center">
        <ActionsFooter />
        <p className="h1 text-white">
        <Link className="hover:text-brutal-yello duration-300 transition-all" href="/">
            Home
        </Link>
        </p>
    </header>;
}

export default Header;