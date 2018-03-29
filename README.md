# fetch
The Google Apps Script FetchApp wrapper

Short your code

## Default `get` with Authorization
```js
function getBlog(){
  var response = Fetch.get("https://www.googleapis.com/blogger/v3/blogs/blogId");
  Logger.log(response.getContentText())
}
```

## Default `post` with Authorization, contentType and stringify payloads
```js
function createPost(){
  var content = DocumentApp.openById("ID").getBody().getText();

  var options = {
    payload: {
      "kind": "blogger#post",
      "blog": {
        "id": "blogId"
      },
      "title": "A new post",
      "content": content
    },
  }
  var response = Fetch.post("https://www.googleapis.com/blogger/v3/blogs/blogId/posts", options);
  
  Logger.log(response.getContentText())
  
}
```

## Default `put` with Authorization, contentType and stringify payloads
```js
function updatePost(){
  
  var docExport = Drive.Files.get("ID").exportLinks["text/html"];
  var content = Fetch.get(docExport).getContentText();
  
  var options = {
    payload: {
      "kind": "blogger#post",
      "id": "postId",
      "blog": {
        "id": "blogId"
      },
      "selfLink": "https://www.googleapis.com/blogger/v3/blogs/blogId/posts/postId",
      "title": "An updated post",
      "content": content
    },
  }
  var response = Fetch.put("https://www.googleapis.com/blogger/v3/blogs/blogId/posts/postId", options);
  
  Logger.log(response.getContentText())
  
}
```