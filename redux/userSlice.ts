import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the user type
interface User {
  id: string;
  name: string;
  email: string;
  notifications?: any[];
  [key: string]: any; // To allow additional dynamic properties
}

interface UserState {
  user: User | null;
  // permissions: [];
}

// Function to safely access localStorage
const getLocalStorageItem = <T>(key: string): T | null => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  return null;
};

const setLocalStorageItem = (key: string, value: unknown): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const removeLocalStorageItem = (key: string): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

const initialState: UserState = {
  user: getLocalStorageItem<User>("user"),
  // permissions: getLocalStorageItem("permissions") || [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginn: (state, action: any) => {
      state.user = action.payload;
      setLocalStorageItem("user", action.payload);
    },
    signup: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      setLocalStorageItem("user", action.payload);
    },
    updateConnectionFlag: (state, action: any) => {
      if (state.user) {
        state.user.connection_flag = action.payload.connection_flag;
      }
    },
    logout: (state) => {
      // state.user = null;
      ["user"].forEach(removeLocalStorageItem);
    },
  },
});

export const { loginn, signup, logout, updateConnectionFlag } =
  userSlice.actions;

export default userSlice.reducer;
