import Image from 'next/image'
import blackLogo from '../../../public/assets/logo_black.png'
import Link from 'next/link'
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import FlipIcon from '../ui/icon-flip'

const Footer = () => {
  return (
    <div className='bg-linear-to-r from-primary-brand via-primary-brand-active to-primary-brand-hover w-full text-[#000000] flex flex-col gap-4 justify-center items-center py-5'>
        <div className='flex justify-between items-center w-11/12 mx-auto'>
            <div className='flex flex-col justify-center items-center p-5 w-[40%]'>
                <Image 
                    src={blackLogo}
                    width={300}
                    height={300}
                    alt='Black logo'
                />
                <p className='text-xl'>A Trip Planner for Everyone</p>
            </div>
            <div className='flex flex-col justify-center items-start w-[30%] pl-20 text-center text-lg font-bold'>
                <ul className='space-y-3'>
                    <li>
                        <Link href={'/'}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href={'/about-us'}>
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link href={'/contact-us'}>
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='flex flex-col justify-center items-start w-[30%] pl-20 text-center text-lg font-bold'>
                <ul className='space-y-3'>
                    <li>
                        <Link href={'/faq'}>
                            FAQ
                        </Link>
                    </li>
                    <li>
                        <Link href={'/term-condition'}>
                            Term & Condition
                        </Link>
                    </li>
                    <li>
                        <Link href={'/privacy-policy'}>
                            Privacy Policy
                        </Link>
                    </li>
                    <li>
                        <Link href={'/help-center'}>
                            Help Center
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
        <div className="flex space-x-4 items-center justify-center">
            <Link href={'#'}>
                <FlipIcon icon={<FaTwitter size={30} />} />
            </Link>
            <Link href={'#'}>
                <FlipIcon icon={<FaInstagram size={30} />} />
            </Link>
            <Link href={'#'}>
                <FlipIcon icon={<FaLinkedin size={30} />} />
            </Link>
        </div>
        <div className='bg-[#000000] w-[90%] h-0.5 mx-auto'></div>
        <div className='8/12 mx-auto text-center mb-2'>
            <p>&copy; Md Asham Imad | All right reserved</p>
            <p>Made with <span className='text-red-600'>&#10084;</span> by Asham</p>
        </div>
    </div>
  )
}

export default Footer