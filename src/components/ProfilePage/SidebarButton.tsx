interface SidebarButtonProps {
    label: string;
    active: boolean;
    onClick: () => void;
}

const SidebarButton = ({ label, active, onClick } : SidebarButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`
                relative w-full md:text-left md:px-4 px-[0.5] md:py-3 py-2 rounded-lg transition cursor-pointer
                ${active ? "bg-linear-to-r from-[#FF003C] via-primary-brand to-primary-brand-active" : "hover:bg-primary-brand/10"} flex justify-center items-center
            `}
        >
            <span className="md:ml-2 text-[10px] md:text-base">{label}</span>
        </button>
    )
}

export default SidebarButton