import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";


const UserCard = ({ user }) => {
    const getRoleLabel = () => {
        if (user?.roles.includes('ROLE_ADMIN')) {
            return 'Administrateur';
        } else {
            return 'Utilisateur';
        }
    };

    const { isDark } = useTheme();

    const cardBg = isDark ? "bg-slate-600" : "bg-white";
    const textColor = isDark ? "text-slate-200" : "text-black";
    const iconColor = isDark ? "text-gray-300" : "text-gray-500";

    return (
        <div className="flex flex-col items-center p-6">
            {user && (
                <div className={`shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center ${cardBg}`}>
                    <div className="mb-4">
                        <FaUserCircle size={100} className={`${iconColor}`} />
                    </div>
                    <h2 className={`text-xl font-bold mb-4 ${textColor}`}>Informations utilisateur</h2>
                    <p className={`text-center ${textColor}`}><strong>Prénom :</strong> {user.firstname}</p>
                    <p className={`text-center ${textColor}`}><strong>Nom :</strong> {user.lastname}</p>
                    <p className={`text-center ${textColor}`}><strong>Email :</strong> {user.email}</p>
                    <p className={`text-center ${textColor}`}><strong>Rôle :</strong> {getRoleLabel()}</p>
                </div>
            )}
        </div>
    );
};

export default UserCard;