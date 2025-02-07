import axios from 'axios';

const axiosClient = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_BACKEND}/v1/api`
});

axiosClient.interceptors.request.use(
	async (request) => {
		try {
			const { token }: { token: string } = JSON.parse(
				sessionStorage.getItem('dataUser')!
			);

			if (token) {
				request.headers['Authorization'] = `Bearer ${token}`;
			}
		} catch (e) {}

		return request;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosClient;