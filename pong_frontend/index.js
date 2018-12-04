function Index(){
  this.grabCanvas = function(showing=false) {
    let canvas = document.getElementsByTagName('canvas')[0];
    console.log(canvas)
    if(!showing){
      canvas.style.display = "none";
    } else {
      canvas.style.display = "block";
    }
  }

  document.addEventListener('DOMContentLoaded', e =>{
    let canvas = document.getElementsByTagName('canvas')
    let container = document.getElementById('container')
    container.innerHTML = canvas
    
    // this.grabCanvas(false)


  })



   this.grabCanvas(true)

}
