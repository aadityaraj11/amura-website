import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({ children }: { children: JSX.Element }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/admin" replace />;

  // verify admin claim
  return (
    <CheckAdmin>{children}</CheckAdmin>
  );
};

const CheckAdmin = ({ children }: { children: JSX.Element }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    auth.currentUser?.getIdTokenResult(true).then((idTokenResult) => {
      if (idTokenResult.claims.admin) setIsAdmin(true);
    });
  }, []);

  if (!isAdmin) return <p>❌ Not authorized</p>;
  return children;
};
