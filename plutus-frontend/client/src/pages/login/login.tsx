/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import log from "./login.module.css";
import logo from "../../assets/logo.png";
import { loginUser } from "../../redux/action";
import { useDispatch } from "react-redux";
import LoadingSpinner from "../../components/spinner";
import { Link } from "react-router-dom";



interface LoginData {
  email: "";
  password: "";
}

function Login() {
     const [error] = useState("");
     const [isLoading, setIsLoading] = useState(false);
     const [formData, setFormData] = useState<LoginData>({
          email: "",
          password: "",
     });

    



  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log("form", formData);

  const dispatch = useDispatch() as unknown as any;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(loginUser(formData));
    setIsLoading(true)

    setTimeout(() => {
     setIsLoading(false)
   }, 5000);

  };

 

  return (
    <>
      <>
        {/* <Link to="/Home" className="Home">
          
        </Link> */}
      </>
      <div className={log.main1}>
        <div className={log.left_side}>
          <div className="slide">
            <img src={logo} alt="SignUp" />
            <div className={log.left_text}>
              <h3>
                Plutus is personal <br /> finance, made simple.
              </h3>
              <p>
                All your account, cards, savings, and investments in <br /> one
                place{" "}
              </p>
            </div>
          </div>
        </div>

        <div className={log.right_side}>
          <div className={log.logo}>
               <Link to="/">
               <h1 className={log.logo_one}>Plutus</h1>
               <p className={log.logo_two}>Online Banking </p>
               </Link>
          </div>

          <form action="" onSubmit={handleSubmit} className={log.right_form}>
            <div className="heading">
              <h2>Login</h2>
            </div>

            <div className={log.mb}>
              <label className={log.form1}>Email</label>
              <br></br>
              <input
                type="text"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" Email"
              />
            </div>

            <div className={log.mb}>
              <label className={log.form3}>Password</label>
              <br></br>
              <input
                className={log.form4}
                name="password"
                type="password"
                placeholder="***********"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            
         
            <button
              type="submit"
              disabled={isLoading}
              className={log.loginButton}
            >
              {isLoading ? <LoadingSpinner /> :"Login"}
            </button>
            

            {error && <div>{error}</div>}

            <Link to="/changePassword">
            <p className={log.text8} >Forgot your password?</p>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

//this below with the dispatch variable means i want to input some data into some reducer or slice
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const payload = {
//     accountnumber,
//     password,
//   };
//   //the set... will be used to update the variable name.
// const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     //this prevents the site from reloading
//     e.preventDefault();

//     const user_login = axios.post("", payload);
//     console.log(user_login);

//     if (user_login.statusCode === 200) {
//       dispatch(
//         login({
//           accountnumber: accountnumber,
//           password: password,
//           loggedIn: true,
//         })
//       );
//       navigate("/");
//     }
//   };
