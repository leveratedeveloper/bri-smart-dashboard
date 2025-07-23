import React, { useState } from 'react';
import { mockUsers, mockRoles } from '../../data/mockData';
import { CameraIcon, LockIcon, LogOutIcon } from '../icons';
import type { User, RoleId } from '../../types';

interface ProfileTabProps {
    onLogout: () => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ onLogout }) => {
    // For this demo, we'll use the first user as the logged-in user.
    const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]);
    const [name, setName] = useState(currentUser.name);
    
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [infoMessage, setInfoMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const isInfoChanged = name !== currentUser.name;

    const handleInfoSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        console.log('Updating user info:', { ...currentUser, name });
        setCurrentUser({ ...currentUser, name });
        setInfoMessage('Profile updated successfully!');
        setTimeout(() => setInfoMessage(''), 3000);
    };

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordMessage('');

        if (newPassword !== confirmPassword) {
            setPasswordError('New passwords do not match.');
            return;
        }
        if (newPassword.length < 8) {
            setPasswordError('Password must be at least 8 characters long.');
            return;
        }

        // Simulate API call
        console.log('Changing password...');
        setPasswordMessage('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setPasswordMessage(''), 3000);
    };
    
    const getRoleName = (roleId: RoleId) => {
        return mockRoles.find(r => r.id === roleId)?.name || 'Unknown Role';
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>

            {/* Profile Information Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80">
                <h2 className="text-xl font-bold text-gray-800 border-b pb-4 mb-6">Personal Information</h2>
                <form onSubmit={handleInfoSave} className="space-y-6">
                    <div className="flex items-center gap-6">
                        <div className="relative group flex-shrink-0">
                            <img src={currentUser.avatarUrl} alt="User Avatar" className="w-24 h-24 rounded-full object-cover" />
                            <label htmlFor="avatar-upload" className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <CameraIcon className="w-8 h-8" />
                                <input type="file" id="avatar-upload" className="hidden" />
                            </label>
                        </div>
                        <div className="flex-grow">
                             <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input 
                                type="email" 
                                id="email" 
                                value={currentUser.email}
                                disabled
                                className="mt-1 block w-full px-3 py-2 border border-gray-200 bg-gray-100 rounded-md text-gray-500"
                            />
                        </div>
                         <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                            <input 
                                type="text" 
                                id="role" 
                                value={getRoleName(currentUser.roleId)}
                                disabled
                                className="mt-1 block w-full px-3 py-2 border border-gray-200 bg-gray-100 rounded-md text-gray-500"
                            />
                        </div>
                    </div>
                    
                    <div className="flex justify-end items-center gap-4 pt-4 border-t">
                        {infoMessage && <span className="text-sm text-green-600">{infoMessage}</span>}
                        <button 
                            type="submit"
                            disabled={!isInfoChanged}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>

            {/* Change Password Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80">
                <h2 className="text-xl font-bold text-gray-800 border-b pb-4 mb-6 flex items-center gap-3">
                    <LockIcon className="w-5 h-5 text-gray-500" />
                    Change Password
                </h2>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">Current Password</label>
                        <input 
                            type="password" 
                            id="current-password" 
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                     <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">New Password</label>
                        <input 
                            type="password" 
                            id="new-password" 
                            value={newPassword}
                             onChange={(e) => setNewPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                     <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                        <input 
                            type="password" 
                            id="confirm-password" 
                            value={confirmPassword}
                             onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex justify-end items-center gap-4 pt-4 border-t">
                         {passwordError && <span className="text-sm text-red-600 flex-grow text-left">{passwordError}</span>}
                         {passwordMessage && <span className="text-sm text-green-600 flex-grow text-left">{passwordMessage}</span>}
                        <button 
                            type="submit"
                            disabled={!currentPassword || !newPassword || !confirmPassword}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Change Password
                        </button>
                    </div>
                </form>
            </div>

             {/* Logout Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80 flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-gray-800">Logout</h3>
                    <p className="text-sm text-gray-500">End your current session from this device.</p>
                </div>
                <button
                    onClick={onLogout}
                    className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-md text-sm font-medium bg-red-50 hover:bg-red-100"
                >
                    <LogOutIcon className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default ProfileTab;