import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/client'

import { Grid, Input, Spacer, Button, AutoComplete } from '@geist-ui/react'

import Layout from '../layouts/simple'
import TableList from '@/components/incidentTable'

import Router from 'next/router'

export default function ReportPage({ switchThemes }) {
    const [session, loading] = useSession()
    const [content, setContent] = useState()

    const allOptions = [
        { label: 'London', value: 'london' },
        { label: 'Sydney', value: 'sydney' },
        { label: 'Shanghai', value: 'shanghai' }
    ]
    const [options, setOptions] = useState()
    const [searching, setSearching] = useState(false)
    const timer = useRef()
    // triggered every time input
    const searchHandler = (currentValue) => {
        if (!currentValue) return setOptions([])
        setSearching(true)
        const relatedOptions = allOptions.filter((item) => item.value.includes(currentValue))
        // this is mock async request
        // you can get data in any way
        timer.current && clearTimeout(timer.current)
        timer.current = setTimeout(() => {
            setOptions(relatedOptions)
            setSearching(false)
            clearTimeout(timer.current)
        }, 1000)
    }

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
        // Router.push('/')
        return (
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
                        <AutoComplete
                            searching={searching}
                            options={options}
                            placeholder='Keywords'
                            onSearch={searchHandler}
                            width='100%'
                        />
                    </Grid>
                    <Grid AlignContent='center'>
                        <Button auto>Search</Button>
                    </Grid>
                </Grid.Container>
                <Spacer y={3} />
                <Grid.Container>
                    <Grid xs={24}>
                        <TableList />
                    </Grid>
                </Grid.Container>
            </Layout>
        )
    }

    // If session exists, display content
    return (
        <Layout>
            <Spacer y={2} />
            <Row>
                <Col span={12}>
                    <Input placeholder='Date Range' clearable>
                        Date
                    </Input>
                </Col>
                <Col span={12}>
                    <Input placeholder='Location' clearable>
                        Location
                    </Input>
                </Col>
            </Row>
            <Spacer y={2} />
            <Row>
                <Col span={2}></Col>
                <Col span={20}>
                    <Input placeholder='Link' clearable width='100%'>
                        URL
                    </Input>
                </Col>
                <Col span={2}></Col>
            </Row>
            <Spacer y={2} />
            <Row>
                <Col span={2}></Col>
                <Col span={20}>
                    <Textarea width='100%' placeholder='Please enter incident description.' />
                </Col>
                <Col span={2}></Col>
            </Row>
            <Spacer y={2} />
            <Row>
                <TableList />
            </Row>
        </Layout>
    )
}
