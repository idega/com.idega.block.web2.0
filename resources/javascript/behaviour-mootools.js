var BehaviourBaseClass = new Class({
    initialize: function(){
        this.behaviours = [];
        var bhvr = this;
        Window.onDomReady(function(){bhvr.apply()});
    },
    register: function(actions){
        if(! this.behaviours.test(actions))
            this.behaviours.push(actions);
    },
    apply: function(actions) {
        if ($type(actions)!='array') {
            actions = this.behaviours;
        }
        actions.each(function(bhvrs){
            for (bhvr in bhvrs){
                try {
                    if($type(bhvrs[bhvr])=='function') {
                        $S(bhvr).each(function(el){
                            bhvrs[bhvr](el);
                        });
                    }
                } catch(e){}
            }
        });
    }
});
var Behaviour = new BehaviourBaseClass();
Behaviour.initialize();