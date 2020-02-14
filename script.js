/*
Navigate to the most recent activity you have in Garmin Connect (as in https://connect.garmin.com/modern/activity/5555555555 ), then hit F12 to open dev tools to get to the Javascript Console. Then paste the below code and hit enter to run it. Can change ttl from 100 to whatever # of activities you want to download.
If you want a different format, change the "tcx" part of the URL to the appropriate format acronym if garmin supports it.
If your connection is too slow to do a full download in less than 3 seconds every time, change the downloadTimeoutLength from 3 * 1000 to whatever number you want (it's 3*1000 because that's 3000 milliseconds = 3 seconds).
 
[CODE]*/
var a = window.location.pathname.split("/");
var id = a[a.length-1];
var tcxUrl = "https://connect.garmin.com/modern/proxy/download-service/export/tcx/activity/";
var cnt = 1, ttl = 100; /*Change ttl from 100 to whatever # of activities you want to download*/
var downloadTimeoutLength = 3 * 1000;
var downloadUrl = tcxUrl + id;
window.location.href = downloadUrl;
 
setTimeout(
   (getMore = function(){
    jQuery.getJSON("https://connect.garmin.com/modern/proxy/activity-service/activity/"+id+"/relative?_="+Math.random()
        ,function(d){
            id = d.previousActivityId;
            downloadUrl = tcxUrl + id;
            window.location.href = downloadUrl;
            if(++cnt<ttl){
                setTimeout(getMore,downloadTimeoutLength );
            }
        }
    );
   })
   ,downloadTimeoutLength
);
/*[/CODE]
 
It goes from most recent back downloading each one. If you don't put the right total # to download them all, just navigate to the last one it got and re-run from there.*/
