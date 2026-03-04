interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: "search" | "error";
}

export const EmptyState = ({
  title = "No products found",
  message = "Try adjusting your search or filters to find what you're looking for.",
  icon = "search",
}: EmptyStateProps) => {
  return (
    <>
      <hr className="text-gray-300 dark:text-gray-600" />
      <div className="flex flex-col items-center justify-center min-h-100 px-4 text-center">
        <div className="mb-4 text-gray-400 dark:text-gray-600">
          {icon === "search" ? (
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          ) : (
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          )}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-sm">{message}</p>
      </div>
    </>
  );
};

export default EmptyState;
