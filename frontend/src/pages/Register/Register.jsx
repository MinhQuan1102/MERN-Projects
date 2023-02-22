import React from "react";
import "./register.css";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";
import CustomInput from "../../components/CustomInput/CustomInput";
const Register = () => {
  return (
    <>
      <BreadCrumb title="Register" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">

              <h3 className="text-center mb-3">Register</h3>
              <form action="" className="d-flex flex-column gap-15">
                <CustomInput type="text" name="name" placeholder="Name" />
                <CustomInput type="email" name="email" placeholder="Email" />
                <CustomInput type="tel" name="mobile" placeholder="Mobile Number"/>
                <CustomInput type="password"name="password" placeholder="Password"/>
                <CustomInput type="password"name="confirmPassword" placeholder="Confirm Password"/>
                
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0">Register</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Register;
