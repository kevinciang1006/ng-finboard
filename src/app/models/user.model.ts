export interface UserPreferences {
  emailAlerts: boolean;
  pushNotifications: boolean;
  monthlyDigest: boolean;
  darkMode: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  timezone: string;
  preferences: UserPreferences;
}
