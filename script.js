const { ipcRenderer } = require("electron");
const ipc=ipcRenderer;
const fs = require('fs');
const path = require('path');

const { exec } = require('child_process');
const { time } = require("console");

document.querySelector("#minimize").addEventListener("click", () => {
  ipc.send("manualMinimize");
});
document.querySelector("#maximize").addEventListener("click", () => {
  ipc.send("manualMaximize");
});
document.querySelector("#close").addEventListener("click", () => {
  ipc.send("manualClose");
});

const checkbox = document.getElementById("checkbox")

var videopath = "";

document.getElementById("exbtn").classList.toggle("exp_light");
document.getElementById("stxt").classList.toggle("stxt_light");
document.getElementById("topbar").classList.toggle("topbar_light");
document.getElementById("close").classList.toggle("close_light");
document.getElementById("minimize").classList.toggle("minimize_light");
document.getElementById("maximize").classList.toggle("maximize_light");
document.getElementById("manual_censor_text").classList.toggle("manual_censor_text_light");
document.getElementById("upldv").classList.toggle("upldv_light");
document.getElementById("remvid").classList.toggle("remvid_light");
//document.getElementById("censor_btn_text").classList.toggle("censor_btn_text_light");
document.getElementById("vfolderbtn").classList.toggle("vfolderbtn_light");
document.getElementById("videos").classList.toggle("videos_light");
document.getElementById("starttext").classList.toggle("starttext_light");
document.getElementById("endtext").classList.toggle("endtext_light");

var vcheckbox = document.getElementById('vcheckbox');
var pcheckbox = document.getElementById('pcheckbox');
var echeckbox = document.getElementById('echeckbox');

lighttheme = true;

checkbox.addEventListener("change", () => {
  if (lighttheme == true)
  { console.log("changeddd");
    lighttheme = false;
    // document.getElementById("starttext").style.backgroundColor = "rgb(0, 17, 33)";
    // document.getElementById("endtext").style.backgroundColor = "rgb(0, 17, 33)";
    document.getElementById("starttime").style.color = "tomato";
    document.getElementById("endtime").style.color = "tomato";
    //on hover starttext background color: rgb(0, 95, 183)
    document.getElementById('aleartmessage').style.color = 'white';

    //set exportt background color to wheat
    document.getElementById('exportt').style.backgroundColor = 'rgb(75, 78, 97)';
    document.getElementById('exportt').style.border = '7px solid rgb(156, 115, 231)';

    document.getElementById('save_video').style.backgroundColor = 'rgb(107, 39, 233)'
    document.getElementById('cancel_video').style.backgroundColor = 'rgb(107, 39, 233)'

    document.getElementById('cancel_video').style.color = 'white';
    document.getElementById('save_video').style.color = 'white';
  }

  else{
     lighttheme = true;

    // document.getElementById("starttext").style.backgroundColor = "rgb(252, 186, 63)";
    // document.getElementById("endtext").style.backgroundColor = "rgb(252, 186, 63)";
    // document.getElementById("starttext").style.color = "white";
    // document.getElementById("endtext").style.color = "white";
    document.getElementById("starttime").style.color = "red";
    document.getElementById("endtime").style.color = "red";
    document.getElementById('aleartmessage').style.color = 'black';

    document.getElementById('exportt').style.backgroundColor = 'wheat';
    document.getElementById('exportt').style.border = '7px solid rgb(156, 115, 231)';

    document.getElementById('exportt').style.backgroundColor = 'wheat';
    document.getElementById('exportt').style.border = '7px solid rgb(238, 229, 229)'

    document.getElementById('save_video').style.backgroundColor = 'white'
    document.getElementById('cancel_video').style.backgroundColor = 'white'
    document.getElementById('cancel_video').style.color = 'black';
    document.getElementById('save_video').style.color = 'black';

    }

    if (!videopath.includes('No folder selected') && videopath != ''){
      if (lighttheme) document.getElementById('vplayer').style.boxShadow = '0px 0px 100px rgba(210,234,228,0.8)';
      else document.getElementById('vplayer').style.boxShadow = '0px 0px 100px rgba(161, 250, 244, 0.432)';
      setted = true;
    }

  if (prev != "" && lighttheme) {
    prev.style.border = '4px solid salmon';
    document.getElementById("qtext").style.color = "black";
  }
  else if (prev != "" && !lighttheme) {
    prev.style.border = '4px solid rgb(0, 95, 183)';
    document.getElementById("qtext").style.color = "white";
  }

  if (lighttheme){
    const sbox = document.getElementById("searchbox2")
    sbox.id = "searchbox";
}
  else 
    document.getElementById("searchbox").id = "searchbox2";
  

  const body = document.getElementById("bdy");
  body.style.backgroundColor = checkbox.checked ? "#212433" : "wheat";
  document.getElementById("theme_slider").style.backgroundColor = checkbox.checked ? "#85b4c4" : "#f5f1f1";

  document.getElementById("manual").style.backgroundColor = checkbox.checked ? "#292b5b" : "#f0f05a";

  document.getElementById("upld").style.backgroundColor = checkbox.checked ? "#292b5b" : "#f0f05a";

  document.getElementById("censor").style.backgroundColor = checkbox.checked ? "#94162b" : "#fcdbe2";

  document.getElementById("censor_toggles").style.backgroundColor = checkbox.checked ? "#94162b" : "#fcdbe2";

  document.getElementById("censor_levels").style.backgroundColor = checkbox.checked ? "#292b5b" : "#f0f05a";

  document.getElementById("draginnercont").style.backgroundColor = checkbox.checked ? "#292b5b" : "#f0f05a";

  // document.getElementById("starttext").style.color = checkbox.checked ? "white" : "black";
  // document.getElementById("endtext").style.color = checkbox.checked ? "white" : "black";

  document.getElementById("toggles_text").style.color = checkbox.checked ? "white" : "black";
  document.getElementById("toggles_text2").style.color = checkbox.checked ? "white" : "black";
  document.getElementById("toggles_text3").style.color = checkbox.checked ? "white" : "black";


  document.getElementById("exbtn").classList.toggle("exp_light");
  document.getElementById("exbtn").classList.toggle("exp_dark");

  document.getElementById("stxt").classList.toggle("stxt_light");
  document.getElementById("stxt").classList.toggle("stxt_dark");

  document.getElementById("topbar").classList.toggle("topbar_light");
  document.getElementById("topbar").classList.toggle("topbar_dark");

  document.getElementById("close").classList.toggle("close_light");
  document.getElementById("close").classList.toggle("close_dark");

  document.getElementById("minimize").classList.toggle("minimize_light");
  document.getElementById("minimize").classList.toggle("minimize_dark");

  document.getElementById("maximize").classList.toggle("maximize_light");
  document.getElementById("maximize").classList.toggle("maximize_dark");

  document.getElementById("manual_censor_text").classList.toggle("manual_censor_text_light");
  document.getElementById("manual_censor_text").classList.toggle("manual_censor_text_dark");

  document.getElementById("upldv").classList.toggle("upldv_light");
  document.getElementById("upldv").classList.toggle("upldv_dark");

  document.getElementById("remvid").classList.toggle("remvid_light");
  document.getElementById("remvid").classList.toggle("remvid_dark");

  //document.getElementById("censor_btn_text").classList.toggle("censor_btn_text_light");
  //document.getElementById("censor_btn_text").classList.toggle("censor_btn_text_dark");

  document.getElementById("vfolderbtn").classList.toggle("vfolderbtn_light");
  document.getElementById("vfolderbtn").classList.toggle("vfolderbtn_dark");

  document.getElementById("videos").classList.toggle("videos_light");
  document.getElementById("videos").classList.toggle("videos_dark");

  document.getElementById("starttext").classList.toggle("starttext_light");
  document.getElementById("starttext").classList.toggle("starttext_dark");

  document.getElementById("endtext").classList.toggle("endtext_light");
  document.getElementById("endtext").classList.toggle("endtext_dark");


});


