export interface MailApiResponse {
  success: boolean;
  message: string;
};

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}