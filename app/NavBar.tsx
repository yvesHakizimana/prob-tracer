'use client'
import Link from "next/link";
import {AiFillBug} from "react-icons/ai"
import classNames from "classnames";
import {usePathname} from "next/navigation";

const NavBar = () => {

    const currentPath  = usePathname();

    const links = [
        { label: 'Dashboard', href: '/'},
        { label: 'Issues', href: '/issues'},
    ]

    return (
        <nav className='flex space-x-6 border-b mb-5 px-4 h-14 items-center'>
            <Link href='/'><AiFillBug /></Link>
            <ul className='flex space-x-6'>
                {links.map((link) => <Link key={link.href} className={classNames({
                    'text-zinc-900': currentPath === link.href,
                    'text-zinc-500': currentPath !== link.href,
                    'hover:text-zinc-800': true
                })} href={link.href}>{link.label}</Link>)}
            </ul>
        </nav>
    )
}

export default NavBar;