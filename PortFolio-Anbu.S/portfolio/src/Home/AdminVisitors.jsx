import { useEffect, useState } from 'react';
import API from '../Api/api';
import '../styles/AdminVisitors.css';

function AdminVisitors() {
	const [count, setCount] = useState(0);
	const [visitors, setVisitors] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const resCount = await API.get('/admin/visitors/count');
			setCount(resCount.data);

			const resList = await API.get('/admin/visitors');
			setVisitors(resList.data);
		} catch (err) {
			alert('Error fetching visitors');
		}
	};

	return (
		<div className='admin-visitors-container mt-5'>
			<h3>Total Unique Visitors: {count}</h3>

			{visitors.length === 0 ? (
				<p>No visitors yet.</p>
			) : (
				<div className='table-responsive mt-3'>
					<table className='table table-bordered table-striped'>
						<thead className='table-dark'>
							<tr>
								<th>ID</th>
								<th>IP Address</th>
								<th>Page Type</th>
								<th>Visited At</th>
							</tr>
						</thead>
						<tbody>
							{visitors.map((v) => (
								<tr key={v.id}>
									<td>{v.id}</td>
									<td>{v.ipAddress}</td>
									<td>{v.pageType}</td>
									<td>{new Date(v.visitedAt).toLocaleString()}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}

export default AdminVisitors;
