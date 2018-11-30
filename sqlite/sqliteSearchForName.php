<?php
  header("Access-Control-Allow-Origin: *");

  // http://theonlytutorials.com/php-pdo-sqlite-example-insert-read-search/
  if( $_GET ){
    $city = $_GET['city'];
    $limit = isset($_GET['limit']) ? $_GET['limit'] : '5';

    try{
      include('sqliteConfigWeather.php');

      /* Create a prepared statement */
      $stmt = $db -> prepare("SELECT * from weather where `city` LIKE :city || '%' LIMIT $limit");

      /* bind param */
      $stmt -> bindParam(':city', $city, PDO::PARAM_STR);

      /* execute the query */
      $stmt -> execute();

      /* fetch all results */
      $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

      if ($results) {
        print json_encode($results);
      } else {
        print "null";
      }

      /* close connection */
      $db = null;
    }
    catch (PDOExecption $e){
      echo $e->getMessage();
    }
  }
?>
