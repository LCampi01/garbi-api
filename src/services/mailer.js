const nodemailer = require('nodemailer');

class MailerService {
    constructor() {
        this.auth = {
            user: 'garbi.reports@outlook.com',
            pass: 'garbireports1999'
        },
        this.transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: this.auth
        });
    }

    async newReportEmail(to, code) {
        try {
            const options = {
                from: this.auth.user,
                to,
                subject: `¡Solicitud #${code} recibida!`,
                html: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte/Queja</title>
    <style>
        /* Estilos generales */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1, p {
            margin-bottom: 20px;
        }
        /* Estilos específicos */
        .header {
            background-color: #12422c;
            color: #fff;
            padding: 10px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            padding: 20px;
        }
        .button {
            display: inline-block;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }
        .button:hover {
            background-color: #0056b3;
        }
        .signature {
            text-align: center;
            margin-top: 20px;
        }
        .signature img {
            max-width: 200px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>¡Solicitud recibida!</h1>
        </div>
        <div class="content">
            <p>Hola,</p>
            <p>Estamos escribiendo para informar que su solicitud ha sido recibida satisfactoriamente.</p>
            <p>En breves, será analizada por un supervisor. </p>
            <p>Agradecemos su participación.</p>
            <p>Saludos cordiales,<br>El equipo de garbi</p>
        </div>
        <div class="signature">
            <img src="https://i.imgur.com/fI8Gd9l.jpeg" alt="Firma">
        </div>
    </div>
</body>
</html>
`
            };

            return await this.transporter.sendMail(options);
        } catch (error) {
            console.error(error);
        }
        return ;
    }
}

module.exports = new MailerService();
