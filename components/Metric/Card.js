import { Card, Link, Text } from '@geist-ui/react'

export default function MetricCard({ header, link, metric }) {
    return (
        <Card hoverable>
            <Text small p>
                <Link href={link} icon aria-label={header} target='_blank' rel='noopener noreferrer'>
                    {header}
                </Link>
            </Text>
            <Text h3 b>
                {metric.toLocaleString() || '-'}
            </Text>
        </Card>
    )
}
