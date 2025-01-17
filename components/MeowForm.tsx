import React, { useState } from 'react'
import { Resolver, useForm } from 'react-hook-form'

import { ContractInterface, ethers } from 'ethers'

import {
  Alert,
  Box,
  Button,
  TextField,
  Typography,
  withStyles
} from '@mui/material'
import PetsIcon from '@mui/icons-material/Pets'

// TS types
type FormValues = {
  message: string
}

type MeowFormProps = {
  provider: ethers.providers.Web3Provider
  contractAddress: string
  meowAbi: ContractInterface
}

// Form to send a meow message handled with "react-hook-form" library
export default function MeowForm (props: MeowFormProps) {
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const resolver: Resolver<FormValues> = async values => {
    return {
      values: values.message ? values : {},
      errors: !values.message
        ? {
            message: {
              type: 'required',
              message: 'Meow message is required.'
            }
          }
        : {}
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues
  } = useForm<FormValues>({ resolver })

  const isConnected = async () => {
    const accounts = await props.provider.listAccounts()
    return new Promise(function (resolve, reject) {
      resolve(accounts.length > 0)
    })
  }

  // On form submit, the transaction is sended and handled by wallet (MetaMask or other)
  const onSubmit = (data: FormValues) => {
    try {
      isConnected().then(isConnected => {
        if (isConnected) {
          const contract = new ethers.Contract(
            props.contractAddress,
            props.meowAbi,
            props.provider.getSigner() // The contract need signer to handle transaction
          )
          contract.sayMeow(data.message).then(
            // Send transaction
            (result: any) => {
              setLoading(true)
              setSuccessMessage('Your transaction has been sent!')
              setError('')
              result.wait().then(() => {
                setSuccessMessage('Your transaction has been mined!')
                setLoading(false)
              })
            },
            (err: Error) => {
              // Handle error process
              console.error(err)
              setError('An error occured')
            }
          )
          reset()
        } else {
          setError('Please connect your wallet first!')
        }
      })
    } catch (err) {
      // Handle error process
      console.log(err)
      if (typeof err === 'string') {
        setError(err)
      } else if (err instanceof Error) {
        setError(err.message)
      }
    }
  }

  return (
    <>
      {successMessage !== '' && (
        <Alert severity='success'>{successMessage}</Alert>
      )}
      {error !== '' && <Alert severity='error'>{error}</Alert>}
      {loading && (
        <Alert severity='info'>Your transaction is waiting for mining...</Alert>
      )}
      <Typography variant='h4' color='primary' align='center'>
        Send a meow
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id='message'
          label='Meow message'
          multiline
          variant='outlined'
          rows={4}
          {...register('message')}
          placeholder='Type your meow message here...'
          sx={{
            minWidth: 270,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            '& fieldset': {
              borderRadius: '15px',
              borderColor: '#3574F4'
            }
          }}
        />
        {errors.message && (
          <Alert severity='error'>The meow message is required</Alert>
        )}
        <br />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            endIcon={<PetsIcon />}
            sx={{
              mt: 1,
              maxWidth: 260,
              transition: 'transform 0.125s ease',
              fontWeight: 700,
              paddingRight: '14px',
              paddingLeft: '14px',
              height: '40px',
              '&:hover': {
                transform: 'scale3d(1.03, 1.03, 1)',
                backgroundColor: '#3674F4'
              },
              borderRadius: '10px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
            }}
            disabled={loading}
          >
            Send meow
          </Button>
        </Box>
      </form>
    </>
  )
}
