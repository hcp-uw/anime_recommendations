// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from "./core/CancelablePromise";
import { OpenAPI } from "./core/OpenAPI";
import { request as __request } from "./core/request";
import type {
  ApiRestRestCheckRetrieveResponse,
  ApiUsersListData,
  ApiUsersListResponse,
  ApiUsersCreateData,
  ApiUsersCreateResponse,
  ApiUsersRetrieveData,
  ApiUsersRetrieveResponse,
  ApiUsersUpdateData,
  ApiUsersUpdateResponse,
  ApiUsersPartialUpdateData,
  ApiUsersPartialUpdateResponse,
  ApiUsersDestroyData,
  ApiUsersDestroyResponse,
} from "./types.gen";

export class ApiService {
  /**
   * Check REST API
   * This endpoint checks if the REST API is working.
   * @returns Message
   * @throws ApiError
   */
  public static apiRestRestCheckRetrieve(): CancelablePromise<ApiRestRestCheckRetrieveResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/rest/rest-check/",
    });
  }

  /**
   * @param data The data for the request.
   * @param data.limit Number of results to return per page.
   * @param data.offset The initial index from which to return the results.
   * @returns PaginatedUserList
   * @throws ApiError
   */
  public static apiUsersList(
    data: ApiUsersListData = {},
  ): CancelablePromise<ApiUsersListResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/users/",
      query: {
        limit: data.limit,
        offset: data.offset,
      },
    });
  }

  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns User
   * @throws ApiError
   */
  public static apiUsersCreate(
    data: ApiUsersCreateData,
  ): CancelablePromise<ApiUsersCreateResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/users/",
      body: data.requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @param data The data for the request.
   * @param data.id A unique integer value identifying this user.
   * @returns User
   * @throws ApiError
   */
  public static apiUsersRetrieve(
    data: ApiUsersRetrieveData,
  ): CancelablePromise<ApiUsersRetrieveResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/users/{id}/",
      path: {
        id: data.id,
      },
    });
  }

  /**
   * @param data The data for the request.
   * @param data.id A unique integer value identifying this user.
   * @param data.requestBody
   * @returns User
   * @throws ApiError
   */
  public static apiUsersUpdate(
    data: ApiUsersUpdateData,
  ): CancelablePromise<ApiUsersUpdateResponse> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/users/{id}/",
      path: {
        id: data.id,
      },
      body: data.requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @param data The data for the request.
   * @param data.id A unique integer value identifying this user.
   * @param data.requestBody
   * @returns User
   * @throws ApiError
   */
  public static apiUsersPartialUpdate(
    data: ApiUsersPartialUpdateData,
  ): CancelablePromise<ApiUsersPartialUpdateResponse> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/users/{id}/",
      path: {
        id: data.id,
      },
      body: data.requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @param data The data for the request.
   * @param data.id A unique integer value identifying this user.
   * @returns void No response body
   * @throws ApiError
   */
  public static apiUsersDestroy(
    data: ApiUsersDestroyData,
  ): CancelablePromise<ApiUsersDestroyResponse> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/users/{id}/",
      path: {
        id: data.id,
      },
    });
  }
}
