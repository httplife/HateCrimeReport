import { Page, Grid } from '@geist-ui/react'

import Head from '../components/head'
import Header from '../components/header'
import Footer from '../components/footer'

const SimpleLayout = ({ switchThemes, ...props }) => {
    return (
        <>
            <Head />
            <Page size='medium'>
                <Page.Header>
                    <Header switchThemes={switchThemes} />
                </Page.Header>

                <Page.Content>
                    <Grid.Container justify='center'>
                        <Grid>{props.children}</Grid>
                    </Grid.Container>
                </Page.Content>

                <Page.Footer>
                    <Grid.Container justify='center'>
                        <Footer />
                    </Grid.Container>
                </Page.Footer>
            </Page>
        </>
    )
}

export default SimpleLayout