profanity_detected = false;
violence_detected = false;
explicit_detected = false;

document.getElementById('upldv').addEventListener('click', function(event) {
  const pythonScriptPath = 'file.py';
const command = `python ${pythonScriptPath}`;
exec(command, (error, stdout, stderr) => {
    console.log(`${stdout}`);
    stdout = stdout.replace(/\\/g, '/');
    console.log("gotlF: ", stdout);
    videopath = stdout; 
    ulpd();
});
});

const command = `cd models\\audio_model && venv\\Scripts\\activate && python main.py`;
const command2 = 'cd models\\violence && venv\\Scripts\\activate && python vmodel.py';
const command3 = 'cd models/nsfw && venv\\Scripts\\activate && cd.. && python emodel.py '
const export_cmnd = 'python filter.py';
video_file_name = "";


var mutetimeframes = "";
var violencetimeframes = "";

document.getElementById('exbtn').addEventListener('click', function(event) {
  if (videopath.includes('No folder selected') || videopath === '') {
    errormsg("No video selected", false);
    return;
  }

  //pause the video

  document.getElementById('videoscr').pause();

  document.getElementById('exportt').style.display = 'grid';
  document.getElementById('video_filter_typez').style.display = 'block';
  document.getElementById('audio_filter_typez').style.display = 'block';
  
  mutetimeframes = "";
  violencetimeframes = "";
  
  for (var i = 0; i < mute_timeframes.length; i++) {
    mutetimeframes += mute_timeframes[i][0] + "," + mute_timeframes[i][1];
    if (i != mute_timeframes.length-1) mutetimeframes += ",";
  }

  if (mutetimeframes.length != 0) mutetimeframes += ",";

  for (var i = 0; i < violence_timeframes.length; i++) {
    violencetimeframes += violence_timeframes[i][0] + "," + violence_timeframes[i][1];
    if (i != violence_timeframes.length-1) violencetimeframes += ",";
  }
  // if length of violencetimeframes is not 0 add , at the end
  if (violencetimeframes.length != 0) violencetimeframes += ",";

  for (var i = 0; i < explicit_timeframes.length; i++) {
    violencetimeframes += explicit_timeframes[i][0] + "," + explicit_timeframes[i][1];
    if (i != explicit_timeframes.length-1) violencetimeframes += ",";
  }

  if (violencetimeframes.length != 0) violencetimeframes += ",";

  var filter_type = document.getElementById('censorType').value;

    for (var i = 0; i < manual_timeframes.length; i++) {
      filter_type = manual_timeframes[i][2];
      if (filter_type == 'pixelate' || filter_type == 'blur' || filter_type == 'remove') {
        violencetimeframes += manual_timeframes[i][0] + "," + manual_timeframes[i][1];
        if (i != manual_timeframes.length-1) violencetimeframes += ",";
      } else if (filter_type == 'mute') {
        mutetimeframes += manual_timeframes[i][0] + "," + manual_timeframes[i][1];
        if (i != manual_timeframes.length-1) mutetimeframes += ",";
      }
    }

    if (mutetimeframes[mutetimeframes.length-1] == ',') mutetimeframes = mutetimeframes.slice(0, -1);
    if (violencetimeframes[violencetimeframes.length-1] == ',') violencetimeframes = violencetimeframes.slice(0, -1);

    if (violencetimeframes.length === 0) document.getElementById('video_filter_typez').style.display = 'none';
    if (mutetimeframes.length === 0) document.getElementById('audio_filter_typez').style.display = 'none'

    if (violencetimeframes.length === 0 && mutetimeframes.length === 0) {
      errormsg("Nothing to filter", false);
      document.getElementById('exportt').style.display = 'none';
      return;
    }

    console.log("mutetimeframes: ", mutetimeframes);
    console.log("violencetimeframes: ", violencetimeframes);

});

