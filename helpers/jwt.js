const { expressjwt } = require("express-jwt");


function authJwt() {
    const secret = 'Veigar-hahaha';
    const api = process.env.API_URL;
   
    return expressjwt({
        secret,
        algorithms: ['HS256'],
       }).unless({
        path: [
            /* `${api}/users/login`,
            `${api}/users/`, */
       /*      {url: /\/api\/v1\/users(.*)/ , methods: ['DELETE', 'OPTIONS'] },
            {url: /\/api\/v1\/users(.*)/ , methods: ['POST', 'OPTIONS'] },
            {url: /\/api\/v1\/users(.*)/ , methods: ['PUT', 'OPTIONS'] }, */
           /*  `${api}/users/resetpassword`,
            `${api}/users/resetPasswordnew`, */
              { url: /(.*)/ },
        ]
    })
}





module.exports = authJwt