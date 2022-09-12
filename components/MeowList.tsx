import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import MeowCard from './MeowCard'
import { Alert, CircularProgress } from '@mui/material'

type MeowListProps = {
  provider: any
  contractAddress: string
  meowAbi: any
}

export default function MeowList (props: MeowListProps) {
  const [meows, setMeows] = useState<
    { timestamp: { _hex: string }; message: string; author: string }[]
  >([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchMeows()
  }, [])

  async function fetchMeows () {
    const contract = new ethers.Contract(
      props.contractAddress,
      props.meowAbi,
      props.provider
    )
    try {
      const meows: {
        timestamp: { _hex: string }
        message: string
        author: string
      }[] = await contract.getAllMeows()
      setMeows(meows)
      setLoading(false)
    } catch (err) {
      console.error(err)
      if (typeof err === 'string') {
        setError(err)
      } else if (err instanceof Error) {
        setError(err.message)
      }
    }
  }

  return (
    <>
      {loading && <CircularProgress />}
      {error && (
        <Alert severity='error'>
          <>
            This is an error alert — check it out: <br />
            {{ error }}
          </>
        </Alert>
      )}
      {meows.map((meow: any) => (
        <MeowCard
          key={meow.timestamp}
          message={meow.message}
          provider={props.provider}
          authorAddress={meow.author}
          date={new Date(
            parseInt(meow.timestamp._hex, 16) * 1000
          ).toUTCString()}
        />
      ))}
    </>
  )
}
