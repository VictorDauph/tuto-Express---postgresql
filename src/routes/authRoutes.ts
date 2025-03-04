import express from 'express';
import { login, register } from '../controllers/authController';

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authentifie un utilisateur et génère un token JWT
 *     description: >
 *       Permet à un utilisateur de se connecter en utilisant son nom et son mot de passe.
 *       Si les informations sont valides, un token JWT est généré et envoyé dans un cookie sécurisé.
 *     tags:
 *       - Authentification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "alice"
 *                 description: Le nom d'utilisateur.
 *               password:
 *                 type: string
 *                 example: "pwd"
 *                 description: Le mot de passe de l'utilisateur.
 *     responses:
 *       200:
 *         description: Connexion réussie, token JWT renvoyé dans les cookies.
 *         headers:
 *           Set-Cookie:
 *             description: Le cookie contenant le token JWT.
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful!"
 *       401:
 *         description: Identifiants invalides
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials."
 *       404:
 *         description: Utilisateur introuvable
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found."
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     description: Enregistre un utilisateur avec un nom, email, âge et mot de passe.
 *     tags:
 *       - Authentification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - age
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Alice"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "Alice@gmail.com"
 *               age:
 *                 type: integer
 *                 example: 25
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "pwd"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur créé avec succès"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d0fe4f5311236168a109ca"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john@gmail.com"
 *                     age:
 *                       type: integer
 *                       example: 30
 *       400:
 *         description: Erreur de validation (champs manquants ou email déjà utilisé).
 *       500:
 *         description: Erreur interne du serveur.
 */
router.post('/register', register);

export default router;