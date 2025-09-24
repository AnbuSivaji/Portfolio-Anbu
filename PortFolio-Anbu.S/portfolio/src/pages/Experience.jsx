import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import API from '../Api/api';
import '../styles/experience.css'; // ✅ scoped CSS

function Experience() {
	const [experiences, setExperiences] = useState([]);

	useEffect(() => {
		fetchExperiences();
	}, []);

	const fetchExperiences = async () => {
		try {
			const res = await API.get('/admin/experience');
			setExperiences(res.data);
		} catch (err) {
			console.error('Error fetching experiences', err);
		}
	};

	const settings = {
		dots: true,
		infinite: true,
		speed: 600,
		slidesToShow: 5,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		arrows: true,
		responsive: [
			{ breakpoint: 1024, settings: { slidesToShow: 3 } },
			{ breakpoint: 768, settings: { slidesToShow: 2 } },
		],
	};

	return (
		<div className='experience-section container mt-5'>
			<h2 className='mb-4 text-center'>Experience</h2>

			{experiences.length === 0 && (
				<p className='text-center'>No experiences added yet.</p>
			)}

			<Slider {...settings}>
				{experiences.map((exp) => (
					<div key={exp.id}>
						<div className='experience-card shadow-sm'>
							{exp.companyImageUrl && (
								<div className='exp-img-container'>
									<img
										src={exp.companyImageUrl}
										alt={exp.companyName}
										className='exp-img'
									/>
								</div>
							)}
							<div className='exp-body'>
								<h5 className='exp-title'>{exp.companyName}</h5>
								<h6 className='exp-role'>{exp.role}</h6>
								<p className='exp-date'>
									{exp.startDate} → {exp.endDate || 'Present'}
								</p>
								<p className='exp-desc'>{exp.description}</p>
								{exp.certificateUrl && (
									<a
										href={exp.certificateUrl}
										target='_blank'
										rel='noreferrer'
										className='btn btn-sm btn-outline-primary mt-2'
									>
										View Certificate
									</a>
								)}
							</div>
						</div>
					</div>
				))}
			</Slider>
		</div>
	);
}

export default Experience;
