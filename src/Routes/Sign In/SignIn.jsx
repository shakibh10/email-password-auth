import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth/web-extension";
import { Link } from "react-router-dom";
import auth from "../../init.config";
import { useRef, useState } from "react";
import { FaEye,FaEyeSlash } from "react-icons/fa";

const SignIn = () => {


    // 3rd step 

    const[loginError,setLoginError]=useState('');
    const[loginSuccess,setLoginSuccess]=useState('');
    const[showpass,setShowpass]=useState(false);
    const emailRef=useRef(null)


    // fist step : create onsubmit handle function in form 
    const handleSignIn=e=>{
        e.preventDefault();
        const email=e.target.email.value;
        const password=e.target.password.value;

        console.log(email,password);


        if(password.lenght < 6){
            console.log('Your password should have at least 6 characters');
        }else if(!/[A-Z]/.test(password)){
            console.log('Your password should have at least one uppercase character');
        }


        // reset error and success
        setLoginError('');
        setLoginSuccess('');


        // second step 

        signInWithEmailAndPassword(auth,email,password)
        .then((result)=>{
                console.log(result.user);
                setLoginSuccess('User login successfuly');
           
        })
        .catch(error=>{
            console.log(error);
            setLoginError(error.message);
        })
    }


    const handleForgetPassword=()=>{

        const email=emailRef.current.value;

        if(!email){
            console.log('Please provide your email',emailRef.current.value);
            return;

        }else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            console.log('Please provide a valid email');
            return;
        }





        // email validation 
        
        sendPasswordResetEmail(auth,email)
        .then(()=>{
            alert('Please check your email');
        })
        .catch(error=>{
            console.log(error);
        })
    }



    return (
        <div>
            <div className="hero bg-purple-500 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">
        Login now to see the miracle 
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

      <form onSubmit={handleSignIn} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>

          <div className="relative flex items-center">
          <input 
          type={showpass?"text":"password"}
          ref={emailRef}
          name="password"
          placeholder="password" 
          className="input input-bordered w-full" 
          required />

          <span className="absolute right-2" onClick={()=>setShowpass(!showpass)}>
            {
                showpass?<FaEyeSlash></FaEyeSlash>:<FaEye></FaEye>
            }

          </span>
          </div>

          <label className="label">
            <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>

      {
        loginError && <p className="text-red-600">{loginError}</p>
      }

      {
        loginSuccess && <p className="text-green-600">{loginSuccess}</p>
      }

      <p>Have not sign up yet? Please <Link to="/signup">Sign Up</Link></p>
    </div>
  </div>
</div>
        </div>
    );
};

export default SignIn;