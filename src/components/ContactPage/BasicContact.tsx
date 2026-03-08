import { FaGlobeAmericas } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { IoCallSharp } from 'react-icons/io5'

const BasicContact = () => {
    return (
        <div className="flex justify-center items-center flex-col border border-white/20 bg-transparent backdrop-blur-sm shadow-lg shadow-black/50 md:w-full w-11/12 mx-auto p-4 space-y-4 rounded-3xl">
            <h1 className='text-2xl text-center'>Contact us here</h1>
            <div className="space-y-4">
                <div className="space-y-1">
                    <div className="flex justify-start items-center gap-2 text-xl">
                        <MdMail />
                        <h2>Chat with us</h2>
                    </div>
                    <div className="text-sm">
                        <p>Our friendly team is here to help.</p>
                        <p>support@ashventure.com</p>
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="flex justify-start items-center gap-2 text-xl">
                        <FaGlobeAmericas />
                        <h2>Visit Us</h2>
                    </div>
                    <div className="text-sm">
                        <p>Come and say hello at our office HQ.</p>
                        <p>Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, <br />Bangalore-560016</p>
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="flex justify-start items-center gap-2 text-xl">
                        <IoCallSharp />
                        <h2>Reach us on phone</h2>
                    </div>
                    <div className="text-sm">
                        <p>Mon - Fri From 8am to 5pm</p>
                        <p>+91 9330235553</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BasicContact