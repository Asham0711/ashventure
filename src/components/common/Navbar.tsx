'use client'

import Image from "next/image";
import logo from '../../../public/assets/logo_full.png';
import { navbarData } from "@/data";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, Logs, MapPin, UserRoundPen, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import Portal from "./Portal";
import { signOut, useSession } from "next-auth/react";
import profile from '../../../public/assets/profile.png';
import { Button } from "../ui/button";

const Navbar = () => {
    /* --------- State Variables ---------- */
    const [openDropdown, setOpenDropdown] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    /* --------- Refrence Variables ---------- */
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const dropdownMenuRef = useRef<HTMLDivElement | null>(null);
    const profileButtonRef = useRef<HTMLDivElement | null>(null);
    const profileMenuRef = useRef<HTMLUListElement | null>(null);


    /* --------- Path Variables ---------- */
    const pathname = usePathname();

    const { data: session } = useSession();
    const router = useRouter();

     /* --------- Use Effect hook ---------- */
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            const target = e.target as Node;

            // Navbar dropdown
            if (
                openDropdown &&
                !dropdownRef.current?.contains(target) &&
                !dropdownMenuRef.current?.contains(target)
            ) {
                setOpenDropdown(false);
            }
            if (
                profileDropdownOpen &&
                !profileButtonRef.current?.contains(target) &&
                !profileMenuRef.current?.contains(target)
            ) {
                setProfileDropdownOpen(false);
            }
        }

        function handleEsc(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setOpenDropdown(false);
                setProfileDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEsc);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEsc);
        };
    }, [openDropdown, profileDropdownOpen]);


    function handleSubMenu(){
        setOpenDropdown(false);
    }

    const handleProfileClick = () => {
        setProfileDropdownOpen(!profileDropdownOpen);
    };

    const handleLogout = () => {
        setProfileDropdownOpen(!profileDropdownOpen);
        setShowLogoutModal(true);
    }

    return (
        <div className="fixed top-0 left-0 w-full z-100 backdrop-blur-sm bg-transparent flex justify-between items-center py-4 lg:px-10 md:px-4">
            {/* Logo  */}
            <Link
                href='/'
            >
                <Image src={logo} width={160} height={160} alt="Logo" />
            </Link>

            {/* Navbar  */}
            <div className="hidden md:flex lg:gap-8 md:gap-3 items-center md:text-xs lg:text-base">
                {navbarData.map((item, index) => {
                    if (!item.dropdown) {
                        return (
                            <Link
                                key={index}
                                href={item.path}
                                className={`${pathname === item.path ? 'text-primary-brand' : 'text-white'}
                                    hover:text-primary-brand transition-all duration-300 font-bold`}
                            >
                                {item.title}
                            </Link>
                        );
                    }

                    return (
                        <div key={index} className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setOpenDropdown(!openDropdown)}
                                className={`${pathname === item.path ? 'text-primary-brand' : 'text-white'}
                                    hover:text-primary-brand transition-all duration-300 cursor-pointer font-bold flex items-center gap-1`}
                            >
                                {item.title}
                                <ChevronDown
                                    className={`font-bold transition-transform duration-200 
                                        ${openDropdown ? "rotate-180" : "rotate-0"}`}
                                    size={25}
                                />
                            </button>

                            {/* Dropdown  */}
                            {openDropdown && (
                                <Portal>
                                    <div 
                                        ref={dropdownMenuRef}
                                        className="fixed top-14 right-[35%]
                                            bg-transparent backdrop-blur-sm
                                            border border-white/20
                                            shadow-xl rounded-2xl py-4 px-6 w-48
                                            text-xs lg:text-base z-150"
                                    >
                                        {item.dropdown.map((sub, i) => (
                                            <Link
                                            key={i}
                                            href={sub.path}
                                            className="text-white hover:text-primary-brand transition-all block"
                                            onClick={handleSubMenu}
                                            >
                                            {sub.title}
                                            </Link>
                                        ))}
                                    </div>
                                </Portal>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Buttons  */}
            <div className="hidden md:flex justify-center items-center gap-4">
                {session ? (
                    <>
                        {/* Profile Image with Dropdown */}
                        <div ref={profileButtonRef} className="relative">
                            <Image
                                src={profile} // Use session user image or a default one
                                alt="Profile Picture"
                                width={40}
                                height={40}
                                className='rounded-full cursor-pointer border border-white/20 p-1'
                                onClick={handleProfileClick}
                            />
                            {profileDropdownOpen && (
                                <Portal>
                                    <ul
                                        ref={profileMenuRef}
                                        className="
                                        fixed top-14 right-10
                                        bg-transparent backdrop-blur-sm
                                        border border-white/20
                                        shadow-xl rounded-2xl
                                        py-4 px-4 w-44 text-white z-150
                                        "
                                    >
                                        <li>
                                            <button
                                                onClick={() => {
                                                router.push('/profile');
                                                setProfileDropdownOpen(false);
                                                }}
                                                className="flex items-center gap-2 w-full px-2 py-2 hover:text-primary-brand transition cursor-pointer"
                                            >
                                                <UserRoundPen size={18} />
                                                Profile
                                            </button>
                                        </li>

                                        <li>
                                            <button
                                                onClick={() => {
                                                router.push('/my-trips');
                                                setProfileDropdownOpen(false);
                                                }}
                                                className="flex items-center gap-2 w-full px-2 py-2 hover:text-primary-brand transition cursor-pointer"
                                            >
                                                <MapPin size={18} />
                                                My Trips
                                            </button>
                                        </li>

                                        <li>
                                            <button
                                                onClick={() => {
                                                router.push('/blogs/my-blogs');
                                                setProfileDropdownOpen(false);
                                                }}
                                                className="flex items-center gap-2 w-full px-2 py-2 hover:text-primary-brand transition cursor-pointer"
                                            >
                                                <Logs size={18} />
                                                My Blogs
                                            </button>
                                        </li>

                                        <li>
                                            <button
                                                onClick={() => {
                                                    handleLogout();
                                                    setProfileDropdownOpen(false);
                                                }}
                                                className="flex items-center gap-2 w-full px-2 py-2 hover:text-red-400 transition cursor-pointer"
                                            >
                                                <LogOut size={18} />
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </Portal>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <PrimaryButton label="Sign In" path="/sign-in"/>
                        <SecondaryButton label="Sign Up" path="/sign-up"/>
                    </>
                )}
            </div>

            {showLogoutModal && (
                <div className="fixed h-screen inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
                    <div className="relative z-10 w-[90%] max-w-md rounded-2xl border border-white/20 bg-black p-6 shadow-xl">
                        <button
                            onClick={() => setShowLogoutModal(false)}
                            className="absolute right-4 top-4 text-gray-400 hover:text-white cursor-pointer"
                        >
                            <X size={18} />
                        </button>

                        <h3 className="text-xl font-semibold">
                            Confirm Logout
                        </h3>

                        <p className="text-sm text-gray-300 mt-2">
                            Are you sure to logout?
                        </p>

                        <div className="mt-6 flex gap-4 justify-end">
                            <Button
                                variant="secondary"
                                onClick={() => setShowLogoutModal(false)}
                            >
                                Cancel
                            </Button>

                            <Button
                                variant="destructive"
                                onClick={() => signOut({ callbackUrl: "/sign-in" })}
                            >
                                Yes, Logout
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;