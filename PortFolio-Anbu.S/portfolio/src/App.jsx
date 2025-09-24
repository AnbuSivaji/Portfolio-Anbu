import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	Outlet,
} from 'react-router-dom';

// ---------- ADMIN PAGES ----------
import Signup from './Home/Signup';
import Login from './Home/Login';
import Dashboard from './Home/Dashboard';

import AdminProfilePage from './Home/AdminProfile';
import AdminSkill from './Home/AdminSkill';
import AdminProjectPage from './Home/AdminProject';
import AdminExperiencePage from './Home/AdminExperience';
import AdminEducationPage from './Home/AdminEducation';
import AdminContactPage from './Home/AdminContact';
import AdminVisitorsPage from './Home/AdminVisitors';

// ---------- USER PAGES ----------
import Navbar from './component/Navbar';
import Home from './pages/Home';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Contact from './pages/Contact';
import VisitorTracker from './pages/VisitorTracker';

// ---------- LAYOUTS ----------

// Layout for USER pages (with Navbar)
function UserLayout() {
	return (
		<>
			<Navbar />
			<main>
				<Outlet /> {/* User pages render here */}
			</main>
		</>
	);
}

// Layout for ADMIN pages (without Navbar)
function AdminLayout() {
	return (
		<main>
			<Outlet /> {/* Admin pages render directly */}
		</main>
	);
}

function App() {
	return (
		<Router>
			<Routes>
				{/* ---------- USER ROUTES ---------- */}
				<Route element={<UserLayout />}>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/skills'
						element={<Skills />}
					/>
					<Route
						path='/projects'
						element={<Projects />}
					/>
					<Route
						path='/experience'
						element={<Experience />}
					/>
					<Route
						path='/education'
						element={<Education />}
					/>
					<Route
						path='/contact'
						element={<Contact />}
					/>
					<Route
						path='/visitor-tracker'
						element={<VisitorTracker />}
					/>
				</Route>

				{/* ---------- ADMIN ROUTES ---------- */}
				<Route
					path='/admin'
					element={<AdminLayout />}
				>
					{/* Auth */}
					<Route
						path='signup'
						element={<Signup />}
					/>
					<Route
						path='login'
						element={<Login />}
					/>

					{/* Dashboard main */}
					<Route
						path='dashboard'
						element={<Dashboard />}
					/>

					{/* Inside Dashboard pages (CRUD pages) */}
					<Route
						path='profile'
						element={<AdminProfilePage />}
					/>
					<Route
						path='skills'
						element={<AdminSkill />}
					/>
					<Route
						path='projects'
						element={<AdminProjectPage />}
					/>
					<Route
						path='experience'
						element={<AdminExperiencePage />}
					/>
					<Route
						path='education'
						element={<AdminEducationPage />}
					/>
					<Route
						path='contact'
						element={<AdminContactPage />}
					/>
					<Route
						path='visitors'
						element={<AdminVisitorsPage />}
					/>
				</Route>

				{/* ---------- DEFAULT REDIRECT ---------- */}
				<Route
					path='*'
					element={
						<Navigate
							to='/'
							replace
						/>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
