import { useEffect, useState, useRef } from 'react';
import API from '../Api/api';
import '../styles/Skills.css';
import { ChevronLeft, ChevronRight } from 'react-feather';

function Skills() {
	const [skills, setSkills] = useState([]);
	const [certifications, setCertifications] = useState([]);
	const skillsRef = useRef(null);
	const certsRef = useRef(null);

	// Carousel refs
	const skillTrackRef = useRef(null);
	const certTrackRef = useRef(null);

	useEffect(() => {
		fetchSkills();
	}, []);

	const fetchSkills = async () => {
		try {
			const resSkills = await API.get('/admin/skills/category/skills');
			const resCerts = await API.get('/admin/skills/category/certifications');
			setSkills(resSkills.data);
			setCertifications(resCerts.data);
		} catch (err) {
			alert('Error fetching skills data');
		}
	};

	// Scroll animation
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
					} else {
						entry.target.classList.remove('visible');
					}
				});
			},
			{ threshold: 0.2 }
		);

		if (skillsRef.current) observer.observe(skillsRef.current);
		if (certsRef.current) observer.observe(certsRef.current);

		return () => observer.disconnect();
	}, []);

	// Auto slide loop
	useEffect(() => {
		const interval = setInterval(() => {
			moveSlide(skillTrackRef.current, 'next');
			moveSlide(certTrackRef.current, 'next');
		}, 3000); // every 3s

		return () => clearInterval(interval);
	}, []);

	const moveSlide = (track, direction) => {
		if (!track) return;
		const cardWidth = track.querySelector('.card')?.offsetWidth || 250;

		if (direction === 'next') {
			track.scrollBy({ left: cardWidth + 25, behavior: 'smooth' });
			if (
				track.scrollLeft + track.clientWidth >=
				track.scrollWidth - cardWidth
			) {
				setTimeout(() => (track.scrollLeft = 0), 600);
			}
		} else if (direction === 'prev') {
			if (track.scrollLeft === 0) {
				track.scrollLeft = track.scrollWidth;
			}
			track.scrollBy({ left: -(cardWidth + 25), behavior: 'smooth' });
		}
	};

	return (
		<div className='container mt-5'>
			<h2 className='mb-4 text-center'>My Skills</h2>

			{/* Skills Section */}
			<div
				className='mb-5 slide-container'
				ref={skillsRef}
			>
				<h4 className='mb-3'>Technical Skills</h4>
				<div className='carousel'>
					<button
						className='arrow-btn left'
						onClick={() => moveSlide(skillTrackRef.current, 'prev')}
					>
						<ChevronLeft />
					</button>
					<div
						className='carousel-track'
						ref={skillTrackRef}
					>
						{skills.map((s) => (
							<div
								key={s.id}
								className='card skill-card shadow-sm'
							>
								{s.iconUrl && (
									<img
										src={s.iconUrl}
										alt='icon'
										className='skill-icon'
									/>
								)}
								<strong className='mt-2 d-block'>{s.title}</strong>
								{s.percentage !== null && (
									<div className='progress mt-2'>
										<div
											className='progress-bar'
											role='progressbar'
											style={{ width: `${s.percentage}%` }}
											aria-valuenow={s.percentage}
											aria-valuemin='0'
											aria-valuemax='100'
										>
											{s.percentage}%
										</div>
									</div>
								)}
							</div>
						))}
					</div>
					<button
						className='arrow-btn right'
						onClick={() => moveSlide(skillTrackRef.current, 'next')}
					>
						<ChevronRight />
					</button>
				</div>
			</div>

			{/* Certifications Section */}
			<div
				className='slide-container'
				ref={certsRef}
			>
				<h4 className='mb-3'>Certifications</h4>
				<div className='carousel'>
					<button
						className='arrow-btn left'
						onClick={() => moveSlide(certTrackRef.current, 'prev')}
					>
						<ChevronLeft />
					</button>
					<div
						className='carousel-track'
						ref={certTrackRef}
					>
						{certifications.map((c) => (
							<div
								key={c.id}
								className='card cert-card shadow-sm'
							>
								<img
									src={c.iconUrl || 'https://via.placeholder.com/150'}
									alt='cert'
									className='skill-icon'
								/>
								<span className='mt-2'>{c.title}</span>
								{c.certificationLink && (
									<a
										href={c.certificationLink}
										target='_blank'
										rel='noreferrer'
										className='btn btn-sm btn-outline-primary mt-2'
									>
										View
									</a>
								)}
							</div>
						))}
					</div>
					<button
						className='arrow-btn right'
						onClick={() => moveSlide(certTrackRef.current, 'next')}
					>
						<ChevronRight />
					</button>
				</div>
			</div>
		</div>
	);
}

export default Skills;
