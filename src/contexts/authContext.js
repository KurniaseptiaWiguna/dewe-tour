import { createContext, useReducer } from "react";

// this is initial value for global auth state (context)
const initialValue = {
  
  isLogin: false,
  user: {
    email: "",
    password: "",
  },
};

// create context
export const AuthContext = createContext();

// reducer use to handle complex logic, use wisely
function reducer(state, action) {
  const [showLogin, setShowLogin]= useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { type, payload } = action;
  switch (type) {

    case "LOGIN":
      localStorage.setItem(
        "user",
        JSON.stringify({
          isLogin: true,
          user: payload,
        })
      );
      return {
        isLogin: true,
        user: payload,
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      return {
        isLogin: false,
        user: {
          email: "",
          password: "",
        },
      };
    case "AUTH":
      const loginState = JSON.parse(localStorage.getItem("user"));

      return loginState
        ? loginState
        : {
            isLogin: false,
            user: {
              email: "",
              password: "",
            },
          };
    default:
      throw new Error("type doesn't match cases");
  }
}

/** this is wrapper component that will use to be parent component of children that need to
 * consume the state globally
 * @param {*} children
 * @returns
 */
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;