var stompClient = null;

var messageBox = document.getElementById("messageBox");
var guidCode=guid();

function setConnected(connected) {
	$("#connect").prop("disabled", connected);
	$("#nickname").prop("disabled", connected);
	$("#disconnect").prop("disabled", !connected);
	$("#message").prop("disabled", !connected);
	$("#sendButton").prop("disabled", !connected);
	if (connected) {
		// 连接
		// 显示连接成功，
		$("#connMsg").html("已连接");
		$("#connMsg").removeClass("label label-danger");
		$("#connMsg").addClass("label label-success");

	} else {
		// 断开
		// 显示断开成功，
		$("#connMsg").text("已断开");
		$("#connMsg").removeClass("label label-success");
		$("#connMsg").addClass("label label-danger");

	}

}

// 连接websocket,点击连接按钮的时候触发
function connect() {

	if ($.trim($("#nickname").val()) == '') {
		alert("给自己起一个昵称吧");
		return;
	}

	var socket = new SockJS('/gs-guide-websocket');
	stompClient = Stomp.over(socket);
	stompClient.connect({}, function(frame) {
		// 连接成功之后要执行的内容
		setConnected(true);
		// XXX 这样做虽然能用，但是并不妥当 | 系统通知某某上线
		stompClient.send("/app/hello", {}, JSON.stringify({
			'message' : "欢迎 " + $("#nickname").val() + " 来到聊天室",
			'nickname' : "系统消息",
			'guidCode': guidCode
		}));

		// 订阅 /topic/greetings ，第二个参数当接收到消息的时候会执行的回调函数
		stompClient.subscribe('/topic/greetings', function(msg) {

			// 把接收到的消息显示在界面上
			var resources = JSON.parse(msg.body);
			showMessage(resources.nickname, resources.message);
			// 提示音
			if (resources.guidCode != guidCode) {
				
				var audio = document.getElementById("audio");
				audio.play();
			}

		});
	});
}

// 断开连接
function disconnect() {
	// XXX 这样做虽然能用，但是并不妥当
	stompClient.send("/app/hello", {}, JSON.stringify({
		'message' : $("#nickname").val() + " 退出聊天室",
		'nickname' : "系统消息",
		'guidCode':guidCode
	}));

	if (stompClient !== null) {
		stompClient.disconnect();
	}
	setConnected(false);
	console.log("Disconnected");
}

// 发送消息
function sendMessage() {
	if ($.trim($("#message").val()) == '') {
		return;
	}
	stompClient.send("/app/hello", {}, JSON.stringify({
		'message' : $("#message").val(),
		'nickname' : $("#nickname").val(),
		'guidCode':guidCode
	}));
	clearMessage();
}

// 显示消息
function showMessage(nickname, message) {

	var htmlContent = '<div class="row">' + '<span class="label label-info">'
			+ nickname + '</span> <span class="text-success"> ' + new Date()
			+ ' </span><br>' + '<p class="message">' + message + '</p>'
			+ '</div>';

	$("#messageBox").append(htmlContent);

	messageBox.scrollTop = messageBox.scrollHeight;
}

// 回车事件
$("#message").keyup(function(e) {
	if (e.keyCode == 13) {
		sendMessage();
	}
});

// 当关闭页面，或用户退出，要执行一个ws.close()方法
window.onbeforeunload = function() {
	// ws.close会触发后台的一个方法
	disconnect();
}

// 清空消息
function clearMessage() {
	$("#message").val('');
	$("#message").focus();
}

// 生成guid
function guid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}


