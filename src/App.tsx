import { Button } from '@/components/ui/button'
import { fetchTableData } from '@/services/mainService'
import { useState } from 'react'

function App() {
  const [data, setData] = useState<unknown>(null)
  const [loading, setLoading] = useState(false)

  const handleFetch = async () => {
    setLoading(true)
    try {
      const result = await fetchTableData()
      setData(result)
      console.log('MSW Response:', result)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4">
      <Button variant="outline" onClick={handleFetch} disabled={loading}>
        {loading ? 'Loading...' : 'Test MSW'}
      </Button>

      {data !== null && (
        <pre className="max-w-2xl overflow-auto rounded-lg bg-slate-900 p-4 text-sm text-white">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  )
}

export default App
