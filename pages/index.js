import Layout from '@/layouts/simple'

import { Grid, Spacer } from '@geist-ui/react'

import Summary from '@/components/Metric/index'
import Map from '@/components/map'
import Tweets from '@/components/tweets'
import TableList from '@/components/incidentTable'

// need update data
import HorizontalBarChart from '@/components/Analytic/hateCrimes'
import StackedBar from '@/components/Analytic/incident'
import Dynamic from '@/components/Analytic/asianHate'

export default function Home({ switchThemes }) {
    return (
        <Layout switchThemes={switchThemes}>
            <Summary />
            <Spacer h={3} />
            <Grid.Container gap={0.8}>
                <Grid xs={16}>
                    <Map />
                </Grid>
                <Grid xs={8}>
                    <Tweets />
                </Grid>
            </Grid.Container>
            <Spacer h={3} />
            <Grid.Container>
                <Grid xs={16}>
                    <HorizontalBarChart />
                </Grid>
                <Grid xs={8}>
                    <Grid.Container>
                        <Grid xs={24}>
                            <Dynamic />
                        </Grid>
                        <Grid xs={24}>
                            <StackedBar />
                        </Grid>
                    </Grid.Container>
                </Grid>
            </Grid.Container>
            <Spacer h={3} />
            <TableList />
        </Layout>
    )
}
