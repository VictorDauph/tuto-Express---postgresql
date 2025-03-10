import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Commande from "./commande.model";

interface ProduitAttributes {
    id?: number;
    nom: string;
    prix: number;
    createdAt?: Date;
    updatedAt?: Date;
}

class Produit extends Model<ProduitAttributes> implements ProduitAttributes {
    public id!: number;
    public nom!: string;
    public prix!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Produit.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        prix: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0,
            },
        },
    },
    {
        sequelize,
        tableName: "produits",
        timestamps: true,
    }
);


export default Produit;
