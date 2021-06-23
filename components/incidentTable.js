import { Code, Text, Table } from '@geist-ui/react'

export default function TableList() {
    const data = [
        { date: '01/01/1997', location: 'CA', incident: 'something' },
        { date: '01/01/1997', location: 'LA', incident: 'something' },
        { date: '01/01/1997', location: 'DC', incident: 'something' },
        { date: '01/01/1997', location: 'NY', incident: 'something' },
        { date: '01/01/1997', location: 'CA', incident: 'something' }
    ]
    return (
        <Table data={data}>
            <Table.Column prop='date' label='Date' />
            <Table.Column prop='location' label='Location' />
            <Table.Column prop='incident' label='Incident Details' />
        </Table>
    )
}
