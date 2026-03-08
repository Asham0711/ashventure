import { IoWarning } from "react-icons/io5";
import HighlightText from "./HighlightText";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

interface ErrorProps{
    title: string;
    description: string;
    primaryIcon: string;
    primaryLabel: string;
    primaryPath: string;
    secondaryIcon: string;
    secondaryLabel: string;
    secondaryPath: string;
}

const ErrorComponent = (
    {
        title, 
        description, 
        primaryIcon, 
        primaryLabel, 
        primaryPath, 
        secondaryIcon, 
        secondaryLabel, 
        secondaryPath
    } : ErrorProps) => {
    return (
        <div className="bg-transparent backdrop-blur-sm border-white/20 border px-4 py-6 rounded-3xl shadow-lg shadow-black/50 lg:w-[35%] md:w-[50%] w-[95%]">
            <div className="text-[#BB2E2E]/70 flex justify-center items-center">
                <IoWarning className="md:w-28 md:h-28 w-20 h-20"/>
            </div>
            <div className='mb-8'>
                <p className="text-4xl text-center mb-1"><HighlightText text={title} /></p>
                <p className='text-center'>{description}</p>
            </div>
            <div className="flex justify-center items-center gap-6">
                <PrimaryButton label={primaryLabel} path={primaryPath} iconName={primaryIcon}/>
                <SecondaryButton label={secondaryLabel} path={secondaryPath} iconName={secondaryIcon}/>
            </div>
        </div>
    )
}

export default ErrorComponent