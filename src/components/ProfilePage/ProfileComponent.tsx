'use client'
import { useState } from "react"
import SidebarButton from "./SidebarButton";
import PersonalInformation from "./PersonalInformation";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
type Section = "personal" | "password" | "delete";

const ProfileComponent = () => {
    const [activeSection, setActiveSection] = useState<Section>("personal");

    const renderRightPane = () => {
        switch (activeSection) {
            case "personal":
            return <PersonalInformation />;
            case "password":
            return <ChangePassword />;
            case "delete":
            return <DeleteAccount />;
            default:
            return null;
        }
    };

    return (
        <div 
            className="bg-transparent backdrop-blur-sm border-white/20 border md:rounded-3xl rounded-xl shadow-lg shadow-black/50 
                lg:w-[50%] md:w-[90%] w-[98%] flex md:min-h-[70vh] min-h-[85vh] md:flex-row flex-col "
        >
            {/* Left Pane */}
            <div className="md:w-[35%] border-b md:border-b-0 md:border-r border-white/20 md:p-3 lg:p-4 p-2 md:space-y-4 flex flex-row md:flex-col gap-2 md:gap-0">
                <SidebarButton
                    label="Personal Information"
                    active={activeSection === "personal"}
                    onClick={() => setActiveSection("personal")}
                />
                <SidebarButton
                    label="Change Password"
                    active={activeSection === "password"}
                    onClick={() => setActiveSection("password")}
                />
                <SidebarButton
                    label="Delete Account"
                    active={activeSection === "delete"}
                    onClick={() => setActiveSection("delete")}
                />
            </div>

            {/* Right Pane */}
            <div className="md:w-[65%] p-6">
                {renderRightPane()}
            </div>
        </div>
    )
}

export default ProfileComponent