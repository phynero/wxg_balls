
var TOTALCOLORS = 4
var TOTALCOUNTS = 2
cc.Class({
    extends: cc.Component,
    // editor: {
    //     requireComponent: sp.Skeleton
    // },

    properties: {
        board : cc.Node,
        chessman : cc.Prefab,
        lb_curScore : cc.Label,
        lb_mostScore : cc.Label,

        ball1 : cc.Node,
        ball2 : cc.Node,
        ball3 : cc.Node,
        ball4 : cc.Node,
        ball5 : cc.Node,
        ball6 : cc.Node,
        ball7 : cc.Node,
        ball8 : cc.Node,

        curScore : null,

        ballsArray : null,
        ballsCleanArray : null,
        randballCid : null,
        touchCid : null,

        v_vert : null,
        v_hori : null,
        v_lFall : null,
        v_rFall : null,
        v_vert_flag1 : null,
        v_hori_flag1 : null,
        v_lFall_flag1 : null,
        v_rFall_flag1 : null,
        v_vert_flag2 : null,
        v_hori_flag2 : null,
        v_lFall_flag2 : null,
        v_rFall_flag2 : null,

        canTouch : null,
    },

    onLoad: function () {
        this.ballsArray = []
        this.ballsCleanArray = []
        this.v_vert = []
        this.v_hori = []
        this.v_lFall = []
        this.v_rFall = []
        this.curScore = 0
        this.canTouch = true
        this.initboard()
    },
    clearjudgecache(){
        // console.log("清理judge 缓存")
        this.v_vert.splice(0,this.v_vert.length)
        this.v_hori.splice(0,this.v_hori.length)
        this.v_lFall.splice(0,this.v_lFall.length)
        this.v_rFall.splice(0,this.v_rFall.length)
        this.v_vert_flag1 = false
        this.v_hori_flag1 = false
        this.v_lFall_flag1 = false
        this.v_rFall_flag1 = false
        this.v_vert_flag2 = false
        this.v_hori_flag2 = false
        this.v_lFall_flag2 = false
        this.v_rFall_flag2 = false
    },
    start(){
        this.initballs()
        this.clearjudgecache()
        this.randball()
        var temparray = []
        for (let index = 0; index < this.ballsArray.length; index++) {
            if(this.ballsArray[index].comp.getstate() == false){
                temparray.push(this.ballsArray[index].pid)
            }
        }
        this.setRandomBalls(1,temparray)
    },

    initboard(){
        for (let index = 0; index < 11; index++) {
            let ctx_row = this.board.getComponent(cc.Graphics); // 行
            ctx_row.lineWidth = 2
            ctx_row.strokeColor = cc.hexToColor('#555555');
            ctx_row.fillColor = cc.hexToColor('#ffde59');
            ctx_row.moveTo(0,index*60)
            ctx_row.lineTo(600,index*60)
            ctx_row.stroke()

            let ctx_col = this.board.getComponent(cc.Graphics); // 列  
            ctx_col.lineWidth = 2
            ctx_col.strokeColor = cc.hexToColor('#555555');
            ctx_col.fillColor = cc.hexToColor('#ffde59');
            ctx_col.moveTo(index*60,0)
            ctx_col.lineTo(index*60,600)
            ctx_col.stroke()
        }
    },

    initballs(){
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                var chessman = cc.instantiate(this.chessman);
                var chessmancomp = chessman.getComponent("comp_pfb_chessman");
                chessman.parent = this.board
                chessman.x = i*60
                chessman.y = j*60
                this.ballsArray.push({"node":chessman,"comp":chessmancomp,"pid":i*10+j,"cid":null})
                chessmancomp.initdata(i*60,j*60,i*10+j,this)
            }
        }
    },

    setRandomBalls(num,temparray){
        // this.canTouch = true
        // return
        // console.log("------> setRandomBalls()")
        if(num > 2){
            this.canTouch = true
            return
        }
        var outputarray = []

        let templength = temparray.length
        let tpid = Math.round(Math.random()*templength)
        tpid = tpid == templength ? 0 : tpid  //保证概率相同
        let pid = temparray[tpid]
        
        outputarray.push(pid)

        // console.log("")
        // console.log("随机 "+num + "   pid"+pid)
        var cid = Math.round(Math.random()*TOTALCOLORS)
        cid = cid == TOTALCOLORS ? 0 : cid   //保证概率相同

        this.ballsArray[pid].comp.setCid(cid)
        this.ballsArray[pid].cid = cid
        this.touchCid = cid
        this.clearjudgecache()
        this.judge(pid,1,1,1,1,1,1,1,1,false,num,0)
    },

    randball(){
        this.randballCid = Math.round(Math.random()*TOTALCOLORS)
        this.randballCid = this.randballCid == TOTALCOLORS ? 0 : this.randballCid   //保证概率相同
        // console.log(" random ball    cid " + this.randballCid + "    0红 1橙")
        this.ball1.active = this.randballCid == 0
        this.ball2.active = this.randballCid == 1
        this.ball3.active = this.randballCid == 2
        this.ball4.active = this.randballCid == 3
        this.ball5.active = this.randballCid == 4
        this.ball6.active = this.randballCid == 5
        this.ball7.active = this.randballCid == 6
        this.ball8.active = this.randballCid == 7
    },

    onChessPut(pid){
        // console.log("")
        // console.log("")
        // console.log("")
        // console.log("落子")
        if(this.canTouch == false){
            // console.log("this.canTouch == false  落子失败")
            return}
        this.canTouch = false

        this.ballsArray[pid].comp.setCid(this.randballCid)
        this.ballsArray[pid].cid = this.randballCid
        this.touchCid = this.randballCid
        // console.log("##### 手动设置 pid "+pid + "  cid "+this.randballCid)
        this.randball()
        this.clearjudgecache()
        this.judge(pid,1,1,1,1,1,1,1,1,true,0,0)
    },

    /* 
    1
    0 10
    */
    judge(pid,u,ru,r,rd,d,ld,l,lu,istouch,curnum,judgeid){
        judgeid += 1
        // console.log(" 进入judge()  pid "+pid+"   第几次curnum "+curnum + "  judgeID "+judgeid)
        // this.canRand = false
        let ball_u_pid = (pid % 10 == 9) ? null : pid + 1
        let ball_ru_pid = (pid % 10 == 9 || pid >= 90) ? null : pid + 11
        let ball_r_pid = (pid >= 90) ? null : pid + 10
        let ball_rd_pid = (pid % 10 == 0 || pid >= 90) ? null : pid + 9
        let ball_d_pid = (pid % 10 == 0) ? null : pid - 1
        let ball_ld_pid = (pid % 10 == 0 || pid < 10) ? null : pid - 11
        let ball_l_pid = (pid < 10) ? null : pid - 10
        let ball_lu_pid = (pid % 10 == 9 || pid < 10) ? null : pid - 9

        var callfunc = function(self,curnum_,istouch_){
            // console.log(" judge() 的 callfunc curnum_ "+curnum_ + "  judgeID "+judgeid)
            if( self.v_vert_flag1 && self.v_vert_flag2 
                && self.v_hori_flag1 && self.v_hori_flag2 
                && self.v_lFall_flag1 && self.v_lFall_flag2 
                && self.v_rFall_flag1 && self.v_rFall_flag2
            ){
                // console.log(" callfunc ==================== 达标 没有能搜索的连续!!!" + "  judgeID "+judgeid)
                var arrangefunc = function(self2,datain){
                    let tempobj = {}
                    for (let index = 0; index < datain.length; index++) {
                        const element = datain[index];
                        tempobj[element] = 1
                    }
                    for (let index = 0; index < self2.ballsCleanArray.length; index++) {
                        if(tempobj[self2.ballsCleanArray[index]] == 1){
                            tempobj[self2.ballsCleanArray[index]] = null
                        }
                    }
                    for (const key in tempobj) {
                        if (tempobj.hasOwnProperty(key) && tempobj[key] == 1) {
                            self2.ballsCleanArray.push(key)
                        }
                    }
                    // console.log("   ----------------------------------   回调 self2.ballsCleanArray" + "  judgeID "+judgeid)
                    // console.log(self2.ballsCleanArray)
                    self2.clearchesses(curnum_+1,istouch_)
                }
                self.ballsCleanArray.splice(0,self.ballsCleanArray.length)
                if(self.v_vert.length >= 5){
                    // console.log("   --------------------------   竖超过5个 "+self.v_vert.length + "  judgeID "+judgeid)
                    arrangefunc(self,self.v_vert)
                }
                if(self.v_hori.length >= 5){
                    // console.log("   --------------------------   横超过5个 "+self.v_hori.length + "  judgeID "+judgeid)
                    arrangefunc(self,self.v_hori)
                }
                if(self.v_lFall.length >= 5){
                    // console.log("   --------------------------   捺超过5个 "+self.v_lFall.length + "  judgeID "+judgeid)
                    arrangefunc(self,self.v_lFall)
                }
                if(self.v_rFall.length >= 5){
                    // console.log("   --------------------------   撇超过5个 "+self.v_rFall.length + "  judgeID "+judgeid)
                    arrangefunc(self,self.v_rFall)
                }
                if(self.v_vert.length < 5 && self.v_hori.length < 5 && self.v_lFall.length < 5 && self.v_rFall.length < 5 ){
                    // console.log(" ----------------------------->    没有可消除 curnum_ "+curnum_ + "  judgeID "+judgeid)
                    // console.log(" istouch_  ----->  "+istouch_ + "  judgeID "+judgeid)
                    var temparray = []
                    for (let index = 0; index < self.ballsArray.length; index++) {
                        if(self.ballsArray[index].comp.getstate() == false){
                            temparray.push(self.ballsArray[index].pid)
                        }
                    }
                    if(temparray.length == 0){
                        self.gameover()
                        return
                    }
                    self.setRandomBalls(curnum_+1,temparray)
                }
            }
        }
        if( u == 1 || d == 1){
            this.v_vert.push(pid)
            // console.log("   ---------------------judge 竖+ "+this.v_vert.length + "  judgeID "+judgeid)
            // console.log("#######  this.v_vert 数组")
            // console.log(this.v_vert)
            if(u == 1 && ball_u_pid != null){
                if(this.ballsArray[ball_u_pid].comp.isAlive && this.touchCid == this.ballsArray[ball_u_pid].cid){
                    // console.log("   ---------------------judge 上 继续搜索" + "  judgeID "+judgeid)
                    this.judge(ball_u_pid,1,0,0,0,0,0,0,0,istouch,curnum,judgeid)
                }else if(this.v_vert_flag1 == false){
                    // console.log("   ---------------------judge 上 搜索结束 开始回调" + "  judgeID "+judgeid)
                    this.v_vert_flag1 = true
                    callfunc(this,curnum,istouch)
                }
            }else if(u == 1 && this.v_vert_flag1 == false){
                // console.log("   ---------------------judge 上 ball_u_pid 不存在 搜索结束 开始回调" + "  judgeID "+judgeid)
                this.v_vert_flag1 = true
                callfunc(this,curnum,istouch)
            }

            if(d == 1 && ball_d_pid != null){
                if(this.ballsArray[ball_d_pid].comp.isAlive && this.touchCid == this.ballsArray[ball_d_pid].cid){
                    // console.log("   ---------------------judge 下 继续搜索" + "  judgeID "+judgeid)
                    this.judge(ball_d_pid,0,0,0,0,1,0,0,0,istouch,curnum,judgeid)
                }else if(this.v_vert_flag2 == false){
                    // console.log("   ---------------------judge 下 搜索结束 开始回调" + "  judgeID "+judgeid)
                    this.v_vert_flag2 = true
                    callfunc(this,curnum,istouch)
                }
            }else if(d == 1 && this.v_vert_flag2 == false){
                // console.log("   ---------------------judge 下 ball_d_pid 不存在 搜索结束 开始回调" + "  judgeID "+judgeid)
                this.v_vert_flag2 = true
                callfunc(this,curnum,istouch)
            }
        }
        if( l == 1 || r == 1){
            this.v_hori.push(pid)
            // console.log("   ---------------------judge 横+ "+this.v_hori.length + "  judgeID "+judgeid)
            // console.log("#######  this.v_hori 数组")
            // console.log(this.v_hori)
            if(l == 1 && ball_l_pid != null){
                if(this.ballsArray[ball_l_pid].comp.isAlive && this.touchCid == this.ballsArray[ball_l_pid].cid){
                    // console.log("   ---------------------judge 左 继续搜索" + "  judgeID "+judgeid)
                    this.judge(ball_l_pid,0,0,0,0,0,0,1,0,istouch,curnum,judgeid)
                }else if(this.v_hori_flag1 == false){
                    // console.log("   ---------------------judge 左 搜索结束 开始回调" + "  judgeID "+judgeid)
                    this.v_hori_flag1 = true
                    callfunc(this,curnum,istouch)
                }
            }else if(l == 1 && this.v_hori_flag1 == false){
                // console.log("   ---------------------judge 左 ball_l_pid 不存在 搜索结束 开始回调" + "  judgeID "+judgeid)
                this.v_hori_flag1 = true
                callfunc(this,curnum,istouch)
            }

            if(r == 1 && ball_r_pid != null){
                if(this.ballsArray[ball_r_pid].comp.isAlive && this.touchCid == this.ballsArray[ball_r_pid].cid){
                    // console.log("   ---------------------judge 右 继续搜索" + "  judgeID "+judgeid)
                    this.judge(ball_r_pid,0,0,1,0,0,0,0,0,istouch,curnum,judgeid)
                }else if(this.v_hori_flag2 == false){
                    // console.log("   ---------------------judge 右 搜索结束 开始回调" + "  judgeID "+judgeid)
                    this.v_hori_flag2 = true
                    callfunc(this,curnum,istouch)
                }
            }else if(r == 1 && this.v_hori_flag2 == false){
                // console.log("   ---------------------judge 右 ball_r_pid 不存在 搜索结束 开始回调" + "  judgeID "+judgeid)
                this.v_hori_flag2 = true
                callfunc(this,curnum,istouch)
            }
        }
        if( ru == 1 || ld == 1){
            this.v_lFall.push(pid)
            // console.log("   ---------------------judge 撇+ "+this.v_lFall.length + "  judgeID "+judgeid)
            // console.log("#######  this.v_lFall 数组")
            // console.log(this.v_lFall)
            if(ru == 1 && ball_ru_pid != null){
                if(this.ballsArray[ball_ru_pid].comp.isAlive && this.touchCid == this.ballsArray[ball_ru_pid].cid){
                    // console.log("   ---------------------judge 右上 继续搜索" + "  judgeID "+judgeid)
                    this.judge(ball_ru_pid,0,1,0,0,0,0,0,0,istouch,curnum,judgeid)
                }else if(this.v_lFall_flag1 == false){
                    // console.log("   ---------------------judge 右上 搜索结束 开始回调" + "  judgeID "+judgeid)
                    this.v_lFall_flag1 = true
                    callfunc(this,curnum,istouch)
                }
            }else if(ru == 1 && this.v_lFall_flag1 == false){
                // console.log("   ---------------------judge 右上 ball_ru_pid 不存在 搜索结束 开始回调" + "  judgeID "+judgeid)
                this.v_lFall_flag1 = true
                callfunc(this,curnum,istouch)
            }

            if(ld == 1 &&ball_ld_pid != null){
                if(this.ballsArray[ball_ld_pid].comp.isAlive && this.touchCid == this.ballsArray[ball_ld_pid].cid){
                    // console.log("   ---------------------judge 左下 继续搜索" + "  judgeID "+judgeid)
                    this.judge(ball_ld_pid,0,0,0,0,0,1,0,0,istouch,curnum,judgeid)
                }else if(this.v_lFall_flag2 == false){
                    // console.log("   ---------------------judge 左下 搜索结束 开始回调" + "  judgeID "+judgeid)
                    this.v_lFall_flag2 = true
                    callfunc(this,curnum,istouch)
                }
            }else if(ld == 1 &&this.v_lFall_flag2 == false){
                // console.log("   ---------------------judge 左下 ball_ld_pid 不存在 搜索结束 开始回调" + "  judgeID "+judgeid)
                this.v_lFall_flag2 = true
                callfunc(this,curnum,istouch)
            }
        }
        if( lu == 1 || rd == 1){
            this.v_rFall.push(pid)
            // console.log("   ---------------------judge 捺+ "+this.v_rFall.length + "  judgeID "+judgeid)
            // console.log("#######  this.v_rFall 数组")
            // console.log(this.v_rFall)
            if(lu == 1 && ball_lu_pid != null){
                if( this.ballsArray[ball_lu_pid].comp.isAlive && this.touchCid == this.ballsArray[ball_lu_pid].cid){
                    // console.log("   ---------------------judge 左上 继续搜索" + "  judgeID "+judgeid)
                    this.judge(ball_lu_pid,0,0,0,0,0,0,0,1,istouch,curnum,judgeid)
                }else if(this.v_rFall_flag1 == false){
                    // console.log("   ---------------------judge 左上 搜索结束 开始回调" + "  judgeID "+judgeid)
                    this.v_rFall_flag1 = true
                    callfunc(this,curnum,istouch)
                }
            }else if(lu == 1 && this.v_rFall_flag1 == false){
                // console.log("   ---------------------judge 左上 ball_lu_pid 不存在 搜索结束 开始回调" + "  judgeID "+judgeid)
                this.v_rFall_flag1 = true
                callfunc(this,curnum,istouch)
            }

            if(rd == 1 && ball_rd_pid != null){
                if( this.ballsArray[ball_rd_pid].comp.isAlive && this.touchCid == this.ballsArray[ball_rd_pid].cid){
                    // console.log("   ---------------------judge 右下 继续搜索" + "  judgeID "+judgeid)
                    this.judge(ball_rd_pid,0,0,0,1,0,0,0,0,istouch,curnum,judgeid)
                }else if(this.v_rFall_flag2 == false){
                    // console.log("   ---------------------judge 右下 搜索结束 开始回调" + "  judgeID "+judgeid)
                    this.v_rFall_flag2 = true
                    callfunc(this,curnum,istouch)
                }
            }else if(rd == 1 && this.v_rFall_flag2 == false){
                // console.log("   ---------------------judge 右下 ball_rd_pid 不存在 搜索结束 开始回调" + "  judgeID "+judgeid)
                this.v_rFall_flag2 = true
                callfunc(this,curnum,istouch)
            }
        }
    },

    // 消除
    clearchesses(curnum,istouch){
        // console.log("#####    clearchesses()  istouch "+istouch)
        // this.canRand = true
        // console.log(this.ballsCleanArray)
        for (let index = 0;  index < this.ballsCleanArray.length; index++) {
            this.ballsArray[this.ballsCleanArray[index]].cid = null
            this.ballsArray[this.ballsCleanArray[index]].comp.removed()
        }
        this.curScore += this.ballsCleanArray.length
        this.lb_curScore.string = this.curScore
        if(istouch == false){
            // console.log("            @@@@@@@@@@  clearchesses 自动消除的  curnum "+curnum)
            var temparray = []
            for (let index = 0; index < this.ballsArray.length; index++) {
                if(this.ballsArray[index].comp.getstate() == false){
                    temparray.push(this.ballsArray[index].pid)
                }
            }
            this.setRandomBalls(curnum+1,temparray)
        }else{
            this.canTouch = true
        }
    },

    clearAll(){
        for (let i = 0; i < 100; i++) {
            this.ballsArray[i].cid = null
            this.ballsArray[i].comp.removed()
        }
        this.curScore = 0
        this.lb_curScore.string = this.curScore
        this.clearjudgecache()
        // this.randball()

        var temparray = []
        for (let index = 0; index < this.ballsArray.length; index++) {
            if(this.ballsArray[index].comp.getstate() == false){
                temparray.push(this.ballsArray[index].pid)
            }
        }
        this.setRandomBalls(1,temparray)
    },

    gameover(){
        var self = this
        wx.showModal({
            title: '',
            content: '无子可落,游戏结束!',
            confirmText:'重新开始',
            showCancel:false,
            success: function(res) {
                self.clearAll()
            }
        })
    },
    onRegame(){
        // wx.exitMiniProgram({})
        this.clearAll()
    },
    update: function (dt) {

    },
});
