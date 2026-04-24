'use client'

const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div className={`animate-pulse bg-gray-500/20 rounded-md ${className}`} />
  );
};

const ProfileSkeleton = () => {
  return (
    <div className="space-y-4 h-full">

      {/* Title */}
      <Skeleton className="h-8 w-64" />

      {/* Top Card */}
      <div className="border border-white/10 flex items-center gap-4 bg-black/30 rounded-3xl py-4 px-5">
        
        {/* Avatar */}
        <Skeleton className="h-20 w-20 rounded-full" />

        {/* Name + Email */}
        <div className="space-y-2 w-full">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>

      {/* Info Card */}
      <div className="border border-white/10 bg-black/30 rounded-2xl p-4 space-y-4 h-[60%] flex justify-center flex-col">
        
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex justify-between items-center">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-40" />
          </div>
        ))}

        {/* Button */}
        <Skeleton className="h-10 w-36 mt-4" />
      </div>
    </div>
  );
};

export default ProfileSkeleton;