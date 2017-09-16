angular.module('myApp.loader',[])
.service('LoaderService', function(){
    var loader = document.getElementById('loader-div');
    this.show = function(){
        loader.classList.add('show-loader');
    }
    this.hide = function(){
        setTimeout(
            function(){
                loader.classList.remove('show-loader');
            }, 1000);
        
    }
});