import React, { useState } from 'react';

function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // الآن يمكنك استخدام fullName و email و password هنا لإرسالها إلى خادم API للتسجيل
  };

  return (
    <div className="register">
      <h1>تسجيل جديد</h1>
      <form onSubmit={handleSubmit}>
        <label>
          الاسم الكامل:
          <input
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
        </label>
        <label>
          البريد الإلكتروني:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          كلمة السر:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit">تسجيل</button>
      </form>
    </div>
  );
}

export default Register;