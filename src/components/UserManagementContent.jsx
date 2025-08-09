import React from "react";
import UserSearchFilter from "./UserSearchFilter";
import UserTable from "./UserTable";
import AddUserButton from "./AddUserButton";

export default function UserManagementContent() {
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
        <AddUserButton />
      </div>
      <UserSearchFilter />
      <UserTable />
    </div>
  );
}
