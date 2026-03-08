'use client';

interface LoaderProps {
  text?: string;
  fullPage?: boolean;
}

export default function Loader({
  text = 'Loading...',
  fullPage = true,
}: LoaderProps) {
  return (
    <div
      className={`
        flex justify-center items-center bg-black/20 backdrop-blur-sm z-50
        ${fullPage
          ? 'fixed inset-0'
          : 'absolute inset-0'}
      `}
    >
      <div className="flex flex-col items-center gap-3">
        {/* Spinner */}
        <div
          className="
            w-10 h-10
            border-4
            border-primary-brand/20
            border-t-primary-brand
            rounded-full
            animate-spin
          "
        />

        {/* Text */}
        {text && (
          <p
            className="
              text-lg font-semibold
              text-transparent bg-clip-text
              bg-linear-to-r
              from-primary-brand
              via-white
              to-primary-brand-hover
              animate-textShimmer
            "
          >
            {text}
          </p>
        )}
      </div>
    </div>
  );
}
