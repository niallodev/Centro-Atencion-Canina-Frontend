import { useState } from 'react';
import { login } from '../../services/authService';

export default function Login() {
  const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      alert('Login exitoso');
      // Aquí podrías redirigir, actualizar contexto o estado global
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  const styles = {
  container: {
    // height: "100vh",
    // display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // background: "linear-gradient(to top, #330066, #993399, #660066)",
    // backgroundImage:"url('../logo.jpg'), linear-gradient(to top, #330066, #993399, #660066)",
    backgroundImage:"url('https://www.superpet.ec/wp-content/uploads/2021/06/husky-2.jpg.webp')",
    // backgroundImage:"url('../../assets/logo.jpg)",
    backgroundBlendMode: "overlay",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  form: {
    background: "rgba(255, 255, 255, 0.1)",
    padding: "30px 40px",
    borderRadius: 10,
    boxShadow: "0 0 20px rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(10px)",
    color: "white",
    minWidth: 320,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    margin: "8px 0",
    borderRadius: 20,
    border: "none",
    outline: "none",
    fontSize: 16,
  },
  options: {
    // display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "10px 0 20px",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: 20,
    border: "none",
    backgroundColor: "white",
    color: "#660066",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 16,
  },
};

  return (
    <div style={styles.container}>
        <form style={styles.form} onSubmit={handleSubmit}>
            <h2 style={{ marginBottom: "20px" }}>Login</h2>
            
            <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {}}
            style={styles.input}
            required
            />
             <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {}}
            style={styles.input}
            required
            />
            <div style={styles.options}>
                <label style={{ color: "white", fontSize: 14 }}>
                    <input
                    type="checkbox"
                    checked={remember}
                    onChange={() => {}}
                    style={{ marginRight: 8 }}
                    />
                    Remember me
                </label>
                <a href="#" style={{ color: "#bbb", fontSize: 14, textDecoration: "none" }}>
                    Forgot password?
                </a>
            </div>
            {/* {error && <p style={{color: 'red'}}>{error}</p>} */}
            <button type="submit" style={styles.button}>
                Login
            </button>

            <p style={{ color: "white", fontSize: 14, marginTop: 20 }}>
                Don't have an account?{" "}
            <a href="#" style={{ color: "white", fontWeight: "bold", textDecoration: "none" }}>
                Register
            </a>
         </p>
        </form>
    </div>
    
  );
}




// import React, { useState } from "react";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [remember, setRemember] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Aquí iría la lógica de login
//     alert(`Username: ${username}\nPassword: ${password}\nRemember me: ${remember}`);
//   };

//   return (
//     <div style={styles.container}>
//       <form style={styles.form} onSubmit={handleSubmit}>
//         <h2 style={{ marginBottom: "20px" }}>Login</h2>

//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           style={styles.input}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={styles.input}
//           required
//         />

//         <div style={styles.options}>
//           <label style={{ color: "white", fontSize: 14 }}>
//             <input
//               type="checkbox"
//               checked={remember}
//               onChange={() => setRemember(!remember)}
//               style={{ marginRight: 8 }}
//             />
//             Remember me
//           </label>
//           <a href="#" style={{ color: "#bbb", fontSize: 14, textDecoration: "none" }}>
//             Forgot password?
//           </a>
//         </div>

//         <button type="submit" style={styles.button}>
//           Login
//         </button>

//         <p style={{ color: "white", fontSize: 14, marginTop: 20 }}>
//           Don't have an account?{" "}
//           <a href="#" style={{ color: "white", fontWeight: "bold", textDecoration: "none" }}>
//             Register
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// };




