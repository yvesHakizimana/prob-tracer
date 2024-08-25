'use client'
import Link from "next/link";
import {AiFillBug} from "react-icons/ai"
import classNames from "classnames";
import {usePathname} from "next/navigation";
import {Avatar, Box, Container, DropdownMenu, Flex, Text} from "@radix-ui/themes";
import {useSession} from "next-auth/react";


const NavBar = () => {

    const currentPath  = usePathname();

    const links = [
        { label: 'Dashboard', href: '/'},
        { label: 'Issues', href: '/issues'},
    ]

    //Grabbing the status of the authentication and the data of the user from session
    //status can be authenticated, unauthenticated and also loading.
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
                        {status === 'authenticated' && (
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
                        )}
                        {status === 'unauthenticated' && <Link href='/api/auth/signin'>Login</Link>}
                    </Box>
                </Flex>
            </Container>
        </nav>
    )
}

export default NavBar;