import { useEffect } from 'react';
import API from '../Api/api';

function VisitorTracker({ pageType }) {
	useEffect(() => {
		const trackVisitor = async () => {
			try {
				await API.post(`/admin/visitors/track/${pageType}`);
			} catch (err) {
				console.error('Visitor tracking failed', err);
			}
		};

		trackVisitor();
	}, [pageType]);

	return null; // UI la edhuvum show panna vendam
}

export default VisitorTracker;
