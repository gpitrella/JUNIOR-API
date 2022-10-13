

export const emailCollaborate = (text, email, linkedin, number, userProject, userColaborator) => {
    
 return ( `<div class=""><div class="aHl"></div><div id=":mk" tabindex="-1"></div><div id=":nr" class="ii gt" jslog="20277; u014N:xr6bB; 4:W251bGwsbnVsbCxbXV0."><div id=":m6" class="a3s aiL msg2237192363544095831"><div class="adM">
 </div><div><div class="adM">
  </div><table cellspacing="0" cellpadding="0" border="0" style="text-align:center;width:100%;background-color:#f2f2f2;font-family:Arial,Helvetica,sans-serif;color:#20252a">
   <tbody>
    <tr>
     <td>
      <table style="text-align:left;width:600px;margin:auto;font-size:14px" cellspacing="0" cellpadding="0" border="0">
       <tbody>
        <tr>
         <td style="padding-top:10px;padding-bottom:10px;text-align:center;">
          <a href="https://appjunior.vercel.app" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://appjunior.vercel.app">
           <img style="border:0" src="https://res.cloudinary.com/djgghmpgh/image/upload/v1665672746/JuniorLogo_pitmgl.png" style="width:100px" >
          </a>
         </td>
        </tr>
        <tr>
         <td bgcolor="#ffffff" style="background-color:#ffffff;padding:30px;font-size:14px">
          Hola ${userProject.name}! 
          <br>
          <br>
           Te contactamos de <strong>JUNIOR</strong> por que tenes un nuevo interesado en participar de tu proyecto! <i>“Te felicitamos por el interés que esta causando tu proyecto!”</i>
          <br>
          <br>
           Te sugerimos que te pongas en contacto con la persona interesada así pueden coordinar las tareas, avanzar con el proyecto y sumar
           experiencia de ambos lados. En conjunto se pueden hacer grandes cosas. Además podes ir actualizando el estado de las tareas pendientes de tu proyecto en 
           tu perfil para poder avanzar de una forma ordena en el desarrollo completo del proyecto.
          <br>
          <br>
           Te facilitamos a continuación información de la persona interesada en participar de tu proyecto, como así también el mensaje que te envía el colaborador.
          <br>  
         </td>
        </tr>
        <tr>
        <td style="background-color:white;padding:30px;padding-top:0px;font-size:14px">
         Información del colaborador:
         <br>
         <table align="left" style="text-align:left;margin:auto;font-size:14px" cellspacing="7" cellpadding="0" border="0">
          <tbody>
           <tr>
            <td>• Nombre del Colaborador: </td>
            <td>  
             ${ userColaborator.name }
            </td>
           </tr>
           <tr>
            <td>• Linkedin del Colaborador: </td>
            <td>
             ${ linkedin }
            </td>
           </tr>
           <tr>
            <td>• Email del Colaborador: </td>
            <td>
             ${ email }
            </td>
           </tr>
           <tr>
            <td>• Número de contacto (WhatsApp) del Colaborador: </td>
            <td>
             ${ number }
            </td>
           </tr>
           <tr>
            <td>• Mensaje que te envia el Colaborador: </td>
            <td>
             ${ text }
            </td>
           </tr>           
          </tbody>
         </table>
        </td>
       </tr> 
       <tr>
            <td bgcolor="#ffffff" style="background-color:#ffffff;padding:30px;font-size:14px">
                Esperamos puedan avanzar exitosamente en el proyecto. Recorda que podes actuzarlo en cualquier momento, cualquier inquietud que tengas
                no dudes en contactarnos así podemos ayudarte. 
            <br>
            <br>
                Que tengas una excelente semana!
            <br>
            <br>
                Saludos.
            <br>
            <br>
                JUNIOR.
            <br>
            </td>
        </tr>
        
        <tr>
         <td style="background-color:white;padding:30px;padding-top:0px;font-size:10px">
          <i>Copyright © 2022 JUNIOR, All rights reserved. </i>
          <br>
           Estas recibiendo este e-mail porque creaste una cuenta y un proyecto en JUNIOR.
         </td>
        </tr>
        <tr>
         <td style="text-align:center;padding:15px;font-size:11px">
           Ponete en contactos con nosotros.  
          <a href="https://appjunior.vercel.app">Contacto</a>           
         </td>
        </tr>
       </tbody>
      </table>
     </td>
    </tr>
   </tbody>
  </table>  
  
  
 </div></div><div class="adL">
</div></div></div><div id=":mg" class="ii gt" style="display:none"><div id=":mf" class="a3s aiL "></div></div><div class="hi"></div></div>` )};