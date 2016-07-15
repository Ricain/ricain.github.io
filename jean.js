jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};

$jean = {
    angle : 30,
    time : 3000,
    level : 0,
    acc  : 1,
    colors : ["#2E7D32", "#1565C0", "#00838F", "#c62828", "#FF8F00"],
    init : function () {
        $jean.resize();
        $(window).resize($jean.resize);
        $jean.updateColor();
        $jean.loop();
    },
    resize : function () {
        $(".let_cont .let_fil").css("height", parseInt($(document).height()/3+5) + "px");
    },
    updateColor : function () {
        $col = Math.floor(Math.random()*$jean.colors.length);
        if (typeof(Storage) !== "undefined") {
            $test = localStorage.getItem("color");
            if ($test) {
                $col = parseInt($test)+1;
                if ($col >= $jean.colors.length) $col = 0;
            }
        }
        localStorage.setItem("color", $col);
        $rcol = $jean.colors[$col];
        $("body").css("color", $rcol);
        $(".links a").css("color", $rcol);
        $("#bar_color").attr("content", $rcol);
    },
    loop : function () {
        if ($jean.level == 0) {
            $jean.j.up();
            $jean.level += 1;
            return;
        }
        if ($jean.level == 1) {
            $jean.j.down();
            $jean.level += 1;
            return;
        }
        if ($jean.level == 2) {
            $jean.n.up();
            $jean.level += 1;
            return;
        }
        if ($jean.level == 3) {
            $jean.n.down();
            $jean.level = 0;
            return;
        }
    },
    j : {
        up : function () {
            $laps = $jean.time/$jean.angle;
            $("#j_cont").attr("rot_obj", $jean.angle);
            $("#j_cont").attr("rot_cur", 0);
            $jean.accel($("#j_cont"), $laps)
        },
        down : function () {
            $laps = $jean.time/$jean.angle;
            $("#j_cont").attr("rot_obj", 0);
            $("#j_cont").attr("rot_cur", $jean.angle);
            $jean.accel($("#j_cont"), $laps)
        }
    },
    n : {
        up : function () {
            $laps = $jean.time/$jean.angle;
            $("#n_cont").attr("rot_obj", -$jean.angle);
            $("#n_cont").attr("rot_cur", 0);
            $jean.accel($("#n_cont"), $laps)
        },
        down : function () {
            $laps = $jean.time/$jean.angle;
            $("#n_cont").attr("rot_obj", 0);
            $("#n_cont").attr("rot_cur", -$jean.angle);
            $jean.accel($("#n_cont"), $laps)
        }
    },
    accel : function ($tag, $laps) {
        $rec = function () {
            $obj = parseInt($tag.attr("rot_obj"));
            $cur = parseInt($tag.attr("rot_cur"));
            $rot = 0;
            if      ($obj>$cur) $rot = +1;
            else if ($obj<$cur) $rot = -1;
            else    {
                $jean.loop();
                return;
            }
            $acc = $obj/
            $tag.rotate($cur+$rot);
            $tag.attr("rot_cur", $cur+$rot);
            setTimeout($rec, $laps/Math.abs($obj-$cur+$jean.acc));
        }
        $rec();
    }
}

$(document).ready($jean.init);
