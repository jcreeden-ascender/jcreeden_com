<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//echo 'POST: ' . $_POST


if(isset($_POST['name'])){

	$name = $_POST['name'];
	$company = $_POST['company'];
	$email = $_POST['email'];
	$phone = $_POST['phone'];
	$message = $_POST['message'];

	//connect to database
	$config = require_once("app/config.php");
	$dbserver=$config["DB_HOST"];
	$username=$config["DB_NAME"];
	$password=$config["DB_PASSWORD"];
	$database=$config["DB_NAME"];
	$conn = new mysqli($dbserver,$username,$password,$database);
	$sql = "INSERT INTO contact (name,company,email,phone,message) VALUES ('" . $name . "','" . $company . "','" . $email . "','" . $phone . "','" . $message . "')";


	$conn->query($sql);


	$conn->close();



	//send the email


	$to = 'johncreeden@hotmail.com';
	$subject = 'JCreeden Site Contact Form';
	$from = 'email@jcreeden.com';
	 
	// To send HTML mail, the Content-type header must be set
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	 
	// Create email headers
	$headers .= 'From: '.$from."\r\n".
	    'Reply-To: '.$from."\r\n" .
	    'X-Mailer: PHP/' . phpversion();
	 
	// Compose a simple HTML email message
	$email_message = '<html><body>';
	$email_message .= '<p style="font:16px Arial; font-weight:bold;">Contact Form:</p>';
	$email_message .= '<p style="font:14px Arial">';
	$email_message .= '<b>NAME: </b>' . $name . '<br>';
	$email_message .= '<b>COMPANY: </b>' . $company . '<br>';
	$email_message .= '<b>PHONE: </b>' . $phone . '<br>';
	$email_message .= '<b>EMAIL: </b>' . $email . '<br>';
	$email_message .= '<b>MESSAGE: </b>' . $message . '<br>';
	$email_message .= '</p>';
	$email_message .= '</body></html>';
	 
	// Sending email
	if(mail($to, $subject, $email_message, $headers)){
	    echo "Thanks! Your message has been sent.<br>I'll be in touch shortly.";
	} else{
	    echo "I'm sorry there was an error sending your message.<br>Please try again or send me an email at <a href='mailto:johncreeden@hotmail.com'>johncreeden@hotmail.com</a>.";
	}

	}
else{
	echo "Form submission was not valid.";
}

?>