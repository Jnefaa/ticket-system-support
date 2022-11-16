import {
  registrationPending,
  registrationSuccess,
  registrationError,
} from "./userRegestrationSlice";

import { userRegistration } from "../../api/userApi";

export const newUserRegistration = (frmDt) => async (dispatch) => {
  try {
    dispatch(registrationPending());

    const result = await userRegistration(frmDt);
    result.status === "success"
      ? dispatch(registrationError(result.message))
      : dispatch(registrationSuccess(result.message))
       

    console.log(result);
  } catch (error) {
    dispatch(registrationError(error.message));
  }
};
