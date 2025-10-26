import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import {toast} from "react-hot-toast";
import { LogOut } from "lucide-react";
import {io} from "socket.io-client";

const BASE_URL= import.meta.env.MODE === "development" ? "http://localhost:5001":"/";
//   baseURL:  import.meta.env.MODE === "development" ? 'http://localhost:5001/api' : "/api",


export const useAuthStore = create((set,get) => ({
    // what is this get??? it is just a fn form the zustand under store defination that will tell you the latest value of 
   
    // all these are states
    authUser:null,
    isSigningUp: false,
    isLoggingIn:false,
    isUpdatingProfile: false,
    isCheckingAuth: false,
    onlineUsers:[],
    socket:null,
    
    // these are the methods
    checkAuth: async ()=>{
        console.log("checkAuth called");
        set({isCheckingAuth:true});
        try {
            console.log("checkAuth called try 1");
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data});
            console.log("checkAuth called try");
            
            get().connectSocket();
        } catch (error) {
            console.log("checkAuth called error");
            set({authUser:null});
        }finally{
            console.log("checkAuth called final");
            set({isCheckingAuth:false}); 
        }
    },

    signup: async (data) =>{
        set({isSigningUp: true});
        try {
            const res = await axiosInstance.post("/auth/signup",data);
            set({authUser:res.data});
            toast.success("Account created successfully");

            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isSigningUp:false});
        }
    },

    logout: async(data) =>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser: null});
            toast.success("Logged out successfully");

            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    login: async(data) =>{
        set({isLoggingIn:true});
        try {
          const res = await axiosInstance.post("/auth/login",data);
          set({authUser:res.data});
          toast.success("Logged in Successfully!!"); 
          
          get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isLoggingIn:false});
        }
    },

    updateProfile: async (data) =>{//handleImageUpload will send the base64data
        set({isUpdatingProfile:true});
        try {
            const res = await axiosInstance.put("/auth/update-profile",data);//backend ko pass ({ profilePic: base64Image })
            set({authUser: res.data});//auth user ko update
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("error in update profile");
            toast.error(error.response.data.message);
        }finally{
            set({isUpdatingProfile:false});
        }
    },

    connectSocket: ()=>{
        const {authUser} = get();
        if(!authUser || get().socket?.connected)return;

        const socket= io(BASE_URL,{query:{userId:authUser._id}},);
        socket.connect();
        set({socket:socket});

        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds});
        })
    },

    disconnectSocket:()=>{
        // see get() -> m socket ki latest state -> connected? h(connnected is provided by socket inbuilt)
        if(get().socket?.connected) get().socket.disconnect();
    }

}))