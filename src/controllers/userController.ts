import { Request, Response } from "express";
import { hashPassword } from "../utils/pwdUtils";
import Utilisateur from "../models/Utilisateur.model";
import sequelize from "../config/database";

export async function getAllUsers(req: Request, res: Response) {
    try {
        const utilisateurs = await Utilisateur.findAll();
        res.json(utilisateurs);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export async function createUser(req: Request, res: Response) {
    try {
        // Validation des champs
        const { nom, email } = req.body;
        const utilisateur = await Utilisateur.create({ nom, email });
        res.json(utilisateur);
    } catch (err: any) {
        // Gestion des erreurs
        res.status(500).json({ message: 'Erreur interne', error: err.message });

    }
}

export async function modifyUser(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { nom, email } = req.body;

        const utilisateur = await Utilisateur.findByPk(id);
        if (!utilisateur) {
            res.status(404).json({ message: "Utilisateur non trouvé" });
            return
        }

        // Mise à jour des champs fournis
        if (nom) utilisateur.nom = nom;
        if (email) utilisateur.email = email;

        await utilisateur.save();
        res.json({ message: "Utilisateur modifié avec succès", utilisateur });
    } catch (error) {
        console.error("Erreur lors de la modification :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const utilisateur = await Utilisateur.findByPk(id);
        if (!utilisateur) {
            res.status(404).json({ message: "Utilisateur non trouvé" });
            return
        }

        await utilisateur.destroy();
        res.json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}


/**
 * Effectue une recherche avancée sur les utilisateurs.
 * Filtrage par nom, email et date de création avec une requête SQL optimisée.
 * URL : GET /users/search?nom=Dupont&email=dupont@example.com&createdAfter=2024-01-01
 */
export async function searchUsers(req: Request, res: Response) {
    try {
        const { nom, email, createdAfter } = req.query;

        //Créé une requête formatée pour que sequelize puisse insérer des variables à l'intérieur
        const query = `
            SELECT id, nom, email, "createdAt"
            FROM utilisateurs
            WHERE 
                (:nom IS NULL OR nom ILIKE :nom) AND
                (:email IS NULL OR email ILIKE :email) AND
                (:createdAfter IS NULL OR "createdAt" >= :createdAfter)
            ORDER BY nom ASC;
        `;

        //insère dynamiquement les variables dans la requête et l'éxécute
        //sequelize.query avec replacements protège contre les injections sql
        const utilisateurs = await sequelize.query(query, {
            replacements: {
                nom: nom ? `%${nom}%` : null, // Recherche partielle insensible à la casse
                email: email ? `%${email}%` : null,
                createdAfter: createdAfter || null,
            },
            type: "SELECT"
        });

        res.json(utilisateurs);
    } catch (error: any) {
        console.error("Erreur lors de la recherche :", error);
        res.status(500).json({ message: error.message });
    }
}
