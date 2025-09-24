import { useEffect, useState } from 'react';
import API from '../Api/api';
import '../styles/AdminExperience.css';

function AdminExperience() {
	const [experiences, setExperiences] = useState([]);
	const [formData, setFormData] = useState({
		id: null,
		companyName: '',
		role: '',
		startDate: '',
		endDate: '',
		description: '',
		companyImageUrl: '',
		certificateUrl: '',
	});

	useEffect(() => {
		fetchExperiences();
	}, []);

	const fetchExperiences = async () => {
		try {
			const res = await API.get('/admin/experience');
			setExperiences(res.data);
		} catch (err) {
			alert('Error fetching experiences');
		}
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (formData.id) {
				await API.put(`/admin/experience/${formData.id}`, formData);
				alert('Experience updated successfully');
			} else {
				await API.post('/admin/experience', formData);
				alert('Experience created successfully');
			}
			setFormData({
				id: null,
				companyName: '',
				role: '',
				startDate: '',
				endDate: '',
				description: '',
				companyImageUrl: '',
				certificateUrl: '',
			});
			fetchExperiences();
		} catch (err) {
			alert('Error saving experience');
		}
	};

	const handleEdit = (exp) => {
		setFormData(exp);
	};

	const handleDelete = async (id) => {
		if (!window.confirm('Are you sure you want to delete this experience?'))
			return;
		try {
			await API.delete(`/admin/experience/${id}`);
			alert('Experience deleted successfully');
			fetchExperiences();
		} catch (err) {
			alert('Error deleting experience');
		}
	};

	return (
		<div className='admin-experience-container'>
			<h3>Manage Experiences</h3>

			{/* Experience Form */}
			<form
				onSubmit={handleSubmit}
				className='mb-4'
			>
				<div className='mb-3'>
					<label className='form-label'>Company Name</label>
					<input
						type='text'
						className='form-control'
						name='companyName'
						value={formData.companyName}
						onChange={handleChange}
						required
					/>
				</div>

				<div className='mb-3'>
					<label className='form-label'>Role</label>
					<input
						type='text'
						className='form-control'
						name='role'
						value={formData.role}
						onChange={handleChange}
						required
					/>
				</div>

				<div className='row'>
					<div className='col-md-6 mb-3'>
						<label className='form-label'>Start Date (YYYY-MM)</label>
						<input
							type='month'
							className='form-control'
							name='startDate'
							value={formData.startDate}
							onChange={handleChange}
							required
						/>
					</div>
					<div className='col-md-6 mb-3'>
						<label className='form-label'>End Date (YYYY-MM)</label>
						<input
							type='month'
							className='form-control'
							name='endDate'
							value={formData.endDate}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className='mb-3'>
					<label className='form-label'>Description</label>
					<textarea
						className='form-control'
						name='description'
						value={formData.description}
						onChange={handleChange}
						rows='3'
						required
					/>
				</div>

				<div className='mb-3'>
					<label className='form-label'>Company Logo URL</label>
					<input
						type='text'
						className='form-control'
						name='companyImageUrl'
						value={formData.companyImageUrl}
						onChange={handleChange}
						placeholder='https://...'
					/>
				</div>

				<div className='mb-3'>
					<label className='form-label'>Certificate URL</label>
					<input
						type='text'
						className='form-control'
						name='certificateUrl'
						value={formData.certificateUrl}
						onChange={handleChange}
						placeholder='https://...'
					/>
				</div>

				<button
					type='submit'
					className='btn btn-primary w-100'
				>
					{formData.id ? 'Update Experience' : 'Create Experience'}
				</button>
			</form>

			{/* Experience List */}
			<div className='row'>
				{experiences.map((exp) => (
					<div
						key={exp.id}
						className='col-md-6 mb-3'
					>
						<div className='card shadow-sm p-3 h-100'>
							{exp.companyImageUrl && (
								<img
									src={exp.companyImageUrl}
									alt='company'
									className='card-img-top mb-2'
									style={{ maxHeight: '150px', objectFit: 'contain' }}
								/>
							)}
							<div className='card-body'>
								<h5>{exp.companyName}</h5>
								<h6 className='text-muted'>{exp.role}</h6>
								<p>
									{exp.startDate} → {exp.endDate || 'Present'}
								</p>
								<p>{exp.description}</p>
								{exp.certificateUrl && (
									<a
										href={exp.certificateUrl}
										target='_blank'
										rel='noreferrer'
										className='btn btn-sm btn-outline-success'
									>
										View Certificate
									</a>
								)}
								<div className='mt-3'>
									<button
										className='btn btn-sm btn-warning me-2'
										onClick={() => handleEdit(exp)}
									>
										Edit
									</button>
									<button
										className='btn btn-sm btn-danger'
										onClick={() => handleDelete(exp.id)}
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default AdminExperience;
