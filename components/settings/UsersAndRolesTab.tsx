import React, { useState } from 'react';
import { UserPlusIcon, EditIcon, TrashIcon, MailIcon, CheckIcon } from '../icons';
import { mockUsers, mockRoles } from '../../data/mockData';
import type { User, Brand, RoleId } from '../../types';
import UserManagementModal from './UserManagementModal';

const UsersAndRolesTab: React.FC = () => {
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const handleInviteUser = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const handleEditUser = (user: User) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleDeleteUser = (userId: string) => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    };

    const handleSaveUser = (userToSave: User) => {
        if (editingUser) {
            // Update existing user
            setUsers(prevUsers => prevUsers.map(user => user.id === userToSave.id ? userToSave : user));
        } else {
            // Add new user
            const newUser: User = { ...userToSave, id: `usr-${Date.now()}` };
            setUsers(prevUsers => [newUser, ...prevUsers]);
        }
        setIsModalOpen(false);
    };
    
    const getRoleName = (roleId: RoleId) => {
        return mockRoles.find(r => r.id === roleId)?.name || 'Unknown Role';
    };
    
    const roleColors: Record<RoleId, string> = {
        'c-level': 'bg-red-100 text-red-700',
        'director': 'bg-purple-100 text-purple-700',
        'manager': 'bg-blue-100 text-blue-700',
        'analyst': 'bg-green-100 text-green-700',
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Users & Roles</h2>
                    <p className="text-sm text-gray-500">Manage your team members and their permissions.</p>
                </div>
                <button
                    onClick={handleInviteUser}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                >
                    <UserPlusIcon className="w-5 h-5" />
                    <span>Invite User</span>
                </button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">User</th>
                            <th scope="col" className="px-6 py-3">Role</th>
                            <th scope="col" className="px-6 py-3">Assigned Brands</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img className="w-10 h-10 rounded-full object-cover" src={user.avatarUrl} alt={user.name} />
                                        <div>
                                            <div className="font-semibold text-gray-900">{user.name}</div>
                                            <div className="text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${roleColors[user.roleId]}`}>
                                        {getRoleName(user.roleId)}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {user.roleId === 'c-level' ? (
                                        <span className="text-gray-500 italic">All Brands</span>
                                    ) : (
                                        <div className="flex flex-wrap gap-1">
                                            {user.assignedBrands.map(brand => (
                                                <span key={brand} className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">{brand}</span>
                                            ))}
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {user.status === 'Active' ? (
                                         <span className="flex items-center gap-1.5 text-xs font-medium text-green-700">
                                            <CheckIcon className="w-4 h-4 text-green-500" /> Active
                                         </span>
                                    ) : (
                                        <span className="flex items-center gap-1.5 text-xs font-medium text-yellow-700">
                                            <MailIcon className="w-4 h-4 text-yellow-500" /> Invited
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button onClick={() => handleEditUser(user)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-md">
                                            <EditIcon className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDeleteUser(user.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-md">
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <UserManagementModal
                    user={editingUser}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveUser}
                />
            )}
        </div>
    );
};

export default UsersAndRolesTab;
