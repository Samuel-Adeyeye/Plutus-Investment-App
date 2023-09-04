import { DataTypes, Model, Sequelize } from "sequelize"
import { db } from "../config"

export type TRANSFER = {
    id:string,
    accountNumber:string,
    amount:number,
    transfer_purpose:string,
    beneficiary_name:string,
    beneficiary_email:string,
    payer_reference:string,
    information_for_beneficiary:string,
    status:string,
    senderId:string
}

class Transfers extends Model<TRANSFER>{}

Transfers.init({
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        allowNull:false
    },
    accountNumber:{
        type:DataTypes.STRING,
        allowNull:false
    },
    amount:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    transfer_purpose:{
        type:DataTypes.STRING,
        allowNull:true
    },
    beneficiary_name:{
        type:DataTypes.STRING,
        allowNull:true
    },
    beneficiary_email:{
        type:DataTypes.STRING,
        allowNull:true
    },
    payer_reference:{
        type:DataTypes.STRING,
        allowNull:false
    },
    information_for_beneficiary:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:true     
    },
    senderId:{
        type:DataTypes.STRING,
        allowNull:true 
    }
}, {
    sequelize:db,
    tableName:"Transfers",
    // modelName:"Transfers"
})

export default Transfers