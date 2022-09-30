import {createTransport} from "nodemailer";
import { emailmailer, emailpass } from "../auth.js";


  // create reusable transporter object using the default SMTP transport
export const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: emailmailer, // generated ethereal user
        pass: emailpass, // generated ethereal password
    },
    from: "losmatabugs@gmail.com"
});