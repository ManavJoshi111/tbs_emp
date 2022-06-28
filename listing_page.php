<?php
include 'db_connection.php';
function re($array)
{
    echo "<pre>";
    print_r($array);
}

$query = "SELECT * FROM `employee_table`";
$result_select = mysqli_query($con, $query);
$data = array();
$cnt = 0;
while ($row = mysqli_fetch_assoc($result_select)) {
    $data[$cnt]['name'] = $row['name'];
    $data[$cnt]['designation'] = $row['designation'];
    $cnt++;
}
//re($data);
echo json_encode($data);
