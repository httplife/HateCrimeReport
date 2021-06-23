import { useEffect } from 'react'
import { Link, Grid, Row, Col, useTheme, useCurrentState } from '@geist-ui/react'
import { Sun, Moon, Users, LogOut } from '@geist-ui/react-icons'

import { useSession } from 'next-auth/client'

// import '@/styles/style.css'

const HeaderContent = ({ switchThemes }) => {
    const theme = useTheme()
    const isDark = theme.type === 'light'
    const [fixed, setFixed] = useCurrentState(false)

    const [session, loading] = useSession()

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
            <Row style={{ marginTop: '15px' }}>
                <Grid.Container justify='center'>
                    <Grid xs={12} md={12} justify='flex-start'>
                        <Link href='/'>
                            <Row align='middle'>
                                <div className={'logo'} />
                                <div className={'title'}>hate crime map</div>
                            </Row>
                        </Link>
                    </Grid>
                    <Grid xs={12} md={12} justify='flex-end'>
                        <Row gap={1} align='middle'>
                            <Col>
                                <Link href='/about'>About</Link>
                            </Col>
                            <Col>
                                <Link href='/report'>Report</Link>
                            </Col>
                            <Col>| </Col>
                            {/* {session ? (
                                <>
                                <Link href='#'>
                                    <LogOut size={16} onClick={signOut} />
                                </Link>
                                </>
                            ) : (
                                <>
                                    <Link href='/login'>
                                        <Users size={16} />
                                    </Link>
                                </>
                            )} */}
                            <Col>
                                <div onClick={switchThemes}>{isDark ? <Sun size={16} /> : <Moon size={16} />}</div>
                            </Col>
                        </Row>
                    </Grid>
                </Grid.Container>
            </Row>
        </>
    )
}

export default HeaderContent
