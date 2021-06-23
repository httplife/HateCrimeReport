import { Page } from '@geist-ui/react'

import Head from '../components/head'
import Header from '../components/header'
import Menu from '../components/menu'
import Footer from '../components/footer'

const DedaultLayout = ({ switchThemes, ...props }) => {
    return (
        <>
            <Head />
            <Page size='medium'>
                <Page.Header>
                    <Header switchThemes={switchThemes} />
                    <Menu />
                </Page.Header>

                <Page.Content>{props.children}</Page.Content>

                <Page.Footer>
                    <Footer />
                </Page.Footer>
            </Page>
        </>
    )
}

export default DedaultLayout
