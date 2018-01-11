General = {
  id: 0,
  data: []
}

function Msg(user) {
  // Define basic
  this.user  = user
  this.msgId = General.id 
  this.msgView = new MsgView(this.user)
  this.$elem = this.buildElem()

  // Bind events
  this.bindEvents()
}
Msg.prototype.buildElem = function() {
  var $container  = document.createElement('div')
  var $input      = document.createElement('input')
  var $userName   = document.createElement('h1')
  var $msgView    = this.msgView.$elem

  // container
  $container.setAttribute('id','container')
  $container.setAttribute('class','msg-container')
  $container.setAttribute('name', this.user)

  // input
  $input.setAttribute('type', 'text')
  $input.setAttribute('id',   'msgInput')
  $input.setAttribute('class','msg-input')

  // msgContent
  $userName.textContent = this.user
  $container.append($msgView)
  $container.append($userName)
  $container.append($input)

  return $container
}
Msg.prototype.bindEvents = function() {
  var that = this
  var $input = that.$elem.querySelector('#msgInput')
  $input.addEventListener("keydown", function (e) {
      if (e.keyCode === 13 && $input.value != '') {

        that.send($input.value)
        // Clear input
        $input.value = ''
      }
  });
}
Msg.prototype.send = function(title) {
  // Push Data
  var $item = new MsgItem(title, this.user)
  General.data.push($item)

  // New Msg ID
  this.msgId ++

  // Update Msg
  this.msgView.update()
}

// MsgItem
function MsgItem(title, user) {
  this.user = user
  this.content = title
  this.id = General.id ++
  return this
}

// MsgView
function MsgView(user) {
  this.$elem = this.buildElem()
  this.id = General.id

  // temp
  this.user = user

  console.log(this.user)

  // Time Update
  // this.timeUpdate()
}
MsgView.prototype.buildElem = function() {
  var $container  = document.createElement('div')
  $container.setAttribute('id', 'msgWrapper')
  $container.setAttribute('class', 'msg-wrapper')

  return $container
}
MsgView.prototype.timeUpdate = function() {
  setInterval(this.update.bind(this), 5000)
  if (this.id != General.id) {
    console.log('work')
  }
}
MsgView.prototype.update = function() {
  var id = General.id
  var data = General.data
  var last = data.length - 1
  var lastContent = data[last].content
  var lastUser = data[last].user
  var msgId = data[last].id

  // Add new Msg  
  var $msgWrapper = this.$elem
  var $msgWrapper = document.querySelectorAll('.msg-wrapper')

  // Put the new Msg
  for (var i = 0, j = $msgWrapper.length; i < j; i++) {
    var $newMsg = this.newMsg(lastContent, lastUser)
    $msgWrapper[i].appendChild($newMsg)
  }
}
MsgView.prototype.newMsg = function(lastContent, lastUser) {
  var msg = document.createElement('div')
  var that = this

  // console.log(lastUser)
  console.log(that.user)
  if(this.user == lastUser) {
    // msg.setAttribute('')
  }
  msg.setAttribute('class', 'msg-item')
  msg.textContent = lastContent

  return msg
}


// LocalStorage
// function LocalStorage() {
//   var data = JSON.stringify(general.data)
//   localStorage.setItem('msgData', data)
// }
// function recoverLocalStorage() {
//   if (localStorage.msgData) {
//     var recoverTodo = JSON.parse(localStorage.msgData)
//     general.todoTemp = recoverTodo
//     general.globalID = recoverTodo.length
//   }
// }


function App() {
  this.user1 = new Msg('Peter')
  var user2 = new Msg('Frank')
  document.body.append(this.user1.$elem)
  document.body.append(user2.$elem)

  // var msgBox = new MsgBox()
  // document.body.append(msgBox.$elem)
}

window.app = new App()