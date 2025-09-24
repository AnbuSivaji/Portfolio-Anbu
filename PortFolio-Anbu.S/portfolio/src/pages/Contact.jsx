import { useState } from 'react';
import API from '../Api/api';
import '../styles/contact.css'; // ✅ include css

function Contact() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});

	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await API.post('/contact', formData);
			alert('✅ Message sent successfully!');
			setFormData({ name: '', email: '', message: '' });
		} catch (err) {
			alert('❌ Failed to send message. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='contact-section container mt-5'>
			<h2 className='contact-title'>Contact Me</h2>
			<p className='contact-info'>📧 Email: anbusoft57@gmail.com</p>
			<p className='contact-info'>📞 Phone: +91 88389 93458</p>

			<form
				onSubmit={handleSubmit}
				className='contact-form'
			>
				<div className='form-group'>
					<label>Your Name</label>
					<input
						type='text'
						name='name'
						value={formData.name}
						onChange={handleChange}
						required
						placeholder='Enter your name'
					/>
				</div>

				<div className='form-group'>
					<label>Your Email</label>
					<input
						type='email'
						name='email'
						value={formData.email}
						onChange={handleChange}
						required
						placeholder='Enter your email'
					/>
				</div>

				<div className='form-group'>
					<label>Your Message</label>
					<textarea
						name='message'
						rows='4'
						value={formData.message}
						onChange={handleChange}
						required
						placeholder='Type your message here...'
					></textarea>
				</div>

				<button
					type='submit'
					className='btn-submit'
					disabled={loading}
				>
					{loading ? 'Sending...' : 'Send Message'}
				</button>
			</form>
		</div>
	);
}

export default Contact;
