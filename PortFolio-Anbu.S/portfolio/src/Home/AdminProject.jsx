import { useEffect, useState } from 'react';
import API from '../Api/api';
import '../styles/AdminProject.css';

function AdminProject() {
	const [projects, setProjects] = useState([]);
	const [formData, setFormData] = useState({
		id: null,
		title: '',
		description: '',
		link: '',
		imageUrl: '',
	});

	useEffect(() => {
		fetchProjects();
	}, []);

	const fetchProjects = async () => {
		try {
			const res = await API.get('/admin/project');
			setProjects(res.data);
		} catch (err) {
			alert('Error fetching projects');
		}
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (formData.id) {
				await API.put(`/admin/project/${formData.id}`, formData);
				alert('Project updated successfully');
			} else {
				await API.post('/admin/project', formData);
				alert('Project created successfully');
			}
			setFormData({
				id: null,
				title: '',
				description: '',
				link: '',
				imageUrl: '',
			});
			fetchProjects();
		} catch (err) {
			alert('Error saving project');
		}
	};

	const handleEdit = (project) => {
		setFormData(project);
	};

	const handleDelete = async (id) => {
		if (!window.confirm('Are you sure you want to delete this project?'))
			return;
		try {
			await API.delete(`/admin/project/${id}`);
			alert('Project deleted successfully');
			fetchProjects();
		} catch (err) {
			alert('Error deleting project');
		}
	};

	return (
		<div className='admin-project-container'>
			<h3>Manage Projects</h3>

			{/* Project Form */}
			<form
				onSubmit={handleSubmit}
				className='mb-4'
			>
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
					<label className='form-label'>Project Link</label>
					<input
						type='text'
						className='form-control'
						name='link'
						value={formData.link}
						onChange={handleChange}
						placeholder='https://...'
					/>
				</div>

				<div className='mb-3'>
					<label className='form-label'>Image URL</label>
					<input
						type='text'
						className='form-control'
						name='imageUrl'
						value={formData.imageUrl}
						onChange={handleChange}
						placeholder='https://...'
					/>
				</div>

				<button
					type='submit'
					className='btn btn-primary w-100'
				>
					{formData.id ? 'Update Project' : 'Create Project'}
				</button>
			</form>

			{/* Project List */}
			<div className='row'>
				{projects.map((p) => (
					<div
						key={p.id}
						className='col-md-6 mb-3'
					>
						<div className='card shadow-sm p-3'>
							{p.imageUrl && (
								<img
									src={p.imageUrl}
									alt='project'
									className='card-img-top mb-2'
									style={{ maxHeight: '200px', objectFit: 'cover' }}
								/>
							)}
							<div className='card-body'>
								<h5>{p.title}</h5>
								<p>{p.description}</p>
								{p.link && (
									<a
										href={p.link}
										target='_blank'
										rel='noreferrer'
										className='btn btn-sm btn-outline-primary'
									>
										View Project
									</a>
								)}
								<div className='mt-3'>
									<button
										className='btn btn-sm btn-warning me-2'
										onClick={() => handleEdit(p)}
									>
										Edit
									</button>
									<button
										className='btn btn-sm btn-danger'
										onClick={() => handleDelete(p.id)}
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

export default AdminProject;
