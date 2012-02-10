<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>测试</title>
</head>
<body>
    <form action="index.php" method="post">
		<input type="text" name="user" />
		<input type="text" name="password" />
		<input type="submit" value="submit" />
	</form>
</body>
<?php include_once("scripts/T.single.inc") ?>
<script type="text/javascript">
T.using('XY.Widget.Autocomplete',function(){
	var ac=new XY.Widget.Autocomplete();
	ac.show();
});
</script>
</html>