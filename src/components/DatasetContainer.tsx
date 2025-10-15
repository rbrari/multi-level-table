import { TableSkeleton, TableTreeDataset } from '@/components/table'
import { computeDatasetViews, useStealthStore } from '@/store/stealthStore'
import { TABLE_COLUMNS } from '@/utils/constants/stealthDatasetColumns'
import { useEffect, useMemo } from 'react'

export function DatasetContainer() {
  const { loading, datasets, loadData } = useStealthStore()
  const datasetViews = useMemo(() => computeDatasetViews(datasets), [datasets])

  useEffect(() => {
    loadData()
  }, [loadData])

  if (loading) {
    return <TableSkeleton rows={3} />
  }

  return (
    <div className="mx-auto w-full max-w-screen-2xl space-y-6 p-6">
      {datasetViews.map(({ primary, tableRows }) => (
        <TableTreeDataset
          key={primary}
          primary={primary}
          tableRows={tableRows}
          tableColumns={TABLE_COLUMNS}
        />
      ))}
    </div>
  )
}
