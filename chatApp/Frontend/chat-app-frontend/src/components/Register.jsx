import React, { useState } from 'react'
import { useRef } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import useRegister from '../CustomHooks/Register';
import useRegisterEmail from '../CustomHooks/RegisterEmail';
function Register() {
    const fullnamee = useRef();
    const usernamee = useRef();
    const passwordd = useRef();
    const emaill = useRef();
    const [file, setfile] = useState();
   const {Register}=useRegister();
   const{RegisterEmail}=useRegisterEmail();
   const handlelinkclick=async()=>{
    const email=emaill.current.value;
    emaill.current.value="";
      await RegisterEmail(email)
   }
    const Handlesubmit = async(event) => {

        event.preventDefault();
        //console.log("button clicked")
        const fullname = fullnamee.current.value;
        // fullnamee.current.value=""
        const username = usernamee.current.value;
        // usernamee.current.value=""
        const password = passwordd.current.value;
        // passwordd.current.value=""
        const email = emaill.current.value;
        // emaill.current.value=""
        
        const formdata = new FormData();

        formdata.append('profilepic', file);
        formdata.append('fullname', fullname);
        formdata.append('username', username);
        formdata.append('password', password);
        formdata.append('email', email);
        
       await Register(formdata)
    }

    return (
        <>
            <section className="vh-100" style={{ "backgroundColor": "#eee" }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ "borderRadius": "25px" }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                            <form className="mx-1 mx-md-4" >

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div data-mdb-input-init className="form-outline flex-fill mb-0 ">
                                                        <input type="text" id="form3Example1c" className="form-control" ref={emaill} /> 
                            
                                                        <label className="form-label" htmlFor="form3Example1c">Your Email </label>
                                                        <div>
                                                    <Link  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={handlelinkclick}>
                                                        Click to verify Email
                                                    </Link>
                                                    </div>
                                                    </div>
                                                    {/* <div data-mdb-input-init className="form-outline flex-fill mb-0 ">

                                                    </div> */}
                                                    
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                        <input type="text" id="form3Example1c" className="form-control" ref={fullnamee} />
                                                        <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                        <input type="email" id="form3Example3c" className="form-control" ref={usernamee} />
                                                        <label className="form-label" htmlFor="form3Example3c">Your Username</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                        <input type="password" id="form3Example4c" className="form-control" ref={passwordd} />
                                                        <label className="form-label" htmlFor="form3Example4c">Password</label>
                                                    </div>
                                                </div>


                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                        <input type="file" id="form3Example1c" className="form-control" onChange={e => setfile(e.target.files[0])} />
                                                        <label className="form-label" htmlFor="form3Example1c">Your Profile Pic</label>
                                                    </div>
                                                </div>

                                                <div className="form-check d-flex justify-content-center mb-5">
                                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                                    <label className="form-check-label" htmlFor="form2Example3">
                                                        I agree all statements in <a href="#!">Terms of service</a>
                                                    </label>
                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg" onClick={Handlesubmit}>Register</button>
                                                </div>
                                                <p className="mt-10 text-center text-sm text-gray-500">
                                                    Already Have a Account{' '}
                                                    <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" >
                                                        Log in
                                                    </Link>
                                                </p>

                                            </form>

                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                className="img-fluid" alt="Sample image" />

                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </section>

        </>
    )
}

export default Register