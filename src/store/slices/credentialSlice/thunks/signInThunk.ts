import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PostShopSignInApiResponse } from "../../../beekneesApi";


export const signInThunk = createAsyncThunk(
    'signIn',
    async (args: {phone: string, password: string}) => {
        const {phone, password} = args;
        const jsonRes = await fetch('https://teaching-perfect-antelope.ngrok-free.app/api/v1/bns/shop/sign-in', {
            method: 'POST',
            body: JSON.stringify({
                'phone': phone,
                'password': password
            })
        });
        
        const res = await jsonRes.json();
        console.log(res);
        
        return res;
    }
)