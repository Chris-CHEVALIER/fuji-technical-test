import { useEffect, useState } from 'react'

import { NextPage } from 'next'
import Head from 'next/head'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ethers } from 'ethers'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import { orange } from '@mui/material/colors'
import { Alert, Box, Divider, Typography } from '@mui/material'

import MeowForm from '../components/MeowForm'
import MeowList from '../components/MeowList'
import MeowAbi from '../contracts/MeowAbi.json'
import Web3 from 'web3'

// Handle MUI theme for primary color
const theme = createTheme({
  palette: {
    primary: {
      main: orange[500]
    }
  }
})

const contractAddress: string = '0xd054e5724d7d595b72abbb0c460e0221cd859c8f'

const Home: NextPage = () => {
  const [
    provider,
    setProvider
  ] = useState<ethers.providers.Web3Provider | null>(null)
  const [error, setError] = useState<string>('')

  // Handle ethers JS provider in 'useEffect()' to have access to 'window' with NextJS
  useEffect(() => {
    try {
      const provider: ethers.providers.Web3Provider = new ethers.providers.Web3Provider(
        Web3.givenProvider
      )
      setProvider(provider)
    } catch (err) {
      console.error(err)
      if (typeof err === 'string') {
        setError(err)
      } else if (err instanceof Error) {
        setError(err.message)
      }
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Meow App</title>
        <meta
          name='description'
          content="My super app to interact with 'Cat' smart Contract"
        />
        <link rel='icon' href='/static/favicon.ico' />
      </Head>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          my: 1
        }}
      >
        <Typography sx={{ fontSize: 18, fontWeight: 'bold' }} color='primary'>
          Please connect your wallet first
        </Typography>
        <ConnectButton />
      </Box>
      {error && (
        <Alert severity='error'>
          <>
            An error occured: <br />
            {error}
          </>
        </Alert>
      )}
      {provider !== null && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly'
          }}
        >
          <Box>
            <MeowForm
              contractAddress={contractAddress}
              provider={provider}
              meowAbi={MeowAbi}
            />
          </Box>
          <Divider
            component='ul'
            sx={{
              width: '90%',
              borderWidth: 2,
              m: 2,
              display: { xs: 'block', md: 'none' }
            }}
          />
          <Box sx={{ width: '40%' }}>
            <MeowList
              contractAddress={contractAddress}
              provider={provider}
              meowAbi={MeowAbi}
            />
          </Box>
        </Box>
      )}

      {/* <h1 className={styles.title}>
          Welcome to <a href="">RainbowKit</a> + <a href="">wagmi</a> +{' '}
          <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://rainbowkit.com" className={styles.card}>
            <h2>RainbowKit Documentation &rarr;</h2>
            <p>Learn how to customize your wallet connection flow.</p>
          </a>

          <a href="https://wagmi.sh" className={styles.card}>
            <h2>wagmi Documentation &rarr;</h2>
            <p>Learn how to interact with Ethereum.</p>
          </a>

          <a
            href="https://github.com/rainbow-me/rainbowkit/tree/main/examples"
            className={styles.card}
          >
            <h2>RainbowKit Examples &rarr;</h2>
            <p>Discover boilerplate example RainbowKit projects.</p>
          </a>

          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Next.js Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Next.js Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}

      {/* <footer className={styles.footer}>
        <a href="https://rainbow.me" target="_blank" rel="noopener noreferrer">
          Made with ❤️ by your frens at 🌈
        </a>
      </footer> */}
    </ThemeProvider>
  )
}

export default Home
