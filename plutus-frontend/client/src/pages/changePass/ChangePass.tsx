/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import change from "./changePass.module.css";
import picture from "./images/logo.png";
import OtpInput from "react-otp-input";
import { useDispatch } from "react-redux";
import { emailVerification, otpVerification } from "../../redux/action"
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/spinner";

function changePass() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [modal, setModal] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch() as unknown as any;

  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };


  const toggleModal = () => {
    setModal(!modal);
  };


  const handleVerify = async (e: React.FormEvent) => {
    dispatch(otpVerification(otp))
    e.preventDefault()
     setIsLoading(true)

     setTimeout(()=>{
          setIsLoading(false)
     },5000)
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  const sendOTP = () => {
    setMinutes(4);
    setSeconds(59);
  };
  const resendOTP = () => {
    setMinutes(4);
    setSeconds(59);
  };

  const userEmail = localStorage.getItem("email")
  const index = userEmail?.indexOf("@")
  const secHalf = userEmail?.slice(index)

  const index1 = email?.indexOf("@")
  const secHalf2 = email?.slice(index1)

  const handleSubmit = async (e: React.FormEvent) => {
     try {
          e.preventDefault()
          if(userEmail && userEmail !== email){
               toast.error("Email do not match");
               window.location.reload()
          }
          await dispatch(emailVerification(email))
          toggleModal();
          sendOTP();
          
          
     } catch (error) {
          toast.error("Please try again")
          window.location.reload()
     }
  };
  

  return (
    <>
      <div className={change.changePassword}>
        <div className={change.leftside}>
          <img src={picture}  alt=""/>
          <h5>Plutus is personal finance made simple.</h5>
          <p>All your accounts, cards, savings, and investments in one place</p>
        </div>
        <div className={change.rightSide}>
          <div className=" pr-10 text-blue-600 text-end h-[200px] mt-12">
            <h2 className="text-3xl font-bold">Plutus</h2>
            <p>Online Banking</p>
          </div>
          {!modal  && (
            <div className={change.content}>
              <h2>Change Password</h2>
              <p >Enter you email address</p>
              <form action="" className={change.form}>
                <input
                  className={change.inputEmail}
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  required
                  onChange={handleInputChange}
                ></input>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className={change.button}
                >
                  Submit
                </button>
              </form>
            </div>
          )}
          {modal && (
            <div className={change.content1}>
              <h2 className="text-[20px] font-bold my-2"> Verify your identity</h2>
              <p id="first" className="w-80 text-[15px] font-light ">
                We've just sent an email with your security code to the email {userEmail ? `${userEmail[0]}${userEmail[1]}${userEmail[2]}${userEmail[3]}********${secHalf}`: `${email[0]}${email[1]}${email[2]}${email[3]}********${secHalf2}`}
              </p>
              <p className="text-[15px] mt-6 font-light">Please enter the code in other to continue</p>
              <form className="mt-8 w-[80%] lg:- h-[100%]">
                <div className={change.otpinput}>
                  <OtpInput
                    onChange={setOtp}
                    numInputs={4}
                    value={otp}
                    renderInput={(props) => <input {...props} />}
                    containerStyle={change.otpStyle}
                  />
                </div>
                <div className={change.countdowntext}>
                  {seconds > 0 || minutes > 0 ? (
                    <p>
                      Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                      {seconds < 10 ? `0${seconds}` : seconds}
                    </p>
                  ) : (
                    <p>Didn't recieve code?</p>
                  )}
                </div>
                
                <div className={change.btnEnd}>
                    <button onClick={handleVerify} className={change.button}
                    disabled={!otp || isLoading}>
                         {isLoading ? <LoadingSpinner /> : "Veriffy"}
                    </button>
               

                    <button
                    id="otp_resend"
                    disabled={seconds > 0 || minutes > 5}
                    style={{
                         color: seconds > 0 || minutes > 0 ? "#fff" : "#FF5630",
                    }}
                    onClick={resendOTP}
                    className={change.button}
                    >
                    I didn't get the code
                    </button>
                </div>
                  
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default changePass;
