var Q = {
    /*ajax({
        data:data
    },callback())*/
    ajax: function (e,callbackfn){
        var type = e.type || "GET";
        var data = e.data || "";
        var async = e.async || true;
        var callback = callbackfn || function(){};
        $.ajax({
            url: e.url,
            data: data,
            async: async,
            dataType: "json",
            beforeSend: function(){

            },
            success: function(data){
                if(data.code === 0){
                    callback(data);
                }
            },
            error: function(data){
                console.log(data);
            }
        })
    },
    /*函数去抖
        fn {function} 实际执行的函数
        delay {number} 延迟时间，单位ms
    */
    debounce: function(fn,delay){
        var timer = null;
        return function(){
            var context = this;
            var args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function(){
                fn.apply(context, args)
            },delay);
        }
    },
    /*去除空格
        type 1-所有空格
        type 2-前后空格
        type 3-前空格
        type 4-后空格
    */
    trim: function (str, type){
        switch (type){
            case 1:
                return str.replace(/\s+/g, "");
            case 2:
                return str.replace(/(^\s*)|(\s*$)/g, "");
            case 3:
                return str.replace(/(^\s*)/g, "");
            case 4:
                return str.replace(/(\s*$)/g, "");
            default:
                return str;
        }
    },
    /*type
     1:首字母大写
     2：首页母小写
     3：大小写转换
     4：全部大写
     5：全部小写
     * */
    //changeCase('asdasd',1)
    //Asdasd
    changeCase: function (str, type) {
        function ToggleCase(str) {
            var itemText = ""
            str.split("").forEach(
                function (item) {
                    if (/^([a-z]+)/.test(item)) {
                        itemText += item.toUpperCase();
                    }
                    else if (/^([A-Z]+)/.test(item)) {
                        itemText += item.toLowerCase();
                    }
                    else{
                        itemText += item;
                    }
                });
            return itemText;
        }
        switch (type) {
            case 1:
                return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
                    return v1.toUpperCase() + v2.toLowerCase();
                });
            case 2:
                return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
                    return v1.toLowerCase() + v2.toUpperCase();
                });
            case 3:
                return ToggleCase(str);
            case 4:
                return str.toUpperCase();
            case 5:
                return str.toLowerCase();
            default:
                return str;
        }
    },
    // 字符串替换(字符串,要替换的字符,替换成什么)
    replaceAll: function (str, AFindText, ARepText) {
        raRegExp = new RegExp(AFindText, "g");
        return str.replace(raRegExp, ARepText);
    },
    // 字符串检测
    checkString: function(str,type){
        switch (type){
            case 'required':
                return (str=="");
            case 'email':
                return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
            case 'phone':
                return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
            case 'tel':
                return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
            case 'number':
                return /^[0-9]$/.test(str);
            case 'english':
                return /^[a-zA-Z]+$/.test(str);
            case 'chinese':
                return /^[\u4E00-\u9FA5]+$/.test(str);
            case 'lower':
                return /^[a-z]+$/.test(str);
            case 'upper':
                return /^[A-Z]+$/.test(str);
            default :
                return true;
        }
    },

    // 数组去重
    removeRepeatArray: function (arr) {
        return arr.filter(function (item, index, self) {
            return self.indexOf(item) == index;
        });
        //es6
        //return Array.from(new Set(arr))
    },

    //数组最大值
    //这一块的封装，主要是针对数字类型的数组
    maxArr: function (arr) {
        return Math.max.apply(null, arr);
    },
    //数组最小值
    minArr: function (arr) {
        return Math.min.apply(null, arr);
    },

    //这一块的封装，主要是针对数字类型的数组
    //求和
    sumArr: function (arr) {
        var sumText = 0;
        for (var i = 0, len = arr.length; i < len; i++) {
            sumText += arr[i];
        }
        return sumText
    },

    //平均值,小数点可能会有很多位
    covArr: function (arr) {
        var sumText = this.sumArr(arr);
        var covText = this.sumText / length;
        return covText
    },
    //从数组中随机获取元素
    randomOne: function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    //到某一个时间的倒计时
    //getEndTime('2017/7/22 16:0:0')
    //"剩余时间6天 2小时 28 分钟20 秒"
    getEndTime: function (endTime) {
        var startDate = new Date();  //开始时间，当前时间
        var endDate = new Date(endTime); //结束时间，需传入时间参数
        var t = endDate.getTime() - startDate.getTime();  //时间差的毫秒数
        var d = 0, h = 0, m = 0, s = 0;
        if (t >= 0) {
            d = Math.floor(t / 1000 / 3600 / 24);
            h = Math.floor(t / 1000 / 60 / 60 % 24);
            m = Math.floor(t / 1000 / 60 % 60);
            s = Math.floor(t / 1000 % 60);
        }
        return "剩余时间" + d + "天 " + h + "小时 " + m + " 分钟" + s + " 秒";
    },
    // 随机色
    randomColor: function(){
        return "#"+(~~(Math.random()*(1<<24))).toString(16);
    },
    // 随机码
    // count取值 0-36
    randomString: function (count) {
        return Math.random().toString(count).substring(2);
    },
    // 随机数
    randomNumber: function (n1, n2) {
        //randomNumber(5,10)
        //返回5-10的随机整数，包括5，10
        if (arguments.length === 2) {
            return Math.round(n1 + Math.random() * (n2 - n1));
        }
        //randomNumber(10)
        //返回0-10的随机整数，包括0，10
        else if (arguments.length === 1) {
            return Math.round(Math.random() * n1)
        }
        //randomNumber()
        //返回0-255的随机整数，包括0，255
        else {
            return Math.round(Math.random() * 255)
        }
    },

    // 获取url参数
    getQueryString: function(str){
        var reg = new RegExp("(^|&)"+ str +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        return (r != null)? decodeURI(r[2]):null;
    },
    //设置url参数
    //setUrlPrmt({'a':1,'b':2})
    //a=1&b=2
    setUrlPrmt: function (obj) {
        var _rs = [];
        for (var p in obj) {
            if (obj[p] != null && obj[p] != '') {
                _rs.push(p + '=' + obj[p])
            }
        }
        return _rs.join('&');
    },

    //cookie
    //设置cookie
    setCookie: function (name, value, iDay) {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + iDay);
        document.cookie = name + '=' + value + ';expires=' + oDate;
    },
    //获取cookie
    getCookie: function (name) {
        var arr = document.cookie.split('; ');
        for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('=');
            if (arr2[0] == name) {
                return arr2[1];
            }
        }
        return '';
    },
    //删除cookie
    removeCookie: function (name) {
        this.setCookie(name, 1, -1);
    }
}