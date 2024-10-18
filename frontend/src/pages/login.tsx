import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter for navigation

const Login: React.FC = () => {
  // State variables for form fields
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null); // Error message handling

  const router = useRouter(); // Initialize useRouter for navigation

  // Form submission handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Prepare form data
    const loginData = { username, password };

    // Simulate API call to authenticate user
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    if (response.ok) {
      router.push('/'); // Redirect to home page after successful login
    } else {
      const data = await response.json();
      setError(data.message); // Show error message
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        
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

        {/* Error Message Display */}
        {error && <div style={styles.error}>{error}</div>}

        {/* Submit Button */}
        <button type="submit" style={styles.button}>Login</button>
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
  error: {
    color: 'red',
    marginBottom: '15px',
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

export default Login;