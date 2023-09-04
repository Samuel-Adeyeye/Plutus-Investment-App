import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.DEV_GMAIL_USER,
        pass: process.env.DEV_GMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})
//  otp details

export const OTP_LENGTH = 4;
export const OTP_CONFIG = { lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false };


export type MAIL_PARAMS = {
    to: string,
    OTP: string
}

export const sendmail = async(from:string, to:string, subject:string, html:string)=>{
    try{
        const reponse = await transporter.sendMail({
            from: process.env.DEV_GMAIL_USER,
            to,
            subject: "Welcome",
            html,
        })
    }catch(err){
        console.log(err)
    }
}
export const sendmailForInvestment = async(from:string, to:string, subject:string, html:string)=>{
    try{
        const reponse = await transporter.sendMail({
            from: process.env.DEV_GMAIL_USER,
            to,
            subject,
            html,
        })
    }catch(err){
        console.log(err)
    }
}

export const emailHtml = (email:string, OTP:string)=>{
    const mail = `<h1>Welcome to Plutus<h1>
                    <p>You username: ${email}</p><br>
                    <p>Your OTP: ${OTP}</p><br>
                    <p>Thank You</p>`

                    return mail
}

export const emailHtmlForAdmin = (email:string, OTP:string)=>{
    const mail = `<h3>Dear Admin User,<h3><br>
                    <p>Please use these details too verify your account.</p>
                    <p>You username: ${email}</p><br>
                    <p>Your OTP: ${OTP}</p><br>
                    <p>Thank You</p>`
                    return mail
}


export const emailHtmlForCompany = (companyName:string, email:string, password:string,)=>{
    const mail = `<h1>Welcome to Plutus<h1>
                    <p>Hello ${companyName},</p><br>
                    <p> Thank you for registering your company with Plutus. Here you have access to attract a lot of investors to your company and scale your business so high.</p>
                    <p>Please use the details below to log into your account.</p><br>
                    <p>email: ${email}</p><br>
                    <p>password: ${password}</p><br>
                    <p>Don't hesistate in reaching out via our customer service mail to resolve any issues or concerns regarding your account.</p><br>
                    <p>Thank You</p><br>
                    <p>Best Regards,</p>
                    <p>From </P>
                    <P>Team Plutus</p>`

                    return mail
}

export const emailHtmlForCompanyTransferToInvestor = (investor_name:string, expectedReturn:number, companyName:string, roi:number, amount:number, actual_duration:string, monthlyReturn:number, date:string)=>{
    const mail = `
                    <p>Dear <strong>${investor_name}</strong>,</p><br>
                    <p>Your account has been credited with <span style = "color:green"><strong>NGN${expectedReturn}</strong></span> from <strong>${companyName}</strong> on <strong>${date}</strong>.</p>
                    <p style = "color:red">Please see your investment details highlighted below:</p><br>

                    <p>Investment Company: <span><strong>${companyName}</strong></span></p>
                    <p>ROI: <span style = "color:green">${roi}</span></p>
                    <p>Investment Capital: <span style = "color:green"> NGN${amount}</span></p>
                    <p>Duration: <span style = "color:green">${actual_duration} months</span></p>
                    <p>Monthly Return: <span style = "color:green">NGN${monthlyReturn}</span></p>
                    <p>Total Investment Return: <span style = "color:green"><strong>NGN${expectedReturn}</strong></span></p><br>

                    <p>You can also check out other investment plans on the plutus app and inspect for other opportunities from <strong>${companyName}</strong>.</p><br>

                    <p>Thank you for considering <span style = "color:blue"><strong>PLUTUS</strong></span> as your investment option. We are always ready to serve you better.</p><br>

                    <p>Best Regards,</p>
                    <p>From </P>
                    <P><strong style = "color:blue">Team PLUTUS</strong>.</p>`

                    return mail
}
