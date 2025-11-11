import type { AxiosError, AxiosInstance } from 'axios'
import axios from 'axios'
import type { HttpRequest, IHttpClient } from './http-client-player'

export class HttpClient implements IHttpClient {
	private constructor(
		private api: AxiosInstance = axios,
		private baseUrl: string = 'https://runemetrics-service.onrender.com'
	) {}

	static create() {
		return new HttpClient()
	}

	async sendRequest<TResponse, TBody>(props: HttpRequest<TBody>) {
		const { endpoint, method, body, headers, params } = props
		try {
			const { data } = await this.api.request<TResponse>({
				url: `${this.baseUrl}${endpoint}`,
				method,
				params,
				headers,
				data: body,
			})
			return data
		} catch (er) {
			const error = er as AxiosError
			const status = error.response?.status || 500
			const message = error.response?.data || error.message

			throw new Error(`Request failed with status ${status}: ${message}`)
		}
	}
}
