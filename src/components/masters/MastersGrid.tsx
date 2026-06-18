import { ErrorBoundary, ErrorFallback } from '@components/common';
import { microDampingPreset } from '@constants/anim/spring';
import { mastersData } from '@constants/masters-config';
import { motion } from 'motion/react';
import MasterCard from './MasterCard';

export default function MastersGrid() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="w-full">
        {/* Grid Container */}
        <div className="grid grid-cols-3 gap-6 md:grid-cols-2 md:gap-4 xl:grid-cols-4 xl:gap-8">
          {mastersData.map((master, index) => (
            <MasterCard key={master.url} master={master} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {mastersData.length === 0 && (
          <motion.div
            className="flex min-h-[300px] flex-col items-center justify-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, ...microDampingPreset }}
          >
            <h3 className="mb-2 font-bold text-3xl text-gray-700 dark:text-gray-300">The Void is Empty</h3>
            <p className="text-gray-500 text-lg dark:text-gray-400">Be the first to connect!</p>
          </motion.div>
        )}
      </div>
    </ErrorBoundary>
  );
}
