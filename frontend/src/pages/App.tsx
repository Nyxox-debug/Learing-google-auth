import { googleLogout } from "@react-oauth/google";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/authContext";
function App() {
  const { user } = useAuth();
  function handleLogout() {
    googleLogout();
  }
  return (
    <div>
      {user ? (
        <div>
          <p>App</p>
          <p>{user}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Navigate to={"/"} replace />
      )}
    </div>
  );
}

export default App;
