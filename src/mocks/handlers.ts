import { delay, http, HttpResponse } from 'msw'
import data from './data.json'

export const handlers = [
  http.get('/api/data', async () => {
    await delay(800)

    return HttpResponse.json(data)
  }),
]
