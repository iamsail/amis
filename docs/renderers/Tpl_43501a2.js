define('docs/renderers/Tpl.md', function(require, exports, module) {

  module.exports = {
    "html": "<h2><a class=\"anchor\" name=\"tpl\" href=\"#tpl\" aria-hidden=\"true\"><svg aria-hidden=\"true\" class=\"octicon octicon-link\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>Tpl</h2><p>tpl 类型的渲染器支持用 JS 模板引擎来组织输出，采用的 lodash 的 <a href=\"https://lodash.com/docs/4.15.0#template\">template</a>，关于语法部分，请前往 lodash 文档页面。</p>\n<div class=\"amis-preview\" style=\"height: 400px\"><script type=\"text/schema\" height=\"400\">{\n  \"data\": {\n    \"user\": \"no one\",\n    \"items\": [\n      \"A\",\n      \"B\",\n      \"C\"\n    ]\n  },\n  \"body\": [\n    {\n      \"type\": \"tpl\",\n      \"tpl\": \"User: <%= data.user%>\"\n    },\n    {\n      \"type\": \"tpl\",\n      \"inline\": false,\n      \"tpl\": \"<% if (data.items && data.items.length) { %>Array: <% data.items.forEach(function(item) { %> <span class='label label-default'><%= item %></span> <% }); %><% } %>\"\n    }\n  ]\n}\n</script></div>\n<p>仔细看示例不难发现，语法跟 ejs 很像，<code>&lt;% 这里面是 js 语句 %&gt;</code>，所以只要会写 js，做页面渲染没有什么问题。另外以下是一些可用 js 方法。</p>\n<ul>\n<li><code>formatDate(value, format=&#39;LLL&#39;, inputFormat=&#39;&#39;)</code> 格式化时间格式，关于 format 请前往 <a href=\"http://momentjs.com/\">moment</a> 文档页面。</li>\n<li><code>formatTimeStamp(value, format=&#39;LLL&#39;)</code> 格式化时间戳为字符串。</li>\n<li><code>formatNumber(number)</code> 格式化数字格式，加上千分位。</li>\n<li><code>countDown(value)</code> 倒计时，显示离指定时间还剩下多少天，只支持时间戳。</li>\n<li>下面 filters 中的方法也可以使用如： <code>&lt;%= date(data.xxx, &#39;YYYY-MM-DD&#39;)%&gt;</code></li>\n<li>可以联系我们添加更多公用方法。</li>\n</ul>\n<p>如：</p>\n<pre><code class=\"lang-json\">{\n    <span class=\"hljs-attr\">\"data\"</span>: {\n        <span class=\"hljs-attr\">\"user\"</span>: <span class=\"hljs-string\">\"no one\"</span>\n    },\n    <span class=\"hljs-attr\">\"body\"</span>: {\n        <span class=\"hljs-attr\">\"type\"</span>: <span class=\"hljs-string\">\"tpl\"</span>,\n        <span class=\"hljs-attr\">\"tpl\"</span>: <span class=\"hljs-string\">\"User: &lt;%= formatDate(data.time, 'YYYY-MM-DD') %&gt;\"</span>\n    }\n}\n</code></pre>\n<p>如果只想简单取下变量，可以用 <code>$xxx</code> 或者 <code>${xxx}</code>。同时如果不指定渲染器类型，默认就是 <code>tpl</code>, 所以以上示例可以简化为。</p>\n<blockquote>\n<p>取值支持多级，如果层级比较深可以用 <code>.</code> 来分割如： <code>${xx.xxx.xx}</code>\n另外 <code>$&amp;</code> 表示直接获取当前的 <code>data</code>。</p>\n</blockquote>\n<div class=\"amis-preview\" style=\"height: 400px\"><script type=\"text/schema\" height=\"400\">{\n  \"data\": {\n    \"user\": \"no one\"\n  },\n  \"body\": \"User: $user\"\n}\n</script></div>\n<p><code>注意：$xxx 与 &lt;%= data.xxx %&gt; 这两种语法不能同时使用，只有一种有效，所以不要交叉使用。</code></p>\n<p>通过 <code>$xxx</code> 取到的值，默认是会做 html 转义的，也就是说  <code>$xxx</code> 完全等价于 <code>${xxx | html}</code>, 如果你想什么都不做，那么请这么写 <code>${xxx | raw}</code>。</p>\n<p>从上面的语法可以看出来，取值时是支持指定 filter 的，那么有哪些 filter 呢？</p>\n<ul>\n<li><code>html</code> 转义 html 如：<code>${xxx|html}</code>。</li>\n<li><code>json</code> json stringify。</li>\n<li><code>raw</code> 表示不转换, 原样输出。</li>\n<li><code>date</code> 做日期转换如： <code>${xxx | date:YYYY-MM-DD}</code></li>\n<li><code>number</code> 自动给数字加千分位。<code>${xxx | number}</code> <code>9999</code> =&gt; <code>9,999</code></li>\n<li><code>trim</code> 把前后多余的空格去掉。</li>\n<li><code>percent</code> 格式化成百分比。<code>${xxx | percent}</code> <code>0.8232343</code> =&gt; <code>82.32%</code></li>\n<li><code>round</code> 四舍五入取整。</li>\n<li><code>truncate</code> 切除， 当超出 200 个字符时，后面的部分直接显示 ...。 <code>${desc | truncate:500:...}</code></li>\n<li><code>url_encode</code> 做 url encode 转换。</li>\n<li><code>url_decode</code> 做 url decode 转换。</li>\n<li><code>default</code> 当值为空时，显示其他值代替。 <code>${xxx | default:-}</code> 当为空时显示 <code>-</code></li>\n<li><code>join</code> 当值是 array 时，可以把内容连起来。\\${xxx | join:,}</li>\n<li><code>first</code> 获取数组的第一个成员。</li>\n<li><code>last</code> 获取数组的最后一个成员。</li>\n<li><code>pick</code> 如果是对象则从当前值中再次查找值如： <code>${xxx|pick:yyy}</code> 等价于 <code>${xxx.yyy}</code>。如果是数组，则做 map 操作，操作完后还是数组，不过成员已经变成了你选择的东西。如: <code>${xxx|pick:yyy}</code> 如果 xxx 的值为 <code>[{xxx: 1, yyy: 2}]</code> 经过处理后就是 <code>[{yyy: 2}]</code>。更复杂的用法： <code>${xxx|pick:a~xxx,b~yyy}</code> 经过处理就是 <code>[{a:1, b: 2}]</code></li>\n<li><code>split</code> 可以将字符传通过分隔符分离成数组，默认分隔符为 <code>,</code> 如： <code>${ids|split|last}</code> 即取一段用逗号分割的数值中的最后一个。</li>\n<li><code>nth</code> 取数组中的第 n 个成员。如： <code>${ids|split|nth:1}</code></li>\n<li><code>str2date</code> 请参考 <a href=\"/amis/docs/renderers/Date\">date</a> 中日期默认值的设置格式。</li>\n<li><code>duration</code> 格式化成时间端如：<code>2</code> -=&gt; <code>2秒</code> <code>67</code> =&gt; <code>1分7秒</code> <code>1111111</code> =&gt; <code>13天21时39分31秒</code></li>\n<li><code>asArray</code> 将数据包成数组如： <code>a</code> =&gt; <code>[a]</code></li>\n<li><code>lowerCase</code> 转小写</li>\n<li><code>upperCase</code> 转大写</li>\n<li><code>base64Encode</code> base64 转码</li>\n<li><code>base64Decode</code> base64 解码</li>\n</ul>\n<p>组合使用。</p>\n<ul>\n<li><code>${&amp;|json|html}</code> 把当前可用的数据全部打印出来。<code>$&amp;</code> 取当前值，json 做 json stringify，然后 html 转义。</li>\n<li><code>${rows:first|pick:id}</code> 把 rows 中的第一条数据中的 id 取到。</li>\n<li><code>${rows|pick:id|join:,}</code></li>\n</ul>\n<p>没有找到合适的？可以自定义 filter。如果是 AMIS 平台用户，可以将以下代码加入到自定义组件中，如果不是请想办法插入以下代码。</p>\n<pre><code class=\"lang-js\"><span class=\"hljs-keyword\">import</span> {registerFilter} <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'amis'</span>;\n\nregisterFilter(<span class=\"hljs-string\">'my-filter'</span>, <span class=\"hljs-function\">(<span class=\"hljs-params\">input:<span class=\"hljs-built_in\">string</span></span>) =&gt;</span> <span class=\"hljs-string\">`<span class=\"hljs-subst\">${input}</span>Boom`</span>);\n</code></pre>\n<p>加入成功后就可以这样使用了 <code>${xxx | my-filter}</code>。 如果 <code>xxx</code> 的值是 <code>abc</code> 那么输出将会是 <code>abcBoom</code>。</p>\n",
    "toc": {
      "label": "目录",
      "type": "toc",
      "children": [
        {
          "label": "Tpl",
          "fragment": "tpl",
          "fullPath": "#tpl",
          "level": 2
        }
      ],
      "level": 0
    }
  };

});
