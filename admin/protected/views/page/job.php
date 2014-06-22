<div class="table-content" ng-controller="JobTable" ng-init="init()">
  <table class="table table-striped">
    <thead>
      <td><?php echo Yii::t("strings", "Title")?></td>
      <td><?php echo Yii::t("strings", "Date")?></td>
      <td><?php echo Yii::t("strings", "Actions")?></td>
    </thead>
    <tbody>
      <?php foreach($jobes as $job) :?>
      <tr>
        <td><?php echo $job->title?></td>
        <td><?php echo $job->cdate?></td>
        <td>
          <a href="<?php echo Yii::app()->baseUrl."/page/job?id=". $job->cid?>">Edit</a>
          <a href="<?php echo Yii::app()->baseUrl."/page/addjob"?>">Delete</a>
        </td>
      </tr>
      <?php endforeach;?>
    </tbody>
  </table>
</div>