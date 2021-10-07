import { Grid, Text } from '@geist-ui/react'

const FooterContent = () => {
    return (
        <Grid.Container justify='center'>
            <Grid xs>
                <Text size={12}>&copy; {new Date().getFullYear()}</Text>
            </Grid>
        </Grid.Container>
    )
}

export default FooterContent
