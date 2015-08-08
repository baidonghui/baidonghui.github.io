$(function() {
	var group = [{
		"n": "百度",
		"u": "http://www.baidu.com",
		"o": false
	}, {
		"n": "谷歌",
		"u": "http://duliziyou.com",
		"o": false
	}, {
		"n": "谷歌学术",
		"u": "https://scholar.google.com",
		"o": true
	}, {
		"n": "微博",
		"u": "http://weibo.com",
		"o": true
	}, {
		"n": "贴吧",
		"u": "http://tieba.baidu.com",
		"o": true
	}, {
		"n": "燕大",
		"g": "navyd",
	}, {	
		"n": "视频",
		"g": "navsp",
	}, {	
		"n": "公开课",
		"g": "navgkk",
	}, {	
		"n": "门户+新闻",
		"g": "navmx",
	}, {	
		"n": "购物",
		"g": "navgw",
	}];
		
	var obj = [{
		"n": "燕大首页",
		"u": "http://www.ysu.edu.cn",
		"g": "navyd",
		"o": true
	}, {
		"n": "图书馆",
		"u": "http://library.ysu.edu.cn",
		"g": "navyd",
		"o": true
	}, {
		"n": "燕大新闻",
		"u": "http://news.ysu.edu.cn/",
		"g": "navyd",
		"o": true
	}, {
		"n": "本科生教务系统",
		"u": "http://202.206.245.231/default2.aspx",
		"g": "navyd",
		"o": true
	}, {
		"n": "里仁学院教务系统",
		"u": "http://211.81.249.99/default2.aspx",
		"g": "navyd",
		"o": true
	}, {
		"n": "研究生教务系统",
		"u": "http://202.206.245.111/",
		"g": "navyd",
		"o": true
	}, {
		"n": "校园直播",
		"u": "http://yit.ysu.edu.cn/dmtfw/dszb/CCTV1.htm",
		"g": "navyd",
		"o": true
	}, {	
		"n": "爱奇艺",
		"u": "http://www.iqiyi.com/",
		"g": "navsp",
		"o": true
	}, {	
		"n": "优酷",
		"u": "http://www.youku.com/",
		"g": "navsp",
		"o": true
	}, {	
		"n": "土豆",
		"u": "http://www.tudou.com/",
		"g": "navsp",
		"o": true
	}, {	
		"n": "乐视",
		"u": "http://www.letv.com/",
		"g": "navsp",
		"o": true
	}, {	
		"n": "哔哩哔哩",
		"u": "http://www.bilibili.tv/",
		"g": "navsp",
		"o": true
	}, {	
		"n": "优课联盟(免流量)",
		"u": "http://ysdx.benke.chaoxing.com/",
		"g": "navgkk",
		"o": true
	}, {		
		"n": "edX",
		"u": "https://www.edx.org/",
		"g": "navgkk",
		"o": true
	}, {	
		"n": "Coursera",
		"u": "https://www.coursera.org/",
		"g": "navgkk",
		"o": true
	}, {	
		"n": "MIT Open CW",
		"u": "http://ocw.mit.edu/index.htm",
		"g": "navgkk",
		"o": true
	}, {	
		"n": "Open Yale Courses",
		"u": "http://oyc.yale.edu/",
		"g": "navgkk",
		"o": true
	}, {	
		"n": "Stanford Online",
		"u": "http://online.stanford.edu/",
		"g": "navgkk",
		"o": true
	}, {	
		"n": "Khan Academy",
		"u": "https://www.khanacademy.org/",
		"g": "navgkk",
		"o": true
	}, {	
		"n": "网易公开课",
		"u": "http://open.163.com/",
		"g": "navgkk",
		"o": true
	}, {	
		"n": "MOOC学院",
		"u": "http://mooc.guokr.com/",
		"g": "navgkk",
		"o": true
	}, {	
		"n": "极客学院",
		"u": "http://www.jikexueyuan.com/",
		"g": "navgkk",
		"o": true
	}, {	
		"n": "淘宝特卖",
		"u": "http://temai.taobao.com/event9776.htm?pid=mm_34619426_10544719_34746681",
		"g": "navgw",
		"o": true
	}, {	
		"n": "天猫精选",
		"u": "http://s.click.taobao.com/JVTYq1y?pid=mm_34619426_10544719_34746681",
		"g": "navgw",
		"o": true
	}, {	
		"n": "9块9包邮",
		"u": "http://temai.taobao.com/event10323.htm?pid=mm_34619426_10544719_34746681",
		"g": "navgw",
		"o": true
	}, {	
		"n": "聚划算",
		"u": "http://s.click.taobao.com/ZQscq1y?pid=mm_34619426_10544719_34746681",
		"g": "navgw",
		"o": true
	}, {	
		"n": "美团",
		"u": "http://www.meituan.com/",
		"g": "navgw",
		"o": true
	}, {	
		"n": "百度糯米",
		"u": "http://www.nuomi.com/",
		"g": "navgw",
		"o": true
	}, {	
		"n": "聚美优品",
		"u": "http://www.jumei.com/",
		"g": "navgw",
		"o": true
	}, {	
		"n": "唯品会",
		"u": "http://www.vip.com",
		"g": "navgw",
		"o": true
	}, {	
		"n": "京东商城",
		"u": "http://www.jd.com",
		"g": "navgw",
		"o": true
	}, {	
		"n": "新浪门户",
		"u": "http://www.sina.com.cn/",
		"g": "navmx",
		"o": true
	}, {	
		"n": "搜狐门户",
		"u": "http://www.sohu.com/",
		"g": "navmx",
		"o": true
	}, {	
		"n": "腾讯门户",
		"u": "http://www.qq.com/",
		"g": "navmx",
		"o": true
	}, {	
		"n": "网易门户",
		"u": "http://www.163.com/",
		"g": "navmx",
		"o": true
	}, {	
		"n": "新浪新闻",
		"u": "http://news.sina.com.cn/",
		"g": "navmx",
		"o": true
	}, {	
		"n": "环球新闻",
		"u": "http://www.huanqiu.com/",
		"g": "navmx",
		"o": true
	}, {	
		"n": "凤凰新闻",
		"u": "http://news.ifeng.com/",
		"g": "navmx",
		"o": true
	}];

	$.each(group, function(n, value) {
		if (value.u == undefined)
			$("#navmain").append('<li><a>' + value.n + '</a><ul id="'+ value.g +'"></ul></li>');
		else if(value.o)
		
			$("#navmain").append('<li esopenvaule="' + value.u + '"><a>' + value.n + '</a></li>');
		else
			$("#navmain").append('<li esvaule="' + value.u + '"><a>' + value.n + '</a></li>');
	});
	
	$.each(obj, function(n, value) {
		if (value.o == true) {
			$("#" + value.g).append('<li esopenvaule="' + value.u + '"><a>' + value.n + '</a></li>');
		} else {
			$("#" + value.g).append('<li esvaule="' + value.u + '"><a>' + value.n + '</a></li>');
		}
	});
});

