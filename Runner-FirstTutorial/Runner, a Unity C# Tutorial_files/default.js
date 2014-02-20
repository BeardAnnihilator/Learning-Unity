var keywords = {
	'abstract': 1,
	'as': 1,
	base: 1,
	'break': 1,
	'class': 1,
	'const': 1,
	'continue': 1,
	'delegate': 1,
	'else': 1,
	'enum': 1,
	'event': 1,
	'false': 1,
	'for': 1,
	'foreach': 1,
	get: 1,
	'if': 1,
	'in': 1,
	namespace: 1,
	'new': 1,
	'null': 1,
	'out': 1,
	'override': 1,
	'private': 1,
	'protected': 1,
	'public': 1,
	'return': 1,
	set: 1,
	'static': 1,
	'struct': 1,
	'using': 1,
	'this': 1,
	'true': 1,
	'typeof': 1,
	virtual: 1,
	'void': 1,
	'while': 1,
	yield: 1
};
var primitiveTypes = {
	'bool': 1,
	'char': 1,
	'float': 1,
	'int': 1,
	'string': 1
};
var customTypes = customTypes || {};
var ccTypes = {
	'CCDistanceMapGenerator': 1,
	'CCEditorUtility': 1,
	'CCFont': 1,
	'CCGradient' : 1,
	'CCStringBuilderUtility': 1,
	'CCText': 1,
	'CCTextCylinderWrapper': 1,
	'CCTextMarkedColorer': 1,
	'CCTextModifier': 1,
	'CCTextRangeColorer': 1,
	'CCTextVerticalColorer': 1
};
var unityTypes = {
	'Application': 1,
	'AssetDatabase': 1,
	'Camera': 1,
	'CanEditMultipleObjects': 1,
	'Color': 1,
	'CustomEditor': 1,
	CustomPropertyDrawer: 1,
	'Debug': 1,
	'Editor': 1,
	'EditorGUI': 1,
	EditorGUIUtility: 1,
	'EditorGUILayout': 1,
	'EditorStyles': 1,
	'ExecuteInEditMode': 1,
	'Event': 1,
	'EventType': 1,
	'ForceMode': 1,
	'GameObject': 1,
	GUI: 1,
	'GUIContent': 1,
	'GUILayout': 1,
	'GUILayoutOption': 1,
	'GUIText': 1,
	'Handles': 1,
	'HideFlags': 1,
	'Input': 1,
	'Material': 1,
	'Mathf': 1,
	'MenuItem': 1,
	'Mesh': 1,
	'MeshFilter': 1,
	'MeshRenderer': 1,
	MessageType: 1,
	'MonoBehaviour': 1,
	'Object': 1,
	'ParticleSystem': 1,
	'ParticleEmitter': 1,
	'Physics': 1,
	'PhysicMaterial': 1,
	'PrefabUtility': 1,
	'PrefabType': 1,
	PropertyAttribute: 1,
	PropertyDrawer: 1,
	'Quaternion': 1,
	'Random': 1,
	'Ray': 1,
	'RaycastHit': 1,
	'Rect': 1,
	'RequireComponent': 1,
	'Selection': 1,
	Screen: 1,
	'ScriptableObject': 1,
	'SerializedObject': 1,
	'SerializedProperty': 1,
	'Texture2D': 1,
	'Transform': 1,
	'Undo': 1,
	'Vector2': 1,
	'Vector3': 1,
	WaitForSeconds: 1
};
var msdnTypes = {
	'ArrayList': 1,
	'DateTime': 1,
	Flags: 1,
	IEnumerator: 1,
	List: 1,
	'Queue': 1,
	'Serializable': 1,
	'StringBuilder': 1,
	'Time': 1,
	'TimeSpan': 1
};

