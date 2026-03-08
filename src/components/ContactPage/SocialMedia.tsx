import Link from "next/link"
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SocialMedia = () => {
    return (
      <div className="flex justify-center items-center flex-col border border-white/20 bg-transparent backdrop-blur-sm shadow-lg shadow-black/50 md:w-full w-11/12 mx-auto p-4 space-y-4 rounded-3xl">
        <h1 className='text-2xl text-center'>Connect on Social Media</h1>
        <div className="grid grid-cols-2 w-full gap-4">
          <Link
            href={'#'}
            className="flex justify-start items-center gap-2 ml-4 text-xl"
          >
            <FaXTwitter />
            Twitter
          </Link>
          <Link
            href={'#'}
            className="flex justify-start items-center gap-2 ml-4 text-xl"
          >
            <FaFacebookF />
            Facebook
          </Link>
          <Link
            href={'#'}
            className="flex justify-start items-center gap-2 ml-4 text-xl"
          >
            <FaLinkedinIn />
            LinkedIn
          </Link>
          <Link
            href={'#'}
            className="flex justify-start items-center gap-2 ml-4 text-xl"
          >
            <FaInstagram />
            Instagram
          </Link>
        </div>
      </div>
    )
}

export default SocialMedia