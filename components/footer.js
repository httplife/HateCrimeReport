import { Row, Text } from '@geist-ui/react'

const FooterContent = () => {
    return (
        <Row justify='center'>
            <Text size={12}>&copy; {new Date().getFullYear()}</Text>
        </Row>
    )
}

export default FooterContent
