var socket = io('http://10.0.0.1:3000')
socket.on("insert", async (data) => {
    console.log(data)
    document.getElementById('coins').innerText = `${data.data[0]}.00`;
    time = 0

})