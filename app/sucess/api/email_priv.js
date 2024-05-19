const HTML_PRIV = (firstname, lastname,payment,phoneNumber,client_email,origin,destination,price,dataPickUp,timePickUp,PassagerTotal,adult,child,infant,flightNumber,displayName,totalLuggage) => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trip Information</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .header h1 {
            margin: 0;
        }
        .info {
            margin-bottom: 20px;
        }
        .info h2 {
            margin: 0 0 10px 0;
            font-size: 18px;
            color: #333;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
        }
        .info p {
            margin: 5px 0;
            font-size: 16px;
        }
        .info strong {
            display: inline-block;
            width: 150px;
            vertical-align: top;
        }
        .info span {
            display: inline-block;
            width: calc(100% - 160px);
        }
        .footer {
            text-align: center;
            color: #888;
            font-size: 14px;
            border-top: 1px solid #ddd;
            padding-top: 10px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Trip Information</h1>
        </div>
        <div class="info">
            <h2>Passenger Details</h2>
            <p><strong>Name:</strong> ${firstname} ${lastname}</p>
            <p><strong>Phone Number:</strong> +${phoneNumber}</p>
            <p><strong>Email:</strong> ${client_email}</p>
        </div>
        <div class="info">
            <h2>Trip Details</h2>
            <p><strong>Origin:</strong> <span>${origin}</span></p>
            <p><strong>Destination:</strong> <span>${destination}</span></p>
            <p><strong>Pick-Up Date:</strong> ${dataPickUp}</p>
            <p><strong>Pick-Up Time:</strong> ${timePickUp}</p>
            <p><strong>Flight Number:</strong> ${flightNumber}</p>
        </div>
        <div class="info">
            <h2>Passenger Count</h2>
            <p><strong>Total Passengers:</strong> ${PassagerTotal}</p>
            <p><strong>Adults:</strong> ${adult}</p>
            <p><strong>Children:</strong> ${child}</p>
            <p><strong>Infants:</strong> ${infant}</p>
        </div>
        <div class="info">
            <h2>Luggage Details</h2>
            <p><strong>Total Luggage:</strong> ${totalLuggage}</p>
        </div>
        <div class="info">
            <h2>Payment Details</h2>
            <p><strong>Payment Method:</strong> ${payment}</p>
            <p><strong>Price:</strong> ${price}</p>
        </div>
        <div class="footer">
            <p>© 2024 Southside Transfer. All rights reserved.</p>
        </div>
    </div>
</body>
</html>


  `;
}

export default HTML_PRIV;