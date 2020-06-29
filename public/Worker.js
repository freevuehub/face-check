const canvasObj = {
  dom: null,
  ctx: null,
}

onmessage = async (event) => {
  if (canvasObj.dom) {
    console.log(event.data)
    // canvasObj.ctx.clearRect(0, 0, canvasObj.dom.width, canvasObj.dom.height)
    // canvasObj.ctx.font = '16px Verdana'
    // canvasObj.ctx.textAlign = 'center'
    // canvasObj.ctx.fillText(
    //   `Counting: ${event.data.test}`,
    //   canvasObj.dom.width / 2,
    //   canvasObj.dom.height / 2
    // )
  } else {
    canvasObj.dom = event.data.canvas
    canvasObj.ctx = canvasObj.dom.getContext('2d')
  }
}
