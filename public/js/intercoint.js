
var audio = document.getElementById('progressSound');
var interval

// Play the sound when the modal is shown

function activateCoinslot(){
  axios.get("/coins")
  .then((res)=>{
    console.log(res)
    $('#insertcoin').modal('show')
    $('#insertcoin').on('shown.bs.modal', function () {
      audio.play()
      interval = setInterval(function() {
          audio.currentTime = 0;
          audio.play();
        }, 1000);
        
    });
    $('#insertcoin').on('hidden.bs.modal', function () {
      clearInterval(interval);
    });
  })
  .catch((err)=>{
    console.log(err)
    $('#insertcoin').on('hidden.bs.modal', function () {
      clearInterval(interval);
    });
  })

}

const progressBar = document.getElementById('progress-bar');
const modal = document.getElementById('insertcoin');
let timer =50
let interval1 = setInterval(() => {
  timer -= 1;
  progressBar.style.width = `${(timer / 20) * 100}%`;
  progressBar.setAttribute('aria-valuenow', timer);
  if (timer === 0) {
    //clearInterval(interval1);
    modal.style.display = 'none';
    $('#insertcoin').on('hidden.bs.modal', function () {
      clearInterval(interval);
    });
  }
}, 1000);

modal.addEventListener('click', () => {
  timer = 20;
  progressBar.style.width = `${(timer / 20) * 100}%`;
  progressBar.setAttribute('aria-valuenow', timer);
});