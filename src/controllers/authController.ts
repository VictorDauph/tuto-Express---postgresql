import { Request, Response } from 'express';
import { hashPassword, verifyPassword } from '../utils/pwdUtils';
import { generateToken } from '../utils/JWTUtils';
import User, { IUser } from '../models/Utilisateur.model';


export async function login(req: Request, res: Response): Promise<void> {
    const { name, password } = req.body;

    try {
        // Rechercher l'utilisateur dans la base de données par son nom
        const user = await User.findOne({ name });

        // Vérifier si l'utilisateur existe 
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }

        // Vérifier si le mot de passe est correct
        const isPasswordValid = await verifyPassword(password, user.hashedPassword);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid credentials.' });
            return;
        }

        // Générer un token JWT
        const token = generateToken({ id: user._id, name: user.name });

        // Envoyer le token dans un cookie sécurisé, 
        // ce cookie n'est pas directement accessible par le client et ne peut être envoyé qu'au site qui
        // lui a envoyé
        res.cookie('jwt', token, { httpOnly: true, sameSite: 'strict' });
        res.status(200).json({ message: 'Login successful!' });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

export async function register(req: Request, res: Response) {
    try {
        const { name, email, age, password } = req.body;

        // Validation des champs
        if (!name || !email || !age || !password) {
            res.status(400).json({ message: 'Tous les champs sont requis : name, email, age, password' });
            return
        }

        //hashage du password
        const hashedPassword = await hashPassword(password);

        // Création du nouvel utilisateur
        const newUser: IUser = new User({ name, email, age, hashedPassword });

        // Sauvegarde dans la base de données
        let savedUser = await newUser.save();
        //On supprime le hashed password de la réponse envoyée au client
        savedUser.hashedPassword = '';
        // Réponse réussie
        res.status(201).json({ message: 'Utilisateur créé avec succès', data: savedUser });
    } catch (err: any) {
        // Gestion des erreurs
        if (err.code === 11000) {
            // Erreur de duplication (email unique par exemple)
            res.status(400).json({ message: 'Cet email est déjà utilisé' });
            return
        }
        res.status(500).json({ message: 'Erreur interne', error: err.message });

    }
}