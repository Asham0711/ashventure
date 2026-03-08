import HighlightText from "@/components/common/HighlightText"
import BasicContact from "@/components/ContactPage/BasicContact"
import SocialMedia from "@/components/ContactPage/SocialMedia"
import SupportTicket from "@/components/ContactPage/SupportTicket"

const ContactPage = () => {
    return (
        <div className="max-w-screen min-h-screen container mx-auto overflow-x-hidden w-full h-full">
            <div className="lg:w-9/12 w-11/12 mx-auto mt-16 md:mt-24 flex flex-col justify-center items-center gap-4">
                <h1 className="text-3xl lg:text-5xl text-center">Let’s Make Your <br/> <HighlightText text="Journey Unforgettable"/> Reach Out to Us!</h1>
                <p className="text-base md:text-xl text-center hidden md:block">We’re here to help you plan, customize, and perfect your travel experience. Got an Issue? We’re here for you. Let us know</p>
            </div>
            <div className="flex lg:w-9/12 w-full md:w-11/12 mx-auto lg:flex-row flex-col-reverse justify-between items-center gap-8 my-8">
                <div className="lg:w-2/5 w-full flex flex-col lg:flex-col md:flex-row gap-4">
                    <BasicContact />
                    <SocialMedia />
                </div>
                <div className="lg:w-3/5 w-full">
                    <SupportTicket />
                </div> 
            </div>
        </div>
    )
}

export default ContactPage