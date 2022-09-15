import React from 'react'

import { ethers } from 'ethers'

import { Card, CardContent, Typography } from '@mui/material'

// TS types
type MeowCardProps = {
  message: string
  authorAddress: string
  provider: ethers.providers.Web3Provider
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
    const jsonProvider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
    const ens: string | null = await jsonProvider.lookupAddress(
      props.authorAddress
    )
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

        <Typography sx={{ fontSize: 16 }} variant='body2'>
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
