import { motion } from "motion/react";

const Shimmer = () => (
    <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "linear",
        }}
    />
);

export const ProductSkeleton = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col h-full">
            <div className="relative h-64 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <Shimmer />
            </div>
            <div className="p-5 flex-1 flex flex-col gap-4">
                <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded-lg relative overflow-hidden">
                    <Shimmer />
                </div>
                <div className="w-full h-7 bg-gray-200 dark:bg-gray-700 rounded-lg relative overflow-hidden">
                    <Shimmer />
                </div>
                <div className="mt-auto flex items-center justify-between">
                    <div className="w-24 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg relative overflow-hidden">
                        <Shimmer />
                    </div>
                    <div className="w-20 h-9 bg-gray-200 dark:bg-gray-700 rounded-xl relative overflow-hidden">
                        <Shimmer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSkeleton;
