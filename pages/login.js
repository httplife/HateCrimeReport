import { useState, useEffect } from 'react'
import { Button, Link, Grid, Spacer, Input } from '@geist-ui/react'
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
            <Spacer h={4} />
            {Object.values(providers).map((provider) => {
                if (provider.name === 'Email') {
                    return (
                        <form onSubmit={handleSubmit}>
                            <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
                            <Spacer h={1} />
                            <h6>or Sign in with your email</h6>

                            <Grid.Container gap={1} justify='center'>
                                <Grid xs={18}>
                                    <Input
                                        placeholder='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid xs={6}>
                                    <Button auto scale={0.75} htmlType='submit' auto type='secondary' ghost>
                                        Sign Up
                                    </Button>
                                </Grid>
                            </Grid.Container>
                        </form>
                    )
                }

                if (provider.name === 'Credentials') {
                    return
                }

                if (provider.name === 'Wechat') {
                    return (
                        <>
                            <Spacer h={0.5} />
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
                        </>
                    )
                }

                if (provider.name === 'GitHub') {
                    return (
                        <>
                            <Spacer h={0.5} />
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
                        </>
                    )
                }

                if (provider.name === 'Twitter') {
                    return (
                        <>
                            <Spacer h={0.5} />
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
                        </>
                    )
                }

                if (provider.name === 'Slack') {
                    return (
                        <>
                            <Spacer h={0.5} />
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
                        </>
                    )
                }

                if (provider.name === 'Facebook') {
                    return (
                        <>
                            <Spacer h={0.5} />
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
                        </>
                    )
                }

                if (provider.name === 'LinkedIn') {
                    return (
                        <>
                            <Spacer h={0.5} />
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
                        </>
                    )
                }
                return (
                    <Button variant='outline' onClick={() => signIn(provider.id)}>
                        Sign in with {provider.name}
                    </Button>
                )
            })}
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
