var jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {

    let allCookie = req.headers.cookie;
    if(allCookie)
    {
    let token;
    console.log("allCookie", allCookie);
    allCookie = allCookie.split(';');
    allCookie.forEach(elem => {
        let myarr = elem.split("=");
        myarr[0]=myarr[0].replace(' ','');

        if (myarr[0] == "token") {
            token = myarr[1];
        }
    })

    if (!token) {
        res.status(305).send("Header Missing")
    }
    else {
        jwt.verify(token, process.env.SECRET_TOKEN, (err, data) => {
            if (err) return res.sendStatus(500);
            req.usrData = data;
            next();
        })
    }
}
else{
    res.status(305).send("No Cookies available")
}

}

module.exports = auth;