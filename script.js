
document.addEventListener('DOMContentLoaded', function() {
    // Update current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Check authentication state (using localStorage for demo)
    function isAuthenticated() {
      return localStorage.getItem('gmuAuth') === 'true';
    }
    
    function getCurrentUser() {
      return JSON.parse(localStorage.getItem('gmuUser') || '{}');
    }
    
    // Update navigation links based on authentication
    function updateNavLinks() {
      const navLinksContainer = document.getElementById('navLinks');
      if (!navLinksContainer) return;
      
      navLinksContainer.innerHTML = '';
      
      if (isAuthenticated()) {
        const user = getCurrentUser();
        const userNameSpan = document.createElement('span');
        userNameSpan.className = 'hidden md:inline';
        userNameSpan.textContent = `Welcome, ${user.name || 'User'}`;
        
        const dashboardLink = document.createElement('a');
        dashboardLink.href = './dashboard.html';
        dashboardLink.className = 'px-4 py-2 bg-transparent border border-[#FFCC33] text-[#FFCC33] rounded hover:bg-[#FFCC33]/10 transition-colors';
        dashboardLink.textContent = 'Dashboard';
        
        const logoutButton = document.createElement('button');
        logoutButton.className = 'text-white hover:text-[#FFCC33] transition-colors';
        logoutButton.textContent = 'Logout';
        logoutButton.addEventListener('click', logout);
        
        navLinksContainer.appendChild(userNameSpan);
        navLinksContainer.appendChild(dashboardLink);
        navLinksContainer.appendChild(logoutButton);
      } else {
        const loginLink = document.createElement('a');
        loginLink.href = './login.html';
        loginLink.className = 'px-4 py-2 bg-transparent border border-[#FFCC33] text-[#FFCC33] rounded hover:bg-[#FFCC33]/10 transition-colors';
        loginLink.textContent = 'Login';
        
        const registerLink = document.createElement('a');
        registerLink.href = './register.html';
        registerLink.className = 'px-4 py-2 bg-[#FFCC33] text-[#046A38] rounded hover:bg-[#FFCC33]/90 transition-colors';
        registerLink.textContent = 'Register';
        
        navLinksContainer.appendChild(loginLink);
        navLinksContainer.appendChild(registerLink);
      }
    }
    
    // Update hero buttons based on authentication
    function updateHeroButtons() {
      const heroButtonsContainer = document.getElementById('heroButtons');
      if (!heroButtonsContainer) return;
      
      heroButtonsContainer.innerHTML = '';
      
      if (isAuthenticated()) {
        const dashboardButton = document.createElement('a');
        dashboardButton.href = './dashboard.html';
        dashboardButton.className = 'bg-[#FFCC33] text-[#046A38] hover:bg-[#FFCC33]/90 text-lg px-8 py-6 rounded';
        dashboardButton.textContent = 'Go to Dashboard';
        
        heroButtonsContainer.appendChild(dashboardButton);
      } else {
        const loginButton = document.createElement('a');
        loginButton.href = './login.html';
        loginButton.className = 'bg-[#FFCC33] text-[#046A38] hover:bg-[#FFCC33]/90 text-lg px-8 py-6 rounded w-full sm:w-auto';
        loginButton.textContent = 'Login';
        
        const registerButton = document.createElement('a');
        registerButton.href = './register.html';
        registerButton.className = 'border border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded w-full sm:w-auto';
        registerButton.textContent = 'Sign Up Now';
        
        heroButtonsContainer.appendChild(loginButton);
        heroButtonsContainer.appendChild(registerButton);
      }
    }
    
    // Update CTA buttons based on authentication
    function updateCTAButtons() {
      const ctaButtonsContainer = document.getElementById('ctaButtons');
      if (!ctaButtonsContainer) return;
      
      ctaButtonsContainer.innerHTML = '';
      
      if (isAuthenticated()) {
        const dashboardButton = document.createElement('a');
        dashboardButton.href = './dashboard.html';
        dashboardButton.className = 'bg-[#046A38] text-white hover:bg-[#046A38]/90 text-lg px-6 py-3 rounded';
        dashboardButton.textContent = 'Go to Dashboard';
        
        ctaButtonsContainer.appendChild(dashboardButton);
      } else {
        const loginButton = document.createElement('a');
        loginButton.href = './login.html';
        loginButton.className = 'bg-[#046A38] text-white hover:bg-[#046A38]/90 text-lg px-6 py-3 rounded w-full sm:w-auto';
        loginButton.textContent = 'Login';
        
        const registerButton = document.createElement('a');
        registerButton.href = './register.html';
        registerButton.className = 'border border-[#046A38] text-[#046A38] hover:bg-[#046A38]/10 text-lg px-6 py-3 rounded w-full sm:w-auto';
        registerButton.textContent = 'Sign Up Now';
        
        ctaButtonsContainer.appendChild(loginButton);
        ctaButtonsContainer.appendChild(registerButton);
      }
    }
    
    // Login function
    window.login = function(email, password) {
      // This is a mock login - in a real app, you would call an API
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email && password) {
            // Mock users for demo
            const users = {
              'student@gmu.edu': { name: 'Student User', role: 'student' },
              'faculty@gmu.edu': { name: 'Faculty Member', role: 'faculty' },
              'admin@gmu.edu': { name: 'Admin User', role: 'admin' }
            };
            
            if (users[email] && password === 'password') {
              localStorage.setItem('gmuAuth', 'true');
              localStorage.setItem('gmuUser', JSON.stringify({
                email,
                ...users[email]
              }));
              showToast('Login successful!', 'success');
              resolve();
            } else {
              showToast('Invalid credentials', 'error');
              reject(new Error('Invalid credentials'));
            }
          } else {
            showToast('Please fill all fields', 'error');
            reject(new Error('Please fill all fields'));
          }
        }, 500);
      });
    };
    
    // Register function
    window.register = function(userData) {
      // This is a mock registration - in a real app, you would call an API
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (userData.email && userData.password && userData.name) {
            localStorage.setItem('gmuAuth', 'true');
            localStorage.setItem('gmuUser', JSON.stringify({
              ...userData
            }));
            showToast('Registration successful!', 'success');
            resolve();
          } else {
            showToast('Please fill all required fields', 'error');
            reject(new Error('Please fill all required fields'));
          }
        }, 500);
      });
    };
    
    // Logout function
    function logout() {
      localStorage.removeItem('gmuAuth');
      localStorage.removeItem('gmuUser');
      showToast('Logged out successfully', 'info');
      window.location.href = './index.html';
    }
    
    window.logout = logout;
    
    // Show toast notification
    function showToast(message, type = 'info') {
      // Remove existing toasts
      const existingToasts = document.querySelectorAll('.toast');
      existingToasts.forEach(toast => toast.remove());
      
      // Create new toast
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.textContent = message;
      
      document.body.appendChild(toast);
      
      // Show toast
      setTimeout(() => {
        toast.classList.add('show');
      }, 10);
      
      // Auto hide after 3 seconds
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
          toast.remove();
        }, 300);
      }, 3000);
    }
    
    window.showToast = showToast;
    
    // Initialize page
    updateNavLinks();
    updateHeroButtons();
    updateCTAButtons();
    
    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.email.value;
        const password = this.password.value;
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Logging in...';
        submitButton.disabled = true;
        
        login(email, password)
          .then(() => {
            window.location.href = './dashboard.html';
          })
          .catch(() => {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
          });
      });
    }
    
    // Handle register form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userData = {
          name: this.name.value,
          email: this.email.value,
          password: this.password.value,
          role: this.role.value
        };
        
        // Add role-specific fields
        if (userData.role === 'student') {
          userData.studentId = this.studentId?.value || '';
          userData.department = this.department?.value || '';
        } else if (userData.role === 'faculty') {
          userData.facultyId = this.facultyId?.value || '';
          userData.department = this.department?.value || '';
        }
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Registering...';
        submitButton.disabled = true;
        
        // Validate passwords match
        if (this.password.value !== this.confirmPassword.value) {
          showToast('Passwords do not match', 'error');
          submitButton.textContent = originalButtonText;
          submitButton.disabled = false;
          return;
        }
        
        register(userData)
          .then(() => {
            window.location.href = './dashboard.html';
          })
          .catch(() => {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
          });
      });
      
      // Handle role change to show/hide fields
      const roleSelect = registerForm.querySelector('#role');
      if (roleSelect) {
        roleSelect.addEventListener('change', function() {
          const studentFields = document.getElementById('student-fields');
          const facultyFields = document.getElementById('faculty-fields');
          const departmentField = document.getElementById('department-field');
          
          if (this.value === 'student') {
            studentFields.style.display = 'block';
            facultyFields.style.display = 'none';
            departmentField.style.display = 'block';
          } else if (this.value === 'faculty') {
            studentFields.style.display = 'none';
            facultyFields.style.display = 'block';
            departmentField.style.display = 'block';
          } else {
            studentFields.style.display = 'none';
            facultyFields.style.display = 'none';
            departmentField.style.display = 'none';
          }
        });
      }
    }
  });
  