'use client'
import { cn } from "@/utils/cn";
import { Button } from "@heroui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { type JSX } from "react";
import { CiLogout } from "react-icons/ci";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useMediaQuery } from "../useMediaQuery";
import Link from "next/link";

interface SidebarItem {
    key: string;
    label: string;
    href: string;
    icon: JSX.Element;
}

interface PropTypes {
    sidebarItems: SidebarItem[];
    isOpen: boolean;
    onOpen: () => void;
}

const DashboardSidebar = (props: PropTypes) => {
    
    const { 
        sidebarItems, 
        isOpen,
        onOpen 
    } = props;

    const router = useRouter();
    const pathname = usePathname();
    const isLg = useMediaQuery("(min-width: 1024px)");
    
    return (
        <aside className={`z-50 flex h-screen w-full flex-col justify-between border-r-1 border-default-200  px-4 py-6 transition-all ${isOpen ? "max-w-20 lg:max-w-25" : "max-w-38 md:max-w-45 lg:max-w-75"}`} 
        >
            <div>
                <div className="flex justify-center">
                    <Image 
                        src="/images/general/logo.svg"
                        alt="logo"
                        width={180}
                        height={60}
                        className="mb-3 lg:mb-6 w-20 lg:w-32"
                        onClick={() => router.push("/")}
                    />

                </div>
                    <ul aria-label="Dashboard Menu">
                        {sidebarItems.map((items) => {

                            if(items.href === '/member') {
                                items.href = '/member/dashboard'
                            }

                            if(items.href === '/admin') {
                                items.href = '/admin/dashboard'
                            }

                            const isActive = pathname === items.href;
                            console.log(isActive)

                            return (
                            <li key={items.key} className="my-4">
                                <Link
                                href={items.href}
                                className={cn(
                                    `h-10 md:h-12 lg:h-14 flex items-center ${isOpen ? "justify-center": "justify-start"} px-2 gap-4 text-lg lg:text-2xl rounded-md `,
                                    {
                                    "bg-danger-500 text-white": isActive,
                                    }
                                )}
                                aria-label={items.label}
                                >
                                {items.icon}
                                {!isOpen && (
                                    <span className="text-xs lg:text-lg">
                                    {items.label}
                                    </span>
                                )}
                                </Link>
                            </li>
                            );
                        })}
                    </ul>
            </div>

            <div className="flex flex-col gap-4 items-center p-1">
                <Button
                    color="danger"
                    fullWidth={!isOpen}            
                    variant="solid"
                    className={`flex items-center rounded-lg py-1 lg:py-1.5 ${
                        isOpen ? "justify-center px-0 w-8 lg:w-14 min-w-10" : "justify-start px-2"
                    }`}
                    size={isLg ? "lg" : "sm"}
                    onPress={onOpen}
                >
                {!isOpen ? (
                    <FiChevronLeft />
                ):(
                    <FiChevronRight />
                )}
                    {!isOpen && "Collapse"}
                </Button>

                <Button
                    color="danger"
                    fullWidth={!isOpen}            
                    variant="solid"
                    className={`flex items-center rounded-lg py-1 lg:py-1.5 ${
                        isOpen ? "justify-center px-0 w-8 lg:w-14 min-w-10" : "justify-start px-2"
                    }`}
                    size={isLg ? "lg" : "sm"}
                    onPress={() => signOut()}
                >
                {<CiLogout className="w-6" />}
                    {!isOpen && "Logout"}
                </Button>
            </div>
        </aside>
    )
}

export default DashboardSidebar;