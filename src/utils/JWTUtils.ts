// Importation du module jsonwebtoken (jwt) et du type JwtPayload.
// jwt est utilisé pour créer et vérifier des JSON Web Tokens.
// JwtPayload est un type représentant la structure des données contenues dans un token.
import jwt, { JwtPayload } from 'jsonwebtoken';

// Définition de la clé secrète utilisée pour signer et vérifier les tokens JWT.
// Cette clé doit être stockée de manière sécurisée, idéalement dans une variable d'environnement.
const SECRET_KEY: string | undefined = process.env.JWT_KEY;

/**
 * Fonction pour générer un JSON Web Token (JWT).
 * 
 * @param payload - Les données à inclure dans le token. Par exemple, l'ID utilisateur ou les rôles.
 * @returns Un token signé sous forme de chaîne de caractères.
 */
export function generateToken(payload: JwtPayload): string {
    //Si la Secret_key n'existe pas dans les variables d'environnement, on génère une erreur
    if (SECRET_KEY === undefined) {
        throw new Error("SECRET_KEY non présente dans les variables d'environnement")
    }
    // Génère un token signé avec les données fournies (payload), la clé secrète (SECRET_KEY),
    // et une option d'expiration du token après 1 heure.
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

/**
 * Fonction pour vérifier l'authenticité d'un token JWT.
 * 
 * @param token - Le token JWT à vérifier.
 * @returns Le contenu décodé du token (payload) s'il est valide, ou null en cas d'erreur.
 */
export function verifyToken(token: string): string | JwtPayload | null {
    //Si la Secret_key n'existe pas dans les variables d'environnement, on génère une erreur
    if (SECRET_KEY === undefined) {
        throw new Error("SECRET_KEY non présente dans les variables d'environnement")
    }
    try {
        // Vérifie la validité du token à l'aide de la clé secrète.
        // Si le token est valide, retourne le payload contenu dans le token.
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        // Si une erreur survient (ex. : token expiré ou invalide), retourne null.
        return null;
    }
}
