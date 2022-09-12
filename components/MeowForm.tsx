import { Alert, Button, TextField } from '@mui/material'
import { ethers } from 'ethers'
import React, { useState } from 'react'
import { Resolver, useForm } from 'react-hook-form'
import SendIcon from '@mui/icons-material/Send'

type FormValues = {
  message: string
}

type MeowFormProps = {
  provider: any
  contractAddress: string
  meowAbi: any
}

export default function MeowForm (props: MeowFormProps) {
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
    formState: { errors }
  } = useForm<FormValues>({ resolver })

  const onSubmit = (data: any) => {
    const contract = new ethers.Contract(
      props.contractAddress,
      props.meowAbi,
      props.provider.getSigner()
    )
    try {
      contract.sayMeow(data.message)
    } catch (err) {
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
      {error && (
        <Alert severity='error'>
          <>
            This is an error alert — check it out: <br />
            {{ error }}
          </>
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id='message'
          label='Meow message'
          multiline
          rows={4}
          {...register('message')}
          placeholder='Type your meow message here...'
          sx={{ m: 1 }}
        />
        <br />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          endIcon={<SendIcon />}
          sx={{ m: 1 }}
        >
          Send meow
        </Button>
      </form>
    </>
  )
}
