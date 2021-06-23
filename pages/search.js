import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/client'

import { Row, Col, Input, Spacer, Button, Textarea, AutoComplete } from '@geist-ui/react'

import Layout from '../layouts/simple'
import TableList from '@/components/incidentTable'

import Router from 'next/router'

export default function SearchPage() {
    const [session, loading] = useSession()
    const [content, setContent] = useState()
    const [options, setOptions] = useState()
    const [searching, setSearching] = useState(false)
    const timer = useRef()

    const allOptions = [
        { label: 'London', value: 'london' },
        { label: 'Sydney', value: 'sydney' },
        { label: 'Shanghai', value: 'shanghai' }
    ]

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

    // If no session exists, display access denied message
    if (!session) {
        Router.push('/login')
    }

    // If session exists, display content
    return (
        <Layout>
            <Spacer y={2} />
            <Row gap={2}>
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
                    <AutoComplete placeholder='Keywords' clearable width='100%'>
                        Keywords
                    </AutoComplete>
                </Col>
                <Col span={2}></Col>
            </Row>
            <Spacer y={2} />
            <Row>
                <Col span={2}></Col>
                <Col span={20}>
                    <Button>Search</Button>
                </Col>
                <Col span={2}></Col>
            </Row>
            <Spacer y={4} />
            <Row>
                <TableList />
            </Row>
        </Layout>
    )
}
