
var TOTALCOLORS = 6
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
    },

    onLoad: function () {
        this.ballsArray = []
        this.ballsCleanArray = []
        this.v_vert = []
        this.v_hori = []
        this.v_lFall = []
        this.v_rFall = []
        this.curScore = 0
        this.initboard()
    },
    clearjudgecache(){
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
        this.setRandomBalls()
    },

    initboard(){
        for (let index = 0; index < 11; index++) {
            let ctx_row = this.board.getComponent(cc.Graphics); // 行
            ctx_row.lineWidth = 2
            ctx_row.strokeColor = cc.hexToColor('#ffffff');
            ctx_row.fillColor = cc.hexToColor('#ffde59');
            ctx_row.moveTo(0,index*60)
            ctx_row.lineTo(600,index*60)
            ctx_row.stroke()

            let ctx_col = this.board.getComponent(cc.Graphics); // 列  
            ctx_col.lineWidth = 2
            ctx_col.strokeColor = cc.hexToColor('#ffffff');
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
                var chessmancomp = chessman.getComponent("pfb_chessman");
                chessman.parent = this.board
                chessman.x = i*60
                chessman.y = j*60
                this.ballsArray.push({"node":chessman,"comp":chessmancomp,"pid":i*10+j,"cid":null})
                chessmancomp.initdata(i*60,j*60,i*10+j,this)
            }
        }
    },

    setRandomBalls(){
        // console.log("------> setRandomBalls()")
        var temparray = []
        var outputarray = []
        for (let index = 0; index < this.ballsArray.length; index++) {
            if(this.ballsArray[index].comp.getstate() == false){
                temparray.push(this.ballsArray[index].pid)
            }
        }
        if(temparray.length <= TOTALCOUNTS){
            this.gameover()
            return
        }
        while (outputarray.length < TOTALCOUNTS) {
            // console.log(outputarray)
            let templength = temparray.length
            let tpid = Math.round(Math.random()*templength)
            tpid = tpid == templength ? 0 : tpid  //保证概率相同
            let pid = temparray[tpid]
            let flag = false
            for (let index = 0; index < outputarray.length; index++) {
                if(pid == outputarray[index]){
                    flag = true
                }
            }
            if(flag == false){
                outputarray.push(pid)
                var cid = Math.round(Math.random()*TOTALCOLORS)
                cid = cid == TOTALCOLORS ? 0 : cid   //保证概率相同
    
                this.ballsArray[pid].comp.setCid(cid)
                this.ballsArray[pid].cid = cid
                this.touchCid = cid
                this.clearjudgecache()
                this.judge(pid,1,1,1,1,1,1,1,1,false)
            }
        }

    },

    randball(){
        this.randballCid = Math.round(Math.random()*TOTALCOLORS)
        this.randballCid = this.randballCid == TOTALCOLORS ? 0 : this.randballCid   //保证概率相同
        // console.log(" random ball cid " + this.randballCid)
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
        this.ballsArray[pid].comp.setCid(this.randballCid)
        this.ballsArray[pid].cid = this.randballCid
        this.touchCid = this.randballCid
        this.randball()
        this.clearjudgecache()
        this.judge(pid,1,1,1,1,1,1,1,1,true)
        // this.setRandomBalls()
    },

    /* 
    1
    0 10
    */
    judge(pid,u,ru,r,rd,d,ld,l,lu,istouch){
        let ball_u_pid = (pid % 10 == 9) ? null : pid + 1
        let ball_ru_pid = (pid % 10 == 9 || pid >= 90) ? null : pid + 11
        let ball_r_pid = (pid >= 90) ? null : pid + 10
        let ball_rd_pid = (pid % 10 == 0 || pid >= 90) ? null : pid + 9
        let ball_d_pid = (pid % 10 == 0) ? null : pid - 1
        let ball_ld_pid = (pid % 10 == 0 || pid < 10) ? null : pid - 11
        let ball_l_pid = (pid < 10) ? null : pid - 10
        let ball_lu_pid = (pid % 10 == 9 || pid < 10) ? null : pid - 9

        var callfunc = function(self,istouch_){
            if( self.v_vert_flag1 && self.v_vert_flag2 
                && self.v_hori_flag1 && self.v_hori_flag2 
                && self.v_lFall_flag1 && self.v_lFall_flag2 
                && self.v_rFall_flag1 && self.v_rFall_flag2 
            ){
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
                    self.clearchesses()
                }
                self.ballsCleanArray.splice(0,self.ballsCleanArray.length)
                if(self.v_vert.length >= 5){
                    arrangefunc(self,self.v_vert)
                }
                if(self.v_hori.length >= 5){
                    arrangefunc(self,self.v_hori)
                }
                if(self.v_lFall.length >= 5){
                    arrangefunc(self,self.v_lFall)
                }
                if(self.v_rFall.length >= 5){
                    arrangefunc(self,self.v_rFall)
                }
                if(istouch_ && self.v_vert.length < 5 && self.v_hori.length < 5 && self.v_lFall.length < 5 && self.v_rFall.length < 5 ){
                    self.setRandomBalls()
                }
            }
        }
        if( u == 1 || d == 1){
            // console.log("   ---------------------judge 竖")
            this.v_vert.push(pid)
            if(ball_u_pid != null){
                if(u == 1 && this.ballsArray[ball_u_pid].comp.isAlive && this.touchCid == this.ballsArray[ball_u_pid].cid){
                    this.judge(ball_u_pid,1,0,0,0,0,0,0,0,istouch)
                }else{
                    this.v_vert_flag1 = true
                    callfunc(this,istouch)
                }
            }else{
                this.v_vert_flag1 = true
                callfunc(this,istouch)
            }

            if(ball_d_pid != null){
                if(d == 1 && this.ballsArray[ball_d_pid].comp.isAlive && this.touchCid == this.ballsArray[ball_d_pid].cid){
                    this.judge(ball_d_pid,0,0,0,0,1,0,0,0,istouch)
                }else{
                    this.v_vert_flag2 = true
                    callfunc(this,istouch)
                }
            }else{
                this.v_vert_flag2 = true
                callfunc(this,istouch)
            }
        }
        if( l == 1 || r == 1){
            // console.log("   ---------------------judge 横")
            this.v_hori.push(pid)
            if(ball_l_pid != null){
                if(l == 1 && this.ballsArray[ball_l_pid].comp.isAlive && this.touchCid == this.ballsArray[ball_l_pid].cid){
                    this.judge(ball_l_pid,0,0,0,0,0,0,1,0,istouch)
                }else{
                    this.v_hori_flag1 = true
                    callfunc(this,istouch)
                }
            }else{
                this.v_hori_flag1 = true
                callfunc(this,istouch)
            }

            if(ball_r_pid != null){
                if(r == 1 && this.ballsArray[ball_r_pid].comp.isAlive && this.touchCid == this.ballsArray[ball_r_pid].cid){
                    this.judge(ball_r_pid,0,0,1,0,0,0,0,0,istouch)
                }else{
                    this.v_hori_flag2 = true
                    callfunc(this,istouch)
                }
            }else{
                this.v_hori_flag2 = true
                callfunc(this,istouch)
            }
        }
        if( lu == 1 || rd == 1){
            // console.log("   ---------------------judge 捺")
            this.v_rFall.push(pid)
            if(ball_lu_pid != null){
                if(lu == 1 && this.ballsArray[ball_lu_pid].comp.isAlive && this.touchCid == this.ballsArray[ball_lu_pid].cid){
                    this.judge(ball_lu_pid,0,0,0,0,0,0,0,1,istouch)
                }else{
                    this.v_rFall_flag1 = true
                    callfunc(this,istouch)
                }
            }else{
                this.v_rFall_flag1 = true
                callfunc(this,istouch)
            }

            if(ball_rd_pid != null){
                if(rd == 1 && this.ballsArray[ball_rd_pid].comp.isAlive && this.touchCid == this.ballsArray[ball_rd_pid].cid){
                    this.judge(ball_rd_pid,0,0,0,1,0,0,0,0,istouch)
                }else{
                    this.v_rFall_flag2 = true
                    callfunc(this,istouch)
                }
            }else{
                this.v_rFall_flag2 = true
                callfunc(this,istouch)
            }
        }
        if( ru == 1 || ld == 1){
            // console.log("   ---------------------judge 撇")
            this.v_lFall.push(pid)
            if(ball_ru_pid != null){
                if(ru == 1 && this.ballsArray[ball_ru_pid].comp.isAlive && this.touchCid == this.ballsArray[ball_ru_pid].cid){
                    this.judge(ball_ru_pid,0,1,0,0,0,0,0,0,istouch)
                }else{
                    this.v_lFall_flag1 = true
                    callfunc(this,istouch)
                }
            }else{
                this.v_lFall_flag1 = true
                callfunc(this,istouch)
            }

            if(ball_ld_pid != null){
                if(ld == 1 &&this.ballsArray[ball_ld_pid].comp.isAlive && this.touchCid == this.ballsArray[ball_ld_pid].cid){
                    this.judge(ball_ld_pid,0,0,0,0,0,1,0,0,istouch)
                }else{
                    this.v_lFall_flag2 = true
                    callfunc(this,istouch)
                }
            }else{
                this.v_lFall_flag2 = true
                callfunc(this,istouch)
            }
        }
    },

    // 消除
    clearchesses(){
        // console.log("#####    clearchesses()")
        // console.log(this.ballsCleanArray)
        for (let index = 0;  index < this.ballsCleanArray.length; index++) {
            this.ballsArray[this.ballsCleanArray[index]].cid = null
            this.ballsArray[this.ballsCleanArray[index]].comp.removed()
        }
        this.curScore += this.ballsCleanArray.length
        this.lb_curScore.string = this.curScore
    },

    clearAll(){
        for (let i = 0; i < 100; i++) {
            this.ballsArray[i].cid = null
            this.ballsArray[i].comp.removed()
        }

        this.lb_curScore.string = "0"
        this.clearjudgecache()
        this.randball()
        this.setRandomBalls()
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
