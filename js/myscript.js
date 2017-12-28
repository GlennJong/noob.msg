General = {
  id: 0,
  data: []
}

function Msg() {
  this.$elem = this.buildElem()
  this.itemArr = []
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
  $container.append($input)
  $container.append($msgContent)

  return $container
}
Msg.prototype.bindEvents = function() {
  var that = this
  var $input = that.$elem.querySelector('#input')
  $input.addEventListener("keydown", function (e) {
      if (e.keyCode === 13 && input.value != '') {
        that.send($input.value)
        // Clear input
        $input.value = ''
      }
  });
}
Msg.prototype.send = function(title) {
  var that = this

  // Push Data
  var $item = new MsgItem(title)
  General.data.push($item)

  console.log(General.data)

  // Show the msg
  that.showMsg($item)
}
Msg.prototype.showMsg = function(item) {
  var $msgContent = this.$elem.querySelector('#msgContent')
  var $itemElem = document.createElement('div')
  $itemElem.textContent = item.content

  $msgContent.append($itemElem)
}

// MsgItem
function MsgItem(title) {
  // this.$elem = this.buildElem(title)
  this.content = title
  this.id = General.id ++
  return this
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
  var item = new Msg()
  document.body.append(item.$elem)
}

window.app = new App()