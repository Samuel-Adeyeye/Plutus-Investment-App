/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState} from 'react'
import change from "./ChangePass.module.css"
import picture from "./images/logo.png"
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { passwordChangeConfirmation } from "../../redux/action";
import LoadingSpinner from '../../components/spinner';


interface ChangePassword {
     oldPassword: string,
     newPassword: string,
     confirm_password: string;

   }


function ChangePass2() {

     // const [passwordType, setPasswordType] = useState("")
     const [isLoading, setIsLoading] = useState(false);

     // const togglePassword =()=>{
     //      if(passwordType==="password")
     //      {
     //       setPasswordType("text")
     //       return;
     //      }
     //      setPasswordType("password")
     //    }

const [formData, setFormData] = useState<ChangePassword>({
     oldPassword: "",
     newPassword:"",
     confirm_password:""
     })

const dispatch = useDispatch() as unknown as any;
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const { name, value } = e.target;
     e.preventDefault()
     setFormData({
       ...formData,
       [name]: value,
     });
}

const email = localStorage.getItem("email")


const handleRegister = async (e:  React.FormEvent<HTMLFormElement>) => {
     e.preventDefault()
     if( formData.newPassword !== formData.confirm_password ){
          toast.error("Passwords do not match")
     }
     else if(formData.newPassword === formData.oldPassword){
          toast.error("old password & new password must be different")
     }   
     else{
          dispatch(passwordChangeConfirmation(formData))
          setIsLoading(true)

          setTimeout(() => {
         setIsLoading(false)
       }, 5000);
     }
}

  return (
    <>
          <div className={change.changePassword}>
               <div className={change.leftside}> 
                    <img src={picture}/>
                    <h5>Plutus is personal finance, made simple.</h5>
                    <p>All your accounts, cards, savings, and investments in one place</p>
                    </div>
               <div className={change.rightSide}>
                    <div className='logo'>
                         <h2>Plutus</h2>
                         <p>Online Banking</p>
                    </div>
                    <div className={change.content}>
                         <h2>Change Password</h2>
                         <h5>Enter your details</h5>
                        {email && (<form className={change.form} onSubmit={handleRegister}>
                              <input type="password" placeholder='Old Password' name='oldPassword' value={formData.oldPassword} required onChange={handleInputChange}  className={change.inputEmail} ></input>
                              <input type="password" placeholder='New Password' name='newPassword' value={formData.newPassword} required onChange={handleInputChange} className={change.inputEmail}></input>
                              <input type='password' placeholder='Confirm Password' name='confirm_password' value={formData.confirm_password} required onChange={handleInputChange}  className={change.inputEmail}></input>
                              <div className={change.btnnn} >
                                   <button className={change.button} disabled={isLoading}>
                                        {isLoading ? <LoadingSpinner />: "Submit"}
                                   </button>
                              </div>
                         </form>)}
                 


                         {!email && (<form className={change.form} onSubmit={handleRegister}>
                         <input type="password" placeholder='New Password' name='newPassword' value={formData.newPassword} required onChange={handleInputChange} className={change.inputEmail}></input>
                         <input type='password' placeholder='Confirm Password' name='confirm_password' value={formData.confirm_password} required onChange={handleInputChange}  className={change.inputEmail}></input>
                         <div className={change.btnnn} >
                              <button className={change.button} disabled={isLoading}>
                                   {isLoading ? <LoadingSpinner />: "Submit"}
                              </button>
                         </div>
                    </form>)}
                    </div>
               </div>
          </div>

    </>
  )
}


export default ChangePass2
