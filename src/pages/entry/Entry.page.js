import React, { useState } from "react";

import { Jumbotron ,Col} from "react-bootstrap";
import { LoginForm } from "../../components/login/Login.comp";
import { ResetPassword } from "../../components/password-reset/PasswordReset.comp";
import RegistrationForm from "../../components/registration-form/RegistrationForm.comp";
import "./entry.style.css";

//Workflow

// [] Create password reset page
// [] Add request OTP form
// [] Add redux store with Redux-toolkit to handle the network status
// [] sent OTP to email from API (API Already created)
// [] Load form to input OTP and new password
// [] New password must match confirm password, form validation
// [] Connect to API Endpoint (API Already created)
// [] Add reducer through Redux-toolkit to handle the network status and provide the feedback to the user
// [] Send email, OTP and new password to update the password.

export const Entry = () => {
	const [frmLoad, setFrmLoad] = useState("login");
	const handleOnResetSubmit = e => {
		e.preventDefault();
	};

	const formSwitcher = frmType => {
		setFrmLoad(frmType);
		
	};

/*	const formwSW = frmtype => {
		setFrmload(frmtype);
		
	}; */


	return (
		<div className="entry-page bg-info">
			<Jumbotron className="form-box">
				{frmLoad === "login" && <LoginForm formSwitcher={formSwitcher} />}

				{frmLoad === "reset" && (
					<ResetPassword
						// handleOnChange={handleOnChange}
						handleOnResetSubmit={handleOnResetSubmit}
						formSwitcher={formSwitcher}
						// email={email}
					/>
				)}
					{frmLoad ==="registration" && (
					<RegistrationForm
					  handleOnResetSubmit={handleOnResetSubmit}
					  formSwitcher ={formSwitcher}
					 />

					

                 )}
		

		
			</Jumbotron>
			
			
		
        
      
		</div>
	);
};
