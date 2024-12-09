import { useState } from 'react';
import { useRegister } from '../lib/hooks/useRegister';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Custom hook to handle registration logic
  const { error, handleRegister } = useRegister(username, email, password);

  return (
    <div>
      <h2>Register</h2>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />

      <button onClick={() => handleRegister()}>Register</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Register;
