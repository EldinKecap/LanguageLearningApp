import { IconButton, Stack, Typography } from '@mui/material'
import React from 'react'

export default function IconButtonWithLabel({ label, onClickHandler, icon , sx = {} }) {
    return (<Stack mx={2} alignItems="center" gap={0.5} sx={sx}>
        <IconButton sx={{width:"fit-content"}}
            onClick={onClickHandler}
        >
            {icon}
        </IconButton>
        <Typography variant="body2" sx={{
            fontFamily: "Staatliches",
            color: "text.secondary",
        }}>{label}</Typography>
    </Stack>
    )
}
