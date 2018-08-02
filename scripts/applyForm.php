<?php
	session_start();
	require 'checker.php';
	check(true);
?>
<meta charset="utf-8">
<link rel="stylesheet" href="../styles/applyForm.css">

<p>Administrátor nebo moderátoři této třídy musí potvrdit tvou žádost o vstup do této třídy. Dej jim tedy vědět, kdo skutečně jsi, ať vědí, koho mezi sebe přijímají.</p>
<form action="applyForm.php" method="POST"><br />
	<input type=text name="name" placeholder="Jméno" required><br />
	<input type=text name="surname" placeholder="Přijímění" required><br />
	<textarea type="message" name="message" placeholder="Dodatečné informace" id="text"></textarea><br /><br />
	<input type=submit name="posted" value="Odeslat žádost"><br />
</form>

<?php
	require_once("connect.php");
	include 'logger.php';

	if(isset($_POST['posted'])){

		$query = "SELECT admin FROM classes WHERE name='2.B GJVJ'";		//TODO
		$result = mysqli_query($connection, $query);
		if (!$result){echo "An error occured. Error: ".mysqli_error();}
		$admin = mysqli_fetch_array($result);
		$admin = $admin['admin'];
		$query = "SELECT email FROM users WHERE name='$admin'";
		$result = mysqli_query($connection, $query);
		if (!$result){echo "An error occured. Error: ".mysqli_error();}
		$toemail = mysqli_fetch_array($result);
		$toemail = $toemail['email'];

		$user = $_SESSION['user'];
		$name = $_POST['name'];
		$surname = $_POST['surname'];
		$message = $_POST['message'];
		
		$timestamp = time();
		$query = "INSERT INTO applications (nickname, name, surname, message, class, age) VALUES ('$user', '$name', '$surname', '$message', '/*TODO*/', '$timestamp')";
		$result = mysqli_query($connection, $query);
		if(!$result){echo "An Error occured. Error: ".mysqli_error($connection);}
		
		$message = wordwrap($message, 70, "\r\n");
		
		$to = $toemail;
		$email_subject = "Žádost o založení přijetí to třídy od: $name $surname";
		$email_body = "Detaily žádosti:".
		"\nJméno: $name".
		"\nPřijímení: $surname".
		"\nText žádosti (nemuselo být vyplněno):".
		"\n$message".
		"\n\n".
		"\nŽádost můžete přijmout nebo zamítnout na stránce se seznamem testů.".
		"\nTuto Žadost schvalte pouze v případě, že jste si jistí kdo tento uživatel ve skutečnosti je.".
		"\nTento e-mail byl vygenerován automaticky a tudíž na něj neodpovídejte.".
		$headers = "From: info@seznamtestu.chytrak.cz\n";
		mail($to,$email_subject,$email_body,$headers);
		$user = $_SESSION['user'];
		fileLog("Uživatel $user zažádal o přijetí do třídy /*TODO*/.");
		echo "Vaše žádost o přijetí do této třídy byla odeslána. O přijetí nebo zamítnutí požadavku se dozvíte na stránce se seznamem tříd (<a href='home.php'>zde</a>).<br />";
	}
?>
<a href="apply.php">Návrat na seznam tříd</a>