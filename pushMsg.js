const main = SpreadsheetApp.getActive().getSheetByName('main')
const channelToken ='<token>'
function pushMsg() {
  if(main.getRange('B1').getValue()=='已完成') return;
  var url = 'https://api.line.me/v2/bot/message/push';
  var opt = {
  'headers': {
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + channelToken,
  },
  'method': 'POST',
  'payload': JSON.stringify({
    // message.event[0] 的 userId
    "to":"<userID>",
    "messages": getMsg()
  })
 };
 UrlFetchApp.fetch(url, opt);
}
function getMsg(){
  var currentHour = new Date().getHours();
  if(main.getRange('B1').getValue()== '未完成'){
    // 6~7 , 9~10
    if(currentHour<11) return [{
        "type": "text", 
        "text": "早晨的開始請記得服藥唷！"
    },
    {
        "type": "text", 
        "text": "若完成服用請輸入：完成服藥"
    },
    {
        "type":"sticker",
        "packageId":"789",
        "stickerId":"10855"
    }]
    // 12~13 , 13~14
    else if(currentHour<17) return [{
        "type": "text", 
        "text": "中午吃飽飯後也別忘了服藥！"
    },{
        "type": "text", 
        "text": "若完成服用請輸入：完成服藥"
    },
    {
        "type":"sticker",
        "packageId":"6362",
        "stickerId":"11087922"
    }]
    // 17~18 ,19~20
    else if(currentHour<21) return [{
        "type": "text", 
        "text": "晚餐結束後也別忘了要吃藥！"
    },
    {
        "type": "text", 
        "text": "若完成服用請輸入：完成服藥"
    },
    {
        "type":"sticker",
        "packageId":"446",
        "stickerId":"1992"
    }]
    else return [{
        "type": "text", 
        "text": "睡前有沒有想要紀錄的美好時光或想要許下的願望呢？不妨跟我分享吧！"
    },{
        "type": "text", 
        "text": "留言格式：紀錄：<你想要留給今天的你的期許與話語>"
    }
    ,{
        "type":"sticker",
        "packageId":"8525",
        "stickerId":"16581294"
    }]
  }
}