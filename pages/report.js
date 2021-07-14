import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'

import { Row, Col, Input, Spacer, Textarea, Button, Grid } from '@geist-ui/react'

import Layout from '../layouts/simple'
import TableList from '@/components/incidentTable'

import Router from 'next/router'

export default function SubmitPage({ switchThemes }) {
    const [session, loading] = useSession()
    const [content, setContent] = useState()

    // Fetch content from protected route
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/auth/protected')
            const json = await res.json()
            if (json.content) {
                setContent(json.content)
            }
        }
        fetchData()
    }, [session])

    // When rendering client side don't display anything until loading is complete
    if (typeof window !== 'undefined' && loading) return null
    if (loading) return null
    // If no session exists, display access denied message
    if (!session) {
        Router.push('/')
    }

    // If session exists, display content
    return (
        <>
            <Layout switchThemes={switchThemes}>
                <Grid.Container gap={0.8}>
                    <Grid xs={12} AlignContent='center'>
                        <Input placeholder='Date Range' clearable>
                            Date
                        </Input>
                    </Grid>
                    <Grid xs={12} alignContent='flex-start'>
                        <Input placeholder='Location' clearable>
                            Location
                        </Input>
                    </Grid>
                    <Grid xs={24}>
                        <Input placeholder='Link' clearable width='100%'>
                            URL
                        </Input>
                    </Grid>
                    <Grid xs={24}>
                        <Textarea width='100%' placeholder='Please enter incident description.' />
                    </Grid>
                    <Grid AlignContent='center'>
                        <Button auto>Submit</Button>
                    </Grid>
                </Grid.Container>
                <Spacer y={3} />
                <Grid.Container>
                    <Grid xs={24}>
                        <TableList />
                    </Grid>
                </Grid.Container>
            </Layout>
        </>
    )
}
