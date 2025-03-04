import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Client from "./client.model";
import Produit from "./produit.model";

interface CommandeAttributes {
    id: number;
    clientId: number;
    produitId: number;
    quantite: number;
    dateCreation?: Date;
    status?: boolean;
    isReturned?: boolean;
}

interface CommandeCreationAttributes extends Optional<CommandeAttributes, "id" | "dateCreation" | "status" | "isReturned"> { }

class Commande extends Model<CommandeAttributes, CommandeCreationAttributes> implements CommandeAttributes {
    public id!: number;
    public clientId!: number;
    public produitId!: number;
    public quantite!: number;
    public readonly dateCreation!: Date;
    public status!: boolean;
    public isReturned!: boolean;
}

Commande.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        clientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Client,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        produitId: {
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
        dateCreation: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isReturned: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        tableName: "commandes",
        timestamps: false,
    }
);

// Associer les relations
Client.hasMany(Commande, { foreignKey: "clientId" });
Commande.belongsTo(Client, { foreignKey: "clientId" });

Produit.hasMany(Commande, { foreignKey: "produitId" });
Commande.belongsTo(Produit, { foreignKey: "produitId" });

export default Commande;
