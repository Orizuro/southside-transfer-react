const HTML_TEMPLATE = (firstname, lastname,origin,destination, day, time,payment,price,nPasseger) => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trip Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
        }
        p {
            color: #555;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hello ${firstname} ${lastname}</h1>
        <p>Here is the confirmation of your trip from:</p>
        <p>${origin} </p>
        <p>To:</p>
        <p>${destination}</p>
        <p>This trip is scheduled for day ${day} at ${time}.</p>
        <p>Number of passengers: ${nPasseger}</p>
        <p>Your choise of payment is: ${payment}</p>
        <p>The price of your trip is: ${price} €</p>
        <p>  The driver will be at Faro airport waiting for you in the arrivals hall near "Café Central" holding a sign with your name.</p>
        <p> If you can't find your driver, please call the emergency number +351 914313808 </p>
        <p>If you have any questions, please feel free to contact us at the following number or email:</p>
       
        <p>Phone: +351 914313808<br>
        Email: custumer@southsidetransfers.com</p>
    </div>
</body>
</html>

  `;
}

export default HTML_TEMPLATE;