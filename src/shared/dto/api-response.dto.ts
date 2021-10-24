import IApiResponse from '../../types/api-response.interface';

class ApiResponse implements IApiResponse {
    constructor(
        public success: boolean,
        public data: any,
        public message: string,
    ) { }
}
export default ApiResponse;