const socket = io()
const clientsTotal = document.getElementById('total-client')

const messagecontainer = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const messageform = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

messageform.addEventListener('submit' , (e)=>{
    e.preventDefault();
    sendMessage();
    messageInput.value=''
})
socket.on('clients-total',(data)=>{


clientsTotal.innerHTML = `Total clients : ${data}`
})


function sendMessage(){
   if (messageInput.value==='') {return
    
   }

    const data = {
        name: nameInput.value,
        message : messageInput.value,
        dateTime : new Date()
    }
    function formatDate(date) {
        const day = date.getDate();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
      
        return `${day} ${month} ${hours}:${minutes}`;
      }

    const li = document.createElement('li');
    li.innerHTML =`${ data.message}<span class='span'>${data.name} ${formatDate(data.dateTime)} <span>`;
    li.classList.add('message-right')
    messagecontainer.appendChild(li)
   

    socket.emit('message' , data);
}


socket.on('chat-message', (data) => {
    console.log(data)
    const li = document.createElement('li');
    function formatDate(date) {
        const day = date.getDate();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
      
        return `${day} ${month} ${hours}:${minutes}`;
      }
      const dateObj = new Date(data.dateTime); 
    li.innerHTML =`${ data.message}<span class='span'>${data.name} ${formatDate(dateObj)} <span>`;
    li.classList.add('message-left')
    messagecontainer.appendChild(li)
    
    
});