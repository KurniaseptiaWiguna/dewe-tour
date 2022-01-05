import { createContext, useReducer } from "react"
import { useHistory } from "react-router-dom";

export const AppContext = createContext();

const initialState = {
    isLogin:false,
    user:{
        id:null,
        name: "",
        email:"",
        status:"",
        
    },
    status: "",
    modalLogin: false,
    modalRegister:false,
    modalApprove:false

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
        case 'SHOW_APPROVE':
            return {
                ...state,
            modalApprove: true
            };
        case 'HIDE_APPROVE':
            return {
                ...state,
            modalApprove: false
                };  
        case 'USER_SUCCESS':
            return{
                ...state,
                isLogin:true,
                user: {
                    id: action.payload.id,
                    name: action.payload.name,
                    email: action.payload.email,
                    status: action.payload.status                
                },
                status: action.payload.status
            }
        case 'LOGIN':
            // const userData = JSON.parse(localStorage.getItem("Users"));
            // const detailUser = userData.filter(filter => filter.email == action.payload.email)
            // const id = detailUser.map((d) => {
            //     return d.id;
            // })
            // const formData= {
            //     id: action.payload.id,
            //     email:action.payload.email,
            //     password: action.payload.password,
            //     role: action.payload.status,
            // }
            
            // console.log(detailUser)
            // console.log(id)
            // console.log(action.payload.status)
            // localStorage.setItem(
            //     "user",
            //     JSON.stringify({
            //         isLogin: true,
            //         user:formData
            //     })
            // );
            localStorage.setItem("token", action.payload.token)
            // console.log(action.payload.token)
            console.log(action.payload)
            return{
                ...state,
                modalLogin:false,
                isLogin:true,
                user: action.payload,
            }
        case 'AUTH_ERROR':
        case 'REGISTER':
            
            // const oldData = JSON.parse(localStorage.getItem("Users"));
            // console.log(oldData.lenght + " "+ oldData.lenght + 1)
            // const newIdUser = oldData.length + 1;
            // const newData = {
            //     id: newIdUser,
            //     fullname:action.payload.fullName,
            //     email:action.payload.email,
            //     gender: action.payload.gender,
            //     phone: action.payload.phone,
            //     password:action.payload.password,
            //     photo: action.payload.photo,
            //     role:action.payload.role,
            // }
            // oldData.push(newData);
            // localStorage.setItem("Users",JSON.stringify(oldData));
            // localStorage.setItem("token", action.payload.token)
            // console.log(action.payload.token)
            console.log(action.payload)
            return{
                ...state,
                modalRegister:false,
                isLogin:true,
                user: action.payload,
            }
         
            
        case 'LOGOUT':
            localStorage.removeItem("token")
            
            return{
                isLogin:false,
                user:{
                    id:null,
                    name: "",
                    email:"",
                    status:"",
                    
                }}
        case 'ADD_TRIP':
            const trip = JSON.parse(localStorage.getItem("Trips"));
            const newIdTrip = trip.length + 1;
            const newTrip ={
                id: newIdTrip,
                title: action.payload.title,
                country: action.payload.country,
                accommodation: action.payload.accommodation,
                transportation: action.payload.transportation,
                eat: action.payload.eat,
                day: Number(action.payload.day),
                night: Number(action.payload.night),
                dateTrip: action.payload.dateTrip,
                price: Number(action.payload.price),
                quota: Number(action.payload.quota),
                description: action.payload.description
            }
            trip.push(newTrip);
            localStorage.setItem("Trips", JSON.stringify(trip));
        case 'AUTH':
            // const loginState = JSON.parse(localStorage.getItem("user"));
            let token = JSON.stringify(localStorage.getItem("token"));
            return token ? {
                isLogin:true,
            }
                :{
                    isLogin: false,
                    user:{
                        id: null,
                        name:"",
                        email:"",
                        role:"",
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