import { Pagination, Table, Grid, Spacer } from '@geist-ui/react'
import { ChevronRight, ChevronLeft } from '@geist-ui/react-icons'

import useSWR from 'swr'
import fetcher from '@/hooks/fetcher'

export default function TableList() {
    const { data, error } = useSWR(`/api/getIncidents`, fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    return (
        <>
            <Grid.Container gap={0.8} justify='center'>
                <Grid xs={24}>
                    <Table data={data}>
                        <Table.Column prop='incident_time' label='Date' />
                        <Table.Column prop='title' label='Title' />
                        <Table.Column prop='abstract' label='Abstract' />
                        <Table.Column prop='incident_source' label='Source' />
                    </Table>
                </Grid>

                <Grid>
                    <Pagination count={6}>
                        <Pagination.Next>
                            <ChevronRight />
                        </Pagination.Next>
                        <Pagination.Previous>
                            <ChevronLeft />
                        </Pagination.Previous>
                    </Pagination>
                </Grid>
            </Grid.Container>
        </>
    )
}