document.getElementById('cancel_video').addEventListener('click', function(event) {
  document.getElementById('exportt').style.display = 'none';
});

function errormsg(msg, errorr) {
  document.getElementById('aleart').style.display = 'flex';
  document.getElementById('aleartmessage').innerHTML = msg;
  if (errorr) {
    document.getElementById('aleartmessage').style.padding = '7px';
    document.getElementById('aleartsvg').style.display = 'none';
  }
  setTimeout(() => {
    document.getElementById('aleart').style.display = 'none';
  }, 4000);
}

document.getElementById('save_video').addEventListener('click', function(event) {
  // mute_timeframes = [[30, 35], [50, 60]];
  // violence_timeframes = [[5, 10], [20, 25], [40, 45]];

    var a = document.getElementById('audio_filter_typez').value;
    var v = document.getElementById('video_filter_typez').value;

    if ((v == 'Filter type' && violencetimeframes.length > 0) || (a == 'Filter type' && mutetimeframes.length > 0)) {
      errormsg("Please select the filter type", false);
      return;
    }

    mutetimeframes = `${a}\n` + mutetimeframes;
    violencetimeframes = `${v}\n` + violencetimeframes;

    console.log("mutetimeframes: ", mutetimeframes);
    console.log("violencetimeframes: ", violencetimeframes);

    fs.writeFile('timeframes/audio.txt', mutetimeframes, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });

    fs.writeFile('timeframes/video.txt', violencetimeframes, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });

  document.getElementById('exportt').style.display = 'none';

  document.getElementById('audio_filter_typez').value = 'Filter type';
  document.getElementById('video_filter_typez').value = 'Filter type';


  exec(export_cmnd + " " + videopath, (error, stdout, stderr) => {
    console.log(`import output is: ${stdout}`);
    errormsg(`Video saved to: ${stdout.split(':-=')[1]}`, true);
  });
});


var violence_timeframes = [];
var explicit_timeframes = [];
var mute_timeframes = [];
var manual_timeframes = [];

async function get_timeframes(comm, type) {
  console.log("type");
  return new Promise((resolve, reject) => {
    videopath = videopath.replace(/\\/g, '/');
    console.log("Sending: ", videopath);
    
    exec(comm + " " + videopath, (error, stdout, stderr) => {
      console.log("output is: ", stdout, "\nendify");
      if (stdout.slice(0, stdout.length-2) === "empty" || stdout === "") {
        console.log("got empty")
        resolve();
        return;
      }else console.log("got noy empty: ", `(${stdout})`);
        console.log(`hellon: ${stdout}`);

        if (type === 'explicit'){
          stdout = stdout.split("cordz")[1].split(",");
        }
        else {
          stdout = stdout.split(':---')[1].split(',');
        }

        for (var i = 0; i < stdout.length; i+=2) {
          stdout[i] = parseInt(stdout[i]);
          stdout[i+1] = parseInt(stdout[i+1]);
          if (type == 'violence')
            violence_timeframes.push([stdout[i], stdout[i+1]]);
          else if (type == 'explicit') 
            explicit_timeframes.push([stdout[i], stdout[i+1]]);
          else
            mute_timeframes.push([stdout[i], stdout[i+1]]);
        }
        console.log("timeframes v: ", violence_timeframes);
        console.log("timeframes e: ", explicit_timeframes);
        console.log("timeframes: m", mute_timeframes);
        resolve();
    });
  });
}

prev_video = "";

