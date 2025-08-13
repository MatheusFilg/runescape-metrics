export enum HttpMethod {
	GET = 'get',
	POST = 'post',
	PUT = 'put',
	DELETE = 'delete',
}

export type HttpRequest<TBody> = {
	body?: TBody
	method: HttpMethod
	params?: Record<string, any>
	headers?: Record<string, string>
	endpoint: string
}

export interface IHttpClient {
	sendRequest: <TResponse, TBody = unknown>(
		request: HttpRequest<TBody>
	) => Promise<TResponse>
}
