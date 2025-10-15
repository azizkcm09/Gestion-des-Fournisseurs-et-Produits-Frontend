import React, { useState, useEffect } from "react";
import UserSearchFilter from "./UserSearchFilter";
import UserTable from "./UserTable";
import AddUserButton from "./AddUserButton";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import Pagination from "./Pagination";
import { api } from "../api/axios";

export default function UserManagementContent() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  // États pour les données et la pagination
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState({ role: "", statut: "" });
  const [filteredUsers, setFilteredUsers] = useState([]);

  // États pour la pagination (maintenant gérée côté serveur)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Nombre d'utilisateurs par page
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fonction pour récupérer les utilisateurs avec pagination côté serveur
  const fetchUsers = async (page = 1, limit = itemsPerPage) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const res = await api.get(`/users?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API response:", res.data);

      // Extraire les données de la réponse paginée
      const {
        users: usersData,
        totalUsers: total,
        totalPages: pages,
      } = res.data;

      setUsers(usersData || []);
      setTotalUsers(total || 0);
      setTotalPages(pages || 0);
    } catch (error) {
      console.error("Fetch users error:", error);
      setUsers([]);
      setTotalUsers(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  // Charger les utilisateurs au montage du composant
  useEffect(() => {
    fetchUsers(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  // Effet pour filtrer les utilisateurs côté client (sur les données de la page actuelle)
  useEffect(() => {
    if (!Array.isArray(users)) {
      setFilteredUsers([]);
      return;
    }

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

  const handleAddUser = async (newUserData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return console.error("No token found");

      const res = await api.post("/users/create", newUserData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Recharger les données après ajout
      await fetchUsers(currentPage, itemsPerPage);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Add user error:", error);
    }
  };

  const handleEditUser = async (updatedUser) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return console.error("No token found");

      await api.put(`/users/${updatedUser.id}`, updatedUser, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Recharger les données après modification
      await fetchUsers(currentPage, itemsPerPage);
      setIsEditModalOpen(false);
      setUserToEdit(null);
    } catch (error) {
      console.error("Edit user error:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return console.error("No token found");

      await api.delete(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Recharger les données après suppression
      await fetchUsers(currentPage, itemsPerPage);
      setIsDeleteConfirmationOpen(false);
      setUserToDelete(null);
    } catch (error) {
      console.error("Delete user error:", error);
    }
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // fetchUsers sera appelé automatiquement via useEffect
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

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">Chargement...</div>
        </div>
      ) : (
        <>
          <UserTable
            users={filteredUsers}
            onEdit={openEditModal}
            onDelete={openDeleteConfirmation}
          />

          <Pagination
            currentPage={currentPage}
            totalItems={totalUsers}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </>
      )}

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
