interface InfoRowProps {
    label: string;
    value: string | undefined;
}

const InfoRow = ({label , value} : InfoRowProps) => {
    return (
        <div className="flex justify-between border-b border-white/20 p-3">
            <span className="text-gray-400">{label}</span>
            <span>{value}</span>
        </div>
    )
}

export default InfoRow