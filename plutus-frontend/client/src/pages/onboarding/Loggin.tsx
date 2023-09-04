// import React from 'react'
import { Onboarding } from '../../components/Onboarding'

const Loggin = () => {
    return(
        <>
        <Onboarding form={<LoginForm />} />
        </>
    )
}



const LoginForm = () => {
    return(
        <div>
            <form>
                <h1>Login</h1>
                <input name="" />
            </form>
        </div>
    )
}



export default Loggin