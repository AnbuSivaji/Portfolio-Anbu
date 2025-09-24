import { useEffect, useState } from 'react';
import API from '../Api/api';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminProfile.css';

function AdminProfile() {
	const [profiles, setProfiles] = useState([]);
	const [formData, setFormData] = useState({
		id: null,
		imageUrl: '',
		aboutMe: '',
		title: '',
		bio: '',
		resumeUrl: '',
	});
	const navigate = useNavigate();

	useEffect(() => {
		fetchProfiles();
	}, []);

	const fetchProfiles = async () => {
		try {
			const res = await API.get('/admin/profiles');
			setProfiles(res.data);
		} catch (err) {
			if (err.response?.status === 401) {
				alert('Unauthorized, please login again');
				localStorage.removeItem('token');
				navigate('/admin/login');
			} else {
				alert('Error fetching profiles');
			}
		}
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (formData.id) {
				await API.put(`/admin/profiles/${formData.id}`, formData);
				alert('Profile updated successfully');
			} else {
				await API.post('/admin/profiles', formData);
				alert('Profile created successfully');
			}
			setFormData({
				id: null,
				imageUrl: '',
				aboutMe: '',
				title: '',
				bio: '',
				resumeUrl: '',
			});
			fetchProfiles();
		} catch (err) {
			alert('Error saving profile');
		}
	};

	const handleEdit = (profile) => {
		setFormData(profile);
	};

	const handleDelete = async (id) => {
		if (!window.confirm('Are you sure you want to delete this profile?'))
			return;
		try {
			await API.delete(`/admin/profiles/${id}`);
			alert('Profile deleted successfully');
			fetchProfiles();
		} catch (err) {
			alert('Error deleting profile');
		}
	};

	// 🔹 Set active profile
	const handleSetActive = (id) => {
		localStorage.setItem('activeProfileId', id);
		alert('Active profile set successfully!');
	};

	return (
		<div className='admin-profile-container'>
			<h2>Admin Profiles</h2>

			{/* Profile Form */}
			<form
				onSubmit={handleSubmit}
				className='mb-4'
			>
				<div className='mb-3'>
					<label className='form-label'>Image URL</label>
					<input
						type='text'
						className='form-control'
						name='imageUrl'
						value={formData.imageUrl}
						onChange={handleChange}
						required
					/>
				</div>

				<div className='mb-3'>
					<label className='form-label'>About Me</label>
					<textarea
						className='form-control'
						name='aboutMe'
						value={formData.aboutMe}
						onChange={handleChange}
						required
					/>
				</div>

				<div className='mb-3'>
					<label className='form-label'>Title</label>
					<input
						type='text'
						className='form-control'
						name='title'
						value={formData.title}
						onChange={handleChange}
						required
					/>
				</div>

				<div className='mb-3'>
					<label className='form-label'>Bio</label>
					<textarea
						className='form-control'
						name='bio'
						value={formData.bio}
						onChange={handleChange}
						required
					/>
				</div>

				<div className='mb-3'>
					<label className='form-label'>Resume URL</label>
					<input
						type='text'
						className='form-control'
						name='resumeUrl'
						value={formData.resumeUrl}
						onChange={handleChange}
						required
					/>
				</div>

				<button
					type='submit'
					className='btn btn-primary w-100'
				>
					{formData.id ? 'Update Profile' : 'Create Profile'}
				</button>
			</form>

			{/* Profile List */}
			<ul className='list-group'>
				{profiles.map((p) => (
					<li
						key={p.id}
						className='list-group-item d-flex justify-content-between align-items-center'
					>
						<div>
							<strong>{p.title}</strong> — {p.aboutMe}
							<br />
							<small>{p.bio}</small>
							<br />
							<a
								href={p.resumeUrl}
								target='_blank'
								rel='noreferrer'
							>
								Resume
							</a>
						</div>
						<div>
							<button
								className='btn btn-sm btn-warning me-2'
								onClick={() => handleEdit(p)}
							>
								Edit
							</button>
							<button
								className='btn btn-sm btn-danger me-2'
								onClick={() => handleDelete(p.id)}
							>
								Delete
							</button>
							<button
								className='btn btn-sm btn-success'
								onClick={() => handleSetActive(p.id)}
							>
								Set Active
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default AdminProfile;
