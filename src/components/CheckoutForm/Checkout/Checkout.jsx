import React, {useState, useEffect} from 'react'
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline} from '@mui/material'
import {Link} from 'react-router-dom'
import {commerce} from '../../../library/commerce'
import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'

const steps = ['Shipping address', 'Payment Details']

const Checkout = ({cart, order, onCaptureCheckout, error}) => {

    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingData, setShippingData] = useState({})
    const classes = useStyles();

    useEffect(()=>{
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type : 'cart'})

                setCheckoutToken(token)
            } catch (error) {
                console.log(error)
            }
        }
        generateToken();
    },[cart])

    const nextStep= () => {
        setActiveStep((prevActiveStep)=>prevActiveStep+1);

    }

    const backStep= () => {
        setActiveStep((prevActiveStep)=>prevActiveStep-1);
    }

    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant='h5'>Thank you for your purchase!</Typography> <br/>
                <Typography variant='h7'>You should receive the information on your email.</Typography>
                <Divider className={classes.divider} />
            </div>
            <br/>
            <Button variant='outlined' component={Link} to='/' type='button'>Back to Home</Button>
        </>
    ) : (
        <div>
            <CircularProgress />
        </div>
    );

    if(error) {
        <>
            <Typography variant='h5'>Error: {error}</Typography>
            <br/>
            <Button variant='outlined' component={Link} to='/' type='button'>Back to Home</Button>
        </>
    }

    const Form = () => activeStep===0
        ? <AddressForm checkoutToken={checkoutToken} next={next} />
        : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep} />

  return (
    <>
        <CssBaseline/>
        <div className={classes.toolbar} />
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant='h4' align='center'>Checkout</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((step)=>(
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep=== steps.length ? <Confirmation /> : checkoutToken && <Form />}
            </Paper>
        </main>
    </>
  )
}

export default Checkout