import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'

import { Row, Col, Input, Spacer, Textarea, Button } from '@geist-ui/react'

import Layout from '../layouts/simple'
import TableList from '@/components/incidentTable'

import Router from 'next/router'

export default function ReportPage() {
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
            <Row>
                <TableList />
            </Row>
        </Layout>
    )
}
