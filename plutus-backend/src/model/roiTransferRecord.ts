import { DataTypes, Model, Sequelize } from "sequelize"
import { db } from "../config"
import Company from "./company"


export type RECORD = {
    id:string,
    investor_id:string,
    investor_name:string,
    transfer_amount:number,
    company_name:string,
    company_id:number,
    transfer_status:string
}

class roiTransferRecord extends Model<RECORD>{
    public static associate(models: { Company: typeof Company }): void {
        roiTransferRecord.belongsTo(models.Company, {foreignKey:'companyId', as:'Company'} )
    }
}

roiTransferRecord.init({
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        allowNull:false
    },
    investor_id:{
        type:DataTypes.STRING,
        allowNull:true
    },
    investor_name:{
        type:DataTypes.STRING,
        allowNull:true
    },
    transfer_amount:{
        type:DataTypes.FLOAT,
        allowNull:true
    },
    company_name:{
        type:DataTypes.STRING,
        allowNull:true
    },
    company_id:{
        type:DataTypes.STRING,
        allowNull:true
    },
    transfer_status:{
        type:DataTypes.STRING,
        allowNull:true
    }
}, {
    sequelize:db,
    tableName:"roiTransferRecord",
    modelName:"roiTransferRecord"
})

export default roiTransferRecord