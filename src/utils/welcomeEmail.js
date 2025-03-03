const sendEmail = require("./sendEmail");

const sendWelcomeEmailCreator = async ({  email }) => {
  const message = `
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>We're thrilled to have you join our community</title>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Outfit&display=swap");

      body {
        margin: 0;
        padding: 20px 20px 0 20px;
        font-family: "Outfit", sans-serif;
        background-color: #f8f8f8;
        line-height: 1.5;
        min-height: 100%;
        font-weight: normal;
        font-size: 15px;
        color: #2f3044;
      }

      p,
      h1,
      h2 {
        line-height: 22.68px;
      }

      .container {
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #ffffff;
        padding: 45px 0 0 0;
        border-radius: 24px;
        margin: 40px auto;
        max-width: 600px;
        color: black;
        font-size: 18px;
        font-weight: 400;
      }

      .header {
        margin-top: 40px;
      }

      .experince {
        width: 100%;
        margin-top: -25px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .experince img {
        margin-top: -20px;
      }

      .section-content {
        padding: 20px;
      }

      .section-content p h1 {
        font-size: 18px;
      }

      .section-content span {
        color: #4033f5;
        font-weight: 600;
      }

      .gettingStarted {
        margin-top: 45px;
        text-align: left;
      }

      .gettingStarted h1 {
        font-size: 18px;
        font-weight: 700;
      }

      .gettingStarted ul {
        text-align: left;
      }

      .gettingStarted p {
        margin-top: 5px;
      }

      .click {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .section-content button {
        width: 249px;
        height: 55px;
        background-color: black;
        border-radius: 10px;
        font-size: 24px;
        border: none;
        color: white;
        margin-top: 30px;
        cursor: pointer;
      }


    </style>
  </head>

  <body>
    <main class="container">
      <section class="section-content">
        <div class="experince">
          <img
            alt="Dimpified Logo"
            src="https://res.cloudinary.com/diz6tdgeo/image/upload/v1725638667/dimp_rwgeri.png"
            style="height: 60px"
          />
        </div>
        <p>Hello ${email},</p>
        <p>
         We're so excited to welcome you to the DIMP! 
        </p>

         <p>
        You are one step closer to having your own free business website.   
        </p>

         <p>
        Complete your profile registration and access your business website with the button below. 
        </p>

      
        <div class="click">
          <a
            href="https://dimpified.com/creator/signin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>Sign In Now</button>
          </a>
        </div>
        <p class="last">Your journey to business success starts now!</p>
      </section>
      <footer>
        <div class="wrapper">
          <h3>The DIMP Team</h3>
          <p class="copyright">
            <span>&copy;</span> 2024 Dimpified. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  </body>
</html>
    `;

  return sendEmail({
    to: email,
    subject: "Welcome to DIMP!",
    html: message,
  });
};

module.exports = sendWelcomeEmailCreator;
