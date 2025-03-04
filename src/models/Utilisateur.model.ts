import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

// Définition des attributs d'un utilisateur
interface UtilisateurAttributes {
    id: number;
    nom: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Permet d’avoir un champ optionnel à la création (id auto-incrémenté)
interface UtilisateurCreationAttributes extends Optional<UtilisateurAttributes, "id"> { }

class Utilisateur extends Model<UtilisateurAttributes, UtilisateurCreationAttributes>
    implements UtilisateurAttributes {
    public id!: number;
    public nom!: string;
    public email!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Utilisateur.init(
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
    },
    {
        sequelize,
        tableName: "utilisateurs",
        timestamps: true, // Ajoute createdAt & updatedAt
    }
);

export default Utilisateur;
