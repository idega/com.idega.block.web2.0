
function Chat(id, serviceIn) {
    var uuid = id;    
    var containerDiv = document.getElementById(uuid);
    var service = serviceIn;
    var userId;
    var msgIndex = 0;
    var chatPane;
    var signOffLink;
    var chatWindow;
    var timeout = 4000;
    var scroller;
    var scollerY = 0;
    var modalDiv;
    var login;
    var initialized;
    var checkForMessages = true;

    this.validateUserId = function() {
        var target = document.getElementById(uuid + "_userid");
        if (target.value == '') {
            return;
        }
        var url = service + "?action=valid-register&userid=" + target.value;
        jmaki.doAjax({url: url, callback: function(lreq) { var req= lreq; processValidate(req);}});
    }

    this.register = function() {
        var target = document.getElementById(uuid +"_userid");
        var avatar = document.getElementById(uuid + "_avatar").value;
        var url = service + "?action=register&userid=" + target.value + "&icon=" + avatar;
        jmaki.doAjax({url: url, callback: function(req) { var _req=req; processRegistration(_req);}});
    }
    
    this.signoff = function() {
        var url = service + "?action=signoff&userid=" +userId;
        jmaki.doAjax({url: url, callback: function(req) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                checkForMessages = false;
                showSigninMode();
            }}
        }});
    }
    
    function showSigninMode() {
        if (typeof modalDiv == "undefined") {
            modalDiv = document.createElement("div");
            modalDiv.style.position = "absolute";
            modalDiv.style.background = "black";
            modalDiv.style.zIndex = "2";
            if (typeof document.body != "undefined") {
                document.body.appendChild(modalDiv);
                var point = getPosition(containerDiv);
                modalDiv.style.left = point.x + "px";
                modalDiv.style.top = point.y + "px";
            }
            modalDiv.style.height = containerDiv.offsetHeight + "px";
            modalDiv.style.width = containerDiv.offsetWidth + "px";
            setOpacity(50, modalDiv);
        }
        chatPane.innerHTML = "";
        modalDiv.style.visibility = "visible";
        mdiv = document.getElementById(uuid + "_statusMessage");
        mdiv.innerHTML = "";
        var inputField = document.getElementById(uuid + "_userid");
        login.style.visibility = "visible";    
        inputField.value = "";
        inputField.focus();
    }
    
    function setOpacity(opacity, target) {
        if (typeof target.style.filter != 'undefined') {
            target.style.filter = "alpha(opacity:" + opacity + ")"; 
        } else {
            target.style.opacity = opacity/100;
        }            
    }

    function sendMessage() {
        var messageText = document.getElementById(uuid + "_messageText");
        var url = service + "?action=add-message&message=" + messageText.value + "&userid=" + userId;
        jmaki.doAjax({url: url, callback: function(req) {var _req=req; processMessagePost(_req);}});
        // clear the message field
        messageText.value = "";
        return false;
    }

    function getMessages() {
        var url = service + "?action=get-messages&userid=" + userId;
        jmaki.doAjax({url: url, callback: function(req) {var _req=req; processMessages(_req);}});
        if (checkForMessages && checkForMessages == true) {
            setTimeout(getMessages, timeout);
        }
    }

    function processMessagePost(req) {
        if (req.readyState == 4) {
            if (req.status == 403) {
                checkForMessages = false;
                status.innerHTML = "You session has expired.";
                showSigninMode();
            }
        }
    }
    
    function processRegistration(req) {
        if (req.readyState == 4) {
            if (req.status == 200) {
               var errorMsg = "<message>invalid</message>";
               var msg = req.responseText;
               if (msg == errorMsg){
                   var mdiv = document.getElementById(uuid + "_statusMessage");
                   mdiv.innerHTML = "Invalid User Id";
                   mdiv.className = "error";
                   submitBtn.disabled = true;
                } else {
                   var messageStart= req.responseXML.getElementsByTagName("message")[0];
                   msgIndex = Number(messageStart.firstChild.nodeValue);
                   mdiv = document.getElementById(uuid + "_statusMessage");
                   mdiv.innerHTML = "Valid User Id";
                   mdiv.className = "success";
                   var submitBtn = document.getElementById(uuid + "_login_btn");
                   submitBtn.disabled = true;
                   var target = document.getElementById(uuid + "_userid");
                   userId = target.value;
                   postRegister();
                   getMessages();
                }  
             }
        }
    }

    function processValidate(req) {
        if (req.readyState == 4) {
            if (req.status == 200) {
               var errorMsg = "<message>invalid</message>";
               var msg = req.responseText;
               if (msg == errorMsg){
                   var mdiv = document.getElementById(uuid + "_statusMessage");
                   mdiv.innerHTML = "Invalid User Id";
                   mdiv.className = "error";
                   var submitBtn = document.getElementById(uuid + "_login_btn");
                   submitBtn.disabled = true;
                } else {
                   mdiv = document.getElementById(uuid + "_statusMessage");
                   mdiv.innerHTML = "Valid User Id";
                   mdiv.className = "success";
                   var submitBtn = document.getElementById(uuid + "_login_btn");
                   submitBtn.disabled = false;
                }  
             }
        }
    }

    function processMessages(req) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                parseMessages(req);
             } else if (req.status == 403) { 
                checkForMessages = false;
                status.innerHTML = "You session has expired.";
                showSigninMode();
             }
        }
    }

    function parseMessages(req) {
        var messages = req.responseXML.getElementsByTagName("messages")[0];
         for (loop = 0; loop < messages.childNodes.length; loop++) {
            var message = req.responseXML.getElementsByTagName("message")[loop];
            var messagesText =  message.getElementsByTagName("text")[0].firstChild.nodeValue;
            var messageSender = message.getElementsByTagName("sender")[0].firstChild.nodeValue;
            if (messageSender == "Server" && messagesText == "Flushed the message history.") {
                 msgIndex = 0;
            }
            var imageNode = message.getElementsByTagName("icon")[0].firstChild;
            var imageClass = "";
             if (imageNode != null) {
                imageClass = imageNode.nodeValue;
            }
            var styleNode = message.getElementsByTagName("style")[0].firstChild;
            var style = "";
            if (styleNode != null) {
                style = styleNode.nodeValue;
            }
            appendMessage(messagesText, imageClass);
        }
        msgIndex = msgIndex + messages.childNodes.length;
    }

    function appendMessage(message, imageClass) {
        var outerDiv = document.createElement("div");
        outerDiv.innerHTML = message ;
        outerDiv.className  =  "chatMessage" +  " "  + imageClass;
        chatPane.appendChild(outerDiv);
        setTimeout(scrollChatPane,0);
    }

    function scrollChatPane() {
        chatWindow.scrollTop = chatPane.scrollHeight;
        chatPane.scrollTop = 0;
    }

    function postRegister() {
       checkForMessages = true;
       if (typeof modalDiv != "undefined" && modalDiv != null) {
          modalDiv.style.visibility = "hidden";
       }      
       login.style.visibility = "hidden";

       if (!initialized) {
           var south = document.getElementById(uuid + "_south");
                          
           var chatInput = document.createElement("input");
           
           chatInput.type="text";
           chatInput.className = "chatInput";
           chatInput.id = uuid + "_messageText";
           chatInput.name = "message";
           
           south.appendChild(chatInput);
           chatInput.focus();
           
           var chatSend = document.createElement("input");
           chatSend.type = "button";
           chatSend.id = uuid + "_message_btn";
           chatSend.value = "Send";
           
           
           south.appendChild(chatSend);
           var signoff = document.getElementById(uuid + "_signoff");
           
           signOffLink = document.createElement("a");
           signOffLink.appendChild(document.createTextNode("Sign Off"));
           signOffLink.href = "javascript:jmaki.attributes.get('" + uuid + "').signoff()";
           signoff.appendChild(signOffLink);
           
           //reset chat form action
           var chatForm = document.getElementById(uuid + "_chatForm");
           // remove the original onsubmit
           
           if (typeof chatForm.attachEvent != 'undefined') {
                // remove the original onsubmit
                chatForm.onsubmit = "";
                chatForm.attachEvent("onsubmit", sendMessage);
                chatSend.attachEvent("onclick", sendMessage, true);
            } else {
                chatForm.setAttribute("onsubmit", "return false;");
                chatForm.addEventListener("submit", sendMessage, false);
                chatSend.addEventListener("click", sendMessage, false);
            }

           var center = document.getElementById(uuid + "_center");
            // create the chat pane
           chatWindow = document.createElement("div");
           chatWindow.id = uuid + "_chatWindow";
           chatWindow.className = "chatWindow";
           chatPane = document.createElement("div");
           chatPane.className = "chatPane";
           chatPane.id = uuid + "_chatPane";
           center.appendChild(chatWindow);
           chatWindow.appendChild(chatPane);
           initialized = true;
       }
    }

    this.initialize = function() {
        login = document.getElementById(uuid + "_login");
        login.style.visibility = "visible";
        var point = getPosition(containerDiv);
        var lLeft = point.x + ((containerDiv.offsetWidth / 2) - (login.offsetWidth / 2));
        var lTop = point.y + ((containerDiv.offsetHeight / 2) - (login.offsetHeight / 2));
        login.style.left = lLeft + "px";
        login.style.top = lTop + "px";
        var submitBtn = document.getElementById(uuid + "_login_btn");
        submitBtn.disabled = true;
        var inputField = document.getElementById(uuid + "_userid");
        inputField.focus();
       
    }
    
    function getPosition(tElement) {
        var pX = 0;
        var pY = 0;
        while (tElement.offsetParent) {
                pY += tElement.offsetTop;
                pX += tElement.offsetLeft;
                tElement = tElement.offsetParent;
        }
        return {x: pX, y: pY};
    }
}

var chat = new Chat(widget.uuid, widget.service);
chat.initialize()
jmaki.attributes.put(widget.uuid, chat);
