import React, { useState, useEffect } from 'react';
import styles from './AuthForm.module.css';
import { login, register } from '../../api/axios';

interface Props {
  onAuthSuccess: (username: string) => void;
}

const AuthForm = ({ onAuthSuccess }: Props) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Validation states
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Touched states
  const [touchedUsername, setTouchedUsername] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate fields on change
  useEffect(() => {
    if (touchedUsername) {
      setUsernameError(
        username.trim().length < 3 ? 'Username must be at least 3 characters' : ''
      );
    }

    if (touchedEmail && !isLogin) {
      setEmailError(!emailRegex.test(email) ? 'Invalid email address' : '');
    }

    if (touchedPassword) {
      setPasswordError(
        password.length < 6 ? 'Password must be at least 6 characters' : ''
      );
    }
  }, [username, email, password, isLogin, touchedUsername, touchedEmail, touchedPassword]);


    useEffect(() => {
    setTouchedUsername(false);
    setTouchedEmail(false);
    setTouchedPassword(false);
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
  }, [isLogin]);

  const isFormValid = () => {
    if (isLogin) {
      return !usernameError && !passwordError && username && password;
    }
    return !usernameError && !emailError && !passwordError && username && email && password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    try {
      if (isLogin) {
        await login({ username, password });
      } else {
        await register({ username, email, password });
      }
      onAuthSuccess(username);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} aria-label={isLogin ? 'Login form' : 'Registration form'}>
      <h2 className={styles.title}>{isLogin ? 'Login' : 'Register'}</h2>

      <label htmlFor="username" className={styles.label}>Username</label>
      <input
        id="username"
        name="username"
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className={styles.input}
        required
        aria-required="true"
        aria-describedby="username-error"
        data-testid="username-input"
        onBlur={() => setTouchedUsername(true)}
      />
        <div id="username-error" className={styles.validationError} role="alert" data-testid="username-error">
          {usernameError && usernameError}
        </div>

      {!isLogin && (
        <>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={styles.input}
            required
            aria-required="true"
            aria-describedby="email-error"
            data-testid="email-input"
            onBlur={() => setTouchedEmail(true)}
          />
            <div id="email-error" className={styles.validationError} role="alert" data-testid="email-error">
              {emailError && emailError}
            </div>
        </>
      )}

      <label htmlFor="password" className={styles.label}>Password</label>
      <input
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className={styles.input}
        required
        aria-required="true"
        aria-describedby="password-error"
        onBlur={() => setTouchedPassword(true)}
        data-testid="password-input"
      />
        <div id="password-error" className={styles.validationError} role="alert" data-testid="password-error">
          {passwordError && passwordError}
        </div>

      {error && <div className={styles.error} role="alert" data-testid="error-message">{error}</div>}

      <button
        type="submit"
        className={styles.button}
        data-testid="submit-button"
        disabled={!isFormValid()}
        aria-disabled={!isFormValid()}
      >
        {isLogin ? 'Login' : 'Register'}
      </button>

      <p className={styles.switchText}>
        {isLogin ? "Don't have an account?" : 'Already registered?'}{' '}
        <button
          type="button"
          className={styles.switchButton}
          onClick={() => setIsLogin(!isLogin)}
          aria-label={isLogin ? 'Switch to Register' : 'Switch to Login'}
          data-testid="switch-mode-button"
        >
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </form>
  );
};

export default AuthForm;
