import { useState, useEffect } from 'react'
import { Row, Col, Button, Link, Grid, Spacer, Input, Dot, Text } from '@geist-ui/react'
import { Github, Twitter, MessageCircle, Slack, Facebook, Linkedin } from '@geist-ui/react-icons'
import Layout from '../layouts/simple'

import { getProviders, getCsrfToken, signIn } from 'next-auth/client'

const LoginPage = ({ switchThemes, providers, csrfToken }) => {
    const [errorMsg, setErrorMsg] = useState()
    const [email, setEmail] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const body = {
            email: email
        }
        const res = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        if (res.status === 201) {
            const userObj = await res.json()
            mutate(userObj)
        } else {
            setErrorMsg(res.statusText)
        }
    }

    if (!providers) {
        // evaluates to true if currentVideo is null
        return (
            <Layout switchThemes={switchThemes}>
                <div>Loading...</div>
            </Layout>
        )
    }

    return (
        <Layout switchThemes={switchThemes}>
            <Spacer y={6} />
            <Row gap={0.8} justify='center'>
                <Col></Col>
                <Col span={16}>
                    <Grid.Container gap={0.8} justify='center'>
                        {Object.values(providers).map((provider) => {
                            if (provider.name === 'Email') {
                                return (
                                    <form onSubmit={handleSubmit}>
                                        <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
                                        <Grid xs={24}>
                                            <Grid.Container gap={0.5} justify='center'>
                                                <Grid xs={16}>
                                                    <Input
                                                        icon={<Mail />}
                                                        size='small'
                                                        placeholder='email'
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid xs>
                                                    <Row align='middle'>
                                                        <Button
                                                            htmlType='submit'
                                                            size='mini'
                                                            auto
                                                            type='secondary'
                                                            ghost
                                                        >
                                                            Sign Up
                                                        </Button>
                                                    </Row>
                                                </Grid>
                                            </Grid.Container>
                                        </Grid>
                                    </form>
                                )
                            }

                            if (provider.name === 'Credentials') {
                                return
                            }

                            if (provider.name === 'Wechat') {
                                return (
                                    <Grid xs={24}>
                                        <Link href='#'>
                                            <Button
                                                icon={
                                                    <MessageCircle
                                                        size={20}
                                                        onClick={() => signIn(provider.id)}
                                                        title={provider.name}
                                                        aria-label={provider.name}
                                                    />
                                                }
                                            >
                                                Wechat
                                            </Button>
                                        </Link>
                                    </Grid>
                                )
                            }

                            if (provider.name === 'GitHub') {
                                return (
                                    <Grid xs={24}>
                                        <Link href='#'>
                                            <Button
                                                icon={
                                                    <Github
                                                        size={20}
                                                        onClick={() => signIn(provider.id)}
                                                        title={provider.name}
                                                        aria-label={provider.name}
                                                    />
                                                }
                                            >
                                                Github
                                            </Button>
                                        </Link>
                                    </Grid>
                                )
                            }

                            if (provider.name === 'Twitter') {
                                return (
                                    <Grid xs={24}>
                                        <Link href='#'>
                                            <Button
                                                icon={
                                                    <Twitter
                                                        size={20}
                                                        onClick={() => signIn(provider.id)}
                                                        title={provider.name}
                                                        aria-label={provider.name}
                                                    />
                                                }
                                            >
                                                Twitter
                                            </Button>
                                        </Link>
                                    </Grid>
                                )
                            }

                            if (provider.name === 'Slack') {
                                return (
                                    <Grid xs={24}>
                                        <Link href='#'>
                                            <Button
                                                icon={
                                                    <Slack
                                                        size={20}
                                                        onClick={() => signIn(provider.id)}
                                                        title={provider.name}
                                                        aria-label={provider.name}
                                                    />
                                                }
                                            >
                                                Slack
                                            </Button>
                                        </Link>
                                    </Grid>
                                )
                            }

                            if (provider.name === 'Facebook') {
                                return (
                                    <Grid xs={24}>
                                        <Link href='#'>
                                            <Button
                                                icon={
                                                    <Facebook
                                                        size={20}
                                                        onClick={() => signIn(provider.id)}
                                                        title={provider.name}
                                                        aria-label={provider.name}
                                                    />
                                                }
                                            >
                                                Slack
                                            </Button>
                                        </Link>
                                    </Grid>
                                )
                            }

                            if (provider.name === 'LinkedIn') {
                                return (
                                    <Grid xs={24}>
                                        <Link href='#'>
                                            <Button
                                                icon={
                                                    <Linkedin
                                                        size={20}
                                                        onClick={() => signIn(provider.id)}
                                                        title={provider.name}
                                                        aria-label={provider.name}
                                                    />
                                                }
                                            >
                                                Slack
                                            </Button>
                                        </Link>
                                    </Grid>
                                )
                            }
                            // return (
                            //     <Button variant='outline' onClick={() => signIn(provider.id)}>
                            //         Sign in with {provider.name}
                            //     </Button>
                            // )
                        })}
                    </Grid.Container>
                </Col>
                <Col></Col>
            </Row>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const providers = await getProviders()
    const csrfToken = await getCsrfToken(context)
    return {
        props: { providers, csrfToken }
    }
}

export default LoginPage
