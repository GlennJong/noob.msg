General = {
  id: 0,
  data: []
}

function Msg(user) {
  this.user = user
  this.$elem = this.buildElem()
  this.bindEvents()
}
Msg.prototype.buildElem = function() {
  var $container  = document.createElement('div')
  var $msgContent = document.createElement('div')
  var $input      = document.createElement('input')
  $input.setAttribute('type', 'text')
  $input.setAttribute('id', 'input')
  $msgContent.setAttribute('id', 'msgContent')
  $container.setAttribute('id', 'container')
  $container.setAttribute('name', this.user)
  $container.append($input)
  $container.append($msgContent)

  return $container
}
Msg.prototype.bindEvents = function() {
  var that = this
  var $input = that.$elem.querySelector('#input')
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

  console.log(General.data)

  // Show the msg
  this.showMsg($item)
}
Msg.prototype.showMsg = function(item) {
  // var $msgContent = this.$elem.querySelector('#msgContent')
  // var $msgContent = this.$elem.querySelector('#msgContent')
  var $msgBox   = document.getElementById('msgBox')
  // var $itemElem = '<div class="item">' + item.content + '</div>'
  var $itemElem = document.createElement('div')


  $itemElem.textContent = item.content

  // $msgContent.appendChild($itemElem)
  $msgBox.appendChild($itemElem)
}

// MsgItem
function MsgItem(title, user) {
  // this.$elem = this.buildElem(title)
  this.username = user
  this.content = title
  this.id = General.id ++
  return this
}

function MsgBox() {
  this.$elem = this.buildElem()
}
MsgBox.prototype.buildElem = function() {
  var $container  = document.createElement('div')
  $container.setAttribute('id', 'msgBox')

  return $container
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
  var user1 = new Msg('Peter')
  var user2 = new Msg('Frank')
  document.body.append(user1.$elem)
  document.body.append(user2.$elem)

  var msgBox = new MsgBox()
  document.body.append(msgBox.$elem)
}

window.app = new App()