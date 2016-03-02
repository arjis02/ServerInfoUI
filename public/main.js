$(document).ready(function(){

  $('#mem-button').on('click', function() {
    setInterval(function() {
      $.get({
        url: 'http://40.112.210.248:8080/memfree',
        dataType: 'json'
      }).done(function(data){
        var obj = jQuery.parseJSON(data);
        var activeMemory = obj.Active.size;
        var freeMemory = obj.MemFree.size;
        var totalMemory = obj.MemTotal.size;
        var result = (activeMemory/10000) + ' ' + (freeMemory/10000);

        $('.bar1 rect').attr("width", totalMemory/10000);
        $('.bar1 text').html("Total Memory: " + totalMemory + "kB");

        $('.bar2 rect').attr("width", activeMemory/10000);
        $('.bar2 text').html("Active Memory: " + activeMemory + 'kB');

        console.log((activeMemory/10000) + ":" + (freeMemory/10000));
      }).fail(function() {
        console.log('error');
      });
    }, 1000);
  });

  $('#cpu-button').on('click', function() {
    $.get({
      url: 'http://40.112.210.248:8080/cpuinfo',
      dataType: 'json'
    }).done(function(data) {
      var obj = jQuery.parseJSON(data);
      var modelName = obj.cpuinfo.model_name[0];
      var numOfCores = obj.cpuinfo.cpu_cores;
      var speed = obj.cpuinfo.cpu_MHz;
      var cache = obj.cpuinfo.cache_alignment;
      var vendor = obj.cpuinfo.vendor_id[0];

      $('.model-name').html(modelName);
      $('.num-of-cores').html(numOfCores);
      $('.mhz').html(speed);
      $('.ca').html(cache);
      $('.vendor').html(vendor);
    }).fail(function() {
      console.log('error');
    });
  });
});