async function get_all_timeframes() {
  return new Promise((resolve, reject) => {

    var promises = [];

    promises.push( get_timeframes(command, 'profanity').then(() => {
      if (mute_timeframes.length > 0){
         profanity_detected = true;
         for (var i = 0; i < mute_timeframes.length; i++) {
          if (isNaN(mute_timeframes[i][0]) || isNaN(mute_timeframes[i][1])) {
            mute_timeframes = [];
            profanity_detected = false;
            break;
          }
        }
        if (profanity_detected) {
          document.getElementById('audioCensorType').value = 'detected'
          document.getElementById('audioCensorType').style.color = 'red';
        }
        else {
          document.getElementById('audioCensorType').value = 'notdetected'
          document.getElementById('audioCensorType').style.color = 'green';
        }
        }
      else {
        console.log("profanity was not detetcted");
        document.getElementById('audioCensorType').value = 'notdetected'
        document.getElementById('audioCensorType').style.color = 'green';
      }
     }).catch((error) => {
       console.log(error);
     })
    );
  
    promises.push( get_timeframes(command2, 'violence').then(() => {
        if (violence_timeframes.length > 0) {
          violence_detected = true;
                
          for (var i = 0; i < violence_timeframes.length; i++) {
            if (isNaN(violence_timeframes[i][0]) || isNaN(violence_timeframes[i][1])) {
              violence_timeframes = [];
              violence_detected = false;
              break;
            }
          }

          if (violence_detected) {
            document.getElementById('videoCensorType').value = 'detected';
            document.getElementById('videoCensorType').style.color = 'red';
          }
          else {
            document.getElementById('videoCensorType').value = 'notdetected';
            document.getElementById('videoCensorType').style.color = 'green';
          }     
        }
        else {
           document.getElementById('videoCensorType').value = 'notdetected';
            document.getElementById('videoCensorType').style.color = 'green';
        }
      }).catch((error) => {
        console.log(error);
      })
    );
  
    promises.push( get_timeframes(command3, 'explicit').then(() => {
      console.log("explicit timeframes: ", explicit_timeframes);
        if (explicit_timeframes.length > 0) {
          explicit_detected = true;
          for (var i = 0; i < explicit_timeframes.length; i++) {
            if (isNaN(explicit_timeframes[i][0]) || isNaN(explicit_timeframes[i][1])) {
              explicit_timeframes = [];
              explicit_detected = false;
              break;
            }
          }    
          if (explicit_detected) {
            document.getElementById('violenceCensorType').value = 'detected'
            document.getElementById('violenceCensorType').style.color = 'red';
          }
          else {
            document.getElementById('violenceCensorType').value = 'notdetected'
            document.getElementById('violenceCensorType').style.color = 'green';
          }
        }
        else {
           document.getElementById('violenceCensorType').value = 'notdetected';
            document.getElementById('violenceCensorType').style.color = 'green';
        }
      }).catch((error) => {
        console.log(error);
      })
    );

      Promise.all(promises)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });

  });
}


function playBeep() {
  var beep = document.getElementById("beepSound");
  beep.play();
}

function pauseBeep() {
  var beep = document.getElementById("beepSound");
  beep.pause();
}

