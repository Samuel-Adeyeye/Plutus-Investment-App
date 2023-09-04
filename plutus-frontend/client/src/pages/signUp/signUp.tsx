/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, FormEvent } from "react";
import logo from "../../assets/logo.png";
import "./signup.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/action";
import LoadingSpinner from "../../components/spinner";

interface SignupComponent {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const [formData, setFormData] = useState<SignupComponent>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [cPassword, setCPassword] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log(formData);

  const dispatch = useDispatch() as unknown as any;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== cPassword) {
      toast.error("Passwords don't match");
    } else {
      dispatch(registerUser(formData))
      setIsLoading(true)

      setTimeout(() => {
     setIsLoading(false)
   }, 5000);
    }
  };

  return (
    <div className="container">
      <div className="left-side">
        <div className="slide">
          <img src={logo} alt="SignUp" />
          <div className="left-text">
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

      <div className="right_side">
        <div className="logo">
        <Link to="/">
          <h3 className="logo_one">Plutus</h3>
          <p className="logo_two">Online Banking </p>
          </Link>
        </div>
          
          <form action="" onSubmit={handleSubmit} className="right-form">
            <div className="heading">
              <h2>Sign Up</h2>
              <p>Sign up and enjoy the services</p>
            </div>
            <input
              type="text"
              name={"firstName"}
              required
              value={formData.firstName}
              onChange={handleChange}
              placeholder=" FirstName"
            />
            <input
              type="text"
              name={"lastName"}
              required
              value={formData.lastName}
              onChange={handleChange}
              placeholder=" LastName"
            />
            <input
              type="email"
              name={"email"}
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              type="password"
              name={"password"}
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <input
              type="password"
              name={"cPassword"}
              required
              placeholder="Confirm Password"
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
          
               <button type="submit" disabled={isLoading} className= {isLoading ? "disable btnn bg-black" : "btnn bg-black"} >
               {isLoading ? <LoadingSpinner /> :"Register"}
               </button>
           
            <div className="register">
            <p className="already">Already have an account?</p>
            <Link to="/login" className="alreadyLogin">
              Login
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
};

export default SignUp;
