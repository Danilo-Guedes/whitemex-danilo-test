import { Skeleton } from '@/components/ui/skeleton';

function TransactionSkeleton() {
  return (
    <div className="flex flex-col items-center">
    <Skeleton className="w-72 h-10 mt-12" />
    <div className="flex flex-col mt-10 gap-5">
      {Array(3).fill(0).map((_, idx) => {
        return (
          <Skeleton key={idx} className="min-w-[380px] md:w-[600px] h-32" />
        );
      })}
    </div>
  </div>
  )
}

export default TransactionSkeleton