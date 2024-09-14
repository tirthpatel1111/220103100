console.log("write javascript....");
const audio = new Audio();

async function main() {


  Array.from(document.getElementsByClassName("card")).forEach(e => {
    // displayalbums()
    console.log(e);
    e.addEventListener("click", async item => {
      let fil=item.currentTarget.dataset.folder
      let load = item.currentTarget.dataset.folder
      console.log(load);
      console.log(fil);
      
      let a = await fetch(`http://127.0.0.1:5500/music/${load}/`)
      let responce = await a.text();
      let div = document.createElement("div");
      // console.log(div);
      // console.log(responce);
      div.innerHTML = responce;
      let as = div.getElementsByTagName("a")

      //   console.log(as);
      const song = []
      for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
          song.push(element.href)
        }

      }

      let slist = document.querySelector(".s_list").getElementsByTagName("ul")[0]

      //  console.log(son); 
      // son=await main(load)
      // console.log(item.currentTarget.dataset.folder);
      // console.log(item.currentTarget.dataset.folder);  
      // console.log(sr); 
      // console.log(item.currentTarget.dataset);
      console.log();
      console.log(song.length);

      slist.replaceChildren()
      // console.log(slist.childElementCount);
      // if(slist.childElementCount!==song.length){  
      //   for (let s of song) {

      //     slist.innerHTML= slist.innerHTML+` <li>
      //     <div class="s_info">
      //     <div class="music_svg">
      //     <img src="music.svg" alt="" class="invert">
      //     </div>
      //     <div class="s_name">
      //     <span>
      //     <p class="s">${s.split(`/${load}/`)[1].replaceAll("%20"," ").replace("Kbps.mp3","").replace(".mp3","").replaceAll("128","")}</p>
      //     </span>
      //     <span> <p>Song artist</p></span>
      //     </div>

      //     <div class="p_text">
      //     <p>play now</p>
      //     <button><img src="play.svg" alt="" class="pp"></button>
      //     </div>

      //     </div>
      //     </li>`
      //     // let ulist=document.querySelector(".")




      //   }     
      // }
      lsong(song, slist, load)
      add(song)

    })
  })
}
function lsong(sarr, slist, load) {

  if (slist.childElementCount !== sarr.length) {
    for (let s of sarr) {

      slist.innerHTML = slist.innerHTML + ` <li>
      <div class="s_info">
      <div class="music_svg">
      <img src="music.svg" alt="" class="invert">
      </div>
      <div class="s_name">
      <span>
      <p class="s">${s.split(`/${load}/`)[1].replaceAll("%20", " ").replace("Kbps.mp3", "").replace(".mp3", "").replaceAll("128", "")}</p>
      </span>
      <span> <p>Song artist</p></span>
      </div>
      
      <div class="p_text">
      <p>play now</p>
      <button><img src="play.svg" alt="" class="pp"></button>
      </div>
      
      </div>
      </li>`
      // let ulist=document.querySelector(".")




    }
  }
}
async function displayalbums() {

  let a = await fetch("http://127.0.0.1:5500/music/")
  let responce = await a.text();
  let div = document.createElement("div");
  div.innerHTML = responce;
  let anchors = div.getElementsByTagName("a")
  console.log(anchors);

  let array = Array.from(anchors)
  for (let i = 0; i < array.length; i++) {
    const e = array[i];
    // console.log(e);
    if (e.href.includes("/music/")) {
      //  console.log(e.href.split("/").slice(-2)[1]);  
      let folder = e.href.split("/").slice(-2)[1];
      console.log(folder);
      let a = await fetch(`http://127.0.0.1:5500/music/${folder}/info.json`)
      let responce = await a.json();
      //  console.log(responce);
      console.log();
      let cardcontainer = document.querySelector(".card-container")

      cardcontainer.innerHTML = cardcontainer.innerHTML + `<div class="card" data-folder="${folder}">
 <div class="play" >
     <button id="btn">
     <div class="p_surround">
 
         <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" class="Svg-sc-ytk21e-0 bneLcE" width="25" height="25">
             <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z" fill="black"></path>
           </svg>
     </div>
 </button>
 
     
 </div>
 <div class="m_img">
     <img src="/music/${folder}/cover.jpeg" alt="img" >  
 </div>
 <h2 class="title-head">${responce.title}</h2>
 <p class="singer">${responce.description}</p>
 </div>`

    }
    main()

  }
  // cardcontainer.addEventListener("click",async item=>{
  //   main()
  // })
}
displayalbums()
async function slist() {
}
function convertSecondsToMinuteSecond(seconds) {
  // Calculate minutes and remaining seconds
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;

  // Format minutes and seconds to always have two digits
  let formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  let formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

  // Return the formatted time
  return `${formattedMinutes}:${formattedSeconds}`;
}
function add(sr) {
  let audio = new Audio();  // Assuming you have an audio element or similar

  let imge = document.getElementsByClassName("pp");
  let pr = null;
  let arr = document.querySelector(".u_list").getElementsByTagName("li");
  let mplay = document.querySelector(".s-play").getElementsByTagName("img")[1];
  let mprivious = document.querySelector(".s-play").getElementsByTagName("img")[0];
  let mnext = document.querySelector(".s-play").getElementsByTagName("img")[2];
  let msname = document.getElementsByClassName("m_s_name")[0];

  let currentTime = 0;  // Variable to store the current playback time

  console.log(msname.innerHTML);

  Array.from(arr).forEach((e, index) => {
    let sind = sr[index];
    let b = index;
    
    e.addEventListener("click", function () {
   
      console.log(e.querySelector(".s_name").firstElementChild.firstElementChild.innerHTML);

      if (audio.paused || audio.src !== sind) {
        if (pr !== null && pr !== b) {
          console.log("pr", pr);
          imge[pr].src = "play.svg";
        }

        console.log(imge);
        pr = b;

        audio.src = sind;
        audio.currentTime = currentTime;  // Set to the stored time
        audio.play();

        msname.innerText = e.querySelector(".s_name").firstElementChild.firstElementChild.innerHTML;
        mplay.src = "paush.svg";
        console.log(mplay);
        imge[b].src = "paush.svg";
      
        console.log("pr", pr);
      } else {
        audio.pause();
        currentTime = audio.currentTime;  // Store current playback time
        imge[b].src = "play.svg";
        mplay.src = "play.svg";
      }

      mprivious.addEventListener("click", function () {
        if (index > 0) {
          imge[index].src = "play.svg";
          index = (index - 1 + arr.length) % arr.length;
          imge[index].src = "paush.svg";
         
          let sind = sr[index];
          audio.src = sind;
          audio.currentTime = 0;  // Start from the beginning for previous
          audio.play();
          
          msname.innerText = sind.split("/songs/")[1].replaceAll("%20", " ").replace("Kbps.mp3", "").replace(".mp3", "").replaceAll("128", "");
        }
      });
      
      
      mnext.addEventListener("click", function () {
        if (index < arr.length - 1) {
          imge[index].src = "play.svg";
          index = (index + 1) % arr.length;
          imge[index].src = "paush.svg";
          
          let sind = sr[index];
          audio.src = sind;
          audio.currentTime = 0;  // Start from the beginning for next
          audio.play();
        
          msname.innerText = e.querySelector(".s_name").firstElementChild.firstElementChild.innerHTML;
          msname.innerText = sind.split("/songs/")[1].replaceAll("%20", " ").replace("Kbps.mp3", "").replace(".mp3", "").replaceAll("128", "");
        }
      });
    });
  });
  mplay.addEventListener("click", function () {
    if (audio.paused) {

      // console.log("if",index);

      console.log(audio.src);

      audio.play();
      mplay.src = "paush.svg";
      imge[pr].currentTarget= "paush.svg";

    } else {


      console.log(audio.src);
      audio.pause();
      // console.log("else",pind);
      // console.log("else",index);

      mplay.src = "play.svg";
      imge[pr].src = "play.svg";
    }

  });


  let mstime = document.getElementsByClassName("m_s_time")[0]
  audio.addEventListener("timeupdate", () => {
    // console.log((audio.duration)/60,(audio.currentTime),audio.duration);
    mstime.innerText = `${convertSecondsToMinuteSecond(parseInt(audio.currentTime))}/${convertSecondsToMinuteSecond(parseInt(audio.duration))}`
    document.querySelector(".p_circle").style.left = (audio.currentTime / audio.duration) * 100 + "%"
  })
  document.querySelector(".seekbar").addEventListener("click", e => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
    document.querySelector(".p_circle").style.left = percent + "%";
    audio.currentTime = ((percent) * audio.duration) / 100




  })
  let range = document.querySelector(".range").firstElementChild
  range.addEventListener("change", e => {
    audio.volume = parseInt(e.target.value) / 100
  })
  let r = range.value / 100
  console.log(r);
  document.querySelector(".volume>img").addEventListener("click", e => {

    if (e.target.src.includes("volume.svg")) {
      console.log(e.target.src);
      e.target.src = e.target.src.replace("volume.svg", "mute.svg")
      range.value = 0
      audio.volume = range.value

    }
    else {
      range.value = r.value

      audio.volume = r
      e.target.src = e.target.src.replace("mute.svg", "volume.svg")
    }
  })
  return sr;
}

document.querySelector(".humburger").addEventListener("click", () => {
  document.querySelector(".left").style.left = "0";
  //  document.querySelector(".left").style.width="70%";
})
document.querySelector(".close").addEventListener("click", () => {
  document.querySelector(".left").style.left = "-110%";
  // document.querySelector(".left").style.width="31vw";
})

// console.log( Array.from(document.querySelector(".u_list").getElementsByTagName("li")).indexOf(e));
// main()

async function song() {
  // let songs=await main();
  // console.log(songs);
  // let audio= new Audio(songs);

  // audio.play()
}
