var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cowin1",
    port: 3307

});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
router.post('/registration', function (req, res, next) {
    const Name = req.body.name
    console.log(Name)
    const Phoneno = req.body.phoneno
    console.log(Phoneno)
    const Zipcode = req.body.zipcode
    console.log(Zipcode)
    const Email = req.body.email
    console.log(Email)
    con.query(`SELECT * from registration WHERE email= "${Email}"`, function (err, result) {
        console.log(result.RowDataPacket)
        console.log(result.length == 2)
        if (result.length == 0) {
            con.query(
                `SELECT * from registration WHERE phoneno= "${Phoneno}"`, function (err, result) {
                    console.log(result)
                    if (result.length == 0) {
                        console.log("hello123")
                        con.query("INSERT INTO registration (name,email,phoneno) VALUES (?,?,?)",
                            [Name, Email, Phoneno], (err, result) => {
                                if (err) throw err;
                                console.log("insert", result.insertId)
                                const registration_ID = result.insertId
                                Zipcode.forEach((k) => {
                                    console.log("HYYYYYYYYYYYYYY", k["value"])
                                    Zipcode1 = k["value"]
                                    con.query("INSERT INTO findbypin (pincode,registration_id) VALUES (?,?)",
                                        [Zipcode1, registration_ID], (err, result) => {
                                            console.log("insert loopp")
                                        })
                                });
                            })
                        res.send({ message: "suceesfull register" })
                    }
                    else {
                        res.send({ message: "phoneno  exist" })
                    }
                }
            )
            /*
            console.log("hello123")
            con.query("INSERT INTO registration (name,email,phoneno) VALUES (?,?,?)",
                [Name, Email, Phoneno], (err, result) => {
                    if (err) throw err;
                    console.log("insert", result.insertId)
                    const registration_ID = result.insertId
                    Zipcode.forEach((k) => {
                        console.log("HYYYYYYYYYYYYYY", k["value"])
                        Zipcode1 = k["value"]
                        con.query("INSERT INTO findbypin (pincode,registration_id) VALUES (?,?)",
                            [Zipcode1, registration_ID], (err, result) => {
                                console.log("insert loopp")
                            })
                    });
                })
            res.send({ message: "suceesfull register" })
            */
        }
        else {
            console.log("hello")
            res.send({ message: "emailid already  exist" })
        }
    })
});
/*
con.query("INSERT INTO findbypin (pincode) VALUES (?)",
[Zipcode], (err, result) => {
    console.log("insert")
})
    const a = con.query('SELECT * FROM findbypin  WHERE pincode=' , function (err, result) {
    if (err) throw err;
    const fetchdata = result
    console.log(fetchdata)
con.query(`SELECT * FROM  ${findbypin} WHERE pincode = "${Zipcode}" `, function (err, result) {
    if (err) throw err;
    console.log(result);
    //You will get an array. if no users found it will return.
    if (result[0].Zipcode.length > 0) {
        //Then do your task (run insert query)
        console.log(Zipcode)
        con.query("INSERT INTO findbypin (pincode) VALUES (?)",
            [Zipcode], (err, result) => {
                console.log("insert123456")
            })
    }
    else {
        alert("already registered");

    }
});
})
     */



router.post('/insert', async function (req, res, next) {
    const zipcodes = req.body.zipcodes
    console.log(zipcodes)
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    console.log(date)
    var options = {
        method: 'GET',
        url: 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin',
        qs: { pincode: zipcodes, date: date },
        headers:
        {
            'postman-token': '0b7d26cd-0924-34b4-50d2-e6ad3e59fb73',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'accept-language': 'hi_IN'
        }
    };
    var pincode;
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        pincode = body
    });
    console.log("pincode", pincode)
});
router.get('/fetch', function (req, res, next) {


});

module.exports = router;
