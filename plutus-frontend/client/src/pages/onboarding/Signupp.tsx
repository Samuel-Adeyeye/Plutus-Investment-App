// import React from 'react'
import { Onboarding } from '../../components/Onboarding'


const Signupp = () => {
  return (
    <Onboarding form={<SignForm />} />
  )
}

const SignForm = () => {
    return(
        <div>
            <form>
                <h1>Sign</h1>
                <input name="" />
            </form>
        </div>
    )
}


export default Signupp