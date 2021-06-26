// Songs logic

const song_play = document.querySelectorAll("#songs img[src='img/play.svg']");
const playing_ani = document.querySelectorAll(".playing_ani");
const song_progress = document.querySelectorAll("#songs .progress");
let mousedown = false;

song_play.forEach(function(playSong, index){
    let song_name = song_play[index].getAttribute("data-song");
    let song = document.getElementById(song_name);
    playSong.addEventListener("click", function(){
        if(!playing_ani[index].classList.contains("aniStart")){
            playing_ani[index].classList.add("aniStart")
            this.setAttribute("src","img/pause.svg");
            song.play()
        }else{
            playing_ani[index].classList.remove("aniStart")
            this.setAttribute("src","img/play.svg");
            song.pause()
        }
    })
    document.body.addEventListener("mousedown", function(){
        mousedown=true;
    })
    document.body.addEventListener("mouseup", function(){
        mousedown=false;
    })
    song_progress[index].addEventListener("mousemove",progressFunc)
    song_progress[index].addEventListener("click",progressFunc2)
    function progressFunc(e){
        if(mousedown){
            let pro_bar = e.target.children[0];
            let x_value = Math.floor((e.offsetX / this.clientWidth) * 100);
            if(x_value<0){
                x_value=0;
            }
            let durSong = Math.floor((song.duration * x_value)/100);
            song.currentTime = durSong;
            pro_bar.style.width = `${x_value}%`
        }
    }
    function progressFunc2(e){
        let pro_bar = e.target.children[0];
            let x_value = Math.floor((e.offsetX / this.clientWidth) * 100);
            if(x_value<0){
                x_value=0;
            }
            let durSong = Math.floor((song.duration * x_value)/100);
            song.currentTime = durSong;
            pro_bar.style.width = `${x_value}%`
    }
    song.addEventListener("timeupdate", function(){
        let prog_value = (this.currentTime / this.duration) * 100;
        let prog_bar = song_progress[index].children[0];
        prog_bar.style.width=`${prog_value}%`;

        const display = song_progress[index].previousElementSibling.children[0];

        let min = Math.floor(this.currentTime / 60)
        let sc = Math.floor(this.currentTime - min * 60);

        if(min<10){
            if(sc<10){
                display.innerHTML=`0${min}:0${sc}`;
            }else{
                display.innerHTML=`0${min}:${sc}`;
            }
        }else{
            if(sc<10){
                display.innerHTML=`${min}:0${sc}`;
            }else{
                display.innerHTML=`${min}:${sc}`;
            }
        }
    })

    let volume = song.parentElement.children[4].children[1].children[1];
    volume.addEventListener("click", volumeChange)
    volume.addEventListener("mousemove",volumeChange2)
    function volumeChange(e){
        let x_value_vol = Math.round((e.offsetX / e.target.clientWidth) * 10);
        volume.children[0].style.width = `${x_value_vol * 10}%`;
        song.volume = x_value_vol / 10;
        if(song.volume === 0){
            this.previousElementSibling.setAttribute("src", "img/no_volume.svg")
        }else{
            this.previousElementSibling.setAttribute("src", "img/volume.svg")
        }
    }
    function volumeChange2(e){
        if(mousedown){
            let x_value_vol = Math.round((e.offsetX / e.target.clientWidth) * 100);
            volume.children[0].style.width = `${x_value_vol}%`;
            song.volume = x_value_vol / 100;
            if(song.volume === 0){
                this.previousElementSibling.setAttribute("src", "img/no_volume.svg")
            }else{
                this.previousElementSibling.setAttribute("src", "img/volume.svg")
            }
        }
    }
    volume.previousElementSibling.addEventListener("click", function(){
        if(this.getAttribute("src")=="img/volume.svg"){
            this.setAttribute("src", "img/no_volume.svg");
            song.volume = 0
            volume.children[0].style.width = `0%`;
        }else{
            this.setAttribute("src", "img/volume.svg");
            song.volume = 1
            volume.children[0].style.width = `100%`;
        }
    })
})




