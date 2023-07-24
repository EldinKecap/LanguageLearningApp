import { Typography } from '@mui/material'
import React from 'react'

export default function Title({title}) {
  return (
    <Typography
      variant="h1"
      mt={10}
      align="center"
      sx={{ color: "text.primary", fontFamily: "Staatliches" }}
    >
      {title}
    </Typography>
  )
}
