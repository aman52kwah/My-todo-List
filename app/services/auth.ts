import { fetchWrapper } from "~/utils/fetchWrapper";

const API_URL = process.env.NODE_ENV==='production' ?
'https://todobackend-cyan.vercel.app/' :"http://localhost:5000";


export type RegisterParams = {
  username: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  user: {
    id: string;
    email: string;
    username: string;
  };
  message: string;
};

//types for login
export type LoginParams = {
  email: string;
  password: string;
};

//login with email and password
export async function login(
  params: LoginParams
): Promise<AuthResponse | undefined> {
  try {
    const data = await fetchWrapper<AuthResponse>(`${API_URL}/auth/login`, {
      method: "POST",
      credentials:'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
      // don't redirect on unauthorized for login
      redirectOnUnauthorized: false,
    });

    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

// register new user account

export async function register(
  params: RegisterParams
): Promise<AuthResponse | undefined> {
  try {
    const data = await fetchWrapper<AuthResponse>(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
      //don't redirect on unauthorized or registrattion
      redirectOnUnauthorized: false,
    });
    return data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
}

// ============== logout the current user=======================

export async function logout(
  localStorage: Storage,
  window: Window & typeof globalThis,
  p0: { localStorage: Storage; "": string; window: Window & typeof globalThis }
): Promise<void> {
  try {
    await fetchWrapper(`${API_URL}/auth/logout`, {
      method: "POST",
      redirectOnUnauthorized: false,
      credentials: "include",
    });
    //redirect to login page after logout
    localStorage.removeItem("session"); // clear token from local storage

    localStorage.removeItem("user");

    window.location.href = "/login";
  } catch (error) {
    console.error("Failed to logout:", error);
    //still redirect to login even if logout request fails
    localStorage.removeItem("session");
    window.location.href = "/login";
  }
}

// check if the user is authenticated
// this would make a request to verify the session

export async function checkAuth(): Promise<boolean> {
  try {
    const response = await fetchWrapper<{ isAuthenticated: boolean }>(
      `${API_URL}/auth/check`,
      {
        method: "GET",
        redirectOnUnauthorized: false,
      }
    );
    return response.isAuthenticated;
  } catch (error) {
    return false;
  }
}