function process_video() {
  mute_timeframes = [];
  violence_timeframes = [];
  explicit_timeframes = [];
  mute_timeframes = [];

  violence_detected = false;
  profanity_detected = false;
  explicit_detected = false;
  
  document.getElementById('loadbar').style.position = 'absolute';

  document.getElementById('censor').style.display = 'grid';

  document.getElementById('foul_language').style.display = 'grid';
  document.getElementById('violence').style.display = 'grid';
  document.getElementById('nudity').style.display = 'grid';

  document.getElementById('violence').style.width = '0';
  document.getElementById('violence').style.height = '0';

  document.getElementById('foul_language').style.width = '0';
  document.getElementById('foul_language').style.height = '0';

  document.getElementById('nudity').style.width = '0';
  document.getElementById('nudity').style.height = '0';

  document.getElementById('violenceCensorType').style.width = '92%';
  document.getElementById('violenceCensorType').style.height = '50%';

  document.getElementById('audioCensorType').style.width = '92%';
  document.getElementById('audioCensorType').style.height = '50%';

  document.getElementById('video_filter').style.width = '100%';
  document.getElementById('video_filter').style.height = '100%';
  document.getElementById('video_filter').style.display = 'block';

  document.getElementById('videoCensorType').style.width = '92%';
  document.getElementById('videoCensorType').style.height = '50%';

  document.getElementById('videoCensorType').style.appearance = 'none';
  document.getElementById('videoCensorType').style.textAlign = 'center';
  document.getElementById('videoCensorType').style.pointerEvents = 'none';

  document.getElementById('audioCensorType').style.appearance = 'none';
  document.getElementById('audioCensorType').style.textAlign = 'center';
  document.getElementById('audioCensorType').style.pointerEvents = 'none';

  document.getElementById('violenceCensorType').style.appearance = 'none';
  document.getElementById('violenceCensorType').style.textAlign = 'center';
  document.getElementById('violenceCensorType').style.pointerEvents = 'none';

  document.getElementById('videoCensorType').value = 'model';
  document.getElementById('audioCensorType').value = 'model';
  document.getElementById('violenceCensorType').value = 'model';

  document.getElementById('videoCensorType').style.borderRadius = '0';
  document.getElementById('audioCensorType').style.borderRadius = '0';
  document.getElementById('violenceCensorType').style.borderRadius = '0';

  get_all_timeframes().then(() => {

    setTimeout(() => {
    console.log("cx: ", mute_timeframes.length, ", ", violence_timeframes.length, ", ", explicit_timeframes.length);
    if (profanity_detected || violence_detected || explicit_detected) {
      document.getElementById('censor').style.display = 'grid';
      console.log("done");
    }

    if (!profanity_detected && !violence_detected && !explicit_detected) document.getElementById('censor').style.display = 'none';

    console.log("pp1: ", profanity_detected)
    console.log("pp2: ", violence_detected)
    console.log("pp3: ", explicit_detected)

    // profanity_detected = true;
    // violence_detected = true;
    // explicit_detected = true;
    
    // document.getElementById('violence').style.width = '0';
    // document.getElementById('violence').style.height = '0';

    // document.getElementById('foul_language').style.width = '0';
    // document.getElementById('foul_language').style.height = '0';

    // document.getElementById('nudity').style.width = '0';
    // document.getElementById('nudity').style.height = '0';

    document.getElementById('loadbar').style.position = 'static';

    document.getElementById('videoCensorType').style.pointerEvents = 'auto';
    document.getElementById('audioCensorType').style.pointerEvents = 'auto';
    document.getElementById('violenceCensorType').style.pointerEvents = 'auto';

    document.getElementById('videoCensorType').style.appearance = 'auto';
    document.getElementById('audioCensorType').style.appearance = 'auto';
    document.getElementById('violenceCensorType').style.appearance = 'auto';

    document.getElementById('videoCensorType').style.textAlign = 'left';
    document.getElementById('audioCensorType').style.textAlign = 'left';
    document.getElementById('violenceCensorType').style.textAlign = 'left';

    
  document.getElementById('videoCensorType').value = 'Filter type';
  document.getElementById('audioCensorType').value = 'Filter type';
  document.getElementById('violenceCensorType').value = 'Filter type';

  document.getElementById('videoCensorType').style.borderRadius = '10px';
  document.getElementById('audioCensorType').style.borderRadius = '10px';
  document.getElementById('violenceCensorType').style.borderRadius = '10px';

  document.getElementById('videoCensorType').style.color = 'black';
  document.getElementById('audioCensorType').style.color = 'black';
  document.getElementById('violenceCensorType').style.color = 'black';

  document.getElementById('violenceCensorType').style.width = '0';
  document.getElementById('violenceCensorType').style.height = '0';

  if (!profanity_detected){
    document.getElementById('audioCensorType').style.width = '0';
    document.getElementById('audioCensorType').style.height = '0';
  }

  if (!violence_detected && !explicit_detected) {
    document.getElementById('video_filter').style.width = '0';
    document.getElementById('video_filter').style.height = '0';
    document.getElementById('video_filter').style.display = 'none';
  }

    if (!profanity_detected && violence_detected && explicit_detected) {
      document.getElementById('nudity').style.width = '100%';
      document.getElementById('nudity').style.height = '100%';
      
      document.getElementById('violence').style.width = '100%';
      document.getElementById('violence').style.height = '100%';

      document.getElementById('foul_language').style.display = 'none';
    }
    else if (profanity_detected && violence_detected && !explicit_detected) {
      document.getElementById('foul_language').style.width = '100%';
      document.getElementById('foul_language').style.height = '100%';

      document.getElementById('violence').style.width = '100%';
      document.getElementById('violence').style.height = '100%';

      document.getElementById('nudity').style.display = 'none';
    }
    else if (profanity_detected && !violence_detected && explicit_detected)  {
      document.getElementById('foul_language').style.width = '100%';
      document.getElementById('foul_language').style.height = '100%';

      document.getElementById('nudity').style.width = '100%';
      document.getElementById('nudity').style.height = '100%';

      document.getElementById('violence').style.display = 'none';
    }
    else if (profanity_detected && violence_detected && explicit_detected) {
      document.getElementById('nudity').style.width = '100%';
      document.getElementById('nudity').style.height = '100%';
      
      document.getElementById('violence').style.width = '100%';
      document.getElementById('violence').style.height = '100%';
      
      document.getElementById('foul_language').style.width = '100%';
      document.getElementById('foul_language').style.height = '100%';
    }
    else if (!profanity_detected && violence_detected && !explicit_detected) {
      document.getElementById('violence').style.width = '100%';
      document.getElementById('violence').style.height = '100%';

      document.getElementById('foul_language').style.display = 'none';
      document.getElementById('nudity').style.display = 'none';
    }
    else if (!profanity_detected && !violence_detected && explicit_detected) {
      document.getElementById('nudity').style.width = '100%';
      document.getElementById('nudity').style.height = '100%';

      document.getElementById('violence').style.display = 'none';
      document.getElementById('foul_language').style.display = 'none';
    }
    else if (profanity_detected && !violence_detected && !explicit_detected) {
      document.getElementById('foul_language').style.width = '100%';
      document.getElementById('foul_language').style.height = '100%';

      document.getElementById('violence').style.display = 'none';
      document.getElementById('nudity').style.display = 'none';
    }

    document.getElementById('sind').style.backgroundColor = 'lightgreen';
    }, 2000);
  }).catch((error) => {
    console.log(error);
  });
  
}

function set_new_video(path) {
  document.getElementById('censor').style.display = 'none';
  const videoPlayer = document.getElementById('videoscr');
  videoPlayer.src = path;
  console.log("video path i set: ", path);  
  videopath = path;
  document.getElementById('sind').style.backgroundColor = 'red';
  process_video();
}

