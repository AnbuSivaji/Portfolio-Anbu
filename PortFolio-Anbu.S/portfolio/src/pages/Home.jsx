import { useEffect, useState } from 'react';
import API from '../Api/api';

// Import section components
import Skills from './skills';
import Projects from './Projects';
import Experience from './Experience';
import Education from './Education';
import Contact from './Contact';
import Footer from './Footer'; // ✅ Import footer

import '../styles/Home.css';

function Home() {
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		const fetchActiveProfile = async () => {
			try {
				const activeId = localStorage.getItem('activeProfileId');
				if (!activeId) return;

				const res = await API.get(`/admin/profiles/${activeId}`);
				setProfile(res.data);
			} catch (err) {
				console.error('Error fetching active profile', err);
			}
		};
		fetchActiveProfile();
	}, []);

	if (!profile) {
		return (
			<div className='container mt-5 text-center'>
				<h2>No active profile selected</h2>
				<p>Please select an active profile in Admin Dashboard.</p>
			</div>
		);
	}

	return (
		<div>
			{/* ---------- HOME SECTION ---------- */}
			<section
				id='home'
				className='section home-section'
			>
				<div className='container home-container'>
					{/* Left side profile image */}
					<div className='home-img'>
						<img
							src={profile.imageUrl || 'https://via.placeholder.com/400x500'}
							alt='profile'
						/>
					</div>

					{/* Right side content */}
					<div className='home-content'>
						<h1 className='typing-animation'>{profile.title}</h1>
						<p className='about-me'>{profile.aboutMe}</p>
						<p className='bio'>{profile.bio}</p>
						<a
							href={profile.resumeUrl}
							target='_blank'
							rel='noreferrer'
							className='btn resume-btn mt-3'
						>
							View Resume
						</a>
					</div>
				</div>
			</section>

			{/* ---------- SKILLS SECTION ---------- */}
			<section
				id='skills'
				className='section bg-light'
			>
				<div className='container'>
					<Skills />
				</div>
			</section>

			{/* ---------- PROJECTS SECTION ---------- */}
			<section
				id='projects'
				className='section'
			>
				<div className='container'>
					<Projects />
				</div>
			</section>

			{/* ---------- EXPERIENCE SECTION ---------- */}
			<section
				id='experience'
				className='section bg-light'
			>
				<div className='container'>
					<Experience />
				</div>
			</section>

			{/* ---------- EDUCATION SECTION ---------- */}
			<section
				id='education'
				className='section'
			>
				<div className='container'>
					<Education />
				</div>
			</section>

			{/* ---------- CONTACT SECTION ---------- */}
			<section
				id='contact'
				className='section bg-light'
			>
				<div className='container'>
					<Contact />
				</div>
			</section>

			{/* ---------- FOOTER ---------- */}
			<Footer />
		</div>
	);
}

export default Home;
