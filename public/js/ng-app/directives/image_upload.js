angular
  .module('Juno')
  .directive('imageUpload', function() {
    return {
      restrict: 'E',
      templateUrl: '../../../partials/admin/restaurants/image-upload.html',
      link: function($scope, element, attrs) {
        $scope.s3Upload = function(image){
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
                console.log(public_url);
                $scope.formData.imageUrl = public_url;
                console.log($scope.formData.imageUrl);
                // preview_elem.innerHTML = '<img src="'+ public_url +'" style="width:300px;" />';
            },
            onError: function(status) {
              flash.setMessage(status);
            }
          });
        };

        function showImageIdentifier() {
          var restName = $scope.formData.name;
          if(restName) {
            restName = restName.replace(/[^\w\s]|_/g, " ") .replace(/\s+/g, "_");
          }
          var dateId = Date.now().toString();
          return [dateId, restName].join('_');
        }
      }
    };
  });
