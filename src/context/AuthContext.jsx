import { createContext, useContext, useEffect, useState } from "react";
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNotification } from "./NotificationContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  const signup = async (email, password, extraData = {}) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    const userRoleValue = extraData.role || "customer";

    const userPayload = {
      uid: user.uid,
      email: user.email,
      role: userRoleValue,
      createdAt: new Date(),
      ...extraData
    };

    await setDoc(doc(db, "users", user.uid), userPayload);

    setCurrentUser(user);
    setUserData(userPayload);
    setUserRole(userRoleValue);
    showNotification('Account created and logged in successfully!', 'success');
    return res;
  };

  const login = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    setCurrentUser(user);

    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const data = userDoc.data();
      setUserData(data);
      setUserRole(data.role || "customer");
    } else {
      const defaultData = {
        uid: user.uid,
        email: user.email,
        role: "customer",
        createdAt: new Date()
      };
      await setDoc(userDocRef, defaultData);
      setUserData(defaultData);
      setUserRole("customer");
    }

    showNotification('Logged in successfully!', 'success');
    return res;
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserRole(null);
      setUserData(null);
      setCurrentUser(null);
      showNotification('Logged out successfully.', 'success');
    } catch (err) {
      console.error('Logout error:', err);
      showNotification('Failed to log out.', 'danger');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);
          setUserRole(data.role || "customer");
        } else {
          const defaultData = {
            uid: user.uid,
            email: user.email,
            role: "customer",
            createdAt: new Date()
          };
          await setDoc(userDocRef, defaultData);
          setUserData(defaultData);
          setUserRole("customer");
        }
      } else {
        setCurrentUser(null);
        setUserData(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, userData, userRole, signup, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);