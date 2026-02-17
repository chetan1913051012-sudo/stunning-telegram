# 🔒 Security Setup Guide - Homelike Spices

## ⚠️ IMPORTANT: Change Your Admin Password

The default admin password is `admin123` which is **NOT SECURE** for production use.

---

## 🔐 How to Change Admin Password

### Step 1: Locate the File
Open the file: `src/App.tsx`

### Step 2: Find the Password Check
Look for this code (around line 85):
```typescript
const password = prompt('Enter admin password:');
if (password === 'admin123') {
  setIsAdminLoggedIn(true);
  setCurrentPage('admin');
  toast.success('Admin logged in!');
} else {
  toast.error('Invalid password!');
}
```

### Step 3: Change the Password
Replace `'admin123'` with your secure password:
```typescript
const password = prompt('Enter admin password:');
if (password === 'YOUR_SECURE_PASSWORD_HERE') {  // ← Change this
  setIsAdminLoggedIn(true);
  setCurrentPage('admin');
  toast.success('Admin logged in!');
} else {
  toast.error('Invalid password!');
}
```

### Step 4: Save and Rebuild
```bash
npm run build
```

### Step 5: Redeploy
Deploy your updated site to your hosting platform.

---

## 🛡️ Password Best Practices

### Good Password Examples
- `Spices2024!@#`
- `H0mel!ke$p1ces`
- `MySecureP@ss2024`

### Bad Password Examples
- ❌ `admin`
- ❌ `password`
- ❌ `123456`
- ❌ `homelike`

