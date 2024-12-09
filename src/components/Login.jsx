import { useState } from 'react';
import { useLogin } from '../lib/hooks/useLogin';
import { BiShow , BiSolidHide } from "react-icons/bi";
import Loading from './Loading';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // custom hooks
  const { error, handleLogin } = useLogin(username, password);

  const handleSignIn = async () => {
    setLoading(true);
    try {
        await handleLogin();
    } finally {
        setLoading(false)
    }
  }

  return (
    <div className='bg-secondary h-screen flex justify-center items-center p-5 '>
       
        <div className='text-2xl absolute z-20'>
            {
                loading ? (
                    <Loading  className = "absolute" />
                ) : ''
            }
        </div>
        <div className = {` bg-light w-[400px] md:w-[500px] h-[600px] rounded-xl p-5 flex flex-col justify-center items-center gap-3 ${loading ? 'blur-sm' : ''}  `}>
            <div className="flex flex-col justify-center items-center">
                <span className="text-primary text-3xl">
                    <i className="fa-solid fa-mosque "></i>
                </span>
                <h3 className="text-center text-[22px] sm:text-2xl font-semibold gap-1 pb-3 text-secondary">
                    ഇംദാദുൽ ഇസ്ലാം <br />
                    <span className="text-[18px] sm:text-[20px] leading-7 sm:leading-9 block">
                    പടിക്കൽ മഹല്ല് ജമാഅത്ത് കമ്മിറ്റി
                    </span>
                </h3>
                <h2 className="text-3xl sm:text-5xl font-bold text-primary">Admin Login</h2>
            </div>

        <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Admin username"
            className='w-[280px] border border-primary rounded-md text-[17px] sm:text-[20px] p-2 bg-dark placeholder-primary font-semibold'
            required
        />
        <div className='relative'>
          <input
                type={showPassword ? "text" : "password"} // Toggle between 'text' and 'password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className='w-[280px] border border-primary rounded-md text-[17px] sm:text-[20px] p-2 bg-dark placeholder-primary font-semibold'
                required
            />
            <button
                type="button"
                className="absolute z-10 right-2 top-3 text-primary text-[23px] font-medium"
                onClick={() => setShowPassword(!showPassword)} // Toggle state
            >
                {showPassword ? <BiSolidHide /> : <BiShow /> } {/* Text changes based on state */}
            </button>
        </div>
        
        <button onClick={handleSignIn} 
            className='bg-primary px-3 py-1 sm:py-2 w-[120px] text-[20px] sm:text-2xl rounded-md text-center text-light font-semibold hover:scale-105 transition-transform duration-200 ease-in'>
            Sign in</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
