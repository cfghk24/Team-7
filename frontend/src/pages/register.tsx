import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import Next.js Router

const Register: React.FC = () => {
  // State variables for form fields
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('Parent');

  const router = useRouter(); // Initialize useRouter for navigation

  // Form submission handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = { firstName, lastName, username, email, password, role };

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.push('/'); // Redirect to home page after successful registration
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        
        {/* First Name Field */}
        <div style={styles.formGroup}>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        {/* Last Name Field */}
        <div style={styles.formGroup}>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        {/* Username Field */}
        <div style={styles.formGroup}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        {/* Email Field */}
        <div style={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        {/* Password Field */}
        <div style={styles.formGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        {/* Role Selection */}
        <div style={styles.formGroup}>
          <label>Select Role:</label>
          <div>
            <input
              type="radio"
              id="parent"
              name="role"
              value="Parent"
              checked={role === 'Parent'}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="parent">Parent</label>
          </div>
          <div>
            <input
              type="radio"
              id="student"
              name="role"
              value="Student"
              checked={role === 'Student'}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="student">Student</label>
          </div>
          <div>
            <input
              type="radio"
              id="public"
              name="role"
              value="Public"
              checked={role === 'Public'}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="public">Public</label>
          </div>
        </div>

        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
};

// Styles for the component
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '90%',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxSizing: 'border-box',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '1.5em',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginTop: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1em',
  },
  button: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1em',
  },
};

export default Register;