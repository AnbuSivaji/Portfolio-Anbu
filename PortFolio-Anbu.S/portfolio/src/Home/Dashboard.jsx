import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/admin/login');
	};

	return (
		<div className='dashboard-container'>
			{/* Header */}
			<div className='dashboard-header'>
				<h2>Admin Dashboard</h2>
				<button
					className='btn btn-danger'
					onClick={handleLogout}
				>
					Logout
				</button>
			</div>

			{/* Grid Layout */}
			<div className='dashboard-grid'>
				<div
					className='dashboard-card'
					onClick={() => navigate('/admin/profile')}
				>
					<h3>Profile</h3>
				</div>
				<div
					className='dashboard-card'
					onClick={() => navigate('/admin/skills')}
				>
					<h3>Skills</h3>
				</div>
				<div
					className='dashboard-card'
					onClick={() => navigate('/admin/projects')}
				>
					<h3>Projects</h3>
				</div>
				<div
					className='dashboard-card'
					onClick={() => navigate('/admin/experience')}
				>
					<h3>Experience</h3>
				</div>
				<div
					className='dashboard-card'
					onClick={() => navigate('/admin/education')}
				>
					<h3>Education</h3>
				</div>
				<div
					className='dashboard-card'
					onClick={() => navigate('/admin/contact')}
				>
					<h3>Contact</h3>
				</div>
				<div
					className='dashboard-card'
					onClick={() => navigate('/admin/visitors')}
				>
					<h3>Visitors</h3>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
