export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-600 dark:text-gray-400 font-medium italic">
        Loading products...
      </p>
    </div>
  );
};

export default Loading;
