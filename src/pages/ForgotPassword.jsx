import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ForgotPasswordFindPassword from '../components/ForgotPasswordFindPassword';
import ForgotPasswordResetPassword from '../components/ForgotPasswordResetPassword';
import ForgotPasswordValidateCode from '../components/ForgotPasswordValidateCode';

const FIND_PASSWORD = 0;
const VALIDATE_CODE = 1;
const RESET_PASSWORD = 2;

const ForgotPassword = () => {
  const [page, setPage] = useState(FIND_PASSWORD);

  const navigate = useNavigate()

  const returnLogin = () => {
    navigate('/signin')
  }

  const getPage = (page) => {
    switch (page) {
      case FIND_PASSWORD:
        return <ForgotPasswordFindPassword setPage={setPage} returnLogin={returnLogin} />
      case VALIDATE_CODE:
        return <ForgotPasswordValidateCode setPage={setPage} returnLogin={returnLogin} />
      case RESET_PASSWORD:
        return <ForgotPasswordResetPassword returnLogin={returnLogin} />
      default:
        break;
    }
  }

  return (
    <div className='-mt-28 py-4 min-h-screen bg-gray-auth text-13 font-semibold flex items-center justify-center h-screen'>
      {getPage(page)}
    </div>
  )
}

export default ForgotPassword