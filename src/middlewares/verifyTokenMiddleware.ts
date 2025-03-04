import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

//chargement des variables d'environnement
dotenv.config();

//la clé secrète est nécessaire pour décrypter le token
const SECRET_KEY = process.env.JWT_KEY;


export function verifyTokenMiddleware(req: Request, res: Response, next: NextFunction): void {

    if (SECRET_KEY === undefined) {
        throw new Error("SECRET_KEY non présente dans les variables d'environnement")
    }

    // Récupérer le token dans les cookies
    const cookie = req.headers.cookie;
    if (!cookie) {
        res.status(401).json({ message: 'Access denied. Cookie missing.' });
        return;
    }
    //le cookie contient une donnée sous la forme jwt=lzfqfbzkbfksbfizblfizbb 
    const token = cookie.split('=')[1]; // Garde uniquement la valeur après '='
    console.log(token);

    // Vérifier si le cookie est présent 
    if (!token) {
        res.status(401).json({ message: 'Access denied. Token missing.' });
        return;
    }


    try {
        // Vérifier et décoder le token
        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

        // Ajouter les données décodées à la requête pour un accès ultérieur
        req.headers.user = JSON.stringify(decoded);

        // Passer au middleware suivant
        next();
    } catch (err) {
        console.error('Invalid token:', err);
        res.status(403).json({ message: 'Invalid or expired token.' });
    }
}
