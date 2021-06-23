import '../styles/globals.css'
import { useState } from 'react'
import { GeistProvider, CssBaseline } from '@geist-ui/react'

import { Provider } from 'next-auth/client'

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
                <CssBaseline />
                <Component switchThemes={switchThemes} {...pageProps} />
            </GeistProvider>
        </Provider>
    )
}

export default Application
