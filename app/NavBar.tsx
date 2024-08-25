'use client'
import Link from "next/link";
import {AiFillBug} from "react-icons/ai"
import classNames from "classnames";
import {usePathname} from "next/navigation";
import {Box, Container, Flex} from "@radix-ui/themes";
import {useSession} from "next-auth/react";

const NavBar = () => {

    const currentPath  = usePathname();

    const links = [
        { label: 'Dashboard', href: '/'},
        { label: 'Issues', href: '/issues'},
    ]

    //Grabbing the status of the authentication and the data of the user from session
    //status can authenticated, unauthenticated and also loading.
    const { status, data: session} = useSession();

    return (
        <nav className='border-b mb-5 px-4 py-4'>
            <Container>
                <Flex justify='between'>
                    <Flex align='center' gap='3'>
                        <Link href='/'><AiFillBug /></Link>
                        <ul className='flex space-x-6'>
                            {links.map((link) =>
                                <li key={link.href}>
                                    <Link className={classNames({
                                        'text-zinc-900': currentPath === link.href,
                                        'text-zinc-500': currentPath !== link.href,
                                        'hover:text-zinc-800': true
                                    })} href={link.href}>{link.label}</Link>
                                </li>
                            )}

                        </ul>
                    </Flex>
                    <Box>
                        {status === 'authenticated' && <Link href='/api/auth/signout'>Logout</Link>}
                        {status === 'unauthenticated' && <Link href='/api/auth/signin'>Login</Link>}
                    </Box>
                </Flex>
            </Container>
        </nav>
    )
}

export default NavBar;