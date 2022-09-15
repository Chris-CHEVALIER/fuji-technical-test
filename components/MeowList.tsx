import React, { useEffect, useState } from 'react'

import { ContractInterface, ethers } from 'ethers'

import { Alert, CircularProgress, Typography } from '@mui/material'

import MeowCard from './MeowCard'
import { Box } from '@mui/system'

// TS types
type MeowListProps = {
  provider: ethers.providers.Web3Provider
  contractAddress: string
  meowAbi: ContractInterface
}

type Meow = {
  message: string
  timestamp: { _hex: string }
  author: string
}

// Display all transactions as a list
export default function MeowList (props: MeowListProps) {
  const [meows, setMeows] = useState<Meow[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  // Fetch meows after the 1st render - display loading indicator before
  useEffect(() => {
    fetchMeows()
    setInterval(() => fetchMeows(), 10000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Get meows with smart contract informations - call 'getAllMeows()' method from contract
  async function fetchMeows () {
    try {
      const contract = new ethers.Contract(
        props.contractAddress,
        props.meowAbi,
        props.provider
      )
      // await props.provider.send('eth_requestAccounts', []);
      const meows: Meow[] = await contract.getAllMeows()
      setMeows(meows)
      setLoading(false)
    } catch (err) {
      // Handle error process
      console.error(err)
      if (typeof err === 'string') {
        setError(err)
      } else if (err instanceof Error) {
        setError(err.message)
      }
      setLoading(false)
    }
  }

  return (
    <>
      <Typography variant='h4' color='primary' align='center'>
        Meows
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Alert severity='error'>
          <>
            An error occured: <br />
            {error}
          </>
        </Alert>
      )}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly'
        }}
      >
        {meows.map((meow: Meow, i) => (
          <MeowCard
            key={i}
            message={meow.message}
            provider={props.provider}
            authorAddress={meow.author}
            date={new Date(
              parseInt(meow.timestamp._hex, 16) * 1000
            ).toUTCString()}
          />
        ))}
      </Box>
    </>
  )
}
