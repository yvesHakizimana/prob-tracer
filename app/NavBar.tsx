'use client'
import Link from "next/link";
import {AiFillBug} from "react-icons/ai"
import classNames from "classnames";
import {usePathname} from "next/navigation";
import {Avatar, Box, Container, DropdownMenu, Flex, Text} from "@radix-ui/themes";
import {useSession} from "next-auth/react";
import {Skeleton} from "@/app/components";


const NavBar = () => {
    return (
        <nav className='border-b mb-5 px-4 py-4'>
            <Container>
                <Flex justify='between'>
                    <Flex align='center' gap='3'>
                        <Link href='/'><AiFillBug /></Link>
                        <NavLinks />
                    </Flex>
                    <AuthStatus />
                </Flex>

            </Container>
        </nav>
    )
}

const NavLinks = () => {
    const currentPath  = usePathname();
    const links = [
        { label: 'Dashboard', href: '/'},
        { label: 'Issues', href: '/issues'},
    ]
    return (
        <ul className='flex space-x-6'>
            {links.map((link) =>
                <li key={link.href}>
                    <Link className={classNames({
                        '!text-zinc-900': currentPath === link.href,
                        'nav-link': true,
                    })} href={link.href}>{link.label}</Link>
                </li>
            )}

        </ul>
    )
}

const AuthStatus = () => {
    const {status, data: session} = useSession();
    if (status === 'loading') return <Skeleton  width='3rem'/> ;
    if (status === 'unauthenticated') return <Link className='nav-link' href='/api/auth/signin'>Login</Link>;

    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar
                        src={session?.user?.image!}
                        fallback='?'
                        size='2'
                        radius='full'
                        className='cursor-pointer'
                    />
                </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        <DropdownMenu.Label>
                            <Text>{session?.user?.email}</Text>
                        </DropdownMenu.Label>
                        <DropdownMenu.Item>
                            <Link href='/api/auth/signout'>Log out</Link>
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
        </Box>
    )
}

export default NavBar;