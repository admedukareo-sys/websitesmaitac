export interface User {
  id: number;
  name: string;
  email: string;
  role: 'STUDENT' | 'ADMIN';
  password?: string;
}

export interface Registration {
  id: number;
  userId: number;
  nisn?: string;
  nik?: string;
  birthPlace?: string;
  birthDate?: string;
  gender?: string;
  address?: string;
  fatherName?: string;
  motherName?: string;
  parentPhone?: string;
  previousSchool?: string;
  status: 'DRAFT' | 'SUBMITTED' | 'VERIFIED' | 'REJECTED' | 'PASSED' | 'FAILED' | 'REGISTERED';
  rejectionReason?: string;
  aktaUrl?: string;
  kkUrl?: string;
  fotoUrl?: string;
  raporUrl?: string;
  paymentProofUrl?: string;
  paymentStatus: 'UNPAID' | 'PENDING' | 'VERIFIED';
  testScore?: number;
  interviewNotes?: string;
  reRegistrationProofUrl?: string;
  uniformSize?: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEYS = {
  USERS: 'smait_users',
  REGISTRATIONS: 'smait_registrations',
  CURRENT_USER: 'smait_current_user',
};

// Seed initial data if empty
function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    const initialUsers: User[] = [
      {
        id: 1,
        name: 'Administrator SPMB',
        email: 'admin@smait.sch.id',
        role: 'ADMIN',
        password: 'admin',
      },
      {
        id: 2,
        name: 'Ahmad Zaki',
        email: 'zaki@gmail.com',
        role: 'STUDENT',
        password: 'password123',
      },
      {
        id: 3,
        name: 'Fatimah Az-Zahra',
        email: 'fatimah@gmail.com',
        role: 'STUDENT',
        password: 'password123',
      },
    ];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(initialUsers));
  }

  if (!localStorage.getItem(STORAGE_KEYS.REGISTRATIONS)) {
    const initialRegistrations: Registration[] = [
      {
        id: 1,
        userId: 2,
        nisn: '0051234567',
        nik: '1371012304050001',
        birthPlace: 'Pulau Punjung',
        birthDate: '2008-05-14',
        gender: 'L',
        address: 'Jorong Ranah Lintas, Dharmasraya',
        fatherName: 'Budi Santoso',
        motherName: 'Siti Aminah',
        parentPhone: '081266778899',
        previousSchool: 'SMP Negeri 1 Pulau Punjung',
        status: 'SUBMITTED',
        paymentStatus: 'PENDING',
        paymentProofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 2,
        userId: 3,
        nisn: '0059876543',
        nik: '1371012304050002',
        birthPlace: 'Sungai Dareh',
        birthDate: '2008-08-20',
        gender: 'P',
        address: 'Nagari Tebing Tinggi, Dharmasraya',
        fatherName: 'Rahman Hakim',
        motherName: 'Nurhaliza',
        parentPhone: '081399887766',
        previousSchool: 'MTsN 1 Dharmasraya',
        status: 'DRAFT',
        paymentStatus: 'UNPAID',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(initialRegistrations));
  }
}

export function getUsers(): User[] {
  initializeStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
}

export function saveUsers(users: User[]) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

export function getRegistrations(): Registration[] {
  initializeStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTRATIONS) || '[]');
}

export function saveRegistrations(regs: Registration[]) {
  localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(regs));
}

export function getRegistrationByUserId(userId: number): Registration | null {
  const regs = getRegistrations();
  return regs.find((r) => r.userId === userId) || null;
}

export function getCurrentUser(): User | null {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
}

export function setCurrentUser(user: User | null) {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
}

export function updateRegistration(userId: number, updates: Partial<Registration>): Registration {
  const regs = getRegistrations();
  let index = regs.findIndex((r) => r.userId === userId);
  
  if (index === -1) {
    const newReg: Registration = {
      id: Date.now(),
      userId,
      status: 'DRAFT',
      paymentStatus: 'UNPAID',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...updates,
    };
    regs.push(newReg);
    saveRegistrations(regs);
    return newReg;
  } else {
    regs[index] = {
      ...regs[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    saveRegistrations(regs);
    return regs[index];
  }
}

export function updateRegistrationById(id: number, updates: Partial<Registration>): Registration | null {
  const regs = getRegistrations();
  const index = regs.findIndex((r) => r.id === id);
  if (index !== -1) {
    regs[index] = {
      ...regs[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    saveRegistrations(regs);
    return regs[index];
  }
  return null;
}

export function deleteRegistrationById(id: number) {
  const regs = getRegistrations();
  const filtered = regs.filter((r) => r.id !== id);
  saveRegistrations(filtered);
}

export function addRegistrationByAdmin(data: {
  name: string;
  email: string;
  previousSchool?: string;
  nisn?: string;
  status: Registration['status'];
  paymentStatus: Registration['paymentStatus'];
}) {
  const users = getUsers();
  let existingUser = users.find((u) => u.email.toLowerCase() === data.email.toLowerCase());
  let userId = existingUser ? existingUser.id : Date.now();

  if (!existingUser) {
    existingUser = {
      id: userId,
      name: data.name,
      email: data.email,
      role: 'STUDENT',
      password: 'password123',
    };
    users.push(existingUser);
    saveUsers(users);
  }

  const regs = getRegistrations();
  const newReg: Registration = {
    id: Date.now(),
    userId,
    nisn: data.nisn || '',
    previousSchool: data.previousSchool || '',
    status: data.status,
    paymentStatus: data.paymentStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  regs.push(newReg);
  saveRegistrations(regs);
  return newReg;
}