function ulpd() {
  console.log(`video path i set:  {${videopath}}`);  
  const videoPlayer = document.getElementById('videoscr');
  videoPlayer.src = videopath

  document.getElementById('sind').style.backgroundColor = 'red';
  document.getElementById('censor').style.display = 'none';
  // if videoDiv exists, remove it
  if (document.getElementById('videoDiv')) document.getElementById('videoDiv').style.border = 'none';
  document.getElementById('qtext').innerHTML = '';
  if (videopath.includes('No folder selected') || videopath === '') return;
  process_video();
}

document.getElementById('remvid').addEventListener('click', function() {
  videopath = '';
  if (setted){
    document.getElementById('vplayer').style.boxShadow = '0px 0px 0px rgba(161, 250, 244, 0)';
    console.log("removed the v pipe video");
    setted = false;
  }
  document.getElementById('videoscr').src = '';
  document.getElementById('sind').style.backgroundColor = 'red';
  document.getElementById('censor').style.display = 'none';
});

tgle = true;
document.getElementById('enabcen').addEventListener('click', function() {
  // turn off all the toggles
  document.getElementById('vcheckbox').checked = false;
  document.getElementById('pcheckbox').checked = false;
  document.getElementById('echeckbox').checked = false;
  if (tgle == true) {
    document.getElementById('enabcen').style.backgroundColor = 'greenyellow';
    document.getElementById('enabcen').innerHTML = 'Censored';
    tgle = 0;
  }
  else {
    document.getElementById('enabcen').style.backgroundColor = 'tomato';
    document.getElementById('enabcen').innerHTML = 'Uncensored';
    tgle = 1;
  }
});

//handling drag and drop of video
const videoContainer = document.getElementById('vplayer');
const video = document.getElementById('videoscr');

const cover = document.getElementById('shutter')

async function handle_audio_cenosring() {

  var selectedValue = document.getElementById("audioCensorType").value;
  if (pcheckbox.checked)
  for (var i = 0; i < mute_timeframes.length; i++) {
    if (video.currentTime >= mute_timeframes[i][0] && video.currentTime <= mute_timeframes[i][1]+1) {
      if (selectedValue == "remove") video.muted = true;
      if (selectedValue == "beep")  {
        video.muted = true;
          playBeep();
      }
      break;
    }
    else {
      if (video.muted == true){
          video.muted = false;
          if (selectedValue == "beep") pauseBeep();
      }
    }
  }
  else {
    if (video.muted == true){
      video.muted = false;
      if (selectedValue == "beep") pauseBeep();
     }   
  }
}

merged = false;
merged_arr = []

async function handle_manual_censoring() {
  for (var i = 0; i < manual_timeframes.length; i++) {
    if (video.currentTime >= manual_timeframes[i][0] && video.currentTime <= manual_timeframes[i][1]+1) {
      if (manual_timeframes[i][2] == "pixelate") {
        var computedStyle = window.getComputedStyle(videoContainer);
        cover.style.width = computedStyle.getPropertyValue('width');
        cover.style.height = computedStyle.getPropertyValue('height');
        cover.style.height = parseInt(cover.style.height) * 0.85 + 'px';
        if (lighttheme) {
          cover.style.borderTop = '2px solid black';
          cover.style.borderLeft = '2px solid black';
          cover.style.borderRight = '2px solid black';
          cover.style.backgroundColor = 'rgb(248, 197, 127)';
        }
        else {
          cover.style.borderTop = '2px solid rgb(41, 43, 91)';
          cover.style.borderLeft = '2px solid rgb(41, 43, 91)';
          cover.style.borderRight = '2px solid rgb(41, 43, 91)';
          cover.style.backgroundColor = 'rgb(157, 32, 72)';
        }
      }
      else if (manual_timeframes[i][2] == "blur") document.getElementById('videoscr').style.filter = 'blur(15px)';
      else if (manual_timeframes[i][2] == "remove") {
        var timeinseconds = manual_timeframes[i][1]+1;
        console.log("jumping to: ", timeinseconds);
        const hours = Math.floor(timeinseconds / 3600);
        timeinseconds -= (hours * 3600);
        const minutes = Math.floor(timeinseconds / 60);
        timeinseconds -= (minutes * 60);
        console.log("jumping to: ", hours, ", ", minutes, ", ", timeinseconds);
        skipToTime(hours, minutes, timeinseconds);
        
      }
      else if (manual_timeframes[i][2] == "beep") {
        video.muted = true;
        playBeep();
      }
      else if (manual_timeframes[i][2] == "mute") video.muted = true;
      else {
        document.getElementById('videoscr').style.filter = 'blur(0px)';
        cover.style.width = '0px';
        cover.style.height = '0px';
        cover.style.border = 'none';
        if (video.muted == true) {
          video.muted = false;
          pauseBeep();
        }
        pauseBeep();
      }
      break;
    }
    else {
      document.getElementById('videoscr').style.filter = 'blur(0px)';
      cover.style.width = '0px';
      cover.style.height = '0px';
      cover.style.border = 'none';
      if (video.muted == true) {
        video.muted = false;
        pauseBeep();
      }
      pauseBeep();
  }

  }
}

