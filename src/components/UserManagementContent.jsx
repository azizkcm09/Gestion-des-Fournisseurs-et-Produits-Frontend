import React, { useState, useEffect } from "react";
import UserSearchFilter from "./UserSearchFilter";
import UserTable from "./UserTable";
import AddUserButton from "./AddUserButton";
import AddUserModal from "././AddUserModal";
import EditUserModal from "./EditUserModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

export default function UserManagementContent() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  const [users, setUsers] = useState([
    {
      id: 1,
      nom: "Dupont",
      prenom: "Jean",
      email: "jean@example.com",
      role: "ADMIN",
      statut: "Actif",
    },
    {
      id: 2,
      nom: "Martin",
      prenom: "Marie",
      email: "marie@example.com",
      role: "CLIENT",
      statut: "Actif",
    },
    {
      id: 3,
      nom: "Durand",
      prenom: "Pierre",
      email: "pierre@example.com",
      role: "FOURNISSEUR",
      statut: "Inactif",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState({ role: "", statut: "" });
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = users.filter((user) => {
      const matchesSearch =
        user.nom.toLowerCase().includes(lowercasedSearchTerm) ||
        user.prenom.toLowerCase().includes(lowercasedSearchTerm) ||
        user.email.toLowerCase().includes(lowercasedSearchTerm);

      const matchesRole =
        filterOptions.role === "" || user.role === filterOptions.role;
      const matchesStatut =
        filterOptions.statut === "" || user.statut === filterOptions.statut;

      return matchesSearch && matchesRole && matchesStatut;
    });
    setFilteredUsers(filtered);
  }, [users, searchTerm, filterOptions]);

  const handleAddUser = (newUserData) => {
    setUsers((prevUsers) => [
      ...prevUsers,
      { id: prevUsers.length + 1, ...newUserData },
    ]);
  };

  const handleEditUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    setIsDeleteConfirmationOpen(false);
    setUserToDelete(null);
  };

  const openEditModal = (user) => {
    setUserToEdit(user);
    setIsEditModalOpen(true);
  };

  const openDeleteConfirmation = (user) => {
    setUserToDelete(user);
    setIsDeleteConfirmationOpen(true);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filters) => {
    setFilterOptions(filters);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Gestion des utilisateurs
          </h1>
          <p className="text-gray-600">
            Gérez les utilisateurs de votre système
          </p>
        </div>
        <AddUserButton onClick={() => setIsAddModalOpen(true)} />
      </div>
      <UserSearchFilter
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
      />
      <UserTable
        users={filteredUsers}
        onEdit={openEditModal}
        onDelete={openDeleteConfirmation}
      />
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddUser={handleAddUser}
      />
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSaveUser={handleEditUser}
        user={userToEdit}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteConfirmationOpen}
        onClose={() => setIsDeleteConfirmationOpen(false)}
        onConfirm={() => handleDeleteUser(userToDelete.id)}
        userEmail={userToDelete?.email}
      />
    </div>
  );
}
