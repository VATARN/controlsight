"use client";
import Link from "next/link";
import Logo from "@/public/logo.webp";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Skeleton from "@/app/components/skeleton";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between" align="center">
          <Link href="/">
            <Flex align="center" gap="1">
              <Image src={Logo} alt="logo" className="h-10 w-10" />
              <Flex direction="column" align="center">
                <Text size="2" weight="medium">
                  Control
                </Text>
                <Text size="2" weight="medium">
                  Sight
                </Text>
              </Flex>
            </Flex>
          </Link>
          <Flex align="center" gap="5">
            <NavbarLinks />
            <AuthenticationStatus />
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

const NavbarLinks = () => {
  const currentPath = usePathname();
  const router = useRouter();
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues/list", label: "Issues" },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map(({ href, label }) => (
        <li key={href}>
          <Link
            onClick={() => {
              router.refresh();
            }}
            href={href}
            className={classNames({
              "nav-link": true,
              "!text-zinc-900": href === currentPath,
            })}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthenticationStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href="/api/auth/signin/callbackUrl=/">
        Log in
      </Link>
    );

  return (
    <Box>
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session.user!.image!}
              fallback="?"
              size="2"
              radius="full"
              className="cursor-pointer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="3">{session.user!.name}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Label>
              <Text size="2">{session.user!.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item className="mt-2 text-center">
              <Link
                className="w-full text-center"
                href="/api/auth/signout?callbackUrl=/"
              >
                Log out
              </Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};

export default NavBar;
