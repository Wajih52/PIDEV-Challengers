const client = require ('twilio')('AC7b43592437241cb4e7dead4987dad5a9', 'd4477b5fb8c691fded5e86c68fd44cd0');



    client.messages.create({
        from: '+216 54 496 597',
        to: '+21654937221',
        body:'test sending msg '
    }).then(message =>console.log(message))
        .catch(error => console.log(error))
