import { Typography, useMediaQuery } from '@mui/material'
import React from 'react'

export default function Title({ title }) {
  const mobile = useMediaQuery("(max-width:800px)");

  return (
    <Typography
      variant="h1"
      mt={10}
      mb={1}
      align="center"
      sx={{
        color: "text.primary",
        fontFamily: "Staatliches",
        //Normal is a hack to show regular mui styling it could also be any other string
        fontSize: mobile ? "4rem" : "normal"
      }}
    >
      {title}
    </Typography>
  )
}
