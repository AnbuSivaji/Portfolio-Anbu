import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';
import '../styles/Footer.css';

function Footer() {
	return (
		<footer className='footer'>
			<div className='footer-container'>
				<p className='footer-text'>
					© {new Date().getFullYear()} Anbu Soft | All Rights Reserved
				</p>
				<div className='footer-socials'>
					<a
						href='https://github.com/AnbuSivaji'
						target='_blank'
						rel='noreferrer'
					>
						<FaGithub />
					</a>
					<a
						href='https://www.linkedin.com/in/anbu-s-170a501bb/'
						target='_blank'
						rel='noreferrer'
					>
						<FaLinkedin />
					</a>
					<a
						href='https://twitter.com/your-twitter'
						target='_blank'
						rel='noreferrer'
					>
						<FaTwitter />
					</a>
					<a
						href='https://facebook.com/your-facebook'
						target='_blank'
						rel='noreferrer'
					>
						<FaFacebook />
					</a>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
