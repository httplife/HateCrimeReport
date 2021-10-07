import useSWR from 'swr'
import fetcher from '@/hooks/fetcher'
import MetricCard from './Card'

export default function Religion() {
    const { data, error } = useSWR('/api/metric/analyticNumbers', fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    // const stars = format(data?.stars)
    const stars = data?.stars.toLocaleString()
    const link = 'https://github.com/httplife'

    return <MetricCard header='Religion' link={link} metric={stars} />
}
