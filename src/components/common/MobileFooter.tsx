import Link from 'next/link';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import FlipIcon from '../ui/icon-flip';

const MobileFooter = () => {
    return (
        <div className="bg-linear-to-r from-primary-brand via-primary-brand-active to-primary-brand-hover w-full text-[#000000] flex flex-col items-center py-5">
            {/* Social Media Icons */}
            <div className="flex space-x-3 mb-2">
                <Link href={'#'}>
                    <FlipIcon icon={<FaTwitter size={20} />} />
                </Link>
                <Link href={'#'}>
                    <FlipIcon icon={<FaInstagram size={20} />} />
                </Link>
                <Link href={'#'}>
                    <FlipIcon icon={<FaLinkedin size={20} />} />
                </Link>
            </div>

            {/* Navigation Links */}
            <div className="">
                <ul className="text-center text-sm flex justify-center items-center gap-2 mb-2">
                    <li className='border-r border-black pr-2'>
                        <Link href={'/term-condition'}>Term & Condition</Link>
                    </li>
                    <li className='border-r border-black pr-2'>
                        <Link href={'/privacy-policy'}>Privacy Policy</Link>
                    </li>
                    <li>
                        <Link href={'/help-center'}>Help Center</Link>
                    </li>
                </ul>
            </div>

            {/* Divider */}
            <div className="bg-[#000000] w-[90%] h-0.5 mb-2"></div>
            {/* Footer Text */}
            <div className="text-xs text-center">
                <p>&copy; Md Asham Imad | All rights reserved</p>
                <p>
                    Made with <span className="text-red-600">&#10084;</span> by Asham
                </p>
            </div>
        </div>
  ) ;
};

export default MobileFooter;