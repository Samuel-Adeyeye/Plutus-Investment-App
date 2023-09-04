import { DataTypes, Model, Sequelize } from "sequelize";
import { db } from "../config";
import Company from "./company";

type Saving = {
  id: string;
  amount: number;
};

export type IUSER = {
    id:string,
    firstName:string,
    lastName:string,
    accountNumber:string,
    savingsWallet:Saving,
    email:string,
    password:string,
    otp:string,
    token:string,
    imageUrl?:string,
    notification:any[],
    accountBalance:number,
    role: string,
    verify: boolean,
    phoneNumber: string, 
    address: string, 
    zipCode: string, 
    city: string, 
    state: string, 
    country: string
}

class User extends Model<IUSER>{
     email: any
     id: any
     otp: any
}

User.init({
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        allowNull:false
    },
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    accountNumber:{
        type:DataTypes.STRING,
        allowNull:true
    },
    savingsWallet:{
        type:DataTypes.JSON,
        allowNull:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
   otp:{
        type:DataTypes.STRING,
        allowNull:true
   },
   token:{
        type:DataTypes.STRING,
        allowNull:true
        },
    imageUrl:{
        type:DataTypes.STRING,
        allowNull:true
    },
    notification:{
        type:DataTypes.ARRAY(DataTypes.JSONB),
        allowNull:true
    },
    accountBalance:{
        type:DataTypes.FLOAT,
        allowNull:true
    },
    role:{
        type:DataTypes.STRING,
        allowNull:true
    },
    verify:{
        type:DataTypes.BOOLEAN,
        allowNull:true
    },
    phoneNumber:{
        type:DataTypes.STRING,
        allowNull:true
    },
    address:{
        type:DataTypes.STRING,
        allowNull:true
    },
    zipCode:{
        type:DataTypes.STRING,
        allowNull:true
    },
    city:{
        type:DataTypes.STRING,
        allowNull:true
    },
    state:{
        type:DataTypes.STRING,
        allowNull:true
    },
    country:{
        type:DataTypes.STRING,
        allowNull:true
    },
    
}, {
    sequelize:db,
    tableName:"User",
    modelName:"User"
})

export default User

