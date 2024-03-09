const record =SpreadsheetApp.getActive().getSheetByName('record');
const token ='mjI4cVfQQ22KfzpzwyzweJMgDFrNkU8rf0M6C2JMFFLJGpdvXDcaJOMrNLPm/z19usf3VgGGQ0Tb67oB5og5zHtymJYdH9p2tTR6wZRS8ilMWJNragwZ7YsXbLHggpw4dy9E5pClFH96aKEe8MGmYQdB04t89/1O/w1cDnyilFU=' 
function doPost(e) {
  var message = JSON.parse(e.postData.contents);
  var replyToken = message.events[0].replyToken;
  var text = message.events[0].message.text;
  if(text.indexOf('紀錄')!=-1){
    record.appendRow([new Date().toLocaleDateString(),text])
  }
  else if(text.indexOf('完成服藥')!=-1){
    main.getRange('B1').setValue('已完成');
    main.getRange('B2').setValue(new Date().toLocaleString())
  }
  var data = {
    replyToken: replyToken,
    messages: getReply(text)
  };
  var option = {
    method: 'post',
    headers: { Authorization: 'Bearer ' + token },
    contentType: 'application/json',
    payload: JSON.stringify(data)
  };
  if(getReply(text)!="") UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', option);
}
function getReply(text){
  if(text.indexOf('紀錄')!=-1){
    return [
      {
        "type": "text",
        "text": "謝謝你與我分享今日的心得，我順利收到你的祝福與分享了！我會默默的祈禱著你的願望實現的。"
      },{
        "type":"sticker",
        "packageId":"8525",
        "stickerId":"16581291"
      }
    ]
  }
  else if(text.indexOf('完成服藥')!=-1){
    return [
      {
        "type": "text",
        "text": "已為您紀錄服用時間，請繼續保持！"
      },{
        "type":"sticker",
        "packageId":"8525",
        "stickerId":"16581290"
      }
    ]
  }
  else if(text.indexOf('獲取資料')!=-1){
    return [
      {
        "type": "text",
        "text": main.getDataRange().getValues()[0][1]
      },
      {
        "type": "text",
        "text": "上次服藥時間："+ main.getDataRange().getValues()[1][1]
      }
    ]
  }
  return '';
}

