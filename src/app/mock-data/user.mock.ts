import { User } from '../models/user.model';

export const MOCK_USER: User = {
  id: '1',
  name: 'Kevin Ciang',
  email: 'kevin@example.com',
  role: 'admin',
  timezone: 'Asia/Singapore',
  preferences: {
    emailAlerts: false,
    pushNotifications: false,
    monthlyDigest: false,
    darkMode: false,
  },
};
