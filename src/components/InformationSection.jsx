import { Grow, Stack, Typography } from '@mui/material'
import React from 'react'


export default function InformationSection() {
    return (
        <Stack direction={"row"} sx={{
            height: "",
            background: "#212326",
            mt: 10,
            justifyContent: "space-around"
        }}>
            <Stack width="50%">
                <Grow in={true}>

                    <Typography variant="h2" sx={{
                        fontFamily: "Staatliches",
                        minWidth: "200px",
                        pt: 3
                    }} color={"text.primary"} >
                        Built through years of experience <strong className="gradientLetters">learning</strong> languages
                    </Typography>

                </Grow>
                <Grow in={true} timeout={1000}>
                    <Typography variant="body1" sx={{
                        fontFamily: "Staatliches",
                        minWidth: "200px",
                    }} color={"text.secondary"} >
                        We are here to help you really learn a new language without missing out on any terms and phrases. Our goal is to get you to a native level speaker.
                    </Typography>
                </Grow>
            </Stack>
            <img src={''} alt="" />
        </Stack>
    )
}
