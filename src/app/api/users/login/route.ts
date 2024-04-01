import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { error } from "console";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/helpers/mailer";
import jwt from "jsonwebtoken";

connect();

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json();
        const {username,email,password}:any=reqBody;

        //VALIDATION

        console.log(reqBody);

        const user=await User.findOne({email});

        if(!user){
            return NextResponse.json({error:"Invalid user"},{status:500});
        }

        console.log(user);

        const validPassword=await bcryptjs.compare(password,user.password);

        if(!validPassword){
            return NextResponse.json({error:"Check your credentials",status:400});
        }

        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email
        }
        //TODO
        jwt.sign()
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }
}