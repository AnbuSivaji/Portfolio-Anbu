import { useEffect, useState } from 'react';
import API from '../Api/api';
import '../styles/AdminContact.css';

function AdminContact() {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		fetchMessages();
	}, []);

	const fetchMessages = async () => {
		try {
			const res = await API.get('/admin/contact');
			setMessages(res.data);
		} catch (err) {
			alert('Error fetching contact messages');
		}
	};

	return (
		<div className='admin-contact-container mt-5'>
			<h3>Contact Messages</h3>
			{messages.length === 0 ? (
				<p>No messages yet.</p>
			) : (
				<div className='table-responsive'>
					<table className='table table-bordered table-striped'>
						<thead className='table-dark'>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Email</th>
								<th>Message</th>
								<th>Received At</th>
							</tr>
						</thead>
						<tbody>
							{messages.map((msg) => (
								<tr key={msg.id}>
									<td>{msg.id}</td>
									<td>{msg.name}</td>
									<td>{msg.email}</td>
									<td>{msg.message}</td>
									<td>{new Date(msg.createdAt).toLocaleString()}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}

export default AdminContact;
