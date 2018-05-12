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
  var $phone      = document.createElement('div');
  var $container  = document.createElement('div');
  var $inputFooter= document.createElement('div');
  var $input      = document.createElement('input');
  var $sendBtn    = document.createElement('button');
  var $userName   = document.createElement('h1');
  var $msgView    = this.msgView.$elem;

  // container
  $container.setAttribute('id','container');
  $container.setAttribute('class','msg-container');

  // input
  $inputFooter.setAttribute('class', 'msg-footer');
  $sendBtn.setAttribute('class', 'msg-send');
  $sendBtn.setAttribute('id', 'msgSend')
  $input.setAttribute('type', 'text');
  $input.setAttribute('id',   'msgInput');
  $input.setAttribute('class','msg-input');

  $inputFooter.append($input)
  $inputFooter.append($sendBtn)

  // msgContent
  $userName.textContent = this.user;
  $container.append($userName);
  $container.append($msgView);
  $container.append($inputFooter);

  $phone.setAttribute('class', 'msg-phone')
  $phone.append($container)

  return $phone;
}
Msg.prototype.bindEvents = function() {
  var that = this;
  var $input = that.$elem.querySelector('#msgInput');
  var $send  = that.$elem.querySelector('#msgSend')
  $input.addEventListener('keydown', function (e) {
      if (e.keyCode === 13 && $input.value != '') {

        that.send($input.value);
        // Clear input
        $input.value = '';
      }
  });
  $send.onclick = function() {
    if ($input.value != '') {
      that.send($input.value);
      // Clear input
      $input.value = '';
    }
  }
}
Msg.prototype.send = function(title) {
  // New Msg ID
  this.msgId ++;

  // Push Data
  var $item = new MsgItem(title, this.user, this.msgId);

  General.data.push($item);
  console.log(General.data);
}

// MsgItem
function MsgItem(title, user, msgId) {
  this.user = user;
  this.content = title;
  this.msgId = msgId;

  // 0 -> 1
  General.id ++;
  this.id = General.id;

  return this;
}

// MsgView
function MsgView(user) {
  this.user = user;
  this.$elem = this.buildElem(user);
  this.lastMax = 0;

  // Set Time Refresh
  this.timeUpdate();
}
MsgView.prototype.buildElem = function(user) {
  var $container  = document.createElement('div');
  var $list  = document.createElement('div');

  $container.setAttribute('id', 'msgWrapper');
  $container.setAttribute('class', 'msg-wrapper');
  $container.setAttribute('user', user);

  $list.setAttribute('id', 'msgList');
  $list.setAttribute('class', 'msg-list');

  $container.append($list);

  return $container;
}
MsgView.prototype.timeUpdate = function() {
  // Time Update
  var that = this;
  setInterval(function() {
    var lastMsg = General.data[General.data.length - 1];
    if (lastMsg != undefined && lastMsg.id > that.lastMax) {
      that.update();
      that.lastMax = lastMsg.id;
      return
    }
  }, 1000)
}

MsgView.prototype.update = function() {
  // Msg ID in Viewer
  var lastMsg = General.data[General.data.length - 1];

  // Add new Msg  
  var $msgWrapper = this.$elem;
  var $msgList = this.$elem.querySelector('#msgList')

  for (var i = this.lastMax; i < lastMsg.id; i++) {

    var msgItem    = General.data[i]
    var msgUser    = msgItem.user;
    var msgContent = msgItem.content;
    var msgWrapperUser = this.user;
    var $newMsg = this.newMsg(msgContent, msgUser, msgWrapperUser);

    // Put the new Msg
    $msgList.appendChild($newMsg);

    // Scroll to Bottom
    $msgWrapper.scrollTo(0, $msgList.clientHeight);
  }

}

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
  if (localStorage.msgData) {
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

}

window.app = new App();
window.onbeforeunload = LocalStorage;

