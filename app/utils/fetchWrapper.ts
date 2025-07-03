// type FetchOptions = RequestInit & {
//   redirectOnUnauthorized?: boolean;
// };

// /**
//  * A wrapper for the fetch API that handles 401 errors by redirecting to the login page
//  * @param url The URL to fetch
//  * @param options The fetch options
//  * @returns The fetch response
//  */
// export async function fetchWrapper<T>(
//   url: string,
//   options: FetchOptions = {}
// ): Promise<T> {
//   // Set default option to redirect on 401
//   const { redirectOnUnauthorized = true, ...fetchOptions } = options;

//   // Always include credentials to send cookies with requests
//   const requestOptions: RequestInit = {
//     ...fetchOptions,
//     credentials: "include",
//   };

//   try {
//     const response = await fetch(url, requestOptions);

//     // Handle 401 Unauthorized errors
//     if (response.status === 401) {
//       // Store the current location to redirect back after login
//       const currentPath = window.location.pathname;

//       // Only store path if it's not already the login page
//       if (currentPath !== "/login") {
//         sessionStorage.setItem("redirectAfterLogin", currentPath);
//       }

//       // Redirect to login page
//       window.location.href = "/login";
//       throw new Error("Authentication required. Redirecting to login page.");
//     }

//     // Handle other error status codes
//     if (!response.ok) {
//       throw new Error(`API  Error: ${response.status} ${response.statusText}`);
//     }

//     // Parse JSON response
//     const data: T = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Fetch error:", error);
//     throw error;
//   }
// }

type FetchOptions = RequestInit & {
  redirectOnUnauthorized?: boolean;
};

/**
 * A wrapper for the fetch API that handles 401 errors by redirecting to the login page
 * @param url The URL to fetch
 * @param options The fetch options
 * @returns The fetch response
 */
export async function fetchWrapper<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  // Set default option to redirect on 401
  const { redirectOnUnauthorized = false, ...fetchOptions } = options;

  // Always include credentials to send cookies with requests
  const requestOptions: RequestInit = {
    ...fetchOptions,
    credentials: "include",
  };

  try {
    const response = await fetch(url, requestOptions);

    // Handle 401 Unauthorized errors
    if (response.status === 401) {
      if(redirectOnUnauthorized ) {
      // Store the current location to redirect back after login
      const currentPath = window.location.pathname;

      // Only store path if it's not already the login page
      if (currentPath !== "/login") {
        sessionStorage.setItem("redirectAfterLogin", currentPath);
      }

      // Redirect to login page
      window.location.href = "/login";
      throw new Error("Authentication required. Redirecting to login page.");
    }
  }
    // Handle other error status codes
    if (!response.ok) {
      let errorMessage = `API Error: ${response.status} ${response.statusText}`;
      
      try {
        // Try to get error details from response body
        const errorData = await response.json();
        console.error("Error response data:", errorData);
        
        // If the server returns a specific error message, use it
        if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        } else if (typeof errorData === 'string') {
          errorMessage = errorData;
        }
      } catch (jsonError) {
        // If response isn't JSON, try to get it as text
        try {
          const errorText = await response.text();
          console.error("Error response text:", errorText);
          if (errorText) {
            errorMessage = errorText;
          }
        } catch (textError) {
          console.error("Could not parse error response:", textError);
        }
      }
      
      throw new Error(errorMessage);
    }

    // Parse JSON response for successful requests
    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
