import Layout from '@/layouts/simple'

import { Grid, Spacer, Text, Link } from '@geist-ui/react'

import Summary from '@/components/Metric/index'

export default function Home({ switchThemes }) {
    return (
        <Layout switchThemes={switchThemes}>
            <Grid.Container>
                <Grid>
                    <Spacer y={3} />
                    <Summary />
                    <Spacer y={3} />
                    Please help us
                    <Link href='/report' block>
                        <b>STOP</b>
                    </Link>
                    hate crime
                    <Text p>
                        In light of waves of anti-asian hate crimes, have you ever felt helpless? Have you ever wanted
                        to do something, but couldn’t find many options that could make any difference in this obstinate
                        disease? Have you ever had great ideas that you believe can have a real impact, but don't have
                        the time, energy, resources or skills to accomplish all by yourself? Are you sick of being stuck
                        in an emotional dead loop and starting to lose hope?
                    </Text>
                    <Text p>
                        <b>Problem</b>: Currently despite news coverage of increased amoung of hate crimes against AAPI,
                        there is not single validated data source to track geographically these events and corresponding
                        stats, making it difficult for our community to get a sense how dangerous the places they are
                        going to are, as well as lack a site to tell their allies how things are, and rally their
                        politicians to drive policy change.
                    </Text>
                    <Text p>
                        <b>Solution</b>: Think about the 1acre3point site that tracks COVID-19 which shows visual charts
                        of the disease, and has been quoted by health care officials to make policy adjustments as well
                        as used by normal people to understand the severity of the pandemic. We can build a similar site
                        for hate crimes. One key aspect is tracking the outcome of the hate crime as well to understand
                        if these individuals where ultimately prosecuted or rehabilitated.
                    </Text>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}
