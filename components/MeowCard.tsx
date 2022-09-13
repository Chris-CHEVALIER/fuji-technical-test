import React from 'react'

import { ethers } from 'ethers'

import { Card, CardContent, Typography } from '@mui/material'

// TS types
type MeowCardProps = {
  message: string
  authorAddress: string
  provider: ethers.providers.BaseProvider
  key: Number
  date: string
}

// Represents one transaction with author address, message and timestamp formated
export default function MeowCard (props: MeowCardProps) {
  /* useEffect(() => {
    fetchEns()
  }, []) */

  // Can't fetch ENS - 'lookupAddress()' method returns 'null'...
  /* async function fetchEns () {
    const ens: string | null = await props.provider.lookupAddress(props.authorAddress)
    console.log(ens)
  } */

  return (
    <Card sx={{ mb: 2, maxWidth: 270 }}>
      <CardContent>
        <Typography
          noWrap
          sx={{ fontSize: 14 }}
          color='text.secondary'
          gutterBottom
        >
          {props.authorAddress}
        </Typography>

        <Typography noWrap sx={{ fontSize: 16 }} variant='body2'>
          {props.message}
        </Typography>

        <Typography
          noWrap
          sx={{ fontSize: 12 }}
          color='text.secondary'
          gutterBottom
        >
          {props.date}
        </Typography>
      </CardContent>
    </Card>
  )
}
