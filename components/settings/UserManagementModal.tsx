import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { allBrands, mockRoles } from '../../data/mockData';
import type { User, Brand, RoleId } from '../../types';
import { ChevronDownIcon, CheckIcon } from '../icons';

interface UserManagementModalProps {
    user: User | null;
    onClose: () => void;
    onSave: (user: User) => void;
}

const UserManagementModal: React.FC<UserManagementModalProps> = ({ user, onClose, onSave }) => {
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [roleId, setRoleId] = useState<RoleId>(user?.roleId || 'analyst');
    const [assignedBrands, setAssignedBrands] = useState<Brand[]>(user?.assignedBrands || []);
    
    const [isBrandDropdownOpen, setBrandDropdownOpen] = useState(false);
    const brandDropdownRef = useRef<HTMLDivElement>(null);
    
    const isCLevel = roleId === 'c-level';
    
    useEffect(() => {
        if (isCLevel) {
            setAssignedBrands([]);
        }
    }, [isCLevel]);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (brandDropdownRef.current && !brandDropdownRef.current.contains(event.target as Node)) {
                setBrandDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleBrandToggle = (brand: Brand) => {
        setAssignedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const userToSave: User = {
            id: user?.id || '', // ID will be generated in parent for new users
            name,
            email,
            roleId,
            assignedBrands: isCLevel ? [] : assignedBrands,
            status: user?.status || 'Invited',
            avatarUrl: user?.avatarUrl || `https://i.pravatar.cc/150?u=${email}`
        };
        onSave(userToSave);
    };
    
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <h3 className="text-2xl font-bold text-gray-900">{user ? 'Edit User' : 'Invite User'}</h3>
                    <p className="mt-1 text-sm text-gray-500">{user ? `Update details for ${user.name}.` : 'Invite a new member to your team.'}</p>
                    
                    <div className="mt-6 space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                        </div>
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                            <select id="role" value={roleId} onChange={e => setRoleId(e.target.value as RoleId)} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                {mockRoles.map(role => <option key={role.id} value={role.id}>{role.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="brands" className="block text-sm font-medium text-gray-700">Brand Access</label>
                            {isCLevel ? (
                                <div className="mt-1 w-full px-3 py-2 border border-gray-200 bg-gray-100 rounded-md text-gray-500 text-sm">C-Level has access to all brands.</div>
                            ) : (
                                <div className="relative mt-1" ref={brandDropdownRef}>
                                    <button type="button" onClick={() => setBrandDropdownOpen(!isBrandDropdownOpen)} className="w-full flex justify-between items-center px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm">
                                        <span className="text-gray-700">{assignedBrands.length > 0 ? `${assignedBrands.length} brand(s) selected` : 'Select brands...'}</span>
                                        <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform ${isBrandDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    {isBrandDropdownOpen && (
                                        <div className="absolute top-full mt-1 w-full bg-white rounded-md shadow-lg border z-10 p-2 space-y-1">
                                            {allBrands.map(brand => (
                                                <label key={brand} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                                                    <input type="checkbox" checked={assignedBrands.includes(brand)} onChange={() => handleBrandToggle(brand)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>
                                                    <span className="text-sm text-gray-700">{brand}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="mt-8 flex flex-col sm:flex-row-reverse gap-3">
                        <button type="submit" className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            {user ? 'Save Changes' : 'Send Invite'}
                        </button>
                        <button type="button" onClick={onClose} className="w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        modalRoot
    );
};

export default UserManagementModal;
