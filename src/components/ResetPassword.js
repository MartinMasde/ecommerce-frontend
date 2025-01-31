// import React, { useState } from "react";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

// function ResetPassword() {
//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState("");
//   const [resetCode, setResetCode] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const navigate = useNavigate();

//   // Función para enviar la solicitud de codigo de reset
//   const handleRequestReset = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch("http://localhost:8080/api/sessions/password-reset/request", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });
//       const result = await response.json();
//       if (response.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Check your email!",
//           text: "We have sent a reset code to your email address.",
//         });
//         setStep(2);
//       } else {
//         throw new Error(result.error || "Failed to send reset code.");
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error.message,
//       });
//     }
//   };

//   // Función para enviar la solicitud de cambio de contraseña
//   const handleResetPassword = async (event) => {
//     event.preventDefault();  
//     try {
//       const response = await fetch('http://localhost:8080/api/sessions/password-reset/verify', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email,
//           resetCode,
//           newPassword,
//         }),
//       });
  
//       const result = await response.json();  // Obtener la respuesta en formato JSON
  
//       if (response.ok) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Password Changed',
//           text: 'Your password has been updated successfully!',
//         });
//         navigate('/login');
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Failed',
//           text: result.message || 'Failed to reset the password.',
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: error.message || 'An unexpected error occurred.',
//       });
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
//       <div className="card p-4 shadow" style={{ width: "400px" }}>
//         {step === 1 && (
//           <form onSubmit={handleRequestReset}>
//             <h3>Reset Password</h3>
//             <div className="mb-3">
//               <label>Email</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <button className="btn btn-primary w-100">Send Reset Code</button>
//           </form>
//         )}

//         {step === 2 && (
//           <form onSubmit={handleResetPassword}>
//             <h3>Enter Reset Code</h3>
//             <div className="mb-3">
//               <label>Reset Code</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter the code sent to your email"
//                 value={resetCode}
//                 onChange={(e) => setResetCode(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label>New Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 placeholder="Enter a new password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <button className="btn btn-primary w-100">Reset Password</button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ResetPassword;

// import React, { useState } from "react";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

// function ResetPassword() {
//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState("");
//   const [resetCode, setResetCode] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false); // Estado para la animación de carga
//   const navigate = useNavigate();

//   // Función para enviar la solicitud de código de reseteo
//   const handleRequestReset = async (event) => {
//     event.preventDefault();
//     setIsLoading(true); // Mostrar animación de carga
//     try {
//       const response = await fetch(
//         "http://localhost:8080/api/sessions/password-reset/request",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email }),
//         }
//       );
//       const result = await response.json();
//       setIsLoading(false); // Ocultar animación de carga
//       if (response.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Check your email!",
//           text: "We have sent a reset code to your email address.",
//         });
//         setStep(2);
//       } else {
//         throw new Error(result.error || "Failed to send reset code.");
//       }
//     } catch (error) {
//       setIsLoading(false); // Ocultar animación de carga en caso de error
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error.message,
//       });
//     }
//   };

//   // Función para enviar la solicitud de cambio de contraseña
//   const handleResetPassword = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch(
//         "http://localhost:8080/api/sessions/password-reset/verify",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email,
//             resetCode,
//             newPassword,
//           }),
//         }
//       );

//       const result = await response.json();

//       if (response.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Password Changed",
//           text: "Your password has been updated successfully!",
//         });
//         navigate("/login");
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Failed",
//           text: result.message || "Failed to reset the password.",
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error.message || "An unexpected error occurred.",
//       });
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
//       <div className="card p-4 shadow" style={{ width: "400px" }}>
//         {isLoading ? (
//           // Animación de carga
//           <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//           </div>
//         ) : (
//           <>
//             {step === 1 && (
//               <form onSubmit={handleRequestReset}>
//                 <h3>Reset Password</h3>
//                 <div className="mb-3">
//                   <label>Email</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <button className="btn btn-primary w-100">Send Reset Code</button>
//               </form>
//             )}

//             {step === 2 && (
//               <form onSubmit={handleResetPassword}>
//                 <h3>Enter Reset Code</h3>
//                 <div className="mb-3">
//                   <label>Reset Code</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter the code sent to your email"
//                     value={resetCode}
//                     onChange={(e) => setResetCode(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label>New Password</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     placeholder="Enter a new password"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <button className="btn btn-primary w-100">Reset Password</button>
//               </form>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ResetPassword;


import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/background.jpg"; // Usa el mismo fondo que en Login

function ResetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Estado para la animación de carga
  const navigate = useNavigate();

  const handleRequestReset = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8080/api/sessions/password-reset/request",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const result = await response.json();
      setIsLoading(false);
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Check your email!",
          text: "We have sent a reset code to your email address.",
        });
        setStep(2);
      } else {
        throw new Error(result.error || "Failed to send reset code.");
      }
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/api/sessions/password-reset/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            resetCode,
            newPassword,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Password Changed",
          text: "Your password has been updated successfully!",
        });
        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: result.message || "Failed to reset the password.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "An unexpected error occurred.",
      });
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="card p-4 shadow"
        style={{
          width: "400px",
          backgroundColor: "#1b1b1b",
          color: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {step === 1 && (
              <form onSubmit={handleRequestReset}>
                <h3
                  className="text-center mb-4"
                  style={{
                    fontWeight: "bold",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  Reset Password
                </h3>
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button className="btn btn-primary w-100">Send Reset Code</button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleResetPassword}>
                <h3
                  className="text-center mb-4"
                  style={{
                    fontWeight: "bold",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  Enter Reset Code
                </h3>
                <div className="mb-3">
                  <label>Reset Code</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the code sent to your email"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter a new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <button className="btn btn-primary w-100">Reset Password</button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;