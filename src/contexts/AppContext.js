import { createContext, useReducer } from "react"

export const AppContext = createContext();

const initialState = {
    isLogin:false,
    user:{
        email:"",
        password:"",
        
    }

} ;

const reducer = (state,action) => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem(
                "user",
                JSON.stringify({
                    isLogin: true,
                    user: {
                        email: action.payload.email,
                        password:action.payload.password,
                        
                    }
                })
            );
        case 'AUTH':
            const loginState = JSON.parse(localStorage.getItem("user"));

            return loginState
                ? loginState
                : {
                    isLogin: false,
                    user:{
                        email:"",
                        password:"",
                    },
                };
        default:
            throw new Error("type doesn't match cases")
    }
}
export const AppContextProvider = (props) => {
    const [state, dispatch]= useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={[state,dispatch]}>
            {props.children}
        </AppContext.Provider>
    )
}