function highlight(text){
	var input = text.innerHTML;
	var length = input.length;
	var output = '';
	var i = 0;
	while(i < length){
		var c = input.charAt(i++);
		if('a' <= c && c <= 'z'){
			// possible keyword or primitive type
			var word = c;
			while(i < length){
				c = input.charAt(i);
				if((c < 'a' || 'z' < c) && (c < 'A' || 'Z' < c) && (c < '0' || '9' < c)){
					break;
				}
				word += c;
				i += 1;
			}
			if(word in keywords){
				output += '<b class="keyword">' + word + '</b>';
			}
			else if(word in primitiveTypes){
				output += '<b class="type">' + word + '</b>';
			}
			else{
				output += word;
			}
			continue;
		}
		if('A' <= c && c <= 'Z'){
			// possible type
			var word = c;
			while(i < length){
				c = input.charAt(i);
				if((c < 'a' || 'z' < c) && (c < 'A' || 'Z' < c) && (c < '0' || '9' < c)){
					break;
				}
				word += c;
				i += 1;
			}
			if(word in customTypes){
				output += '<b class="type">' + word + '</b>';
			}
			else if(word in ccTypes){
				output += '<a class="cc-type" href="http://catlikecoding.com/unity/documentation/' + word + '/scripting/">' + word + '</a>';
			}
			else if(word in unityTypes){
				output += '<a class="unity-type" href="http://docs.unity3d.com/Documentation/ScriptReference/' + word + '.html">' + word + '</a>';
			}
			else if(word in msdnTypes){
				output += '<a class="msdn-type" href="http://social.msdn.microsoft.com/search/en-us?query=' + word + '">' + word + '</a>';
			}
			else{
				output += word;
			}
			continue;
		}
		if('0' <= c&& c <= '9'){
			// numerical value
			var number = c;
			while(i < length){
				c = input.charAt(i);
				if((c < '0' || '9' < c) && c !== '.' && c !== 'f'){
					break;
				}
				number += c;
				i += 1;
			}
			output += '<span class="constant">' + number + '</span>';
			continue;
		}
		if(c === '"'){
			// string value
			var string = c;
			while(i < length){
				c = input.charAt(i);
				string += c;
				i += 1;
				if(c === '"'){
					break;
				}
			}
			output += '<span class="constant">' + string + '</span>';
			continue;
		}
		if(c === '\''){
			// char value
			var string = c;
			while(i < length){
				c = input.charAt(i);
				string += c;
				i += 1;
				if(c === '\''){
					break;
				}
			}
			output += '<span class="constant">' + string + '</span>';
			continue;
		}
		if (c === '#') {
			// directive
			var string = c;
			while(i < length){
				c = input.charAt(i);
				string += c;
				i += 1;
				if(c === '\n'){
					break;
				}
			}
			output += '<span class="directive">' + string + '</span>';
			continue;
		}
		// something else
		output += c;
	}
	text.innerHTML = output;
}

(function(){
	var codeBlocks = document.getElementsByTagName('pre');
	for(var i = 0; i < codeBlocks.length; i++){
		highlight(codeBlocks[i]);
	}
	var inlineCode = document.getElementsByTagName('code');
	for(var i = 0; i < inlineCode.length; i++){
		highlight(inlineCode[i]);
	}
})();

function GetUnity() {
	if (typeof unityObject !== 'undefined') {
		return unityObject.getObjectById('unityPlayer');
	}
	return null;
}

function Play(file, width, height){
	document.getElementById('playerButton').style.display = 'none';
	document.getElementById('player').style.display = 'block';
	if (typeof unityObject !== 'undefined') {
		unityObject.embedUnity('unityPlayer', file, width, height);
	}
}


