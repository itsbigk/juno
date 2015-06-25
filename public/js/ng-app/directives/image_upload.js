angular.module('Juno')

.directive('imageUpload', imageUpload);

imageUpload.$inject = ['$state'];

function imageUpload() {

  return {
    restrict: 'E',
    scope: {
      itemData: '='
    },
    templateUrl: '../../../partials/admin/restaurants/image-upload.html',
    // template: '<input id="image" type="file" class="img-upload" data-preview-file-type="text" onchange="angular.element(this).scope().s3Upload(this, item)">',
    link: function($scope, element, attrs, $state) {
      $scope.s3Upload = function(image){
        console.log(image);
        var index = angular.element(image).scope().$index;
        console.log(index);
        // var status_elem = document.getElementById("status");
        // var url_elem = document.getElementById("image_url");
        // var preview_elem = document.getElementById("preview");
        var s3upload = new S3Upload({
          s3_object_name: showImageIdentifier(),  // upload object with a custom name
          file_dom_selector: 'image',
          s3_sign_put_url: '/sign_s3',
          // onProgress: function(percent, message) {
          //     status_elem.innerHTML = 'Upload progress: ' + percent + '% ' + message;
          // },
          onFinishS3Put: function(public_url) {
              // status_elem.innerHTML = 'Upload completed. Uploaded to: '+ public_url;
              // if($scope.type === 'edit' || $scope.type === 'create') {
                $scope.formData.imageUrl = public_url;
              // } else if($scope.type === 'menuEdit') {
                // console.log($scope.formData.menuItems[index].imageUrl);
                // $scope.formData.menuItems[index].imageUrl = public_url;
              // }
              // console.log($scope.formData.imageUrl);
              // preview_elem.innerHTML = '<img src="'+ public_url +'" style="width:300px;" />';
          },
          onError: function(status) {
            flash.setMessage(status);
          }
        });
      };

      function showImageIdentifier() {
        var restName;
        if($scope.type === 'create' || $scope.type === 'edit') {
          restName = $scope.formData.name;
        } else if($scope.type === 'menuEdit') {
          restName = $scope.formData.menuItems[index].name;
        }
        if(restName) {
          restName = restName.replace(/[^\w\s]|_/g, " ") .replace(/\s+/g, "_");
        }
        var dateId = Date.now().toString();
        return [dateId, restName].join('_');
      }
    }
  };
}
