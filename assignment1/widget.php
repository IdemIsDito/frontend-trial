<?php
//
// 20151023 - Jeroen Wever - jeroenrwever@gmail.com
// widghet.php
// Font-End Trail Assignment 1 - Deskbookers.com
//
$apiData = (object) [
  'name' => '<HNK> Hoofddorp',
  'rating' => 8.1,
  'review_count' => 50,
  'url' => 'https://www.deskbookers.com/nl-nl/hoofddorp/hnk-hoofddorp'
];
function safe($value, $doubleEncode = true) {
  return htmlspecialchars( (string) $value, ENT_QUOTES, 'utf-8', $doubleEncode);
}
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" />
    <link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet" />
    <link href='//fonts.googleapis.com/css?family=Open+Sans:400,600' rel='stylesheet' type='text/css'>
    <link href="./css/style.css" rel="stylesheet" />
	</head>
	<body>
		<div class="mini-widget">
      <img class="logo" src="./img/deskbookers-logo.png">
      <div class="rating">
        <?php
          $rating = round($apiData->rating / 2);
          for ($i = 1; $i <= 5; $i++) {
            echo '<div class="star">';
            echo $rating >= $i
              ? '<span class="icon-star"></span>'
              : '<span class="icon-star-empty"></span>';
            echo '</div>';
          }
        ?>
        <p class="review-count">
          <?php echo 'Op basis van '. $apiData->review_count . ' reviews'; ?>
        </p>
      </div>
      <h1 class="name"><?php echo safe($apiData->name); ?></h1>
      <a class="link" target="_blank" href="<?php echo $apiData->url ?>">
        Bekijk reviews op
        <img class="text-only-img" src="./img/deskbookers-logo-text-only.png">
      </a>
    </div>
		<!-- Scripts -->
		<script type="text/javascript" src="//code.jquery.com/jquery-2.1.4.min.js"></script>
		<script type="text/javascript" src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
	</body>
</html>
