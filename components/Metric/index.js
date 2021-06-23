import { Grid } from '@geist-ui/react'

import Total from './total'
import Race from './race'
import Religion from './religion.js'
import SexualOrientation from './sexual.js'
import Gender from './gender.js'
import GenderIdentity from './identity.js'
import Ethnicity from './ethnicity.js'
import Dsiability from './disability.js'
import Color from './color.js'

export default function Summary() {
    return (
        <Grid.Container gap={0.8} justify='center'>
            <Grid xs={6}>
                <Total />
            </Grid>
            <Grid xs={6}>
                <Race />
            </Grid>
            <Grid xs={6}>
                <Color />
            </Grid>
            <Grid xs={6}>
                <Gender />
            </Grid>
            <Grid xs>
                <GenderIdentity />
            </Grid>
            <Grid xs>
                <Ethnicity />
            </Grid>
            <Grid xs>
                <Dsiability />
            </Grid>
            <Grid xs>
                <Religion />
            </Grid>
            <Grid xs>
                <SexualOrientation />
            </Grid>
        </Grid.Container>
    )
}
