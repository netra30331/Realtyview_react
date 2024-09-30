import React from 'react'
import Logo from '@/assets/images/logo_black.svg'
import Typography from '@/components/baseComponents/Typography'
import TextField from '@/components/baseComponents/TextField'
import { Button } from '@/components/baseComponents/Button'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/redux/hooks'
import { signIn } from '@/redux/user/userSlice'
import { LogInDto } from '@/shared/interfaces/interfaces'
import { notify } from '@/shared/services/notify'
import { AUTH } from "@/shared/config/constants";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const goSignup = () => {
    navigate("/auth/register");
  };
  const goFogotPassword = () => {
    navigate("/auth/forgot-password");
  };

  const logIn = () => {
    if (email !== "" && password !== "") {
      let data: LogInDto = {
        email: email.toLocaleLowerCase(),
        password: password,
      };
      dispatch(signIn(data)).then((res) => {
        try {
          console.log(res.payload);
          if (res.payload.success) {
            if (res.payload.user.userType === AUTH.ADMIN) navigate("/admin");
            else navigate("/app");
          }
          notify(res.payload.success, res.payload.message);
        } catch (e) {
          console.log(e);
          notify(false, "Something went wrong");
        }
      });
    }
  };
  return (
    <div className="flex items-center justify-center w-full bg-[#F8FAFC] p-16 min-h-screen">
      <div className="w-full">
        <div className="flex items-center justify-center scale-75 mb-16">
          <img src={Logo} alt="logo" />
        </div>
        <div className="flex justify-center">
          <div className="rounded-lg bg-white p-10 pt-5 max-w-[448px] w-full">
            <Typography variant="h1" className="text-center">
              Sign In
            </Typography>
            <Typography
              variant="h4"
              className="text-button-primary hover:text-button-primary-hover cursor-pointer mt-[10px] text-center mb-[20px]"
              onClick={() => goSignup()}
            >
              Don't have an account? Sign up.
            </Typography>
            <Typography variant="caption" className="text-secondary mb-[9px]">
              Email Address
            </Typography>
            <TextField
              className="w-full mb-[25px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Typography variant="caption" className="text-secondary mb-[9px]">
              Password
            </Typography>
            <TextField
              className="w-full"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Typography
              variant="caption"
              className="text-secondary mb-[9px] text-[10px] cursor-pointer hover:text-primary"
              onClick={() => goFogotPassword()}
            >
              Forgot your password?
            </Typography>
            <Button
              className="w-full text-15 mt-[40px]"
              onClick={() => logIn()}
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login