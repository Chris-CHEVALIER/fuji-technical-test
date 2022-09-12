import { Card, CardContent, Typography } from '@mui/material'
import { ethers } from 'ethers'
import React from 'react'

type MeowCardProps = {
  message: string
  authorAddress: string
  provider: ethers.providers.BaseProvider
  key: Number
  date: string
}

export default function MeowCard (props: MeowCardProps) {
  /* useEffect(() => {
    fetchEns();
  }, [])

  async function fetchEns () {
    const ens = await props.provider.lookupAddress(props.authorAddress)
    console.log(ens)
  } */

  return (
    <Card sx={{ m: 2 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {props.authorAddress}
        </Typography>

        <Typography sx={{ fontSize: 16 }} variant='body2'>
          {props.message}
        </Typography>

        <Typography sx={{ fontSize: 12 }} color='text.secondary' gutterBottom>
          {props.date}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size='small'>Learn More</Button>
      </CardActions> */}
    </Card>
  )
}
