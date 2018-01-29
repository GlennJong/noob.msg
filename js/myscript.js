General = {
  id: 0,
  data: []
}

function Msg(user) {
  // Define basic
  this.user  = user;
  this.msgId = General.id;
  this.msgView = new MsgView(this.user);
  this.$elem = this.buildElem();

  // Bind events
  this.bindEvents();
}
Msg.prototype.buildElem = function() {
  var $container  = document.createElement('div');
  var $input      = document.createElement('input');
  var $userName   = document.createElement('h1');
  var $msgView    = this.msgView.$elem;

  // container
  $container.setAttribute('id','container');
  $container.setAttribute('class','msg-container');

  // input
  $input.setAttribute('type', 'text');
  $input.setAttribute('id',   'msgInput');
  $input.setAttribute('class','msg-input');

  // msgContent
  $userName.textContent = this.user;
  $container.append($msgView);
  $container.append($userName);
  $container.append($input);

  return $container;
}
Msg.prototype.bindEvents = function() {
  var that = this;
  var $input = that.$elem.querySelector('#msgInput');
  $input.addEventListener("keydown", function (e) {
      if (e.keyCode === 13 && $input.value != '') {

        that.send($input.value);
        // Clear input
        $input.value = '';
      }
  });
}
Msg.prototype.send = function(title) {
  // New Msg ID
  this.msgId ++;

  // Push Data
  var $item = new MsgItem(title, this.user, this.msgId);

  General.data.push($item);
  console.log(General.data);
  // Update Msg
  // this.msgView.update();
}
Msg.prototype.recoverMsg = function() {
  var msgData = General.data;
  if (msgData.length > 0) {
    this.msgView.update();
    this.msgView.lastMax = General.data.length;
  }
  else {
    console.log('no data');
  }
}

// MsgItem
function MsgItem(title, user, msgId) {
  this.user = user;
  this.content = title;
  this.msgId = msgId;
  this.id = General.id ++;
  return this;
}

// MsgView
function MsgView(user) {
  this.user = user;
  this.$elem = this.buildElem(user);
  this.lastMax = 0;

  console.log(General.data)
  if (General.data.length > 0) {;
    this.timeUpdate();
  }
}
MsgView.prototype.buildElem = function(user) {
  var $container  = document.createElement('div');
  $container.setAttribute('id', 'msgWrapper');
  $container.setAttribute('class', 'msg-wrapper');
  $container.setAttribute('user', user);

  return $container;
}
MsgView.prototype.timeUpdate = function() {

  // Time Update
  var that = this;
  setInterval(function() {
    var lastMsg = General.data[General.data.length - 1];
    if (lastMsg.id > that.lastMax) {
      that.update()
      that.lastMax = lastMsg.id
      console.log(that.lastMax)
      return
    }
    else {
      console.log('no more Message')
    }
  }, 1000)
}

MsgView.prototype.update = function() {
  // Msg ID in Viewer
  var lastMsg = General.data[General.data.length - 1];

  // Add new Msg  
  var $msgWrapper = this.$elem;

  for (var i = this.lastMax; i < lastMsg.id; i++) {

    console.log('lastMax:' + this.lastMax +' ;lastMsgId:' + lastMsg.id)

    var msgItem    = General.data[i + 1]
    var msgUser    = msgItem.user;
    var msgContent = msgItem.content;
    var msgWrapperUser = this.user;
    var $newMsg = this.newMsg(msgContent, msgUser, msgWrapperUser);

    // Put the new Msg
    $msgWrapper.appendChild($newMsg);
  }

}
// TEMP
// MsgView.prototype.firstUpdate = function(msgItem) {
//   var msgId      = msgItem.id;
//   var msgUser    = msgItem.user;
//   var msgContent = msgItem.content;

//   // Add new Msg  
//   var $msgWrapper = this.$elem;

//   // Put the new Msg
//   var msgWrapperUser = $msgWrapper.getAttribute('user');
//   var $newMsg = this.newMsg(msgContent, msgUser, msgWrapperUser);
//   $msgWrapper.appendChild($newMsg);
// }

MsgView.prototype.newMsg = function(msgContent, msgUser, msgWrapperUser) {

  var msg = document.createElement('div');

  msg.textContent = msgContent;
  msg.className += 'msg-item';
  if (msgWrapperUser == msgUser) {
    msg.className += ' msg-self';
  }
  return msg
}


// LocalStorage
function LocalStorage() {
  var data = JSON.stringify(General.data);
  localStorage.setItem('msgData', data);
}

// RecoverData
function RecoverData() {
  if (localStorage.msgData != '[]') {
    var recoverMsgData = JSON.parse(localStorage.msgData);
    General.data = recoverMsgData;
    General.id = recoverMsgData.length;

  } else {
    console.log('no data');
  }
}

function App() {

  // Recover Data
  RecoverData()

  var user1 = new Msg('Peter');
  var user2 = new Msg('Frank');
  document.getElementById('msg').append(user1.$elem);
  document.getElementById('msg').append(user2.$elem);

  // Recover Data user
  user1.recoverMsg();
  user2.recoverMsg();

}

window.app = new App();
window.onbeforeunload = LocalStorage;