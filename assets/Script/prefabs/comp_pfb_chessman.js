cc.Class({
    extends: cc.Component,

    properties: {
        p1 : cc.Node,
        p2 : cc.Node,
        p3 : cc.Node,
        p4 : cc.Node,
        p5 : cc.Node,
        p6 : cc.Node,
        p7 : cc.Node,
        p8 : cc.Node,
        lb : cc.Label,

        cur_Id : null,
        pos_Id : null,
        posX : null,
        posY : null,
        isAlive : null,
        context : null,
    },

    onLoad () {
    },

    start () {
    },

    initdata(x,y,pid,context){
        this.posX = x
        this.posY = y
        this.pos_Id = pid
        this.context = context
        this.cur_Id = null
        this.isAlive = false
        this.lb.string = ""
        // this.lb.string = pid
        this.setcolor()
    },

    setcolor(){
        this.p1.active = this.cur_Id == 0 && this.isAlive
        this.p2.active = this.cur_Id == 1 && this.isAlive
        this.p3.active = this.cur_Id == 2 && this.isAlive
        this.p4.active = this.cur_Id == 3 && this.isAlive
        this.p5.active = this.cur_Id == 4 && this.isAlive
        this.p6.active = this.cur_Id == 5 && this.isAlive
        this.p7.active = this.cur_Id == 6 && this.isAlive
        this.p8.active = this.cur_Id == 7 && this.isAlive
    },

    setCid(id){
        this.cur_Id = id
        this.isAlive = true
        this.setcolor()
    },
    getstate(){
        return this.isAlive
    },
    removed(){
        this.cur_Id = null
        this.isAlive = false
        this.setcolor()
    },

    onClick(){
        // console.log("@@@@@@@@   this.pos_Id "+this.pos_Id)
        if(this.isAlive){
            // console.log(" not  none")
        }else{
            this.context.onChessPut(this.pos_Id)
        }
    },

    update (dt) {},
});
