import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../Alerts/Alert";
import logo from "../../assets/logo.png";

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [alert, setAlert] = useState({ message: "", type: "error" });
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return (
            password.length >= minLength &&
            hasUpperCase &&
            hasLowerCase &&
            hasNumber &&
            hasSpecialChar
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Le mot de passe et sa confirmation doivent être identiques");
            return false;
        }

        if (!validatePassword(password)) {
            setMessage(
                `Le mot de passe doit avoir une longueur minimum de 8 caractères et contenir les caractères suivants : 
                une majuscule, une minuscule, un chiffre et un caractère spécial`
            );
            return false;
        }

        try {
            const response = await fetch("http://localhost:8000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ firstName, lastName, email, password, confirmPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                setAlert({
                    message: "Inscription réussie. Vous allez être redirigé vers la page de connexion",
                    type: "success",
                });
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            } else {
                setAlert({
                    message: data.message || "Une erreur s'est produite lors de l'inscription. Veuillez réessayer plus tard",
                    type: "error",
                });
            }
        } catch (error) {
            setAlert({
                message: "Une erreur s'est produite lors de l'inscription. Veuillez réessayer plus tard",
                type: "error",
            });
        }
    };

    return (
        <div className="flex items-center justify-center overflow-hidden">
            <div className="max-w-md w-full mx-auto p-8 rounded-lg mb-16">
                <div className="flex items-center justify-center py-16">
                    <img src={logo} alt="Logo de l'application" className="w-64 h-64" />
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-wrap -mx-24">
                        <div className="w-full md:w-1/2 px-2 mb-4">
                            <div className="relative">
                                <svg className="absolute top-4 ml-3" width="24" viewBox="0 0 24 24" aria-hidden="true"></svg>
                                <input
                                    placeholder="Prénom"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="bg-[#F0E9D7]/90 pl-12 py-2 md:py-4 focus:outline-none w-full rounded"
                                    required
                                    aria-label="Prénom"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 px-2 mb-4">
                            <div className="relative">
                                <svg className="absolute top-4 ml-3" width="24" viewBox="0 0 24 24" aria-hidden="true"></svg>
                                <input
                                    placeholder="Nom"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="bg-[#F0E9D7]/90 pl-12 py-2 md:py-4 focus:outline-none w-full rounded"
                                    required
                                    aria-label="Nom"
                                />
                            </div>
                        </div>
                        <div className="w-full px-2 mb-4">
                            <div className="relative">
                                <svg className="absolute top-5 ml-3" width="24" viewBox="0 0 8 6" aria-hidden="true"></svg>
                                <input
                                    placeholder="E-mail"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-[#F0E9D7]/90 pl-12 py-2 md:py-4 focus:outline-none w-full rounded"
                                    required
                                    aria-label="Adresse e-mail"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 px-2 mb-4">
                            <div className="relative">
                                <svg className="absolute top-4 ml-3" width="24" viewBox="0 0 24 24" aria-hidden="true"></svg>
                                <input
                                    placeholder="Mot de passe"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-[#F0E9D7]/90 pl-12 py-2 md:py-4 focus:outline-none w-full rounded"
                                    required
                                    aria-label="Mot de passe"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 px-2 mb-4">
                            <div className="relative">
                                <svg className="absolute ml-3 top-4" width="24" viewBox="0 0 24 24" aria-hidden="true"></svg>
                                <input
                                    placeholder="Confirmer le mot de passe"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="bg-[#F0E9D7]/90 pl-12 py-2 md:py-4 focus:outline-none w-full rounded"
                                    required
                                    aria-label="Confirmer le mot de passe"
                                />
                            </div>
                        </div>
                    </div>
                    {message && <p className="text-red-600">{message}</p>}
                    <button
                        type="submit"
                        className="w-full bg-white text-[#EEB829] py-4 px-4 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        aria-label="Créer un compte"
                    >
                        S'inscrire
                    </button>
                </form>
                <Alert message={alert.message} type={alert.type} />
            </div>
        </div>
    );
}

export default Register;
