define('docs/renderers/Definitions.md', function(require, exports, module) {

  module.exports = {
    "html": "<h2><a class=\"anchor\" name=\"definitions\" href=\"#definitions\" aria-hidden=\"true\"><svg aria-hidden=\"true\" class=\"octicon octicon-link\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>Definitions</h2><p><code>Definitions</code>建立当前页面公共的配置项，在其他组件中可以通过<code>$ref</code>来引用当前配置项中的内容。注意 definitions 只能在顶级节点中定义，定义在其他位置，将引用不到。</p>\n<div class=\"amis-preview\" style=\"height: 400px\"><script type=\"text/schema\" height=\"400\">{\n  \"definitions\": {\n          \"aa\": {\n              \"type\": \"text\",\n              \"name\": \"jack\",\n              \"value\": \"ref value\",\n              \"labelRemark\": \"通过<code>\\\\$ref</code>引入的组件\"\n          }\n      },\n      \"type\": \"page\",\n      \"title\": \"引用\",\n      \"body\": [\n          {\n              \"type\": \"form\",\n              \"api\": \"api/xxx\",\n              \"actions\": [],\n              \"controls\": [\n                  {\n                      \"$ref\": \"aa\"\n                  }\n              ]\n          }\n      ]\n}\n</script></div>\n<p><code>Definitions</code> 最大的作用其实是能够实现对数据格式的递归引用。来看这个栗子吧。</p>\n<div class=\"amis-preview\" style=\"height: 800px\"><script type=\"text/schema\" height=\"800\">{\n  \"definitions\": {\n          \"options\": {\n            \"type\": \"combo\",\n            \"multiple\": true,\n            \"multiLine\": true,\n            \"name\": \"options\",\n            \"controls\": [\n            {\n                \"type\": \"group\",\n                \"controls\": [\n                {\n                    \"label\": \"名称\",\n                    \"name\": \"label\",\n                    \"type\": \"text\",\n                    \"required\": true\n                },\n                {\n                    \"label\": \"值\",\n                    \"name\": \"value\",\n                    \"type\": \"text\",\n                    \"required\": true\n                }\n                ]\n            },\n            {\n                \"label\": \"包含子选项\",\n                \"type\": \"switch\",\n                \"name\": \"hasChildren\",\n                \"mode\": \"inline\",\n                \"className\": \"block\"\n            },\n            {\n                \"$ref\": \"options\",\n                \"label\": \"子选项\",\n                \"name\": \"children\",\n                \"visibleOn\": \"this.hasOwnProperty('hasChildren') && this.hasChildren\",\n                \"addButtonText\": \"新增子选项\"\n            }\n            ]\n        }\n      },\n      \"type\": \"page\",\n      \"title\": \"引用\",\n      \"body\": [\n          {\n              \"type\": \"form\",\n              \"api\": \"api/xxx\",\n              \"actions\": [],\n              \"controls\": [\n                  {\n                      \"$ref\": \"options\",\n                      \"label\": \"选项\"\n                  },\n\n                  {\n                      \"type\": \"static\",\n                      \"label\": \"当前值\",\n                      \"tpl\": \"<pre>${options|json}</pre>\"\n                  }\n              ]\n          }\n      ]\n}\n</script></div>\n",
    "toc": {
      "label": "目录",
      "type": "toc",
      "children": [
        {
          "label": "Definitions",
          "fragment": "definitions",
          "fullPath": "#definitions",
          "level": 2
        }
      ],
      "level": 0
    }
  };

});
