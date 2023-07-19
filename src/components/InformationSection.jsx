import { Grow, Stack, Typography } from '@mui/material'
import React from 'react'


export default function InformationSection() {
    return (
        <Stack direction={"row"} sx={{
            height: "80vh",
            background: "#212326",
            mt: 10,
            justifyContent: "space-around"
        }}>
            <Grow in={true}>

                <Typography variant="h2" sx={{
                    fontFamily: "Staatliches",
                    width: "50%",
                    minWidth: "200px",
                    pt: 3
                }} color={"text.primary"} >
                    Built through years of experience <strong className="gradientLetters">learning</strong> languages
                </Typography>
            </Grow>
            <img src={''} alt="" />
        </Stack>
    )
}