(function(){

	function url2crumb (text){
		var s = text.charAt(0).toUpperCase();
		for(var i = 1; i < text.length; i++){
			var c = text.charAt(i);
			if(c === '-'){
				s += ' ' + text.charAt(i + 1).toUpperCase();
				i += 1;
			}
			else{
				s += c;
			}
		}
		return s;
	}

	var header = document.getElementsByTagName('header')[0];
	var headerType = header.getAttribute('data-type');
	var headerSubnavType = header.getAttribute('data-subnav-type');
	var headerDocumentation = header.getAttribute('data-documentation');
	var headerProduct = header.getAttribute('data-product');
	var nav = '';

	if(headerType === 'documentation'){
		nav += '<div id="documentation-header">Documentation</div>';
	}
	else if(headerType === 'product'){
		nav += '<div id="product-header">Product</div>';
	}
	else if(headerType === 'tutorial'){
		nav += '<div id="tutorial-header"><div class="g-plusone" data-href="http://catlikecoding.com/unity/tutorials/" data-size="medium" data-count="true"></div><iframe src="http://www.facebook.com/plugins/like.php?app_id=224517547559857&amp;href=http%3A%2F%2Fwww.facebook.com%2Funity.c.sharp.tutorials&amp;send=false&amp;layout=button_count&amp;width=100&amp;show_faces=false&amp;action=like&amp;font&amp;height=21" style="border:none; overflow:hidden; width:100px; height:21px;"></iframe><a id="blog-icon" href="http://catlikecoding.com/blog/category:unity/tags:unity+tutorials" title="Catlike Coding Blog"></a><a id="twitter-icon" href="http://twitter.com/catlikecoding" title="Catlike Coding on Twitter"></a><a id="facebook-icon" href="http://www.facebook.com/unity.c.sharp.tutorials" title="Unity C# Tutorials on Facebook"></a></div>';
		var gp = document.createElement('script');
		gp.src = 'https://apis.google.com/js/plusone.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(gp, s);
	}

	var pathParts = window.location.pathname.split('/');
	nav += '<nav id="breadcrumbs"><ul><li><a href="http://catlikecoding.com/">Catlike Coding</a></li>';
	var path = 'http://catlikecoding.com/';
	for(var i = 1; i < pathParts.length - 1; i++){
		var part = pathParts[i];
		path += part + '/';
		nav += '<li><a href="' + path + '">' + url2crumb(part) + '</a></li>';
	}
	var headerContents = nav + '</ul></nav>';

	if(headerProduct || headerDocumentation || headerSubnavType){
		nav = '<nav><ul>';
		if(headerSubnavType === 'editor/scripting'){
			if(window.location.pathname.slice(-11) === '/scripting/'){
				nav += '<li><a href="..">Editor</a></li><li><a href=".">Scripting</a></li>';
			}
			else{
				nav += '<li><a href=".">Editor</a></li><li><a href="scripting/">Scripting</a></li>';
			}
		}
		else if(headerSubnavType === 'demo'){
			nav += '<li><a href="demo/">Demo</a></li>';
		}
		if(headerDocumentation){
			nav += '<li><a href="http://catlikecoding.com/unity/documentation/' + headerDocumentation + '/">Documentation</a></li>';
		}
		if(headerProduct){
			nav += '<li><a href="http://catlikecoding.com/unity/products/' + headerProduct + '/">Product</a></li>';
		}
		headerContents += nav + '</ul>';
	}
	
	if (headerType === 'tutorial') {
		headerContents += '<div class="numberflow-ad"><a href="http://catlikecoding.com/unity/products/numberflow/" onclick="_gaq.push([\'_trackEvent\', \'Self Ad\', \'Follow\']);"><b>NumberFlow</b><br>procedural texture editor for Unity</a></div>';
	}

	header.innerHTML = headerContents;
})();

if (window.jQuery) {
	$(function() {
		var shareBlocks = $('aside.share');
		if (shareBlocks.length > 0) {
			
			var share = '';
			$.each([
				['twitter', '<a href="https://twitter.com/share" class="twitter-share-button" data-via="catlikecoding" data-hashtags="Unity3D"></a>'],
				['google', '<div class="g-plus" data-action="share" data-annotation="bubble"></div>'],
				['facebook', '<div class="fb-share-button" data-type="button_count"></div>']
			], function() {
				share += '<div class="-share">' + this[1] + '</div>';
			});
			shareBlocks.html(share);
			
			// Tweet
			(function (d,s,id){
				var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
				if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}
			})(document, 'script', 'twitter-wjs');
			
			// Facebook share
			(function(d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
				js = d.createElement(s); js.id = id;
				js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=224517547559857";
				fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
			
			// Google+ share
			(function() {
				var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
				po.src = 'https://apis.google.com/js/platform.js';
				var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
			})();
		}
		
		var footer = '<nav><ul>';

		$.each([
			['About', 'http://catlikecoding.com/about/'],
			['Blog', 'http://catlikecoding.com/blog/'],
			['Contact', 'http://catlikecoding.com/contact/'],
			['Documentation', 'http://catlikecoding.com/unity/documentation/'],
			['Products', 'http://catlikecoding.com/unity/products/'],
			['Tutorials', 'http://catlikecoding.com/unity/tutorials/']
		], function() {
			footer += '<li><a href="' + this[1] + '">' + this[0] + '</a></li>';
		});
		
		footer += '</ul></nav><a href="http://catlikecoding.com/">&copy; Catlike Coding</a><p><ul>';
		
		$.each([
			['Twitter', 'https://twitter.com/catlikecoding', 'me'],
			['Facebook', 'https://www.facebook.com/catlikecoding', 'me'],
			['Google+', 'https://google.com/+CatlikeCoding', 'me publisher']
		], function() {
			footer += '<li><a href="' + this[1] + '" rel="' + this[2] + '">' + this[0] + '</a></li>';
		});
		
		footer += '</ul>';
		
		$('footer').html(footer);
	});
}

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-9406403-1']);
_gaq.push(['_trackPageview']);

(function(){
	var ga = document.createElement('script');
	ga.async = true;
	ga.src = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(ga, s);
})();
