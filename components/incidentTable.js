import { Pagination, Table, Grid, Spacer } from '@geist-ui/react'
import { ChevronRight, ChevronLeft } from '@geist-ui/react-icons'

export default function TableList() {
    const data = [
        { date: '01/01/1997', location: 'CA', incident: 'something' },
        { date: '01/01/1997', location: 'LA', incident: 'something' },
        { date: '01/01/1997', location: 'DC', incident: 'something' },
        { date: '01/01/1997', location: 'NY', incident: 'something' },
        { date: '01/01/1997', location: 'CA', incident: 'something' }
    ]
    return (
        <>
            <Grid.Container gap={0.8} justify='center'>
                <Grid xs={24}>
                    <Table data={data}>
                        <Table.Column prop='date' label='Date' />
                        <Table.Column prop='location' label='Location' />
                        <Table.Column prop='incident' label='Incident Details' />
                    </Table>
                </Grid>

                <Grid>
                    <Pagination count={5}>
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
