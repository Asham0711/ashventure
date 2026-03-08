'use client';
import React, { useState, useRef, useEffect } from 'react';
import logo from '../../../public/assets/logo_full.png';
import Image from 'next/image';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Contact, Earth, HandHelping, Home, Info, Lightbulb, LogIn, LogOut, Logs, MapPin, Menu, MessageCircleQuestionMark, 
    Shield, SunSnow, UserPlus, UserRoundPen } from 'lucide-react';

const MobileNavbar = () => {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [otherOpen, setOtherOpen] = useState(false);

    const sidebarRef = useRef<HTMLDivElement>(null);

    // Close sidebar on outside click
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.body.style.overflow = "auto";
        }

        // Cleanup (safety)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const toggleSidebar = () => setIsOpen(!isOpen);
    const toggleOtherMenu = () => setOtherOpen(!otherOpen);

    const handleLogout = () => {
        setShowLogoutModal(true);
        setIsOpen(false);
        setOtherOpen(false);
    }

    return (
        <>
            {/* TOP BAR */}
            <div className="fixed top-0 left-0 w-full z-100 backdrop-blur-sm bg-transparent flex justify-between items-center py-2 px-4">
                <Image src={logo} width={130} height={130} alt="Logo" />
                <button className="text-primary-brand text-4xl" onClick={toggleSidebar}>
                    <Menu />
                </button>
            </div>

            {/* SIDEBAR */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-40 z-120"></div>
            )}

            <div
                ref={sidebarRef}
                className={`fixed top-0 right-0 w-4/5 rounded-lg bg-transparent backdrop-blur-sm border border-white/20 p-4 shadow-lg z-150 transform transition-transform duration-300 ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* MENU ITEMS */}
                <ul className="flex flex-col gap-2">

                    {/* MAIN LINKS */}
                    <div className='bg-transparent border border-white/20 rounded-lg text-sm py-1'>
                        <li>
                            <Link href="/" onClick={toggleSidebar}
                                className="hover:bg-black/30 px-4 py-1 rounded-sm hover:text-primary-brand w-full flex gap-1 items-center"
                            >
                                <Home size={14}/>
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link 
                                href="/about-us" 
                                onClick={toggleSidebar}
                                className="flex gap-1 items-center hover:bg-black/30 px-4 py-1 rounded-sm hover:text-primary-brand w-full"
                            >
                                <Info size={14}/>
                                About
                            </Link>
                        </li>

                        <li>
                            <Link 
                                href="/contact-us" 
                                onClick={toggleSidebar}
                                className="flex gap-1 items-center hover:bg-black/30 px-4 py-1 rounded-sm hover:text-primary-brand w-full"
                            >
                                <Contact size={14}/>
                                Contact
                            </Link>
                        </li>

                        <li>
                            <Link 
                                href="/blogs" 
                                onClick={toggleSidebar}
                                className="flex gap-1 items-center hover:bg-black/30 px-4 py-1 rounded-sm hover:text-primary-brand w-full"
                            >
                                <Logs size={14}/>
                                Blogs
                            </Link>
                        </li>

                        <li>
                            <Link 
                                href="/create-trip" 
                                onClick={toggleSidebar}
                                className="flex gap-1 items-center hover:bg-black/30 px-4 py-1 rounded-sm hover:text-primary-brand w-full"
                            >
                                <Earth size={14}/>
                                Create Trip
                            </Link>
                        </li>

                        {/* SUBMENU (Other) */}
                        <li>
                            <button
                                className="hover:bg-black/30 px-4 py-1 rounded-sm flex justify-start gap-1 items-center w-full hover:text-primary-brand"
                                onClick={toggleOtherMenu}
                            >
                                <Lightbulb size={14}/>
                                Other
                            </button>

                            {/* SUBMENU ITEMS */}
                            {otherOpen && (
                                <div className="ml-6 flex flex-col gap-1 animate-fadeIn">
                                    <Link href="/faq" className="flex gap-1 items-center hover:bg-black/30 px-4 py-1 rounded-sm text-xs hover:text-primary-brand" onClick={toggleSidebar}>
                                        <MessageCircleQuestionMark size={12}/>
                                        FAQs
                                    </Link>
                                    <Link href="/term-condition" className="flex gap-1 items-center hover:bg-black/30 px-4 py-1 rounded-sm text-xs hover:text-primary-brand" onClick={toggleSidebar}>
                                        <SunSnow size={12}/>
                                        Term & Condition
                                    </Link>
                                    <Link href="/privacy-policy" className="flex gap-1 items-center hover:bg-black/30 px-4 py-1 rounded-sm text-xs hover:text-primary-brand" onClick={toggleSidebar}>
                                        <Shield size={12}/>
                                        Privacy Policy
                                    </Link>
                                    <Link href="/help-center" className="flex gap-1 items-center hover:bg-black/30 px-4 py-1 rounded-sm text-xs hover:text-primary-brand" onClick={toggleSidebar}>
                                        <HandHelping size={12}/>
                                        Help Center
                                    </Link>
                                </div>
                            )}
                        </li>
                    </div>
                    

                    <div className='h-0.5 bg-white/20 w-full'></div>

                    {/* AUTH LINKS */}
                    {session ? (
                        <div className='bg-transparent border border-white/20 rounded-lg text-sm py-1'>
                            <li className="hover:bg-black/30 px-4 py-1 rounded-sm hover:text-primary-brand">
                                <Link href="/profile" className='flex gap-1 items-center' onClick={toggleSidebar}>
                                    <UserRoundPen size={14} />
                                    Profile
                                </Link>
                            </li>

                            <li className="hover:bg-black/30 px-4 py-1 rounded-sm hover:text-primary-brand">
                                <Link href="/my-trips" className='flex gap-1 items-center' onClick={toggleSidebar}>
                                    <MapPin size={14} />
                                    My Trips
                                </Link>
                            </li>

                            <li className="hover:bg-black/30 px-4 py-1 rounded-sm hover:text-primary-brand">
                                <Link href="/blogs/my-blogs" className='flex gap-1 items-center' onClick={toggleSidebar}>
                                    <Logs size={14} />
                                    My Blogs
                                </Link>
                            </li>

                            <li className="hover:bg-black/30 px-4 py-1 rounded-sm hover:text-primary-brand">
                                <button className='flex gap-1 items-center w-full' onClick={handleLogout}>
                                    <LogOut size={14} />
                                    Logout
                                </button>
                            </li>
                        </div>
                    ) : (
                        <div className='bg-transparent border border-white/20 rounded-lg text-sm py-1'>
                            <li className="hover:bg-black/30 px-4 py-1 rounded-sm hover:text-primary-brand">
                                <Link href="/sign-in" className='flex gap-1 items-center' onClick={toggleSidebar}>
                                    <LogIn size={14}/>
                                    Login
                                </Link>
                            </li>

                            <li className="hover:bg-black/30 px-4 py-1 rounded-sm hover:text-primary-brand">
                                <Link href="/sign-up" className='flex gap-1 items-center' onClick={toggleSidebar}>
                                    <UserPlus size={14}/>
                                    Signup
                                </Link>
                            </li>
                        </div>
                    )}

                    
                </ul>
            </div>

            {/* LOGOUT MODAL */}
            {showLogoutModal && (
                <div className="fixed h-screen inset-0 flex items-center justify-center bg-black/60 z-50">
                    <div className="bg-primary-background px-6 py-8 w-[90%] h-auto rounded-xl shadow-xl flex flex-col justify-between border border-white/20">
                        <h2 className="text-2xl mb-2 text-center">
                            Are you sure to logout?
                        </h2>
                        <div className="flex justify-center items-center gap-6 mt-4">
                            <button
                                className="inline-flex items-center gap-2 bg-linear-to-r from-primary-brand via-primary-brand-hover to-primary-brand-active 
                                            py-2 lg:px-10 px-6 text-sm font-bold rounded-lg cursor-pointer text-white w-auto"
                                onClick={()=> signOut()}
                            >
                                Logout
                            </button>
                            <button
                                className="inline-flex items-center gap-2 text-primary-brand py-2 lg:px-10 px-6 text-sm font-extrabold rounded-md cursor-pointer 
                                        hover:bg-black/10 hover:text-primary-brand-hover border border-primary-brand hover:border-primary-brand-hover w-auto"
                                onClick={() => setShowLogoutModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MobileNavbar;