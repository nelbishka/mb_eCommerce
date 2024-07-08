import React from 'react'
import { Button, Grid, Typography} from '@mui/material'
import {useForm, FormProvider} from 'react-hook-form'
import FormInput from './CustomTextField'
import {Link} from 'react-router-dom'

const AddressForm = ({checkoutToken, next}) => {
    const methods = useForm();

  return (
    <>
        <Typography variant='h6' gutterBottom>Shipping Address</Typography>
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data)=>next({ ...data}))}>
                <Grid container spacing={3}>
                    <FormInput required  name='firstName' label='First name' />
                    <FormInput required name='lastName' label='Last name' />
                    <FormInput required name='email' label='Email' />
                    <FormInput required name='address1' label='Address' />
                    <FormInput required name='phoneNumber' label='Phone Number' />
                    <FormInput required name='ZIP' label='ZIP / Postal Code' />
                </Grid>
                <br/>
                <div style={{display:'flex', justifyContent:'space-between'}} >
                    <Button component={Link} to='/cart' variant='outlined' >Back to Cart</Button>
                    <Button type='submit' variant='contained' color='primary'>Next</Button>

                </div>

            </form>
        </FormProvider>
    </>
  )
}

export default AddressForm