async function handle_video_censoring(){
  var selectedValue = document.getElementById("videoCensorType").value;
  var prev_selec = "";
  if (selectedValue == 'remove') prev_selec = 'remove';

  if (!merged) merged_arr = violence_timeframes.concat(explicit_timeframes);

  console.log("merged look like this: ", merged_arr)

  if (vcheckbox.checked || echeckbox.checked) 
  for (var i = 0; i < merged_arr.length; i++) {
    if (video.currentTime >= merged_arr[i][0] && video.currentTime <= merged_arr[i][1]+1) {
      console.log(`adding filter at ${video.currentTime}`);

      if (selectedValue == "pixelate") {
      var computedStyle = window.getComputedStyle(videoContainer);
      cover.style.width = computedStyle.getPropertyValue('width');
      cover.style.height = computedStyle.getPropertyValue('height');
      cover.style.height = parseInt(cover.style.height) * 0.85 + 'px';

      if (lighttheme) {
        cover.style.borderTop = '2px solid black';
        cover.style.borderLeft = '2px solid black';
        cover.style.borderRight = '2px solid black';
        cover.style.backgroundColor = 'rgb(248, 197, 127)';
      }

      else {
        cover.style.borderTop = '2px solid rgb(41, 43, 91)';
        cover.style.borderLeft = '2px solid rgb(41, 43, 91)';
        cover.style.borderRight = '2px solid rgb(41, 43, 91)';
        cover.style.backgroundColor = 'rgb(157, 32, 72)';
      }

      console.log("computed: ", computedStyle.getPropertyValue('width'), ", ", computedStyle.getPropertyValue('height'));
      console.log("shutter: ", cover.style.width, ", ", cover.style.height);
    }
    else if (selectedValue == "blur") {
      document.getElementById('videoscr').style.filter = 'blur(15px)';
      console.log("blurred");
    }
    else if (selectedValue == "remove") {
      var timeinseconds = merged_arr[i][1]+1;
      console.log("jumping to: ", timeinseconds);
      const hours = Math.floor(timeinseconds / 3600);
      timeinseconds -= (hours * 3600);
      const minutes = Math.floor(timeinseconds / 60);
      timeinseconds -= (minutes * 60);
      console.log("jumping to: ", hours, ", ", minutes, ", ", timeinseconds);
      skipToTime(hours, minutes, timeinseconds);
    }
      break;
    }
    else {
        document.getElementById('videoscr').style.filter = 'blur(0px)';
        cover.style.width = '0px';
        cover.style.height = '0px';
        cover.style.border = 'none';
    }
  }
  else {
    document.getElementById('videoscr').style.filter = 'blur(0px)';
    cover.style.width = '0px';
    cover.style.height = '0px';
    cover.style.border = 'none';
  }
}

// .not-allowed {cursor: not-allowed;}



function showaleart() {
  document.getElementById('aleart').style.display = 'flex';
  setTimeout(() => {
    document.getElementById('aleart').style.display = 'none';
  }, 4000);
}

document.getElementById('vcheckbox').addEventListener('change', function() {
  if (tgle == true) {
    document.getElementById('vcheckbox').checked = false;
    showaleart();
  }
});

document.getElementById('pcheckbox').addEventListener('change', function() {
  if (tgle == true) {
    document.getElementById('pcheckbox').checked = false;
    showaleart();
  }
});

document.getElementById('echeckbox').addEventListener('change', function() {
  if (tgle == true) {
    document.getElementById('echeckbox').checked = false; 
    showaleart();
  }
});

var setted = false;

video.addEventListener('timeupdate', function() {
  if (!setted && !videopath.includes('No folder selected') && videopath != ''){
    if (lighttheme) document.getElementById('vplayer').style.boxShadow = '0px 0px 100px rgba(210,234,228,0.8)';
    else document.getElementById('vplayer').style.boxShadow = '0px 0px 100px rgba(161, 250, 244, 0.432)';
    setted = true;
  }
  handle_audio_cenosring();
  handle_video_censoring();
  handle_manual_censoring();
});

// Function to handle the dropped file
function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
        video.src = event.target.result;
        video.pause();
    };
    reader.readAsDataURL(file);

    document.getElementById('censor').style.display = 'none';
    document.getElementById('sind').style.backgroundColor = 'red';
    document.getElementById('videoDiv').style.border = 'none';
    document.getElementById('qtext').innerHTML = '';
    process_video();
}

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    videoContainer.addEventListener(eventName, preventDefaults, false);
});

// Highlight drop area when item is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
    videoContainer.addEventListener(eventName, highlight, false);
});

// Unhighlight drop area when item is dragged out of it
['dragleave', 'drop'].forEach(eventName => {
    videoContainer.addEventListener(eventName, unhighlight, false);
});

// Handle dropped files
videoContainer.addEventListener('drop', handleDrop, false);

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight() {
    videoContainer.classList.add('highlight');
}

function unhighlight() {
    videoContainer.classList.remove('highlight');
}


prev = "";

