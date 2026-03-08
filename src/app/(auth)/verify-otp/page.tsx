import OtpForm from "@/components/Auth/OtpForm"
import HighlightText from "@/components/common/HighlightText"


const VerifyPage = () => {
  return (
    <div className="max-w-screen min-h-screen container mx-auto overflow-x-hidden w-full h-full flex justify-center items-center flex-col gap-4">
        <div>
            <p className="md:text-4xl text-3xl text-center"><HighlightText text='Verify Email' /></p>
            <p className="text-center w-9/11 md:w-full mx-auto">A 6 digit verification code has been sent to you. <br />Enter the code below</p>
        </div>
        <OtpForm/>
    </div>
  )
}

export default VerifyPage