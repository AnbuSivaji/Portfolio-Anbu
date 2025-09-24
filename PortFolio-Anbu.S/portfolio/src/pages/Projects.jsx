import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import API from '../Api/api';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/projects.css'; // custom styles

function Projects() {
	const [projects, setProjects] = useState([]);

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

	// Slider config
	const settings = {
		dots: true,
		infinite: false, // 🚫 No reverse loop
		speed: 600,
		slidesToShow: 5,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000, // 5 seconds
		arrows: true,
		responsive: [
			{
				breakpoint: 1024, // tablet
				settings: { slidesToShow: 3 },
			},
			{
				breakpoint: 768, // mobile
				settings: { slidesToShow: 2 },
			},
		],
	};

	return (
		<div className='container mt-5'>
			<h2 className='mb-4 text-center'>My Projects</h2>
			{projects.length === 0 ? (
				<p className='text-center'>No projects available right now.</p>
			) : (
				<Slider {...settings}>
					{projects.map((p) => (
						<div
							key={p.id}
							className='p-2'
						>
							<div className='project-card shadow-sm'>
								{p.imageUrl && (
									<img
										src={p.imageUrl}
										alt='project'
										className='project-img'
									/>
								)}
								<div className='card-body d-flex flex-column'>
									<h5 className='card-title'>{p.title}</h5>
									<p className='flex-grow-1'>{p.description}</p>
									{p.link && (
										<a
											href={p.link}
											target='_blank'
											rel='noreferrer'
											className='btn btn-sm btn-outline-primary mt-2'
										>
											View Project
										</a>
									)}
								</div>
							</div>
						</div>
					))}
				</Slider>
			)}
		</div>
	);
}

export default Projects;
