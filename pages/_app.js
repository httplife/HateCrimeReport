import '../styles/globals.css'
import { useState } from 'react'
import { GeistProvider, CssBaseline } from '@geist-ui/react'

import { Provider } from 'next-auth/client'
import Head from 'next/head'

const Application = ({ Component, pageProps }) => {
    const [themeType, setThemeType] = useState('light')
    const switchThemes = () => {
        setThemeType((last) => (last === 'dark' ? 'light' : 'dark'))
        if (typeof window === 'undefined' || !window.localStorage) return
        window.localStorage.setItem('themeType', themeType)
    }

    return (
        <Provider session={pageProps.session}>
            <GeistProvider themeType={themeType}>
                <Head>
                    <title>Hate Cripe Report</title>
                    <meta charSet='utf-8' />
                    <link rel='icon' href='/favicon.ico' />
                    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                </Head>
                <CssBaseline />
                <Component switchThemes={switchThemes} {...pageProps} />
            </GeistProvider>
        </Provider>
    )
}

export default Application
