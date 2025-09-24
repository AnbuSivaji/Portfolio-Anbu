import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../Api/api';
import '../styles/Signup.css';

function Signup() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSignup = async (e) => {
		e.preventDefault();
		try {
			await API.post('/admin/signup', { name, email, password });
			alert('Signup successful! Please login.');
			navigate('/admin/login');
		} catch (err) {
			alert(err.response?.data?.message || 'Signup failed');
		}
	};

	return (
		<div className='signup-page'>
			<div className='signup-card'>
				<h3 className='signup-title'>📝 Admin Signup</h3>
				<form onSubmit={handleSignup}>
					<div className='input-group'>
						<label>Name</label>
						<input
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>

					<div className='input-group'>
						<label>Email</label>
						<input
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					<div className='input-group'>
						<label>Password</label>
						<input
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					<button
						type='submit'
						className='signup-btn'
					>
						Signup
					</button>
				</form>
			</div>
		</div>
	);
}

export default Signup;
