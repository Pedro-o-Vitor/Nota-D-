import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [page, setPage] = useState('login');
  const [form, setForm] = useState({ email: '', password: '', username: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCadastro = (e) => {
    e.preventDefault();
    const { username, email, password } = form;
    if (!username || !email || !password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    localStorage.setItem('Username', username);
    localStorage.setItem('emailCadastrado', email);
    localStorage.setItem('senhaCadastrada', password);
    alert('Cadastro realizado com sucesso!');
    setPage('login');
    setForm({ email: '', password: '', username: '' }); // Reset form after registration
    // Clear input fields explicitly to ensure no autofill
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const emailCadastrado = localStorage.getItem('emailCadastrado');
    const senhaCadastrada = localStorage.getItem('senhaCadastrada');
    const Username = localStorage.getItem('Username');

    if (!emailCadastrado || !senhaCadastrada) {
      alert('Nenhum usuário cadastrado. Por favor, cadastre-se primeiro.');
      return;
    }

    if (form.email === emailCadastrado && form.password === senhaCadastrada) {
      alert(`Bem-vindo, ${Username || 'usuário'}! Login bem-sucedido.`);
      navigate('/home');
    } else {
      alert('Email ou senha incorretos. Tente novamente.');
    }
  };

  return (
    <div style={styles.body}>
      {page === 'login' ? (
        <div style={styles.loginForm}>
          <h1 style={styles.h1}>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Digite seu email"
              onChange={handleChange}
              autoComplete="off"
              style={styles.input}
            />
            <input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              onChange={handleChange}
              autoComplete="new-password"
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Entrar</button>
            <button type="button" onClick={() => setPage('cadastro')} style={styles.button}>Cadastrar</button>
          </form>
        </div>
      ) : (
        <div style={styles.loginForm}>
          <h1 style={styles.h1}>Cadastro</h1>
          <form onSubmit={handleCadastro}>
            <input
              type="text"
              name="username"
              placeholder="Digite seu nome de usuário"
              onChange={handleChange}
              autoComplete="off"
              style={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Digite seu email"
              onChange={handleChange}
              autoComplete="off"
              style={styles.input}
            />
            <input
              type="password"
              name="password"
              placeholder="Sua senha"
              onChange={handleChange}
              autoComplete="new-password"
              style={styles.input}
            />
            <input type="submit" value="Criar conta" style={styles.submitInput} />
            <p>
              Já tem uma conta?{' '}
              <button type="button" onClick={() => setPage('login')} style={styles.linkButton}>
                Voltar ao login
              </button>
            </p>
          </form>
        </div>
      )}
    </div>
  );
}

const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#000000',
    display: 'flex',
    alignItems: 'center',
    height: '100vh',
    margin: 0,
    color: '#ffffff',
    justifyContent: 'center',
    paddingRight: '40px',
  },
  loginForm: {
    backgroundColor: 'transparent',
    padding: '50px',
    borderRadius: '12px',
    border: '2px solid #1E1E1E',
    boxShadow: '0 0 20px #1E1E1E',
    textAlign: 'center',
    width: '250px',
    margin: '250px',
  },
  input: {
    width: '80%',
    padding: '12px',
    margin: '10px 0',
    backgroundColor: 'transparent',
    border: '2px solid  #FFFFFF',
    borderRadius: '8px',
    color: 'white',
    outline: 'none',
    fontFamily:"Roboto"
    },
  submitInput: {
    backgroundColor: '#white',
    color: '#000000',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s ease',
    boxShadow: '0 0 10px #white, 0 0 20px white',
    width: '80%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '8px',
    border: 'none',
  },
  h1: {
    textAlign: 'center',
    color: 'white',
  },
  button: {
    backgroundColor: '#1E1E1E',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s ease',
    margin: '10px',
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: 'blue',
    textDecoration: 'underline',
    cursor: 'pointer',
    padding: 0,
    font: 'inherit',
  },
};
