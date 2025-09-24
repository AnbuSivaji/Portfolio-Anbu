import { useEffect, useState } from 'react';
import API from '../Api/api';
import '../styles/AdminEducation.css';

function AdminEducation() {
	const [educations, setEducations] = useState([]);
	const [formData, setFormData] = useState({
		id: null,
		institutionName: '',
		institutionImageUrl: '',
		startYear: '',
		endYear: '',
		description: '',
		type: '', // school or college
	});

	useEffect(() => {
		fetchEducations();
	}, []);

	const fetchEducations = async () => {
		try {
			const res = await API.get('/admin/education');
			setEducations(res.data);
		} catch (err) {
			alert('Error fetching educations');
		}
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (formData.id) {
				await API.put(`/admin/education/${formData.id}`, formData);
				alert('Education updated successfully');
			} else {
				await API.post('/admin/education', formData);
				alert('Education created successfully');
			}
			resetForm();
			fetchEducations();
		} catch (err) {
			alert('Error saving education');
		}
	};

	const handleEdit = (edu) => {
		setFormData(edu);
	};

	const handleDelete = async (id) => {
		if (!window.confirm('Are you sure you want to delete this education?'))
			return;
		try {
			await API.delete(`/admin/education/${id}`);
			alert('Education deleted successfully');
			fetchEducations();
		} catch (err) {
			alert('Error deleting education');
		}
	};

	const resetForm = () => {
		setFormData({
			id: null,
			institutionName: '',
			institutionImageUrl: '',
			startYear: '',
			endYear: '',
			description: '',
			type: '',
		});
	};

	return (
		<div className='admin-education-container'>
			<h3>Manage Education</h3>

			{/* Education Form */}
			<form
				onSubmit={handleSubmit}
				className='mb-4'
			>
				<div className='mb-3'>
					<label className='form-label'>Institution Name</label>
					<input
						type='text'
						className='form-control'
						name='institutionName'
						value={formData.institutionName}
						onChange={handleChange}
						required
					/>
				</div>

				<div className='mb-3'>
					<label className='form-label'>Institution Logo URL</label>
					<input
						type='text'
						className='form-control'
						name='institutionImageUrl'
						value={formData.institutionImageUrl}
						onChange={handleChange}
						placeholder='https://...'
					/>
				</div>

				<div className='row'>
					<div className='col-md-6 mb-3'>
						<label className='form-label'>Start Year</label>
						<input
							type='number'
							className='form-control'
							name='startYear'
							value={formData.startYear}
							onChange={handleChange}
							required
						/>
					</div>
					<div className='col-md-6 mb-3'>
						<label className='form-label'>End Year</label>
						<input
							type='number'
							className='form-control'
							name='endYear'
							value={formData.endYear}
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
					<label className='form-label'>Type</label>
					<select
						className='form-select'
						name='type'
						value={formData.type}
						onChange={handleChange}
						required
					>
						<option value=''>Select Type</option>
						<option value='School'>School</option>
						<option value='College'>College</option>
					</select>
				</div>

				<button
					type='submit'
					className='btn btn-primary w-100'
				>
					{formData.id ? 'Update Education' : 'Create Education'}
				</button>
			</form>

			{/* Education List */}
			<div className='row'>
				{educations.map((edu) => (
					<div
						key={edu.id}
						className='col-md-6 mb-3'
					>
						<div className='card shadow-sm p-3 h-100'>
							{edu.institutionImageUrl && (
								<img
									src={edu.institutionImageUrl}
									alt={edu.institutionName}
									className='card-img-top mb-2'
									style={{ maxHeight: '150px', objectFit: 'contain' }}
								/>
							)}
							<div className='card-body'>
								<h5>{edu.institutionName}</h5>
								<h6 className='text-muted'>
									{edu.startYear} → {edu.endYear || 'Present'}
								</h6>
								<p>{edu.description}</p>
								<span className='badge bg-info'>{edu.type}</span>
								<div className='mt-3'>
									<button
										className='btn btn-sm btn-warning me-2'
										onClick={() => handleEdit(edu)}
									>
										Edit
									</button>
									<button
										className='btn btn-sm btn-danger'
										onClick={() => handleDelete(edu.id)}
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

export default AdminEducation;
