import useAuth from "../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth()!;

  return (
    <div>
      <h1>My Profile</h1>
      <p>
        <strong>Name:</strong> {user?.name}
      </p>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
      <p>
        <strong>Role:</strong> {user?.role}
      </p>
    </div>
  );
}
