var app = new Vue({
    el: '#app',
    data() {
        return {
            msg:"Services provided by Backpackerxl",
            inputValue: "", //定义输入框的值，暂时为空
            Result: [],     //定义一个数组存储获取接口的数据集
            url: "",        //定义url存储接口返回的播放地址，并动态赋值给audio  
            mark: true,      //定义标志变量mark初值为true，用于记录输入框是否获取到焦点的状态
            fileName:'',
            //定义不同类型的推荐数组，以后从接口获取，目前只能写死数据
            Singer: ['Wonderful U', 'Walk Thru Fire', 'Seve', 'Because of You', 'Sold Out', 'Memories', 'Galway Girl', 'Love Me Like You Do', 'RISE', '邓紫棋', '李荣浩', '徐良', '周笔畅', '李健', '张杰', '华晨宇', '毛不易', '薛之谦', '汪峰', '打上火花', '朗朗晴天', 'Butter-Fly', 'LOSER', '不要认输', 'My All', '给你看', '像中枪一样', '爱情是', '命运', '活着', 'SOLO', 'Blueming', '上下', '想你', '鬼怪'],
        };
    },
    /**
     * vue 生命周期函数，进入页面就调用推荐方法
     */
    created() {
        this.mounted()
    },
    methods: {
        /**
         * 接收id,根据id调用接口
         * @param {接收搜索方法传过来的id} id 
         */
        play(id) {
            //console.log(id)
            axios({
                url: "https://autumnfish.cn/song/url",
                method: "get",
                params: {
                    id //id:id
                }
            }).then(res => {
                //console.log(res)
                this.url = res.data.data[0].url
            })
        },
        /**
         * 搜索方法的实现
         */
        search() {
            if (this.inputValue == "") {
                alert('请输入搜索内容！！！')
            } else {
                axios({
                    url: "https://autumnfish.cn/search",
                    method: "get",
                    params: {
                        keywords: this.inputValue
                    }
                }).then(res => {
                    //console.log(res)
                    this.Result = res.data.result.songs
                    //将毫秒转化为分钟秒的算法
                    for (let i = 0; i < this.Result.length; i++) {
                        //获取总毫秒数
                        let duration = this.Result[i].duration
                        let min = parseInt(duration / 1000 / 60)
                        if (min < 10) {
                            min = '0' + min
                        }
                        let sec = parseInt(duration / 1000 % 60)
                        if (sec < 10) {
                            sec = '0' + sec
                        }
                        //console.log(min+":"+sec)
                        //拼接最终时长
                        this.Result[i].duration = `${min}:${sec}`
                    }
                })
            }

        },
        /**
         * 网上白嫖的不会解释
         */
        upload() {
            let files = this.$refs.uploadFile.files[0];
            let urls = this.getUrl(files);
            this.url = urls
            //console.log(urls)
        },
        /**
         * 网上白嫖的不会解释
         */
        getUrl(file) {
          let url = null;
          if (window.createObjectURL != undefined) {
            // basic
            url = window.createObjectURL(file);
          } else if (window.webkitURL != undefined) {
            // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
          } else if (window.URL != undefined) {
            // mozilla(firefox)
            url = window.URL.createObjectURL(file);
          }
          return url;
        },
        // fun(){
        //     var url = 'F:/My Music/音乐/G.E.M.邓紫棋 - 光年之外.mp3'
        //     return url;
        // },
        /**
         * 实现打开本地文件
         */
         localhost:function () {
            document.getElementById('open').click()
             //console.log(this.fun)
             //document.getElementById('serch').value = document.getElementById('open').files[0].path
         },
        /**
         * 实现间隔5秒推荐相应歌曲或歌手 
         */
        mounted() {
            //console.log(tyval)
            var  timer ;    //定义计时器
            timer = setInterval(() => {
                if (this.mark) {
                    // hanguo
                    let i = Math.floor((Math.random() * this.Singer.length))//调用数学函数，进行随机取值
                    this.inputValue = this.Singer[i]
                } else {
                    //console.log(this.mark)
                    this.inputValue = this.inputValue
                }
            }, 7000)
        },
        /**
         * 清除定时器
         */
        beforeDestroy() {
            this.$once('hook:beforeDestroy', () => {
                clearInterval(this.timer)
            })
        },
        /**
         * 获取焦点的判断
         * @param {*名称} name 
         * @param {*判断是否获取到焦点} type 
         */
        animateWidth(name, type) {
            if (name == "company_name") {
                //离开焦点
                if (type == "blur") {
                    this.mark = true
                } else {
                    this.mark = false
                }
            }
        },
    }
})
//模板字符串拼接CSS样式，营造3维效果
let total = 12;
let shadow = '';
for (let i = 1; i <= total; i++) {
    shadow += `-${i}px ${i}px 0 #eee,`;
}
//将倒数第一个逗号改为；
shadow = shadow.slice(0, -1);
//设置样式
const text = document.querySelector("#title");
text.style.textShadow = shadow;
// var input = document.getElementsByTagName("filename")[0];
// //console.log(input)
//    input.onchange = function(){
//     var that =this;
//     console.log(that.files[0]);
//     var src = window.URL.createObjectURL(that.files[0])
//     console.log(src)
//    }
