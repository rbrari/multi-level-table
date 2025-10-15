import { Skeleton } from '@/components/ui/skeleton'

interface TableSkeletonProps {
  readonly rows?: number
}

export function TableSkeleton({ rows = 3 }: TableSkeletonProps) {
  return (
    <div className="mx-auto w-full max-w-screen-2xl space-y-6 p-6">
      {Array.from({ length: rows }, (_, index) => (
        <div key={`skeleton-${index}`} className="w-full overflow-hidden rounded-lg border bg-card">
          <div className="flex items-center justify-between gap-4 bg-muted/30 px-4 py-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-9 rounded-md" />
              <Skeleton className="h-5 w-48" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-8 w-[90px] rounded-md" />
              <Skeleton className="h-8 w-[100px] rounded-md" />
            </div>
          </div>
          <div className="p-4 pt-3">
            <div className="overflow-hidden rounded-md border">
              {/* Header */}
              <div className="border-b bg-card">
                <div className="flex h-10">
                  <div className="flex items-center px-2" style={{ width: '300px' }}>
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="flex items-center px-2" style={{ width: '120px' }}>
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex items-center px-2" style={{ width: '150px' }}>
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center px-2" style={{ width: '150px' }}>
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex items-center px-2" style={{ width: '120px' }}>
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex items-center px-2" style={{ width: '150px' }}>
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>
              {/* Rows */}
              {Array.from({ length: 8 }, (_, rowIndex) => (
                <div key={`row-${index}-${rowIndex}`} className="border-b last:border-0">
                  <div className="flex h-[50px] items-center">
                    <div className="flex items-center p-2" style={{ width: '300px' }}>
                      <Skeleton className="h-4 w-full max-w-[240px]" />
                    </div>
                    <div className="flex items-center p-2" style={{ width: '120px' }}>
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="flex items-center p-2" style={{ width: '150px' }}>
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="flex items-center p-2" style={{ width: '150px' }}>
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="flex items-center p-2" style={{ width: '120px' }}>
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="flex items-center p-2" style={{ width: '150px' }}>
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