function traverseFolder(folderPath) {
  var videos_count = 0;
  fs.readdir(folderPath, (err, files) => {
      if (err) {
          console.error('Error reading folder:', err);
          return;
      }
      var vids = document.getElementById('videos');
      while (vids.firstChild) {
        vids.removeChild(vids.firstChild);
      }

      files.forEach(file => {
          const filePath = path.join(folderPath, file);
          fs.stat(filePath, (err, stats) => {
            //check if mp4 file
            if (path.extname(filePath) === '.mp4') {
              console.log(filePath);
              videos_count++;
              var videocont = document.createElement('div');
              videocont.id = 'videoconta';
              videoContainer.style.backgroundColor = 'black';
              var timecont = document.createElement('div');
              timecont.id = 'timecont';
              timecont.innerHTML = '00:00';
              var videoDiv = document.createElement('video');
              videoDiv.addEventListener('loadedmetadata', function() {
                const duration = videoDiv.duration;
                const hours = Math.floor(duration / 3600);
                const minutes = Math.floor((duration % 3600) / 60);
                const seconds = Math.floor(duration % 60);
            
                let formattedDuration = '';
                if (hours > 0) {
                  formattedDuration = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                  timecont.style.left = '65%';
                } else {
                  formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                }
                if (formattedDuration.length == 5) {
                  timecont.style.left = '70%';
                }
                timecont.innerText = formattedDuration;
              });
              //////////////////////////////////////////
              videoDiv.id = 'videoDiv';
              videoDiv.controls = false;
              videoDiv.src = filePath;
              videoDiv.onclick = function() {
                if (prev != "") {
                  prev.style.border = 'none';
                }
                //document.getElementById('videoscr').src = filePath;
                set_new_video(filePath);
                if (lighttheme) {
                  videoDiv.style.border = '4px solid salmon';
                  var filename = filePath.split('\\').pop().split('/').pop().split('.')[0];
                  document.getElementById('qtext').innerHTML = filename;
                  document.getElementById('qtext').style.color = 'black';
                  document.getElementById('qtext').style.fontWeight = '900';
                }
                else {
                  videoDiv.style.border = '4px solid rgb(0, 95, 183)';
                  var filename = filePath.split('\\').pop().split('/').pop().split('.')[0];
                  document.getElementById('qtext').innerHTML = filename;
                  document.getElementById('qtext').style.color = 'white';
                  document.getElementById('qtext').style.fontWeight = '900';
                }
                prev = videoDiv;
            }
              videocont.appendChild(videoDiv);
              videocont.appendChild(timecont);
              document.getElementById('videos').appendChild(videocont);
            }
          });
      });
  });
}

document.getElementById('vfolderbtn').addEventListener('click', function() {
  const pythonScriptPath = 'folder.py';
const command = `python ${pythonScriptPath}`;
exec(command, (error, stdout, stderr) => {
    console.log(`${stdout}`);
    stdout = stdout.replace(/\\/g, '/');
    traverseFolder(stdout);
});
});



function skipToTime(hours, minutes, seconds) {
  var video_s = document.getElementById('videoscr');
  var totalSeconds = (hours * 60 * 60) + (minutes * 60) + seconds;
  video.currentTime = totalSeconds;
}

document.getElementById('manual_censor_text').addEventListener('click', function() {
  var startTime = document.getElementById('starttime').innerHTML;
  var endTime = document.getElementById('endtime').innerHTML;
  //the inner html is in the format hh:mm:ss
  //split the string and convert to seconds
  startTime = startTime.split(':');
  endTime = endTime.split(':');
  startTime = parseInt(startTime[0]) * 3600 + parseInt(startTime[1]) * 60 + parseInt(startTime[2]);
  endTime = parseInt(endTime[0]) * 3600 + parseInt(endTime[1]) * 60 + parseInt(endTime[2]);
  var start = parseInt(startTime);
  var end = parseInt(endTime);

  var censorType = document.getElementById('censorType').value;
  manual_timeframes.push([start, end, censorType]);
});

document.getElementById('starttext').addEventListener('click', function() {
  //get current video time and convert it to seconds
  var video_s = document.getElementById('videoscr');
  var currentTime = video_s.currentTime;
  var hours = Math.floor(currentTime / 3600);
  currentTime -= (hours * 3600);
  var minutes = Math.floor(currentTime / 60);
  currentTime -= (minutes * 60);
  var seconds = Math.floor(currentTime);
  var time = hours + ":" + minutes + ":" + seconds;
  document.getElementById('starttime').innerHTML = time;
});

document.getElementById('endtext').addEventListener('click', function() {
  //get current video time and convert it to seconds
  var video_s = document.getElementById('videoscr');
  var currentTime = video_s.currentTime;
  var hours = Math.floor(currentTime / 3600);
  currentTime -= (hours * 3600);
  var minutes = Math.floor(currentTime / 60);
  currentTime -= (minutes * 60);
  var seconds = Math.floor(currentTime);
  var time = hours + ":" + minutes + ":" + seconds;
  document.getElementById('endtime').innerHTML = time;
});

//on change in the value of searchbox the videos will be filtered

document.getElementById('searchbox').addEventListener('input', function() {
  //clear the console
  console.clear();
  var search = ""
  if (lighttheme) search = document.getElementById('searchbox').value;
  else search = document.getElementById('searchbox2').value;
  var videos = document.getElementById('videos').children;
  for (var i = 0; i < videos.length; i++) {
    var video = videos[i].children[0];
    var filename = video.src.split('\\').pop().split('/').pop().split('.')[0];
    // replace %20 with space
    filename = filename.replace(/%20/g, ' ');
    console.log("filename: ", filename);
    //make it lowercase
    filename = filename.toLowerCase();

    if (filename.includes(search.toLowerCase())) {
      videos[i].style.display = 'block';
    }
    else {
      videos[i].style.display = 'none';
    }
  }
});