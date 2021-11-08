import { createContext, useReducer } from "react"
import { useHistory } from "react-router-dom";

export const AppContext = createContext();

const initialState = {
    isLogin:false,
    user:{
        id:null,
        email:"",
        password:"",
        role:"",
        
    },
    modalLogin: false,
    modalRegister:false,

} ;



const reducer = (state,action) => {
    switch (action.type) {
        case 'SHOW_LOGIN':
            return {
                ...state,
                modalLogin: true};
        case 'SHOW_REGISTER':
            return{
                ...state,
                modalRegister: true};
        case 'HIDE_LOGIN':
            return {
                ...state,
                modalLogin:false};
        case 'HIDE_REGISTER':
            return {
                ...state,
                modalRegister:false};
        case 'SWITCH_MODAL':
            return {
                ...state,
            modalRegister: !state.modalRegister,
            modalLogin : !state.modalLogin,
        };
        case 'LOGIN':
            const userData = JSON.parse(localStorage.getItem("Users"));
            const detailUser = userData.filter(filter => filter.email == action.payload.email)
            const id = detailUser.map((d) => {
                return d.id;
            })
            const formData= {
                id: id[0],
                email:action.payload.email,
                password: action.payload.password,
                role: action.payload.role,
            }
            
            console.log(detailUser)
            console.log(id)
            console.log(action.payload.role)
            localStorage.setItem(
                "user",
                JSON.stringify({
                    isLogin: true,
                    user:formData
                })
            );
            
            return{
                ...state,
                modalLogin:false,
                isLogin:true,
                user: {
                    
                    formData
                }
            }

        case 'REGISTER':
            
            const oldData = JSON.parse(localStorage.getItem("Users"));
            const newData = {
                fullname:action.payload.fullName,
                email:action.payload.email,
                gender: action.payload.gender,
                phone: action.payload.phone,
                password:action.payload.password,
                photo: action.payload.photo,
                role:action.payload.role,
            }
            oldData.push(newData);
            localStorage.setItem("Users",JSON.stringify(oldData));
            return {
                ...state,
                isLogin:true,
                user:{
                    email:action.payload.email,
                    password:action.payload.password,
                    role:action.payload.role,
                }
            }
         
            
        case 'LOGOUT':
            localStorage.setItem('user',null)
            
            return{
                isLogin:false,
                user:{
                    email:"",
                    password:"",
                    role:"",
                    
                }}
        case 'AUTH':
            const loginState = JSON.parse(localStorage.getItem("user"));
            
            return loginState
                ? loginState
                :{
                    isLogin: false,
                    user:{
                        email:"",
                        password:"",
                    },
                    
                }
                
        
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