import React from "react";
import Redirect from "../Redirect/Redirect";
import access from "../../lib/access";

const ProtectedFrom = ({
  Superadmin,
  Admin,
  User,
  Guest,
  children,
  noRender,
}) => {
  const onNotAllowed = noRender ? null : <Redirect />;
  if (Superadmin) if (access() === "Superadmin") return onNotAllowed;
  if (Admin) if (access() === "Admin") return onNotAllowed;
  if (User) if (access() === "User") return onNotAllowed;
  if (Guest) if (access() === "Guest") return onNotAllowed;
  return children;
};

export default ProtectedFrom;
