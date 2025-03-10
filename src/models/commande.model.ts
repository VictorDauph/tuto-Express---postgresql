import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Client from "./client.model";
import Produit from "./produit.model";

interface CommandeAttributes {
    id?: number;
    client_id: number;
    produit_id: number;
    quantite: number;
    status?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

class Commande extends Model<CommandeAttributes> implements CommandeAttributes {
    public id!: number;
    public client_id!: number;
    public produit_id!: number;
    public quantite!: number;
    public status!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Commande.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Client,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        produit_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Produit,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        quantite: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
            },
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        tableName: "commandes",
        timestamps: true,
    }
);

// Associer les relations

Commande.belongsTo(Client, { foreignKey: "client_id" });
Client.hasMany(Commande, { foreignKey: "client_id" });

Commande.belongsTo(Produit, { foreignKey: "produit_id" });
Produit.hasMany(Commande, { foreignKey: "produit_id" });

export default Commande;
