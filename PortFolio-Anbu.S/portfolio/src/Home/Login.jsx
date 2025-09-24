import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../Api/api';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import '../styles/Login.css'; // Ensure you use the CSS from previous answer!

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showDragon, setShowDragon] = useState(false);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const res = await API.post('/admin/login', { email, password });
			localStorage.setItem('token', res.data.token);

			// Show SweetAlert & Dragon animation
			Swal.fire({
				icon: 'success',
				title: 'Login Successful!',
				text: 'Welcome back Admin 🚀',
				showConfirmButton: false,
				timer: 2000,
			});

			setShowDragon(true);

			setTimeout(() => {
				setShowDragon(false);
				navigate('/admin/dashboard');
			}, 2000);
		} catch (err) {
			Swal.fire({
				icon: 'error',
				title: 'Login Failed',
				text: err.response?.data?.message || 'Invalid email or password',
				confirmButtonColor: '#d33',
			});
		}
	};

	return (
		<div className='login-page'>
			{/* Dragon Animation */}
			<div className={`dragon-fire${showDragon ? ' show-fire' : ''}`}>
				<img
					src='/dragon.png'
					alt='Dragon'
					style={{ width: '120px' }}
				/>
				{showDragon && <div className='fire-breath'></div>}
				{showDragon && (
					<div className='fire-welcome'>Welcome Back Admin 🚀</div>
				)}
			</div>

			<div className='login-card'>
				<h3 className='login-title'>🔐 Admin Login</h3>
				<form onSubmit={handleLogin}>
					{/* Email */}
					<div className='input-group'>
						<label>
							<FaEnvelope className='icon' /> Email
						</label>
						<input
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					{/* Password with toggle */}
					<div className='input-group'>
						<label>
							<FaLock className='icon' /> Password
						</label>
						<div className='password-wrapper'>
							<input
								type={showPassword ? 'text' : 'password'}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							<span
								className='toggle-password'
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <FaEyeSlash /> : <FaEye />}
							</span>
						</div>
					</div>

					{/* Button */}
					<button
						type='submit'
						className='login-btn'
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
