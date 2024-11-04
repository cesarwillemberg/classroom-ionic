import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mysql from 'mysql2/promise';
import multer from 'multer';
// const express = require('express');
// const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const upload = multer();
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    let connection = null;
    try {
        console.log('Iniciando a consulta...');
        connection = await mysql.createConnection("mysql://nextjs:nextjs@localhost:3306/classroom_copy");

        const [rows] = await connection.query(`
            SELECT t.*, i.imagem AS profileImage 
            FROM Turmas t
            LEFT JOIN imagens i ON t.imagem_id = i.id
        `);

        console.log('Dados retornados da consulta:', rows);

        if (Array.isArray(rows)) {
            const result = rows.map((turma) => ({
                ...turma,
                profileImage: turma.profileImage ? Buffer.from(turma.profileImage, 'hex').toString('base64') : null,
            }));
            console.log('Consulta realizada com sucesso:', result);
            return res.json(result);
        } else {
            throw new Error("Resultado inesperado da consulta.");
        }        
        } catch (error) {
            console.error("Erro ao consultar turmas:", error.message || error);
            return res.status(500).json({ error: error.message || 'Erro desconhecido' });
        } finally {
            if (connection) {
                try {
                    await connection.end();
                } catch (endError) {
                    console.error("Erro ao fechar a conexão:", endError);
                }
            }
        }
    }
);
app.post('/', upload.single('imageProfile'), async (req, res) => {
    try {
        const formData = req.body;
        const nameClass = formData.nameClass;
        const group = formData.group;
        const professorName = formData.professorName;
        const imageFile = req.file; // Arquivo de imagem processado pelo multer

        if (!nameClass || !group || !professorName) {
            return res.json({ error: 'Campos obrigatórios faltando', created: false });
        }

        let connection = null;

        try {
            connection = await mysql.createConnection("mysql://nextjs:nextjs@localhost:3306/classroom_copy");

            let imageId = null;

            if (imageFile) {
                const imageBuffer = imageFile.buffer;
                const [imageResult] = await connection.query(
                    "INSERT INTO imagens (nome, imagem) VALUES (?, ?)",
                    [imageFile.originalname, imageBuffer]
                );
                imageId = imageResult.insertId;
            }

            const [result] = await connection.query(
                "INSERT INTO turmas (nameClass, grupo, professorName, imagem_id) VALUES (?, ?, ?, ?)",
                [nameClass, group, professorName, imageId]
            );

            console.log("Dados inseridos com sucesso:", result);
            return res.json({ created: true });
        } catch (error) {
            console.error("Erro ao inserir dados:", error);
            return res.json({ error: error.message || 'Erro desconhecido', created: false });
        } finally {
            if (connection) {
                await connection.end();
                console.log("Conexão com o banco de dados encerrada.");
            }
        }
    } catch (error) {
        console.error("Erro ao processar o FormData:", error);
        return res.json({ error: 'Erro ao processar o FormData', created: false });
    }
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});