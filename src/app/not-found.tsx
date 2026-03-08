import ErrorComponent from "@/components/common/ErrorComponent"

const ErrorPage = () => {
    return (
        <div className="max-w-screen min-h-screen container mx-auto overflow-x-hidden w-full h-full flex justify-center items-center flex-col gap-4">
            <ErrorComponent 
                title="404 - Not Found" 
                description="The page you are looking for might have been removed had its name changed or is temporarily unavailable."
                primaryIcon="ArrowLeft"
                primaryLabel="Go to Home"
                primaryPath="/"
                secondaryIcon="Headphones"
                secondaryLabel="Support"
                secondaryPath="/contact-us"
            />
        </div>
    )
}

export default ErrorPage