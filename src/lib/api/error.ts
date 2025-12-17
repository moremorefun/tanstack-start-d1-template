/**
 * API Error Response Utilities
 *
 * Standardized API error response format for all API routes.
 */

/**
 * Standard error codes
 */
export type ErrorCode =
  | 'UNAUTHORIZED' // 401 - Not authenticated or token invalid
  | 'FORBIDDEN' // 403 - No permission to access resource
  | 'NOT_FOUND' // 404 - Resource not found
  | 'INVALID_DATA' // 400 - Request validation failed
  | 'RATE_LIMITED' // 429 - Request rate exceeded
  | 'INTERNAL_ERROR' // 500 - Internal server error

/**
 * Standard API error response format
 */
export interface ApiErrorResponse {
  /** User-friendly error message */
  error: string
  /** Machine-readable error code */
  code: ErrorCode
  /** Backward compatibility field */
  success?: false
}

/**
 * Create a standard API error response
 *
 * @param error - User-friendly error message
 * @param code - Machine-readable error code
 * @param includeSuccess - Whether to include success: false field
 * @returns ApiErrorResponse object
 *
 * @example
 * return json(createApiError('User not found', 'NOT_FOUND'), { status: 404 })
 */
export function createApiError(
  error: string,
  code: ErrorCode,
  includeSuccess: boolean = false
): ApiErrorResponse {
  const response: ApiErrorResponse = { error, code }
  if (includeSuccess) {
    response.success = false
  }
  return response
}

/**
 * HTTP status code to error code mapping
 */
export const ErrorCodeToHttpStatus: Record<ErrorCode, number> = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INVALID_DATA: 400,
  RATE_LIMITED: 429,
  INTERNAL_ERROR: 500,
}
