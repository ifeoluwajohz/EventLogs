export interface UserProfile {
  id: string;
  email: string;
  firebaseUid: string | null;
  name: string;
  role: Role | string;
  location: string | null;
  prefferedName: string | null;
  profilePicture: string | null;
}

export interface Role {
  role: string;
}