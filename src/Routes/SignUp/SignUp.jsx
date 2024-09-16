import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Link } from "react-router-dom";
import auth from "../../init.config";
import { useState } from "react";
import { FaEye,FaEyeSlash } from "react-icons/fa";

const SignUp = () => {


    // 3rd step 
    const[signUpError,setSignUpError]=useState('');

    // 5th step 

    const[success,setSuccess]=useState('');


    // 8th step showing the password or not 
    const[showpassword,setShowpassword]=useState(false);



    // First step 

    const handleSignInForm=e=>{
        e.preventDefault();

        const email=e.target.email.value;
        const password=e.target.password.value;
        const accepted=e.target.terms.checked;
        console.log(email,password,accepted);

        if(password.lenght < 6){
            setSignUpError('Your password should be at 6 characters long');
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setSignUpError('Your password should have at least one uppercase character');
            return;
        }
        else if(!accepted){
            setSignUpError('Please accept our terms and conditons ');
            return;
        }



        // 7th step reset setSignUpError and setSuccess

        setSignUpError('');
        setSuccess('');



        // Second step 
        createUserWithEmailAndPassword(auth, email, password)
        .then(result=>{
            console.log(result.user);
            if(result.user){
                setSuccess('User created successfuly');
            }else {
                alert('Please verify your email address');
            }


            // xsend email verification

            sendEmailVerification(result.user)
            .then(()=>{
              alert('Please check your email and verify your password');
            })


        })
        .catch(error=>{
            console.error(error);
            setSignUpError(error.message);
        })

    }

    




    return (
        <div>
            <div className="hero bg-green-400 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Sign Up</h1>
      <p className="py-6">
        Sign up Once and enjoy all time
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

      <form onSubmit={handleSignInForm} className="card-body">
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
             type={ showpassword?"text" : "password"}
             name="password"
             placeholder="password"
             className="input input-bordered w-full"
             required />

             <span className=" absolute  right-2" onClick={()=>setShowpassword(!showpassword)}>
                {
                    showpassword?<FaEyeSlash></FaEyeSlash>:<FaEye></FaEye>
                }
             </span>
          </div>


          <div className="mt-4">
          <input type="checkbox" name="terms" id="terms" />
          <label htmlFor="terms"> Accept Our <a href="">Terms and Conditons</a></label>
          </div>

        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </form>

      {
        // 4th step 
        
            signUpError && <p className="text-red-600">{signUpError}</p>
          
      }

      {
        // 6th step
            success && <p className="text-green-600">{success }</p>
      }

      <p>Already signed up <Link to="/signin">Sign In</Link></p>
    </div>
  </div>
</div>
        </div>
    );
};

export default SignUp;