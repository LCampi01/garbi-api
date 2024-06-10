const nodemailer = require('nodemailer');

class MailerService {
    constructor() {
        this.auth = {
            user: process.env.MAILER_EMAIL,
            pass: process.env.MAILER_PASSWORD
        },
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: this.auth
        });
    }

    generateBody(body) {
        return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte/Queja</title>
    <style>
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
${body}
</html>`;
    }

    async newReportEmail(to, code) {
        try {
            const options = {
                from: this.auth.user,
                to,
                subject: `¡Solicitud #${code} recibida!`,
                html: this.generateBody(`<body>
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
                </body>`)
            };

            return await this.transporter.sendMail(options);
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async setReportInRevision(to, code) {
        try {
            const options = {
                from: this.auth.user,
                to,
                subject: `¡Novedades en la solicitud #${code}!`,
                html: this.generateBody(`<body>
                    <div class="container">
                        <div class="header">
                            <h1>¡Solicitud en revisión!</h1>
                        </div>
                        <div class="content">
                            <p>Hola,</p>
                            <p>Estamos escribiendo para informar que su solicitud está en proceso de revisión.</p>
                            <p>En breves, tendrá una respuesta del supervisor. </p>
                            <p>Agradecemos su espera.</p>
                            <p>Saludos cordiales,<br>El equipo de garbi</p>
                        </div>
                        <div class="signature">
                            <img src="https://i.imgur.com/fI8Gd9l.jpeg" alt="Firma">
                        </div>
                    </div>
                </body>`)
            };

            return await this.transporter.sendMail(options);
        } catch (error) {
            throw new Error(error);
        }
    }

    async closeReport(to, code, rejected, observation) {
        try {
            const options = {
                from: this.auth.user,
                to,
                subject: `¡Solicitud #${code} cerrada!`,
                html: this.generateBody(`<body>
                    <div class="container">
                        <div class="header">
                            <h1>¡Solicitud ${rejected ? 'rechazada' : 'resuelta'}!</h1>
                        </div>
                        <div class="content">
                            <p>Hola,</p>
                            <p>Estamos escribiendo para informar que su solicitud ha sido ${rejected ? 'rechazada' : 'resuelta'}.</p>
                            <p>El supervisor ha dejado el siguiente comentario: </p>
                            <p> "${observation}" </p>
                            <p>Agradecemos su espera.</p>
                            <p>Saludos cordiales,<br>El equipo de garbi</p>
                        </div>
                        <div class="signature">
                            <img src="https://i.imgur.com/fI8Gd9l.jpeg" alt="Firma">
                        </div>
                    </div>
                </body>`)
            };

            return await this.transporter.sendMail(options);
        } catch (error) {
            throw new Error(error);
        }
    }

}

module.exports = new MailerService();
