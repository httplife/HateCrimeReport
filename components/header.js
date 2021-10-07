import { useEffect } from 'react'
import { Link, Grid, useTheme, useCurrentState, Spacer } from '@geist-ui/react'
import { Sun, Moon, Users, LogOut } from '@geist-ui/react-icons'

import { useSession } from 'next-auth/client'

// import '@/styles/style.css'

const HeaderContent = ({ switchThemes }) => {
    const theme = useTheme()
    const isDark = theme.type === 'light'
    const [fixed, setFixed] = useCurrentState(false)

    const [session, loading] = useSession(true)

    useEffect(() => {
        const scrollHandler = () => {
            const shouldFixed = document.documentElement.scrollTop > 60
            if (fixed !== shouldFixed) setFixed(shouldFixed)
        }
        document.addEventListener('scroll', scrollHandler)
        return () => document.removeEventListener('scroll', scrollHandler)
    }, [fixed])

    if (loading) return null

    return (
        <>
            <Spacer h={2} />
            <Grid.Container justify='center'>
                <Grid xs={12} md={12} justify='flex-start'>
                    <Link href='/'>
                        <div className={'logo'} />
                        <div className={'title'}>hate crime map</div>
                    </Link>
                </Grid>
                <Grid xs={12} md={12} justify='flex-end'>
                    <Grid.Container gap={2} justify='center'>
                        <Grid xs={4}>
                            <Link href='/about'>About</Link>
                        </Grid>
                        <Grid xs={4}>
                            <Link href='/incidents'>Incidents</Link>
                        </Grid>
                        <Grid xs={4}>
                            <Link href='/report'>Report</Link>
                        </Grid>
                        <Grid xs={2}>
                            {session ? (
                                <>
                                    <Link href='#'>
                                        <LogOut size={20} onClick={signOut} />
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href='/login'>
                                        <Users size={20} />
                                    </Link>
                                </>
                            )}
                        </Grid>
                        <Grid xs={2}>
                            {isDark ? (
                                <Link href='#'>
                                    <Sun size={20} onClick={switchThemes} />
                                </Link>
                            ) : (
                                <Link href='#'>
                                    <Moon size={20} onClick={switchThemes} />
                                </Link>
                            )}
                        </Grid>
                    </Grid.Container>
                </Grid>
            </Grid.Container>
        </>
    )
}

export default HeaderContent