### Password Requirements
- Minimum 10 characters
- Mix of uppercase and lowercase
- Include numbers
- Include special characters (!@#$%^&*)
- Avoid common words
- Don't use personal information

---

## 🔒 Enhanced Security (Optional)

### Option 1: Environment Variables (Recommended)

1. **Create `.env` file** in project root:
```env
VITE_ADMIN_PASSWORD=your_secure_password_here
```

2. **Update `src/App.tsx`**:
```typescript
const password = prompt('Enter admin password:');
if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
  setIsAdminLoggedIn(true);
  setCurrentPage('admin');
  toast.success('Admin logged in!');
} else {
  toast.error('Invalid password!');
}
```

3. **Add to `.gitignore`**:
```
.env
```

4. **Configure in hosting platform**:
   - Netlify: Site settings → Environment variables
   - Vercel: Project settings → Environment Variables
   - Add: `VITE_ADMIN_PASSWORD` = your password

### Option 2: Hashed Password

1. **Generate Hash**:
   - Go to [bcrypt-generator.com](https://bcrypt-generator.com/)
   - Enter your password
   - Copy the hash

2. **Install bcryptjs**:
```bash
npm install bcryptjs
npm install --save-dev @types/bcryptjs
```

3. **Update `src/App.tsx`**:
```typescript
import bcrypt from 'bcryptjs';

const hashedPassword = '$2a$10$...'; // Your generated hash

const password = prompt('Enter admin password:');
if (password && bcrypt.compareSync(password, hashedPassword)) {
  setIsAdminLoggedIn(true);
  setCurrentPage('admin');
  toast.success('Admin logged in!');
} else {
  toast.error('Invalid password!');
}
```

### Option 3: Firebase Authentication

For the most secure solution:

1. **Set up Firebase**:
   - Create Firebase project
   - Enable Email/Password authentication

2. **Install Firebase**:
```bash
npm install firebase
```

3. **Implement Firebase Auth**:
```typescript
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

const handleAdminLogin = async () => {
  const email = prompt('Admin email:');
  const password = prompt('Admin password:');
  
  try {
    await signInWithEmailAndPassword(auth, email, password);
    setIsAdminLoggedIn(true);
    setCurrentPage('admin');
    toast.success('Admin logged in!');
  } catch (error) {
    toast.error('Invalid credentials!');
  }
};
```

---

## 🚨 Security Checklist

### Before Going Live
- [ ] Changed admin password
- [ ] Password is strong (10+ characters)
- [ ] Password not shared with anyone
- [ ] `.env` file in `.gitignore`
- [ ] HTTPS enabled on hosting
- [ ] No sensitive data in code comments
- [ ] Admin email is correct
- [ ] Tested admin login

### Regular Security Tasks
- [ ] Change password every 3 months
- [ ] Review admin access logs
- [ ] Check for suspicious orders
- [ ] Update dependencies monthly
- [ ] Backup data weekly
- [ ] Monitor for security updates

---

## 🔍 Additional Security Measures

### 1. Rate Limiting Login Attempts

Add this to prevent brute force attacks:

```typescript
const [loginAttempts, setLoginAttempts] = useState(0);
const [lockoutTime, setLockoutTime] = useState<number | null>(null);

const handleAdminLogin = () => {
  // Check if locked out
  if (lockoutTime && Date.now() < lockoutTime) {
    const remainingTime = Math.ceil((lockoutTime - Date.now()) / 1000);
    toast.error(`Too many attempts. Try again in ${remainingTime} seconds`);
    return;
  }

  const password = prompt('Enter admin password:');
  
  if (password === 'YOUR_SECURE_PASSWORD') {
    setIsAdminLoggedIn(true);
    setCurrentPage('admin');
    setLoginAttempts(0);
    toast.success('Admin logged in!');
  } else {
    const newAttempts = loginAttempts + 1;
    setLoginAttempts(newAttempts);
    
    if (newAttempts >= 3) {
      // Lock out for 5 minutes
      setLockoutTime(Date.now() + 5 * 60 * 1000);
      toast.error('Too many failed attempts. Locked for 5 minutes.');
    } else {
      toast.error(`Invalid password! ${3 - newAttempts} attempts remaining`);
    }
  }
};
```

### 2. Session Timeout

Auto-logout after inactivity:

```typescript
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

useEffect(() => {
  if (!isAdminLoggedIn) return;

  let timeoutId: NodeJS.Timeout;

  const resetTimer = () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setIsAdminLoggedIn(false);
      setCurrentPage('home');
      toast.info('Session expired. Please login again.');
    }, SESSION_TIMEOUT);
  };

  // Reset timer on user activity
  window.addEventListener('mousemove', resetTimer);
  window.addEventListener('keypress', resetTimer);
  
  resetTimer(); // Start timer

  return () => {
    if (timeoutId) clearTimeout(timeoutId);
    window.removeEventListener('mousemove', resetTimer);
    window.removeEventListener('keypress', resetTimer);
  };
}, [isAdminLoggedIn]);
```

### 3. Secure Data Storage

Instead of plain localStorage:

```typescript
// Encrypt data before storing
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-encryption-key';

const secureStorage = {
  setItem: (key: string, value: any) => {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(value), 
      SECRET_KEY
    ).toString();
    localStorage.setItem(key, encrypted);
  },
  
  getItem: (key: string) => {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;
    
    try {
      const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
      return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    } catch {
      return null;
    }
  }
};

// Use it
secureStorage.setItem('homelike_orders', orders);
const savedOrders = secureStorage.getItem('homelike_orders');
```

---

## 🌐 HTTPS Configuration

### Why HTTPS is Important
- Encrypts data between user and server
- Protects passwords
- Required for payment processing
- Builds customer trust
- Better SEO rankings

### How to Enable

Most hosting platforms provide free HTTPS automatically:

**Netlify**:
- Automatic HTTPS with Let's Encrypt
- No configuration needed

**Vercel**:
- Automatic HTTPS
- No configuration needed

**Firebase**:
- Automatic HTTPS
- No configuration needed

**Custom Server**:
```bash
# Using Certbot for Let's Encrypt
sudo apt-get install certbot
sudo certbot --nginx -d yourdomain.com
```

---

## 📱 Two-Factor Authentication (Advanced)

For maximum security, implement 2FA:

1. **Install packages**:
```bash
npm install speakeasy qrcode
```

2. **Generate secret**:
```typescript
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

const secret = speakeasy.generateSecret({
  name: 'Homelike Spices Admin'
});

// Generate QR code
QRCode.toDataURL(secret.otpauth_url, (err, dataUrl) => {
  // Display QR code for user to scan with authenticator app
});
```

3. **Verify token**:
```typescript
const token = prompt('Enter 2FA code:');
const verified = speakeasy.totp.verify({
  secret: secret.base32,
  encoding: 'base32',
  token: token
});
```

---

## 🔐 Security Headers

Add these headers to your hosting configuration:

```
# For Netlify (_headers file)
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'
```

---

## 📊 Security Monitoring

### What to Monitor
1. Failed login attempts
2. Unusual order patterns
3. Large orders from new accounts
4. Multiple orders from same IP
5. Invalid email addresses

### Logging Example
```typescript
const logSecurityEvent = (event: string, details: any) => {
  const log = {
    timestamp: new Date().toISOString(),
    event,
    details,
    userAgent: navigator.userAgent,
    ip: 'server-side-required' // Use backend for real IP
  };
  
  // Store logs
  const logs = JSON.parse(localStorage.getItem('security_logs') || '[]');
  logs.push(log);
  localStorage.setItem('security_logs', JSON.stringify(logs));
  
  // Alert on suspicious activity
  if (event === 'failed_login' && logs.filter(l => l.event === 'failed_login').length > 5) {
    // Send alert to admin
    console.warn('Multiple failed login attempts detected!');
  }
};
```

---

## 🆘 If Your Account is Compromised

### Immediate Actions
1. **Change password immediately**
2. **Check all orders** for suspicious activity
3. **Review product changes**
4. **Check email settings**
5. **Clear all admin sessions**
6. **Enable additional security measures**
7. **Notify customers if needed**

### Prevention
- Never share admin password
- Use strong, unique password
- Enable 2FA if possible
- Keep software updated
- Use HTTPS always
- Regular security audits

---

## 📞 Support & Resources

### Security Tools
- [Bcrypt Generator](https://bcrypt-generator.com/)
- [Password Strength Checker](https://howsecureismypassword.net/)
- [HTTPS Checker](https://www.sslshopper.com/ssl-checker.html)

### Learning Resources
- [OWASP Security Guide](https://owasp.org/)
- [Web Security Academy](https://portswigger.net/web-security)
- [Google Security Blog](https://security.googleblog.com/)

---

## ✅ Final Security Checklist

Before going live, ensure:

- [ ] Admin password changed from default
- [ ] Password meets security requirements
- [ ] HTTPS enabled on production site
- [ ] Environment variables configured (if used)
- [ ] `.env` file not committed to Git
- [ ] No sensitive data in code
- [ ] Session timeout implemented (optional)
- [ ] Rate limiting on login (optional)
- [ ] Security headers configured
- [ ] Monitoring system in place
- [ ] Backup system established
- [ ] Recovery plan documented

---

## 🎯 Remember

**Security is not a one-time task—it's an ongoing process!**

- Review security monthly
- Update dependencies regularly
- Stay informed about security threats
- Always use strong passwords
- Never share credentials
- Keep backups

---

**Stay Secure! 🔒**

Your customers trust you with their data. Protect it well!
