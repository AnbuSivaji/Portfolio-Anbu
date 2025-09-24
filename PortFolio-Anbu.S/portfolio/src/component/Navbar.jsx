import { Link } from 'react-scroll';
import '../styles/Navbar.css';

function Navbar() {
	return (
		<nav className='navbar navbar-expand-lg shadow custom-navbar fixed-top'>
			<div className='container'>
				<a
					className='navbar-brand fw-bold'
					href='#home'
				>
					MyPortfolio
				</a>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div
					className='collapse navbar-collapse'
					id='navbarNav'
				>
					<ul className='navbar-nav ms-auto'>
						<li className='nav-item'>
							<Link
								className='nav-link'
								to='home'
								spy={true}
								smooth={true}
								offset={-70}
								duration={500}
							>
								Home
							</Link>
						</li>
						<li className='nav-item'>
							<Link
								className='nav-link'
								to='skills'
								spy={true}
								smooth={true}
								offset={-70}
								duration={500}
							>
								Skills
							</Link>
						</li>
						<li className='nav-item'>
							<Link
								className='nav-link'
								to='projects'
								spy={true}
								smooth={true}
								offset={-70}
								duration={500}
							>
								Projects
							</Link>
						</li>
						<li className='nav-item'>
							<Link
								className='nav-link'
								to='experience'
								spy={true}
								smooth={true}
								offset={-70}
								duration={500}
							>
								Experience
							</Link>
						</li>
						<li className='nav-item'>
							<Link
								className='nav-link'
								to='education'
								spy={true}
								smooth={true}
								offset={-70}
								duration={500}
							>
								Education
							</Link>
						</li>
						<li className='nav-item'>
							<Link
								className='nav-link'
								to='contact'
								spy={true}
								smooth={true}
								offset={-70}
								duration={500}
							>
								Contact
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
