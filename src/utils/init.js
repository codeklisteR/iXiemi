// Initialize default users
export const initializeUsers = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  
  // Check if admin exists
  const adminExists = users.find(u => u.email === 'admin@xiemi.com')
  
  if (!adminExists) {
    users.push({
      id: 1,
      name: 'Admin User',
      email: 'admin@xiemi.com',
      password: 'admin123',
      phone: '09123456789',
      isAdmin: true,
      createdAt: new Date().toISOString()
    })
  }
  
  // Check if demo user exists
  const demoExists = users.find(u => u.email === 'demo@xiemi.com')
  
  if (!demoExists) {
    users.push({
      id: 2,
      name: 'Demo User',
      email: 'demo@xiemi.com',
      password: 'demo123',
      phone: '09987654321',
      isAdmin: false,
      createdAt: new Date().toISOString()
    })
  }
  
  localStorage.setItem('users', JSON.stringify(users))
}

// Run initialization
initializeUsers()