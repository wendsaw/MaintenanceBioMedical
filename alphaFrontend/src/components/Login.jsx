import React, { useState } from 'react';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const response = await fetch('https://your-api.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Connexion réussie ✅');
        // Optionally store a token or redirect
        // localStorage.setItem('token', data.token);
      } else {
        setMessage(data.error || 'Email ou mot de passe incorrect.');
      }
    } catch (error) {
      setMessage('Erreur de connexion. Vérifiez votre réseau.');
    }
  };

  return (
    <div className="connexion-container">
      <h2>Connexion</h2>
      <form onSubmit={handleLogin} className="connexion-form">
        <label>Email</label>
        <input
          type="email"
          placeholder="exemple@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Mot de passe</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Se connecter</button>
      </form>
      {message && <p className="connexion-message">{message}</p>}
    </div>
  );
};

export default Login;
