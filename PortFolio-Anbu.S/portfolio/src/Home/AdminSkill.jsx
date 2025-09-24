import { useEffect, useState } from 'react';
import API from '../Api/api';
import '../styles/AdminSkill.css';

function AdminSkill() {
	const [skills, setSkills] = useState([]);
	const [formData, setFormData] = useState({
		id: null,
		iconUrl: '',
		title: '',
		percentage: '',
		category: 'skills', // default
		certificationLink: '',
	});

	useEffect(() => {
		fetchSkills();
	}, []);

	const fetchSkills = async () => {
		try {
			const res = await API.get('/admin/skills');
			setSkills(res.data);
		} catch (err) {
			alert('Error fetching skills');
		}
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (formData.id) {
				await API.put(`/admin/skills/${formData.id}`, formData);
				alert('Skill updated successfully');
			} else {
				await API.post('/admin/skills', formData);
				alert('Skill created successfully');
			}
			setFormData({
				id: null,
				iconUrl: '',
				title: '',
				percentage: '',
				category: 'skills',
				certificationLink: '',
			});
			fetchSkills();
		} catch (err) {
			alert('Error saving skill');
		}
	};

	const handleEdit = (skill) => {
		setFormData(skill);
	};

	const handleDelete = async (id) => {
		if (!window.confirm('Are you sure you want to delete this skill?')) return;
		try {
			await API.delete(`/admin/skills/${id}`);
			alert('Skill deleted successfully');
			fetchSkills();
		} catch (err) {
			alert('Error deleting skill');
		}
	};

	return (
		<div className='admin-skill-container'>
			<h3>Manage Skills</h3>

			{/* Skill Form */}
			<form
				onSubmit={handleSubmit}
				className='admin-skill-form'
			>
				<div className='form-group'>
					<label className='form-label'>Icon URL</label>
					<input
						type='text'
						className='form-control'
						name='iconUrl'
						value={formData.iconUrl}
						onChange={handleChange}
						placeholder='https://...'
					/>
				</div>

				<div className='form-group'>
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

				{/* Only show percentage if category = skills */}
				{formData.category === 'skills' && (
					<div className='form-group'>
						<label className='form-label'>Percentage</label>
						<input
							type='number'
							className='form-control'
							name='percentage'
							value={formData.percentage}
							onChange={handleChange}
							min='0'
							max='100'
						/>
					</div>
				)}

				<div className='form-group'>
					<label className='form-label'>Category</label>
					<select
						className='form-select'
						name='category'
						value={formData.category}
						onChange={handleChange}
					>
						<option value='skills'>Skill</option>
						<option value='certifications'>Certification</option>
					</select>
				</div>

				{/* Only show certification link if category = certifications */}
				{formData.category === 'certifications' && (
					<div className='form-group'>
						<label className='form-label'>Certification Link</label>
						<input
							type='text'
							className='form-control'
							name='certificationLink'
							value={formData.certificationLink}
							onChange={handleChange}
							placeholder='https://...'
						/>
					</div>
				)}

				<button
					type='submit'
					className='btn-submit'
				>
					{formData.id ? 'Update Skill' : 'Create Skill'}
				</button>
			</form>

			{/* Skill List */}
			<ul className='skill-list'>
				{skills.map((s) => (
					<li
						key={s.id}
						className='skill-item'
					>
						<div className='skill-info'>
							{s.iconUrl && (
								<img
									src={s.iconUrl}
									alt='icon'
									className='skill-icon'
								/>
							)}
							<strong>{s.title}</strong>{' '}
							{s.category === 'skills' && <span>— {s.percentage}%</span>}
							{s.category === 'certifications' && s.certificationLink && (
								<a
									href={s.certificationLink}
									target='_blank'
									rel='noreferrer'
									className='cert-link'
								>
									[View Certification]
								</a>
							)}
						</div>
						<div className='skill-actions'>
							<button
								className='btn-edit'
								onClick={() => handleEdit(s)}
							>
								Edit
							</button>
							<button
								className='btn-delete'
								onClick={() => handleDelete(s.id)}
							>
								Delete
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default AdminSkill;
