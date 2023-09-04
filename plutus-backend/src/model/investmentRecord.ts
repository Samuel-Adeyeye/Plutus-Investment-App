import { DataTypes, Model, Sequelize } from "sequelize"
import { db } from "../config"


export type IINVESTMENTRECORD = {
    id: string,
    amount: number,
    investor_name: string
    investor_id: string,
    investment_company_id:string,
    transaction_status: string
}

class investment_Records extends Model<IINVESTMENTRECORD>{}

investment_Records.init({
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        allowNull:false
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    investor_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    investor_id:{
        type:DataTypes.STRING,
        allowNull:false
    },
    investment_company_id:{
        type:DataTypes.STRING,
        allowNull:false
    },
    transaction_status:{
        type:DataTypes.STRING,
        allowNull:false
    }
}, {
    sequelize:db,
    tableName:"investment_Records"
})

export default investment_Records;












// id: v4(),
// amount: amount,
// investor_name: user_firstName + " " + user_lastName,
// investor_id: user_id,
// investment_company_id: company_id,
// transaction_status: "FAILED"
