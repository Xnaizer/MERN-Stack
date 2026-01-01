'use client'
import { cn } from "@/utils/cn";
import { Button, Listbox, ListboxItem } from "@heroui/react";
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
                    <Listbox 
                        variant="solid"
                        aria-label="Dashboard Menu" 
                    >
                        {sidebarItems.map((items) => (
                            <ListboxItem 
                                key={items.key} 
                                href={items.href}
                                as={Link}
                                startContent={items.icon}
                                classNames={{ 
                                    base: cn("my-1 h-8 md:h-10 lg:h-12 items-center justify-center flex text-lg lg:text-2xl", { "bg-danger-500 text-white": pathname === items.href }), 
                                    title: !isOpen ? "block text-xs lg:text-lg" : "hidden" 
                                }}
                                textValue={items.label}
                                aria-labelledby={items.label}
                            >
                                {!isOpen ? items.label : null}
                            </ListboxItem>
                        ))}
                    </Listbox>
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
                    onClick={onOpen}
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
                    onClick={() => signOut()}
                >
                {<CiLogout className="w-6" />}
                    {!isOpen && "Logout"}
                </Button>
            </div>
        </aside>
    )
}

export default DashboardSidebar;