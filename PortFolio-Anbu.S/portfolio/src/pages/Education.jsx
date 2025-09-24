import { useEffect, useState } from 'react';
import API from '../Api/api';
import '../styles/education.css'; // ✅ Add css file

function Education() {
	const [educations, setEducations] = useState([]);

	useEffect(() => {
		fetchEducations();
	}, []);

	const fetchEducations = async () => {
		try {
			const res = await API.get('/admin/education');
			setEducations(res.data);
		} catch (err) {
			console.error('Error fetching education', err);
		}
	};

	return (
		<div className='education-section container mt-5'>
			<h2 className='section-title mb-4 text-center'>Education</h2>

			{educations.length === 0 ? (
				<p className='text-center'>No education records found.</p>
			) : (
				<div className='education-grid'>
					{educations.map((edu) => (
						<div
							key={edu.id}
							className='education-card shadow-sm'
						>
							{/* Institution Image */}
							{edu.institutionImageUrl && (
								<div className='edu-img-container'>
									<img
										src={edu.institutionImageUrl}
										alt={edu.institutionName}
										className='edu-img'
									/>
								</div>
							)}

							{/* Card Body */}
							<div className='edu-body'>
								<h5 className='edu-title'>{edu.institutionName}</h5>
								<h6 className='edu-years'>
									{edu.startYear} - {edu.endYear || 'Present'}
								</h6>
								<span className='edu-badge'>{edu.type}</span>
								<p className='edu-desc'>{edu.description}</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default Education;
